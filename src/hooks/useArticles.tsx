import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type ArticleStatus = Database['public']['Enums']['article_status'];

export interface Article {
  id: string;
  department_id: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  image_url: string | null;
  author: string;
  status: ArticleStatus;
  read_time: string | null;
  tags: string[] | null;
  created_by: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface ArticleFilters {
  departmentId?: string;
  status?: ArticleStatus;
  search?: string;
  limit?: number;
}

export function useArticles(filters?: ArticleFilters) {
  return useQuery({
    queryKey: ['articles', filters],
    queryFn: async () => {
      let query = supabase
        .from('newspaper_articles')
        .select('*, departments(name, slug)')
        .order('published_at', { ascending: false, nullsFirst: false });
      
      if (filters?.departmentId) {
        query = query.eq('department_id', filters.departmentId);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
      }
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useArticle(id: string) {
  return useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newspaper_articles')
        .select('*, departments(name, slug)')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}
