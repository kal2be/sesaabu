
-- Article Likes table
CREATE TABLE public.article_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.newspaper_articles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(article_id, user_id)
);

ALTER TABLE public.article_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view likes" ON public.article_likes
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can like" ON public.article_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike their own" ON public.article_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Article Comments table
CREATE TABLE public.article_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.newspaper_articles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.article_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments" ON public.article_comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can comment" ON public.article_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON public.article_comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments or admins" ON public.article_comments
  FOR DELETE USING (auth.uid() = user_id OR is_admin(auth.uid()));

CREATE TRIGGER update_article_comments_updated_at
  BEFORE UPDATE ON public.article_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('resources', 'resources', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('article-images', 'article-images', true);

-- Storage policies for resources bucket
CREATE POLICY "Anyone can view resources files" ON storage.objects
  FOR SELECT USING (bucket_id = 'resources');

CREATE POLICY "Admins can upload resources" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'resources' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update resources files" ON storage.objects
  FOR UPDATE USING (bucket_id = 'resources' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete resources files" ON storage.objects
  FOR DELETE USING (bucket_id = 'resources' AND is_admin(auth.uid()));

-- Storage policies for article-images bucket
CREATE POLICY "Anyone can view article images" ON storage.objects
  FOR SELECT USING (bucket_id = 'article-images');

CREATE POLICY "Admins can upload article images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'article-images' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update article images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'article-images' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete article images" ON storage.objects
  FOR DELETE USING (bucket_id = 'article-images' AND is_admin(auth.uid()));
