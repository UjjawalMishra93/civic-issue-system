import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Shield, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";

// Example for animated counter (see Hero Section)
import { useEffect, useState } from "react";

const Index = () => {
  const features = [
    {
      icon: MapPin,
      title: "Location-Based Reporting",
      description: "Report issues with precise location data using our integrated mapping system.",
      color: "#2F5B8F"
    },
    {
      icon: Clock,
      title: "Real-Time Tracking", 
      description: "Track the status of your reports from submission to resolution in real-time.",
      color: "#4CAF50"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Government-grade security ensures your data and reports are protected.",
      color: "#2F5B8F"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of citizens working together to improve our community.",
      color: "#4CAF50"
    }
  ];

  // Animated stats for Hero Section
  const statsData = [
    { number: 15000, label: "Issues Resolved" },
    { number: 50000, label: "Active Citizens" },
    { number: 98, label: "Resolution Rate", suffix: "%" },
    { number: 24, label: "System Availability", suffix: "/7" }
  ];
  const [stats, setStats] = useState([0, 0, 0, 0]);
  useEffect(() => {
    // Simple counter animation
    statsData.forEach((stat, i) => {
      let start = 0;
      const end = stat.number;
      const duration = 800;
      const step = Math.ceil(end / (duration / 20));
      const interval = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        setStats(prev => {
          const copy = [...prev];
          copy[i] = start;
          return copy;
        });
      }, 20);
    });
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F0F2F5" }}>
      {/* Navigation Header */}
      <header className="shadow-sm border-b sticky top-0 z-50 transition-all duration-300" style={{ backgroundColor: "#FFFFFF", borderColor: "#F0F2F5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl" style={{ color: "#2F5B8F" }}>🏛️</div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: "#2F5B8F" }}>Civic Portal</h1>
                <p className="text-xs" style={{ color: "#616161" }}>Government Issue Reporting</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-[#2F5B8F] transition-colors font-medium" style={{ color: "#616161" }}>
                Features
              </a>
              <a href="#about" className="hover:text-[#2F5B8F] transition-colors font-medium" style={{ color: "#616161" }}>
                About
              </a>
              <a href="#contact" className="hover:text-[#2F5B8F] transition-colors font-medium" style={{ color: "#616161" }}>
                Contact
              </a>
            </nav>
            <div className="flex items-center space-x-3">
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative" style={{ backgroundColor: "#F0F2F5" }}>
        {/* Example animated gradient background */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          background: "linear-gradient(120deg, #2F5B8F 0%, #4CAF50 100%)",
          opacity: 0.08
        }} />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-4" style={{ backgroundColor: "#4CAF50", color: "#FFFFFF", borderColor: "#4CAF50" }}>
            🚀 Trusted by 50,000+ Citizens
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: "#2F5B8F" }}>
            Report Civic Issues.<br />
            <span style={{ color: "#4CAF50" }}>Build Better Communities.</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: "#212121" }}>
            Empower citizens to report civic issues, track progress, and create positive change in their communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/auth/signup">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 bg-[#2F5B8F] text-white hover:bg-[#1B3556] shadow-lg">
                Start Reporting Issues
              </Button>
            </Link>
            <a href="#features">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 bg-[#4CAF50] text-white hover:bg-[#388E3C] shadow-lg">
                Learn More
              </Button>
            </a>
          </div>
          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: "#2F5B8F" }}>
                  {stats[index]}
                  {stat.suffix ? stat.suffix : "+"}
                </div>
                <div className="text-sm" style={{ color: "#616161" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20" style={{ backgroundColor: "#F0F2F5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#2F5B8F" }}>
              Powerful Features for Civic Engagement
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: "#616161" }}>
              Everything you need to report, track, and resolve civic issues efficiently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow group" style={{ backgroundColor: "#FFFFFF" }}>
                <CardHeader>
                  <div className="mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: feature.color }}>
                    <feature.icon className="w-6 h-6" style={{ color: "#FFFFFF" }} />
                  </div>
                  <CardTitle className="text-lg font-bold" style={{ color: "#212121" }}>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed" style={{ color: "#616161" }}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#2F5B8F" }}>
              How It Works
            </h2>
            <p className="text-xl" style={{ color: "#616161" }}>
              Three simple steps to make a difference in your community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow" style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}>
                1
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#212121" }}>Report the Issue</h3>
              <p className="text-sm" style={{ color: "#616161" }}>
                Take a photo, describe the problem, and pin the location on our map.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow" style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}>
                2
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#212121" }}>Track Progress</h3>
              <p className="text-sm" style={{ color: "#616161" }}>
                Monitor your report's status and receive updates as it's being addressed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow" style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}>
                ✓
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#212121" }}>See Results</h3>
              <p className="text-sm" style={{ color: "#616161" }}>
                Get notified when the issue is resolved and see the positive impact you've made.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ background: "linear-gradient(120deg, #2F5B8F 60%, #4CAF50 100%)", color: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Your voice matters. Be the change your community needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/signup">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 bg-[#4CAF50] text-white hover:bg-[#388E3C] shadow-lg">
                Create Account
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto px-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#2F5B8F]"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 border-t" style={{ backgroundColor: "#F0F2F5", borderColor: "#F0F2F5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl" style={{ color: "#2F5B8F" }}>🏛️</div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: "#2F5B8F" }}>Civic Portal</h3>
                  <p className="text-sm" style={{ color: "#616161" }}>Government Issue Reporting</p>
                </div>
              </div>
              <p className="mb-4 max-w-md" style={{ color: "#616161" }}>
                Empowering citizens to report civic issues and collaborate with local authorities 
                for community improvement.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm" style={{ color: "#616161" }}>
                  <Phone className="w-4 h-4" />
                  <span>(555) 123-CIVIC</span>
                </div>
                <div className="flex items-center space-x-2 text-sm" style={{ color: "#616161" }}>
                  <Mail className="w-4 h-4" />
                  <span>support@civicportal.gov</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: "#212121" }}>Quick Links</h4>
              <ul className="space-y-2 text-sm" style={{ color: "#616161" }}>
                <li><Link to="/auth/signup" className="hover:text-[#2F5B8F] transition-colors">Get Started</Link></li>
                <li><Link to="/auth/login" className="hover:text-[#2F5B8F] transition-colors">Sign In</Link></li>
                <li><a href="#features" className="hover:text-[#2F5B8F] transition-colors">Features</a></li>
                <li><a href="#about" className="hover:text-[#2F5B8F] transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: "#212121" }}>Government & Legal</h4>
              <ul className="space-y-2 text-sm" style={{ color: "#616161" }}>
                <li><a href="#" className="hover:text-[#2F5B8F] transition-colors flex items-center gap-1">City Portal <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="#" className="hover:text-[#2F5B8F] transition-colors flex items-center gap-1">Privacy Policy <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="#" className="hover:text-[#2F5B8F] transition-colors flex items-center gap-1">Terms of Service <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="#" className="hover:text-[#2F5B8F] transition-colors flex items-center gap-1">Accessibility <ExternalLink className="w-3 h-3" /></a></li>
              </ul>
              {/* Social Media Icons (add your own SVGs or icon components here) */}
              <div className="flex space-x-3 mt-4">
                {/* Example: <a href="#"><TwitterIcon /></a> */}
              </div>
            </div>
          </div>
          <div className="border-t pt-8 mt-8 text-center text-sm" style={{ color: "#616161", borderColor: "#F0F2F5" }}>
            <p>&copy; 2024 Civic Portal. All rights reserved. | A Government Initiative</p>
            <p className="mt-2" style={{ fontSize: "0.85em" }}>Powered by Urban Pulse Grid</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;