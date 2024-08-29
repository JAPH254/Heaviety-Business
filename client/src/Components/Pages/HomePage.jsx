import React, { useEffect } from "react";
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

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchProfile());
    }
  }, [status, dispatch]);
  return (
    <div className="home-page bg-gradient-to-r from-indigo-500 to-purple-600 min-h-screen flex">
      {/* Sidebar */}
      <aside className="sidebar bg-gray-200 p-4 w-1/5 min-h-screen sticky top-0">
        <div className="profile-summary mb-6 text-center">
          <img
            src="/avatar.png"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
          />
          <h2 className="text-xl font-semibold mt-2">{user?.email}</h2>
          <p className="text-gray-600 mt-1">Short bio or description</p>
        </div>
        <nav className="quick-links">
          <ul className="space-y-2">
            <li>
              <Link to="/add-product" className="text-blue-500 hover:underline">
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
      <main className="main-content flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="logo">
            <Link to="/" className="text-white text-3xl font-bold">
              Heaviety
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
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
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
            </div>
          </div>
        </header>

        {/* Feed/Activity Stream */}
        <section className="feed mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Feed</h2>
          {/* Feed content goes here */}
          <div className="feed-item ">
            {products?.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded shadow-md">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-800 font-bold">${product.price}</p>
                <p className="text-sm text-gray-500">
                  Posted by {product.user_full_name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Product Management */}
        <section className="product-management mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Manage Your Products
          </h2>
          <div className="add-product mb-4">
            <Link
              to="/add-product"
              className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
            >
              Add New Product
            </Link>
          </div>
          <div className="products-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* List or grid view of products */}
            <div className="product-item bg-white p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold">Product Title</h3>
              <p className="text-gray-700">Product description...</p>
              <Link to="/product/1" className="text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="recent-activity mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Recent Activity
          </h2>
          {/* Activity feed with links to details */}
        </section>
      </main>

      {/* Right Sidebar */}
      <aside className="right-sidebar bg-gray-200 p-4 w-1/5 min-h-screen sticky top-0">
        <div className="quick-actions mb-6">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
      
          <AddCategory />
          <ManageCategories/>
          <Link
            to="/notifications"
            className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 block mb-4"
          >
            View Notifications
          </Link>
          <Link
            to="/messages"
            className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 block"
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
  );
};

export default HomePage;
