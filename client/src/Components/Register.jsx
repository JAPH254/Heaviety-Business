import React from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './auth.css';

Modal.setAppElement('#root');

const RegisterModal = ({ isOpen, onRequestClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    toast.success('User registered successfully. Please check your email to verify your account.');
    navigate('/');
    onRequestClose(); // Close modal after successful registration
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Register Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="relative w-full max-w-md mx-auto mt-10">
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times; {/* Close icon */}
        </button>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4">Register</h2>

          <input
            type="text"
            placeholder="First Name"
            {...register("first_name", { required: "First Name is required" })}
            className="w-full p-2 mb-2 border rounded"
          />
          {errors.first_name && (
            <p className="text-red-500">{errors.first_name.message}</p>
          )}

          <input
            type="text"
            placeholder="Last Name"
            {...register("last_name", { required: "Last Name is required" })}
            className="w-full p-2 mb-2 border rounded"
          />
          {errors.last_name && (
            <p className="text-red-500">{errors.last_name.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 mb-2 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone_number", {
              required: "Phone Number is required",
            })}
            className="w-full p-2 mb-2 border rounded"
          />
          {errors.phone_number && (
            <p className="text-red-500">{errors.phone_number.message}</p>
          )}

          <input
            type="text"
            placeholder="ID Number"
            {...register("id_number", { required: "ID Number is required" })}
            className="w-full p-2 mb-2 border rounded"
          />
          {errors.id_number && (
            <p className="text-red-500">{errors.id_number.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 mb-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("re_password", {
              required: "Confirm Password is required",
            })}
            className="w-full p-2 mb-2 border rounded"
          />
          {errors.re_password && (
            <p className="text-red-500">{errors.re_password.message}</p>
          )}

          {error && <p className="text-red-500 mb-2">{error.detail}</p>}

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default RegisterModal;
