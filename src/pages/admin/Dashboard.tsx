import { useState } from "react";
import Header from "@/components/common/Header";
import IssueTable from "@/components/admin/IssueTable";
import { dummyIssues } from "@/data/dummyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const [issues] = useState(dummyIssues);

  // Calculate statistics
  const stats = {
    total: issues.length,
    pending: issues.filter(issue => issue.status === 'Pending').length,
    inProgress: issues.filter(issue => issue.status === 'In Progress').length,
    resolved: issues.filter(issue => issue.status === 'Resolved').length,
    highPriority: issues.filter(issue => issue.priority === 'High').length,
  };

  // Filter issues by status
  const pendingIssues = issues.filter(issue => issue.status === 'Pending');
  const inProgressIssues = issues.filter(issue => issue.status === 'In Progress');
  const resolvedIssues = issues.filter(issue => issue.status === 'Resolved');

  // Get category distribution
  const categoryStats = issues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage and oversee all civic issues across the system.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Issues</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{stats.pending}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
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
                <div className="text-2xl font-bold text-success">{stats.resolved}</div>
                <div className="text-sm text-muted-foreground">Resolved</div>
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

        {/* Category Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Issues by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(categoryStats).map(([category, count]) => (
                <Badge key={category} variant="outline" className="px-3 py-1">
                  {category}: {count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Issues Management Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All Issues ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({stats.pending})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress ({stats.inProgress})
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved ({stats.resolved})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <IssueTable issues={issues} />
          </TabsContent>

          <TabsContent value="pending">
            <IssueTable issues={pendingIssues} />
          </TabsContent>

          <TabsContent value="in-progress">
            <IssueTable issues={inProgressIssues} />
          </TabsContent>

          <TabsContent value="resolved">
            <IssueTable issues={resolvedIssues} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;