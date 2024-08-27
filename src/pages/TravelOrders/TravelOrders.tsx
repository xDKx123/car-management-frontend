import { Add } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./TravelOrders.css";
import TableControlledPagination from "../../components/common/TableControlledPagination/TableControlledPagination";
import { PaginationState } from "@tanstack/react-table";
import { TravelOrder } from "../../models/travelOrder";
import { getColumns, getData } from "./functions";
import TravelOrderRepository from "../../repositories/travelOrder.repository";

interface TravelOrdersProps {}

interface TravelOrdersData {
  data: TravelOrder[];
  allData: number;
}

const TravelOrders: FC<TravelOrdersProps> = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const page = queryParameters.get("page");
  const rowsPerPage = queryParameters.get("rowsPerPage");

  const { t } = useTranslation();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page ? parseInt(page) : 0,
    pageSize: rowsPerPage ? parseInt(rowsPerPage) : 5,
  });

  const [travelOrders, setTravelOrders] = useState<TravelOrdersData>({
    data: [],
    allData: 0,
  });

  const tableData = useMemo(
    () => getData(travelOrders.data, travelOrders.allData),
    [travelOrders],
  );

  const columns = useMemo(() => getColumns(), []);

  const navigate = useNavigate();

  const newTravelOrderButtonClickHandler = () => {
    navigate("new");
  };

  useEffect(() => {
    const loadTravelOrders = async (): Promise<void> => {
      const travelOrders: TravelOrdersData | undefined =
        await TravelOrderRepository.load(
          pagination.pageIndex,
          pagination.pageSize,
        );

      if (!travelOrders) {
        return;
      }

      setTravelOrders(travelOrders);
    };

    loadTravelOrders();
  }, [pagination, setPagination]);

  return (
    <Box className={"flex w-full flex-grow flex-col"}>
      <Box id={"add-travel-order"}>
        <IconButton
          id={"add-contract"}
          onClick={newTravelOrderButtonClickHandler}
        >
          <Add />
          {t("addContract")}
        </IconButton>
      </Box>
      <TableControlledPagination
        data={tableData.data}
        columns={columns}
        setPagination={setPagination}
        pagination={pagination}
        dataCount={tableData.allData}
      />
    </Box>
  );
};

export default TravelOrders;
