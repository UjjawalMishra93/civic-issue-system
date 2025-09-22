import { Issue } from "@/data/dummyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TaskCardProps {
  task: Issue;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { toast } = useToast();

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

  const handleStartTask = () => {
    toast({
      title: "Task Started",
      description: `Started working on: ${task.title}`,
    });
  };

  const handleCompleteTask = () => {
    toast({
      title: "Task Completed",
      description: `Completed task: ${task.title}`,
    });
  };

  const handleAddUpdate = () => {
    toast({
      title: "Update Added",
      description: `Progress update added for: ${task.title}`,
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
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">{task.title}</CardTitle>
          <Badge className={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-3">
          {task.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-foreground">Category:</span>
            <p className="text-muted-foreground">{task.category}</p>
          </div>
          <div>
            <span className="font-medium text-foreground">Location:</span>
            <p className="text-muted-foreground">{task.location}</p>
          </div>
          <div>
            <span className="font-medium text-foreground">Reporter:</span>
            <p className="text-muted-foreground">{task.citizen_name}</p>
          </div>
          <div>
            <span className="font-medium text-foreground">Date:</span>
            <p className="text-muted-foreground">{formatDate(task.created_at)}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          {task.status === 'Pending' && (
            <Button size="sm" onClick={handleStartTask}>
              Start Task
            </Button>
          )}
          {task.status === 'In Progress' && (
            <>
              <Button size="sm" onClick={handleCompleteTask}>
                Complete
              </Button>
              <Button size="sm" variant="outline" onClick={handleAddUpdate}>
                Add Update
              </Button>
            </>
          )}
          <Button size="sm" variant="outline">
            📍 View Location
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          Task ID: #{task.id}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;