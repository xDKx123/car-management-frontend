import { lazy, useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
//import AddEditCar from "./components/car/AddEditCar/AddEditCar";
const AddEditCar = lazy(() => import("./components/car/AddEditCar/AddEditCar"));
//import AddEditCarBrand from "./components/car/AddEditCarBrand/AddEditCarBrand";
const AddEditCarBrand = lazy(
  () => import("./components/car/AddEditCarBrand/AddEditCarBrand")
);
//import AddEditCarModel from "./components/car/AddEditCarModel/AddEditCarModel";
const AddEditCarModel = lazy(
  () => import("./components/car/AddEditCarModel/AddEditCarModel")
);
//import AddContract from "./components/contracts/AddContract/AddContract";
const AddContract = lazy(
  () => import("./components/contracts/AddContract/AddContract")
);
//import AddEditCustomer from "./components/customer/AddEditCustomer/AddEditCustomer";
const AddEditCustomer = lazy(
  () => import("./components/customer/AddEditCustomer/AddEditCustomer")
);
//import Header from "./components/header/Header/Header";
const Header = lazy(() => import("./components/header/Header/Header"));
//import AddEditUser from "./components/user/AddEditUser/AddEditUser";
const AddUser = lazy(() => import("./components/user/AddUser/AddUser"));
//import ChangePassword from "./components/user/ChangePassword/ChangePassword";
const ChangePassword = lazy(
  () => import("./components/user/ChangePassword/ChangePassword")
);
//import EditUser from "./components/user/EditUser/EditUser";
const EditUser = lazy(() => import("./components/user/EditUser/EditUser"));

//import AdministrationTableView from "./components/administration/AdministrationTableView/AdministrationTableView";
const AdministrationTableView = lazy(
  () =>
    import(
      "./components/administration/AdministrationTableView/AdministrationTableView"
    )
);
//import Administration from "./pages/Administration/Administration";
const Administration = lazy(
  () => import("./pages/Administration/Administration")
);
//import Contracts from "./pages/Contracts/Contracts";
const Contracts = lazy(() => import("./pages/Contracts/Contracts"));
//import Customers from "./pages/Customers/Customers";
const Customers = lazy(() => import("./pages/Customers/Customers"));
//import Home from "./pages/Home/Home";
const Home = lazy(() => import("./pages/Home/Home"));
//import Login from "./pages/Login/Login";
const Login = lazy(() => import("./pages/Login/Login"));
//import Page404 from "./pages/Page404/Page404";
const Page404 = lazy(() => import("./pages/Page404/Page404"));
//import ServiceDown from "./pages/ServiceDown/ServiceDown";
const ServiceDown = lazy(() => import("./pages/ServiceDown/ServiceDown"));
//import TravelOrders from "./pages/TravelOrders/TravelOrders";
const TravelOrders = lazy(() => import("./pages/TravelOrders/TravelOrders"));
//import { UtilityRepository } from "./repositories/utility";
import { User } from "./models/user";
import { UserRepository } from "./repositories/user";
import { UtilityRepository } from "./repositories/utility";

function App() {
  //const userContext = useUser()
  const navigate = useNavigate();

  useEffect(() => {
    // check if there is a token in local storage, if so, go to homepage, else go to login page
    /*const token: string | null = localStorage.getItem('token')
         if (token) {
         navigate('/home', {replace: true})
         } else {
         navigate('/login', {replace: true})
         }*/

    const validateUser = async () => {
      UserRepository.getCurrentUser()
        .then((user: User) => {
          //Proceed to desired page
          if (user) {
            navigate(location.pathname, { replace: true });
          } else {
            //If user is not logged in, redirect to login page
            navigate("/login", { replace: true });
          }
        })
        .catch((error: Error) => {
          //If user is not logged in, redirect to login page
          navigate("/login", { replace: true });
        });
    };

    UtilityRepository.ping()
      .then((data: boolean | undefined) => {
        if (data) {
          console.log("Backend is running");
          validateUser();
        } else {
          console.log("Backend is not running");
          navigate("/serviceDown", { replace: true });
        }
      })
      .catch((error) => {
        console.log("Backend is not running");
        navigate("/serviceDown", { replace: true });
      });
  }, []);

  return (
    <Routes>
      <Route path={"/"} element={<Navigate to="/home" />} />
      <Route path={"/login"} element={<Login />} />
      <Route
        path={"/home"}
        element={
          <>
            <Home />
            <Outlet />
          </>
        }
      >
        <Route path={"contracts/new"} element={<AddContract />} />
        <Route path={"car/new"} element={<AddEditCar />} />
        <Route path={"car/:id"} element={<AddEditCar />} />
      </Route>

      <Route
        path={"/contracts"}
        element={
          <>
            <Header />
            <Contracts />
            <Outlet />
          </>
        }
      >
        <Route path={"contracts/new"} element={<AddContract />}></Route>
      </Route>
      <Route
        path={"/travelOrders"}
        element={
          <>
            <Header />
            <TravelOrders />
          </>
        }
      />
      <Route
        path={"/customers"}
        element={
          <>
            <Header />
            <Customers />
            <Outlet />
          </>
        }
      >
        <Route path={"customer/new"} element={<AddEditCustomer />} />
        <Route path={"customer/:id"} element={<AddEditCustomer />} />
      </Route>
      <Route
        path={"/administration"}
        element={
          <>
            <Header />
            <Administration />
          </>
        }
      >
        <Route
          path={":tableId"}
          element={
            <>
              <AdministrationTableView />
              <Outlet />
            </>
          }
        ></Route>
        <Route path={"cars/new"} element={<AddEditCar />} />
        <Route path={"cars/:id"} element={<AddEditCar />} />
        <Route path={"carBrands/new"} element={<AddEditCarBrand />} />
        <Route path={"carBrands/:id"} element={<AddEditCarBrand />} />
        <Route path={"carModels/new"} element={<AddEditCarModel />} />
        <Route path={"carModels/:id"} element={<AddEditCarModel />} />
        <Route path={"users/new"} element={<AddUser />} />
        <Route
          path={"users/:id"}
          element={
            <>
              <EditUser />
              <Outlet />
            </>
          }
        >
          <Route path={"changePassword"} element={<ChangePassword />} />
        </Route>
      </Route>
      <Route path={"/serviceDown"} element={<ServiceDown />} />
      <Route path={"*"} element={<Page404 />} />
    </Routes>
  );
}

export default App;
