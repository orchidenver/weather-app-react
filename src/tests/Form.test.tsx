import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../components/Form";

const setSelectedCityCurrentWeather = jest.fn();
const setSelectedCityByUserFiveDaysForecast = jest.fn();

describe("Elements render in form component", () => {
  test("Search input renders with empty value", () => {
    render(
      <Form
        onWeatherChange={setSelectedCityCurrentWeather}
        onWeatherForecast={setSelectedCityByUserFiveDaysForecast}
      />
    );

    expect(searchInput()).toBeInTheDocument();
    expect(searchInput()).toBeEmptyDOMElement();
  });

  test("List of searched cities is not in the document on page load", () => {
    render(
      <Form
        onWeatherChange={setSelectedCityCurrentWeather}
        onWeatherForecast={setSelectedCityByUserFiveDaysForecast}
      />
    );

    const citiesList: HTMLUListElement | null = screen.queryByRole("listbox");
    expect(citiesList).toBeNull();
  });

  test("Input receives a value that user typed", async () => {
    render(
      <Form
        onWeatherChange={setSelectedCityCurrentWeather}
        onWeatherForecast={setSelectedCityByUserFiveDaysForecast}
      />
    );
    const user = userEvent.setup();

    await user.type(searchInput(), "Lviv");

    expect(searchInput()).toHaveValue("Lviv");
    expect(searchInput()).not.toHaveValue("Kyiv");

    await user.type(searchInput(), "{backspace}");
    expect(searchInput()).toHaveValue("Lvi");
    expect(searchInput()).not.toHaveValue("Lviv");
  });
});

describe("Search input validation runs correctly", () => {
  test("Testing search input validation when user types number", async () => {
    render(
      <Form
        onWeatherChange={setSelectedCityCurrentWeather}
        onWeatherForecast={setSelectedCityByUserFiveDaysForecast}
      />
    );
    const user = userEvent.setup();
    await user.type(searchInput(), "r3");

    expect(searchInput()).toHaveValue("r3");
    expect(searchInput()).not.toHaveValue("Kyiv");
    expect(
      screen.getByText(/numbers can't be in a city nam/i)
    ).toBeInTheDocument();
  });

  test("Testing required field", async () => {
    render(
      <Form
        onWeatherChange={setSelectedCityCurrentWeather}
        onWeatherForecast={setSelectedCityByUserFiveDaysForecast}
      />
    );

    const user = userEvent.setup();

    expect(searchInput()).toBeInTheDocument();

    await user.tab();
    expect(searchInput()).toHaveFocus();

    await user.tab();
    expect(searchInput()).not.toHaveFocus();
    expect(screen.getByText(/please enter the city name/i)).toBeInTheDocument();
  });
});

function searchInput(): HTMLInputElement {
  return screen.getByRole("combobox", {
    name: /city/i,
  });
}
