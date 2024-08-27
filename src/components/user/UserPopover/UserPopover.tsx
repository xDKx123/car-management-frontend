import { Logout, Settings } from "@mui/icons-material";
import { Box, Button, Popover } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
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
      <Box className="flex flex-col items-start">
        <SettingsActionButton />
        <LogOutActionButton />
      </Box>
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
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/settings");
  };

  return (
    <ActionButton
      onClick={handleClick}
      icon={<Settings />}
      label={t('settings')}
    />
  );
};

const LogOutActionButton: FC = () => {
  const userContext = useUser();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleClick = () => {
    userContext.dispatch({ type: "REMOVE_USER" });
    navigate("/login");
  };

  return (
    <ActionButton onClick={handleClick} icon={<Logout />} label={t('logOut')} />
  );
};

export default UserPopover;
