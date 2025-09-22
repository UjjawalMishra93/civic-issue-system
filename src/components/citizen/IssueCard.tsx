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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">{issue.title}</CardTitle>
          <div className="flex flex-col gap-2 ml-4">
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
        <p className="text-muted-foreground text-sm line-clamp-3">
          {issue.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-foreground">Category:</span>
            <p className="text-muted-foreground">{issue.category}</p>
          </div>
          <div>
            <span className="font-medium text-foreground">Location:</span>
            <p className="text-muted-foreground">{issue.location}</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-border">
          <div className="text-xs text-muted-foreground">
            Reported: {formatDate(issue.created_at)}
          </div>
          <div className="text-xs text-muted-foreground">
            ID: #{issue.id}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;