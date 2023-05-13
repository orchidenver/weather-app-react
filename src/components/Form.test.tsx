import React, { useState as useStateMock } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const setSelectedCityCurrentWeather = jest.fn();
const setSelectedCityByUserFiveDaysForecast = jest.fn();
beforeEach(() => {
  (useStateMock as jest.Mock).mockImplementation((init) => [
    init,
    setSelectedCityCurrentWeather,
  ]);
  (useStateMock as jest.Mock).mockImplementation((init) => [
    init,
    setSelectedCityByUserFiveDaysForecast,
  ]);
});

describe("elements render", () => {
  test("search input renders and it's empty", () => {
    render(
      <Form
        onWeatherChange={setSelectedCityCurrentWeather}
        onWeatherForecast={setSelectedCityByUserFiveDaysForecast}
      />
    );

    const inputLabel = screen.getByLabelText("City");
    const searchInput = screen.getByRole("combobox", { name: "City" });
    expect(searchInput).toBeInTheDocument();
    expect(inputLabel).toBeInTheDocument();
    expect(searchInput).toBeEmptyDOMElement();
  });

  test("search panel is accessible with tab", async () => {
    const { container } = render(
      <Form
        onWeatherChange={setSelectedCityCurrentWeather}
        onWeatherForecast={setSelectedCityByUserFiveDaysForecast}
      />
    );

    const user = userEvent.setup();

    const searchInput = screen.getByRole("combobox", { name: "City" });
    expect(searchInput).toBeInTheDocument();

    await user.tab();
    expect(searchInput).toHaveFocus();
  });

  test("list of searched cities is not in the document on page load", () => {
    render(
      <Form
        onWeatherChange={setSelectedCityCurrentWeather}
        onWeatherForecast={setSelectedCityByUserFiveDaysForecast}
      />
    );

    const citiesList = screen.queryByRole("listbox");
    expect(citiesList).toBeNull();
  });

  // test("first API call when user types a city name", async () => {
  //   render(
  //     <Form
  //       onWeatherChange={setSelectedCityCurrentWeather}
  //       onWeatherForecast={setSelectedCityByUserFiveDaysForecast}
  //     />
  //   );
  //   const searchInput = screen.getByRole("combobox", { name: "City" });
  //   const user = userEvent.setup();

  //   await user.type(searchInput, "lviv");

  //   const citiesList = await screen.findByRole("listbox");
  //   expect(citiesList).toBeInTheDocument();
  // });
});
