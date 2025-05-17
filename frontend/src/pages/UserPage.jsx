// import React from 'react';
// import { useAuthStore } from '../store/authUser'; // assuming this is your auth store
// import { useNavigate } from 'react-router-dom';
// import { LogOut } from "lucide-react";
// import toast from 'react-hot-toast';

// const UserPage = () => {
//   const { user, logout } = useAuthStore();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     toast.success("Logged out successfully");
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-black text-white px-6 py-10">
//       <div className="max-w-2xl mx-auto bg-gray-900 rounded-xl shadow-lg p-6 space-y-4">
//         <h1 className="text-3xl font-bold text-yellow-400">User Profile</h1>

//         <div>
//           <p><span className="font-semibold">Username:</span> {user?.username}</p>
//           <p><span className="font-semibold">Email:</span> {user?.email}</p>
//         </div>

//         <div className="flex gap-4 pt-4">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-semibold"
//           >
//             <LogOut className="w-4 h-4" />
//             Logout
//           </button>

//           <button
//             onClick={() => navigate("/watchlist")}
//             className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded text-sm font-semibold"
//           >
//             View Watchlist
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPage;
