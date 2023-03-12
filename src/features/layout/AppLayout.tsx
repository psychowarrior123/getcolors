import React from "react";
import { Box, Container, useTheme } from "@mui/material";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const AppLayout = React.memo<{
  children?: React.ReactElement | React.ReactElement[];
}>(({ children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "rgb(255, 230, 230, 0.5)",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Header />
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          flexGrow: 1,
          paddingX: theme.spacing(8),
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
});
