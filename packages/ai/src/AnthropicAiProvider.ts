import Anthropic from "@anthropic-ai/sdk";
import type { AiCompletionRequest, AiProvider } from "@aes/core";

export interface AnthropicAiProviderOptions {
  readonly apiKey: string;
  readonly model?: string;
  readonly maxTokens?: number;
}

const DEFAULT_MODEL = "claude-sonnet-5";
const DEFAULT_MAX_TOKENS = 2048;

export class AnthropicAiProvider implements AiProvider {
  private readonly client: Anthropic;
  private readonly model: string;
  private readonly maxTokens: number;

  constructor(options: AnthropicAiProviderOptions) {
    if (!options.apiKey.trim()) throw new Error("AnthropicAiProvider requires a non-empty API key.");
    this.client = new Anthropic({ apiKey: options.apiKey });
    this.model = options.model ?? DEFAULT_MODEL;
    this.maxTokens = options.maxTokens ?? DEFAULT_MAX_TOKENS;
  }

  async complete(request: AiCompletionRequest): Promise<string> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: this.maxTokens,
      system: request.system,
      messages: [{ role: "user", content: request.prompt }],
    });

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("");

    if (!text.trim()) throw new Error("Anthropic returned no text content.");
    return text;
  }
}
