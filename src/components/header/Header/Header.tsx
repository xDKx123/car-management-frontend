import { Box, Toolbar, useTheme } from "@mui/material";
import { FC } from "react";
import UserLogo from "../../user/UserLogo/UserLogo";
import Menu from "../Menu/Menu";
import "./Header.css";

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
  const theme = useTheme();
  return (
    <Toolbar
      disableGutters={true}
      style={{
        backgroundColor: theme.palette.primary.main,
      }}
      className="!flex !justify-between !w-full !px-1.5"
    >
      <Menu />
      <div></div>
      <UserLogo />
    </Toolbar>
  );
};

export default Header;
