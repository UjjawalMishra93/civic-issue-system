import { Issue } from "@/data/dummyData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface IssueTableProps {
  issues: Issue[];
}

const IssueTable = ({ issues }: IssueTableProps) => {
  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-warning text-warning-foreground';
      case 'In Progress':
        return 'bg-primary text-primary-foreground';
      case 'Resolved':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: Issue['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-destructive text-destructive-foreground';
      case 'Medium':
        return 'bg-warning text-warning-foreground';
      case 'Low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleStatusChange = (issueId: string, newStatus: string) => {
    // Simulate status update
    toast({
      title: "Status Updated",
      description: `Issue #${issueId} status changed to ${newStatus}`,
    });
  };

  const handleAssignStaff = (issueId: string) => {
    toast({
      title: "Staff Assigned",
      description: `Issue #${issueId} has been assigned to field staff`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Issue Management</CardTitle>
        <p className="text-muted-foreground">
          Manage and track all reported civic issues
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
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
                  <TableCell className="font-mono text-sm">
                    #{issue.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="max-w-48">
                      <p className="truncate">{issue.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {issue.location}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{issue.category}</span>
                  </TableCell>
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
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-sm">
                    {issue.citizen_name}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(issue.created_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAssignStaff(issue.id)}
                      >
                        Assign
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueTable;