import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import {
  CreateAWSLambdaContextOptions,
  awsLambdaRequestHandler,
} from "@trpc/server/adapters/aws-lambda";
import { APIGatewayProxyEventV2 } from "aws-lambda";

import { z } from "zod";

export const TRPC = initTRPC.create();

/**
 * Can be tested manually at `<API_ENDPOINT>/trpc/<PROCEDURE_NAME>?input=...`
 */
export const router = TRPC.router({
  hello: TRPC.procedure.input(z.string()).query((req) => {
    return `Greetings, ${req.input}?!`;
  }),
  email: TRPC.procedure
    .input(z.object({ email: z.string().email() }))
    .query((req) => {
      return `Your email is: ${req.input.email}.`;
    }),
});

export type TRPCRouter = typeof router;

const createContext = ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}); // add your context here

type Context = inferAsyncReturnType<typeof createContext>;

export const handler = awsLambdaRequestHandler({
  router,
  createContext,
});
