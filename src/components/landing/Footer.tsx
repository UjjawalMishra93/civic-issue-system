import { Link } from "react-router-dom";
import { Phone, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="py-16 border-t"
      style={{ backgroundColor: "#F0F2F5", borderColor: "#F0F2F5" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl" style={{ color: "#2F5B8F" }}>
                🏛️
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: "#2F5B8F" }}>
                  Civic Portal
                </h3>
                <p className="text-sm" style={{ color: "#616161" }}>
                  Government Issue Reporting
                </p>
              </div>
            </div>
            <p className="mb-4 max-w-md" style={{ color: "#616161" }}>
              Empowering citizens to report civic issues and collaborate with
              local authorities for community improvement.
            </p>
            <div className="flex items-center space-x-4">
              <div
                className="flex items-center space-x-2 text-sm"
                style={{ color: "#616161" }}
              >
                <Phone className="w-4 h-4" />
                <span>(555) 123-CIVIC</span>
              </div>
              <div
                className="flex items-center space-x-2 text-sm"
                style={{ color: "#616161" }}
              >
                <Mail className="w-4 h-4" />
                <span>support@civicportal.gov</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: "#212121" }}>
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "#616161" }}>
              <li>
                <Link
                  to="/auth/signup"
                  className="hover:text-[#2F5B8F] transition-colors"
                >
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/login"
                  className="hover:text-[#2F5B8F] transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-[#2F5B8F] transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-[#2F5B8F] transition-colors"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: "#212121" }}>
              Government & Legal
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "#616161" }}>
              <li>
                <a
                  href="#"
                  className="hover:text-[#2F5B8F] transition-colors flex items-center gap-1"
                >
                  City Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#2F5B8F] transition-colors flex items-center gap-1"
                >
                  Privacy Policy <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#2F5B8F] transition-colors flex items-center gap-1"
                >
                  Terms of Service <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#2F5B8F] transition-colors flex items-center gap-1"
                >
                  Accessibility <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
            {/* Social Media Icons (add your own SVGs or icon components here) */}
            <div className="flex space-x-3 mt-4">
              {/* Example: <a href="#"><TwitterIcon /></a> */}
            </div>
          </div>
        </div>
        <div
          className="border-t pt-8 mt-8 text-center text-sm"
          style={{ color: "#616161", borderColor: "#F0F2F5" }}
        >
          <p>
            &copy; 2024 Civic Portal. All rights reserved. | A Government
            Initiative
          </p>
          <p className="mt-2" style={{ fontSize: "0.85em" }}>
            Powered by Urban Pulse Grid
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
