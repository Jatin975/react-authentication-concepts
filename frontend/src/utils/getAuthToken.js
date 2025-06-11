import { redirect } from "react-router-dom";

export const getTokenDuration = () => {
  const expiredDate = localStorage.getItem("expiredDate");
  const storedExpiredDate = new Date(expiredDate);
  const todayDate = new Date();
  const expiredDuration = storedExpiredDate.getTime() - todayDate.getTime();
  return expiredDuration;
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
};

export const checkAuthRoute = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/auth?mode=login");
  }

  return null;
};
