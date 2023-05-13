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

describe("App renders correctly", () => {
  test("Mandatory App elements render correctly", () => {
    render(<App />);
    const input: HTMLInputElement = screen.getByRole("combobox", {
      name: /city/i,
    });
    expect(input).toBeInTheDocument();

    const cityNameElement: HTMLHeadingElement = screen.getByRole("heading", {
      name: /odesa/i,
    });
    expect(cityNameElement).toBeInTheDocument();

    ["2 days", "3 days", "5 days"].forEach((name: string) => {
      const btn = screen.getByRole("button", { name });
      expect(btn).toBeInTheDocument();
    });
  });

  // test("Swiper and swiper elements render correctly", async () => {
  //   render(<App />);

  //   await waitFor(() => {
  //     const swiperWeatherHourly = screen.getByTestId("swiper-weather-hourly");
  //     const swiperWeatherDaily = screen.getByTestId("swiper-weather-daily");
  //   });
  // });
});

describe("App", () => {
  test("App renders current weather on first API call in useEffect (on success)", async () => {
    render(<App />);

    const ciyName = await screen.findByRole("heading");
    expect(ciyName).toBeInTheDocument();
    expect(ciyName.textContent).toBe("Lviv");
  });
});
