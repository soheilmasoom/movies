import { memo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { BsExclamationTriangle } from "react-icons/bs";
import { getCenter } from "../components/MuiCustoms";

// Types
interface Props {
  error: string;
}

const ErrorPage: React.FC<Props> = ({ error }) => {
  return (
    <Box
      sx={{
        ...getCenter.flex,
        width: "100%",
        height: "85vh",
      }}
    >
      <Stack sx={{ alignItems: "center", gap: 5 }}>
        <BsExclamationTriangle fontSize="5rem" color="red" />
        <Typography variant="h5">{error}</Typography>
      </Stack>
    </Box>
  );
};

export default memo(ErrorPage);
