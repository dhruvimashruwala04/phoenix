"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleResendLink = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const emailInvalid = !emailPattern.test(email);

    setEmailError(emailInvalid);

    if (emailInvalid) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    setErrorMessage("");
    setSuccess(true);
  };

  return {
    email,
    setEmail,
    emailError,
    setEmailError,
    handleResendLink,
    errorMessage,
    setErrorMessage,
    success,
  };
};

export default useForgotPasswordForm;
