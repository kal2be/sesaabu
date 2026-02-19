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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Search, MoreHorizontal, Shield, ShieldCheck, ShieldX, User } from 'lucide-react';
import { useAdminUsers, useUpdateUserRole } from '@/hooks/useAdminData';
import { useDepartments } from '@/hooks/useDepartments';
import LoadingSpinner from '@/components/LoadingSpinner';
import { format } from 'date-fns';
import { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

const allRoles: AppRole[] = ['super_admin', 'department_admin', 'editor', 'lecturer', 'student'];

const roleLabels: Record<AppRole, string> = {
  super_admin: 'Super Admin',
  department_admin: 'Dept Admin',
  editor: 'Editor',
  lecturer: 'Lecturer',
  student: 'Student',
};

const roleBadgeVariants: Record<AppRole, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  super_admin: 'destructive',
  department_admin: 'default',
  editor: 'secondary',
  lecturer: 'secondary',
  student: 'outline',
};

export default function AdminUsers() {
  const { data: users, isLoading } = useAdminUsers();
  const { data: departments } = useDepartments();
  const updateUserRole = useUpdateUserRole();
  
  const [search, setSearch] = useState('');

  const filteredUsers = users?.filter(user => 
    user.profile?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    user.roles.some(r => roleLabels[r].toLowerCase().includes(search.toLowerCase()))
  ) || [];

  const getDepartmentName = (departmentId: string | null) => {
    if (!departmentId) return 'Not assigned';
    const dept = departments?.find(d => d.id === departmentId);
    return dept?.name || 'Unknown';
  };

  const handleToggleRole = (userId: string, role: AppRole, hasRole: boolean) => {
    updateUserRole.mutate({ 
      userId, 
      role, 
      action: hasRole ? 'remove' : 'add' 
    });
  };

  return (
    <AdminLayout 
      title="Users" 
      breadcrumbs={[{ label: 'Users' }]}
    >
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="font-medium">
                            {user.profile?.full_name || 'Unknown User'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getDepartmentName(user.profile?.department_id || null)}</TableCell>
                      <TableCell>{user.profile?.level || '-'}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.roles.length === 0 ? (
                            <Badge variant="outline">No roles</Badge>
                          ) : (
                            user.roles.map((role) => (
                              <Badge key={role} variant={roleBadgeVariants[role]}>
                                {roleLabels[role]}
                              </Badge>
                            ))
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(user.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <Shield className="h-4 w-4 mr-2" />
                                Manage Roles
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                {allRoles.map((role) => {
                                  const hasRole = user.roles.includes(role);
                                  return (
                                    <DropdownMenuItem 
                                      key={role}
                                      onClick={() => handleToggleRole(user.id, role, hasRole)}
                                    >
                                      {hasRole ? (
                                        <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                                      ) : (
                                        <ShieldX className="h-4 w-4 mr-2 text-muted-foreground" />
                                      )}
                                      {roleLabels[role]}
                                      {hasRole && <span className="ml-auto text-xs text-muted-foreground">Active</span>}
                                    </DropdownMenuItem>
                                  );
                                })}
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
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
    </AdminLayout>
  );
}
