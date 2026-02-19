-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('super_admin', 'department_admin', 'editor', 'lecturer', 'student');

-- Create enum for resource types
CREATE TYPE public.resource_type AS ENUM ('course_material', 'study_material', 'past_question', 'student_project');

-- Create enum for resource levels
CREATE TYPE public.resource_level AS ENUM ('100L', '200L', '300L', '400L');

-- Create enum for article status
CREATE TYPE public.article_status AS ENUM ('draft', 'review', 'published');

-- Departments table
CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT DEFAULT 'BookOpen',
  color TEXT DEFAULT '#006400',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  department_id UUID REFERENCES public.departments(id),
  level public.resource_level,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Resources table
CREATE TABLE public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  level public.resource_level NOT NULL,
  type public.resource_type NOT NULL,
  file_url TEXT,
  file_type TEXT DEFAULT 'PDF',
  file_size TEXT,
  course_code TEXT,
  author TEXT,
  year INTEGER,
  supervisor TEXT,
  download_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Newspaper articles table
CREATE TABLE public.newspaper_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  image_url TEXT,
  author TEXT NOT NULL,
  status public.article_status DEFAULT 'draft',
  read_time TEXT DEFAULT '5 min read',
  tags TEXT[],
  created_by UUID REFERENCES auth.users(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Bookmarks table
CREATE TABLE public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, resource_id)
);

-- Resource downloads tracking
CREATE TABLE public.resource_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE NOT NULL,
  downloaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newspaper_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_downloads ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Security definer function to check if user has any admin role
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('super_admin', 'department_admin', 'editor', 'lecturer')
  )
$$;

-- Function to get user's department
CREATE OR REPLACE FUNCTION public.get_user_department(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT department_id
  FROM public.profiles
  WHERE user_id = _user_id
$$;

-- RLS Policies for departments (public read)
CREATE POLICY "Departments are viewable by everyone" ON public.departments
  FOR SELECT USING (true);

CREATE POLICY "Super admins can manage departments" ON public.departments
  FOR ALL USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_roles (only viewable by owner or super_admin)
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for resources (public read)
CREATE POLICY "Resources are viewable by everyone" ON public.resources
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert resources" ON public.resources
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update resources" ON public.resources
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete resources" ON public.resources
  FOR DELETE USING (public.is_admin(auth.uid()));

-- RLS Policies for newspaper_articles (public read for published)
CREATE POLICY "Published articles are viewable by everyone" ON public.newspaper_articles
  FOR SELECT USING (status = 'published' OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert articles" ON public.newspaper_articles
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update articles" ON public.newspaper_articles
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete articles" ON public.newspaper_articles
  FOR DELETE USING (public.is_admin(auth.uid()));

-- RLS Policies for bookmarks
CREATE POLICY "Users can view their own bookmarks" ON public.bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookmarks" ON public.bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks" ON public.bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for resource_downloads
CREATE POLICY "Users can view their own downloads" ON public.resource_downloads
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

CREATE POLICY "Anyone can record a download" ON public.resource_downloads
  FOR INSERT WITH CHECK (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_departments_updated_at
  BEFORE UPDATE ON public.departments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_newspaper_articles_updated_at
  BEFORE UPDATE ON public.newspaper_articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  
  -- Assign default student role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert the 11 departments
INSERT INTO public.departments (name, slug, description, icon) VALUES
  ('Biology', 'biology', 'Study of living organisms and their interactions with the environment.', 'Leaf'),
  ('Chemistry', 'chemistry', 'Study of matter, its properties, composition, and reactions.', 'FlaskConical'),
  ('Computer Education', 'computer-education', 'Integration of computer science with educational methodologies.', 'Monitor'),
  ('EDSE', 'edse', 'Educational Studies and Evaluation department.', 'GraduationCap'),
  ('Gens', 'gens', 'General Studies department for foundational courses.', 'BookOpen'),
  ('Geology', 'geology', 'Study of Earth, its materials, processes, and history.', 'Mountain'),
  ('Mathematics', 'mathematics', 'Study of numbers, quantities, structures, and patterns.', 'Calculator'),
  ('Physics', 'physics', 'Study of matter, energy, and the fundamental forces of nature.', 'Atom'),
  ('Zoology', 'zoology', 'Study of animals, their behavior, structure, and classification.', 'Bug'),
  ('Statistics', 'statistics', 'Collection, analysis, and interpretation of numerical data.', 'BarChart3'),
  ('SEIT', 'seit', 'Science Education and Information Technology department.', 'Cpu');