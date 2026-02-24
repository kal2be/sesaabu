import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Newspaper, Search, Calendar, User, ArrowRight, 
  Clock, Tag, BookOpen, ArrowLeft
} from "lucide-react";
import { useDepartment } from "@/hooks/useDepartments";
import { useArticles } from "@/hooks/useArticles";
import LoadingPage from "@/components/LoadingPage";
import { EmptyState } from "@/components/EmptyState";

const DepartmentNewspaper = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: department, isLoading: deptLoading } = useDepartment(slug || "");
  const { data: articles, isLoading: articlesLoading } = useArticles({ 
    departmentId: department?.id,
    search: searchQuery || undefined
  });

  const isLoading = deptLoading || articlesLoading;

  if (isLoading) {
    return <LoadingPage message="Loading department news..." />;
  }

  if (!department) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Section Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The section you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/newspapers">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to News
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const featuredArticle = articles?.[0];
  const otherArticles = articles?.slice(1) || [];

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="bg-secondary/50 border-b py-4">
        <div className="container mx-auto px-4">
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
                  <Link to="/newspapers">News</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{department.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-primary via-primary to-abu-green-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white mb-4" asChild>
              <Link to="/newspapers">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All News
              </Link>
            </Button>
            
            <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
              <Newspaper className="inline-block h-4 w-4 mr-1" />
              {department.name}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Department News & Updates
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Stay informed with the latest announcements and articles from {department.name}.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search articles..." 
                className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {!articles || articles.length === 0 ? (
            <EmptyState
              icon={<Newspaper className="h-10 w-10 text-muted-foreground" />}
              title="No Articles Yet"
              description={`No articles have been published for ${department.name}. Check back soon for updates!`}
            />
          ) : (
            <>
              {/* Featured Article */}
              {featuredArticle && (
                <div className="mb-12">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">Latest Article</h2>
                  
                  <Card className="overflow-hidden border-0 shadow-elevated">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Image Placeholder */}
                        <div className="h-64 md:h-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          {/* <BookOpen className="h-20 w-20 text-primary/40" /> */}
                           <img src={featuredArticle.image_url} alt=""  className="w-full h-64 md:h-96 object-cover"/>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 md:p-10">
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            {featuredArticle.tags?.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline">
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {featuredArticle.published_at 
                                ? new Date(featuredArticle.published_at).toLocaleDateString()
                                : 'Draft'}
                            </span>
                          </div>
                          
                          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                            {featuredArticle.title}
                          </h3>
                          
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {featuredArticle.excerpt}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {featuredArticle.author}
                            </span>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {featuredArticle.read_time}
                            </span>
                          </div>
                          
                          <Button variant="default" asChild>
                            <Link to={`/newspapers/article/${featuredArticle.id}`}>
                              Read Full Article
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Other Articles */}
              {otherArticles.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">More Articles</h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherArticles.map((article) => (
                      <Card key={article.id} className="group overflow-hidden card-hover border-0 shadow-soft">
                        {/* Image Placeholder */}
                        <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <Newspaper className="h-12 w-12 text-primary/30" />
                        </div>
                        
                        <CardContent className="p-5">
                          <div className="flex items-center gap-2 mb-3">
                            {article.tags?.slice(0, 1).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            <span className="text-xs text-muted-foreground">
                              {article.published_at 
                                ? new Date(article.published_at).toLocaleDateString()
                                : 'Draft'}
                            </span>
                          </div>
                          
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                            {article.title}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {article.author}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {article.read_time}
                              </span>
                            </div>
                            <Link 
                              to={`/newspapers/article/${article.id}`}
                              className="text-sm font-medium text-primary hover:underline"
                            >
                              Read more
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default DepartmentNewspaper;
