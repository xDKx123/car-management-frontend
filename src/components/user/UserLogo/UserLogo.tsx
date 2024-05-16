import { AccountBox } from "@mui/icons-material";
import { Avatar, useTheme } from "@mui/material";
import { FC, useState } from "react";
import UserPopover from "../UserPopover/UserPopover";
import "./UserLogo.css";

interface UserLogoProps { }

const UserLogo: FC<UserLogoProps> = () => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar
        className={'cursor-pointer'}
        sx={{
          backgroundColor: "transparent",
          //border: `1px solid black`,
        }}
      >
        <AccountBox onClick={handleClick} />
      </Avatar>
      {anchorEl && <UserPopover anchorEl={anchorEl} onClose={handleClose} />}
    </>
  );
};

export default UserLogo;
