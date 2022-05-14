export let bandDatabase = {
    insertingBand: jest.fn(),
    getBandById: jest.fn(() => ({})),
    getBandByName: jest.fn(() => ({}))
} as any