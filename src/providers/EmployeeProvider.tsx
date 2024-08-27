import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { Employee } from "../models/employee";

type EmployeeState = {
  employees: Employee[];
};

type EmployeeAction =
  | {
      type: "SET_EMPLOYEES";
      data: {
        employees: Employee[];
      };
    }
  | {
      type: "REMOVE_EMPLOYEES";
    };

type EmployeeProvider = {
  children: ReactNode;
};

const EmployeeContext = createContext<
  | {
      state: EmployeeState;
      dispatch: Dispatch<EmployeeAction>;
    }
  | undefined
>(undefined);

const employeeReducer = (
  state: EmployeeState,
  action: EmployeeAction,
): EmployeeState => {
  switch (action.type) {
    case "SET_EMPLOYEES":
      return {
        ...state,
        employees: action.data.employees,
      };
    case "REMOVE_EMPLOYEES":
      //remove localstorage token
      localStorage.removeItem("token");
      return {
        ...state,
        employees: [],
      };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

const initialState: EmployeeState = {
  employees: [],
};

const EmployeeProvider = ({ children }: EmployeeProvider) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  return (
    <EmployeeContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

function useEmployee() {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error("useEmployee must be used within a EmployeeProvider");
  }
  return context;
}

export { EmployeeProvider, useEmployee };