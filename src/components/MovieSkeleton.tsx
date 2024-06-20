import { Box, Grid, Skeleton } from "@mui/material";

const MovieSkeleton = () => {

  return (
    <Grid container spacing={3}>
      {Array(8)
        .fill(undefined)
        .map((_, idx) => {
          return (
            <Grid
              item
              key={idx}
              xs={12}
              sm={6}
              md={4}
              xl={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ height: 377, minWidth: "220px", maxWidth: "300px" }}>
                <Skeleton
                  animation="pulse"
                  variant="rounded"
                  height={220}
                  width="100%"
                />
                <Skeleton
                  animation="pulse"
                  variant="text"
                  sx={{
                    fontSize: "1.8rem",
                    width: "100%",
                    marginY: 1.25,
                    marginBottom: 0.5,
                  }}
                />
                <Skeleton
                  animation="pulse"
                  variant="text"
                  sx={{ fontSize: "1rem", width: "85%" }}
                />
                <Box sx={{ display: "flex", gap: 2.5, marginTop: 1 }}>
                  {Array(3)
                    .fill(undefined)
                    .map((_, idx) => {
                      return (
                        <Skeleton
                          animation="pulse"
                          variant="rounded"
                          width={60}
                          height={30}
                          sx={{ borderRadius: "16px" }}
                          key={idx}
                        ></Skeleton>
                      );
                    })}
                </Box>
              </Box>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default MovieSkeleton;
