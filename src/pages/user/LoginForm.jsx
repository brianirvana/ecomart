/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../atoms/Button";
import Input from "../molecules/Input";
import PasswordInput from "../molecules/PasswordInput";
import { createResource } from "../utilities/createResource";

function LoginForm({postUrl, navigateUrl}) {
  const [isDisable, setIsDisable] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setIsDisable(true);
    try {
      const response = await createResource(`${postUrl}/login`, data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        navigate(`${navigateUrl}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      const errorMessage = error.response?.data?.message || "An error occurred during login.";
      toast.error(errorMessage);
    } finally {
      setIsDisable(false);
      reset();
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-4 mb-2"
      >
        <Input
          type="email"
          name="email"
          placeholder="enter your email"
          register={register}
          errors={errors}
          required={{
            value: true,
            message: "Email is required"
          }}
          pattern={{
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          }}
        />

        <PasswordInput
          name="password"
          register={register}
          errors={errors}
          required={{
            value: true,
            message: "Password is required"
          }}
          minLength={{
            value: 6,
            message: "Password must be at least 6 characters"
          }}
        />

        <Button
          type="submit"
          variant="Tertiary"
          label={isDisable ? "processing..." : "Login"}
          disabled={!!isDisable}
          className={`${isDisable && "cursor-not-allowed"}`}
        />
      </form>
    </div>
  );
}

export default LoginForm;
