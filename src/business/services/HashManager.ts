import bcrypt from "bcryptjs";

export class HashManager {
    public createHash = async (text: string): Promise<any> => {
        const rounds: number = Number(process.env.BCRYPT_COST)
        const salt = await bcrypt.genSalt(rounds)
        const result = await bcrypt.hash(text, salt)
        return result
    }

    public compareHash = async (text: string, hash: string): Promise<boolean> => {
        return bcrypt.compare(text, hash)
    }
};