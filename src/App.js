import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import BrandDetails from "./components/pages/BrandDetails";

function App() {
  return (
    <BrowserRouter>
      <Route
        exact={true}
        path="/brand/:id"
        render={() => {
          return (
            <div>
              <BrandDetails />
            </div>
          );
        }}
      />
    </BrowserRouter>
  );
}

export default App;
