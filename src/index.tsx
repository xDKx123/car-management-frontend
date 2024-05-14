import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/sl";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./i18n/i18n";
import "./index.css";
import { CarProvider } from "./providers/CarsProvider";
import { CustomThemeProvider } from "./providers/CustomThemeProvider";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import { UserProvider } from "./providers/UserProvider";
import reportWebVitals from "./reportWebVitals";

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <CustomThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"sl"}>
          <UserProvider>
            <SnackbarProvider>
              <CarProvider>
                <App />
              </CarProvider>
            </SnackbarProvider>
          </UserProvider>
        </LocalizationProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
