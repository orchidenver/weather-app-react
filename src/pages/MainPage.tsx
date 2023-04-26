import { useState, MouseEvent } from "react";
import { Box, Stack, Typography, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";
import sunny from "../assets/sunny.svg";
import rainySmall from "../assets/rainy-small.svg";
import {
  ForecastDataPerDay,
  CurrentWeatherType,
  CityType,
  ButtonEnum,
} from "../interfaces";
import MobileView from "./MobileView";
import Form from "../components/Form";
import {
  selectWeatherImage,
  filterForecastData,
  transformDate,
} from "../helpers";

import "swiper/css";
import "./MainPage.css";

export interface IAppProps {}

const tempArray: ForecastDataPerDay[] = [
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
  {
    date: "23 may",
    img: rainySmall,
    temp: "23°C",
  },
];

export default function MainPage(props: IAppProps) {
  const [selectedCityCurrentWeather, setSelectedCityCurrentWeather] =
    useState<CurrentWeatherType | null>({
      date: "Monday, 24/04/2023",
      city: "Odesa",
      temp: 0,
      weatherDescription: "Clouds",
      humidity: 70,
      windSpeed: 5,
    });
  const [
    selectedCityByUserFiveDaysForecast,
    setSelectedCityByUserFiveDaysForecast,
  ] = useState<CurrentWeatherType[]>([
    {
      date: "Monday, 24/04/2023",
      city: "Odesa",
      temp: 0,
      weatherDescription: "Clouds",
      humidity: 70,
      windSpeed: 5,
    },
  ]);
  const [daysPerViewForecast, setDaysPerViewForecast] = useState<number>(
    ButtonEnum.TWO
  );
  const theme = useTheme();
  const matchesMobileResolution: boolean = useMediaQuery<string | undefined>(
    theme.breakpoints.up("sm")
  );
  const smallScreen: boolean = useMediaQuery<string | undefined>(
    "@media (max-width: 375px)"
  );

  function daysPerView(e: MouseEvent<HTMLButtonElement>) {
    const textValue: string | null = (e.target as HTMLElement)!.textContent;
    const daysPerView: number = +textValue!.split(" ")[0];
    setDaysPerViewForecast(daysPerView);
  }

  return (
    <Stack
      component="section"
      direction="column"
      justifyContent={
        matchesMobileResolution ? "space-evenly" : "space-between"
      }
      alignItems="center"
      sx={{
        width: "100",
        height: "100vh",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box
        sx={{
          width: matchesMobileResolution ? "75%" : "100vw",
          height: "70%",
          backgroundColor: "blue",
          borderTopLeftRadius: matchesMobileResolution ? 12 : "none",
          borderTopRightRadius: matchesMobileResolution ? 12 : "none",
          borderBottomLeftRadius: matchesMobileResolution ? 12 : 24,
          borderBottomRightRadius: matchesMobileResolution ? 12 : 24,
          background: `linear-gradient(${
            matchesMobileResolution ? "45deg" : "145deg"
          }, rgba(239,255,253,0) 0%, rgba(239,255,253,1) 100%)`,
          paddingLeft: matchesMobileResolution ? 2 : 0,
          paddingRight: matchesMobileResolution ? 2 : 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100%",
            height: "15%",
          }}
        >
          <Form
            onWeatherChange={setSelectedCityCurrentWeather}
            onWeatherForecast={setSelectedCityByUserFiveDaysForecast}
          />
        </Stack>
        {matchesMobileResolution ? (
          <Stack
            direction="column"
            justifyContent="start"
            alignItems="start"
            color={theme.palette.secondary.main}
            sx={{
              width: "100%",
              height: "55%",
              marginLeft: { lg: 30, xl: 20, md: 20, sm: 10 },
              position: "relative",
            }}
          >
            <Typography variant="h6" paragraph mb={0} sx={{ height: "15%" }}>
              {selectedCityCurrentWeather?.date}
            </Typography>
            <Typography
              variant="h3"
              component="h3"
              sx={{ height: "15%", marginBottom: 1 }}
            >
              {selectedCityCurrentWeather?.city}
            </Typography>
            <Typography
              variant="h3"
              paragraph
              mb={0}
              sx={{ height: "15%", marginBottom: 1 }}
            >
              {`${selectedCityCurrentWeather?.temp} °C`}
            </Typography>
            <Typography
              variant="h3"
              paragraph
              mb={3}
              sx={{
                height: "15%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: 190,
              }}
            >
              {selectedCityCurrentWeather?.weatherDescription}
            </Typography>
            <Typography variant="h4" paragraph mb={0} sx={{ height: "15%" }}>
              Humidity: {selectedCityCurrentWeather?.humidity}%
            </Typography>
            <Typography variant="h4" paragraph mb={0} sx={{ height: "15%" }}>
              Wind speed: {selectedCityCurrentWeather?.windSpeed} m/sec
            </Typography>
            <img
              src={selectWeatherImage(
                selectedCityCurrentWeather?.weatherDescription
              )}
              alt={`${selectedCityCurrentWeather?.weatherDescription} weather`}
              loading="lazy"
              style={{
                position: "absolute",
                top: "3%",
                right: "30%",
                width: "25%",
              }}
            />
          </Stack>
        ) : (
          <MobileView currentCityData={selectedCityCurrentWeather} />
        )}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          sx={{
            width: "100%",
            height: "25%",
          }}
        >
          <Box
            sx={{
              width: matchesMobileResolution ? "80%" : "92vw",
              height: "80%",
              display: "flex",
            }}
          >
            <Swiper
              direction="horizontal"
              slidesPerView={matchesMobileResolution ? 8 : 4}
              centerInsufficientSlides={true}
              mousewheel={true}
              modules={[Mousewheel]}
              className="mySwiper"
              style={{ width: "100%" }}
            >
              {filterForecastData(selectedCityByUserFiveDaysForecast).map(
                (day: CurrentWeatherType) => {
                  return (
                    <SwiperSlide
                      key={day.id}
                      style={{
                        height: matchesMobileResolution ? "100%" : "50%",
                        maxWidth: matchesMobileResolution ? "12.5%" : "23vw",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 1,
                        borderRadius: 5,
                        color: `${
                          matchesMobileResolution
                            ? theme.palette.secondary.main
                            : theme.palette.primary.main
                        }`,
                      }}
                    >
                      <Typography>
                        {transformDate(new Date(day.date), true)}
                      </Typography>
                      <img
                        style={{ height: 50 }}
                        alt="weather"
                        src={selectWeatherImage(day.weatherDescription)}
                      />
                      <Typography>{day.temp + " °C"}</Typography>
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          width: matchesMobileResolution ? "60%" : "90%",
          height: "25%",
          backgroundColor: "blue",
          borderRadius: 12,
          background: theme.palette.primary.main,
          paddingLeft: 2,
          paddingRight: 2,
          paddingBottom: matchesMobileResolution ? 0 : 3,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          sx={{ width: "90%" }}
        >
          <Button
            variant="outlined"
            color="secondary"
            size={matchesMobileResolution ? "medium" : "small"}
            sx={{ borderRadius: 2 }}
            onClick={daysPerView}
          >
            2 days
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size={matchesMobileResolution ? "medium" : "small"}
            sx={{ borderRadius: 2 }}
            onClick={daysPerView}
          >
            3 days
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size={matchesMobileResolution ? "medium" : "small"}
            sx={{ borderRadius: 2 }}
            onClick={daysPerView}
          >
            5 days
          </Button>
        </Stack>
        <Stack
          direction="row"
          sx={{
            width: "90%",
            height: "90%",
          }}
        >
          <Swiper
            direction="horizontal"
            slidesPerView={matchesMobileResolution ? 6 : 3}
            mousewheel={true}
            modules={[Mousewheel]}
            className="mySwiper"
            style={{ width: "100%" }}
          >
            {filterForecastData(
              selectedCityByUserFiveDaysForecast,
              daysPerViewForecast
            ).map((day: CurrentWeatherType) => {
              return (
                <SwiperSlide
                  key={day.id}
                  style={{
                    height: "70%",
                    maxWidth: matchesMobileResolution ? "14%" : "30%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.palette.secondary.dark,
                    borderRadius: 5,
                    marginLeft: matchesMobileResolution ? "2.5%" : "3.3%",
                    color: theme.palette.primary.main,
                    boxShadow: "rgba(0, 0, 0, 0.69) 2px 2px 5px 0px",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant={smallScreen ? "caption" : "body2"}
                    sx={{ textAlign: "center" }}
                  >
                    {transformDate(new Date(day.date), true, true)}
                  </Typography>
                  <img
                    style={{ height: 50 }}
                    alt="weather"
                    src={selectWeatherImage(day.weatherDescription)}
                  />
                  <Typography>{day.temp + " °C"}</Typography>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </Box>
    </Stack>
  );
}
