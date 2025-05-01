import React,{useState} from 'react'
import { useAuthUser } from '../../store/authUser'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import ConfirmModal from '../../components/confirmModal'

const HomeScreen = () => {
  const { logout } = useAuthUser();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const handleLogoutClick = () => {
    setShowModal(true);
  };
  const handleConfirmLogout = async () => {
    await logout();
    setShowModal(false);
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl text-white mb-4">Welcome to BeeWatch 🎬</h1>
      <button
        onClick={handleLogoutClick}
        className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md font-semibold"
      >
        Logout
      </button>

      {showModal && (
        <ConfirmModal
          title="Confirm Logout"
          message="Are you sure you want to log out?"
          onConfirm={handleConfirmLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default HomeScreen;
