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
  Row,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useRef, useState } from "react";
import "./Table.css";

interface TableProps<T, C> {
  data: T[];
  columns: ColumnDef<T, any>[];
  onContextMenu?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    row: Row<RowData>
  ) => void;
  boxStyle?: React.CSSProperties;
}

const Table = <T, C>(props: TableProps<T, C>) => {
  const [height, setHeight] = useState<number>(200);

  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const tablePaginationRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
  ) => {
    if (props.onContextMenu) {
      event.preventDefault();
      props.onContextMenu(event, row);
    }
  };

  /*if (pageIndex === 0 && props.data.length === 0) {
        return (
            <p>
                No data
            </p>
        )
    }*/

  return (
    <Box
      ref={boxRef}
      sx={{
        width: "100%",
      }}
      style={props.boxStyle}
    >
      <TableContainer
        ref={tableContainerRef}
        className={"table-container"}
        style={{
          width: "100%",
        }}
      >
        <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell key={header.id} colSpan={header.colSpan}>
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
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        slotProps={{
          select: {
            inputProps: { "aria-label": "rows per page" },
            native: true,
          },
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

export default Table;
