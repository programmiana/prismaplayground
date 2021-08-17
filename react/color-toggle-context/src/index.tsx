import * as React from "react";
import ReactDOM from "react-dom";
import { Toggle } from "./toggle";
import { LayoutContainer } from "./container";
import { NightModeProvider } from "./mode-context";

const App = () => {
  return (
    <NightModeProvider>
      <LayoutContainer>
        <Toggle />
      </LayoutContainer>
    </NightModeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
