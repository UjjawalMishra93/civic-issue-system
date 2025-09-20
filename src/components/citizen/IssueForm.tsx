import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import Map from "../common/Map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/data/dummyData";
import { toast } from "@/hooks/use-toast";

const IssueForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    priority: "Medium" as const
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Issue Reported Successfully",
      description: "Your civic issue has been submitted for review.",
    });

    // Navigate back to dashboard
    setTimeout(() => {
      navigate('/citizen/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-card-foreground">
            Report a Civic Issue
          </CardTitle>
          <p className="text-muted-foreground">
            Help improve your community by reporting issues that need attention.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <Input
              label="Issue Title"
              placeholder="Brief description of the issue"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
            />

            {/* Category */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Priority</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => handleInputChange('priority', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <Input
              label="Location"
              placeholder="Address or landmark"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              required
            />

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                placeholder="Provide detailed information about the issue..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="min-h-24"
                required
              />
            </div>

            {/* Map */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Location on Map</Label>
              <Map height="200px" />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" variant="primary" size="lg">
                Submit Issue Report
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                size="lg"
                onClick={() => navigate('/citizen/dashboard')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueForm;