import { Navigate, Outlet } from "react-router-dom";
import { Context } from "@/main"
import { useContext } from "react";
import { observer } from "mobx-react-lite";

interface CheckRoleProps {
  roles: string[]
}

const CheckRole = ({ roles = [] }: CheckRoleProps) => {
  const { store } = useContext(Context)
  return !roles.length || roles.includes(store.user.role)
    ? <Outlet />
    : <Navigate to="/" replace />;
};

export default observer(CheckRole)