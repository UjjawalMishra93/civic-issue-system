import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  location: string;
  photo_url?: string;
  district: string;
  department: string;
}

interface IssueDetailModalProps {
  issue: Issue;
  onClose: () => void;
  onIssueUpdate: () => void;
}

const IssueDetailModal = ({ issue, onClose, onIssueUpdate }: IssueDetailModalProps) => {
  const { toast } = useToast();
  const [status, setStatus] = useState(issue.status);
  const [department, setDepartment] = useState(issue.department);
  const [category, setCategory] = useState(issue.category);
  const [isCategorizing, setIsCategorizing] = useState(false);

  const DEPARTMENTS = ["Roads & Transport", "Water & Sanitation", "Electricity", "Public Health", "Law & Order", "Urban Development", "Others"];
  const CATEGORIES = ["Road Maintenance", "Waste Management", "Water Supply", "Public Safety", "Other"];

  const handleCategorize = async () => {
    setIsCategorizing(true);
    try {
      const { data, error } = await supabase.functions.invoke("categorize-issue", {
        body: { 
          description: issue.description,
          location: issue.location
        },
      });

      if (error) throw error;

      setDepartment(data.department);
      setCategory(data.category);
      toast({ title: "AI Categorization Successful", description: "The issue has been categorized." });

    } catch (error: any) {
      toast({ title: "AI Categorization Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsCategorizing(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const { error } = await supabase
        .from('issues')
        .update({ status, department, category })
        .eq('id', issue.id);

      if (error) throw error;

      toast({ title: "Issue Updated", description: "The issue details have been saved." });
      onIssueUpdate();
      onClose();

    } catch (error: any) {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Issue Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <p><strong>Title:</strong> {issue.title}</p>
          <p><strong>Description:</strong> {issue.description}</p>
          <p><strong>Location:</strong> {issue.location}</p>
          {issue.photo_url && <img src={issue.photo_url} alt="Issue" className="rounded-lg w-full object-contain"/>}

          <div className="pt-4">
            <Button onClick={handleCategorize} disabled={isCategorizing}>
              {isCategorizing ? "Analyzing..." : "Categorize with AI"}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger><SelectValue placeholder="Assign Department" /></SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue placeholder="Assign Category" /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <Select value={status} onValueChange={(value) => setStatus(value as Issue['status'])}>
            <SelectTrigger><SelectValue placeholder="Update Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IssueDetailModal;
