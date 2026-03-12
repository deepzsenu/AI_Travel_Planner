import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 relative z-10">
      
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        {children}
      </div>

    </div>
  );
}

export default Layout;