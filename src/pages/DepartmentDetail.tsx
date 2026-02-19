import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  BookOpen, FileText, Download, Eye, Clock, Users, 
  Newspaper, FolderOpen, ChevronRight, Search, Bookmark,
  Leaf, FlaskConical, Monitor, GraduationCap, Mountain,
  Calculator, Atom, Bug, BarChart3, Cpu, Beaker
} from "lucide-react";
import { useDepartment } from "@/hooks/useDepartments";
import { useResources, Resource } from "@/hooks/useResources";
import { useArticles } from "@/hooks/useArticles";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

const iconMap: Record<string, any> = {
  Leaf, FlaskConical, Monitor, GraduationCap, BookOpen, Mountain,
  Calculator, Atom, Bug, BarChart3, Cpu, Beaker
};

const levels = ['100L', '200L', '300L', '400L'] as const;
const resourceTypes = ['course_material', 'study_material', 'past_question', 'student_project'] as const;

const typeLabels: Record<string, string> = {
  course_material: 'Course Materials',
  study_material: 'Study Materials',
  past_question: 'Past Questions',
  student_project: 'Student Projects',
};

const DepartmentDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeLevel, setActiveLevel] = useState<string>('100L');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: department, isLoading: deptLoading } = useDepartment(slug || '');
  const { data: resources = [], isLoading: resourcesLoading } = useResources({
    departmentId: department?.id,
    level: activeLevel as any,
    search: searchQuery || undefined,
  });
  const { data: articles = [] } = useArticles({
    departmentId: department?.id,
    status: 'published',
  });

  const Icon = department?.icon ? iconMap[department.icon] : BookOpen;

  if (deptLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-6 w-96 mb-8" />
          <div className="grid gap-4">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full" />)}
          </div>
        </div>
      </Layout>
    );
  }

  if (!department) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Department Not Found</h1>
          <p className="text-muted-foreground mb-8">The department you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/departments">View All Departments</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const groupedResources = resourceTypes.reduce((acc, type) => {
    acc[type] = resources.filter(r => r.type === type);
    return acc;
  }, {} as Record<string, Resource[]>);

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
                  <Link to="/departments">Departments</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{department.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-primary via-primary to-abu-green-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-white/10 flex items-center justify-center">
              <Icon className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                {department.name}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                {department.description}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" asChild>
                <Link to={`/newspapers/${slug}`}>
                  <Newspaper className="h-4 w-4 mr-2" />
                  Department News
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4">
              <FileText className="h-6 w-6 text-accent mb-2" />
              <p className="text-2xl font-bold text-white">{resources.length}</p>
              <p className="text-sm text-white/70">Resources</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Newspaper className="h-6 w-6 text-accent mb-2" />
              <p className="text-2xl font-bold text-white">{articles.length}</p>
              <p className="text-sm text-white/70">Articles</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Users className="h-6 w-6 text-accent mb-2" />
              <p className="text-2xl font-bold text-white">150+</p>
              <p className="text-sm text-white/70">Students</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Download className="h-6 w-6 text-accent mb-2" />
              <p className="text-2xl font-bold text-white">
                {resources.reduce((sum, r) => sum + (r.download_count || 0), 0)}
              </p>
              <p className="text-sm text-white/70">Downloads</p>
            </div>
          </div>
        </div>
      </section>

      {/* Level Tabs & Resources */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Search */}
          <div className="mb-6 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Level Tabs */}
          <Tabs value={activeLevel} onValueChange={setActiveLevel}>
            <TabsList className="mb-6 bg-secondary">
              {levels.map(level => (
                <TabsTrigger key={level} value={level} className="px-6">
                  {level}
                </TabsTrigger>
              ))}
            </TabsList>

            {levels.map(level => (
              <TabsContent key={level} value={level}>
                {resourcesLoading ? (
                  <div className="grid gap-4">
                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full" />)}
                  </div>
                ) : resources.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="py-12 text-center">
                      <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold text-lg mb-2">No Resources Yet</h3>
                      <p className="text-muted-foreground">
                        No resources have been uploaded for {level} yet.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-8">
                    {resourceTypes.map(type => {
                      const typeResources = groupedResources[type];
                      if (typeResources.length === 0) return null;
                      
                      return (
                        <div key={type}>
                          <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                            <FolderOpen className="h-5 w-5 text-primary" />
                            {typeLabels[type]}
                            <Badge variant="secondary" className="ml-2">{typeResources.length}</Badge>
                          </h3>
                          <div className="grid gap-3">
                            {typeResources.map(resource => (
                              <ResourceCard key={resource.id} resource={resource} />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Recent Articles */}
      {articles.length > 0 && (
        <section className="py-8 md:py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold">Latest News</h2>
              <Button variant="ghost" asChild>
                <Link to={`/newspapers/${slug}`}>
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {articles.slice(0, 3).map((article: any) => (
                <Card key={article.id} className="card-hover">
                  <CardContent className="p-5">
                    <Badge className="mb-3">{article.tags?.[0] || 'News'}</Badge>
                    <h3 className="font-semibold mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{article.author}</span>
                      <span>{article.read_time}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="group card-hover border shadow-soft">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row md:items-center gap-4 p-5">
          <div className="shrink-0 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <Link 
              to={`/resources/${resource.id}`}
              className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1"
            >
              {resource.title}
            </Link>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-muted-foreground">
              {resource.course_code && (
                <span className="font-medium text-primary">{resource.course_code}</span>
              )}
              <Badge variant="outline" className="text-xs">{resource.file_type}</Badge>
              {resource.author && <span>by {resource.author}</span>}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>{resource.download_count}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/resources/${resource.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                View
              </Link>
            </Button>
            <Button variant="default" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DepartmentDetail;
