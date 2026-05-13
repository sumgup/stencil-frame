import { LlmAdapter, LlmMessage, LlmResponse, LlmTier } from "../types/brand.js";

// ─── Config ──────────────────────────────────────────────────────────────────
// Tier-to-model mapping. Override via environment variables.
// Every call site in the codebase is annotated with its tier.
// This is the only place model names live.

const DEFAULT_MODELS = {
  smart: "claude-sonnet-4-20250514",
  cheap: "claude-haiku-4-5-20251001",
};

export interface AdapterConfig {
  provider: "anthropic" | "openai" | "ollama";
  apiKey?: string;
  baseUrl?: string;
  models?: {
    smart?: string;
    cheap?: string;
  };
}

function getConfig(): AdapterConfig {
  const provider = (process.env.LLM_PROVIDER ?? "anthropic") as AdapterConfig["provider"];
  return {
    provider,
    apiKey: process.env.LLM_API_KEY ?? process.env.ANTHROPIC_API_KEY,
    baseUrl: process.env.LLM_BASE_URL,
    models: {
      smart: process.env.LLM_MODEL_SMART ?? DEFAULT_MODELS.smart,
      cheap: process.env.LLM_MODEL_CHEAP ?? DEFAULT_MODELS.cheap,
    },
  };
}

// ─── Anthropic adapter ───────────────────────────────────────────────────────

async function callAnthropic(
  messages: LlmMessage[],
  model: string,
  apiKey: string
): Promise<LlmResponse> {
  const systemMessages = messages.filter((m) => m.role === "system");
  const conversationMessages = messages.filter((m) => m.role !== "system");

  const body: Record<string, unknown> = {
    model,
    max_tokens: 2048,
    messages: conversationMessages,
  };

  if (systemMessages.length > 0) {
    body.system = systemMessages.map((m) => m.content).join("\n\n");
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error ${response.status}: ${error}`);
  }

  const data = await response.json() as {
    content: Array<{ type: string; text: string }>;
    model: string;
    usage: { input_tokens: number; output_tokens: number };
  };

  const content = data.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");

  return {
    content,
    model: data.model,
    usage: data.usage,
  };
}

// ─── OpenAI adapter ──────────────────────────────────────────────────────────

async function callOpenAI(
  messages: LlmMessage[],
  model: string,
  apiKey: string,
  baseUrl = "https://api.openai.com/v1"
): Promise<LlmResponse> {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 2048,
      messages,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${error}`);
  }

  const data = await response.json() as {
    choices: Array<{ message: { content: string } }>;
    model: string;
    usage: { prompt_tokens: number; completion_tokens: number };
  };

  return {
    content: data.choices[0].message.content,
    model: data.model,
    usage: {
      input_tokens: data.usage.prompt_tokens,
      output_tokens: data.usage.completion_tokens,
    },
  };
}

// ─── Ollama adapter (local) ───────────────────────────────────────────────────

async function callOllama(
  messages: LlmMessage[],
  model: string,
  baseUrl = "http://localhost:11434"
): Promise<LlmResponse> {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages,
      stream: false,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Ollama error ${response.status}: ${error}`);
  }

  const data = await response.json() as {
    message: { content: string };
    model: string;
    prompt_eval_count?: number;
    eval_count?: number;
  };

  return {
    content: data.message.content,
    model: data.model,
    usage: {
      input_tokens: data.prompt_eval_count ?? 0,
      output_tokens: data.eval_count ?? 0,
    },
  };
}

// ─── Main adapter factory ─────────────────────────────────────────────────────

export function createAdapter(config?: AdapterConfig): LlmAdapter {
  const resolved = config ?? getConfig();

  return {
    async call(messages: LlmMessage[], tier: LlmTier): Promise<LlmResponse> {
      const model =
        resolved.models?.[tier] ?? DEFAULT_MODELS[tier];

      switch (resolved.provider) {
        case "anthropic": {
          const key = resolved.apiKey;
          if (!key) throw new Error("LLM_API_KEY or ANTHROPIC_API_KEY required for Anthropic provider");
          return callAnthropic(messages, model, key);
        }
        case "openai": {
          const key = resolved.apiKey;
          if (!key) throw new Error("LLM_API_KEY required for OpenAI provider");
          return callOpenAI(messages, model, key, resolved.baseUrl);
        }
        case "ollama": {
          return callOllama(messages, model, resolved.baseUrl);
        }
        default:
          throw new Error(`Unknown LLM provider: ${resolved.provider}`);
      }
    },
  };
}

// ─── Default singleton (reads from env) ──────────────────────────────────────
export const defaultAdapter = createAdapter();
