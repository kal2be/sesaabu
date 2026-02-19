import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useArticleLikes(articleId: string) {
  return useQuery({
    queryKey: ['article-likes', articleId],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('article_likes')
        .select('*', { count: 'exact', head: true })
        .eq('article_id', articleId);
      if (error) throw error;
      return count || 0;
    },
    enabled: !!articleId,
  });
}

export function useUserLiked(articleId: string, userId?: string) {
  return useQuery({
    queryKey: ['user-liked', articleId, userId],
    queryFn: async () => {
      if (!userId) return false;
      const { data, error } = await supabase
        .from('article_likes')
        .select('id')
        .eq('article_id', articleId)
        .eq('user_id', userId)
        .maybeSingle();
      if (error) throw error;
      return !!data;
    },
    enabled: !!articleId && !!userId,
  });
}

export function useToggleLike() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ articleId, userId, isLiked }: { articleId: string; userId: string; isLiked: boolean }) => {
      if (isLiked) {
        const { error } = await supabase
          .from('article_likes')
          .delete()
          .eq('article_id', articleId)
          .eq('user_id', userId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('article_likes')
          .insert({ article_id: articleId, user_id: userId });
        if (error) throw error;
      }
    },
    onSuccess: (_, { articleId, userId }) => {
      queryClient.invalidateQueries({ queryKey: ['article-likes', articleId] });
      queryClient.invalidateQueries({ queryKey: ['user-liked', articleId, userId] });
    },
  });
}

export function useArticleComments(articleId: string) {
  return useQuery({
    queryKey: ['article-comments', articleId],
    queryFn: async () => {
      const { data: comments, error } = await supabase
        .from('article_comments')
        .select('*')
        .eq('article_id', articleId)
        .order('created_at', { ascending: true });
      if (error) throw error;

      // Fetch profile names for comment authors
      if (comments && comments.length > 0) {
        const userIds = [...new Set(comments.map(c => c.user_id))];
        const { data: profiles } = await supabase
          .from('profiles')
          .select('user_id, full_name')
          .in('user_id', userIds);

        const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);
        return comments.map(c => ({
          ...c,
          profiles: profileMap.get(c.user_id) || { full_name: 'Anonymous' },
        }));
      }
      return comments;
    },
    enabled: !!articleId,
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ articleId, userId, content }: { articleId: string; userId: string; content: string }) => {
      const { error } = await supabase
        .from('article_comments')
        .insert({ article_id: articleId, user_id: userId, content });
      if (error) throw error;
    },
    onSuccess: (_, { articleId }) => {
      queryClient.invalidateQueries({ queryKey: ['article-comments', articleId] });
      toast.success('Comment added');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ commentId, articleId }: { commentId: string; articleId: string }) => {
      const { error } = await supabase
        .from('article_comments')
        .delete()
        .eq('id', commentId);
      if (error) throw error;
    },
    onSuccess: (_, { articleId }) => {
      queryClient.invalidateQueries({ queryKey: ['article-comments', articleId] });
      toast.success('Comment deleted');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
