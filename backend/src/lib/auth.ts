import { AuthenticationError } from "apollo-server";
import { encrypt, isPasswordMatch } from "@contentpi/lib";
import { IUser, IModels, IAuthPayload } from "../types";

import { createAccessToken } from "./jwt";

export const getUserBy = async (
  where: any,
  models: IModels
): Promise<IUser | null> => {
  const user = await models.User.findOne({ where, raw: true });
  return user;
};

export const doLogin = async (
  email: string,
  password: string,
  models: IModels
): Promise<IAuthPayload> => {
  const user = await getUserBy({ email }, models);

  if (!user) {
    throw new AuthenticationError("User not found");
  }

  const isPasswordValid = isPasswordMatch(encrypt(password), user.password);

  if (!isPasswordValid) {
    throw new AuthenticationError("Invalid email or password");
  }

  const isActive = user.active;

  if (!isActive) {
    throw new AuthenticationError("User account hasn't been activated");
  }

  const [token] = await createAccessToken(user);
  return { token };
};
