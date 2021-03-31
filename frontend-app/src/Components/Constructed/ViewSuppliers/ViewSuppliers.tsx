import { 
    Container, 
    Divider, 
    Fab,
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core';
import { 
    CloudDownload,
} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import { 
    useHistory,
} from 'react-router-dom';
import { 
    GetSupplierResponse, 
    suppliersClient,
} from '../../../Clients';
import { 
    Supplier,
} from '../../../Models';
import theme from '../../../theme';
import { 
    SuppliersTable,
} from '../../Composites';

const useStyles = makeStyles((theme) => ({
    addButton: {
        marginRight: 10,
    },
    exportButton: {
        marginLeft: 10
    },
    buttonsContainer: {
        padding: 10,
    }

}));

/**
 * Defines the {ViewSuppliers} View.
 * Which includes a Table that contains a List of the Suppliers and a container of buttons for Adding and Exporting 
 * the suppliers.
 * @returns .
 */
export const ViewSuppliers: React.FunctionComponent = () => {

    const classes = useStyles(theme);

    const [currentSuppliers, setCurrentSuppliers] = React.useState<GetSupplierResponse>({
        suppliers: [],
        totalElements: 0,
    });
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const history = useHistory<Supplier>();
    const [errorMessage, setErrorMessage] = React.useState<string>();

    React.useEffect(() => {
        suppliersClient.getSuppliers(currentPage)
        .then((suppliersResponse: GetSupplierResponse) => {
            setCurrentSuppliers(suppliersResponse);
        })
        .catch((errorFromServer: GetSupplierResponse) => {
            setErrorMessage(errorFromServer.errorMessage);
        });
    }, [currentPage]);

    function onSupplierClickedListener(supplier: Supplier): void {
        const supplierUrl: string = `suppliers/${supplier.id}`;
        history.push(supplierUrl, supplier);   
    }

    function onCreateSupplierClickListener(): void {
        history.push({
            pathname: '/suppliers/new'
        });
    }

    function onPageChangedListener(currentPage: number, nextPage: number) {
        setCurrentPage(nextPage);
    }

    return (
        <Container>
            <SuppliersTable
                suppliers={currentSuppliers.suppliers}
                totalSuppliers={currentSuppliers.totalElements}
                onSupplierClickedListener={onSupplierClickedListener}
                onPageChangedListener={onPageChangedListener}
                currentPage={currentPage}
            />
            {(errorMessage !== undefined && errorMessage !== null && errorMessage !== '') && <Paper><Typography>{errorMessage}</Typography></Paper>}
            <Divider />
            <Container maxWidth='md' className={classes.buttonsContainer}>
                <Fab 
                    color='primary' 
                    aria-label='add' 
                    variant='extended'
                    className={classes.addButton} 
                    onClick={onCreateSupplierClickListener}
                >
                    Agregar Proveedor
                    <AddIcon />
                </Fab>
                <Fab color='primary' aria-label='add' variant='extended' className={classes.exportButton}>
                    Exportar Lista de Proveedores&nbsp;
                    <CloudDownload />
                </Fab>
            </Container>
        </Container>
    );
};