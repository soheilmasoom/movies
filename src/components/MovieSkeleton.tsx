import { Box, Grid, Skeleton, useMediaQuery } from "@mui/material";

const MovieSkeleton = () => {
  const lgScreen = useMediaQuery('(min-width: 748px)')

  
  return (
    <Grid container spacing={3}>
      {Array(6)
        .fill(undefined)
        .map((_, idx) => {
          return (
            <Grid
              item
              key={idx}
              xs={12}
              md={6}
              lg={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <MovieCard item={item}></MovieCard> */}
              <Box sx={{ height: 377, maxWidth: lgScreen ? '270px' : '300px' }}>
                <Skeleton
                  animation="pulse"
                  variant="rounded"
                  width={lgScreen ? '270px' : '300px'}
                  height={220}
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
                  {Array(3).fill(undefined).map((_, idx) => {
                    return <Skeleton animation="pulse" variant="rounded" width={60} height={30} sx={{borderRadius: '16px'}} key={idx}></Skeleton>
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
