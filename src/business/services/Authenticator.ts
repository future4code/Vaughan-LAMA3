import { AuthenticationData } from "../types/AuthenticationData";
import * as jwt from "jsonwebtoken";

export class Authenticator {
    public generateToken = (payload: AuthenticationData) => {
        const token = jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
            }
        );
        return token
    }

    public getTokenData = (token: string): AuthenticationData => {
        const data = jwt.verify(token, String(process.env.JWT_KEY))
        return data as AuthenticationData;
    };
}