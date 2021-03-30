import {
  CreateSupplierDto,
} from '../../src/dtos';
import SuppliersMiddleware from '../../src/middlewares/SuppliersMiddleware';
import {
  createMockRequest,
  createMockResponse,
} from '../utils/ExpressUtils';

describe('SuppliersMiddleware', () => {
  it('Should add the SupplierId as part of the Body Request', () => {
    const testSupplierId = '12345';

    const req = createMockRequest();
    req.params!.supplierId = testSupplierId;

    const res: any = createMockResponse();
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

    const req = createMockRequest();
    req.body = customBody;

    const res = createMockResponse();
    const next = jest.fn();

    SuppliersMiddleware.validateRequiredFieldsForCreate(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('Should return a BadRequest when required fields are missing', () => {
    const req = createMockRequest();
    const res = createMockResponse();
    const next = jest.fn();

    SuppliersMiddleware.validateRequiredFieldsForCreate(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status(400).send).toHaveBeenCalled();
  });
});
