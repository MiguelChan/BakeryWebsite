import { Paper,
Typography } from '@mui/material';
import * as React from 'react';
import { 
    RouteComponentProps,
} from 'react-router';
import { 
    useLocation,
    useHistory,
} from 'react-router-dom';
import { 
    GetSupplierResponse,
    suppliersClient,
} from '../../../Clients';
import { 
    Supplier,
} from '../../../Models';
import { isNullOrUndefined } from '../../../Utils';
import { 
    LoadingDialog, 
    CustomLink,
 } from '../../Blocks';
import { SupplierDetailForm } from '../../Composites';

interface Properties {
    supplierId: string;
}

export const SupplierDetailView: React.FunctionComponent<RouteComponentProps<Properties>> = (props) => {

    const matchParams: Properties = props.match.params;
    const location = useLocation<Supplier>();
    const history = useHistory();

    const [currentSupplier, setCurrentSupplier] = React.useState<Supplier>();
    const [isLoadingSupplier, setIsLoadingSupplier] = React.useState<boolean>(true);
    const [errorMessage, setErrorMessage] = React.useState<string>();

    React.useEffect(() => {
        if (!isNullOrUndefined(currentSupplier)) {
            return;
        }

        const supplier: Supplier = location.state;
        if (isNullOrUndefined(supplier)) {
            const supplierId = matchParams.supplierId;
            suppliersClient.getSupplier(supplierId).then((getSupplierResponse: GetSupplierResponse) => {
                setCurrentSupplier(getSupplierResponse.supplier);
            }).catch((errorResponse: GetSupplierResponse) => {
                setErrorMessage(errorResponse.errorMessage);
            }).finally(() => {
                setIsLoadingSupplier(false);
            });
            return;
        }

        setCurrentSupplier(supplier);
        setIsLoadingSupplier(false);
    }, [location, currentSupplier, matchParams]);

    function onEditSupplierClickListener() {
        history.push({
            pathname: `/suppliers/${currentSupplier!.id}/edit`,
            state: currentSupplier,
        });
    }

    return (
        <>
            <CustomLink linkText={'Regresar a lista de Proveedores'} to='/suppliers' />
            <LoadingDialog isOpen={isLoadingSupplier} />
            {(!isLoadingSupplier && !isNullOrUndefined(currentSupplier)) && 
            <SupplierDetailForm 
                supplier={currentSupplier!} 
                onEditSupplierClickListener={onEditSupplierClickListener} 
            />
            }
            {!isNullOrUndefined(errorMessage) &&
            <Paper>
                <Typography>{errorMessage}</Typography>
            </Paper>
            }
        </>
    );
};