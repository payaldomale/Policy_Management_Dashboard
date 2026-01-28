const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
