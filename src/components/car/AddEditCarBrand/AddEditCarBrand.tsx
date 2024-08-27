import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarBrand } from "../../../models/carBrand";
import { useSnackbar } from "../../../providers/SnackbarProvider";
import { CarRepository } from "../../../repositories/car";
import "./AddEditCarBrand.css";
import CarBrandRepository from "../../../repositories/carBrand";
import StandardDialogActions from "../../common/StandardDialogActions/StandardDialogActions";

interface AddEditCarBrandProps {}

type Params = {
  id?: string;
};

const AddEditCarBrand: FC<AddEditCarBrandProps> = () => {
  const snackbarContext = useSnackbar();
  const navigate = useNavigate();
  const params = useParams<Params>();

  const [name, setName] = useState<string>("");

  const handleClose = () => {
    navigate("..");
  };

  useEffect(() => {
    const fetchData = async (id: string): Promise<void> => {
      CarBrandRepository.loadCarBrand(id).then((data: CarBrand | undefined) => {
        if (!data) {
          snackbarContext.dispatch({
            type: "ERROR",
            data: {
              content: "Error loading car brand",
            },
          });
          return;
        }

        setName(data.name);
      });
    };

    if (params.id) {
      fetchData(params.id);
    }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSave = (): void => {
    if (params.id) {
      CarBrandRepository.updateCarBrand(params.id, name).then(
        (data: CarBrand | undefined) => {
          if (!data) {
            snackbarContext.dispatch({
              type: "ERROR",
              data: {
                content: "Error updating car brand",
              },
            });
            return;
          }

          handleClose();
        }
      );
    } else {
      CarBrandRepository.addCarBrand(name).then((data: CarBrand | undefined) => {
        if (!data) {
          snackbarContext.dispatch({
            type: "ERROR",
            data: {
              content: "errorCreatingCarBrand",
            },
          });
          return;
        }

        snackbarContext.dispatch({
          type: "OK",
          data: {
            content: "carBrandCreated",
          },
        });

        handleClose();
      });
    }
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>{params.id ? "Edit" : "New"} Car Brand</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={handleNameChange}
          margin="dense"
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

export default AddEditCarBrand;
