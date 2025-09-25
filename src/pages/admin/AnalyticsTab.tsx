import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  location: string;
  photo_url?: string;
  citizen_name?: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
  district: string;
  department: string;
}

interface AnalyticsTabProps {
  issues: Issue[];
}

const AnalyticsTab = ({ issues }: AnalyticsTabProps) => {

  const totalIssues = issues.length;
  const resolvedIssues = issues.filter(issue => issue.status === 'Resolved').length;
  const resolutionRate = totalIssues > 0 ? (resolvedIssues / totalIssues) * 100 : 0;

  const avgResolutionTime = (() => {
    const resolved = issues.filter(issue => issue.status === 'Resolved' && issue.created_at && issue.updated_at);
    if (resolved.length === 0) return "N/A";
    const totalTime = resolved.reduce((acc, issue) => {
      const created = new Date(issue.created_at).getTime();
      const updated = new Date(issue.updated_at).getTime();
      return acc + (updated - created);
    }, 0);
    const avgDays = totalTime / resolved.length / (1000 * 60 * 60 * 24);
    return `${avgDays.toFixed(2)} days`;
  })();

  const issuesByDistrict = issues.reduce((acc, issue) => {
    acc[issue.district] = (acc[issue.district] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const issuesByDepartment = issues.reduce((acc, issue) => {
    acc[issue.department] = (acc[issue.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const issuesByCategory = issues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Issues Analysis' },
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalIssues}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{resolutionRate.toFixed(2)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg. Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{avgResolutionTime}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Issues by District</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar 
              options={barChartOptions}
              data={{
                labels: Object.keys(issuesByDistrict),
                datasets: [{
                  label: '# of Issues',
                  data: Object.values(issuesByDistrict),
                  backgroundColor: 'rgba(54, 162, 235, 0.6)',
                }]
              }}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Issues by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar 
              options={barChartOptions}
              data={{
                labels: Object.keys(issuesByDepartment),
                datasets: [{
                  label: '# of Issues',
                  data: Object.values(issuesByDepartment),
                  backgroundColor: 'rgba(255, 99, 132, 0.6)',
                }]
              }}
            />
          </CardContent>
        </Card>
      </div>
       <Card>
          <CardHeader>
            <CardTitle>Issues by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar 
              options={barChartOptions}
              data={{
                labels: Object.keys(issuesByCategory),
                datasets: [{
                  label: '# of Issues',
                  data: Object.values(issuesByCategory),
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                }]
              }}
            />
          </CardContent>
        </Card>
    </div>
  );
};

export default AnalyticsTab;
