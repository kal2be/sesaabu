import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, FileText, Download, TrendingUp, 
  GraduationCap, BookOpen
} from "lucide-react";
import { useResources } from "@/hooks/useResources";
import LoadingSpinner from "@/components/LoadingSpinner";

const typeLabels: Record<string, string> = {
  course_material: 'Course Material',
  study_material: 'Study Material',
  past_question: 'Past Question',
  student_project: 'Project',
};

export function PopularResourcesSection() {
  const { data: resources, isLoading } = useResources();

  // Get top resources by download count (simulating popularity)
  const popularResources = resources
    ?.sort((a, b) => (b.download_count || 0) - (a.download_count || 0))
    .slice(0, 6) || [];

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <TrendingUp className="inline-block h-4 w-4 mr-1" />
            Popular Resources
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Most Downloaded
            <span className="text-primary"> Materials</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover the most popular academic resources that students are downloading and studying.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {/* Resources Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularResources.map((resource, index) => (
                <Card 
                  key={resource.id} 
                  className="group overflow-hidden card-hover border-0 shadow-soft"
                >
                  <CardContent className="p-0">
                    <Link to={`/resources/${resource.id}`}>
                      {/* Color Bar */}
                      <div className="h-1.5 bg-gradient-to-r from-primary to-accent" />
                      
                      <div className="p-5">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-3">
                          <div className="shrink-0 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            {resource.type === 'student_project' ? (
                              <GraduationCap className="h-6 w-6 text-primary" />
                            ) : (
                              <FileText className="h-6 w-6 text-primary" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {resource.title}
                            </h3>
                          </div>
                        </div>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <Badge variant="secondary" className="text-xs">
                            {resource.level}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {typeLabels[resource.type]}
                          </Badge>
                          {resource.course_code && (
                            <span className="text-xs text-primary font-medium">
                              {resource.course_code}
                            </span>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Download className="h-4 w-4" />
                            <span>{resource.download_count || 0} downloads</span>
                          </div>
                          <span className="text-sm font-medium text-primary group-hover:underline">
                            View Details →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-10">
              <Button variant="default" size="lg" asChild>
                <Link to="/library">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Full Library
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
