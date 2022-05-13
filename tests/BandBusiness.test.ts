import { BandBusiness } from "../src/business/BandBussiness";
import { BandDatabaseMock } from "./mocks/BandDatabaseMock";
import { bandMock } from "./mocks/bandMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";

const bandBusinessMock = new BandBusiness(
    new BandDatabaseMock() as any,
    new IdGeneratorMock()
)

const mockBandError = {
    name: null,
    musicGenre: "lala",
    responsible: "lalala"
}

describe("Teste de Registro de banda", () => {
    test("Erro ao não passar o nome", async () => {
        expect.assertions
        try {
            await bandBusinessMock.signingBand(
                mockBandError as any
            )
        } catch (error:any) {
            expect(error.message).toEqual("Please fill all the fields.")
        }
    })

    test("Sucesso ao registrar banda", async () => {
        expect.assertions
        try {
            const signBand = await bandBusinessMock.signingBand(
                bandMock
            )

            expect(signBand).toEqual({
                "message": "Band signed successfully!"
            })
            
        } catch (error: any) {
            console.log(error)
        }
    })
})