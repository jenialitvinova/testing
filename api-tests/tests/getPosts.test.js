import { describe, it, expect } from "vitest";
import axios from "axios";

describe("GET /posts", () => {
  it("should return a non-empty array", async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThan(0);
  });
});
