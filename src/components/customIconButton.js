import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "20px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,

  "&:hover, &.Mui-focusVisible": {
    backgroundColor: theme.palette.primary.dark,
  },
  "&:active": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.secondary,
  },
  "&.active": {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.secondary.main,
  },
  "&.Mui-disabled": {
    backgroundColor: theme.palette.primary.main,
    color: "#8C8C8C",
  },
}));

export default CustomIconButton;
