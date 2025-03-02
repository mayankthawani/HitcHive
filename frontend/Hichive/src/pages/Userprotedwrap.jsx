import React, { useContext, useState, useEffect } from "react";
import { Userdatacontext } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectedWrap = ({ children }) => {
  const navigate = useNavigate();
  const { user, setuser } = useContext(Userdatacontext);
  const [token, setToken] = useState(localStorage.getItem("token")); // Track token in state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/user-login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setuser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token");
        setToken(null); // Update state when token is removed
        navigate("/user-login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, navigate, setuser]); // React will re-run when `token` changes

  // Listen for localStorage changes (handles logout from another tab too)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectedWrap;
