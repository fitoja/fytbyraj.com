import tls from "node:tls";

export const runtime = "nodejs";

type ConsultationPayload = {
  name?: string;
  phone?: string;
  height?: string;
  weight?: string;
  age?: string;
};

type EmailConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  to: string;
  fromName: string;
};

const requiredFields: Array<keyof ConsultationPayload> = [
  "name",
  "phone",
  "height",
  "weight",
  "age",
];

function clean(value: unknown) {
  return String(value ?? "").trim();
}

function cleanAppPassword(value: unknown) {
  return clean(value).replace(/\s+/g, "");
}

function cleanHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function encodeHeader(value: string) {
  return `=?UTF-8?B?${Buffer.from(cleanHeader(value), "utf8").toString("base64")}?=`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getEmailConfig(): EmailConfig {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = clean(process.env.SMTP_USER);
  const password = cleanAppPassword(process.env.SMTP_APP_PASSWORD);
  const to = clean(process.env.CONSULTATION_TO || "fytbyraj@gmail.com");
  const fromName = clean(process.env.SMTP_FROM_NAME || "FYTBYRAJ Website");

  if (!user || !password) {
    throw new Error("Email credentials are not configured.");
  }

  return {
    host,
    port,
    user,
    password,
    to,
    fromName,
  };
}

function createEmailHtml(payload: Required<ConsultationPayload>) {
  const rows = [
    ["Name", payload.name],
    ["Phone Number", payload.phone],
    ["Height", payload.height],
    ["Weight", payload.weight],
    ["Age", payload.age],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
      <h2 style="margin: 0 0 16px;">New FYTBYRAJ Consultation Request</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 10px; font-weight: 700; width: 180px;">${escapeHtml(label)}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
    </div>
  `.trim();
}

function dotStuff(message: string) {
  return message.replace(/^\./gm, "..");
}

function createLineReader(socket: tls.TLSSocket) {
  let buffer = "";
  const lines: string[] = [];
  const waiting: Array<(line: string) => void> = [];

  socket.on("data", (chunk) => {
    buffer += chunk.toString("utf8");

    let newlineIndex = buffer.indexOf("\n");
    while (newlineIndex >= 0) {
      const line = buffer.slice(0, newlineIndex).replace(/\r$/, "");
      buffer = buffer.slice(newlineIndex + 1);
      const resolver = waiting.shift();

      if (resolver) {
        resolver(line);
      } else {
        lines.push(line);
      }

      newlineIndex = buffer.indexOf("\n");
    }
  });

  return function nextLine() {
    return new Promise<string>((resolve) => {
      const line = lines.shift();
      if (line !== undefined) {
        resolve(line);
      } else {
        waiting.push(resolve);
      }
    });
  };
}

async function sendSmtpCommand(
  socket: tls.TLSSocket,
  readLine: () => Promise<string>,
  command: string | null,
  expectedCodes: number[]
) {
  if (command !== null) {
    socket.write(`${command}\r\n`);
  }

  const lines: string[] = [];
  let code = 0;

  while (true) {
    const line = await readLine();
    lines.push(line);
    const match = /^(\d{3})([\s-])/.exec(line);

    if (match) {
      code = Number(match[1]);
      if (match[2] === " ") {
        break;
      }
    }
  }

  if (!expectedCodes.includes(code)) {
    throw new Error(`SMTP command failed: ${lines.join(" ")}`);
  }
}

async function sendEmail(config: EmailConfig, payload: Required<ConsultationPayload>) {
  const subject = `FYTBYRAJ consultation request from ${payload.name}`;
  const html = createEmailHtml(payload);
  const message = [
    `From: ${encodeHeader(config.fromName)} <${cleanHeader(config.user)}>`,
    `To: <${cleanHeader(config.to)}>`,
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "",
    html,
  ].join("\r\n");

  await new Promise<void>((resolve, reject) => {
    const socket = tls.connect({
      host: config.host,
      port: config.port,
      servername: config.host,
    });
    const readLine = createLineReader(socket);
    const timeout = setTimeout(() => {
      socket.destroy();
      reject(new Error("Email server connection timed out."));
    }, 30000);

    socket.once("error", reject);
    socket.once("secureConnect", async () => {
      try {
        await sendSmtpCommand(socket, readLine, null, [220]);
        await sendSmtpCommand(socket, readLine, "EHLO fytbyraj.com", [250]);
        await sendSmtpCommand(socket, readLine, "AUTH LOGIN", [334]);
        await sendSmtpCommand(
          socket,
          readLine,
          Buffer.from(config.user, "utf8").toString("base64"),
          [334]
        );
        await sendSmtpCommand(
          socket,
          readLine,
          Buffer.from(config.password, "utf8").toString("base64"),
          [235]
        );
        await sendSmtpCommand(socket, readLine, `MAIL FROM:<${config.user}>`, [250]);
        await sendSmtpCommand(socket, readLine, `RCPT TO:<${config.to}>`, [250, 251]);
        await sendSmtpCommand(socket, readLine, "DATA", [354]);
        await sendSmtpCommand(socket, readLine, `${dotStuff(message)}\r\n.`, [250]);
        await sendSmtpCommand(socket, readLine, "QUIT", [221]);
        clearTimeout(timeout);
        socket.end();
        resolve();
      } catch (error) {
        clearTimeout(timeout);
        socket.destroy();
        reject(error);
      }
    });
  });
}

export async function POST(request: Request) {
  let payload: ConsultationPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const normalized = requiredFields.reduce((current, field) => {
    current[field] = clean(payload[field]);
    return current;
  }, {} as Required<ConsultationPayload>);

  const missingField = requiredFields.find((field) => !normalized[field]);
  if (missingField) {
    return Response.json(
      { error: `Please provide ${missingField}.` },
      { status: 400 }
    );
  }

  try {
    await sendEmail(getEmailConfig(), normalized);
    return Response.json({ message: "Consultation request sent successfully." });
  } catch (error) {
    console.error("Consultation email failed:", error);
    return Response.json(
      { error: "Unable to send email right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
