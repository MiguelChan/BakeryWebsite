import { 
    createTheme, 
    Theme, 
} from "@mui/material";
import { 
    red,
} from "@mui/material/colors";
import React from 'react';

const theme: Theme = createTheme({
    palette: {
        mode: localStorage['DarkMode'] ?? 'light',
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
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: '20px 10px',
                    maring: '10px',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    maring: '5px',
                },
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
                mode: currentDarkMode,
            },
        };
        setCurrentTheme(updatedTheme);
        // eslint-disable-next-line react-hooks/exhaustive-deps,
    }, []);

    const {
        palette: {
            mode,
        }
    } = currentTheme;

    const toggleDarkMode = () => {
        const updatedTheme: Theme = {
            ...currentTheme,
            palette: {
                ...currentTheme.palette,
                mode: mode === 'light' ? 'dark' : 'light',
            },
        };

        localStorage['DarkMode'] = updatedTheme.palette.mode;
        setCurrentTheme(updatedTheme);
    };

    return [currentTheme, toggleDarkMode];
};