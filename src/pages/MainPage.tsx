import * as React from "react";
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
import { ForecastDataPerDay } from "../interfaces";
import MobileView from "./MobileView";
import Form from "../components/Form";

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
  const theme = useTheme();

  const matches: boolean = useMediaQuery<string | undefined>(
    theme.breakpoints.up("sm")
  );

  const smallScreen: boolean = useMediaQuery<string | undefined>(
    "@media (max-width: 375px)"
  );

  return (
    <Stack
      component="section"
      direction="column"
      justifyContent={matches ? "space-evenly" : "space-between"}
      alignItems="center"
      sx={{
        width: "100",
        height: "100vh",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box
        sx={{
          width: matches ? "75%" : "100vw",
          height: "70%",
          backgroundColor: "blue",
          borderTopLeftRadius: matches ? 12 : "none",
          borderTopRightRadius: matches ? 12 : "none",
          borderBottomLeftRadius: matches ? 12 : 24,
          borderBottomRightRadius: matches ? 12 : 24,
          background: `linear-gradient(${
            matches ? "45deg" : "145deg"
          }, rgba(239,255,253,0) 0%, rgba(239,255,253,1) 100%)`,
          paddingLeft: matches ? 2 : 0,
          paddingRight: matches ? 2 : 0,
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
          <Form />
        </Stack>
        {matches ? (
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
              Monday, 10/04/2023
            </Typography>
            <Typography
              variant="h3"
              component="h3"
              sx={{ height: "15%", marginBottom: 1 }}
            >
              Kyiv, Ukraine
            </Typography>
            <Typography
              variant="h3"
              paragraph
              mb={0}
              sx={{ height: "15%", marginBottom: 1 }}
            >
              +7
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
              Sunny <WbSunnyIcon fontSize="large" />
            </Typography>
            <Typography variant="h4" paragraph mb={0} sx={{ height: "15%" }}>
              Humidity: 77%
            </Typography>
            <Typography variant="h4" paragraph mb={0} sx={{ height: "15%" }}>
              Wind speed: 5 m/sec
            </Typography>
            <img
              src={sunny}
              alt="sunny weather"
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
          <MobileView />
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
              width: matches ? "80%" : "92vw",
              height: "80%",
              display: "flex",
            }}
          >
            <Swiper
              direction="horizontal"
              slidesPerView={matches ? 8 : 4}
              mousewheel={true}
              modules={[Mousewheel]}
              className="mySwiper"
            >
              {tempArray.map((day: ForecastDataPerDay, i) => {
                return (
                  <SwiperSlide
                    key={`${day.date} + ${i}`}
                    style={{
                      height: matches ? "70%" : "50%",
                      maxWidth: matches ? "12.5%" : "23vw",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 1,
                      borderRadius: 5,
                      color: `${
                        matches
                          ? theme.palette.secondary.main
                          : theme.palette.primary.main
                      }`,
                    }}
                  >
                    <Typography>{day.date}</Typography>
                    <img style={{ height: 50 }} alt="weather" src={day.img} />
                    <Typography>{day.temp}</Typography>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          width: matches ? "60%" : "90%",
          height: "25%",
          backgroundColor: "blue",
          borderRadius: 12,
          background: theme.palette.primary.main,
          paddingLeft: 2,
          paddingRight: 2,
          paddingBottom: matches ? 0 : 4,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: smallScreen ? -2 : 0,
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
            size={matches ? "medium" : "small"}
            sx={{ borderRadius: 2 }}
          >
            3 days
          </Button>
          <Button
            variant="contained"
            size={matches ? "medium" : "small"}
            sx={{ borderRadius: 2 }}
          >
            7 days
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size={matches ? "medium" : "small"}
            sx={{ borderRadius: 2 }}
          >
            10 days
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
            slidesPerView={matches ? 6 : 3}
            mousewheel={true}
            modules={[Mousewheel]}
            className="mySwiper"
          >
            {tempArray.map((day: ForecastDataPerDay, i) => {
              return (
                <SwiperSlide
                  key={`${day.date} + ${i}`}
                  style={{
                    height: "70%",
                    maxWidth: matches ? "14%" : "30%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: 5,
                    marginLeft: matches ? "2.5%" : "3.3%",
                    color: theme.palette.primary.main,
                    boxShadow: "rgba(0, 0, 0, 0.69) 2px 2px 5px 0px",
                    cursor: "pointer",
                  }}
                >
                  <Typography>{day.date}</Typography>
                  <img style={{ height: 50 }} alt="weather" src={day.img} />
                  <Typography>{day.temp}</Typography>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </Box>
    </Stack>
  );
}
