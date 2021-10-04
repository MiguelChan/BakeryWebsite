import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

interface CustomLinkProps {
    to: string;
    linkText: string;
}

/**
 * Creates a {Link} that is meant to be used with ReactRouter.
 * 
 * @param {string} to Where this link should go to.
 * @param {string} linkText The text of the link.
 * 
 * @returns A Component.
 */
export const CustomLink: React.FunctionComponent<CustomLinkProps> = ({
    to,
    linkText,
}) => (
    <Link component={RouterLink} to={to} color='secondary' >
        {linkText}
    </Link>
);