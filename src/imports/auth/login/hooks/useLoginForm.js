"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuthStore from "../../store/authStore";
import api from "../../api/api";

const useLoginForm = () => {
  const { users, setUser } = useAuthStore();
  const { loginUser } = api();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const emailInvalid = !emailPattern.test(email);
    const passwordInvalid = password.length < 8;

    setEmailError(emailInvalid);
    setPasswordError(passwordInvalid);

    if (emailInvalid) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    if (passwordInvalid) {
      setErrorMessage("Please enter password of 8+ characters.");
      return;
    }
    // const foundUser = users.find(
    //   (user) => user.email === email && user.password === password,
    // );

    // if (!foundUser) {
    //   setErrorMessage("Invalid email or password");
    //   return;
    // }

    // const currentUser = { name: foundUser.name, email: foundUser.email };
    // setUser(currentUser);
    // setErrorMessage("");
    // router.push("/onboarding/about-you");

    try {
      const logUser = { email, password };
      const result = await loginUser(logUser);
      setUser(result.data);
      setErrorMessage("");
      router.push("/onboarding/about-you");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    errorMessage,
    handleLogin,
  };
};

export default useLoginForm;
