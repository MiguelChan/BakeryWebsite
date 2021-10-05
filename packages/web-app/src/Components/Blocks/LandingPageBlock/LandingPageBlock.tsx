import { ButtonBase,
Paper,
Theme,
Typography } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
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