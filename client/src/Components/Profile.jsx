// src/pages/Profile.js
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile,updateProfile } from '../features/auth/profileSlice';
const Profile = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector(state => state.profile);
  console.log(user);
  useEffect(() => {
    // Fetch the profile when the component mounts
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      // Set form values when the user data is available
      setValue('first_name', user.first_name);
      setValue('last_name', user.last_name);
      setValue('email', user.email);
      setValue('phone_number', user.phone_number);
      setValue('id_number', user.id_number);
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    dispatch(updateProfile(data));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error.detail}</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('first_name', { required: 'First Name is required' })}
          placeholder="First Name"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.first_name && <span className="text-red-500">{errors.first_name.message}</span>}

        <input
          {...register('last_name', { required: 'Last Name is required' })}
          placeholder="Last Name"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.last_name && <span className="text-red-500">{errors.last_name.message}</span>}

        <input
          {...register('email', { required: 'Email is required' })}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          disabled
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}

        <input
          {...register('phone_number', { required: 'Phone Number is required' })}
          placeholder="Phone Number"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.phone_number && <span className="text-red-500">{errors.phone_number.message}</span>}

        <input
          {...register('id_number', { required: 'ID Number is required' })}
          placeholder="ID Number"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.id_number && <span className="text-red-500">{errors.id_number.message}</span>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
