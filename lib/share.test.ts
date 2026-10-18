import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, resolveShareUrl } from "./share";

describe("resolveShareUrl", () => {
  it("converte caminho relativo em URL absoluta usando a origem informada", () => {
    expect(resolveShareUrl("/arcanos/o-mago", "https://arcana.com.br/")).toBe(
      "https://arcana.com.br/arcanos/o-mago",
    );
    expect(resolveShareUrl("arcano-anual", "https://arcana.com.br")).toBe(
      "https://arcana.com.br/arcano-anual",
    );
  });

  it("preserva URLs que já são absolutas", () => {
    expect(
      resolveShareUrl("https://exemplo.com/carta", "https://arcana.com.br"),
    ).toBe("https://exemplo.com/carta");
  });
});

describe("buildWhatsAppUrl", () => {
  it("codifica corretamente a mensagem e o link para o WhatsApp", () => {
    const url = buildWhatsAppUrl(
      "Meu arcano é O Mago!",
      "https://arcana.com.br/arcanos/o-mago",
    );
    expect(url).toBe(
      "https://api.whatsapp.com/send?text=Meu%20arcano%20%C3%A9%20O%20Mago!%20https%3A%2F%2Farcana.com.br%2Farcanos%2Fo-mago",
    );
  });
});
