import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import IssueDetailModal from "./IssueDetailModal";

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

interface IssueTableProps {
  issues: Issue[];
  onIssueUpdate?: () => void;
}

const IssueTable = ({ issues, onIssueUpdate }: IssueTableProps) => {
  const { toast } = useToast();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const handleStatusChange = async (issueId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('issues')
        .update({ status: newStatus })
        .eq('id', issueId);

      if (error) throw error;

      toast({ title: "Status Updated", description: `Issue #${issueId} status changed to ${newStatus}` });
      if (onIssueUpdate) onIssueUpdate();

    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const getStatusBadge = (status: Issue['status']) => {
    const colorMap = {
      Pending: "bg-yellow-500",
      'In Progress': "bg-blue-500",
      Resolved: "bg-green-500",
    };
    return <Badge className={`${colorMap[status]} text-white`}>{status}</Badge>;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Issues Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id} onClick={() => setSelectedIssue(issue)} className="cursor-pointer">
                  <TableCell>#{issue.id.substring(0, 8)}</TableCell>
                  <TableCell>{issue.title}</TableCell>
                  <TableCell>{getStatusBadge(issue.status)}</TableCell>
                  <TableCell>{issue.category}</TableCell>
                  <TableCell>{issue.priority}</TableCell>
                  <TableCell>{issue.district}</TableCell>
                  <TableCell>{issue.citizen_name}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {issues.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No issues found.</div>
          )}
        </CardContent>
      </Card>

      {selectedIssue && (
        <IssueDetailModal 
          issue={selectedIssue} 
          onClose={() => setSelectedIssue(null)} 
          onIssueUpdate={() => {
            setSelectedIssue(null);
            if(onIssueUpdate) onIssueUpdate();
          }}
        />
      )}
    </>
  );
};

export default IssueTable;
