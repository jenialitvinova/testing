import { describe, it, expect } from "vitest";
import axios from "axios";

describe("POST /posts", () => {
  it("should create a new post", async () => {
    const newPost = {
      title: "New Post",
      body: "This is the body of the new post",
      userId: 1,
    };

    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      newPost
    );
    expect(response.status).toBe(201);
    expect(response.data.title).toBe(newPost.title);
  });
});
