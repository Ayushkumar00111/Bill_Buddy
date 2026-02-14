import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
const MainLayout = ({ children }) => {
  return (

    
      
      
        <div className="layout">
          
      <Sidebar />

      <div className="content-area">
        <Topbar />
        <main className="page-content">{children}</main>
      </div>
    </div>
   

  );
};

export default MainLayout;
