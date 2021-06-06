import { Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { 
    RouteComponentProps, useHistory,
} from 'react-router';
import { 
    useLocation,
} from 'react-router-dom';
import { GetSupplierResponse, suppliersClient } from '../../../Clients';
import { 
    Supplier,
} from '../../../Models';
import { isNullOrUndefined } from '../../../Utils';
import { LoadingDialog } from '../../Blocks';
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
        if (currentSupplier !== null && currentSupplier !== undefined) {
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