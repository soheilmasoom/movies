import { Box, Typography } from "@mui/material";

// Types
interface Props {
  error: string;
}

const MovieError: React.FC<Props> = ({ error }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>{error}</Typography>
    </Box>
  );
};

export default MovieError;
