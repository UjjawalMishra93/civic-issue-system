import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/common/Header";
import IssueCard from "@/components/citizen/IssueCard";
import Button from "@/components/common/Button";
import { dummyIssues } from "@/data/dummyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const [issues] = useState(dummyIssues);

  // Filter issues by status for different views
  const myIssues = issues.filter(issue => issue.citizen_name === 'John Smith'); // Simulating current user
  const allIssues = issues;
  const pendingIssues = issues.filter(issue => issue.status === 'Pending');
  const inProgressIssues = issues.filter(issue => issue.status === 'In Progress');
  const resolvedIssues = issues.filter(issue => issue.status === 'Resolved');

  const getStatusCount = (status: string) => {
    return issues.filter(issue => issue.status === status).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome, Citizen
          </h1>
          <p className="text-muted-foreground">
            Track your reported issues and stay updated on community problems.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{getStatusCount('Pending')}</div>
                <div className="text-sm text-muted-foreground">Pending Issues</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{getStatusCount('In Progress')}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{getStatusCount('Resolved')}</div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col justify-center">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => navigate('/citizen/report')}
                className="w-full"
              >
                ➕ Report New Issue
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Issues Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All Issues ({allIssues.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingIssues.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress ({inProgressIssues.length})
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved ({resolvedIssues.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-progress">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resolved">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resolvedIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {allIssues.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-lg font-semibold mb-2">No Issues Yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to report an issue in your community.
              </p>
              <Button 
                variant="primary"
                onClick={() => navigate('/citizen/report')}
              >
                Report Your First Issue
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default CitizenDashboard;