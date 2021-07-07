import * as React from 'react';
import { 
    useHistory,
} from 'react-router-dom';
import { 
    CreateSupplierResponse, 
    suppliersClient,
} from '../../../Clients';
import { 
    Contact, 
    Supplier,
} from '../../../Models';
import { 
    SupplierEditableView,
} from '../../Composites';

interface SupplierDataHolder {
    supplier: Supplier;
    contacts: Contact[];
}

/**
 * Defines the Create Supplier View.
 * @returns .
 */
export const CreateSupplierView: React.FunctionComponent = () => {

    const [isCreatingSupplier, setIsCreatingSupplier] = React.useState<boolean>(false);
    const [dataHolder, setDataHolder] = React.useState<SupplierDataHolder>();
    const [errorMessage, setErrorMessage] = React.useState<string>();

    const history = useHistory();

    React.useEffect(() => {
        if (!isCreatingSupplier) {
            return;
        }

        const {
            supplier,
            contacts,
        } = dataHolder!;

        suppliersClient.createSupplier(supplier, contacts)
        .then((createSupplierResponse: CreateSupplierResponse) => {
            history.push({
                pathname: '/suppliers'
            });
        }).catch((createSupplierResponse: CreateSupplierResponse) => {
            setErrorMessage(createSupplierResponse.errorMessage!);
        }).finally(() => {
            setIsCreatingSupplier(false);
        });

    }, [dataHolder, isCreatingSupplier, history]);


    function onEditSupplierClickedListener(supplier: Supplier, contacts: Contact[]): void {
        setDataHolder({
            supplier,
            contacts,
        });
        setIsCreatingSupplier(true);
    }

    return (
        <SupplierEditableView 
            onEditSupplierClickedListener={onEditSupplierClickedListener}
            onDeleteContactClickedListener={() => {}}
            isPerformingAsyncOperation={isCreatingSupplier}
            errorMessage={errorMessage}
        />
    );
};