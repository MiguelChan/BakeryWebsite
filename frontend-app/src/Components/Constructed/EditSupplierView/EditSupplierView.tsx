import * as React from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { EditSupplierResponse, GetSupplierResponse, suppliersClient } from '../../../Clients';
import { Contact, Supplier } from '../../../Models';
import { isNullOrUndefined } from '../../../Utils';
import { SupplierEditableView } from '../../Composites';

interface RouteProperties {
    supplierId: string;
}

interface SupplierDataHolder {
    supplier: Supplier;
    contacts: Contact[];
}

export const EditSupplierView: React.FunctionComponent<RouteComponentProps<RouteProperties>> = ({
    match,
}) => {

    const matchParams: RouteProperties = match.params;
    const location = useLocation<Supplier>();
    const history = useHistory();
    const [currentSupplier, setCurrentSupplier] = React.useState<Supplier>();
    const [errorMessage, setErrorMessage] = React.useState<string>();
    const [supplierDataHolder, setSupplierDataHolder] = React.useState<SupplierDataHolder>();
    const [isEditingSupplier, setIsEditingSupplier] = React.useState<boolean>(false);

    React.useEffect(() => {
        const supplier = location.state;
        if (!isNullOrUndefined(supplier)) {
            setCurrentSupplier(supplier);
            return;
        }

        suppliersClient.getSupplier(matchParams.supplierId).then((getSupplierResponse: GetSupplierResponse) => {
            setCurrentSupplier(getSupplierResponse.supplier);
        }).catch((errorResponse: GetSupplierResponse) => {
            setErrorMessage(errorResponse.errorMessage);
        });
    }, [location, matchParams]);

    React.useEffect(() => {
        if (!isEditingSupplier) {
            return;
        }

        const {
            supplier,
            contacts,
        } = supplierDataHolder!;

        suppliersClient.editSupplier(supplier, contacts).then(() => {
            history.push('/suppliers');
        }).catch((error: EditSupplierResponse) => {
            setErrorMessage(error.errorMessage);
        }).finally(() => {
            setIsEditingSupplier(false);
        });
    }, [isEditingSupplier, supplierDataHolder, history]);

    function onEditSupplierClickedListener(supplier: Supplier, contacts: Contact[]) {
        setSupplierDataHolder({
            contacts,
            supplier,
        });
        setIsEditingSupplier(true);
    }

    return (
        <>
            {!isNullOrUndefined(currentSupplier) &&
            <SupplierEditableView 
                onEditSupplierClickedListener={onEditSupplierClickedListener}
                isPerformingAsyncOperation={isNullOrUndefined(currentSupplier) || isEditingSupplier}
                errorMessage={errorMessage}
                supplier={currentSupplier}
                dialogActionMessage='Se editara el proveedor. Desea continuar?'
                buttonMessage='Editar proveedor'
            />}
        </>
    );
};