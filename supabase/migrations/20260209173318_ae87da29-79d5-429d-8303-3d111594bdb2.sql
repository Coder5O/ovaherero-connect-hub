
-- Drop the overly permissive public SELECT policy
DROP POLICY "Approved members are public" ON public.members;

-- Create a public view with only non-sensitive fields
CREATE VIEW public.members_directory
WITH (security_invoker = on) AS
SELECT id, first_name, last_name, branch, gender, created_at
FROM public.members
WHERE status = 'approved';

-- Grant access to the view
GRANT SELECT ON public.members_directory TO anon, authenticated;

-- Add a restrictive policy so unauthenticated users cannot directly SELECT from members table
-- (Admins retain access via existing "Admins can view all members" policy)
