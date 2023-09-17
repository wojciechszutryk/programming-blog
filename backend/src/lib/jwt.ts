import jwt from "jsonwebtoken";
import { encrypt, setBase64, getBase64 } from "@contentpi/lib";

import { $security } from "../../config";
import { IUser } from "../types";
const { secretKey } = $security;

export function jwtVerify(accessToken: string, cb: any) {
  jwt.verify(
    accessToken,
    secretKey,
    (error: any, accessTokenData: any = {}) => {
      const { data: user } = accessTokenData;
      if (error || !user) {
        return cb(false);
      }

      const userData = getBase64(user);
      return cb(userData);
    }
  );
}

export function getUserData(accessToken: string): Promise<IUser | null> {
  const UserPromise = new Promise<IUser | null>((resolve) => {
    jwtVerify(accessToken, (userData: IUser | null) => {
      if (userData) {
        resolve(userData);
      } else {
        resolve(null);
      }
    });
  });
  const user = UserPromise.then((userData) => userData);
  return user;
}

export const createAccessToken = async (user: IUser): Promise<string[]> => {
  const { id, email, priviledge, active, username, password } = user;

  const token = setBase64(`${encrypt($security.secretKey)}${password}`);
  const userData = {
    id,
    username,
    email,
    priviledge,
    active,
    token,
  };
  const _createToken = jwt.sign(
    {
      data: setBase64(userData),
    },
    $security.secretKey,
    { expiresIn: $security.expiresIn }
  );

  return Promise.all([_createToken]);
};
