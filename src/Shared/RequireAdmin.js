import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebase.init";
import useAdmin from "../Hooks/useAdmin";
import Spinner from "./Spinner";


function RequireAdmin({ children }) {
    const [user, loading] = useAuthState(auth);
    const [admin, aLoading] = useAdmin(user?.email);
    const location = useLocation();
    if (loading || aLoading) {
        return <Spinner></Spinner>
    }
    if (admin === false) {
        return <Navigate to='/' state={{ from: location }} replace></Navigate>
    }

    return children;
}

export default RequireAdmin;
