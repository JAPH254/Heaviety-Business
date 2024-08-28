import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { createCategory } from "../../features/products/productActions";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const handleAddCategory = async () => {
    const { value: formValues } = await Swal.fire({
      name: "Add New Category",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Category name">' +
        '<textarea id="swal-input2" class="swal2-textarea" placeholder="Category Description"></textarea>',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const name = document.getElementById("swal-input1").value;
        const description = document.getElementById("swal-input2").value;
        if (!name) {
          Swal.showValidationMessage("name is required");
          return null;
        }
        return { name, description };
      },
    });

    if (formValues) {
      try {
        const response = dispatch(createCategory(formValues)).unwrap();

        setCategories([...categories, response.data]);
        Swal.fire(
          "Category Added!",
          `The category "${formValues.name}" has been added.`,
          "success"
        );
      } catch (error) {
        Swal.fire(
          "Error!",
          "Failed to add category. Please try again.",
          "error"
        );
      }
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleAddCategory}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        + Add Category
      </button>
    </div>
  );
};

export default AddCategory;
