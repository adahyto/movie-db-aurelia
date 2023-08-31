import MovieDB, { Configuration, Movie } from "moviedb-promise";
import env from "../../aurelia_project/environments/dev";

import { HttpClient } from "aurelia-fetch-client";

const client = new MovieDB(env.apiKey);

let config: Configuration;


client.configuration().then(c => (config = c));

export class MovieApi {
  search(query: string) {
    return client.searchMovie({ query }).then(result =>
      Object.assign(result, {
        results: fixProfilePaths(result.results)
      })
    );
  }

  popularMovies() {
    return client
      .miscPopularMovies()
      .then(result => fixProfilePaths(result.results));
  }
}

export async function get(param: string) {
  const url = `example.com/${param}`;
  const client = new HttpClient();
  client.configure(config => {
    config
      .withBaseUrl("api/")
      .withDefaults({
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "Fetch"
        }
      })
      .withInterceptor({
        request(request) {
          console.log(`Requesting ${request.method} ${request.url}`);
          return request;
        },
        response(response) {
          console.log(`Received ${response.status} ${response.url}`);
          return response;
        }
      });
  });

  return await client.fetch(url).then(response => response.json());
}

const fixProfilePaths = (movies: Movie[]) => {
  return movies
    .filter(movie => movie.poster_path)
    .map(movie => {
      return Object.assign(movie, {
        poster_path: `${config.images.secure_base_url}/w500${movie.poster_path}`
      });
    });
};

