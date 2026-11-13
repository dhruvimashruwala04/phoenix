"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuthStore from "../../store/authStore";
import api from "../../api/api";

const useSignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { setUser } = useAuthStore();
  const { createUser } = api();

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(false);
    setPasswordStrength(checkPasswordStrength(value));
  };

  const handleSignup = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nameInvalid = name === "";
    const emailInvalid = !emailPattern.test(email);
    const passwordInvalid = password.length < 8;

    setNameError(nameInvalid);
    setEmailError(emailInvalid);
    setPasswordError(passwordInvalid);

    if (nameInvalid) {
      setErrorMessage("Please enter name.");
      return;
    }

    if (emailInvalid) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    if (passwordInvalid) {
      setErrorMessage("Please enter password of 8+ characters.");
      return;
    }

    try {
      const newUser = { name, email, password };
      const result = await createUser(newUser);
      setUser(result.data);
      setErrorMessage("");
      router.push("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handlePasswordChange,
    passwordStrength,
    nameError,
    setNameError,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    errorMessage,
    handleSignup,
  };
};

export default useSignupForm;
