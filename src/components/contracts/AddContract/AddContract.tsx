import { Add } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Contract } from "../../../models/contract";
import { Customer } from "../../../models/customer";
import { useSnackbar } from "../../../providers/SnackbarProvider";
import { ContractRepository } from "../../../repositories/contract";
import AddEditCar from "../../car/AddEditCar/AddEditCar";
import CheckboxWithLabel from "../../common/CheckboxWithLabel/CheckboxWithLabel";
import StandardDialogActions from "../../common/StandardDialogActions/StandardDialogActions";
import AddEditCustomer from "../../customer/AddEditCustomer/AddEditCustomer";
import CarAutocomplete from "../../customer/CarAutocomplete/CarAutocomplete";
import CustomerAutocomplete from "../../customer/CustomerAutocomplete/CustomerAutocomplete";
import "./AddContract.css";
import NumberInput from "../../common/NumberInput/NumberInput";
import { RoofStoragePriceHistory } from "../../../models/roofStoragePriceHistory";
import { GpsPriceHistory } from "../../../models/gpsPriceHistory";
import { ChildSeatPriceHistory } from "../../../models/childSeatPriceHistory";
import { PriceHistoryRepository } from "../../../repositories/priceHistory.repository";
import { CarPriceList } from "../../../models/carPriceList";
import { carId } from "../../../models/id";

interface AddContractProps {}

function TextInput(props: {
  handleChange: (value: string) => void;
  label: string;
  value: string;
  required: boolean;
}) {
  return null;
}

