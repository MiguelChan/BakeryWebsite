"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SupplierService_1 = require("../../src/services/SupplierService");
const SuppliersController_1 = __importDefault(require("../../src/controllers/SuppliersController"));
jest.mock('../../src/services/SupplierService');
describe('SuppliersController', () => {
    const getSuppliersMockFn = SupplierService_1.supplierService.getSuppliers;
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = createMockRequest();
        mockResponse = createMockResponse();
    });
    afterEach(() => {
        getSuppliersMockFn.mockClear();
        mockRequest = null;
        mockResponse = null;
    });
    it('Should return a List of all Suppliers', () => {
        const suppliersList = [];
        getSuppliersMockFn.mockImplementation(() => {
            return suppliersList;
        });
        SuppliersController_1.default.getSuppliers(mockRequest, mockResponse);
        expect(getSuppliersMockFn).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.status(200).send).toHaveBeenCalledWith(suppliersList);
    });
    function createMockRequest() {
        const request = {
            body: {},
            params: {},
        };
        return request;
    }
    function createMockResponse() {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.send = jest.fn();
        res.json = jest.fn();
        res.body = {};
        return res;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VwcGxpZXJzQ29udHJvbGxlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHN0L2NvbnRyb2xsZXJzL1N1cHBsaWVyc0NvbnRyb2xsZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdFQUc0QztBQUc1QyxvR0FBNEU7QUFDNUUsSUFBSSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFBO0FBRS9DLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7SUFFakMsTUFBTSxrQkFBa0IsR0FBRyxpQ0FBZSxDQUFDLFlBQXlCLENBQUM7SUFDckUsSUFBSSxXQUFtQyxDQUFDO0lBQ3hDLElBQUksWUFBcUMsQ0FBQztJQUUxQyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ1osV0FBVyxHQUFHLGlCQUFpQixFQUFFLENBQUM7UUFDbEMsWUFBWSxHQUFHLGtCQUFrQixFQUFFLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ1gsa0JBQWtCLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0IsV0FBVyxHQUFHLElBQUksQ0FBQztRQUNuQixZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHVDQUF1QyxFQUFFLEdBQUcsRUFBRTtRQUM3QyxNQUFNLGFBQWEsR0FBZSxFQUFFLENBQUM7UUFDckMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFO1lBQ3ZDLE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBRUgsNkJBQW1CLENBQUMsWUFBWSxDQUFDLFdBQVksRUFBRSxZQUFhLENBQUMsQ0FBQztRQUU5RCxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsWUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxZQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQy9FLENBQUMsQ0FBQyxDQUFDO0lBRUgsU0FBUyxpQkFBaUI7UUFDdEIsTUFBTSxPQUFPLEdBQVE7WUFDakIsSUFBSSxFQUFFLEVBQUU7WUFDUixNQUFNLEVBQUUsRUFBRTtTQUNiLENBQUM7UUFDRixPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsU0FBUyxrQkFBa0I7UUFDdkIsTUFBTSxHQUFHLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNyQixHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNyQixHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=