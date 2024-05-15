import {
  Box,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  Row,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import "./TableControlledPagination.css";
import { useTranslation } from "react-i18next";

interface TableControlledPaginationProps<T, C> {
  data: T[];
  columns: ColumnDef<T, any>[];
  onContextMenu?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    row: Row<RowData>
  ) => void;
  boxStyle?: React.CSSProperties;
  setPagination:
  | Dispatch<SetStateAction<PaginationState>>
  | OnChangeFn<PaginationState>;
  pagination: PaginationState;
  dataCount: number;
  doubleClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    row: Row<RowData>
  ) => void;
}

const TableControlledPagination = <T, C>(
  props: TableControlledPaginationProps<T, C>
) => {
  const [height, setHeight] = useState<number>(200);

  const { t } = useTranslation();

  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const tablePaginationRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    rowCount: props.dataCount,
    state: {
      pagination: props.pagination,
    },
    onPaginationChange: props.setPagination,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    debugAll: process.env.NODE_ENV === "development",
    debugTable: process.env.NODE_ENV === "development",
    debugCells: process.env.NODE_ENV === "development",
    debugRows: process.env.NODE_ENV === "development",
    debugHeaders: process.env.NODE_ENV === "development",
    debugColumns: process.env.NODE_ENV === "development",
  });

  const handleResize = () => {
    //const tablePagination = document.getElementById('table-pagination')
    //const tableContainer = document.getElementById('table-container')

    if (
      tablePaginationRef.current &&
      tableContainerRef.current &&
      boxRef.current
    ) {
      let tmpHeight = boxRef.current.offsetHeight;

      tmpHeight -= tablePaginationRef.current.offsetHeight;

      setHeight(tmpHeight);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", () => handleResize());

    return () => {
      window.removeEventListener("resize", () => handleResize());
    };
  }, [
    tableContainerRef,
    tableContainerRef.current,
    tablePaginationRef,
    tablePaginationRef.current,
    boxRef,
    boxRef.current,
  ]);

  const { pageSize, pageIndex } = table.getState().pagination;

  const onTableRowContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    row: Row<T>
  ): void => {
    if (props.onContextMenu) {
      event.preventDefault();
      props.onContextMenu(event, row);
    }
  };

  const onTableRowDoubleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    row: Row<T>
  ): void => {
    if (props.doubleClick) {
      event.preventDefault();
      props.doubleClick(event, row);
    }
  };

  return (
    <Box
      ref={boxRef}
      sx={{
        width: "100%",
        height: "100%",
      }}
      style={props.boxStyle}
    >
      <TableContainer
        ref={tableContainerRef}
        className={"table-container"}
        style={{
          maxHeight: "100%",
          height: height,
          width: "100%",
        }}
      >
        <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{}}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        width: header.getSize() + "px !important",
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  onContextMenu={(
                    event: React.MouseEvent<HTMLDivElement, MouseEvent>
                  ) => onTableRowContextMenu(event, row)}
                  onDoubleClick={(
                    event: React.MouseEvent<HTMLDivElement, MouseEvent>
                  ) => onTableRowDoubleClick(event, row)}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        ref={tablePaginationRef}
        rowsPerPageOptions={[
          5,
          10,
          25,
          {
            label: "All",
            value: props.data.length,
          },
        ]}
        component="div"
        count={props.dataCount}
        rowsPerPage={pageSize}
        page={pageIndex}
        slotProps={{
          select: {
            inputProps: { "aria-label": t('rowsPerPage') },
            native: true,
          },
        }}
        labelRowsPerPage={t('rowsPerPage')}
        labelDisplayedRows={({ from, to, count }) => {
          return `${from}-${to} ${t("of")} ${count !== -1 ? count : `more than ${to}`}`;
        }}
        onPageChange={(_, page) => {
          table.setPageIndex(page);
        }}
        onRowsPerPageChange={(e) => {
          const size = e.target.value ? Number(e.target.value) : 10;
          table.setPageSize(size);
        }}
        ActionsComponent={TablePaginationActions}
      />
      {/*<pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>*/}
    </Box>
  );
};

export default TableControlledPagination;
