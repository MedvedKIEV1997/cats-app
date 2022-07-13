import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: "10px",
  letterSpacing: "0.15rem",

  "&:hover, &.Mui-focusVisible": {
    boxShadow: "none",
  },
  "&:active": {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.secondary.main,
    boxShadow: "none",
  },
  "&.active": {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.secondary.main,
    boxShadow: "none",
  },
}));

export default CustomButton;
