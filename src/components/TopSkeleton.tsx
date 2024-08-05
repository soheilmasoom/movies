import { Box, Skeleton } from "@mui/material";
import { themeBorder } from "../context/Theme";
import { getCenter } from "./MuiCustoms";

const TopSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="text"
        height="5rem"
        width="30rem"
        sx={{ marginX: "auto", marginTop: "2.5rem" }}
      ></Skeleton>

      <Box sx={{ ...getCenter.flex, marginTop: "6.5rem" }}>
        {Array(5)
          .fill(undefined)
          .map((_, idx) => {
            return (
              <Skeleton
                key={idx}
                variant="rounded"
                sx={{
                  width: `${4 + idx}rem`,
                  height: `${6 + idx * 2}rem`,
                  borderRight: themeBorder[0],
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderColor: theme => theme.palette.background.default,
                }}
              />
            );
          })}
        <Skeleton variant="rounded" sx={{ width: "12rem", height: "16rem" }} />
        {Array(5)
          .fill(undefined)
          .map((_, idx) => {
            return (
              <Skeleton
                key={idx}
                variant="rounded"
                sx={{
                  width: `${8 - idx}rem`,
                  height: `${14 - idx * 2}rem`,
                  borderLeft: themeBorder[0],
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderColor: theme => theme.palette.background.default,
                }}
              />
            );
          })}
      </Box>
    </>
  );
};

export default TopSkeleton;
