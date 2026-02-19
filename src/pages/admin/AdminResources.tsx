import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Download } from 'lucide-react';
import { useAdminResources, useDeleteResource } from '@/hooks/useAdminData';
import { useDepartments } from '@/hooks/useDepartments';
import LoadingSpinner from '@/components/LoadingSpinner';
import { format } from 'date-fns';
import { ResourceFormDialog } from '@/components/admin/ResourceFormDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function AdminResources() {
  const { data: resources, isLoading } = useAdminResources();
  const { data: departments } = useDepartments();
  const deleteResource = useDeleteResource();
  
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState<string | null>(null);

  const filteredResources = resources?.filter(resource => 
    resource.title.toLowerCase().includes(search.toLowerCase()) ||
    resource.course_code?.toLowerCase().includes(search.toLowerCase()) ||
    resource.departments?.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleEdit = (resource: any) => {
    setEditingResource(resource);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setResourceToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (resourceToDelete) {
      deleteResource.mutate(resourceToDelete);
      setDeleteDialogOpen(false);
      setResourceToDelete(null);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingResource(null);
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'course_material': return 'default';
      case 'past_question': return 'secondary';
      case 'project': return 'outline';
      default: return 'default';
    }
  };

  return (
    <AdminLayout 
      title="Resources" 
      breadcrumbs={[{ label: 'Resources' }]}
    >
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Button>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Course Code</TableHead>
                  <TableHead className="text-center">Downloads</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResources.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      No resources found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {resource.title}
                      </TableCell>
                      <TableCell>{resource.departments?.name}</TableCell>
                      <TableCell>{resource.level}</TableCell>
                      <TableCell>
                        <Badge variant={getTypeBadgeVariant(resource.type)}>
                          {resource.type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{resource.course_code || '-'}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Download className="h-3 w-3" />
                          {resource.download_count}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(resource.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(resource)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(resource.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Resource Form Dialog */}
      <ResourceFormDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        resource={editingResource}
        departments={departments || []}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resource</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this resource? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
