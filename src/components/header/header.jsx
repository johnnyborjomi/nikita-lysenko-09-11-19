import * as React from "react";

import "./header.scss";

export default function Header(props) {
  return (
    <header className={"header"}>
      <h1 className={"app-title"}>☂️ Weather App</h1>
      <nav className={"header-nav"}>{props.children}</nav>
    </header>
  );
}
