import { Add } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarRepository } from "../../../repositories/car";
import AddEditCar from "../../car/AddEditCar/AddEditCar";
import CarAutocomplete from "../../customer/CarAutocomplete/CarAutocomplete";
import GoogleMapsView from "../../googleMaps/GoogleMapsView/GoogleMapsView";
import "./AddEditTravelOrder.css";
import { MarkerPosition } from "./types";
import EmployeeAutocomplete from "../../employee/EmployeeAutocomplete/EmployeeAutocomplete";
import { employeeId } from "../../../models/id";
import StandardDialogActions from "../../common/StandardDialogActions/StandardDialogActions";
import { useSnackbar } from "../../../providers/SnackbarProvider";
import TravelOrderRepository from "../../../repositories/travelOrder.repository";
import { roundToTwoDecimalPlaces } from "../../../utils/utils";

interface AddEditTravelOrderProps {}

const AddEditTravelOrder: FC<AddEditTravelOrderProps> = () => {
  const snackbarContext = useSnackbar();

  const [car, setCar] = useState<string>("");
  const [employee, setEmployee] = useState<employeeId>("");
  const [showAddEditCar, setShowAddEditCar] = useState(false);
  const [distance, setDistance] = useState<number>(0);
  const [markers, setMarkers] = useState<MarkerPosition[]>([]);
  const [calculatedDrivingPrice, setCalculatedDrivingPrice] =
    useState<number>(0);

  const navigate = useNavigate();

  const params = useParams<{
    id?: string;
  }>();

  const getDialogTitle = () => {
    if (params.id) {
      return "Edit travel order";
    } else {
      return "Add travel order";
    }
  };

  const onCarChange = (value: string): void => {
    setCar(value);
  };

  const handleAddCar = (): void => {
    setShowAddEditCar(true);
  };

  const handleAddEditCarClose = (): void => {
    setShowAddEditCar(false);
  };

  const handleClose = () => {
    navigate("..");
  };

  useEffect(() => {
    const fetchData = async (car: string, distance: number) => {
      const price: number | undefined =
        await CarRepository.calculateDrivingPrice(car, distance);
      return price;
    };

    if (car && distance) {
      fetchData(car, distance).then((price: number | undefined) => {
        if (!price) {
          return;
        }
        setCalculatedDrivingPrice(price);
      });
    }
  }, [distance, setDistance, car, setCar]);

  const handleSave = async (): Promise<void> => {
    if (!car) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "carNotSelected",
        },
      });
      return;
    }

    if (!employee) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "employeeNotSelected",
        },
      });
      return;
    }

    if (markers.length !== 2) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "startAndEndNotSet",
        },
      });
      return;
    }

    if (!distance) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "distanceNotSet",
        },
      });
      return;
    }

    if (!calculatedDrivingPrice) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "priceNotCalculated",
        },
      });
      return;
    }

    const data = {
      car: car,
      employee: employee,
      latStart: markers[0].lat,
      lngStart: markers[0].lng,
      latEnd: markers[1].lat,
      lngEnd: markers[1].lng,
      mileage: distance,
      priceOfRefuel: calculatedDrivingPrice,
    };

    const response = await TravelOrderRepository.add(data);

    if (response) {
      snackbarContext.dispatch({
        type: "OK",
        data: {
          content: "travelOrderAdded",
        },
      });
      handleClose();
      return;
    }

    snackbarContext.dispatch({
      type: "ERROR",
      data: {
        content: "travelOrderNotAdded",
      },
    });
  };

  const onEmployeeChange = (id: employeeId) => {
    console.log("setting employee", id);
    setEmployee(id);
  };

  return (
    <>
      {showAddEditCar && <AddEditCar handleClose={handleAddEditCarClose} />}
      <Dialog
        open={true}
        fullWidth={true}
        maxWidth={"lg"}
        onClose={handleClose}
      >
        <DialogTitle>{getDialogTitle()}</DialogTitle>
        <DialogContent>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box className={"flex flex-row"}>
              <CarAutocomplete selectedCar={car} setSelectedCar={onCarChange} />
              <IconButton onClick={handleAddCar}>
                <Add />
              </IconButton>
            </Box>
            <Box className={"flex flex-row"}>
              <EmployeeAutocomplete
                selectedEmployee={employee}
                setSelectedEmployee={onEmployeeChange}
              />
              <IconButton>
                <Add />
              </IconButton>
            </Box>
            <GoogleMapsView
              markers={markers}
              setMarkers={setMarkers}
              distance={distance}
              setDistance={setDistance}
            />
            <Box>
              <p>
                Distance:
                {distance}m
              </p>
            </Box>
            <Box>
              <p>
                Price:
                {roundToTwoDecimalPlaces(calculatedDrivingPrice)}€
              </p>
            </Box>
          </Box>
        </DialogContent>
        <StandardDialogActions
          primaryButtonProps={{
            label: "save",
            onClick: handleSave,
          }}
          secondaryButtonProps={{
            label: "cancel",
            onClick: handleClose,
          }}
        />
      </Dialog>
    </>
  );
};

export default AddEditTravelOrder;
