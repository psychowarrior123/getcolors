import React from "react";
import { Box, BoxProps, Typography } from "@mui/material";

export const Footer = React.memo<BoxProps>((boxProps) => {
  const { sx, ...restBoxProps } = boxProps;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingY: "27px",
        bgcolor: (theme) => theme.palette.common.black,
        ...sx,
      }}
      {...restBoxProps}
    >
      <Typography variant="body1" color={"white"}>
        © Футер
      </Typography>
    </Box>
  );
});
