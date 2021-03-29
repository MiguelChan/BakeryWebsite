"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierService = exports.SupplierService = void 0;
const debug_1 = __importDefault(require("debug"));
const logger = debug_1.default('app:SupplierService');
/**
 * The Supplier Service.
 * Within this class we can access all the data from the Supplier Service.
 */
class SupplierService {
    constructor() {
        this.suppliers = [];
    }
    getSuppliers() {
        return this.suppliers;
    }
    createSupplier(supplier) {
        const newSupplier = {
            ...supplier,
            id: `${this.suppliers.length + 1}`
        };
        this.suppliers.push(newSupplier);
    }
    deleteSupplier(supplierId) {
        const foundIndex = this.suppliers.findIndex((supplier) => {
            return supplier.id === supplierId;
        });
        this.suppliers.splice(foundIndex, 1);
    }
    editSupplier(supplier) {
        const foundIndex = this.suppliers.findIndex((supplier) => {
            return supplier.id === supplier.id;
        });
        this.suppliers[foundIndex] = supplier;
    }
    getSupplier(supplierId) {
        logger.log(`Trying to Fetch Supplier for Id: ${supplierId}`);
        const foundElement = this.suppliers.filter((supplier) => supplier.id === supplierId).pop();
        if (foundElement === undefined) {
            throw new Error('Not Found');
        }
        return foundElement;
    }
}
exports.SupplierService = SupplierService;
/**
 * The singleton for the Supplier Service.
 */
exports.supplierService = new SupplierService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VwcGxpZXJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL1N1cHBsaWVyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQSxrREFBMEI7QUFFMUIsTUFBTSxNQUFNLEdBQW9CLGVBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRTdEOzs7R0FHRztBQUNILE1BQWEsZUFBZTtJQUl4QjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxZQUFZO1FBQ2YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFTSxjQUFjLENBQUMsUUFBa0I7UUFDcEMsTUFBTSxXQUFXLEdBQWE7WUFDMUIsR0FBRyxRQUFRO1lBQ1gsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1NBQ3JDLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sY0FBYyxDQUFDLFVBQWtCO1FBQ3BDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBa0IsRUFBRSxFQUFFO1lBQy9ELE9BQU8sUUFBUSxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLFlBQVksQ0FBQyxRQUFrQjtRQUNsQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQWtCLEVBQUUsRUFBRTtZQUMvRCxPQUFPLFFBQVEsQ0FBQyxFQUFFLEtBQUssUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDO0lBQzFDLENBQUM7SUFFTSxXQUFXLENBQUMsVUFBa0I7UUFDakMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUM3RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQWtCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckcsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDaEM7UUFDRCxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0NBQ0o7QUE1Q0QsMENBNENDO0FBRUQ7O0dBRUc7QUFDVSxRQUFBLGVBQWUsR0FBb0IsSUFBSSxlQUFlLEVBQUUsQ0FBQyJ9