import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { DbService } from "../services/DbService";
import { LoginParams } from "../types/types";

export const loginMutation = async (
  parent: null | undefined,
  { email, password }: LoginParams
) => {
  const user = await DbService.getUser(email);

  if (!user) {
    return {
      ok: false,
      error: "El usuario no existe",
    };
  }
  const isEqual = await bcrypt.compareSync(password, user.password);
  if (!isEqual) {
    return {
      ok: false,
      error: "Contraseña incorrecta",
    };
  }
  const token = sign({ email: user.email }, process.env.SECRET as string, {
    expiresIn: "1h",
  });
  DbService.updateTokenOnUser(user.email, token);
  return { ok: true, email: user.email, token, tokenExpirationHours: 1 };
};
