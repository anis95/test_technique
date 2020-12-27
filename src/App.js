import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import BrandDetails from "./components/pages/BrandDetails";

class App extends Component {
  render() {
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
}

export default App;
