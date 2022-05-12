import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public async signup(req: Request, res: Response) {
        try {

            const { name, email, password, role } = req.body

            const newUser = await this.userBusiness.signup(
                name,
                email,
                password,
                role
            );

            res.status(201).send(newUser);

        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const userLogin = await this.userBusiness.login(email, password);

            res.status(200).send(userLogin)
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }
    }

}