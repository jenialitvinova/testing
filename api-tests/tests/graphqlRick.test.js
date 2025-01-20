import { describe, it, expect } from "vitest";
import axios from "axios";

const graphqlClient = axios.create({
  baseURL: "https://rickandmortyapi.com/graphql",
  headers: { "Content-Type": "application/json" },
});

describe('GraphQL query: Episodes with "Rick"', () => {
  const query = `
    query {
      episodes(filter: { name: "Rick" }) {
        results {
          name
        }
      }
    }
  `;

  it('should return episodes containing "Rick" in their names', async () => {
    const response = await graphqlClient.post("", { query });
    expect(response.status).toBe(200);

    const episodes = response.data.data.episodes.results;
    episodes.forEach((episode) => {
      expect(episode.name).toContain("Rick");
    });
  });
});
