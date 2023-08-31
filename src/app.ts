import { PLATFORM } from "aurelia-pal";
import { RouterConfiguration, Router } from "aurelia-router";
import runtime from "serviceworker-webpack-plugin/lib/runtime";

if ("serviceWorker" in navigator) {
  console.log("x");
  runtime
    .register()
    .then(function(registration) {
      console.log("Service worker is registered", registration);
    })
    .catch(registrationError =>
      console.log("Service worker failed to register", registrationError)
    );
} else {
    console.log("Service worker is not available in this browser.");
}

export class App {
  public message: string = "Hello World!";
  configureRouter(config: RouterConfiguration, router: Router) {
    config.options.pushState = true;

     config.map([
      {
        route: ["", "popular"],
        name: "popular",
        title: "Popular movies",
        moduleId: PLATFORM.moduleName("pages/popular-movies"),
        nav: true
      },
      {
        route: "search/:term",
        name: "search",
        moduleId: PLATFORM.moduleName("pages/search-results")
      }
    ]);
  }
}
