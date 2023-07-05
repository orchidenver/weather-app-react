import { Box, Typography, useMediaQuery } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";

const primary = purple[500];

export interface IAppProps {}

export default function Page404(props: IAppProps) {
  const theme = useTheme();

  const matchesMobileResolution: boolean = useMediaQuery<string | undefined>(
    theme.breakpoints.up("sm")
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Typography
        variant="h1"
        style={{ color: "white" }}
        data-testid="error-page-heading"
      >
        404
      </Typography>
      <Typography
        variant={matchesMobileResolution ? "h2" : "h3"}
        style={{ color: "white" }}
        data-testid="error-page-text"
      >
        Page not found
      </Typography>
    </Box>
  );
}
