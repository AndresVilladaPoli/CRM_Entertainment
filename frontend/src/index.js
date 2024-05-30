import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";


import store from "./store";
// import { ThemeProvider } from "../src/components/VerticalLayout/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
              {/* <ThemeProvider> Envolver la aplicación con ThemeProvider */}
      <React.Fragment>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.Fragment>
      {/* </ThemeProvider> */}

    </Provider>
);

