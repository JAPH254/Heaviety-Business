import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Pages.css";
import { fetchProducts } from "../../features/products/productActions";
import { fetchProfile } from "../../features/auth/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import AddProducts from "../products/AddProduct";
import AddCategory from "../products/AddCategory";
import { fetchProductsCategory } from "../../features/products/productActions";
import ManageCategories from "../products/ManageCategories";
const HomePage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const status = useSelector((state) => state.products.status);
  const { user, isLoading, error } = useSelector((state) => state.profile);
  const [profile_picture, setProfilePicture] = useState("./avatar.png");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchProfile());
      setProfilePicture(user?.profile_picture);
    }
  }, [status, dispatch, profile_picture]);
  return (
    <div className="">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600">
        {" "}
        <header className="flex justify-between items-center mb-1">
          <div className="logo">
            <Link to="/" className="text-white text-2xl font-semibold flex flex-column items-center">
              <img src="./logo.png" alt="Heaviety logo" className="h-16 w-16 rounded-full object-cover" />
              <small className="ml-2 bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent">
                Heaviety
              </small>
            </Link>


          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border border-gray-300 rounded"
            />
            <AddProducts />
            <div className="user-menu relative">
              <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                {user?.first_name}
              </button>
            </div>
          </div>
        </header>{" "}
      </div>
      <div className="home-page bg-gradient-to-r from-indigo-500 to-purple-600 min-h-screen flex ">
        {/* Sidebar */}
        <aside className="sidebar bg-gray-200 p-4 w-1/5 min-h-screen sticky top-0 max-h-96 overflow-y-auto">
          <div className="profile-summary mb-6 text-center">
            <img
              src={profile_picture}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
            />
            <h2 className="text-xl font-semibold mt-2">
              {user?.first_name} {user?.last_name}
            </h2>
            <span>{user?.speciality}</span>
            <p className="text-gray-600 mt-1">{user?.bio || "My Bio"}</p>
          </div>
          <nav className="quick-links ">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/add-product"
                  className="text-blue-500 hover:underline"
                >
                  Add Product
                </Link>
              </li>
              <li>
                <Link
                  to="/manage-products"
                  className="text-blue-500 hover:underline"
                >
                  Manage Products
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-blue-500 hover:underline">
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-blue-500 hover:underline">
                  Explore
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content flex-1 py-6">
          {/* Feed/Activity Stream */}
          <section className="feed  max-h-96 overflow-y-auto">
            <div className="feed-item max-h-96 overflow-y-auto">
              {products?.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded shadow-md m-1"
                >
                  <div className="row">
                    <div className="col-2">
                      <img
                        src={user?.profile_picture}
                        alt=""
                        className="w-24 h-2 rounded-full mx-auto border-2 border-blue-500"
                      />
                    </div>
                    <div className="col-6">
                      <p className="text-sm text-gray-500">
                        Posted by {product.user_full_name}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">{product.description}</p>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h2 className="text-xl font-semibold mt-2">
                    {product.title}
                  </h2>

                  <p className="text-gray-800 font-bold">${product.price}</p>
                </div>
              ))}
              {!products.length && (
                <p className="text-success text-center">
                  No products found. Add some products to get started.
                </p>
              )}
            </div>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar bg-gray-200 p-4 w-1/5 min-h-screen sticky top-0 max-h-96 overflow-y-auto">
          <div className="quick-actions mb-6">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>

            <AddCategory />
            <ManageCategories />
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Logout
              </button>
            </div>
            <Link
              to="/notifications"
              className="text-success p-1"
            >
              View Notifications
            </Link>
            <Link
              to="/messages"
              className="text-success p-1"
            >
              Check Messages
            </Link>
          </div>
          <div className="ads">
            <h3 className="text-xl font-bold mb-4">Promotions</h3>
            {/* Ads or promotional content */}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
