"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRoutesConfig = void 0;
/**
 * Base class for Custom API Routes Definitions.
 */
class CommonRoutesConfig {
    /**
     * Default constructor.
     * @param {express.Application} app The Express Application.
     * @param {string} name The name of this Route Configuration File.
     */
    constructor(app, name) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }
    /**
     * @returns {string} The name of this Routes Configuration File.
     */
    getName() {
        return this.name;
    }
}
exports.CommonRoutesConfig = CommonRoutesConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbW9uUm91dGVDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL0NvbW1vblJvdXRlQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBOztHQUVHO0FBQ0gsTUFBc0Isa0JBQWtCO0lBRXBDOzs7O09BSUc7SUFDSCxZQUErQixHQUF3QixFQUFtQixJQUFZO1FBQXZELFFBQUcsR0FBSCxHQUFHLENBQXFCO1FBQW1CLFNBQUksR0FBSixJQUFJLENBQVE7UUFDbEYsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztDQU1KO0FBdEJELGdEQXNCQyJ9