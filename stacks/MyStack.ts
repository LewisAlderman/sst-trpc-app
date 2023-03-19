import { StackContext, Api, StaticSite } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /trpc/{proxy+}": "packages/functions/src/trpc.handler",
      "POST /trpc/{proxy+}": "packages/functions/src/trpc.handler",
    },
  });

  const site = new StaticSite(stack, "Site", {
    path: "packages/site",
    buildCommand: "yarn build",
    buildOutput: "dist",
    environment: {
      VITE_API_URL: api.url,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
