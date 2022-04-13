import React from "react";
import { render } from "@testing-library/react";

import ExtendedButton from "./ExtendedButton";

describe("ExtendedButton", () => {
  test("renders the ExtendedButton component", () => {
    render(<ExtendedButton text="Hello world!" />);
  });
});
