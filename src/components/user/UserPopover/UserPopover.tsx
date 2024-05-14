import { Logout, Settings } from "@mui/icons-material";
import { Box, Button, Popover } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../providers/UserProvider";
import "./UserPopover.css";

interface UserPopoverProps {
  anchorEl: SVGSVGElement | null;
  onClose: () => void;
}

const UserPopover: FC<UserPopoverProps> = (props: UserPopoverProps) => {
  return (
    <Popover
      open={Boolean(props.anchorEl)}
      anchorEl={props.anchorEl}
      onClose={props.onClose}
    >
      <div className="flex flex-col items-start">
        <SettingsActionButton />
        <LogOutActionButton />
      </div>
    </Popover>
  );
};

interface ActionButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon: React.ReactNode;
  label: string;
}

const ActionButton: FC<ActionButtonProps> = (props: ActionButtonProps) => {
  return (
    <Button onClick={props.onClick}>
      <Box className={"mr-1.5"}>{props.icon}</Box>
      {props.label}
    </Button>
  );
};

const SettingsActionButton: FC = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Settings clicked");
  };

  return (
    <ActionButton onClick={handleClick} icon={<Settings />} label="Settings" />
  );
};

const LogOutActionButton: FC = () => {
  const userContext = useUser();
  const navigate = useNavigate();

  const handleClick = () => {
    userContext.dispatch({ type: "REMOVE_USER" });
    navigate("/login");
  };

  return (
    <ActionButton onClick={handleClick} icon={<Logout />} label="LogOut" />
  );
};

export default UserPopover;
