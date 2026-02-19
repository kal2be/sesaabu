import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  User, BookmarkIcon, Download, Settings, FileText,
  Calendar, Loader2, BookOpen, Clock
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile, useUpdateProfile, useDownloadHistory } from '@/hooks/useProfile';
import { useBookmarks } from '@/hooks/useResources';
import { useDepartments } from '@/hooks/useDepartments';
import LoadingPage from '@/components/LoadingPage';
import { Navigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'sonner';

const Profile = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile(user?.id);
  const { data: bookmarks, isLoading: bookmarksLoading } = useBookmarks(user?.id);
  const { data: downloads, isLoading: downloadsLoading } = useDownloadHistory(user?.id);
  const { data: departments } = useDepartments();
  const updateProfile = useUpdateProfile();

  const [fullName, setFullName] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setDepartmentId(profile.department_id || '');
      setLevel(profile.level || '');
    }
  }, [profile]);

  if (authLoading || profileLoading) return <LoadingPage />;
  if (!user) return <Navigate to="/login" replace />;

  const handleSaveProfile = async () => {
    await updateProfile.mutateAsync({
      userId: user.id,
      data: {
        full_name: fullName || undefined,
        department_id: departmentId || null,
        level: (level as any) || null,
      },
    });
  };

  return (
    <Layout>
      <section className="py-12 md:py-16 section-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {profile?.full_name || 'Student'}
                </h1>
                <p className="text-muted-foreground">{user.email}</p>
                {(profile as any)?.departments?.name && (
                  <Badge variant="outline" className="mt-1">
                    {(profile as any).departments.name}
                    {profile?.level ? ` • ${profile.level}` : ''}
                  </Badge>
                )}
              </div>
            </div>

            <Tabs defaultValue="bookmarks" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bookmarks">
                  <BookmarkIcon className="h-4 w-4 mr-2" />
                  Bookmarks
                </TabsTrigger>
                <TabsTrigger value="downloads">
                  <Download className="h-4 w-4 mr-2" />
                  Downloads
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Bookmarks Tab */}
              <TabsContent value="bookmarks">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Resources</CardTitle>
                    <CardDescription>Resources you've bookmarked for later</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {bookmarksLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    ) : !bookmarks || bookmarks.length === 0 ? (
                      <div className="text-center py-8">
                        <BookmarkIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">No bookmarks yet</p>
                        <Button variant="link" asChild className="mt-2">
                          <Link to="/library">Browse Library</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {bookmarks.map((bookmark: any) => (
                          <div key={bookmark.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                            <div className="flex items-center gap-3 min-w-0">
                              <FileText className="h-5 w-5 text-primary shrink-0" />
                              <div className="min-w-0">
                                <Link
                                  to={`/resources/${bookmark.resource_id}`}
                                  className="text-sm font-medium hover:text-primary transition-colors truncate block"
                                >
                                  {bookmark.resources?.title || 'Unknown Resource'}
                                </Link>
                                <p className="text-xs text-muted-foreground">
                                  {bookmark.resources?.file_type || 'PDF'} •
                                  Saved {format(new Date(bookmark.created_at), 'MMM d, yyyy')}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Downloads Tab */}
              <TabsContent value="downloads">
                <Card>
                  <CardHeader>
                    <CardTitle>Download History</CardTitle>
                    <CardDescription>Resources you've downloaded</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {downloadsLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    ) : !downloads || downloads.length === 0 ? (
                      <div className="text-center py-8">
                        <Download className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">No downloads yet</p>
                        <Button variant="link" asChild className="mt-2">
                          <Link to="/library">Browse Library</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {downloads.map((dl: any) => (
                          <div key={dl.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3 min-w-0">
                              <Download className="h-5 w-5 text-primary shrink-0" />
                              <div className="min-w-0">
                                <Link
                                  to={`/resources/${dl.resource_id}`}
                                  className="text-sm font-medium hover:text-primary transition-colors truncate block"
                                >
                                  {dl.resources?.title || 'Unknown Resource'}
                                </Link>
                                <p className="text-xs text-muted-foreground">
                                  {dl.resources?.departments?.name || ''} •
                                  {format(new Date(dl.downloaded_at), 'MMM d, yyyy h:mm a')}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Update your department and level preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input value={user.email || ''} disabled />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Department</Label>
                        <Select value={departmentId} onValueChange={setDepartmentId}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments?.map((dept) => (
                              <SelectItem key={dept.id} value={dept.id}>
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Level</Label>
                        <Select value={level} onValueChange={setLevel}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="100L">100 Level</SelectItem>
                            <SelectItem value="200L">200 Level</SelectItem>
                            <SelectItem value="300L">300 Level</SelectItem>
                            <SelectItem value="400L">400 Level</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <Button
                      onClick={handleSaveProfile}
                      disabled={updateProfile.isPending}
                    >
                      {updateProfile.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
