import Image from "next/image";
import Link from "next/link";
import { ConsultationForm } from "./consultation-form";
import { SiteHeader } from "./site-header";

const proofPoints = [
  ["10+ Years", "Diet, nutrition, fitness, and transformation experience"],
  ["102 kg to 78 kg", "A personal transformation that shapes the method"],
  ["Holistic Wellness", "Nutrition, lifestyle, Ayurveda-inspired guidance"],
  ["Multiple Ventures", "FITOJA, FYTBYRAJ, and Hindustan Food"],
];

const programs = [
  "Weight management",
  "Customized diet consultation",
  "Lifestyle coaching",
  "Natural wellness support",
  "Preventive health guidance",
  "Ayurveda-inspired nutrition",
];

export default function Home() {
  return (
    <main className="site-shell">
      <section className="home-hero" style={{ position: "relative" }}>
        <Image
          src="/assets/rituraj-burj-khalifa-portrait.jpg"
          alt="FYTBYRAJ founder standing in front of Burj Khalifa"
          fill
          className="home-hero__image"
          priority
          sizes="100vw"
        />
        <div className="home-hero__shade" />

        <div className="home-hero__content">
          <SiteHeader />

          <div className="home-hero__copy">
            <p className="eyebrow eyebrow--light">
              Premium nutrition, fitness and holistic wellness
            </p>
            <h1 className="signature-title">Fyt By Raj</h1>
            <p>
              A premium fitness, nutrition and holistic wellness platform
              guiding sustainable body transformation through practical
              nutrition, disciplined lifestyle habits, and experience-led
              consultation.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#consultation">
                Get Consultation
              </a>
              <Link className="button button--ghost" href="/about">
                Read About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="FYTBYRAJ highlights">
        <div className="proof-strip__inner">
          {proofPoints.map(([value, label]) => (
            <article key={value} className="proof-item">
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band content-band--white">
        <div className="section-grid section-grid--reverse">
          <div className="editorial-copy">
            <p className="eyebrow">The FYTBYRAJ method</p>
            <h2>Practical transformation for real schedules.</h2>
            <p>
              The FYTBYRAJ approach combines personal transformation, nutrition
              training, Ayurveda-informed wellness, and more than a decade of
              industry experience to make healthier routines feel achievable
              instead of extreme.
            </p>
            <div className="program-list" aria-label="Consultation areas">
              {programs.map((program) => (
                <span key={program}>{program}</span>
              ))}
            </div>
          </div>

          <div className="portrait-feature">
            <Image
              src="/assets/rituraj-limo-full-look.jpg"
              alt="FYTBYRAJ full look portrait"
              width={1505}
              height={1304}
              className="portrait-feature__image"
              sizes="(max-width: 900px) 100vw, 48vw"
            />
          </div>
        </div>
      </section>

      <section className="content-band content-band--ink">
        <div className="section-heading section-heading--light">
          <p className="eyebrow eyebrow--light">Recognition and presence</p>
          <h2>Credibility with a distinct public profile.</h2>
          <p>
            Awards, media moments, and public appearances support a wellness
            brand built on both professional expertise and personal discipline.
          </p>
        </div>

        <div className="image-grid">
          <figure className="image-tile image-tile--contain">
            <Image
              src="/assets/rituraj-award-presentation.jpeg"
              alt="FYTBYRAJ award presentation"
              width={853}
              height={985}
              sizes="(max-width: 900px) 100vw, 33vw"
            />
          </figure>
          <figure className="image-tile image-tile--contain">
            <Image
              src="/assets/rituraj-award-ceremony.jpeg"
              alt="FYTBYRAJ award ceremony"
              width={739}
              height={851}
              sizes="(max-width: 900px) 100vw, 33vw"
            />
          </figure>
          <figure className="image-tile image-tile--contain">
            <Image
              src="/assets/rituraj-iifa-festival.jpg"
              alt="FYTBYRAJ IIFA Festival appearance"
              width={646}
              height={712}
              sizes="(max-width: 900px) 100vw, 33vw"
            />
          </figure>
        </div>
      </section>

      <section id="consultation" className="consultation-section">
        <div className="consultation-layout">
          <article className="consultation-card">
            <div className="consultation-copy">
              <p className="eyebrow">Start here</p>
              <h2>Request your consultation.</h2>
              <p>
                Share the basic details needed to begin a fitness and nutrition
                conversation with FytByRaj. The request is sent directly to the
                official consultation inbox.
              </p>
            </div>
            <div className="consultation-media">
              <Image
                src="/assets/rituraj-editorial-seated-crop.jpg"
                alt="FYTBYRAJ consultation portrait"
                width={700}
                height={500}
                className="consultation-media__image"
                sizes="(max-width: 900px) 70vw, 32vw"
              />
            </div>
          </article>

          <div className="form-surface form-surface--consultation">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </main>
  );
}
