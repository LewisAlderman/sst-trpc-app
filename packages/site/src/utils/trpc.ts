import { createTRPCReact } from "@trpc/react-query";
import type { TRPCRouter } from "../../../functions/src/trpc";

export const trpc = createTRPCReact<TRPCRouter>();
