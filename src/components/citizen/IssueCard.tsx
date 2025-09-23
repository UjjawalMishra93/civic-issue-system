import { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

interface IssueCardProps {
  issue: Tables<"issues"> & { issue_upvotes: { user_id: string }[] };
  onUpvote: (issueId: string) => void;
  upvoted: boolean;
}

const IssueCard = ({ issue, onUpvote, upvoted }: IssueCardProps) => {
  const getStatusColor = (status: Tables<"issues">['status']) => {
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

  const getPriorityColor = (priority: Tables<"issues">['priority']) => {
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
          <div className="flex items-center gap-2">
            <Button variant={upvoted ? "primary" : "outline"} size="sm" onClick={() => onUpvote(issue.id)}>
              <ArrowUp className="h-4 w-4 mr-1" />
              {issue.issue_upvotes?.length || 0}
            </Button>
            <div className="text-xs text-muted-foreground">
              ID: #{issue.id.substring(0, 8)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
