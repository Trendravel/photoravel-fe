import { Global } from "@emotion/react";
import { RouterProvider } from "react-router-dom";

import Router from "./Router";
import { globalStyles } from "./styles/globalStyles";

function App() {
  return (
    <>
    <Global styles={globalStyles}/>
        <RouterProvider router={Router}/>
    </>
  );
}

export default App;
