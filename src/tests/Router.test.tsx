import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { MainPage, Page404 } from "../pages";

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

describe("Testing React Router", () => {
  test("MainPage loads with correct path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </MemoryRouter>
    );
    const cityNameElement: HTMLHeadingElement = screen.getByRole("heading", {
      name: /odesa/i,
    });
    expect(cityNameElement).toBeInTheDocument();

    ["2 days", "3 days", "5 days"].forEach((name: string) => {
      const btn: HTMLButtonElement = screen.getByRole("button", { name });
      expect(btn).toBeInTheDocument();
    });

    const errorPageHeading: HTMLElement | null =
      screen.queryByTestId("error-page-heading");
    const errorPageText: HTMLElement | null =
      screen.queryByTestId("error-page-text");
    expect(errorPageHeading).not.toBeInTheDocument();
    expect(errorPageText).not.toBeInTheDocument();
  });

  test("Page 404 loads with correct path", () => {
    render(
      <MemoryRouter initialEntries={["/error"]}>
        <Routes>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </MemoryRouter>
    );
    const errorPageHeading: HTMLElement =
      screen.getByTestId("error-page-heading");
    const errorPageText: HTMLElement = screen.getByTestId("error-page-text");
    const input: HTMLInputElement | null = screen.queryByRole("combobox", {
      name: /city/i,
    });
    expect(input).not.toBeInTheDocument();
    expect(errorPageHeading).toBeInTheDocument();
    expect(errorPageText).toBeInTheDocument();
  });
});
