import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="text-2xl" style={{ color: "#2F5B8F" }}>
              🏛️
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#2F5B8F]">Civic Portal</h1>
              <p className="text-xs text-gray-500">Government Issue Reporting</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-[#2F5B8F] transition-colors font-medium">
              Features
            </a>
            <a href="#about" className="text-gray-600 hover:text-[#2F5B8F] transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-gray-600 hover:text-[#2F5B8F] transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/auth/login">
              <Button variant="secondary" size="sm" className="bg-[#4CAF50] text-white hover:bg-[#388E3C]">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button variant="primary" size="sm" className="bg-[#2F5B8F] text-white hover:bg-[#1B3556]">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <a href="#features" className="text-gray-600 hover:text-[#2F5B8F] transition-colors font-medium">
                Features
              </a>
              <a href="#about" className="text-gray-600 hover:text-[#2F5B8F] transition-colors font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-600 hover:text-[#2F5B8F] transition-colors font-medium">
                Contact
              </a>
            </nav>
            <div className="flex flex-col space-y-2 mt-4">
              <Link to="/auth/login">
                <Button variant="secondary" size="sm" className="w-full bg-[#4CAF50] text-white hover:bg-[#388E3C]">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/signup">
                <Button variant="primary" size="sm" className="w-full bg-[#2F5B8F] text-white hover:bg-[#1B3556]">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
