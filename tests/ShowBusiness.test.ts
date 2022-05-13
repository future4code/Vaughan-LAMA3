import { DAY } from "../src/business/model/Show";
import { ShowBusiness } from "../src/business/ShowBusiness";
import { idGenerator } from "./mock/IdGeneratorMock";
import { showDatabase } from "./mock/ShowDatabaseMock";

const showBusinessMock = new ShowBusiness(
    showDatabase,
    idGenerator
);

let showMockError = {
    bandId: null,
    weekDay: "friday",
    startTime: 9,
    endTime: 10
}

let showMockSuccess = {
    bandId: "2412342",
    weekDay: "friday",
    startTime: 9,
    endTime: 10
}

describe("Testing Sign Show", () => {
    test("Error for missing field", async() => {
        expect.assertions
        try{
            await showBusinessMock.signShow(showMockError as any)
        } catch (error:any) {
            expect(error.message).toEqual("Please fill all the fields!")
        }
    })

    test("Success registering Show", async() => {
        expect.assertions
        try {
            const signShow = await showBusinessMock.signShow(showMockSuccess as any)
            expect(signShow).toEqual({
                "message": "Show signed successfully!"
            })
        } catch (error: any) {
            console.log(error)
        }
    })
});