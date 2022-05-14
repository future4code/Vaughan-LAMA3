import { request, Request, response, Response } from "express";
import { BandBusiness } from "../business/BandBussiness";
import { BandinputdDTO, getbandByInputDTO } from "../business/model/Band";
import { Authenticator } from "../business/services/Authenticator";

export class BandController {
    constructor(
        private bandBusiness: BandBusiness
    ) { }

    public signingBand = async (request: Request, response: Response): Promise<void> => {

        try {
            const { name, musicGenre, responsible } = request.body;
            const token = request.headers.authorization

            if (!token) {
                throw new Error("Authorization needed.")
            }

            const authenticator = new Authenticator();
            const tokenData = authenticator.getTokenData(token);

            if (tokenData.role !== "ADMIN") {
                throw new Error("You don't have permission to sign a band.")
            }

            const input: BandinputdDTO = {
                name,
                musicGenre,
                responsible
            }

            await this.bandBusiness.signingBand(input)

            response.status(201).send({ message: "Band signed successfully!" })

        } catch (error: any) {
            response.status(400).send({ message: error.message })
        }

    }

    public getBandByIdName = async (request: Request, response: Response): Promise<void> => {
        try {

            const { id, name } = request.query;

            const inputDTO: getbandByInputDTO = {
                id: id as string,
                name: name as string
            }

            const result = await this.bandBusiness.getBandByIdName(inputDTO)

            response.send(result)
        } catch (error: any) {
            throw new Error(error.message);
        }

    }
}