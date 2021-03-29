import { 
    Card, 
    CardContent, 
    Container, 
    Typography,
 } from '@material-ui/core';
import * as React from 'react';

interface Properties {
    customMessage?: string;
}

/**
 * The not found page.
 * @param {String} customMessage A Custom message to display if provided.
 */
export const NotFoundPage: React.FunctionComponent<Properties> = ({
    customMessage = 'La pagina que esta solicitando no existe',
}) => {
    return (
        <>
            <Container fixed>
                <Card>
                    <CardContent>
                        <Typography variant='h4' component='h1' gutterBottom>
                            {customMessage}
                        </Typography>    
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};