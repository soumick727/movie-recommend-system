import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthUser } from "./store/authUser";
import { useEffect } from "react";

function App() {
  const { user, isCheckingAuth, checkAuth } = useAuthUser();
  console.log("auth user is here:", user);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>;
  }


  return (
    <div className="flex flex-col min-h-screen bg-black text-shadow-black">
      {/* Make main content grow to push footer down */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      {/* Footer stays at bottom */}
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
