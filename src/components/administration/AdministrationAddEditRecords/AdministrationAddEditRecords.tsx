import { Dialog, DialogTitle } from "@mui/material";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdministrationAddEditRecords.css";

interface AdministrationAddEditRecordsProps {}

const AdministrationAddEditRecords: FC<
  AdministrationAddEditRecordsProps
> = () => {
  const params = useParams();
  const navigate = useNavigate();

  const onClose = (): void => {
    navigate("..");
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{params.id ? "New" : "Edit"}</DialogTitle>
    </Dialog>
  );
};

export default AdministrationAddEditRecords;
