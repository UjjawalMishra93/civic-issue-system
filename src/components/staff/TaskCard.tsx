import { Issue } from "@/data/dummyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Button from "../common/Button";
import { toast } from "@/hooks/use-toast";

interface TaskCardProps {
  task: Issue;
}

const TaskCard = ({ task }: TaskCardProps) => {
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

  const handleStartTask = () => {
    toast({
      title: "Task Started",
      description: `You've started working on issue #${task.id}`,
    });
  };

  const handleCompleteTask = () => {
    toast({
      title: "Task Completed",
      description: `Issue #${task.id} has been marked as resolved`,
    });
  };

  const handleAddUpdate = () => {
    toast({
      title: "Update Added",
      description: "Progress update has been recorded",
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
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-card-foreground">
              {task.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Task ID: #{task.id}
            </p>
          </div>
          <Badge className={getPriorityColor(task.priority)}>
            {task.priority} Priority
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-foreground">
            {task.description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground bg-muted/30 p-3 rounded-md">
          <div>
            <span className="font-medium">Category:</span>
            <p>{task.category}</p>
          </div>
          <div>
            <span className="font-medium">Location:</span>
            <p>{task.location}</p>
          </div>
          <div>
            <span className="font-medium">Reported by:</span>
            <p>{task.citizen_name}</p>
          </div>
          <div>
            <span className="font-medium">Date Assigned:</span>
            <p>{formatDate(task.created_at)}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex flex-wrap gap-2">
            {task.status === 'Pending' && (
              <Button 
                variant="primary" 
                size="sm"
                onClick={handleStartTask}
              >
                Start Task
              </Button>
            )}
            {task.status === 'In Progress' && (
              <>
                <Button 
                  variant="success" 
                  size="sm"
                  onClick={handleCompleteTask}
                >
                  Mark Complete
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={handleAddUpdate}
                >
                  Add Update
                </Button>
              </>
            )}
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => window.open(`https://maps.google.com/search/${encodeURIComponent(task.location)}`, '_blank')}
            >
              📍 View Location
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;