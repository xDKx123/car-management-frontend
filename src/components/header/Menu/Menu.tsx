import { MenuItem, MenuList, useTheme } from "@mui/material";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Menu.css";
import { useTranslation } from "react-i18next";

interface MenuProps { }

interface MenuItem {
  id: string;
  name: string;
  url: string;
}

const getMenuItems = (): MenuItem[] => {
  const menuItems: MenuItem[] = [
    {
      id: "home",
      name: "home",
      url: "/home",
    },
    {
      id: "constracts",
      name: "contracts",
      url: "/contracts",
    },
    {
      id: "customers",
      name: "customers",
      url: "/customers",
    },
    {
      id: "travelOrders",
      name: "travelOrders",
      url: "/travelOrders",
    },
    {
      id: "administration",
      name: "administration",
      url: "/administration",
    },
  ];
  return menuItems;
};

const Menu: FC<MenuProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const { t } = useTranslation();

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
            {
              t(menuItem.name)
            }
          </MenuItem>
        );
      })}
    </MenuList>
  );
};

export default Menu;
