import { describe, it, expect } from "vitest";
import { httpClient } from "../utils/httpClient";

describe("GET /posts", () => {
  it("should return a non-empty array", async () => {
    const response = await httpClient.get("/posts");
    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThan(0);
  });
});
