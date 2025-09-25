import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Issue } from "@/data/dummyData";
import { IssueCard } from "./IssueCard"; 
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [userUpvotes, setUserUpvotes] = useState<string[]>([]);

  useEffect(() => {
    fetchIssues();
    if (user) {
      fetchUserUpvotes();
    }
  }, [user]);

  const fetchIssues = async () => {
    try {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching issues:", error);
        toast({ title: "Error", description: "Could not fetch issues.", variant: "destructive" });
      } else {
        setIssues(data as Issue[]);
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
      toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
    }
  };

  const fetchUserUpvotes = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('issue_upvotes')
        .select('issue_id')
        .eq('user_id', user.id);

      if (error) {
        console.error("Error fetching user upvotes:", error);
      } else {
        setUserUpvotes(data.map(upvote => upvote.issue_id));
      }
    } catch (error) {
      console.error("Error fetching user upvotes:", error);
    }
  };

  const handleUpvote = async (issueId: string) => {
    if (!user) {
      toast({ title: "Authentication Required", description: "Please log in to upvote.", variant: "destructive" });
      navigate("/auth/login");
      return;
    }

    const isUpvoted = userUpvotes.includes(issueId);
    const originalIssues = [...issues];
    const originalUpvotes = [...userUpvotes];

    // Optimistic UI Update
    const updatedIssues = issues.map(issue => {
      if (issue.id === issueId) {
        return { ...issue, upvotes: issue.upvotes + (isUpvoted ? -1 : 1) };
      }
      return issue;
    });
    setIssues(updatedIssues);
    setUserUpvotes(isUpvoted ? userUpvotes.filter(id => id !== issueId) : [...userUpvotes, issueId]);

    try {
      if (isUpvoted) {
        // Un-upvote
        const { error } = await supabase.rpc('unupvote_issue', { issue_id_to_unupvote: issueId });
        if (error) throw error;
      } else {
        // Upvote
        const { error } = await supabase.rpc('upvote_issue', { issue_id_to_upvote: issueId });
        if (error) throw error;
      }
    } catch (error) {
      console.error("Error handling upvote:", error);
      toast({ title: "Error", description: "Failed to update upvote. Please try again.", variant: "destructive" });
      // Revert optimistic update on failure
      setIssues(originalIssues);
      setUserUpvotes(originalUpvotes);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Community Issues</h1>
        <Button onClick={() => navigate("/citizen/report")}>Report New Issue</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {issues.map(issue => (
          <IssueCard 
            key={issue.id} 
            issue={issue} 
            onUpvote={() => handleUpvote(issue.id)}
            hasUpvoted={userUpvotes.includes(issue.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CitizenDashboard;
