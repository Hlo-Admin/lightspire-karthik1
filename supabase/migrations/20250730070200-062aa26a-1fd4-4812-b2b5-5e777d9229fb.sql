
-- Create a table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for scheduled calls
CREATE TABLE public.scheduled_calls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  project_details TEXT,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'IST',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add indexes for better query performance
CREATE INDEX idx_contact_submissions_email ON public.contact_submissions(email);
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at);
CREATE INDEX idx_scheduled_calls_email ON public.scheduled_calls(email);
CREATE INDEX idx_scheduled_calls_date ON public.scheduled_calls(scheduled_date);
CREATE INDEX idx_scheduled_calls_created_at ON public.scheduled_calls(created_at);

-- Enable Row Level Security (optional - since these are public contact forms, we'll allow anonymous access)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_calls ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anonymous users to insert data (for public contact forms)
CREATE POLICY "Allow anonymous contact submissions" 
  ON public.contact_submissions 
  FOR INSERT 
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous call scheduling" 
  ON public.scheduled_calls 
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Create policies to allow authenticated users to view all submissions (for admin purposes)
CREATE POLICY "Authenticated users can view contact submissions" 
  ON public.contact_submissions 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view scheduled calls" 
  ON public.scheduled_calls 
  FOR SELECT 
  TO authenticated
  USING (true);
