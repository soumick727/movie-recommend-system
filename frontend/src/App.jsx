import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div className="App">
      <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}


export default App
