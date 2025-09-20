import { Issue } from "@/data/dummyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface IssueCardProps {
  issue: Issue;
}

const IssueCard = ({ issue }: IssueCardProps) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-card-foreground">
            {issue.title}
          </CardTitle>
          <div className="flex gap-2">
            <Badge className={getStatusColor(issue.status)}>
              {issue.status}
            </Badge>
            <Badge className={getPriorityColor(issue.priority)}>
              {issue.priority}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {issue.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
          <div>
            <span className="font-medium">Category:</span>
            <p>{issue.category}</p>
          </div>
          <div>
            <span className="font-medium">Location:</span>
            <p>{issue.location}</p>
          </div>
          <div>
            <span className="font-medium">Reported:</span>
            <p>{formatDate(issue.created_at)}</p>
          </div>
          <div>
            <span className="font-medium">Issue ID:</span>
            <p>#{issue.id}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;