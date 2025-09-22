import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
}

interface IssueTableProps {
  issues: Issue[];
  onIssueUpdate?: () => void;
}

const IssueTable = ({ issues, onIssueUpdate }: IssueTableProps) => {
  const { toast } = useToast();

  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-warning/10 text-warning hover:bg-warning/20';
      case 'In Progress':
        return 'bg-primary/10 text-primary hover:bg-primary/20';
      case 'Resolved':
        return 'bg-success/10 text-success hover:bg-success/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: Issue['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-destructive/10 text-destructive hover:bg-destructive/20';
      case 'Medium':
        return 'bg-warning/10 text-warning hover:bg-warning/20';
      case 'Low':
        return 'bg-success/10 text-success hover:bg-success/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleStatusChange = async (issueId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('issues')
        .update({ status: newStatus })
        .eq('id', issueId);

      if (error) {
        console.error('Error updating status:', error);
        toast({
          title: "Error",
          description: "Failed to update issue status. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Status Updated",
        description: `Issue ${issueId} status changed to ${newStatus}`,
      });

      // Refresh the issues list
      if (onIssueUpdate) {
        onIssueUpdate();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while updating the status.",
        variant: "destructive",
      });
    }
  };

  const handleAssignStaff = (issueId: string) => {
    toast({
      title: "Staff Assigned",
      description: `Staff member assigned to issue ${issueId}`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
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
              <TableHead>Category</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell className="font-mono text-sm">#{issue.id}</TableCell>
                <TableCell>
                  <div className="max-w-xs truncate" title={issue.title}>
                    {issue.title}
                  </div>
                </TableCell>
                <TableCell>{issue.category}</TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(issue.priority)}>
                    {issue.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select
                    value={issue.status}
                    onValueChange={(value) => handleStatusChange(issue.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue>
                        <Badge className={getStatusColor(issue.status)}>
                          {issue.status}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{issue.citizen_name}</TableCell>
                <TableCell>{formatDate(issue.created_at)}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAssignStaff(issue.id)}
                  >
                    Assign
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {issues.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No issues found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IssueTable;