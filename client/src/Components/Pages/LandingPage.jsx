import React,{useState} from "react";
import { Link } from "react-router-dom";
import LoginModal from '../Login';
import RegisterModal from '../Register';

const LandingPage = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex flex-col justify-center items-center">
      <header className="text-white text-center p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Heaviety
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Empowering local artisans by connecting them to a global audience.
        </p>
        <button
          onClick={() => setIsRegisterOpen(true)}
          className="bg-white text-indigo-600 font-bold py-2 px-6 rounded-full mr-4 hover:bg-gray-200 transition duration-300"
        >
          Get Started
        </button>
        <button
          onClick={() => setIsLoginOpen(true)}
          className="bg-transparent border border-white text-white font-bold py-2 px-6 rounded-full hover:bg-white hover:text-indigo-600 transition duration-300"
        >
          Login
        </button>
      </header>

      <section className="bg-white p-8 rounded-lg shadow-lg text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">
          Why Choose Heaviety?
        </h2>
        <p className="text-gray-700 mb-4">
          Heaviety is dedicated to supporting small-scale artisans by providing
          them with a platform to showcase their products to a global market. We
          believe in the power of community and the importance of sustainable
          economic growth.
        </p>
        <p className="text-gray-700">
          Join us today and be part of a movement that empowers local talent and
          celebrates cultural diversity.
        </p>
      </section>

      <footer className="text-white text-center p-4 mt-8">
        <p>© {new Date().getFullYear()} Heaviety. All rights reserved.</p>
      </footer>
      <LoginModal isOpen={isLoginOpen} onRequestClose={() => setIsLoginOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onRequestClose={() => setIsRegisterOpen(false)} />
    </div>
  );
};

export default LandingPage;
