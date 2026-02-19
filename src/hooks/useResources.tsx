import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type ResourceLevel = Database['public']['Enums']['resource_level'];
type ResourceType = Database['public']['Enums']['resource_type'];

export interface Resource {
  id: string;
  department_id: string;
  title: string;
  description: string | null;
  level: ResourceLevel;
  type: ResourceType;
  file_url: string | null;
  file_type: string | null;
  file_size: string | null;
  course_code: string | null;
  author: string | null;
  year: number | null;
  supervisor: string | null;
  download_count: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

interface ResourceFilters {
  departmentId?: string;
  level?: ResourceLevel;
  type?: ResourceType;
  search?: string;
}

export function useResources(filters?: ResourceFilters) {
  return useQuery({
    queryKey: ['resources', filters],
    queryFn: async () => {
      let query = supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (filters?.departmentId) {
        query = query.eq('department_id', filters.departmentId);
      }
      if (filters?.level) {
        query = query.eq('level', filters.level);
      }
      if (filters?.type) {
        query = query.eq('type', filters.type);
      }
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,course_code.ilike.%${filters.search}%`);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Resource[];
    },
  });
}

export function useResource(id: string) {
  return useQuery({
    queryKey: ['resource', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*, departments(name, slug)')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useRecordDownload() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ resourceId, userId }: { resourceId: string; userId?: string }) => {
      // Record the download
      await supabase
        .from('resource_downloads')
        .insert({ resource_id: resourceId, user_id: userId });
      
      // Increment download count
      const { data: resource } = await supabase
        .from('resources')
        .select('download_count')
        .eq('id', resourceId)
        .single();
      
      if (resource) {
        await supabase
          .from('resources')
          .update({ download_count: (resource.download_count || 0) + 1 })
          .eq('id', resourceId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
  });
}

export function useBookmarks(userId?: string) {
  return useQuery({
    queryKey: ['bookmarks', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*, resources(*)')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}

export function useToggleBookmark() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ resourceId, userId, isBookmarked }: { resourceId: string; userId: string; isBookmarked: boolean }) => {
      if (isBookmarked) {
        await supabase
          .from('bookmarks')
          .delete()
          .eq('resource_id', resourceId)
          .eq('user_id', userId);
      } else {
        await supabase
          .from('bookmarks')
          .insert({ resource_id: resourceId, user_id: userId });
      }
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks', userId] });
    },
  });
}
