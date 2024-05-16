import { Add } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CarsList from "../../components/car/CarsList/CarsList";
import ContractsLeavingToday from "../../components/contracts/ContractsLeavingToday/ContractsLeavingToday";
import ContractsReturningToday from "../../components/contracts/ContractsReturningToday/ContractsReturningToday";
import { useCars } from "../../providers/CarsProvider";
import { useSnackbar } from "../../providers/SnackbarProvider";
import { CarRepository } from "../../repositories/car";
import "./Home.css";

interface HomeProps { }

const fetchData = async (page: number, rowsPerPage: number): Promise<any> => {
  //backend.addCar()

  const response = await CarRepository.loadCars();

  if (response) {
    return response;
  }

  return [];
};

const Home: FC<HomeProps> = () => {
  const carsContext = useCars();
  const snackbarContext = useSnackbar();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const queryParameters = new URLSearchParams(window.location.search);
  const page = queryParameters.get("page");
  const rowsPerPage = queryParameters.get("rowsPerPage");

  useEffect(() => {
    fetchData(Number(page), Number(rowsPerPage))
      .then((response: any) => {
        carsContext.dispatch({
          type: "SET_CARS",
          data: {
            cars: response,
          },
        });
      })
      .catch((error: any) => {
        snackbarContext.dispatch({
          type: "SET_SNACKBAR_ERROR",
          data: {
            content: error,
          },

        });
      });
  }, []);

  const handleAddCar = (): void => {
    navigate("car/new");
  };

  return (
    <Box className={"flex w-full flex-grow flex-col"}>
      <Box id={"home-content"} className={"flex flex-row w-full home-content"}>
        <Box className={"flex overflow-x-visible flex-col car-list-view"}>
          <IconButton id={"add-car"} onClick={handleAddCar}>
            <Add />
            {
              t("addCar")
            }
          </IconButton>
          <CarsList />
        </Box>
        <Box className={"flex flex-col justify-center items-center contracts"}>
          <Box className={"flex w-full h-1/2"}>
            <ContractsLeavingToday />
          </Box>
          <Box className={"flex w-full h-1/2"}>
            <ContractsReturningToday />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
