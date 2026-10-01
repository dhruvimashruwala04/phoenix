"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleLogin = () => {
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

    setErrorMessage("");
    router.push("/workspace");
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
