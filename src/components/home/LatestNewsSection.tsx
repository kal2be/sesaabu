import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, Newspaper, Calendar, User, 
  Clock, Tag
} from "lucide-react";
import { useArticles } from "@/hooks/useArticles";
import LoadingSpinner from "@/components/LoadingSpinner";

export function LatestNewsSection() {
  const { data: articles, isLoading } = useArticles({ limit: 4 });

  const latestArticles = articles?.slice(0, 4) || [];

  if (latestArticles.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-4">
            <Newspaper className="inline-block h-4 w-4 mr-1" />
            Latest Updates
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            News & Announcements
            <span className="text-primary"> From SESA</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Stay informed with the latest happenings, events, and announcements from across all departments.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestArticles.map((article) => (
                <Card 
                  key={article.id} 
                  className="group overflow-hidden card-hover border-0 shadow-soft"
                >
                  {/* Image Placeholder */}
                  <div className="h-36 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                     <img src={article.image_url} alt=""  className="w-full h-44 md:h-44 object-cover"/>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {article.departments?.name || 'SESA'}
                      </Badge>
                      {article.tags?.[0] && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {article.tags[0]}
                        </span>
                      )}
                    </div>
                    
                    <Link to={`/newspapers/article/${article.id}`}>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {article.title}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {article.published_at 
                          ? new Date(article.published_at).toLocaleDateString()
                          : 'Draft'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.read_time}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-10">
              <Button variant="outline" size="lg" asChild>
                <Link to="/newspapers">
                  View All News
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
