import {
    CircularProgress,
    Container,
    Divider,
    Fab,
    Grid,
    Paper,
    Theme,
    Typography,
    useTheme,
} from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { 
    CloudDownload,
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import { 
    useHistory,
} from 'react-router-dom';
import { 
    Supplier,
} from '../../../Models';
import { 
    useAppDispatch, 
    useAppSelector,
    RootState,
    fetchSuppliers,
    SuppliersState,
} from '../../../Store';
import { 
    isNullOrUndefined,
} from '../../../Utils';
import { 
    SuppliersTable,
} from '../../Composites';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        addButton: {
            marginRight: 10,
        },
        exportButton: {
            marginLeft: 10
        },
        buttonsContainer: {
            padding: 10,
        }
    }),
);

/**
 * Defines the {ViewSuppliers} View.
 * Which includes a Table that contains a List of the Suppliers and a container of buttons for Adding and Exporting 
 * the suppliers.
 * @returns .
 */
export const ViewSuppliers: React.FunctionComponent = () => {

    const currentTheme = useTheme();
    const classes = useStyles(currentTheme);

    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const history = useHistory<Supplier>();

    const appDispatch = useAppDispatch();
    const suppliersState: SuppliersState = useAppSelector((selector: RootState) => selector.suppliersReducer);
    
    React.useEffect(() => {
        appDispatch(fetchSuppliers({
            pageNumber: currentPage,
        }));
    }, [currentPage, appDispatch]);

    function onSupplierClickedListener(supplier: Supplier): void {
        const supplierUrl: string = `/suppliers/${supplier.id}`;
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

    const {
        suppliers,
        totalElements,
        errorMessage,
    } = suppliersState;

    function renderSuppliersTable(): React.ReactElement {
        if (suppliersState.status === 'loading') {
            return <>
                <Grid container justifyContent='center'>
                    <CircularProgress />
                </Grid>
            </>;
        }

        return (
            <SuppliersTable
                suppliers={suppliers}
                totalSuppliers={totalElements}
                onSupplierClickedListener={onSupplierClickedListener}
                onPageChangedListener={onPageChangedListener}
                currentPage={currentPage}
            />
        );
    }

    return (
        <Container>
            {renderSuppliersTable()}
            {(!isNullOrUndefined(errorMessage) && errorMessage !== '') && <Paper><Typography>{errorMessage}</Typography></Paper>}
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