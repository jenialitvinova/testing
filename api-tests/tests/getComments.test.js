import { describe, it, expect } from "vitest";
import { httpClient } from "../utils/httpClient";

describe("GET /comments with parameter", () => {
  const parameter = 1;

  it("should return a non-empty array with postId equal to parameter", async () => {
    const response = await httpClient.get(`/comments?postId=${parameter}`);
    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThan(0);
    response.data.forEach((comment) => {
      expect(comment.postId).toBe(parameter);
    });
  });
});
