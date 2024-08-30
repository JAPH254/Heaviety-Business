import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Modal from "./AddProductsModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsCategory,
  updateCategory,
  deleteCategory,
} from "../../features/products/productActions";
import { Link } from "react-router-dom";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { categories: data } = useSelector((state) => state.categories);

  useEffect(() => {
    if (isModalOpen) {
      dispatch(fetchProductsCategory());
      setCategories(data);
    }
  }, [isModalOpen, data]);

  const handleDeleteCategory = async (id) => {
    try {
      dispatch(deleteCategory(id));
      setCategories(categories.filter((category) => category.id !== id));
      Swal.fire("Deleted!", "The category has been deleted.", "success");
    } catch (error) {
      Swal.fire(
        "Error!",
        "Failed to delete category. Please try again.",
        "error"
      );
    }
  };

  const handleEditCategory = async (category) => {
    const { value: newName } = await Swal.fire({
      title: "Edit Category",
      input: "text",
      inputLabel: "Category Name",
      inputPlaceholder: "Enter new category name",
      inputValue: category.name,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to enter a category name!";
        }
      },
    });

    if (newName && newName !== category.name) {
      try {
        const updatedCategory = {
          id: category.id,
          formValues: { name: newName },
        };
        dispatch(updateCategory(updatedCategory)).then((response) => {
          if (!response.error) {
            setCategories(
              categories.map((cat) =>
                cat.id === category.id ? { ...cat, name: newName } : cat
              )
            );
            Swal.fire(
              "Updated!",
              `The category "${newName}" has been updated.`,
              "success"
            );
          } else {
            Swal.fire(
              "Error!",
              "Failed to update category. Please try again.",
              "error"
            );
          }
        });
      } catch (error) {
        Swal.fire(
          "Error!",
          "Failed to update category. Please try again.",
          "error"
        );
      }
    }
  };

  return (
    <div className="p-1">
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-success"
      >
        Manage Categories
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Manage Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md"
              >
                <span>{category.name}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default ManageCategories;
