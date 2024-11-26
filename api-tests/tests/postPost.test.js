import { describe, it, expect } from "vitest";
import { httpClient } from "../utils/httpClient";

describe("POST /posts", () => {
  const postData = {
    title: "test title",
    body: "test body",
    userId: 1,
  };

  it("should create a new post with the correct data", async () => {
    const response = await httpClient.post("/posts", postData);
    expect(response.status).toBe(201);
    expect(response.data).toEqual({
      id: 101, // ID is mocked by the API
      ...postData,
    });
  });
});
