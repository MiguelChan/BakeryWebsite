import { 
    ButtonBase, 
    createStyles, 
    makeStyles, 
    Paper, 
    Theme, 
    Typography,
} from '@material-ui/core';
import React from 'react';

export interface LandingPageBlockProps {
    blockTitle: string;
    blockIcon: any;
    onBlockClick: () => void;
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
        }
    }),
);


export const LandingPageBlock: React.FunctionComponent<LandingPageBlockProps> = ({
    blockTitle,
    blockIcon,
    onBlockClick,
}) => {

    const classes = useStyles();

    return (
        <ButtonBase onClick={onBlockClick}>
            <Paper className={classes.paper}>
                <Typography>{blockTitle}</Typography>
                {blockIcon}
            </Paper>
        </ButtonBase>
    );
};