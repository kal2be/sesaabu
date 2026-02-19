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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateResource, useUpdateResource, ResourceFormData } from '@/hooks/useAdminData';
import { Database } from '@/integrations/supabase/types';
import { FileUpload } from '@/components/FileUpload';
import { Label } from '@/components/ui/label';

type ResourceLevel = Database['public']['Enums']['resource_level'];
type ResourceType = Database['public']['Enums']['resource_type'];

const formSchema = z.object({
  department_id: z.string().min(1, 'Department is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  level: z.enum(['100L', '200L', '300L', '400L'] as const),
  type: z.enum(['course_material', 'study_material', 'past_question', 'student_project'] as const),
  file_url: z.string().optional(),
  file_type: z.string().optional(),
  file_size: z.string().optional(),
  course_code: z.string().optional(),
  author: z.string().optional(),
  year: z.coerce.number().optional(),
  supervisor: z.string().optional(),
});

interface ResourceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resource?: any;
  departments: { id: string; name: string }[];
}

export function ResourceFormDialog({ 
  open, 
  onOpenChange, 
  resource, 
  departments 
}: ResourceFormDialogProps) {
  const createResource = useCreateResource();
  const updateResource = useUpdateResource();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department_id: '',
      title: '',
      description: '',
      level: '100L',
      type: 'course_material',
      file_url: '',
      file_type: 'PDF',
      file_size: '',
      course_code: '',
      author: '',
      year: undefined,
      supervisor: '',
    },
  });

  useEffect(() => {
    if (resource) {
      form.reset({
        department_id: resource.department_id,
        title: resource.title,
        description: resource.description || '',
        level: resource.level,
        type: resource.type,
        file_url: resource.file_url || '',
        file_type: resource.file_type || 'PDF',
        file_size: resource.file_size || '',
        course_code: resource.course_code || '',
        author: resource.author || '',
        year: resource.year || undefined,
        supervisor: resource.supervisor || '',
      });
    } else {
      form.reset({
        department_id: '',
        title: '',
        description: '',
        level: '100L',
        type: 'course_material',
        file_url: '',
        file_type: 'PDF',
        file_size: '',
        course_code: '',
        author: '',
        year: undefined,
        supervisor: '',
      });
    }
  }, [resource, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data: ResourceFormData = {
      department_id: values.department_id,
      title: values.title,
      level: values.level,
      type: values.type,
      description: values.description || undefined,
      file_url: values.file_url || undefined,
      file_type: values.file_type || undefined,
      file_size: values.file_size || undefined,
      course_code: values.course_code || undefined,
      author: values.author || undefined,
      year: values.year || undefined,
      supervisor: values.supervisor || undefined,
    };

    if (resource) {
      await updateResource.mutateAsync({ id: resource.id, data });
    } else {
      await createResource.mutateAsync(data);
    }
    onOpenChange(false);
  };

  const isLoading = createResource.isPending || updateResource.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{resource ? 'Edit Resource' : 'Add New Resource'}</DialogTitle>
          <DialogDescription>
            {resource ? 'Update the resource details below.' : 'Fill in the details for the new resource.'}
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
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="100L">100 Level</SelectItem>
                        <SelectItem value="200L">200 Level</SelectItem>
                        <SelectItem value="300L">300 Level</SelectItem>
                        <SelectItem value="400L">400 Level</SelectItem>
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
                    <Input placeholder="Resource title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description of the resource" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="course_material">Course Material</SelectItem>
                        <SelectItem value="study_material">Study Material</SelectItem>
                        <SelectItem value="past_question">Past Question</SelectItem>
                        <SelectItem value="student_project">Student Project</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="course_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., BIO 101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Upload PDF File</Label>
              <FileUpload
                bucket="resources"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                label="Upload Resource File"
                currentUrl={form.watch('file_url')}
                onUploadComplete={(url, name, size) => {
                  form.setValue('file_url', url);
                  form.setValue('file_size', size);
                  const ext = name.split('.').pop()?.toUpperCase() || 'PDF';
                  form.setValue('file_type', ext);
                }}
              />
              {form.watch('file_url') && (
                <p className="text-xs text-muted-foreground truncate">
                  {form.watch('file_url')}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="file_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File URL (or paste manually)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File Type</FormLabel>
                    <FormControl>
                      <Input placeholder="PDF, DOCX, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File Size</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2.5 MB" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
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
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="supervisor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supervisor</FormLabel>
                    <FormControl>
                      <Input placeholder="For projects" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : resource ? 'Update Resource' : 'Create Resource'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
