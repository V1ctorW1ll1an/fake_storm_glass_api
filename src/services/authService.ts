import { IUserModel } from "@src/model/interfaces/IUserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";

export class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public static generateToken(payload: IUserModel): string {
    const payloadJson = payload.toJSON();
    return jwt.sign(payloadJson, config.get("App.auth.key"), {
      expiresIn: config.get("App.auth.tokenExpiresIn"),
    });
  }
}
