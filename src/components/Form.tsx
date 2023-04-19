import {
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  useMediaQuery,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface IAppProps {}

const schema = yup
  .object({
    city: yup
      .string()
      .required("Looks like you forgot to type a city you are interested in")
      .test("regex test", `Numbers can't be in a city name`, (val) => {
        const regExp = /^[a-zA-Z\s]+$/;
        return regExp.test(val as string);
      })
      .matches(/^[a-zA-Z\s]+$/, `Numbers can't be in a city name`),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

type Mode = {
  onTouched: "onTouched";
};

export default function Form(props: IAppProps) {
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
  const handleFormSubmit: SubmitHandler<FormData | Mode> = (values) => {
    reset({
      city: "",
    });
    clearErrors();
  };

  return (
    <FormControl
      variant="outlined"
      sx={{
        width: { lg: "40%", xl: "40%", md: "50%", sm: "50%", xs: "80%" },
      }}
    >
      <InputLabel
        htmlFor="outlined-adornment-search"
        sx={{
          top: -7,
          color: matchesMobileResolution
            ? theme.palette.primary.main
            : theme.palette.secondary.main,
        }}
      >
        Search
      </InputLabel>
      <OutlinedInput
        defaultValue="Kyiv"
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
      />
      <Typography
        variant="caption"
        display="block"
        sx={{
          textAlign: "center",
          height: 2,
          marginTop: 1,
          color: matchesMobileResolution ? theme.palette.error.light : theme.palette.error.main,
        }}
      >
        {errors?.city && errors?.city?.message}
      </Typography>
    </FormControl>
  );
}
