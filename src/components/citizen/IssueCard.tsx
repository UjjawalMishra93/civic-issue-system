
import { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface IssueCardProps {
  issue: Tables<"issues">;
  onUpvote: (issueId: string) => void;
  upvoted: boolean;
}

const IssueCard = ({ issue, onUpvote, upvoted }: IssueCardProps) => {
  const getStatusColor = (status: Tables<"issues">['status']) => {
    switch (status) {
      case 'Reported':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'AI Assigned':
        return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
      case 'Admin Review':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      case 'Assigned to Staff':
        return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20';
      case 'Resolved':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  }

  return (
    <Card className="hover:shadow-md transition-shadow flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-grow">
            <div className="text-xs text-muted-foreground">ID: #{issue.id.substring(0, 8)}</div>
            <CardTitle className="text-lg line-clamp-2 mt-1">{issue.title}</CardTitle>
          </div>
          <div className="flex flex-col gap-2 ml-4 flex-shrink-0">
            <Badge className={getStatusColor(issue.status)}>
              {issue.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3">
          {issue.description}
        </p>
        
        <div className="text-sm space-y-2">
            <div>
                <span className="font-medium text-foreground">Category:</span>
                <p className="text-muted-foreground">{issue.category}</p>
            </div>
             {issue.category === 'Damaged Benches' && (
                <p className="text-xs text-muted-foreground italic">AI Suggested Assignment: Urban Development</p>
            )}
            {issue.category === 'Traffic' && issue.priority === 'High' && (
                 <p className="text-xs text-destructive italic">AI assessed this as HIGH risk due to traffic intersection</p>
            )}
        </div>


        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-foreground">Location:</span>
            <p className="text-muted-foreground">{issue.location}</p>
          </div>
        </div>
      </CardContent>
      <div className="flex justify-between items-center p-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            {formatTimeAgo(issue.updated_at || issue.created_at)}
          </div>
          <div className="flex items-center gap-2">
            <Button variant={upvoted ? "primary" : "outline"} size="sm" onClick={() => onUpvote(issue.id)}>
              <ArrowUp className="h-4 w-4 mr-1" />
              {issue.upvotes}
            </Button>
          </div>
        </div>
    </Card>
  );
};

export default IssueCard;
