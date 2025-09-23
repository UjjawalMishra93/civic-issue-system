-- Add district and upvotes to issues table
ALTER TABLE public.issues
ADD COLUMN district TEXT,
ADD COLUMN upvotes INTEGER DEFAULT 0;

-- Create a table to track upvotes
CREATE TABLE public.issue_upvotes (
    issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    PRIMARY KEY (issue_id, user_id)
);

-- Enable RLS for the new table
ALTER TABLE public.issue_upvotes ENABLE ROW LEVEL SECURITY;

-- Policies for issue_upvotes
CREATE POLICY "Public can view upvotes" ON public.issue_upvotes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert upvotes" ON public.issue_upvotes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own upvotes" ON public.issue_upvotes FOR DELETE USING (auth.uid() = user_id);
