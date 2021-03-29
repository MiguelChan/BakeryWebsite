"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const logger = debug_1.default('app:SuppliersController');
class SuppliersMiddleware {
    async validateRequiredFieldsForCreate(req, res, next) {
        if (req.body && req.body.name && req.body.phoneNumber) {
            next();
        }
        else {
            res.status(400).send({
                error: 'Supplier Name and PhoneNumber are required',
            });
        }
    }
    async extractSupplierId(req, res, next) {
        req.body.id = req.params.supplierId;
        next();
    }
}
exports.default = new SuppliersMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VwcGxpZXJzTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWRkbGV3YXJlcy9TdXBwbGllcnNNaWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esa0RBQTBCO0FBRTFCLE1BQU0sTUFBTSxHQUFvQixlQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUVqRSxNQUFNLG1CQUFtQjtJQUVyQixLQUFLLENBQUMsK0JBQStCLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCO1FBQ3pHLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNuRCxJQUFJLEVBQUUsQ0FBQztTQUNWO2FBQU07WUFDSCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDakIsS0FBSyxFQUFFLDRDQUE0QzthQUN0RCxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsaUJBQWlCLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCO1FBQzNGLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3BDLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQztDQUVKO0FBRUQsa0JBQWUsSUFBSSxtQkFBbUIsRUFBRSxDQUFDIn0=