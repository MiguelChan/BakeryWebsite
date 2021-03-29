"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SuppliersMiddleware_1 = __importDefault(require("../../src/middlewares/SuppliersMiddleware"));
describe('SuppliersMiddleware', () => {
    it('Should add the SupplierId as part of the Body Request', () => {
        const testSupplierId = '12345';
        const req = mockRequest();
        req.params.supplierId = testSupplierId;
        const res = mockResponse();
        const next = jest.fn();
        SuppliersMiddleware_1.default.extractSupplierId(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
        expect(req.body.id).toContain(testSupplierId);
    });
    it('Should call next Function when all required parameters are set', () => {
        const customBody = {
            name: 'SomeName',
            phoneNumber: 'SomePhoneNumber'
        };
        const req = mockRequest();
        req.body = customBody;
        const res = mockResponse();
        const next = jest.fn();
        SuppliersMiddleware_1.default.validateRequiredFieldsForCreate(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
    });
    it('Should return a BadRequest when required fields are missing', () => {
        const req = mockRequest();
        const res = mockResponse();
        const next = jest.fn();
        SuppliersMiddleware_1.default.validateRequiredFieldsForCreate(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status(400).send).toHaveBeenCalled();
    });
    function mockRequest() {
        return {
            params: {},
            body: {}
        };
    }
    function mockResponse() {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.send = jest.fn();
        res.json = jest.fn();
        res.body = {};
        return res;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VwcGxpZXJzTWlkZGxld2FyZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHN0L21pZGRsZXdhcmVzL1N1cHBsaWVyc01pZGRsZXdhcmUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLG9HQUE0RTtBQUU1RSxRQUFRLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0lBRWpDLEVBQUUsQ0FBQyx1REFBdUQsRUFBRSxHQUFHLEVBQUU7UUFDN0QsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDO1FBRS9CLE1BQU0sR0FBRyxHQUFHLFdBQVcsRUFBRSxDQUFDO1FBQzFCLEdBQUcsQ0FBQyxNQUFPLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQztRQUV4QyxNQUFNLEdBQUcsR0FBUSxZQUFZLEVBQUUsQ0FBQztRQUNoQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7UUFFdkIsNkJBQW1CLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV0RCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdFQUFnRSxFQUFFLEdBQUcsRUFBRTtRQUN0RSxNQUFNLFVBQVUsR0FBK0I7WUFDM0MsSUFBSSxFQUFFLFVBQVU7WUFDaEIsV0FBVyxFQUFFLGlCQUFpQjtTQUNqQyxDQUFDO1FBRUYsTUFBTSxHQUFHLEdBQUcsV0FBVyxFQUFFLENBQUM7UUFDMUIsR0FBRyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7UUFFdEIsTUFBTSxHQUFHLEdBQUcsWUFBWSxFQUFFLENBQUM7UUFDM0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBRXZCLDZCQUFtQixDQUFDLCtCQUErQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFcEUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDZEQUE2RCxFQUFFLEdBQUcsRUFBRTtRQUNuRSxNQUFNLEdBQUcsR0FBRyxXQUFXLEVBQUUsQ0FBQztRQUMxQixNQUFNLEdBQUcsR0FBRyxZQUFZLEVBQUUsQ0FBQztRQUMzQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7UUFFdkIsNkJBQW1CLENBQUMsK0JBQStCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVwRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3BELENBQUMsQ0FBQyxDQUFDO0lBRUgsU0FBUyxXQUFXO1FBQ2hCLE9BQU87WUFDSCxNQUFNLEVBQUUsRUFDUDtZQUNELElBQUksRUFBRSxFQUNMO1NBQ0csQ0FBQztJQUNiLENBQUM7SUFFRCxTQUFTLFlBQVk7UUFDakIsTUFBTSxHQUFHLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNyQixHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNyQixHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=