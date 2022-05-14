import { BandBusiness } from "../src/business/BandBussiness";
import { bandDatabase } from "./mock/BandDataBaseMock";
import { bandMock } from "./mock/bandMock";
import { idGenerator } from "./mock/IdGeneratorMock";

const mockBandError = {
    name: null,
    musicGenre: "lala",
    responsible: "lalala"
}

const bandBusinessMock = new BandBusiness(
    bandDatabase,
    idGenerator
)

describe("Testing signing band", () => {
    test("Error not filling name", async () => {
        expect.assertions
        try {
            await bandBusinessMock.signingBand(
                mockBandError as any
            )
        } catch (error:any) {
            expect(error.message).toEqual("Please fill all the fields.")
        }
    })

    test("Success signing band", async () => {
        expect.assertions
        try {
            const signBand = await bandBusinessMock.signingBand(
                bandMock
            )

            expect(signBand).toEqual("Band signed successfully!")
            
        } catch (error: any) {
            console.log(error)
        }
    })
})