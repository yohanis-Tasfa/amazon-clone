import React, { useContext, useEffect } from "react";
import { DataContext } from "../../components/dataprovider/DataProvider";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, msg, redirect }) {
  const navigate = useNavigate();
  const [{ user }, dipatch] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, []);

  return children;
}

export default ProtectedRoute;
