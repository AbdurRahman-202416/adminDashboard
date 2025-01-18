import Logo from '../assets/logo.jpeg';
import { Link } from 'react-router-dom';
const Navbar = () => (

    <nav className="w-full  fixed z-20 bg-gray-800 px-2 py-2 flex justify-end gap-8 sm:gap-0 sm:justify-between items-center">
      <Link to={"/dashboard/analytics"}>
      
      <img className='h-[50px] w-[180px] rounded-lg' src={Logo} alt="Logo" />
      </Link>

      <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
        Logout
      </button>
    </nav>
  );
  
  export default Navbar;
  