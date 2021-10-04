import { suppliersClient } from "../../Clients";
import { 
    suppliersReducer,
    SuppliersState,
    fetchSuppliers,
} from "./SuppliersSlice";

jest.mock('../../Clients');

describe('SuppliersSlice', () => {

    let initialState: SuppliersState;

    beforeEach(() => {
        initialState = {
            errorMessage: null,
            status: 'idle',
            suppliers: [],
            totalElements: 0,
        };
    });

    describe('extraReducers', () => {
        describe('Suppliers/Fetch', () => {

            let getSuppliersMockFn = suppliersClient.getSupplier as jest.Mock;

            afterEach(() => {
                getSuppliersMockFn.mockClear();
            });

            it('Should set the idle State when pending', () => {
                const nextState: SuppliersState = suppliersReducer(initialState, fetchSuppliers.pending);
                expect(nextState.status).toBe('loading');
            });

            it('Should set the new State when fulfilled', () => {
                const mockState: Partial<SuppliersState> = {
                    suppliers: [],
                    totalElements: 100,
                };
                const nextState: SuppliersState = suppliersReducer(initialState, fetchSuppliers.fulfilled(mockState, '', {}));

                expect(nextState.status).toBe('idle');
                expect(nextState.suppliers).toStrictEqual([]);
                expect(nextState.totalElements).toBe(100);
            });
        });
    });
});