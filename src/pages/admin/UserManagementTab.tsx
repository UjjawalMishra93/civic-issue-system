import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string | undefined;
  issues_reported: number;
}

const UserManagementTab = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers();
      
      if (usersError) {
        throw usersError;
      }

      const { data: issuesData, error: issuesError } = await supabase
        .from('issues')
        .select('user_id');

      if (issuesError) {
        throw issuesError;
      }

      const issueCounts = issuesData.reduce((acc, issue) => {
        if (issue.user_id) {
          acc[issue.user_id] = (acc[issue.user_id] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      const allUsers = usersData.users.map(user => ({
        id: user.id,
        email: user.email,
        issues_reported: issueCounts[user.id] || 0,
      }));
      
      const usersWithIssues = allUsers.filter(user => user.issues_reported > 0);

      setUsers(usersWithIssues);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch user data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading user data...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID (Firebase UID)</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Issues Reported</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">{user.issues_reported}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserManagementTab;
