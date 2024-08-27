import { Box, MenuItem } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdministrationRepository } from "../../../repositories/administration";
import "./AdministrationMenu.css";

interface AdministrationMenuProps {}

interface MenuItem {
  name: string;
}

const AdministrationMenu: FC<AdministrationMenuProps> = () => {
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const loadMenuItems = async () => {
      AdministrationRepository.loadAdministrationMenu()
        .then((menuItems: string[]) => {
          if (!menuItems) {
            return;
          }

          setMenuItems(
            menuItems.map((menuItem: string) => {
              return {
                name: menuItem,
              };
            })
          );
        })
        .catch((error: any) => {
          console.error("Error loading administration menu items", error);
        });
    };

    loadMenuItems();
  }, []);

  const handleMenuItemClick = (menuItem: MenuItem) => {
    navigate(
      `/administration/${menuItem.name.toLowerCase()}?index=0&rowsPerPage=10`
    );
  };

  return (
    <Box className="administration-menu">
      {menuItems.map((menuItem: MenuItem, index: number) => {
        return (
          <MenuItem
            key={index}
            onClick={() => {
              handleMenuItemClick(menuItem);
            }}
          >
            {menuItem.name}
          </MenuItem>
        );
      })}
    </Box>
  );
};

export default AdministrationMenu;
