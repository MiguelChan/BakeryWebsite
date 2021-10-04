import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { 
  suppliersClient,
} from '../../Clients';
import { 
  Supplier,
} from '../../Models';
import { Nullable } from '../../Utils';

export type SupplierStatus = 'idle' | 'loading';

/**
* Defines the Suppliers State.
*/
export interface SuppliersState {
  suppliers: Supplier[];
  totalElements: number;
  errorMessage: Nullable<string>;
  status: SupplierStatus;
}

const initialState: SuppliersState = {
  suppliers: [],
  errorMessage: null,
  status: 'idle',
  totalElements: 0,
};

interface GetSuppliersProps {
  pageNumber?: number;
  pageSize?: number;
}

export const fetchSuppliers = createAsyncThunk<Partial<SuppliersState>, GetSuppliersProps, { rejectValue: {errorMessage: string} }>(
  "Suppliers/fetch",
  async ({ pageSize, pageNumber }, thunkApi) => {
      try {
          const {
              suppliers,
              totalElements,
          } = await suppliersClient.getSuppliers(pageNumber, pageSize);
          return {
              suppliers,
              totalElements,
          };
      } catch (exception) {
          return thunkApi.rejectWithValue({
              errorMessage: JSON.stringify(exception),
          });
      }
  },
);

/**
* The slice.
*/
export const suppliersSlice = createSlice({
  name: 'Suppliers',
  initialState,
  reducers: {
  },
  extraReducers: (builder: ActionReducerMapBuilder<SuppliersState>) => {
      builder.addCase(fetchSuppliers.pending, (state: SuppliersState) => {
          state.status = 'loading';
          state.errorMessage = null;
      });

      builder.addCase(fetchSuppliers.fulfilled, (state: SuppliersState, { payload }) => {
          state.status = 'idle';
          state.suppliers = [...payload.suppliers!];
          state.totalElements = payload.totalElements!;
      });

      builder.addCase(fetchSuppliers.rejected, (state: SuppliersState, { payload }) => {
          state.status = 'idle';
          state.errorMessage = payload!.errorMessage;
      });
  },
});

export const suppliersReducer = suppliersSlice.reducer;