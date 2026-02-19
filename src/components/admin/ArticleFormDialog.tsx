import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateArticle, useUpdateArticle, ArticleFormData } from '@/hooks/useAdminData';
import { FileUpload } from '@/components/FileUpload';

const formSchema = z.object({
  department_id: z.string().min(1, 'Department is required'),
  title: z.string().min(1, 'Title is required'),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  author: z.string().min(1, 'Author is required'),
  image_url: z.string().optional(),
  status: z.enum(['draft', 'published'] as const),
  published_at: z.string().optional(),
  read_time: z.string().optional(),
  tags: z.string().optional(),
});

interface ArticleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article?: any;
  departments: { id: string; name: string }[];
}

export function ArticleFormDialog({ 
  open, 
  onOpenChange, 
  article, 
  departments 
}: ArticleFormDialogProps) {
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department_id: '',
      title: '',
      content: '',
      excerpt: '',
      author: '',
      image_url: '',
      status: 'draft',
      published_at: '',
      read_time: '5 min read',
      tags: '',
    },
  });

  useEffect(() => {
    if (article) {
      form.reset({
        department_id: article.department_id,
        title: article.title,
        content: article.content || '',
        excerpt: article.excerpt || '',
        author: article.author,
        image_url: article.image_url || '',
        status: article.status,
        published_at: article.published_at ? new Date(article.published_at).toISOString().slice(0, 16) : '',
        read_time: article.read_time || '5 min read',
        tags: article.tags?.join(', ') || '',
      });
    } else {
      form.reset({
        department_id: '',
        title: '',
        content: '',
        excerpt: '',
        author: '',
        image_url: '',
        status: 'draft',
        published_at: '',
        read_time: '5 min read',
        tags: '',
      });
    }
  }, [article, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data: ArticleFormData = {
      department_id: values.department_id,
      title: values.title,
      content: values.content || undefined,
      excerpt: values.excerpt || undefined,
      author: values.author,
      image_url: values.image_url || undefined,
      status: values.status,
      published_at: values.published_at || undefined,
      read_time: values.read_time || undefined,
      tags: values.tags ? values.tags.split(',').map(t => t.trim()).filter(Boolean) : undefined,
    };

    if (article) {
      await updateArticle.mutateAsync({ id: article.id, data });
    } else {
      await createArticle.mutateAsync(data);
    }
    onOpenChange(false);
  };

  const isLoading = createArticle.isPending || updateArticle.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{article ? 'Edit Article' : 'Add New Article'}</DialogTitle>
          <DialogDescription>
            {article ? 'Update the article details below.' : 'Fill in the details for the new article.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="department_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Article title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief summary of the article" rows={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Full article content" rows={8} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="read_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Read Time</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 5 min read" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Article Image</Label>
              <FileUpload
                bucket="article-images"
                accept="image/*"
                label="Upload Image"
                currentUrl={form.watch('image_url')}
                onUploadComplete={(url) => {
                  form.setValue('image_url', url);
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (or paste manually)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="published_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publish Date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="tag1, tag2, tag3 (comma separated)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : article ? 'Update Article' : 'Create Article'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
