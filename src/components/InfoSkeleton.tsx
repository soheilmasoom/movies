import { Box, Grid, Skeleton, useMediaQuery } from "@mui/material";
import { getCenter } from "./MuiCustoms";
import { themeRadius } from "../context/Theme";

const InfoSkeleton = () => {
  // Mediaqueries
  const md = useMediaQuery("(min-width:768px)");
  const lg = useMediaQuery("(min-width:992px)");

  return (
    <Box
      sx={{ width: "100%", height: "calc(100vh - 75px)", overflow: "hidden" }}
    >
      <Grid container spacing="2.5rem" padding="2rem">
        {md && !lg && (
          <Grid item xs={12}>
            <Skeleton
              variant="text"
              width="min(25rem, 100%)"
              height="5rem"
              sx={{ marginX: "auto" }}
            ></Skeleton>
          </Grid>
        )}

        <Grid item xs={12} md={6} lg={3} order={1} sx={getCenter.flex}>
          <Skeleton
            variant="rectangular"
            width={md ? "250px" : "120px"}
            height={md ? "380px" : "180px"}
          ></Skeleton>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          lg={6}
          order={lg ? 2 : md ? 3 : 2}
          display="flex"
          flexDirection="column"
          gap="2rem"
        >
          {!(md && !lg) && (
            <Skeleton
              variant="text"
              width="min(25rem, 100%)"
              height="5rem"
              sx={{ alignSelf: lg ? "start" : "center" }}
            ></Skeleton>
          )}

          <Box
            display="flex"
            gap="1.5rem"
            width="min(32rem, 100%)"
            sx={{ alignSelf: lg ? "start" : "center" }}
          >
            <Skeleton variant="rounded" height="3rem" width="7rem"></Skeleton>
            <Skeleton variant="rounded" height="3rem" width="7rem"></Skeleton>
            <Skeleton variant="rounded" height="3rem" width="7rem"></Skeleton>
            <Skeleton variant="rounded" height="3rem" width="7rem"></Skeleton>
          </Box>

          <Box>
            <Skeleton variant="text" height="2rem" width="8rem"></Skeleton>
            <Skeleton variant="text" width="100%"></Skeleton>
            <Skeleton variant="text" width="100%"></Skeleton>
            <Skeleton variant="text" width="100%"></Skeleton>
          </Box>

          <Box display="flex" gap="1.5rem">
            {Array(4)
              .fill(undefined)
              .map((_, idx) => {
                return (
                  <Skeleton
                    key={idx}
                    variant="rounded"
                    height="3rem"
                    width="7rem"
                    sx={{ borderRadius: themeRadius[2] }}
                  />
                );
              })}
          </Box>
        </Grid>
        {md && (
          <Grid item xs={12} md={5} lg={3} order={lg ? 3 : md ? 2 : 3}>
            {lg && (
              <Box display="flex" gap="1rem" marginBottom="2rem">
                <Skeleton variant="text" width="80%" height="2.5rem"></Skeleton>
                <Skeleton
                  variant="circular"
                  width="2.5rem"
                  height="2.5rem"
                ></Skeleton>
              </Box>
            )}
            {Array(4)
              .fill(undefined)
              .map((_, idx) => {
                return (
                  <Box
                    key={idx}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    marginY="1rem"
                  >
                    <Skeleton
                      variant="text"
                      width="80%"
                      height="2.5rem"
                    ></Skeleton>
                    <Skeleton variant="text" width="65%"></Skeleton>
                  </Box>
                );
              })}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default InfoSkeleton;
