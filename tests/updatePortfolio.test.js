const { updatePortfolio } = require('../src/controllers/updatePortfolioController');
const { updateData } = require('../src/services/updatePortfolio');

jest.mock('../src/services/updatePortfolio');

describe('updatePortfolio Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {
                id: 1
            },
            body: {
                name: "Portfolio to be updated"
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

    it('should successfully return updated data', async () => {
        const mockUpdateData = {
            portfolio_id: 1,
            name: "Portfolio to be updated"
        }
        updateData.mockResolvedValue(mockUpdateData)

        await updatePortfolio(req, res);

        expect(updateData).toHaveBeenCalledWith(mockUpdateData);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: mockUpdateData,
            message: "Successfully updated record",
            error: null,
        })
    });

    it('should return 500 if validation fails', async () => {
        req.body.name = "";

        await updatePortfolio(req, res);

        expect(updateData).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            data: null,
            message: "Failed to update record",
        }))
    });
})