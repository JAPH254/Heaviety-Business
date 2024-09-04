import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Pages.css";
import { fetchProducts } from "../../features/products/productActions";
import { fetchProfile } from "../../features/auth/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddProducts from "../products/AddProduct";
import AddCategory from "../products/AddCategory";
import { fetchProductsCategory } from "../../features/products/productActions";
import ManageCategories from "../products/ManageCategories";
import { logout } from "../../features/auth/authSlice";
const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const status = useSelector((state) => state.products.status);
  const { user, isLoading, error } = useSelector((state) => state.profile);
  const [profile_picture, setProfilePicture] = useState("./avatar.png");

  console.log(user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (status === "idle") {
        await dispatch(fetchProducts());
        await dispatch(fetchProfile());
      }
    };
    fetchData();
  }, [status, dispatch]);

  useEffect(() => {
    const updateProfilePicture = async () => {
      if (user && user.profile_picture) {
        setProfilePicture(user.profile_picture);
      }
    };
    updateProfilePicture();
  }, [user]);

  useEffect(() => {
    const handleLogout = async () => {
      if (!token) {
        await dispatch(logout());
        navigate("/");
      }
    };
    handleLogout();
  }, [token, dispatch, navigate]);

  if (isLoading) {
    return (
      <>
        <p>loading</p>
      </>
    );
  }

  function timeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [key, value] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / value);
      if (interval >= 1) {
        return interval === 1
          ? `${interval} ${key} ago`
          : `${interval} ${key}s ago`;
      }
    }

    return "just now";
  }
  return (
    <div className="">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600">
        {" "}
        <header className="flex justify-between items-center mb-1">
          <div className="logo">
            <Link
              to="/"
              className="text-white text-2xl font-semibold flex flex-column items-center"
            >
              <img
                src="./logo.png"
                alt="Heaviety logo"
                className="h-16 w-16 rounded-full object-cover"
              />
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
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={toggleDropdown} // Toggle dropdown on click
                  >
                    {user?.first_name}
                    <svg
                      className="-mr-1 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {isOpen && ( // Conditionally render the dropdown menu
                  <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
                    <div className="py-1" role="none">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="menu-item-0"
                      >
                        Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="menu-item-1"
                      >
                        Edit
                      </a>
                    </div>
                    <div className="py-1" role="none">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="menu-item-2"
                      >
                        Archive
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="menu-item-3"
                      >
                        Move
                      </a>
                    </div>
                    <div className="py-1" role="none">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="menu-item-4"
                      >
                        Share
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="menu-item-5"
                      >
                        Settings
                      </a>
                    </div>
                    <div className="py-1" role="none">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="menu-item-6"
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                )}
              </div>
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
                        className="w-12 h-12 rounded-full mx-auto border-2 border-blue-500"
                      />
                    </div>
                    <div className="col-6">
                      <p className="">
                        Posted by {product.user_full_name}
                      </p>
                      <small className="text-gray-500">
                        {timeAgo(product.created_at)}
                      </small>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold mt-2 ">
                    {product.title}
                  </h2>
                  <small className="text-primary">
                    {product.stock} available on stock
                  </small>
                  <p className="">{product.description}</p>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded"
                  />

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
            <Link to="/notifications" className="text-success p-1">
              View Notifications
            </Link>
            <Link to="/messages" className="text-success p-1">
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
