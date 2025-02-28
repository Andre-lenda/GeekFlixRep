import { useContext } from "react";
import { UserContext } from "../Functions/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => 
{
    const { token } = useContext(UserContext);

    return token ? children : <Navigate to="/"/>;
};

export default ProtectedRoute;