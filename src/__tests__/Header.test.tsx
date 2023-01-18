import { render, screen } from "@testing-library/react";
import Header from "../Header";
import { MemoryRouter } from "react-router-dom";

describe("Renders Home Page", () => {
  it("Renders App Title", () => {
    render(<Header />, { wrapper: MemoryRouter });
    const titleElement = screen.getByRole("heading");
    expect(titleElement).toBeInTheDocument();
  });

  it("Renders Credits Link", () => {
    render(<Header />, { wrapper: MemoryRouter });
    const linkElement = screen.getByText(/Credits/i);
    expect(linkElement).toBeInTheDocument();
  });
});
