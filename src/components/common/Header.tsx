import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/citizen/dashboard')) return 'Citizen Dashboard';
    if (path.includes('/citizen/report')) return 'Report Issue';
    if (path.includes('/admin/dashboard')) return 'Admin Dashboard';
    if (path.includes('/staff/dashboard')) return 'Field Staff Dashboard';
    return 'Civic Issue Reporting System';
  };

  const getUserRole = () => {
    const path = location.pathname;
    if (path.includes('/citizen')) return 'Citizen';
    if (path.includes('/admin')) return 'Admin';
    if (path.includes('/staff')) return 'Field Staff';
    return null;
  };

  const handleLogout = () => {
    navigate('/');
  };

  const userRole = getUserRole();

  return (
    <header className="bg-card shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary">
                🏛️ Civic Portal
              </h1>
            </div>
            <div className="hidden md:block">
              <h2 className="text-lg font-medium text-foreground">
                {getPageTitle()}
              </h2>
            </div>
          </div>

          {/* User Info and Actions */}
          {userRole && (
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Logged in as: </span>
                <span className="font-medium text-foreground">{userRole}</span>
              </div>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;