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

const Index = () => {
  const features = [
    {
      icon: MapPin,
      title: "Location-Based Reporting",
      description: "Report issues with precise location data using our integrated mapping system."
    },
    {
      icon: Clock,
      title: "Real-Time Tracking", 
      description: "Track the status of your reports from submission to resolution in real-time."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Government-grade security ensures your data and reports are protected."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of citizens working together to improve our community."
    }
  ];

  const stats = [
    { number: "15,000+", label: "Issues Resolved" },
    { number: "50,000+", label: "Active Citizens" },
    { number: "98%", label: "Resolution Rate" },
    { number: "24/7", label: "System Availability" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">🏛️</div>
              <div>
                <h1 className="text-xl font-bold text-primary">Civic Portal</h1>
                <p className="text-xs text-muted-foreground">Government Issue Reporting</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-3">
              <Link to="/auth/login">
                <Button variant="secondary" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/signup">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            🚀 Trusted by 50,000+ Citizens
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Report Civic Issues.<br />
            <span className="text-primary">Build Better Communities.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Our government-grade platform empowers citizens to report civic issues, 
            track their progress, and collaborate with local authorities to create 
            positive change in their communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/auth/signup">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-8">
                Start Reporting Issues
              </Button>
            </Link>
            <a href="#features">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                Learn More
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Civic Engagement
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides everything you need to report, track, and resolve civic issues efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to make a difference in your community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Report the Issue</h3>
              <p className="text-muted-foreground">
                Take a photo, describe the problem, and pin the location on our map.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your report's status and receive updates as it's being addressed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center text-success-foreground text-2xl font-bold mx-auto mb-4">
                ✓
              </div>
              <h3 className="text-xl font-semibold mb-3">See Results</h3>
              <p className="text-muted-foreground">
                Get notified when the issue is resolved and see the positive impact you've made.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of citizens who are actively improving their communities through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/signup">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                Create Account
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto px-8 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-card py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">🏛️</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Civic Portal</h3>
                  <p className="text-sm text-muted-foreground">Government Issue Reporting</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Empowering citizens to report civic issues and collaborate with local authorities 
                for community improvement.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>(555) 123-CIVIC</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>support@civicportal.gov</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/auth/signup" className="hover:text-foreground transition-colors">Get Started</Link></li>
                <li><Link to="/auth/login" className="hover:text-foreground transition-colors">Sign In</Link></li>
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Government</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">City Portal <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">Privacy Policy <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">Terms of Service <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">Accessibility <ExternalLink className="w-3 h-3" /></a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 mt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Civic Portal. All rights reserved. | A Government Initiative</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;