import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice'; // Import the logout action
import logImage from '../../public/images/log.png';
import accountImage from '../../../public/campaign/account.png';
import settingImage from '../../../public/campaign/logout.png';
import notificationImage from '../../../public/campaign/notification.png';

export default function User() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  
  // Get user data from Redux store
  const user = useSelector((state: RootState) => state.auth.user);
  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';
  const userInitials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    setIsModalOpen(false);
  };

  // Logout function that clears persisted store and redirects
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear auth state
    router.push('/'); // Redirect to login page
  };

  return (
    <div className="relative font-poppins">
      <div
        className="flex cursor-pointer justify-between rounded-md bg-yellow p-2 py-1"
        onClick={handleModalToggle}
      >
        {/* User Initials and Name */}
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-blue-600 font-bold">
            {userInitials}
          </div>
          <span className="ml-3 text-lg hover:text-white font-medium">
            {firstName} {lastName}
          </span>
        </div>

        <div className="mr-1">
          <div className="inline-block rotate-90 text-white text-3xl">&gt;</div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="absolute left-28 -bottom-3 font-poppins transform translate-x-1/2 mb-2 bg-gray-50 text-gray-600 border z-10 p-3 rounded-md w-48 shadow-lg"
          ref={modalRef}
        >
          {/* Modal Content */}
          <div className="flex items-center mb-1 border-b">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
              {userInitials}
            </div>
            <span className="ml-3 text-lg font-medium">
              {firstName} {lastName}
            </span>
          </div>

          <div className="space-y-1">
            {/* Account Button */}
            <button
              className="w-full flex items-center p-2 text-left text-xs hover:bg-gray-200 rounded-md"
              onClick={handleButtonClick}
            >
              <Image src={accountImage} alt="Account" width={24} height={16} />
              <span className="ml-2 text-lg">Account</span>
            </button>

            {/* Notification Button */}
            <button
              className="w-full flex items-center p-2 text-left text-xs hover:bg-gray-200 border-b mb-1 rounded-md"
              onClick={handleButtonClick}
            >
              <Image
                src={notificationImage}
                alt="Notification"
                width={22}
                height={16}
              />
              <span className="ml-2 text-lg">Notification</span>
            </button>

            {/* Updated Logout Button */}
            <button
              className="w-full flex items-center p-2 text-left text-xs hover:bg-gray-0 rounded-md"
              onClick={handleLogout} // Changed to use handleLogout
            >
              <Image src={settingImage} alt="Settings" width={22} height={16} />
              <span className="ml-2 text-lg">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}