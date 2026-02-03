import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <main className="px-6 py-6">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
