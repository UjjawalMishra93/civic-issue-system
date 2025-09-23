import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/citizen/dashboard')) return 'Citizen Dashboard';
    if (path.includes('/citizen/report')) return 'Report Issue';
    if (path.includes('/admin/dashboard')) return 'Admin Dashboard';
    if (path.includes('/staff/dashboard')) return 'Field Staff Dashboard';
    return 'Civic Issue Reporting System';
  };

  const getUserRole = () => {
    if (profile?.role === 'admin') return 'Admin';
    if (profile?.role === 'staff') return 'Field Staff';
    if (profile?.role === 'citizen') return 'Citizen';
    return null;
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const userRole = getUserRole();
  const isAuthenticated = user && profile;

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

          {/* User Profile and Actions */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-sm">
                <span className="text-muted-foreground">Welcome, </span>
                <span className="font-medium text-foreground">
                  {profile.full_name || user.email}
                </span>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-accent transition-colors">
                    <Avatar className="w-8 h-8">
                      <AvatarImage 
                        src={profile.avatar_url || undefined} 
                        alt={profile.full_name || 'User'} 
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium">{profile.full_name || 'User'}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                    <div className="text-xs text-muted-foreground capitalize">{userRole}</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => navigate('/auth/login')}
              >
                Sign In
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => navigate('/auth/signup')}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;