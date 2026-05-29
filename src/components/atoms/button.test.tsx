import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

describe("Button component", () => {
  it("renders correctly with children", () => {
    render(<Button>Click me</Button>);
    const buttonEl = screen.getByRole("button", { name: /click me/i });
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveClass("bg-palette-sandstone");
  });

  it("applies secondary variant classes", () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const buttonEl = screen.getByRole("button", { name: /secondary/i });
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveClass("bg-palette-charcoal");
  });

  it("passes standard attributes like disabled", () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonEl = screen.getByRole("button", { name: /disabled/i });
    expect(buttonEl).toBeDisabled();
  });
});
