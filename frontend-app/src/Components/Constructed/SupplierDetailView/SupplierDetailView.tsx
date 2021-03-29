import * as React from 'react';
import { 
    RouteComponentProps,
} from 'react-router';
import { 
    useLocation,
} from 'react-router-dom';
import { 
    Supplier,
} from '../../../Models';

interface Properties {
    supplierId: string;
}

export const SupplierDetailView: React.FunctionComponent<RouteComponentProps<Properties>> = (props) => {

    const matchParams: Properties = props.match.params;
    const location = useLocation<Supplier>();

    return (
        <>
            <h1>{JSON.stringify(matchParams)}</h1>
            <h1>{JSON.stringify(location.state)}</h1>
        </>
    );
};