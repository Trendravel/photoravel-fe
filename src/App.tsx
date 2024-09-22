import { Global } from "@emotion/react";
import { CookiesProvider } from "react-cookie";
import { RouterProvider } from "react-router-dom";

import Router from "./Router";
import { globalStyles } from "./styles/globalStyles";

function App() {
  return (
    <CookiesProvider>
      <Global styles={globalStyles}/>
        <RouterProvider router={Router}/>
    </CookiesProvider>
  );
}

export default App;
