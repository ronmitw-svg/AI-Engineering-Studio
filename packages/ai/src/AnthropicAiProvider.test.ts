import assert from "node:assert/strict";
import test from "node:test";
import { AnthropicAiProvider } from "./AnthropicAiProvider.js";

test("constructor rejects an empty API key", () => {
  assert.throws(() => new AnthropicAiProvider({ apiKey: "  " }), /non-empty API key/);
});

test(
  "completes a real request against the Anthropic API",
  { skip: !process.env.ANTHROPIC_API_KEY && "ANTHROPIC_API_KEY is not set; skipping the live Anthropic integration test." },
  async () => {
    const provider = new AnthropicAiProvider({ apiKey: process.env.ANTHROPIC_API_KEY! });
    const response = await provider.complete({
      system: "Respond with exactly the word: pong",
      prompt: "ping",
    });
    assert.match(response.toLowerCase(), /pong/);
  },
);
