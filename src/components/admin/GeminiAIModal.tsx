import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
}

interface GeminiAIModalProps {
  issues: Issue[];
  isOpen: boolean;
  onClose: () => void;
}

const GeminiAIModal = ({ issues, isOpen, onClose }: GeminiAIModalProps) => {
  const { toast } = useToast();
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const quickAnalysisOptions = [
    {
      label: "Categorize Issue",
      prompt: "Based on the issue description and location, suggest a primary and secondary category, and the most relevant government department to handle this issue. Provide the reasoning for your suggestions.",
    },
    {
      label: "Assess Urgency",
      prompt: "Analyze the urgency of this issue based on its description. Consider potential risks to public safety, property damage, and disruption of essential services. Classify the urgency as Low, Medium, or High, and explain your reasoning.",
    },
    {
      label: "Suggest Solutions",
      prompt: "Based on the issue description, suggest three potential solutions to resolve it. For each solution, provide a brief overview, estimated effort, and potential challenges.",
    },
    {
      label: "Impact Assessment",
      prompt: "Analyze the potential impact of this issue if left unresolved. Consider the social, economic, and environmental consequences. Provide a summary of the key impacts.",
    },
  ];

  const handleAnalyze = async () => {
    if (!selectedIssueId) {
      toast({ title: "Please select an issue", variant: "destructive" });
      return;
    }
    if (!prompt) {
      toast({ title: "Please enter a prompt", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult("");
    try {
      const selectedIssue = issues.find(issue => issue.id === selectedIssueId);

      const { data, error } = await supabase.functions.invoke("analyze-issue", {
        body: {
          issue: selectedIssue,
          prompt: prompt,
        },
      });

      if (error) throw error;

      setAnalysisResult(data.analysis);
      toast({ title: "Analysis Complete", description: "The AI has provided its analysis." });

    } catch (error: any) {
      toast({ title: "Analysis Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleReset = () => {
    setSelectedIssueId(null);
    setPrompt("");
    setAnalysisResult("");
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>AI Issue Analyzer</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="font-medium">Select Issue to Analyze</label>
              <Select onValueChange={setSelectedIssueId} value={selectedIssueId || undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an issue for AI analysis" />
                </SelectTrigger>
                <SelectContent>
                  {issues.map(issue => (
                    <SelectItem key={issue.id} value={issue.id}>{issue.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="font-medium">Quick Analysis Options</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {quickAnalysisOptions.map(option => (
                  <Button key={option.label} variant="outline" onClick={() => setPrompt(option.prompt)}>
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium">Analysis Prompt</label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your custom analysis request or use one of the quick options above..."
                rows={6}
                className="mt-2"
              />
            </div>

            <div className="flex items-center space-x-2">
                <Button onClick={handleAnalyze} disabled={isAnalyzing || !selectedIssueId}>
                  {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
                </Button>
                 <Button variant="secondary" onClick={handleReset}>Reset</Button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="font-medium">AI Analysis Result</label>
            <div className="prose dark:prose-invert p-4 border rounded-md min-h-[200px] bg-muted/20 overflow-y-auto max-h-[400px]">
              {isAnalyzing ? <span className="text-muted-foreground">AI is thinking...</span> : <ReactMarkdown remarkPlugins={[remarkGfm]}>{analysisResult}</ReactMarkdown>}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GeminiAIModal;
