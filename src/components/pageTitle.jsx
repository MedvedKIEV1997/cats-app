import { IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../assets/arrowBack.svg";

const PageTitle = ({ page, color }) => {
  const navigate = useNavigate();
  return (
    <Stack direction={"row"} spacing={1}>
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          height: 40,
          width: 40,
          borderRadius: "10px",
          bgcolor: "primary.dark",
        }}
      >
        <Arrow />
      </IconButton>
      <Stack
        bgcolor={color ? color.body : "secondary.main"}
        borderRadius="10px"
        paddingX={3}
        justifyContent="center"
      >
        <Typography
          variant="h3"
          color={color ? color.text : "text.secondary"}
          letterSpacing={2}
        >
          {page}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PageTitle;
