import { render, screen } from "@testing-library/react";
import LevelCard from "../LevelCard";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Renders level display card", () => {
  it("Displays level name", () => {
    render(<LevelCard levelName={"TEST_LEVEL"} />, { wrapper: MemoryRouter });
    const titleElement = screen.getByText(/TEST_LEVEL/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("Display Image has a correct src", () => {
    render(<LevelCard levelName={"TEST_LEVEL"} />, { wrapper: MemoryRouter });
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src");
  });
});
