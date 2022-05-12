import { UserDatabase } from "../data/UserDatabase";
import { stringToUserRole, User } from "./model/User";
import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/IdGenerator";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator,
        private HashManager: HashManager
    ) { }

    async signup(
        name: string,
        email: string,
        password: string,
        role: string
    ) {
        try {

            if (!name || !email || !password || !role) {
                throw new Error("Please fill all the fields.")
            }

            const user = await this.userDatabase.findUserByEmail(email);

            if (user) {
                throw new Error("This email has already been registered.")
            }

            const id = this.idGenerator.generateId();

            const hashPassword = await this.HashManager.createHash(password);

            await this.userDatabase.createUser(
                new User(
                    id,
                    name,
                    email,
                    hashPassword,
                    stringToUserRole(role)
                )
            );

            const token = this.authenticator.generateToken({
                id,
                role
            });

            return { token }

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async login(email: string, password: string) {
        try {
            if (!email || !password) {
                throw new Error("Please fill all the fields.")
            }

            const user = await this.userDatabase.findUserByEmail(email)

            if (!user) {
                throw new Error("Invalid email.")
            };

            const passwordVerifier = await this.HashManager.compareHash(
                password,
                user.getPassword()
            );

            if (!passwordVerifier) {
                throw new Error("Incorrect password.")
            }

            const accessToken = this.authenticator.generateToken({
                id: user.getId(),
                role: user.getRole()
            })

            return { accessToken }

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}