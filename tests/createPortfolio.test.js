const { insertPortfolio } = require('../src/controllers/createPortfolioController');
const { createPortfolio } = require('../src/services/createPortfolio');

jest.mock('../src/services/createPortfolio');

describe('insertPortfolio Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                name: "Valid Portfolio Name",
            }
        }

        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should create a new portfolio successfully', async () => {
        createPortfolio.mockResolvedValue({
            id: 1,
            name: "Valid Portfolio Name"
        });

        await insertPortfolio(req, res);

        expect(createPortfolio).toHaveBeenCalledWith(req.body);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: {
                id: 1,
                name: "Valid Portfolio Name"
            },
            message: "Successfully created new portfolio",
            error: null,
        })
    });

    it('should return 500 if validation fails', async () => {
        req.body.name = "",

        await insertPortfolio(req, res);

        expect(createPortfolio).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            data: null,
            message: "Failed to create new portfolio",
            error: "name must be at least 3 characters"
        }))
    });
})