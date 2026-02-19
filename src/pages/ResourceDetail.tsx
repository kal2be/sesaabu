import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  FileText, Download, Eye, Clock, User, Calendar,
  Bookmark, BookmarkCheck, ArrowLeft, FolderOpen, Share2
} from "lucide-react";
import { useResource, useRecordDownload, useToggleBookmark, useBookmarks } from "@/hooks/useResources";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const typeLabels: Record<string, string> = {
  course_material: 'Course Material',
  study_material: 'Study Material',
  past_question: 'Past Question',
  student_project: 'Student Project',
};

const ResourceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data: resource, isLoading } = useResource(id || '');
  const { data: bookmarks = [] } = useBookmarks(user?.id);
  const recordDownload = useRecordDownload();
  const toggleBookmark = useToggleBookmark();

  const isBookmarked = bookmarks.some((b: any) => b.resource_id === id);

  const handleDownload = async () => {
    if (!resource) return;
    
    try {
      await recordDownload.mutateAsync({ 
        resourceId: resource.id, 
        userId: user?.id 
      });
      
      if (resource.file_url) {
        window.open(resource.file_url, '_blank');
      } else {
        toast.info('This is a sample resource. File download not available.');
      }
    } catch (error) {
      toast.error('Failed to record download');
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      toast.error('Please sign in to bookmark resources');
      return;
    }
    
    try {
      await toggleBookmark.mutateAsync({
        resourceId: id!,
        userId: user.id,
        isBookmarked,
      });
      toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-96 mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  if (!resource) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
          <p className="text-muted-foreground mb-8">The resource you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/library">Browse Library</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const department = (resource as any).departments;

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary/50 border-b">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/library">Library</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {department && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`/departments/${department.slug}`}>{department.name}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-[200px] truncate">{resource.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/library">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Library
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>{typeLabels[resource.type]}</Badge>
                  <Badge variant="outline">{resource.level}</Badge>
                  <Badge variant="secondary">{resource.file_type}</Badge>
                </div>
                <CardTitle className="font-display text-2xl md:text-3xl">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {resource.description && (
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{resource.description}</p>
                  </div>
                )}

                {resource.type === 'student_project' && resource.supervisor && (
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Project Information</h3>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      {resource.author && (
                        <div>
                          <span className="text-muted-foreground">Student:</span>
                          <p className="font-medium">{resource.author}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground">Supervisor:</span>
                        <p className="font-medium">{resource.supervisor}</p>
                      </div>
                      {resource.year && (
                        <div>
                          <span className="text-muted-foreground">Year:</span>
                          <p className="font-medium">{resource.year}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Preview Placeholder */}
                <div className="border-2 border-dashed rounded-xl p-12 text-center bg-secondary/30">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Preview not available for this file type.
                  </p>
                  <Button onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download to View
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions Card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <Button className="w-full" size="lg" onClick={handleDownload}>
                  <Download className="h-5 w-5 mr-2" />
                  Download Resource
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleBookmark}
                >
                  {isBookmarked ? (
                    <>
                      <BookmarkCheck className="h-5 w-5 mr-2" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-5 w-5 mr-2" />
                      Save for Later
                    </>
                  )}
                </Button>
                <Button variant="ghost" className="w-full">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </CardContent>
            </Card>

            {/* Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resource Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {department && (
                  <div className="flex items-center gap-3">
                    <FolderOpen className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Department</p>
                      <Link 
                        to={`/departments/${department.slug}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {department.name}
                      </Link>
                    </div>
                  </div>
                )}
                
                {resource.course_code && (
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Course Code</p>
                      <p className="font-medium">{resource.course_code}</p>
                    </div>
                  </div>
                )}

                {resource.author && (
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Author</p>
                      <p className="font-medium">{resource.author}</p>
                    </div>
                  </div>
                )}

                {resource.file_size && (
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">File Size</p>
                      <p className="font-medium">{resource.file_size}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Downloads</p>
                    <p className="font-medium">{resource.download_count || 0}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Uploaded</p>
                    <p className="font-medium">
                      {new Date(resource.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourceDetail;
