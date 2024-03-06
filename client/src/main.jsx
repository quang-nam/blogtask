import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import i18n from "./i18n/i18n.js";
import { Box, CircularProgress } from "@mui/material";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index.js";
import { PersistGate } from "redux-persist/integration/react";

const loading = (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}
  >
    <CircularProgress color='success' />
  </Box>
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={loading}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeContextProvider>
            <App />
          </ThemeContextProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
