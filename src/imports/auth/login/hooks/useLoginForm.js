"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuthStore from "../../store/authStore";

const useLoginForm = () => {
  const { users, setUser } = useAuthStore();

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
    const foundUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!foundUser) {
      setErrorMessage("Invalid email or password");
      return;
    }

    const currentUser = { name: foundUser.name, email: foundUser.email };
    setUser(currentUser);
    setErrorMessage("");
    router.push("/onboarding/about-you");
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
