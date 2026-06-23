import { describe, it, expect } from "vitest";
import { parseContactRequest } from "./validation";

describe("parseContactRequest - sanity check", () => {
  it("returns ok:true for valid input", () => {
    const result = parseContactRequest({
      name: "Jan Kowalski",
      email: "jan@example.com",
      phone: "+48 123 456",
      message: "Opis projektu",
      company: "",
    });
    expect(result).toEqual({
      ok: true,
      data: {
        name: "Jan Kowalski",
        email: "jan@example.com",
        phone: "+48 123 456",
        message: "Opis projektu",
      },
    });
  });

  it("normalizes empty phone to null", () => {
    const result = parseContactRequest({
      name: "A",
      email: "a@b",
      phone: "",
      message: "ok",
      company: "",
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.phone).toBeNull();
  });

  it("normalizes null/undefined phone to null", () => {
    const result = parseContactRequest({
      name: "A",
      email: "a@b",
      phone: null,
      message: "ok",
      company: "",
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.phone).toBeNull();
  });

  it("rejects honeypot", () => {
    const result = parseContactRequest({
      name: "Jan",
      email: "jan@ex.com",
      phone: "",
      message: "Hello",
      company: "bot-filled",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fields.company).toBeDefined();
  });

  it("collects multiple errors", () => {
    const result = parseContactRequest({
      name: "",
      email: "bad",
      phone: "123456789012345678901",
      message: "",
      company: "",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fields.name).toBeDefined();
      expect(result.fields.email).toBeDefined();
      expect(result.fields.phone).toBeDefined();
      expect(result.fields.message).toBeDefined();
    }
  });

  it("trims whitespace before validation", () => {
    const result = parseContactRequest({
      name: "  Jan  ",
      email: "  jan@ex.com  ",
      phone: "  123  ",
      message: "  Hello  ",
      company: "",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe("Jan");
      expect(result.data.email).toBe("jan@ex.com");
      expect(result.data.phone).toBe("123");
      expect(result.data.message).toBe("Hello");
    }
  });

  it("rejects non-string types gracefully", () => {
    const result = parseContactRequest({
      name: 123,
      email: undefined,
      phone: undefined,
      message: undefined,
      company: undefined,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fields.name).toBeDefined();
      expect(result.fields.email).toBeDefined();
      expect(result.fields.message).toBeDefined();
    }
  });

  it("rejects email without @", () => {
    const result = parseContactRequest({
      name: "A",
      email: "noatsign",
      phone: "",
      message: "ok",
      company: "",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fields.email).toBeDefined();
  });

  it("rejects email with nothing before @", () => {
    const result = parseContactRequest({
      name: "A",
      email: "@domain.com",
      phone: "",
      message: "ok",
      company: "",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fields.email).toBeDefined();
  });

  it("rejects email with nothing after @", () => {
    const result = parseContactRequest({
      name: "A",
      email: "user@",
      phone: "",
      message: "ok",
      company: "",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fields.email).toBeDefined();
  });

  it("rejects phone with invalid characters", () => {
    const result = parseContactRequest({
      name: "A",
      email: "a@b",
      phone: "123-abc",
      message: "ok",
      company: "",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fields.phone).toBeDefined();
  });
});
