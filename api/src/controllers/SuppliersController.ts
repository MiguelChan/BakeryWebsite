import express from 'express';
import {
    supplierService,
} from '../services';
import debug from 'debug';
import { 
    Supplier,
} from '../models';
import { GetSupplierDto } from '../dtos/GetSuppliersDto';

const logger: debug.IDebugger = debug('app:SuppliersController');

class SuppliersController {

    async getSuppliers(req: express.Request, res: express.Response) {
        const suppliers: Supplier[] = supplierService.getSuppliers();
        const getSuppliersDto: GetSupplierDto = {
            pageNumber: 0,
            paginationCursor: null,
            suppliers,
        };
        res.status(200).send(getSuppliersDto);
    }

    async createSupplier(req: express.Request, res: express.Response) {
        try {
            supplierService.createSupplier(req.body);
            res.status(201).send({ id: 1 });
        } catch (exception) {
            res.status(500).send(exception);
        }
    }

    async deleteSupplier(req: express.Request, res: express.Response) {
        try {
            supplierService.deleteSupplier(req.body.supplierId);
            res.status(201).send({ status: 'Deleted' });
        } catch (exception) {
            res.status(500).send(exception);
        }
    }

    async editSupplier(req: express.Request, res: express.Response) {
        try {
            supplierService.editSupplier(req.body);
        } catch (exception) {
            res.status(500).send(exception);
        }
    }

    async getSupplier(req: express.Request, res: express.Response) {
        const supplierId: string = req.body.id;
        try {
            const foundSupplier: Supplier = supplierService.getSupplier(supplierId);
            res.status(200).send(foundSupplier);
        } catch (exception) {
            res.status(500).send(JSON.stringify(exception));
        }
    }

}

export default new SuppliersController();