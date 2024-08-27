import React, { FC, useEffect, useState } from "react";
import "./EmployeeAutocomplete.css";
import { employeeId } from "../../../models/id";
import { Employee } from "../../../models/employee";
import { useEmployee } from "../../../providers/EmployeeProvider";
import { EmployeeRepository } from "../../../repositories/employee.repository";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface EmployeeAutocompleteProps {
  selectedEmployee: employeeId;
  setSelectedEmployee: (value: employeeId) => void;
}

const EmployeeAutocomplete: FC<EmployeeAutocompleteProps> = (
  props: EmployeeAutocompleteProps,
) => {
  const employeeContext = useEmployee();
  //const [options, setOptions] = useState<any>([])
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >(
    props.selectedEmployee
      ? employeeContext.state.employees.find(
          (employee: Employee) => employee.id === props.selectedEmployee,
        )
      : undefined,
  );
  const [inputValue, setInputValue] = React.useState("");
  //const [defaultValue, setDefaultValue] = useState<Car | undefined>(undefined)}

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setSelectedEmployee(
        employeeContext.state.employees.find(
          (employee: Employee) => employee.id === props.selectedEmployee,
        ),
      );
    };

    if (props.selectedEmployee) {
      fetchData();
    }
  }, [props.selectedEmployee, employeeContext.state.employees]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      EmployeeRepository.load().then((value: Employee[] | undefined) => {
        if (!value) {
          return;
        }
        employeeContext.dispatch({
          type: "SET_EMPLOYEES",
          data: {
            employees: value,
          },
        });
      });
    };

    if (employeeContext.state.employees.length === 0) {
      fetchData();
    }
  }, []);

  const onChange = (event: any, value: Employee | null) => {
    if (value) {
      console.log("onChangeEmployee" + value);
      setSelectedEmployee(value);
      props.setSelectedEmployee(value.id);
    }
  };

  const isOptionEqualToValue = (option: Employee, value: Employee) => {
    return option.id === value.id;
  };

  const groupBy = (option: Employee): string => {
    if (option?.name.length > 0) {
      return option?.name[0].toUpperCase();
    }
    return "";
  };

  const getOptionLabel = (option: Employee) => {
    return option.name + " " + option.surname;
  };
  return (
    <Autocomplete
      options={employeeContext.state.employees}
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
      value={selectedEmployee}
      noOptionsText={t("noData")}
      loadingText={t("loading")}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          margin={"normal"}
          fullWidth={true}
          label={t("employee")}
        />
      )}
    />
  );
};

export default EmployeeAutocomplete;
