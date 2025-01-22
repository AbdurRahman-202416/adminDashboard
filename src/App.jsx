import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import apiRequest from "./Axios";

const App = () => {
  const [loader, setLoader] = useState(false);

  // Intercept requests and responses to handle the loader
  apiRequest.interceptors.request.use((req) => {
    setLoader(true);
    return req;
  });

  apiRequest.interceptors.response.use(
    (res) => {
      setLoader(false);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return res;
    },
    (error) => {
      setLoader(false);
      return Promise.reject(error);
    }
  );

  return (
    <Router>
      <div className="relative">
        {/* Loader */}
        {loader && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-10 bg-indigo-900">
            <img
              className="w-8 h-8 sm:w-16 sm:h-16 animate-spin"
              src="https://www.svgrepo.com/show/199956/loading-loader.svg"
              alt="Loading icon"
            />
          </div>
        )}

        {/* Application Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
