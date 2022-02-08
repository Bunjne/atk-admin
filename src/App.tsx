import React, { useState, useRef } from 'react';
import Header from './layouts/header';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Mint from "./routes/Mint";
import Election from "./routes/Election";
import NoPage from "./routes/NoPage";
import MarketPlace from "./routes/Marketplace";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import Themes from './assets/themes';
import './components/helpers/font.css'

export default function App() {
  const [page, setPage] = useState(0);

  return (
    <ThemeProvider theme={Themes.appTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Box >
          <Header page={page} setPage={setPage} />
          <Routes>
            <Route path="/mint" element={<Mint />} />
            <Route path="/marketplace" element={<MarketPlace />} />
            <Route path="/election" element={<Election />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}