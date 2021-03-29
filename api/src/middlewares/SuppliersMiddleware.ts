import express from 'express';
import debug from 'debug';

const logger: debug.IDebugger = debug('app:SuppliersController');

class SuppliersMiddleware {

    async validateRequiredFieldsForCreate(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body && req.body.name && req.body.phoneNumber) {
            next();
        } else {
            res.status(400).send({
                error: 'Supplier Name and PhoneNumber are required',
            });
        }
    }

    async extractSupplierId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.supplierId;
        next();
    }

}

export default new SuppliersMiddleware();