import { Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import sunnyMedium from "../assets/sunny-medium.svg";

export interface IAppProps {}

export default function MobileView(props: IAppProps) {
  const theme = useTheme();

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      color={theme.palette.secondary.main}
      sx={{
        width: "100%",
        height: "50%",
        marginLeft: { lg: 30, xl: 20, md: 20, sm: 10 },
        marginBottom: 2,
      }}
    >
      <Typography variant="h6" paragraph mb={0} sx={{ height: "15%" }}>
        Monday, 10/04/2023
      </Typography>
      <Typography variant="h3" component="h3" sx={{ height: "15%" }}>
        Kyiv, Ukraine
      </Typography>
      <Typography
        variant="h3"
        paragraph
        mb={3}
        sx={{ height: "15%", fontSize: "4rem !important" }}
      >
        +7
      </Typography>
      <img
        src={sunnyMedium}
        alt="sunny weather"
        loading="lazy"
        style={{
          width: "25%",
          margin: "12px 0 12px 0",
        }}
      />
      <Typography
        variant="h3"
        paragraph
        sx={{
          height: "15%",
        }}
      >
        Sunny
      </Typography>
      <Typography
        variant="h4"
        paragraph
        mb={0}
        sx={{ height: "15%", fontSize: "0.75rem !important" }}
      >
        Humidity: 77%
      </Typography>
      <Typography
        variant="h4"
        paragraph
        mb={0}
        sx={{ height: "15%", fontSize: "0.75rem !important" }}
      >
        Wind speed: 5 m/sec
      </Typography>
    </Stack>
  );
}
