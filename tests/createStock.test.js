const { createStock } = require('../src/services/createStock');
const { getStockByName } = require('../src/services/getStockByName');
const { insertStock } = require('../src/controllers/createStockController');

jest.mock('../src/services/createStock');
jest.mock('../src/services/getStockByName');

describe('createStock Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {
                portfolioId: 1
            },
            body: {
                name: "Financial Stock 1"
            }
        };

        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockSuccessData = {
        stock_id: 1,
        portfolio_id: 1,
        name: "Financial Stock 1"
    }

    const mockFailsResult = {
        success: false,
        data: mockSuccessData,
        message: "Record already existed",
        error: null
    }

    const mockServerError = {
        success: false,
        data: null,
        message: "Failed to create new stock record: name must be at least 3 characters",
        error: "name must be at least 3 characters"
    }

    it('should succcessfully create new stock record', async () => {
        createStock.mockResolvedValue(mockSuccessData);
        getStockByName.mockResolvedValue(null);

        await insertStock(req, res);

        expect(createStock).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: true,
            data: mockSuccessData,
            message: "Successfully created new stock record",
            error: null
        }));
    });

    it('should return 409 when record existed', async () => {
        createStock.mockRejectedValue(null);
        getStockByName.mockResolvedValue(mockSuccessData);

        await insertStock(req, res);

        expect(createStock).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining(mockFailsResult));
    });

    it('should return 500 when create record fails', async () => {
        req.body.name = "";

        await insertStock(req, res);
        
        expect(createStock).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining(mockServerError))
    });
});