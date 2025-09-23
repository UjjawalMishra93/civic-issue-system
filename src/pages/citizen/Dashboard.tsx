
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/common/Header";
import IssueCard from "@/components/citizen/IssueCard";
import Button from "@/components/common/Button";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tables } from "@/integrations/supabase/types";

type Issue = Tables<'issues'> & { issue_upvotes: { user_id: string }[] | null };

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [myIssues, setMyIssues] = useState<Issue[]>([]);
  const [user, setUser] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  const jharkhandDistricts = [
    "All", "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum",
    "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti",
    "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi",
    "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"
  ];

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const fetchAllIssues = async () => {
    const { data, error } = await supabase
      .from('issues')
      .select('*, issue_upvotes(user_id)');
    if (error) {
      console.error("Error fetching issues:", error);
    } else {
      setIssues(data as Issue[]);
    }
  };

  const fetchMyIssues = async () => {
    if (user) {
      const { data, error } = await supabase
        .from('issues')
        .select('*, issue_upvotes(user_id)')
        .eq('user_id', user.id);
      if (error) {
        console.error("Error fetching my issues:", error);
      } else {
        setMyIssues(data as Issue[]);
      }
    }
  };

  useEffect(() => {
    fetchAllIssues();
    const subscription = supabase
      .channel('issues')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'issues' }, () => {
        fetchAllIssues();
        fetchMyIssues();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);

  useEffect(() => {
    fetchMyIssues();
  }, [user]);

  const handleUpvote = async (issueId: string) => {
    if (!user) {
      alert("Please log in to upvote.");
      return;
    }

    const { data: existingUpvote, error: checkError } = await supabase
      .from('issue_upvotes')
      .select('*')
      .eq('issue_id', issueId)
      .eq('user_id', user.id);

    if (checkError) {
      console.error("Error checking for existing upvote:", checkError);
      return;
    }

    if (existingUpvote && existingUpvote.length > 0) {
      await supabase
        .from('issue_upvotes')
        .delete()
        .eq('issue_id', issueId)
        .eq('user_id', user.id);
    } else {
      await supabase
        .from('issue_upvotes')
        .insert({ issue_id: issueId, user_id: user.id });
    }
  };

  const filteredIssues = selectedDistrict === "All"
    ? issues
    : issues.filter(issue => issue.district === selectedDistrict);

  const renderIssueCard = (issue: Issue) => (
    <IssueCard 
      key={issue.id} 
      issue={issue} 
      onUpvote={() => handleUpvote(issue.id)} 
      upvoted={issue.issue_upvotes?.some(upvote => upvote.user_id === user?.id) || false} 
    />
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome, Citizen
          </h1>
          <p className="text-muted-foreground">
            Track your reported issues and stay updated on community problems.
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Select onValueChange={setSelectedDistrict} defaultValue="All">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by District" />
            </SelectTrigger>
            <SelectContent>
              {jharkhandDistricts.map(district => (
                <SelectItem key={district} value={district}>{district}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/citizen/report')}
          >
            ➕ Report New Issue
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Issues</TabsTrigger>
            <TabsTrigger value="my-issues">My Issues</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIssues.sort((a, b) => (b.issue_upvotes?.length || 0) - (a.issue_upvotes?.length || 0)).map(renderIssueCard)}
            </div>
          </TabsContent>

          <TabsContent value="my-issues">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myIssues.sort((a, b) => (b.issue_upvotes?.length || 0) - (a.issue_upvotes?.length || 0)).map(renderIssueCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="pending">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIssues.filter(i => i.status === 'Pending').sort((a, b) => (b.issue_upvotes?.length || 0) - (a.issue_upvotes?.length || 0)).map(renderIssueCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="in-progress">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIssues.filter(i => i.status === 'In Progress').sort((a, b) => (b.issue_upvotes?.length || 0) - (a.issue_upvotes?.length || 0)).map(renderIssueCard)}
            </div>
          </TabsContent>

          <TabsContent value="resolved">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIssues.filter(i => i.status === 'Resolved').sort((a, b) => (b.issue_upvotes?.length || 0) - (a.issue_upvotes?.length || 0)).map(renderIssueCard)}
            </div>
          </TabsContent>
        </Tabs>

        {issues.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-lg font-semibold mb-2">No Issues Yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to report an issue in your community.
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/citizen/report')}
              >
                Report Your First Issue
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default CitizenDashboard;
