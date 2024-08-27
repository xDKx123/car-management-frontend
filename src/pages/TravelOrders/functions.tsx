import { TableData } from "../Contracts/functions";
import { TravelOrder } from "../../models/travelOrder";
import { travelOrderId } from "../../models/id";
import {
  CellContext,
  ColumnDef,
  createColumnHelper,
  HeaderContext,
} from "@tanstack/react-table";
import TableHeader from "../../components/common/TableHeader/TableHeader";
import TableCell from "../../components/common/TableCell/TableCell";
import TableCellDate from "../../components/common/TableCellDate/TableCellDate";

interface TravelOrderTable {
  id: travelOrderId;
  carVin: string;
  carRegistrationPlate: string;
  carFuel: string;
  employeeNameSurname: string;
  employeeEmail: string;
  employeePhoneNumber: string;
  latStart: number;
  lngStart: number;
  latEnd: number;
  lngEnd: number;
  mileage: number;
  createdAt: Date;
}

const columnHelper = createColumnHelper<TravelOrderTable>();
const getColumns = (): ColumnDef<TravelOrderTable>[] => {
  const columns = [
    columnHelper.accessor("id", {
      header: (
        headerContext: HeaderContext<TravelOrderTable, travelOrderId | any>,
      ) => <TableHeader header={headerContext} label={"id"} />,
      cell: (
        cellContext: CellContext<TravelOrderTable, travelOrderId | any>,
      ) => <TableCell cell={cellContext} />,
    }),
    columnHelper.accessor("carVin", {
      header: (
        headerContext: HeaderContext<TravelOrderTable, string | any>,
      ) => <TableHeader header={headerContext} label={"carVin"} />,
      cell: (cellContext: CellContext<TravelOrderTable, string | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("carRegistrationPlate", {
      header: (
        headerContext: HeaderContext<TravelOrderTable, string | any>,
      ) => (
        <TableHeader header={headerContext} label={"carRegistrationPlate"} />
      ),
      cell: (cellContext: CellContext<TravelOrderTable, string | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("carFuel", {
      header: (
        headerContext: HeaderContext<TravelOrderTable, string | any>,
      ) => <TableHeader header={headerContext} label={"carFuel"} />,
      cell: (cellContext: CellContext<TravelOrderTable, string | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("employeeNameSurname", {
      header: (
        headerContext: HeaderContext<TravelOrderTable, string | any>,
      ) => <TableHeader header={headerContext} label={"employeeNameSurname"} />,
      cell: (cellContext: CellContext<TravelOrderTable, string | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("employeeEmail", {
      header: (
        headerContext: HeaderContext<TravelOrderTable, string | any>,
      ) => <TableHeader header={headerContext} label={"employeeEmail"} />,
      cell: (cellContext: CellContext<TravelOrderTable, string | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("employeePhoneNumber", {
      header: (
        headerContext: HeaderContext<TravelOrderTable, string | any>,
      ) => <TableHeader header={headerContext} label={"employeePhoneNumber"} />,
      cell: (cellContext: CellContext<TravelOrderTable, string | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("latStart", {
      header: (
        headerContext: HeaderContext<TravelOrderTable, number | any>,
      ) => <TableHeader header={headerContext} label={"latStart"} />,
      cell: (cellContext: CellContext<TravelOrderTable, number | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("lngStart", {
      header: (
        headerContext: HeaderContext<TravelOrderTable, number | any>,
      ) => <TableHeader header={headerContext} label={"lngStart"} />,
      cell: (cellContext: CellContext<TravelOrderTable, number | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("latEnd", {
      header: (
        headerContext: HeaderContext<TravelOrderTable, number | any>,
      ) => <TableHeader header={headerContext} label={"latEnd"} />,
      cell: (cellContext: CellContext<TravelOrderTable, number | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("lngEnd", {
      header: (
        headerContext: HeaderContext<TravelOrderTable, number | any>,
      ) => <TableHeader header={headerContext} label={"lngEnd"} />,
      cell: (cellContext: CellContext<TravelOrderTable, number | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("mileage", {
      header: (
        headerContext: HeaderContext<TravelOrderTable, number | any>,
      ) => <TableHeader header={headerContext} label={"mileage"} />,
      cell: (cellContext: CellContext<TravelOrderTable, number | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("createdAt", {
      header: (headerContext: HeaderContext<TravelOrderTable, Date | any>) => (
        <TableHeader header={headerContext} label={"createdAt"} />
      ),
      cell: (cellContext: CellContext<TravelOrderTable, Date | any>) => (
        <TableCellDate cell={cellContext} />
      ),
    }),
  ];

  return columns;
};

const generateData = (data: TravelOrder[]): TravelOrderTable[] => {
  return data.map((travelOrder: TravelOrder) => {
    return {
      id: travelOrder.id,
      carVin: travelOrder.car.vin,
      carRegistrationPlate: travelOrder.car.registrationPlate,
      carFuel: travelOrder.car.fuel,
      employeeNameSurname: `${travelOrder.employee.name} ${travelOrder.employee.surname}`,
      employeeEmail: travelOrder.employee.email,
      employeePhoneNumber: travelOrder.employee.phoneNumber,
      latStart: travelOrder.latStart,
      lngStart: travelOrder.lngStart,
      latEnd: travelOrder.latEnd,
      lngEnd: travelOrder.lngEnd,
      mileage: travelOrder.mileage,
      createdAt: travelOrder.createdAt,
    };
  });
};

const getData = (data: TravelOrder[], allData: number): TableData => {
  if (!data || data.length === 0) {
    return {
      data: [],
      allData: 0,
    };
  }

  return {
    data: generateData(data),
    allData: allData,
  };
};

export { getColumns, getData };