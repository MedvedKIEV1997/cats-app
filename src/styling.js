import { createTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

export const themeLight = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      dark: "#FBE0DC",
      contrastText: "#FF868E",
    },
    secondary: {
      main: "#FF868E",
      contrastText: "#ffffff",
    },
    background: {
      paper: "#ffffff",
      default: "#e5e5e5",
    },
    text: {
      primary: "#1D1D1D",
      secondary: "#ffffff",
      disabled: "#8C8C8C",
      hint: "#FF868E",
    },
  },
  typography: {
    fontFamily: ['"Jost"', "sans-serif"].join(","),
    htmlFontSize: 10,
    h1: {
      fontSize: 44,
      fontWeight: 500,
    },

    h2: {
      fontSize: 20,
      fontWeight: 400,
      color: "#8C8C8C",
    },
    h3: {
      fontSize: 20,
      fontWeight: 500,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: 0,
        },
      },
    },
  },
});

// export const themeDark = {
//   colors: {
//     default: "#FFFFFF",
//     hover: "#FBE0DC",
//     active: "#FF868E",
//     like: "#97EAB9",
//     dislike: "#FFD280",
//     likeHover: "#97EAB94D",
//     dislikeHover: "#FFD2804D",
//     imgHover: "#FF868E99",
//     disabled: "#F8F8F7",
//   },
//   typography: {
//     default: "#1D1D1D",
//     gray: "#8C8C8C",
//     inverted: "#FFFFFF",
//     pink: "#FF868E",
//   },
// };

export const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      body: {
        margin: 0,
        padding: 0,
        backgroundColor: "#E5E5E5",
        boxSizing: "border-box",
      },
      html: {
        fontSize: "62.5%",
        lineHeight: 1,
      },
    }}
  />
);

/*
TYPOGRAPHY SYSTEM

- Font sizes (px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

- Spacing system (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128
*/
