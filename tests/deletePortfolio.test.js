const { deletePortfolio } = require('../src/services/deletePortfolio');
const { getPortfolioById } = require('../src/services/getPortfolioById');
const { removePortfolio } = require('../src/controllers/deletePortfolioController');

jest.mock('../src/services/deletePortfolio');
jest.mock('../src/services/getPortfolioById');

describe('removePortfolio Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {
                id: 1
            }
        }

        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully remove portfolio', async () => {
        deletePortfolio.mockResolvedValue({
            success: true,
            data: {
                portfolio_id: 1
            },
            message: "Successfully deleted record",
            error: null
        })

        getPortfolioById.mockResolvedValue({
            portfolio_id: 1,
            name: 'Financial Project 3',
            updated_at: "2024-08-19T20:46:23.677Z",
            created_at: "2024-08-19T20:46:23.677Z"
        })

        await removePortfolio(req, res);

        expect(deletePortfolio).toHaveBeenCalledWith(req.params.id)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            data: {
                data: {
                    portfolio_id: 1
                }, 
                error: null, 
                message: "Successfully deleted record", 
                success: true
            }, 
            error: null, 
            message: "Successfully deleted record", 
            success: true
        }))
    });

    it('should return 404 record not found', async () => {
        getPortfolioById.mockResolvedValue(null);

        await removePortfolio(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            data: null,
            message: `Record not found by ID: ${req.params.id}`,
            error: null
        }))
    });

    it('should return 500 when deletePortfolio service fails', async () => {
        getPortfolioById.mockResolvedValue({
            portfolio_id: 1,
            name: "Financial Project 3",
            updated_at: "2024-08-19T20:46:23.677Z",
            created_at: "2024-08-19T20:46:23.677Z"
        })

        deletePortfolio.mockRejectedValue(new Error('Database connection error'));

        await removePortfolio(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            data: null,
            message: "Failed to delete record",
            error: "Database connection error"
        }))
    });
});