"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuppliersRoutes = void 0;
const CommonRouteConfig_1 = require("./CommonRouteConfig");
const SuppliersController_1 = __importDefault(require("../controllers/SuppliersController"));
const SuppliersMiddleware_1 = __importDefault(require("../middlewares/SuppliersMiddleware"));
/**
 * Defines the Routes for the Suppliers.
 */
class SuppliersRoutes extends CommonRouteConfig_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'SuppliersRoutes');
    }
    configureRoutes() {
        this.app.route('/api/suppliers')
            .get(SuppliersController_1.default.getSuppliers)
            .post(SuppliersMiddleware_1.default.validateRequiredFieldsForCreate, SuppliersController_1.default.createSupplier);
        this.app.param('supplierId', SuppliersMiddleware_1.default.extractSupplierId);
        this.app.route('/api/suppliers/:supplierId')
            .get(SuppliersController_1.default.getSupplier)
            .put(SuppliersController_1.default.editSupplier)
            .delete(SuppliersController_1.default.deleteSupplier);
        return this.app;
    }
}
exports.SuppliersRoutes = SuppliersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VwcGxpZXJzUm91dGVDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL1N1cHBsaWVyc1JvdXRlQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJEQUU2QjtBQUU3Qiw2RkFBcUU7QUFDckUsNkZBQXFFO0FBRXJFOztHQUVHO0FBQ0gsTUFBYSxlQUFnQixTQUFRLHNDQUFrQjtJQUVuRCxZQUFZLEdBQXdCO1FBQ2hDLEtBQUssQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO2FBQzNCLEdBQUcsQ0FBQyw2QkFBbUIsQ0FBQyxZQUFZLENBQUM7YUFDckMsSUFBSSxDQUNELDZCQUFtQixDQUFDLCtCQUErQixFQUNuRCw2QkFBbUIsQ0FBQyxjQUFjLENBQ3JDLENBQUM7UUFFTixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsNkJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQzthQUN2QyxHQUFHLENBQUMsNkJBQW1CLENBQUMsV0FBVyxDQUFDO2FBQ3BDLEdBQUcsQ0FBQyw2QkFBbUIsQ0FBQyxZQUFZLENBQUM7YUFDckMsTUFBTSxDQUFDLDZCQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWhELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0NBRUo7QUF2QkQsMENBdUJDIn0=