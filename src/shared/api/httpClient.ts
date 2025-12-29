import { z } from "zod";

// This is a placeholder base URL for when we add a real API later.
const baseUrl = "https://example.com";

export const httpClient = {
  post: async <TResponse, TBody>(
    path: string,
    body: TBody,
    schema?: z.ZodSchema<TResponse>
  ): Promise<TResponse> => {
    // This is a tiny wrapper so we can swap in real API logic later.
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error("Network request failed");
    }

    const responseBody = (await response.json()) as TResponse;

    // If a Zod schema is provided, we double-check the shape here.
    if (schema) {
      return schema.parse(responseBody);
    }

    return responseBody;
  }
};
