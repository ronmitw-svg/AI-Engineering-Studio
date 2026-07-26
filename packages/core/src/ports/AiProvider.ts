export interface AiCompletionRequest {
  readonly system: string;
  readonly prompt: string;
}

export interface AiProvider {
  complete(request: AiCompletionRequest): Promise<string>;
}
