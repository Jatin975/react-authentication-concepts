import { redirect } from "react-router-dom";

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const checkAuthRoute = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/auth?mode=login");
  }

  return null;
};
