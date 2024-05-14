import { Box, Toolbar, useTheme } from "@mui/material";
import { FC } from "react";
import UserLogo from "../../user/UserLogo/UserLogo";
import Menu from "../Menu/Menu";
import "./Header.css";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const theme = useTheme();
  return (
    <div
      id={"header"}
      className={"header"}
      style={{
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box
        style={{
          width: "100%",
        }}
      >
        <Toolbar
          disableGutters={true}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Menu />
          <div></div>
          <UserLogo />
        </Toolbar>
      </Box>
    </div>
  );
};

export default Header;
