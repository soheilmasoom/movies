import { Checkbox } from "@mui/material";
import { useContext } from "react";
import { DefaultTheme } from "../context/Theme";
import { BsSunFill } from "react-icons/bs";

const Navbar: React.FC = () => {
  const theme = useContext(DefaultTheme);

  // Mui Props
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <nav>
      <Checkbox
        {...label}
        checked={JSON.parse(localStorage.getItem("theme") as string)?.darkMode}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          theme.checkMode(event.target.checked);
          localStorage.setItem(
            "theme",
            JSON.stringify({ darkMode: event.target.checked })
          );
        }}
        icon={<BsSunFill style={{color: '#121212', transition: 'all 0.3s ease'}} />}
        checkedIcon={<BsSunFill style={{color: '#fff', transition: 'all 0.3s ease'}} />}
        sx={{ marginX: 0.5 }}
      />
    </nav>
  );
};

export default Navbar;
