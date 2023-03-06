import { AuthChecker } from "type-graphql";
import { Context } from "./context";

export const authChecker: AuthChecker<Context> = ({ context }) => {
  const { uid } = context
  return !!uid // Double bang here converts the string to a boolean.
}
