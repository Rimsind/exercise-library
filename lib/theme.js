"use client"

import { createTheme, responsiveFontSizes } from "@mui/material/styles"

// Base theme
let theme = createTheme({
  palette: {
    primary: {
      main: "#0046a6",
      light: "#3d7bc7",
      dark: "#003175",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e91e63",
      light: "#ff5983",
      dark: "#ad1457",
      contrastText: "#ffffff",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#2c3e50",
      secondary: "#7f8c8d",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.125rem",
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 8px rgba(0, 0, 0, 0.1)",
    "0px 8px 16px rgba(0, 0, 0, 0.1)",
    "0px 12px 24px rgba(0, 0, 0, 0.15)",
    "0px 16px 32px rgba(0, 0, 0, 0.15)",
    "0px 20px 40px rgba(0, 0, 0, 0.2)",
    "0px 24px 48px rgba(0, 0, 0, 0.2)",
    "0px 28px 56px rgba(0, 0, 0, 0.25)",
    "0px 32px 64px rgba(0, 0, 0, 0.25)",
    "0px 36px 72px rgba(0, 0, 0, 0.3)",
    "0px 40px 80px rgba(0, 0, 0, 0.3)",
    "0px 44px 88px rgba(0, 0, 0, 0.35)",
    "0px 48px 96px rgba(0, 0, 0, 0.35)",
    "0px 52px 104px rgba(0, 0, 0, 0.4)",
    "0px 56px 112px rgba(0, 0, 0, 0.4)",
    "0px 60px 120px rgba(0, 0, 0, 0.45)",
    "0px 64px 128px rgba(0, 0, 0, 0.45)",
    "0px 68px 136px rgba(0, 0, 0, 0.5)",
    "0px 72px 144px rgba(0, 0, 0, 0.5)",
    "0px 76px 152px rgba(0, 0, 0, 0.55)",
    "0px 80px 160px rgba(0, 0, 0, 0.55)",
    "0px 84px 168px rgba(0, 0, 0, 0.6)",
    "0px 88px 176px rgba(0, 0, 0, 0.6)",
    "0px 92px 184px rgba(0, 0, 0, 0.65)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: "none",
          fontWeight: 500,
          padding: "10px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
            transform: "translateY(-1px)",
          },
          transition: "all 0.2s ease-in-out",
        },
        contained: {
          "&:hover": {
            boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          "&:hover": {
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease-in-out",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0046a6",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0046a6",
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: "20px 0 0 20px",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})

// Make typography responsive
theme = responsiveFontSizes(theme, { factor: 0.8 })

// Component-specific style overrides
theme = createTheme(theme, {
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '16px',
          [theme.breakpoints.down('sm')]: {
            padding: '12px',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 12,
          paddingBottom: 12,
          [theme.breakpoints.down('sm')]: {
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 8,
            paddingBottom: 8,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 40,
          height: 40,
          [theme.breakpoints.down('sm')]: {
            width: 32,
            height: 32,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          
          [theme.breakpoints.down('sm')]: {
            lineHeight: 1.3,
          },
        },
      },
    },
  },
})

export default theme
