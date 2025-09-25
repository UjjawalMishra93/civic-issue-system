
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
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

type Issue = Tables<'issues'>;

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [allIssues, setAllIssues] = useState<Issue[]>([]);
  const [myIssues, setMyIssues] = useState<Issue[]>([]);
  const [userUpvotes, setUserUpvotes] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  const jharkhandDistricts = [
    "All", "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum",
    "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti",
    "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi",
    "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"
  ];

  const fetchIssues = async () => {
    try {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setAllIssues(data || []);
      if (user) {
        setMyIssues(data.filter(issue => issue.user_id === user.id));
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
      toast({ title: "Error", description: "Could not fetch issues.", variant: "destructive" });
    }
  };

  const fetchUserUpvotes = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('issue_upvotes')
        .select('issue_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setUserUpvotes(data.map(upvote => upvote.issue_id));
    } catch (error) {
      console.error("Error fetching user upvotes:", error);
    }
  };

  useEffect(() => {
    fetchIssues();
    if (user) {
      fetchUserUpvotes();
    }
    
    const subscription = supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'issues' }, 
        (payload) => {
          fetchIssues();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);

  const handleUpvote = async (issueId: string) => {
    if (!user) {
      toast({ title: "Authentication Required", description: "Please log in to upvote.", variant: "destructive" });
      navigate("/auth/login");
      return;
    }

    const isUpvoted = userUpvotes.includes(issueId);
    
    // Optimistic UI Update
    setUserUpvotes(isUpvoted ? userUpvotes.filter(id => id !== issueId) : [...userUpvotes, issueId]);
    const updatedAllIssues = allIssues.map(issue => {
      if (issue.id === issueId) {
        return { ...issue, upvotes: issue.upvotes + (isUpvoted ? -1 : 1) };
      }
      return issue;
    });
    setAllIssues(updatedAllIssues);

    try {
      const rpcName = isUpvoted ? 'unupvote_issue' : 'upvote_issue';
      const { error } = await supabase.rpc(rpcName, { 
        [isUpvoted ? 'issue_id_to_unupvote' : 'issue_id_to_upvote']: issueId 
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error handling upvote:", error);
      toast({ title: "Error", description: "Failed to update upvote. Please try again.", variant: "destructive" });
      // Revert optimistic update on failure
      fetchIssues();
      fetchUserUpvotes();
    }
  };

  const filteredIssues = selectedDistrict === "All"
    ? allIssues
    : allIssues.filter(issue => issue.district === selectedDistrict);

  const renderIssueList = (issues: Issue[]) => {
    if (issues.length === 0) {
        return (
             <Card className="text-center py-12 col-span-full">
                <CardContent>
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-lg font-semibold mb-2">No Issues Found</h3>
                <p className="text-muted-foreground mb-4">
                    There are no issues matching the current filters.
                </p>
                </CardContent>
            </Card>
        )
    }
    return issues
      .sort((a, b) => b.upvotes - a.upvotes)
      .map(issue => (
        <IssueCard
          key={issue.id}
          issue={issue}
          onUpvote={() => handleUpvote(issue.id)}
          upvoted={userUpvotes.includes(issue.id)}
        />
      ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, Citizen</h1>
          <p className="text-muted-foreground">Track your reported issues and stay updated on community problems.</p>
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
          <Button variant="primary" size="lg" onClick={() => navigate('/citizen/report')}>➕ Report New Issue</Button>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="all">All Issues</TabsTrigger>
            <TabsTrigger value="my-issues">My Issues</TabsTrigger>
            <TabsTrigger value="reported">Reported</TabsTrigger>
            <TabsTrigger value="ai-assigned">AI Assigned</TabsTrigger>
            <TabsTrigger value="admin-review">Admin Review</TabsTrigger>
            <TabsTrigger value="assigned-to-staff">Assigned to Staff</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderIssueList(filteredIssues)}
            </div>
          </TabsContent>

          <TabsContent value="my-issues">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderIssueList(myIssues)}
            </div>
          </TabsContent>
          
          <TabsContent value="reported">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderIssueList(filteredIssues.filter(i => i.status === 'Reported'))}
            </div>
          </TabsContent>

          <TabsContent value="ai-assigned">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderIssueList(filteredIssues.filter(i => i.status === 'AI Assigned'))}
            </div>
          </TabsContent>

          <TabsContent value="admin-review">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderIssueList(filteredIssues.filter(i => i.status === 'Admin Review'))}
            </div>
          </TabsContent>
          
          <TabsContent value="assigned-to-staff">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderIssueList(filteredIssues.filter(i => i.status === 'Assigned to Staff'))}
            </div>
          </TabsContent>

          <TabsContent value="resolved">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderIssueList(filteredIssues.filter(i => i.status === 'Resolved'))}
            </div>
          </TabsContent>
        </Tabs>

        {allIssues.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-lg font-semibold mb-2">No Issues Yet</h3>
              <p className="text-muted-foreground mb-4">Be the first to report an issue in your community.</p>
              <Button variant="primary" onClick={() => navigate('/citizen/report')}>Report Your First Issue</Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default CitizenDashboard;
