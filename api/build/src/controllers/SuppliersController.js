"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const debug_1 = __importDefault(require("debug"));
const logger = debug_1.default('app:SuppliersController');
class SuppliersController {
    async getSuppliers(req, res) {
        const suppliers = services_1.supplierService.getSuppliers();
        const getSuppliersDto = {
            pageNumber: 0,
            paginationCursor: null,
            suppliers,
        };
        res.status(200).send(getSuppliersDto);
    }
    async createSupplier(req, res) {
        try {
            services_1.supplierService.createSupplier(req.body);
            res.status(201).send({ id: 1 });
        }
        catch (exception) {
            res.status(500).send(exception);
        }
    }
    async deleteSupplier(req, res) {
        try {
            services_1.supplierService.deleteSupplier(req.body.supplierId);
            res.status(201).send({ status: 'Deleted' });
        }
        catch (exception) {
            res.status(500).send(exception);
        }
    }
    async editSupplier(req, res) {
        try {
            services_1.supplierService.editSupplier(req.body);
        }
        catch (exception) {
            res.status(500).send(exception);
        }
    }
    async getSupplier(req, res) {
        const supplierId = req.body.id;
        try {
            const foundSupplier = services_1.supplierService.getSupplier(supplierId);
            res.status(200).send(foundSupplier);
        }
        catch (exception) {
            res.status(500).send(JSON.stringify(exception));
        }
    }
}
exports.default = new SuppliersController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VwcGxpZXJzQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9TdXBwbGllcnNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsMENBRXFCO0FBQ3JCLGtEQUEwQjtBQU0xQixNQUFNLE1BQU0sR0FBb0IsZUFBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFFakUsTUFBTSxtQkFBbUI7SUFFckIsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQzFELE1BQU0sU0FBUyxHQUFlLDBCQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDN0QsTUFBTSxlQUFlLEdBQW1CO1lBQ3BDLFVBQVUsRUFBRSxDQUFDO1lBQ2IsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixTQUFTO1NBQ1osQ0FBQztRQUNGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDNUQsSUFBSTtZQUNBLDBCQUFlLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ25DO1FBQUMsT0FBTyxTQUFTLEVBQUU7WUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQzVELElBQUk7WUFDQSwwQkFBZSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7U0FDL0M7UUFBQyxPQUFPLFNBQVMsRUFBRTtZQUNoQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNuQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDMUQsSUFBSTtZQUNBLDBCQUFlLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQztRQUFDLE9BQU8sU0FBUyxFQUFFO1lBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUN6RCxNQUFNLFVBQVUsR0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUN2QyxJQUFJO1lBQ0EsTUFBTSxhQUFhLEdBQWEsMEJBQWUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDdkM7UUFBQyxPQUFPLFNBQVMsRUFBRTtZQUNoQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDbkQ7SUFDTCxDQUFDO0NBRUo7QUFFRCxrQkFBZSxJQUFJLG1CQUFtQixFQUFFLENBQUMifQ==