import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import SearchHistory from "./pages/SearchHistory";
import Questionnaire from "./pages/Questionnaire ";
import RecommendationResult from './pages/RecommendationResult';
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useAuthUser } from "./store/authUser";
import { useEffect } from "react";
import PersonPage from "./pages/PersonPage";

function App() {
  const { user, isCheckingAuth, checkAuth } = useAuthUser();
  console.log("auth user is here:", user);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white space-y-4">
        <Loader className="h-12 w-12 animate-spin text-yellow-400" />
        <p className="text-lg text-gray-300 font-semibold tracking-wide">Checking authentication...</p>
      </div>
    );
  }
  // If user is not logged in, show login/signup page
  // if (!user) {
  //   return (
  //     <div className="flex flex-col min-h-screen bg-black text-shadow-black">
  //       <main className="flex-grow">
  //         <Routes>
  //           <Route path="/" element={<HomePage />} />
  //           <Route path="/login" element={<LoginPage />} />
  //           <Route path="/signup" element={<SignUpPage />} />
  //         </Routes>
  //       </main>
  //       <Footer />
  //       <Toaster position="top-center" reverseOrder={false} />
  //     </div>
  //   );
  // }
  


  return (
    <div className="flex flex-col min-h-screen bg-black text-shadow-black">
      {/* Make main content grow to push footer down */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
          {/* watch page */}
          <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to="/login" />} />
          {/* search page */ }
          <Route path="/search" element={user ? <SearchPage /> : <Navigate to="/login" />} />
          {/* person page */}
          <Route path="/person/:id" element={user ? <PersonPage /> : <Navigate to="/login" />} />
          {/* history page */}
          <Route path="/history" element={user ? <SearchHistory/> : <Navigate to="/login"/>} />
          {/* questionnaire page */}
          <Route path="/question" element={user ? <Questionnaire/> : <Navigate to="/login"/>} />
          <Route path='/recommendation' element={user ? <RecommendationResult />: <Navigate to="/login"/>} />
        </Routes>
      </main>

      {/* Footer stays at bottom */}
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
