import React from "react";
import "./index.css";
import App from "./App";

const CustomComponent = (props: ICustomComponentsProps) => <App {...props} />;

window.im.component.addComponent("bar", () => CustomComponent);
