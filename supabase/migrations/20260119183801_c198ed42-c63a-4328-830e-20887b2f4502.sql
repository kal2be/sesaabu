-- Fix the permissive RLS policy for resource_downloads
DROP POLICY IF EXISTS "Anyone can record a download" ON public.resource_downloads;

-- Create a more secure policy - allow authenticated users to record their own downloads
CREATE POLICY "Authenticated users can record downloads" ON public.resource_downloads
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND (user_id IS NULL OR user_id = auth.uid()));