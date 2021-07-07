import {
  CreateSupplierDto,
} from '../../src/dtos';
import {
  SuppliersMiddleware,
} from '../../src/middlewares/SuppliersMiddleware';
import {
  createMockRequest,
  createMockResponse,
} from '../utils/ExpressUtils';

describe('SuppliersMiddleware', () => {
  let suppliersMiddleware: SuppliersMiddleware;

  beforeEach(() => {
    suppliersMiddleware = new SuppliersMiddleware();
  });

  it('Should add the SupplierId as part of the Body Request', () => {
    const testSupplierId = '12345';

    const req = createMockRequest();
    req.params!.supplierId = testSupplierId;

    const res: any = createMockResponse();
    const next = jest.fn();

    suppliersMiddleware.extractSupplierId(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.body.id).toContain(testSupplierId);
  });

  it('Should add the ContactId as part of the Body Request', () => {
    const testContactId = '12345';

    const req = createMockRequest();
    req.params!.contactId = testContactId;

    const res: any = createMockResponse();
    const next = jest.fn();

    suppliersMiddleware.extractContactId(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.body.contactId).toContain(testContactId);
  });

  it('Should call next Function when all required parameters are set', () => {
    const customBody: Partial<CreateSupplierDto> = {
      contacts: [],
      supplier: {
        name: 'SomeName',
        phoneNumber: 'SomePhoneNumber',
        lineAddress1: '',
        lineAddress2: '',
        contacts: [],
        id: '',
      },
    };

    const req = createMockRequest();
    req.body = customBody;

    const res = createMockResponse();
    const next = jest.fn();

    suppliersMiddleware.validateRequiredFieldsForCreate(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('Should return a BadRequest when required fields are missing', () => {
    const req = createMockRequest();
    const res = createMockResponse();
    const next = jest.fn();

    suppliersMiddleware.validateRequiredFieldsForCreate(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status(400).send).toHaveBeenCalled();
  });
});
