"use client";

import { FormEvent, useState } from "react";

type ConsultationFormState = {
  name: string;
  phone: string;
  height: string;
  weight: string;
  age: string;
};

const initialState: ConsultationFormState = {
  name: "",
  phone: "",
  height: "",
  weight: "",
  age: "",
};

export function ConsultationForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json().catch(() => null)) as {
        error?: string;
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(result?.error || "Unable to send consultation request.");
      }

      setForm(initialState);
      setStatus(result?.message || "Consultation request sent successfully.");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Unable to send consultation request."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="consultation-form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          required
          type="text"
          value={form.name}
          onChange={(event) =>
            setForm((current) => ({ ...current, name: event.target.value }))
          }
          placeholder="Enter your name"
        />
      </div>

      <div className="field">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          required
          type="tel"
          value={form.phone}
          onChange={(event) =>
            setForm((current) => ({ ...current, phone: event.target.value }))
          }
          placeholder="+91 98765 43210"
        />
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="height">Height</label>
          <input
            id="height"
            required
            type="text"
            value={form.height}
            onChange={(event) =>
              setForm((current) => ({ ...current, height: event.target.value }))
            }
            placeholder="5'8&quot; or 173 cm"
          />
        </div>

        <div className="field">
          <label htmlFor="weight">Weight</label>
          <input
            id="weight"
            required
            type="text"
            value={form.weight}
            onChange={(event) =>
              setForm((current) => ({ ...current, weight: event.target.value }))
            }
            placeholder="78 kg"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="age">Age</label>
        <input
          id="age"
          required
          min="1"
          type="number"
          value={form.age}
          onChange={(event) =>
            setForm((current) => ({ ...current, age: event.target.value }))
          }
          placeholder="32"
        />
      </div>

      <button className="button button--form" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending Request..." : "Send Consultation Request"}
      </button>

      {status ? <p className="form-status">{status}</p> : null}
    </form>
  );
}
