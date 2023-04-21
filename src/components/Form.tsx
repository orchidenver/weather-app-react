import { useState, useMemo, useRef, MutableRefObject } from "react";
import {
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  useMediaQuery,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface IAppProps {}
type CityType = {
  name: string;
  state: string;
  lat: number;
  lon: number;
};
type LocalNamesType = string;
type LocalNamesObjectType = { [T in LocalNamesType]: string };
type CityTypeExtended = {
  country: string;
  local_names: LocalNamesObjectType;
} & CityType;
type FormData = yup.InferType<typeof schema>;

const schema = yup.object({
  city: yup
    .string()
    .required(" ")
    .test("regex test", `Numbers can't be in a city name`, (val) => {
      const regExp = /^[,a-zA-Z\s]+$/;
      return regExp.test(val as string);
    }),
});

export default function Form(props: IAppProps) {
  const [selectedCity, setSelectedCity] = useState<CityType | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [cities, setCities] = useState<CityType[]>([
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
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const debounce = () => {
    let timeoutID: ReturnType<typeof setTimeout>;

    return (value: FormData) => {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        console.log(value);
        onHandleChange(value);
      }, 700);
    };
  };

  const onHandleChange: SubmitHandler<FormData> = (value) => {
    if (!value?.city) {
      setShowOptions(false);
      return;
    }

    if (value?.city && typeof value?.city !== "string") {
      setSelectedCity(null);
      setShowOptions(false);
      return;
    }

    if (value?.city && value?.city?.trim() !== "") {
      console.log("call");
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${value?.city?.trim()}&limit=5&appid=${
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
          setCities(cities);
          setShowOptions(true);
          clearErrors("city");
        })
        .catch((err) => console.error(err));
    }
  };

  function onHandleClose() {
    setSelectedCity(null);
    setShowOptions(false);
  }

  const optimizedDebounce = useMemo(() => debounce(), []);

  function handleFocus() {
    searchInput?.current.blur();
  }

  return (
    <FormControl
      variant="outlined"
      sx={{
        width: { lg: "40%", xl: "40%", md: "50%", sm: "50%", xs: "80%" },
      }}
    >
      {/* <InputLabel
        htmlFor="outlined-adornment-search"
        sx={{
          top: -7,
          color: matchesMobileResolution
            ? theme.palette.primary.main
            : theme.palette.secondary.main,
        }}
      >
        Search
      </InputLabel> */}
      <Autocomplete
        open={showOptions}
        filterOptions={(x) => x}
        forcePopupIcon={false}
        loading={false}
        disablePortal={false}
        getOptionLabel={(option) => option.name}
        id="combo-box-demo"
        options={cities}
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
              onClick={() => {
                setSelectedCity(option);
                setShowOptions(false);
                setCities([
                  {
                    name: "",
                    state: "",
                    lat: 1,
                    lon: 1,
                  },
                ]);
                reset({
                  city: "",
                });
                clearErrors("city");
                handleFocus();
              }}
            >{`${option.name}`}</li>
          );
        }}
        onInputChange={handleSubmit(optimizedDebounce)}
        clearIcon={
          <CloseIcon
            sx={{
              cursor: "pointer",
              color: theme.palette.primary.main,
            }}
            onClick={onHandleClose}
          />
        }
      />
      {/* <OutlinedInput
        defaultValue={city}
        {...register("city", { required: true })}
        id="outlined-adornment-search"
        size="small"
        sx={{
          borderRadius: 18,
          border: "none",
          background: matchesMobileResolution
            ? "linear-gradient(45deg, rgba(242, 251, 255, 0.1) 0%, #F2F0EB 100%)"
            : "linear-gradient(0deg, rgba(242, 251, 255, 0.1) -60%, #F2F0EB 100%)",
          "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: "none",
            },
        }}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon
              sx={{
                cursor: "pointer",
                color: theme.palette.primary.main,
              }}
              onClick={handleSubmit(handleFormSubmit)}
            />
          </InputAdornment>
        }
        label="Search"
        onChange={optimizedDebounce}
      /> */}
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
  );
}
