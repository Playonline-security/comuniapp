import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export default function Logo({ showText = true, className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-3 ${className}`}>
      <img src={logo} alt="ComuniApp" className="h-11 w-11 shrink-0" />
      {showText && <span className="text-xl font-bold text-gray-900">ComuniApp</span>}
    </Link>
  );
}
