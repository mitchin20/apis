const { portfolios } = require('../src/controllers/portfoliosController');
const { getPortfolios } = require('../src/services/getPortfolios');

jest.mock('../src/services/getPortfolios');

describe('portfolios Controller', () => {
    let req, res;

    beforeEach(() => {
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully get all portfolios', async () => {
        getPortfolios.mockResolvedValue([
            {
                id: 1,
                name: "Valid Portfolio Name",
            }
        ])

        await portfolios(req, res);

        expect(getPortfolios).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: [
                {
                    id: 1,
                    name: "Valid Portfolio Name"
                }
            ],
            message: "Successfully fetched portfolios",
            error: null
        })
    });

    it('should return 500 if fetching data fails', async () => {
        getPortfolios.mockRejectedValue(new Error('Database Error'))

        await portfolios(req, res);

        expect(getPortfolios).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            data: null,
            message: "Failed to fetch portfolios",
            error: "Database Error"
        }))
    })
})