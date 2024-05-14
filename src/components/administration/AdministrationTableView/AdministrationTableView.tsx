import { Button } from "@mui/material";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdministrationTable from "../AdministrationTable/AdministrationTable";
import "./AdministrationTableView.css";

interface AdministrationTableViewProps {}

type Params = {
  tableId?: string;
};

const AdministrationTableView: FC<AdministrationTableViewProps> = () => {
  const params = useParams<Params>();
  const navigate = useNavigate();

  if (!params || !params?.tableId) {
    return <div>No name found in params</div>;
  }

  const addButtonClickHandler = (name: string | undefined) => {
    if (!name) {
      return;
    }

    navigate(`/administration/${name.toLowerCase()}/new`);
  };

  return (
    <div className="administration-table-view">
      <h1>AdministrationTableView</h1>
      <Button
        onClick={() => {
          addButtonClickHandler(params.tableId);
        }}
      >
        {"Add " + params.tableId + " item"}
      </Button>
      {params.tableId && <AdministrationTable tableName={params.tableId} />}
    </div>
  );
};

export default AdministrationTableView;
