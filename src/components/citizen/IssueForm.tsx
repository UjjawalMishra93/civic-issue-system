import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Map from "@/components/common/Map";
import { categories } from "@/data/dummyData";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "@/components/ui/image-upload";
import { useAuth } from "@/hooks/useAuth";

interface FormData {
  title: string;
  description: string;
  category: string;
  priority: string;
  location: string;
  photo_url: string;
}

const IssueForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    priority: '',
    location: '',
    photo_url: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.category || !formData.priority || !formData.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to report an issue.",
        variant: "destructive",
      });
      navigate('/auth/login');
      return;
    }

    try {

      const { error } = await supabase
        .from('issues')
        .insert({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          priority: formData.priority,
          location: formData.location,
          photo_url: formData.photo_url || null,
          user_id: user.id,
          citizen_name: user.email || 'Anonymous'
        });

      if (error) {
        console.error('Error submitting issue:', error);
        toast({
          title: "Error",
          description: "Failed to submit issue. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Issue Reported Successfully",
        description: "Your issue has been submitted and will be reviewed by our team.",
      });

      // Navigate back to dashboard
      navigate('/citizen/dashboard');
    } catch (error) {
      console.error('Error submitting issue:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Report a Civic Issue</CardTitle>
        <p className="text-muted-foreground">
          Help us improve your community by reporting issues that need attention.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Issue Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Brief description of the issue"
              required
            />
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
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

            <div className="space-y-2">
              <Label htmlFor="priority">Priority *</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Street address or landmark"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Provide detailed information about the issue"
              rows={4}
              required
            />
          </div>

          {/* Image Upload */}
          <ImageUpload
            onImageUploaded={(url) => handleInputChange('photo_url', url)}
            onImageRemoved={() => handleInputChange('photo_url', '')}
            maxSizeMB={5}
          />

          {/* Map */}
          <div className="space-y-2">
            <Label>Select Location on Map</Label>
            <Map height="300px" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              Submit Issue Report
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/citizen/dashboard')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default IssueForm;