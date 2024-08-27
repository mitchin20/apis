const { createToken } = require('../src/services/createToken');
const { getTokenByClientNameOrId } = require('../src/services/getTokenByClientNameOrId');
const { insertToken } = require('../src/controllers/createTokenController');

jest.mock('../src/services/createToken');
jest.mock('../src/services/getTokenByClientNameOrId');

describe('insertToken Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                client_name: 'localhost'
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
        id: "abc-123",
        client_id: "abcabc123123",
        client_name: "localhost",
        role: "standard",
        created_at: "2024-08-21T06:40:30.804Z",
        updated_at: "2024-08-21T06:40:30.804Z",
        is_active: true,
        expires_at: "1755744029273",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiIvU1FYaFFDaDF6YW9yakdMTkxHVlFFcnZZNzJidkRESmF0Y1BNQjJ4RGl3PSIsImNsaWVudF9uYW1lIjoibG9jYWxob3N0Iiwicm9sZSI6InN0YW5kYXJkIiwiaXNfYWN0aXZlIjp0cnVlLCJleHBpcmVzX2F0IjoxNzU1NzQ0MDI5MjczLCJpYXQiOjE3MjQyMDgwMjksImV4cCI6MTcyNDIxMTYyOX0.bxZCn1KR-q73xl2QosQ5ugHMkbq3dp4xbzDYl3WuBlo"
    }

    it('should successfully create new token record', async () => {
        createToken.mockResolvedValue({
            success: true,
            data: mockData,
            message: "Successfully created new Client Token",
            error: null
        });

        getTokenByClientNameOrId.mockResolvedValue(null);

        await insertToken(req, res);

        expect(createToken).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            data: {
                success: true,
                data: mockData,
                message: "Successfully created new Client Token",
                error: null
            }
        }))
    });

    it('should return 409 when client_name already existed', async () => {
        createToken.mockRejectedValue(null);
        getTokenByClientNameOrId.mockResolvedValue(mockData);

        await insertToken(req, res);

        expect(createToken).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            data: null,
            message: `Client already existed: ${req.body.client_name}`,
            error: null
        }));
    });

    it('should return 500 when fails to create new record', async () => {
        req.body.client_name = ""

        await insertToken(req, res);

        expect(createToken).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            data: null,
            message: "Failed to create new Token record: client_name must be at least 8 characters",
            error: "client_name must be at least 8 characters"
        }))
    });
})