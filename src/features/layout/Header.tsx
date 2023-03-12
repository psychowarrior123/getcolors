import React from "react";
import { Box, BoxProps, Typography, useTheme } from "@mui/material";

export const Header = React.memo<BoxProps>((boxProps) => {
  const theme = useTheme();
  const { sx, ...restBoxProps } = boxProps;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "fit-content",
        paddingY: theme.spacing(3),
        paddingX: theme.spacing(6),
        background: theme.palette.common.black,
        boxShadow: "0px 1px 0px #D4DCE8",
        ...sx,
      }}
      {...restBoxProps}
    >
      <Typography
        variant="h3"
        sx={{
          [theme.breakpoints.down("sm")]: theme.typography.h4,
        }}
        color="white"
      >
        Узнай цвета!
      </Typography>
    </Box>
  );
});
