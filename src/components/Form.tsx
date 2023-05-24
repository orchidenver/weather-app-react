import {
  useState,
  useMemo,
  useRef,
  MutableRefObject,
  forwardRef,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import {
  FormControl,
  useMediaQuery,
  Typography,
  Autocomplete,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SearchedCityType,
  SearchedCityTypeExtended,
  CurrentWeatherType,
  WeatherForecast,
  FormProps,
} from "../types";
import { transformDate } from "../helpers";
import * as yup from "yup";

const schema = yup.object({
  city: yup
    .string()
    .required(" ")
    .test("regex test", `Numbers can't be in a city name`, (val) => {
      const regExp = /^[,a-zA-Z\s]+$/;
      return regExp.test(val as string);
    }),
});

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Form({
  onWeatherChange,
  onWeatherForecast,
}: FormProps) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showCitySelection, setShowCitySelection] = useState<boolean>(false);
  const [searchedCitySelection, setSearchedCitySelection] = useState<
    SearchedCityType[]
  >([
    {
      name: "",
      state: "",
      lat: 0,
      lon: 0,
    },
  ]);
  const searchInput = useRef() as MutableRefObject<HTMLInputElement>;
  const theme = useTheme();
  const matchesMobileResolution: boolean = useMediaQuery<string | undefined>(
    theme.breakpoints.up("sm")
  );
  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    onSelectedCityHandler({
      name: "Odesa",
      state: "Ukraine",
      lat: 46.4843023,
      lon: 30.7322878,
    });
  }, []);

  const debounce = () => {
    let timeoutID: ReturnType<typeof setTimeout>;

    return (value: yup.InferType<typeof schema>) => {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        if (value?.city && value?.city?.trim() !== "") {
          onChangeHandler(value);
        }
      }, 700);
    };
  };

  const onChangeHandler: SubmitHandler<yup.InferType<typeof schema>> = (
    value
  ) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value?.city?.trim()}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((response) => {
        const cities = response.map(
          (city: SearchedCityTypeExtended): SearchedCityType => {
            const label = `${city?.name}, ${city?.country}${
              city.state ? ", " + city?.state : ""
            }`;
            return {
              name: label,
              state: city?.state,
              lat: city?.lat,
              lon: city?.lon,
            };
          }
        );
        setSearchedCitySelection(cities);
        setShowCitySelection(true);
        clearErrors("city");
      })
      .catch(() => {
        setShowPopup(true);
      });
  };

  function onCloseHandler() {
    setShowCitySelection(false);
  }

  const onInputChangeHandlerDebounce = useMemo(() => debounce(), []);

  function onFocusHandler() {
    searchInput?.current.blur();
  }

  function fetchCurrentWeatherData(cityData: SearchedCityType) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${cityData?.lat}&lon=${cityData?.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        onWeatherChange({
          date: transformDate(new Date()),
          city: cityData?.name.split(",")[0],
          temp: Math.round(response.main.temp),
          weatherDescription: response.weather[0].main,
          humidity: response.main.humidity,
          windSpeed: Math.round(response.wind.speed),
        });
      })
      .catch(() => {
        setShowPopup(true);
      });
  }

  function fetchForecatsForFiveDays(cityData: SearchedCityType) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData?.lat}&lon=${cityData?.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        const forecastId: number = response.city.id;

        const fiveDayForecast: CurrentWeatherType[] = response.list.map(
          (data: WeatherForecast, i: number) => {
            return {
              id: forecastId + i,
              date: data.dt,
              city: cityData?.name.split(",")[0],
              temp: Math.round(data.main.temp),
              weatherDescription: data.weather[0].main,
              humidity: data.main.humidity,
              windSpeed: Math.round(data.wind.speed),
            };
          }
        );
        onWeatherForecast(fiveDayForecast);
      })
      .catch(() => {
        setShowPopup(true);
      });
  }

  function onSelectedCityHandler(cityData: SearchedCityType) {
    setShowCitySelection(false);

    fetchCurrentWeatherData(cityData);
    fetchForecatsForFiveDays(cityData);

    setSearchedCitySelection([
      {
        name: "",
        state: "",
        lat: 0,
        lon: 0,
      },
    ]);
    reset({
      city: "",
    });
    clearErrors("city");
    onFocusHandler();
  }

  const onClosePopupHandle = () => {
    setShowPopup(false);
  };

  return (
    <>
      <FormControl
        variant="outlined"
        sx={{
          width: { lg: "40%", xl: "40%", md: "50%", sm: "50%", xs: "80%" },
        }}
      >
        <Autocomplete
          open={showCitySelection}
          filterOptions={(x) => x}
          forcePopupIcon={false}
          loading={false}
          disablePortal={false}
          getOptionLabel={(option) => option.name}
          id="city-search"
          options={searchedCitySelection}
          size="small"
          sx={{
            borderRadius: 18,
            border: "none",
            position: "relative",
            background: matchesMobileResolution
              ? "linear-gradient(45deg, rgba(242, 251, 255, 0.1) 0%, #F2F0EB 100%)"
              : "linear-gradient(0deg, rgba(242, 251, 255, 0.1) -60%, #F2F0EB 100%)",
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...register("city", { required: true })}
              inputRef={searchInput}
              label="City"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
          renderOption={(props, option) => {
            return (
              <li
                {...props}
                onClick={() => onSelectedCityHandler(option)}
              >{`${option.name}`}</li>
            );
          }}
          onInputChange={handleSubmit(onInputChangeHandlerDebounce)}
          clearIcon={
            <CloseIcon
              sx={{
                cursor: "pointer",
                color: theme.palette.primary.main,
              }}
              onClick={onCloseHandler}
            />
          }
        />
        <Typography
          variant="caption"
          display="block"
          sx={{
            textAlign: "center",
            height: 2,
            marginTop: 1,
            color: matchesMobileResolution
              ? theme.palette.error.light
              : theme.palette.error.main,
          }}
        >
          {errors?.city?.message}
        </Typography>
      </FormControl>
      {showPopup ? (
        <Dialog
          open={showPopup}
          TransitionComponent={Transition}
          keepMounted
          onClose={onClosePopupHandle}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{`We are sincerely sorry`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              It looks like something went wrong when processing your request.
              Our specialists are working on it so be sure to try your request
              again in 5 minutes.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClosePopupHandle}>OK</Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
}