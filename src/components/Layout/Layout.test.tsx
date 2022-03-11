import { render, screen } from "@testing-library/react";

import Layout from "./Layout";

describe("Layout", () => {
  it("renders a header", () => {
    render(<Layout />);

    const header = screen.getByRole("banner");

    expect(header).toBeInTheDocument();
  });
  it("renders a main", () => {
    render(<Layout />);

    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();
  });
});
