import { createMuiTheme, Theme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import React from 'react';

const theme: Theme = createMuiTheme({
    palette: {
        type: localStorage['DarkMode'] ?? 'light',
        primary: {
        main: '#6a1b9a',
        light: '#9c4dcc',
        dark: '#38006b',
        },
        secondary: {
        main: '#1565c0',
        light: '#5e92f3',
        dark: '#003c8f',
        },
        error: {
        main: red.A400,
        },
        background: {
        // default: '#282c34',
        },
    },
    overrides: {
        MuiPaper: {
        root: {
            padding: '20px 10px',
            margin: '10px',
        },
        },
        MuiButton: {
        root: {
            margin: '5px',
        },
        },
    },
});

/**
 * CustomHook for using dark mode within the Application.
 * @returns 
 */
export const useDarkMode = (): [Theme, () => void] => {
    const [currentTheme, setCurrentTheme] = React.useState(theme);
    
    React.useEffect(() => {
        const currentDarkMode = localStorage['DarkMode'] ?? 'light';
        const updatedTheme: Theme = {
            ...currentTheme,
            palette: {
                ...currentTheme.palette,
                type: currentDarkMode,
            },
        };
        setCurrentTheme(updatedTheme);
        // eslint-disable-next-line react-hooks/exhaustive-deps,
    }, []);

    const {
        palette: {
            type,
        }
    } = currentTheme;

    const toggleDarkMode = () => {
        const updatedTheme: Theme = {
            ...currentTheme,
            palette: {
                ...currentTheme.palette,
                type: type === 'light' ? 'dark' : 'light',
            },
        };

        localStorage['DarkMode'] = updatedTheme.palette.type;
        setCurrentTheme(updatedTheme);
    };

    return [currentTheme, toggleDarkMode];
};