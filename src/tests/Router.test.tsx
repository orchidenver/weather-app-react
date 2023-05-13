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

describe("Router test", () => {
  test("MainPage test", () => {
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
      const btn = screen.getByRole("button", { name });
      expect(btn).toBeInTheDocument();
    });

    const errorPageHeading = screen.queryByTestId("error-page-heading");
    const errorPageText = screen.queryByTestId("error-page-text");
    expect(errorPageHeading).not.toBeInTheDocument();
    expect(errorPageText).not.toBeInTheDocument();
  });
  test("Page 404 test", () => {
    render(
      <MemoryRouter initialEntries={["/error"]}>
        <Routes>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </MemoryRouter>
    );
    const errorPageHeading = screen.getByTestId("error-page-heading");
    const errorPageText = screen.getByTestId("error-page-text");
    const input: HTMLInputElement | null = screen.queryByRole("combobox", {
      name: /city/i,
    });
    expect(input).not.toBeInTheDocument();
    expect(errorPageHeading).toBeInTheDocument();
    expect(errorPageText).toBeInTheDocument();
  });
});
