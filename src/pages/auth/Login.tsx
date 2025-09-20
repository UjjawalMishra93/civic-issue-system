import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRoleLogin = (role: 'citizen' | 'admin' | 'staff') => {
    // Simulate login process
    toast({
      title: "Login Successful",
      description: `Welcome back! Redirecting to ${role} dashboard...`,
    });

    // Navigate to appropriate dashboard
    setTimeout(() => {
      navigate(`/${role}/dashboard`);
    }, 1000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    // For demo purposes, default to citizen login
    handleRoleLogin('citizen');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="text-4xl mb-4">🏛️</div>
          <h1 className="text-3xl font-bold text-foreground">
            Civic Portal
          </h1>
          <p className="text-muted-foreground mt-2">
            Report and manage civic issues in your community
          </p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              Sign In to Your Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="your.email@example.com"
                value={credentials.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
              
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />

              <Button 
                type="submit" 
                variant="primary" 
                size="lg"
                className="w-full"
              >
                Sign In
              </Button>
            </form>

            {/* Demo Role Buttons */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Demo Access - Choose Your Role:
              </p>
              <div className="space-y-2">
                <Button 
                  variant="secondary" 
                  size="md"
                  className="w-full"
                  onClick={() => handleRoleLogin('citizen')}
                >
                  👤 Login as Citizen
                </Button>
                <Button 
                  variant="secondary" 
                  size="md"
                  className="w-full"
                  onClick={() => handleRoleLogin('admin')}
                >
                  👨‍💼 Login as Admin
                </Button>
                <Button 
                  variant="secondary" 
                  size="md"
                  className="w-full"
                  onClick={() => handleRoleLogin('staff')}
                >
                  🔧 Login as Field Staff
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                This is a demonstration system. In production, proper authentication would be implemented.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;