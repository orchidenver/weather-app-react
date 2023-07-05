import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { transformDate } from "../helpers";
import { rest } from "msw";
import { server } from "../mocks/server";
import App from "../App";

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

describe("App renders properly on the first load", () => {
  test("Mandatory App elements render correctly", () => {
    render(<App />);

    expect(searchInput()).toBeInTheDocument();

    expect(cityNameHeadingElement()).toBeInTheDocument();

    dayBtns().forEach((name: string) => {
      const dayBtn: HTMLButtonElement = screen.getByRole("button", { name });
      expect(dayBtn).toBeInTheDocument();
    });
  });
});

describe("Mocking fetch requests", () => {
  test("Mocking initial fetch in useEffect", async () => {
    render(<App />);

    await waitFor(() => {
      const currentDate: HTMLElement = screen.getByTestId("curDate");
      expect(currentDate.textContent).toBe(transformDate(new Date()));
    });

    await waitFor(() => {
      expect(cityNameHeadingElement().textContent).toBe("Odesa");
    });

    await waitFor(() => {
      const currentTemp: HTMLElement = screen.getByTestId("curTemp");
      expect(currentTemp.textContent).toBe("22 °C");
    });

    await waitFor(() => {
      const currentDescription: HTMLElement = screen.getByTestId("curDesc");
      expect(currentDescription.textContent).toBe("Sunny");
    });

    await waitFor(() => {
      const currentHumidity: HTMLElement = screen.getByTestId("curHumid");
      expect(currentHumidity.textContent).toBe("Humidity: 88%");
    });
  });

  test("Dropdown with the list of cities user searches for renders correctly", async () => {
    render(<App />);

    const user = userEvent.setup();

    await user.type(searchInput(), "Lviv");

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    const cityOptions: HTMLLIElement[] = await screen.findAllByRole("option");

    cityOptions.forEach((li: HTMLLIElement) => {
      expect(li).toBeInTheDocument();
    });
  });

  test("App data updates when user picks up the city the weather he/she wants to know about", async () => {
    render(<App />);

    const user = userEvent.setup();

    await user.type(searchInput(), "Lviv");
    const cityOptions: HTMLLIElement[] = await screen.findAllByRole("option");

    await user.click(cityOptions[0]);

    await waitFor(() => {
      expect(cityNameHeadingElement().textContent).toBe("Lviv");
    });

    await waitFor(() => {
      const currentTemp = screen.getByTestId("curTemp");
      expect(currentTemp.textContent).toBe("22 °C");
    });
  });
});

describe("Testing error handling", () => {
  test("Error handles propertly when it's failed to return response from the server", async () => {
    server.resetHandlers(
      rest.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=46.4775&lon=30.73268&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("We are sincerely sorry")).toBeInTheDocument();
    });
  });
});

describe("Testing accessibility", () => {
  test("Search panel is accessible with tab", async () => {
    render(<App />);

    const user = userEvent.setup();

    expect(searchInput()).toBeInTheDocument();

    await user.tab();
    expect(searchInput()).toHaveFocus();

    dayBtns().forEach(async (name: string) => {
      const dayBtn: HTMLButtonElement = screen.getByRole("button", { name });

      await user.tab();
      expect(dayBtn).toBeInTheDocument();
    });
  });
});

function searchInput(): HTMLInputElement {
  return screen.getByRole("combobox", {
    name: /city/i,
  });
}

function cityNameHeadingElement(): HTMLHeadingElement {
  return screen.getByRole("heading", { level: 3 });
}
function dayBtns(): string[] {
  return ["2 days", "3 days", "5 days"];
}
