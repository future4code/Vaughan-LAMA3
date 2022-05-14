import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
    constructor(
        public userBusiness: UserBusiness
    ) { }

    public signup = async (req: Request, res: Response) => {
        try {

            const { name, email, password, role } = req.body

            const token = await this.userBusiness.signup(
                name,
                email,
                password,
                role
            );

            res.status(201).send({ message: "User created successfully!", token });

        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const userLogin = await this.userBusiness.login(email, password);

            res.status(200).send(userLogin)
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }
    }

}