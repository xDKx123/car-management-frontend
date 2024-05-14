import { MenuItem, MenuList, useTheme } from "@mui/material";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Menu.css";

interface MenuProps {}

interface MenuItem {
  id: string;
  name: string;
  url: string;
}

const getMenuItems = (): MenuItem[] => {
  const menuItems: MenuItem[] = [
    {
      id: "home",
      name: "Home",
      url: "/home",
    },
    {
      id: "constracts",
      name: "Contracts",
      url: "/contracts",
    },
    {
      id: "customers",
      name: "Customers",
      url: "/customers",
    },
    {
      id: "travelOrders",
      name: "Travel Orders",
      url: "/travelOrders",
    },
    {
      id: "administration",
      name: "Administration",
      url: "/administration",
    },
  ];
  return menuItems;
};

const Menu: FC<MenuProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const onClick = (url: string): void => {
    if (location.pathname.startsWith(url)) {
      return;
    }
    navigate(url);
  };

  return (
    <MenuList className={"flex items-start"}>
      {getMenuItems().map((menuItem: MenuItem) => {
        return (
          <MenuItem
            key={menuItem.id}
            onClick={() => onClick(menuItem.url)}
            className={"menu-item"}
            style={{
              textDecoration: location.pathname.startsWith(menuItem.url)
                ? "underline"
                : "none",
              color: theme.palette.text.primary,
            }}
          >
            {menuItem.name}
          </MenuItem>
        );
      })}
    </MenuList>
  );
};

export default Menu;
