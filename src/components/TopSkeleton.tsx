import { Box, Skeleton } from "@mui/material";

const TopSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="text"
        height="5rem"
        width="30rem"
        sx={{ marginX: "auto", marginTop: "2.5rem" }}
      ></Skeleton>

      <Box sx={{ display: "flex", alignItems: "center", marginTop: "6.5rem" }}>
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
                  borderRight: "1px solid #121212",
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
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
                  borderLeft: "1px solid #121212",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              />
            );
          })}
      </Box>
    </>
  );
};

export default TopSkeleton;
