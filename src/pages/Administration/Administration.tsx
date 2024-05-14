import { FC } from "react";
import { Outlet } from "react-router-dom";
import AdministrationMenu from "../../components/administration/AdministrationMenu/AdministrationMenu";

interface AdministrationProps {}

const Administration: FC<AdministrationProps> = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "auto",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "15%",
        }}
      >
        <AdministrationMenu />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "85%",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};
export default Administration;
