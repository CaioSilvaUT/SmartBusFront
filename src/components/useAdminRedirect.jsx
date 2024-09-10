// src/hooks/useAdminRedirect.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useAdminRedirect = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.data.is_adm !== 1) {
      navigate("/home");
    }
  }, [userInfo, navigate]);

  return null; // Não precisa retornar nada
};

export default useAdminRedirect;
