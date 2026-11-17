import Navbar from './Navbar';
import Footer from './Footer';
import ToastContainer from '../common/ToastContainer';

export default function MainLayout({ children, showFooter = true }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-brand-500/[0.03] via-white to-accent-400/[0.03]">
      <Navbar />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
      <ToastContainer />
    </div>
  );
}
