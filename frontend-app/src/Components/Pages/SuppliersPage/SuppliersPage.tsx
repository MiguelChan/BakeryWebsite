import { 
    Container, 
    Typography,
 } from '@material-ui/core';
import * as React from 'react';
import { 
    Route,
    Switch,
 } from 'react-router-dom';
import { 
    ViewSuppliers,
 } from '../../Constructed';
import { 
    SupplierDetailView,
} from '../../Constructed/SupplierDetailView/SupplierDetailView';
import { 
    SupplierEditableView,
} from '../../Constructed/SupplierEditableView/SupplierEditableView';

/**
 * Defines the Suppliers Page. Within this page we're going to redirect to the correct sections of the App.
 * @returns 
 */
export const SuppliersPage: React.FunctionComponent = () => {
    return (
        <>
            <Container>
                <Switch>
                    <Route path='/suppliers' exact>
                        <ViewSuppliers />
                    </Route>
                    <Route path='/suppliers/new' strict>
                        <SupplierEditableView />
                    </Route>
                    <Route path='/suppliers/:supplierId' component={SupplierDetailView} />
                </Switch>
            </Container>
        </>
    );
};