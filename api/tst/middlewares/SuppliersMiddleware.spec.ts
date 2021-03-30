import express from 'express';
import { 
    CreateSupplierDto,
} from '../../src/dtos';
import SuppliersMiddleware from '../../src/middlewares/SuppliersMiddleware';

describe('SuppliersMiddleware', () => {

    it('Should add the SupplierId as part of the Body Request', () => {
        const testSupplierId = '12345';

        const req = mockRequest();
        req.params!.supplierId = testSupplierId;

        const res: any = mockResponse();
        const next = jest.fn();

        SuppliersMiddleware.extractSupplierId(req, res, next);
        
        expect(next).toHaveBeenCalledTimes(1);
        expect(req.body.id).toContain(testSupplierId);
    });

    it('Should call next Function when all required parameters are set', () => {
        const customBody: Partial<CreateSupplierDto> = {
            contacts: [],
            supplier: {
                name: 'SomeName',
                phoneNumber: 'SomePhoneNumber',
                addressLine1: '',
                addressLine2: '',
                contacts: [],
                id: '',
            },
        };

        const req = mockRequest();
        req.body = customBody;

        const res = mockResponse();
        const next = jest.fn();

        SuppliersMiddleware.validateRequiredFieldsForCreate(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
    });

    it('Should return a BadRequest when required fields are missing', () => {
        const req = mockRequest();
        const res = mockResponse();
        const next = jest.fn();

        SuppliersMiddleware.validateRequiredFieldsForCreate(req, res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status(400).send).toHaveBeenCalled();
    });

    function mockRequest(): express.Request {
        return {
            params: {
            },
            body: {
            }
        } as any;
    }

    function mockResponse(): express.Response {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.send = jest.fn();
        res.json = jest.fn();
        res.body = {};
        return res;
    }

});