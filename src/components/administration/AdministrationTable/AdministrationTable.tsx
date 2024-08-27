import {
  CellContext,
  HeaderContext,
  OnChangeFn,
  PaginationState,
  Row,
  RowData,
  Updater,
  createColumnHelper,
} from "@tanstack/react-table";
import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnackbar } from "../../../providers/SnackbarProvider";
import { AdministrationRepository } from "../../../repositories/administration";
import TableControlledPagination from "../../common/TableControlledPagination/TableControlledPagination";
import "./AdministrationTable.css";
import { Box } from "@mui/material";

interface AdministrationTableProps {
  tableName: string;
}

type TableData = {
  data: any;
  allData: number;
};

const generateData = (tableData: any[]) => {
  return tableData.map((data: any) => {
    delete data.__v;
    return {
      ...data,
    };
  });
};

const sortColumns = (columns: any[]) => {
  return columns.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
};

const columnHelper = createColumnHelper<any>();

const AdministrationTable: FC<AdministrationTableProps> = (
  props: AdministrationTableProps
) => {
  const snackbarContext = useSnackbar();
  const navigate = useNavigate();

  const [data, setData] = useState<TableData>({ data: [], allData: 0 });
  const [columns, setColumns] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const tableData = useMemo(() => generateData(data.data), [data.data]);

  const index: number = searchParams.get("index")
    ? parseInt(searchParams.get("index") as string)
    : 0;
  const rowsPerPage: number = searchParams.get("rowsPerPage")
    ? parseInt(searchParams.get("rowsPerPage") as string)
    : 10;

  if (!props.tableName) {
    return;
  }

  const mapColumns = (columns: any[]) => {
    const filteredColumns = columns.filter((column) => column.name !== "__v");

    return sortColumns(filteredColumns).map((column: any) => {
      return columnHelper.accessor(column.name, {
        header: (headerContext: HeaderContext<any, any>) => String(column.name),
        cell: (cellContext: CellContext<any, any>) => (
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
            }}
          >
            {cellContext.getValue()}
          </span>
        ),
        maxSize: 100,
        size: 100,
        enableResizing: true,
        minSize: 20,
      });
    });
  };

  useEffect(() => {
    const fetchColumns = async (): Promise<void> => {
      setLoading(true);
      AdministrationRepository.loadAdministrationTableColumns(props.tableName)
        .then((columns: string[]) => {
          setColumns(columns);
        })
        .catch((error: Error) => {
          console.log(error);
          setLoading(false);
        });
    };

    const fetchData = async (): Promise<void> => {
      setLoading(true);
      AdministrationRepository.loadAdministrationTableData(
        props.tableName,
        index,
        rowsPerPage
      )
        .then((data: any) => {
          setData({ data: data.tableData, allData: data.allData });
          setLoading(false);
        })
        .catch((error: Error) => {
          console.log(error);
          setLoading(false);
        });
    };

    fetchColumns();
    fetchData();
  }, [props.tableName]);

  const handlePaginationChange: OnChangeFn<PaginationState> = (
    updaterOrValue: Updater<PaginationState>
  ) => {
    if (typeof updaterOrValue === "function") {
      const Updater = updaterOrValue as (
        old: PaginationState
      ) => PaginationState;
      setSearchParams({
        index: String(
          Updater({ pageIndex: index, pageSize: rowsPerPage }).pageIndex
        ),
        rowsPerPage: String(
          Updater({ pageIndex: index, pageSize: rowsPerPage }).pageSize
        ),
      });
    } else {
      setSearchParams({
        index: String(updaterOrValue.pageIndex),
        rowsPerPage: String(updaterOrValue.pageSize),
      });
    }
  };

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    row: Row<RowData>
  ) => {
    //const rowId = row.original.id;
    console.log("Row context menu", row);
  };

  const handleRowDoubleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    row: Row<RowData>
  ) => {
    //const rowId = row.original.id;
    console.log("Row double click", row);
    navigate(`${(row.original as unknown as any)._id}`);
  };

  return (
    <Box className="AdministrationTable">
      {/*columns.map((column: any) => {
          return <div>{column.name} - {column.type}</div>
        })*/}
      <TableControlledPagination
        data={tableData}
        columns={mapColumns(columns)}
        setPagination={handlePaginationChange}
        pagination={{
          pageIndex: index,
          pageSize: rowsPerPage,
        }}
        dataCount={data.allData}
        doubleClick={handleRowDoubleClick}
      />
    </Box>
  );
};

export default AdministrationTable;
