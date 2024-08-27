import {
  CellContext,
  ColumnDef,
  createColumnHelper,
  HeaderContext,
} from "@tanstack/react-table";
import TableCell from "../../components/common/TableCell/TableCell";
import TableCellDate from "../../components/common/TableCellDate/TableCellDate";
import TableHeader from "../../components/common/TableHeader/TableHeader";
import { Contract } from "../../models/contract";
import { contractId } from "../../models/id";

interface ContractTable {
  id: contractId;
  name: string;
  customerNameSurname: string;
  carBrand: string;
  carModel: string;
  carRegistrationPlate: string;
  returnDate: Date;
  leavingDate: Date;
}

const columnHelper = createColumnHelper<ContractTable>();
const getColumns = (): ColumnDef<ContractTable>[] => {
  const columns = [
    columnHelper.accessor("id", {
      header: (
        headerContext: HeaderContext<ContractTable, contractId | any>,
      ) => <TableHeader header={headerContext} label={"id"} />,
      cell: (cellContext: CellContext<ContractTable, contractId | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("name", {
      header: (headerContext: HeaderContext<ContractTable, string | any>) => (
        <TableHeader header={headerContext} label={"name"} />
      ),
      cell: (cellContext: CellContext<ContractTable, string | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("carBrand", {
      header: (headerContext: HeaderContext<ContractTable, string | any>) => (
        <TableHeader header={headerContext} label={"carBrand"} />
      ),
      cell: (cellContext: CellContext<ContractTable, string | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("carModel", {
      header: (headerContext: HeaderContext<ContractTable, string | any>) => (
        <TableHeader header={headerContext} label={"carModel"} />
      ),
      cell: (cellContext: CellContext<ContractTable, string | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("carRegistrationPlate", {
      header: (headerContext: HeaderContext<ContractTable, string | any>) => (
        <TableHeader header={headerContext} label={"carRegistrationPlate"} />
      ),
      cell: (cellContext: CellContext<ContractTable, string | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("customerNameSurname", {
      header: (headerContext: HeaderContext<ContractTable, string | any>) => (
        <TableHeader header={headerContext} label={"customerNameSurname"} />
      ),
      cell: (cellContext: CellContext<ContractTable, string | any>) => (
        <TableCell cell={cellContext} />
      ),
    }),
    columnHelper.accessor("returnDate", {
      header: (headerContext: HeaderContext<ContractTable, Date | any>) => (
        <TableHeader header={headerContext} label={"returnDate"} />
      ),
      cell: (cellContext: CellContext<ContractTable, Date | any>) => (
        <TableCellDate cell={cellContext} />
      ),
    }),
    columnHelper.accessor("leavingDate", {
      header: (headerContext: HeaderContext<ContractTable, Date | any>) => (
        <TableHeader header={headerContext} label={"leavingDate"} />
      ),
      cell: (cellContext: CellContext<ContractTable, Date | any>) => (
        <TableCellDate cell={cellContext} />
      ),
    }),
  ];

  return columns;
};

type TableData = {
  data: any;
  allData: number;
};

const generateData = (data: Contract[]): ContractTable[] => {
  return data.map((contract: Contract) => {
    return {
      id: contract.id,
      name: contract.customer.name,
      customerNameSurname:
        contract.customer.name + " " + contract.customer.surname,
      carBrand: contract.car.model?.brand.name ?? "",
      carModel: contract.car.model?.name ?? "",
      carRegistrationPlate: contract.car.registrationPlate,
      leavingDate: contract.leavingDate,
      returnDate: contract.returnDate,
    } as ContractTable;
  });
};

const getData = (data: Contract[], allData: number): TableData => {
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

export type { ContractTable, TableData };
