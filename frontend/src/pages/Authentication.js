import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function AuthAction({ request, params }) {
  const formData = await request.formData();
  const requestURL = new URL(request.url).searchParams;
  const mode = requestURL.get("mode") || "login";

  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (mode !== "login" && mode !== "signup") {
    throw new Response("Invalid mode", { status: 422 });
  }

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: request.method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw new Response("Failed to login/signup the user", { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem("token", token);

  let expiredDate = new Date();
  expiredDate.setHours(expiredDate.getHours() + 1);
  localStorage.setItem("expiredDate", expiredDate.toISOString());

  return redirect("/");
}
