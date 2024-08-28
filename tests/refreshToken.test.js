const { refreshClientToken } = require('../src/controllers/refreshTokenController');
const { refreshToken } = require('../src/services/refreshToken');
const { getTokenByClientNameOrId } = require('../src/services/getTokenByClientNameOrId');

jest.mock('../src/services/refreshToken');
jest.mock('../src/services/getTokenByClientNameOrId');

describe('refreshClientToken Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            query: {
                clientId: 'client_id'
            }
        };

        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        }
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockData = {
        id: "4514",
        client_id: "client_id",
        client_name: "localhost",
        role: "standard",
        created_at: "2024-08-21T06:40:30.804Z",
        updated_at: "2024-08-28T18:33:54.670Z",
        is_active: true,
        expires_at: "1755744029273",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiIvU1FYaFFDaDF6YW9yakdMTkxHVlFFcnZZNzJidkRESmF0Y1BNQjJ4RGl3PSIsImNsaWVudF9uYW1lIjoibG9jYWxob3N0Iiwicm9sZSI6InN0YW5kYXJkIiwiaXNfYWN0aXZlIjp0cnVlLCJleHBpcmVzX2F0IjoiMTc1NTc0NDAyOTI3MyIsImlhdCI6MTcyNDg1NTYzMywiZXhwIjoxNzI0ODU5MjMzfQ.zulSFWh27TeIvOdUmIhNacCExSMgIz2_WysAfdmUNF8"
    }

    it('should successfully refreshed token', async () => {
        refreshToken.mockResolvedValue({
            success: true,
            data: mockData,
            message: "Successfully refreshed token",
            error: null
        })
        getTokenByClientNameOrId.mockResolvedValue(mockData);

        await refreshClientToken(req, res);

        expect(refreshToken).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            data: {
                success: true,
                data: mockData,
                message: "Successfully refreshed token",
                error: null
            }
        }))
    });

    it('should return 400 when invalid client_id', async () => {
        req.query.clientId = '';

        await refreshClientToken(req, res);

        expect(refreshToken).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            data: null,
            message: 'Invalid client_id: ',
            error: null
        }))
    });

    it('should return 404 when client not exist', async () => {
        getTokenByClientNameOrId.mockResolvedValue(null);

        await refreshClientToken(req, res);

        expect(refreshToken).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            data: null,
            message: 'Client not existed: client_id',
            error: null
        }))
    });

    it('should return 500 when fails to refresh token', async () => {
        getTokenByClientNameOrId.mockResolvedValue(mockData);
        refreshToken.mockRejectedValue(new Error('Database error'));

        await refreshClientToken(req, res);

        expect(refreshToken).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            data: null,
            message: 'Failed to refresh client token: Database error',
            error: 'Database error'
        }))
    });
});