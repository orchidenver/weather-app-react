import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: any) => (
    <div data-testid="Swiper-testId">{children}</div>
  ),
  SwiperSlide: ({ children }: any) => (
    <div data-testid="SwiperSlide-testId">{children}</div>
  ),
}));

jest.mock("swiper", () => ({
  Mousewheel: (props: any) => null,
}));

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/2 days/i);
  expect(linkElement).toBeInTheDocument();
});

describe("App", () => {
  test("App renders current weather on first API call in useEffect (on success)", async () => {
    render(<App />);

    const ciyName = await screen.findByRole("heading");
    expect(ciyName).toBeInTheDocument();
    expect(ciyName.textContent).toBe("Lviv");
  });
});
