import React, { useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import "./auth.css"; // Import the CSS file with modal styles
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root"); 

const LoginModal = ({ isOpen, onRequestClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isLoading, error } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (token) {
      onRequestClose();
      navigate("/home");
    }
  }, [token, navigate, onRequestClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="relative max-w-md mx-auto mt-10">
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times; {/* This is the close icon (×) */}
        </button>
        <h2 className="text-2xl font-bold mb-5">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && <span>{errors.email.message}</span>}

          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.password && <span>{errors.password.message}</span>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500">{error.detail}</p>}
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
