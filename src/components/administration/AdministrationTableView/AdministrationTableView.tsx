import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import AdministrationTable from "../AdministrationTable/AdministrationTable";
import "./AdministrationTableView.css";

interface AdministrationTableViewProps { }

type Params = {
  tableId?: string;
};

const AdministrationTableView: FC<AdministrationTableViewProps> = () => {
  const params = useParams<Params>();
  const navigate = useNavigate();

  const { t } = useTranslation();

  if (!params || !params?.tableId) {
    return <Box>No name found in params</Box>;
  }

  const addButtonClickHandler = (name: string | undefined) => {
    if (!name) {
      return;
    }

    navigate(`/administration/${name.toLowerCase()}/new`);
  };

  const addButtonText = (name: string) => {
    //params.tableId is like users, we want to return addUser
    return `add${name.charAt(0).toUpperCase() + name.slice(1, -1)}`;
  }

  return (
    <Box className="administration-table-view">
      <Typography variant={'h3'}>AdministrationTableView</Typography>
      <Button
        onClick={() => {
          addButtonClickHandler(params.tableId);
        }}
      >
        {t(addButtonText(params.tableId as string))}
      </Button>
      {params.tableId && <AdministrationTable tableName={params.tableId} />}
    </Box>
  );
};

export default AdministrationTableView;
