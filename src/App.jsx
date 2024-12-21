import { Outlet, Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      
     <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Link to="/" className="text-xl font-bold text-blue-500">
            My FYP
          </Link>
          <div>
            <Link to="/" className="mr-4 text-gray-700 hover:text-blue-500">
              Home
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-500">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
