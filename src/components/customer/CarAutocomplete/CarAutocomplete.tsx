import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Car } from "../../../models/car";
import { useCars } from "../../../providers/CarsProvider";
import { CarRepository } from "../../../repositories/car";
import "./CarAutocomplete.css";
import { carId } from "../../../models/id";

interface CustomAutocompleteProps {
  selectedCar: carId;
  setSelectedCar: (value: carId) => void;
}

const CarAutocomplete: FC<CustomAutocompleteProps> = (
  props: CustomAutocompleteProps,
) => {
  const carsContext = useCars();

  //const [options, setOptions] = useState<any>([])
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | undefined>(
    props.selectedCar
      ? carsContext.state.cars.find((car: Car) => car.id === props.selectedCar)
      : undefined,
  );
  const [inputValue, setInputValue] = React.useState("");
  //const [defaultValue, setDefaultValue] = useState<Car | undefined>(undefined)

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setSelectedCar(
        carsContext.state.cars.find((car: Car) => car.id === props.selectedCar),
      );
    };

    if (props.selectedCar) {
      fetchData();
    }
  }, [props.selectedCar, carsContext.state.cars]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      CarRepository.loadCars().then((value: Car[] | undefined) => {
        if (!value) {
          return;
        }
        carsContext.dispatch({
          type: "SET_CARS",
          data: {
            cars: value,
          },
        });
      });
    };

    if (carsContext.state.cars.length === 0) {
      fetchData();
    }
  }, []);

  const getOptionLabel = (option: Car): string => {
    return (
      option.registrationPlate +
      " - " +
      option.model.brand?.name +
      " " +
      option.model.name
    );
  };

  const groupBy = (option: Car): string => {
    return option.model.brand?.name ?? "";
  };

  const isOptionEqualToValue = (option: Car, value: Car): boolean => {
    return option.id === value.id;
  };

  const onChange = (event: any, value: Car | null): void => {
    if (value) {
      setSelectedCar(value);
      props.setSelectedCar(value.id);
    }
  };

  return (
    <Autocomplete
      options={carsContext.state.cars}
      open={open}
      //defaultValue={defaultValue}
      onChange={onChange}
      isOptionEqualToValue={isOptionEqualToValue}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      groupBy={groupBy}
      getOptionLabel={getOptionLabel}
      value={selectedCar}
      noOptionsText={t("noData")}
      loadingText={t("loading")}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          margin={"normal"}
          fullWidth={true}
          label={t("car")}
        />
      )}
    />
  );
};
export default CarAutocomplete;
