const { readDataFromFile } = require('../src/services/readDataFromFile');
const { readData } = require('../src/controllers/readFileController');

jest.mock('../src/services/readDataFromFile');

describe('readData Controller', () => {
    let req, res;

    beforeEach(() => {
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        }
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully read data from file', async () => {
        readDataFromFile.mockResolvedValue("Mock Data from file");

        await readData(req, res);

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: "Mock Data from file",
            error: null,
            message: "Successfully reading data from file"
        })
    });

    it('should return 500 if fails to read file', async () => {
        readDataFromFile.mockRejectedValue(new Error("Error reading data"));

        await readData(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            data: null,
            error: "Error reading data",
            message: "Failed to read data from file"
        }))
    });
});