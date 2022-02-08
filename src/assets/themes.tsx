import { createTheme } from '@mui/material/styles';
import Colors from './colors';
import { appFonts } from './font';

export default class Themes {
    static Color = createTheme({
        palette: {
            primary: {
                main: Colors.PrimaryColor
            },
            secondary: {
                main: Colors.SecondaryColor
            }
        },
        components: {
            MuiTypography: {
                defaultProps: {
                    fontSize: "1.25rem",
                    fontWeight: 600
                }
            }
        }
    });

    static AppBarTheme = createTheme({
        palette: {
            primary: {
                main: Colors.PrimaryColor
            },
            secondary: {
                main: Colors.SecondaryColor
            }
        },
        typography: {
            fontFamily: "Bariol"
        },
        components: {
            MuiTypography: {
                defaultProps: {
                    fontSize: "1.125rem",
                    fontWeight: "bold"
                }
            },
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true,
                }
            },
            MuiCssBaseline: {
                styleOverrides: { appFonts }
            },
        }
    })

    static appTheme = createTheme({
        palette: {
            primary: {
                main: Colors.PrimaryColor
            },
            secondary: {
                main: Colors.SecondaryColor
            }
        },
        typography: {
            fontFamily: "Bariol"
        },
        components: {
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true,
                }
            },
            MuiCssBaseline: {
                styleOverrides: { appFonts }
            },
        },
    })
}