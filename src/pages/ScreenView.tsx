import { Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { selectWeatherImage } from "../helpers";
import { ScreenViewProps } from "../types";

export default function ScreenView({ cityWeather }: ScreenViewProps) {
  const theme = useTheme();

  return (
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
      <Typography
        variant="h6"
        paragraph
        mb={0}
        sx={{ height: "15%" }}
        data-testid="curDate"
      >
        {cityWeather?.date}
      </Typography>
      <Typography
        variant="h3"
        component="h3"
        sx={{ height: "15%", marginBottom: 1 }}
      >
        {cityWeather?.city}
      </Typography>
      <Typography
        variant="h3"
        paragraph
        mb={0}
        sx={{ height: "15%", marginBottom: 1 }}
        data-testid="curTemp"
      >
        {`${cityWeather?.temp} °C`}
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
        data-testid="curDesc"
      >
        {cityWeather?.weatherDescription}
      </Typography>
      <Typography
        variant="h4"
        paragraph
        mb={0}
        sx={{ height: "15%" }}
        data-testid="curHumid"
      >
        Humidity: {cityWeather?.humidity}%
      </Typography>
      <Typography variant="h4" paragraph mb={0} sx={{ height: "15%" }}>
        Wind speed: {cityWeather?.windSpeed} m/sec
      </Typography>
      <img
        src={selectWeatherImage(cityWeather?.weatherDescription)}
        alt={`${cityWeather?.weatherDescription} weather`}
        loading="lazy"
        style={{
          position: "absolute",
          top: "3%",
          right: "30%",
          width: "25%",
        }}
      />
    </Stack>
  );
}
