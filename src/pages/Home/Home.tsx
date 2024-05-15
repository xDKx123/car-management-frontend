import { Add } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarsList from "../../components/car/CarsList/CarsList";
import ContractsLeavingToday from "../../components/contracts/ContractsLeavingToday/ContractsLeavingToday";
import ContractsReturningToday from "../../components/contracts/ContractsReturningToday/ContractsReturningToday";
import Header from "../../components/header/Header/Header";
import { useCars } from "../../providers/CarsProvider";
import { CarRepository } from "../../repositories/car";
import "./Home.css";
import { useTranslation } from "react-i18next";

interface HomeProps {}

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
  const navigate = useNavigate();

  const {t } = useTranslation();

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
        console.log(error);
      });
  }, []);

  const handleAddCar = (): void => {
    navigate("car/new");
  };

  return (
    <Box className={"flex w-full h-full flex-col"}
    >
      <Header />
      <Box id={"home-content"} className={"homeContent"}>
        <Box className={"carListView"}>
          <IconButton id={"add-car"} onClick={handleAddCar}>
            <Add />
            {
              t("addCar")
            }
          </IconButton>
          <CarsList />
        </Box>
        <Box className={"contracts"}>
          <Box className={"contractsLeavingToday"}>
            <ContractsLeavingToday />
          </Box>
          <Box className={"contractsReturningToday"}>
            <ContractsReturningToday />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
