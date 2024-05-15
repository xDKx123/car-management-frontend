import { AccountBox } from "@mui/icons-material";
import { FC, useState } from "react";
import UserPopover from "../UserPopover/UserPopover";
import "./UserLogo.css";
import { Avatar } from "@mui/material";

interface UserLogoProps {}

const UserLogo: FC<UserLogoProps> = () => {
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar>
        <AccountBox onClick={handleClick} />
      </Avatar>
      {anchorEl && <UserPopover anchorEl={anchorEl} onClose={handleClose} />}
    </>
  );
};

export default UserLogo;
