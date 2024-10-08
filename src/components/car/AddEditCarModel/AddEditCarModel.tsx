import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarModel } from "../../../models/carModel";
import { carBrandId } from "../../../models/id";
import { useSnackbar } from "../../../providers/SnackbarProvider";
import { CarModelRepository } from "../../../repositories/carModel";
import StandardDialogActions from "../../common/StandardDialogActions/StandardDialogActions";
import CarBrandsAutocomplete from "../CarBrandsAutocomplete/CarBrandsAutocomplete";
import "./AddEditCarModel.css";

interface AddEditCarModelProps { }

type Params = {
  id?: string;
};

const AddEditCarModel: FC<AddEditCarModelProps> = () => {
  const snackbarContext = useSnackbar();
  const navigate = useNavigate();

  const params = useParams<Params>();

  const [name, setName] = useState<string>("");
  const [brand, setBrand] = useState<carBrandId>("");

  const handleClose = (): void => {
    navigate("..");
  };

  const handleCarBrandChange = (carBrandId: carBrandId) => {
    setBrand(carBrandId);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    const fetchData = async (id: string): Promise<void> => {
      CarModelRepository.loadCarModel(id).then((data: CarModel | undefined) => {
        if (!data) {
          snackbarContext.dispatch({
            type: "ERROR",
            data: {
              content: "Error loading car model",
            },
          });
          return;
        }

        setName(data.name);
        setBrand(data.brand.id);
      });
    };

    if (params.id) {
      fetchData(params.id);
    }
  }, []);

  const handleSave = (): void => {
    CarModelRepository.addCarModel(name, brand).then((data: CarModel | undefined) => {
      if (!data) {
        snackbarContext.dispatch({
          type: "ERROR",
          data: {
            content: "errorSavingCarModel",
          },
        });
        return;
      }

      snackbarContext.dispatch({
        type: "OK",
        data: {
          content: "carModelCreated",
        },
      });

      navigate("..");
    })
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>{params.id ? "Edit" : "Add"} car model</DialogTitle>
      <DialogContent>
        <CarBrandsAutocomplete
          handleChange={handleCarBrandChange}
          value={brand}
        />
        <TextField
          label="Name"
          value={name}
          onChange={handleNameChange}
          fullWidth={true}
          margin={"dense"}
        />
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
  );
};

export default AddEditCarModel;
