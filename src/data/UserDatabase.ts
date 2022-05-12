import { User } from "../business/model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    protected tableName: string = "lama_users"

    private toUserModel(data: any): User {
        return (
            data &&
            new User(
                data.id,
                data.name,
                data.email,
                data.password,
                data.role
            ));
    }

    public async createUser(user: User): Promise<void> {
        try {
            await BaseDatabase.connection(this.tableName)
                .insert({
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    password: user.getPassword(),
                    role: user.getRole()
                });
            
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async findUserByEmail(email: string): Promise<User>{
        try {
            const user = await BaseDatabase.connection(this.tableName)
                .where({ email })

            return user[0] && this.toUserModel(user[0])
            
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}