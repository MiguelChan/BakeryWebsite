import {
    SupplierService,
    supplierService, 
} from '../../src/services/SupplierService';
import express from 'express';
import { Supplier } from '../../src/models';
import SuppliersController from '../../src/controllers/SuppliersController';
jest.mock('../../src/services/SupplierService')

describe('SuppliersController', () => {

    const getSuppliersMockFn = supplierService.getSuppliers as jest.Mock;
    let mockRequest: express.Request | null;
    let mockResponse: express.Response | null;

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
        const suppliersList: Supplier[] = [];
        getSuppliersMockFn.mockImplementation(() => {
            return suppliersList;
        });

        SuppliersController.getSuppliers(mockRequest!, mockResponse!);

        expect(getSuppliersMockFn).toHaveBeenCalledTimes(1);
        expect(mockResponse!.status).toHaveBeenCalledWith(200);
        expect(mockResponse!.status(200).send).toHaveBeenCalledWith(suppliersList);
    });

    function createMockRequest(): express.Request {
        const request: any = {
            body: {},
            params: {},
        };
        return request;
    }

    function createMockResponse(): express.Response {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.send = jest.fn();
        res.json = jest.fn();
        res.body = {};
        return res;
    }

});