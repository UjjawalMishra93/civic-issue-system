import { useState } from "react";
import Header from "@/components/common/Header";
import TaskCard from "@/components/staff/TaskCard";
import { dummyIssues } from "@/data/dummyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StaffDashboard = () => {
  const [issues] = useState(dummyIssues);

  // Filter issues that would be assigned to field staff
  const assignedTasks = issues.filter(issue => 
    issue.status === 'In Progress' || issue.status === 'Pending'
  );
  
  const pendingTasks = issues.filter(issue => issue.status === 'Pending');
  const inProgressTasks = issues.filter(issue => issue.status === 'In Progress');
  const completedTasks = issues.filter(issue => issue.status === 'Resolved');

  // Calculate statistics
  const stats = {
    total: assignedTasks.length,
    pending: pendingTasks.length,
    inProgress: inProgressTasks.length,
    completed: completedTasks.length,
    highPriority: assignedTasks.filter(task => task.priority === 'High').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Field Staff Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your assigned tasks and update issue resolution progress.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Assigned Tasks</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{stats.pending}</div>
                <div className="text-sm text-muted-foreground">New Tasks</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.inProgress}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{stats.completed}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">{stats.highPriority}</div>
                <div className="text-sm text-muted-foreground">High Priority</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks Tabs */}
        <Tabs defaultValue="assigned" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="assigned">
              All Assigned ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="new">
              New Tasks ({stats.pending})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress ({stats.inProgress})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({stats.completed})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assigned">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {assignedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pendingTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-progress">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {inProgressTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {assignedTasks.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-lg font-semibold mb-2">No Tasks Assigned</h3>
              <p className="text-muted-foreground">
                Check back later for new assignments from the admin team.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default StaffDashboard;