const AddContract: FC<AddContractProps> = () => {
  const snackbarContext = useSnackbar();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  const contractId = queryParameters.get("id");
  const carId = queryParameters.get("carId");

  const { t } = useTranslation();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [description, setDescription] = useState("");
  const [car, setCar] = useState<carId>(carId ?? "");
  const [carPrice, setCarPrice] = useState<CarPriceList | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
  const [leavingDate, setLeavingDate] = useState<Dayjs | null>(null);
  const [gps, setGps] = useState<{
    selected: boolean;
    price: GpsPriceHistory | undefined;
  }>({ selected: false, price: undefined });
  const [winterChains, setWinterChains] = useState<boolean>(false);
  const [childSeat, setChildSeat] = useState<{
    selected: boolean;
    price: ChildSeatPriceHistory | undefined;
  }>({ selected: false, price: undefined });
  const [additionalDriver, setAdditionalDriver] = useState<Customer | null>(
    null,
  );
  const [carRoofBox, setCarRoofBox] = useState<{
    selected: boolean;
    price: RoofStoragePriceHistory | undefined;
  }>({ selected: false, price: undefined });
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");

  const [showAddEditCustomer, setShowAddEditCustomer] = useState(false);
  const [showAddEditCar, setShowAddEditCar] = useState(false);

  useEffect(() => {
    const getContract = (contractIdParam: string) => {
      ContractRepository.getContract(contractIdParam)
        .then((value: Contract | undefined) => {
          if (!value) {
            snackbarContext.dispatch({
              type: "ERROR",
              data: {
                content: "noContractData",
              },
            });
            return;
          }
          console.log(value);
        })
        .catch((error: any) => {
          snackbarContext.dispatch({
            type: "ERROR",
            data: {
              content: "errorFetchingContractData",
            },
          });
        });
    };

    if (carId) {
      console.log("carId", carId);
      setCar(carId);
    }
    if (contractId) {
      getContract(contractId);
    }
  }, []);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      PriceHistoryRepository.loadCarPrice(car).then(
        (value: CarPriceList | undefined) => {
          if (!value) {
            snackbarContext.dispatch({
              type: "ERROR",
              data: {
                content: "noCarData",
              },
            });
            return;
          }
          setCarPrice(value);
        },
      );
    };

    if (car && car.length > 0) {
      loadData();
    }
  }, [car, setCar]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      PriceHistoryRepository.getGpsLatestPrice().then(
        (value: GpsPriceHistory | undefined) => {
          if (!value) {
            setGps((prevState) => {
              return {
                ...prevState,
                price: undefined,
              };
            });
          } else {
            setGps((prevState) => {
              return {
                ...prevState,
                price: value,
              };
            });
          }
        },
      );
    };

    if (gps.selected) {
      fetchData();
    }
  }, [gps.selected]);

  useEffect(() => {}, [winterChains, setWinterChains]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      PriceHistoryRepository.getChildSeatLatestPrice().then(
        (value: ChildSeatPriceHistory | undefined) => {
          if (!value) {
            setChildSeat((prevState) => {
              return {
                ...prevState,
                price: undefined,
              };
            });
          } else {
            setChildSeat((prevState) => {
              return {
                ...prevState,
                price: value,
              };
            });
          }
        },
      );
    };

    if (childSeat.selected) {
      fetchData();
    }
  }, [childSeat.selected]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      PriceHistoryRepository.getRoofStorageLatestPrice().then(
        (value: RoofStoragePriceHistory | undefined) => {
          if (!value) {
            setCarRoofBox((prevState) => {
              return {
                ...prevState,
                price: undefined,
              };
            });
          } else {
            setCarRoofBox((prevState) => {
              return {
                ...prevState,
                price: value,
              };
            });
          }
        },
      );
    };

    if (carRoofBox.selected) {
      fetchData();
    }
  }, [carRoofBox.selected]);

  const handleClose = () => {
    navigate("..");
  };

  const getDialogTitle = () => {
    if (contractId) {
      return "editContract";
    }
    return "addContract";
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const onCarChange = (value: string): void => {
    setCar(value);
  };

  const onReturnDateChange = (date: Dayjs | null) => {
    setReturnDate(date);
  };

  const onLeavingDateChange = (date: Dayjs | null) => {
    setLeavingDate(date);
  };

  const onGpsChange = (value: boolean) => {
    setGps((prevState) => {
      return {
        ...prevState,
        selected: value,
      };
    });
  };

  const onWinterChainsChange = (value: boolean) => {
    setWinterChains(value);
  };

  const onChildSeatChange = (value: boolean) => {
    setChildSeat((prevState) => {
      return {
        ...prevState,
        selected: value,
      };
    });
  };

  const onAdditionalDriverChange = (value: Customer | null) => {
    setAdditionalDriver(value);
  };

  const onCarRoofBoxChange = (value: boolean) => {
    setCarRoofBox((prevState) => {
      return {
        ...prevState,
        selected: value,
      };
    });
  };

  const onDiscountChange = (value: string) => {
    setDiscount(value);
  };

  const onDiscountCodeChange = (value: string) => {
    setDiscountCode(value);
  };

  const handleSave = () => {
    if (!leavingDate) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "leavingDateRequired",
        },
      });
      return;
    }

    if (!returnDate) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "returnDateRequired",
        },
      });
      return;
    }

    if (!customer) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "customerRequired",
        },
      });
      return;
    }

    const contract: any = {
      name: "test",
      id: contractId ?? "",
      carId: car,
      customerId: customer.id,
      leavingDate: leavingDate.toDate(),
      returnDate: returnDate.toDate(),
      gps: gps?.price?.id,
      winterChains: winterChains,
      childSeat: childSeat?.price?.id,
      additionalDriver: additionalDriver?.id,
      carRoofBox: carRoofBox?.price?.id,
      discount: discount,
      discountCode: discountCode,
      amount: calculateAmount(),
    };

    ContractRepository.addContract(contract)
      .then((value: Contract | undefined) => {
        if (!value) {
          snackbarContext.dispatch({
            type: "ERROR",
            data: {
              content: "errorAddingContract",
            },
          });
          return;
        }
        snackbarContext.dispatch({
          type: "OK",
          data: {
            content: "contractAdded",
          },
        });
        handleClose();
      })
      .catch((error: any) => {
        snackbarContext.dispatch({
          type: "ERROR",
          data: {
            content: "errorAddingContract",
          },
        });
      });
  };

  const setSelectedCustomer = (value: Customer): void => {
    console.log("setSelectedCustomer", value);
    setCustomer(value);
  };

  const handleAddCustomer = (): void => {
    setShowAddEditCustomer(true);
  };

  const handleAddCar = (): void => {
    setShowAddEditCar(true);
  };

  const handleAddEditCustomerClose = (): void => {
    setShowAddEditCustomer(false);
  };

  const handleAddEditCarClose = (): void => {
    setShowAddEditCar(false);
  };

  const returnNumberOfDays = (): number => {
    if (!leavingDate || !returnDate) {
      return 1;
    }

    return returnDate.diff(leavingDate, "days");
  };

  const calculateAmount = (): number => {
    let amount = 0;

    if (carPrice) {
      amount += carPrice.amount * returnNumberOfDays();
    }

    if (gps.selected && gps.price) {
      amount += gps.price.amount;
    }
    if (winterChains) {
      amount += 10;
    }
    if (childSeat.selected && childSeat.price) {
      amount += childSeat.price.amount;
    }
    if (carRoofBox.selected && carRoofBox.price) {
      amount += carRoofBox.price.amount;
    }

    if (discount.length > 0) {
      const discountedPrice: number = amount * (1 - Number(discount) / 100);
      amount = Math.round(discountedPrice * 100) / 100;

      console.log(amount);
      return amount;
    }
    return amount;
  };

  return (
    <>
      {showAddEditCustomer && (
        <AddEditCustomer handleClose={handleAddEditCustomerClose} />
      )}
      {showAddEditCar && <AddEditCar handleClose={handleAddEditCarClose} />}
      <Dialog
        open={true}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
        scroll={"paper"}
      >
        <DialogTitle>{t(getDialogTitle())}</DialogTitle>
        <DialogContent>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <CustomerAutocomplete
              selectedCustomer={customer}
              setSelectedCustomer={setSelectedCustomer}
            />
            <IconButton onClick={handleAddCustomer}>
              <Add />
            </IconButton>
          </Box>

          <Box className={"flex flex-row"}>
            <CarAutocomplete selectedCar={car} setSelectedCar={onCarChange} />
            <IconButton onClick={handleAddCar}>
              <Add />
            </IconButton>
          </Box>

          <Box className={"flex flex-row"}>
            <FormControl fullWidth={true} margin={"normal"}>
              <DateTimePicker
                className={"!w-full !mr-2"}
                label={t("leavingDate")}
                onChange={onLeavingDateChange}
                value={leavingDate}
              />
            </FormControl>
            <FormControl fullWidth={true} margin={"normal"}>
              <DateTimePicker
                className={"!w-full !mr-2"}
                label={t("returnDate")}
                onChange={onReturnDateChange}
                value={returnDate}
              />
            </FormControl>
          </Box>
          <Box className={"flex flex-row"}>
            <CheckboxWithLabel
              label={"gps"}
              onChange={onGpsChange}
              value={gps.selected}
            />
          </Box>
          <Box className={"flex flex-row"}>
            <CheckboxWithLabel
              label={"winterChains"}
              onChange={onWinterChainsChange}
              value={winterChains}
            />
          </Box>
          <Box className={"flex flex-row"}>
            <CheckboxWithLabel
              label={"childSeat"}
              onChange={onChildSeatChange}
              value={childSeat.selected}
            />
          </Box>
          <Box className={"flex flex-row"}>
            <CustomerAutocomplete
              selectedCustomer={additionalDriver}
              setSelectedCustomer={onAdditionalDriverChange}
              label={"additionalDriver"}
            />
          </Box>
          <Box className={"flex flex-row"}>
            <CheckboxWithLabel
              label={"carRoofBox"}
              onChange={onCarRoofBoxChange}
              value={carRoofBox.selected}
            />
          </Box>
          <Box className={"flex flex-row"}>
            <TextInput
              label={"discountCode"}
              required={true}
              value={discountCode}
              handleChange={onDiscountCodeChange}
            />
          </Box>
          <Box className={"flex flex-row"}>
            <NumberInput
              label={"discount"}
              required={false}
              value={discount}
              handleChange={onDiscountChange}
            />
          </Box>

          <Box className={"flex flex-row"}>
            <p>
              {t("amount")}: {calculateAmount()}€
            </p>
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

export default AddContract;
