import { useState, useMemo, useRef, MutableRefObject, forwardRef } from "react";
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
import { CityType, CityTypeExtended } from "../interfaces";
import * as yup from "yup";

interface IAppProps {}

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

export default function Form(props: IAppProps) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedCityByUser, setSelectedCityByUser] = useState<CityType | null>(
    null
  );
  const [showCitySelection, setShowCitySelection] = useState<boolean>(false);
  const [searchedCitySelection, setSearchedCitySelection] = useState<
    CityType[]
  >([
    {
      name: "",
      state: "",
      lat: 1,
      lon: 1,
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
      `http://api.openwdeathermapq.org/geo/1.0/direct?q=${value?.city?.trim()}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((response) => {
        const cities = response.map((city: CityTypeExtended): CityType => {
          const label = `${city?.name}, ${city?.country}, ${city?.state}`;
          return {
            name: label,
            state: city?.state,
            lat: city?.lat,
            lon: city?.lon,
          };
        });
        setSearchedCitySelection(cities);
        setShowCitySelection(true);
        clearErrors("city");
      })
      .catch((err) => {
        setShowPopup(true);
        console.error(err);
      });
  };

  function onCloseHandler() {
    setSelectedCityByUser(null);
    setShowCitySelection(false);
  }

  const onInputChangeHandlerDebounce = useMemo(() => debounce(), []);

  function onFocusHandler() {
    searchInput?.current.blur();
  }

  function onSelectedCityHandler(cityData: CityType) {
    setSelectedCityByUser(cityData);
    setShowCitySelection(false);
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
