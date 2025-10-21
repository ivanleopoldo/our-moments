import { init, InstaQLEntity } from "@instantdb/react-native";
import schema, { AppSchema } from "../instant.schema";

export type TMoment = InstaQLEntity<AppSchema, "moments">;

export const db = init({
  appId: process.env.EXPO_PUBLIC_INSTANT_APP_ID!,
  schema,
});
