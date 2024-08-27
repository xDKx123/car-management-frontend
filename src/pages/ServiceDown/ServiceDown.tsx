import { Box, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UtilityRepository } from "../../repositories/utility";
import "./ServiceDown.css";

interface ServiceDownProps { }

const ServiceDown: FC<ServiceDownProps> = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchStatus = async (): Promise<void> => {
      UtilityRepository.ping()
        .then(() => {
          navigate("/home", { replace: true });
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    };

    fetchStatus();
  });

  if (loading) {
    return <Box />;
  }

  return (
    <Box>
      <Typography variant={'h1'}>Service is down</Typography>
    </Box>
  );
};

export default ServiceDown;
