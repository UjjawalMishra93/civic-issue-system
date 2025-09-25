import { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import IssueTable from "@/components/admin/IssueTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AnalyticsTab from "./AnalyticsTab";
import UserManagementTab from "./UserManagementTab";
import GeminiAIModal from "@/components/admin/GeminiAIModal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  location: string;
  photo_url?: string;
  citizen_name?: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
  district: string;
  department: string;
}

const AdminDashboard = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [districtFilter, setDistrictFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const JHARKHAND_DISTRICTS = [
    "Garhwa", "Palamu", "Latehar", "Chatra", "Hazaribagh", "Koderma", 
    "Giridih", "Ramgarh", "Bokaro", "Dhanbad", "Lohardaga", "Gumla", 
    "Simdega", "Ranchi", "Khunti", "West Singhbhum", "Saraikela Kharsawan", 
    "East Singhbhum", "Jamtara", "Deoghar", "Dumka", "Pakur", "Godda", "Sahebganj"
  ];

  const DEPARTMENTS = [
    "Roads & Transport", "Water & Sanitation", "Electricity", 
    "Public Health", "Law & Order", "Urban Development", "Others"
  ];

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    let result = issues;
    if (districtFilter !== "all") {
      result = result.filter(issue => issue.district === districtFilter);
    }
    if (departmentFilter !== "all") {
      result = result.filter(issue => issue.department === departmentFilter);
    }
    setFilteredIssues(result);
  }, [issues, districtFilter, departmentFilter]);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching issues:', error);
        toast({
          title: "Error",
          description: "Failed to load issues. Please refresh the page.",
          variant: "destructive",
        });
        return;
      }

      setIssues((data || []) as Issue[]);
    } catch (error) {
      console.error('Error fetching issues:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while loading issues.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage and oversee all civic issues reported across Jharkhand districts.
            </p>
          </div>
          <Button onClick={() => setIsAiModalOpen(true)}>AI Categorize</Button>
        </div>

        <Tabs defaultValue="issues" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="user-management">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="issues">
            <Card>
              <CardHeader>
                <CardTitle>All Issues</CardTitle>
                <div className="flex space-x-4 pt-4">
                  <Select onValueChange={setDistrictFilter} value={districtFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by District" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Districts</SelectItem>
                      {JHARKHAND_DISTRICTS.map(district => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setDepartmentFilter} value={departmentFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {DEPARTMENTS.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="text-lg text-muted-foreground">Loading issues...</div>
                  </div>
                ) : (
                  <IssueTable issues={filteredIssues} onIssueUpdate={fetchIssues} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab issues={issues} />
          </TabsContent>
          
          <TabsContent value="user-management">
            <UserManagementTab />
          </TabsContent>
        </Tabs>
      </main>
      
      <GeminiAIModal 
        issues={issues} 
        isOpen={isAiModalOpen} 
        onClose={() => setIsAiModalOpen(false)} 
      />

    </div>
  );
};

export default AdminDashboard;
