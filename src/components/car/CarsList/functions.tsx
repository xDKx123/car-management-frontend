import { CellContext, createColumnHelper, HeaderContext } from "@tanstack/react-table";
import { Car } from "../../../models/car";
import TableCell from "../../common/TableCell/TableCell";
import TableHeader from "../../common/TableHeader/TableHeader";

interface CarTableMode {
    id: string;
    carModelBrand: string;
    brand: string;
    model: string;
    registrationPlate: string;
    description: string;
    fuel: string;
    bodyType: string;
}

const getCarsTableData = (cars: Car[]): CarTableMode[] => {
    if (!cars) {
        return []
    }

    console.log('cars', cars)

    return cars.map((car: Car) => {
        return {
            ...car,
            id: car.id,
            carModelBrand: car.model.brand?.name + ' ' + car.model.name,
            brand: car.model.brand?.name ?? '',
            model: car.model.name,
            registrationPlate: car.registrationPlate,
            description: car.description,
            fuel: car.fuel,
            bodyType: car.bodyType
        }
    })
}


const columnHelper = createColumnHelper<CarTableMode>()

const getColumns = () => {
    const columns = [
        columnHelper.accessor('registrationPlate', {
            header: (headerContext: HeaderContext<CarTableMode, any>) => <TableHeader header={headerContext}
                label={'registrationPlate'}
            />,
            cell: (cellContext: CellContext<CarTableMode, any>) => <TableCell cell={cellContext} />
        }),
        columnHelper.accessor('carModelBrand', {
            header: (headerContext: HeaderContext<CarTableMode, any>) => <TableHeader header={headerContext}
                label={'brand'}
            />,
            cell: (cellContext: CellContext<CarTableMode, any>) => <TableCell cell={cellContext} />
        }),
        columnHelper.accessor('registrationPlate', {
            header: (headerContext: HeaderContext<CarTableMode, any>) => <TableHeader header={headerContext}
                label={'registrationPlate'}
            />,
            cell: (cellContext: CellContext<CarTableMode, any>) => <TableCell cell={cellContext} />
        }),
        columnHelper.accessor('fuel', {
            header: (headerContext: HeaderContext<CarTableMode, any>) => <TableHeader header={headerContext}
                label={'fuel'}
            />,
            cell: (cellContext: CellContext<CarTableMode, any>) => <TableCell cell={cellContext} />
        }),
        columnHelper.accessor('bodyType', {
            header: (headerContext: HeaderContext<CarTableMode, any>) => <TableHeader header={headerContext}
                label={'bodyType'}
            />,
            cell: (cellContext: CellContext<CarTableMode, any>) => <TableCell cell={cellContext} />
        })
    ]

    return columns
}

export {
    getCarsTableData,
    getColumns
}