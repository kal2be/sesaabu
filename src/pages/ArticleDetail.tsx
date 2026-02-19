import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  Calendar, User, Clock, ArrowLeft, Share2, 
  Bookmark, Newspaper, Tag, ChevronRight,
  Heart, MessageCircle, Send, Trash2, Loader2
} from "lucide-react";
import { useArticle, useArticles } from "@/hooks/useArticles";
import { useArticleLikes, useUserLiked, useToggleLike, useArticleComments, useAddComment, useDeleteComment } from "@/hooks/useArticleInteractions";
import { useAuth } from "@/hooks/useAuth";
import LoadingPage from "@/components/LoadingPage";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { toast } from "sonner";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data: article, isLoading, error } = useArticle(id || "");
  const { data: relatedArticles } = useArticles({ limit: 3 });
  const { data: likeCount } = useArticleLikes(id || "");
  const { data: userLiked } = useUserLiked(id || "", user?.id);
  const toggleLike = useToggleLike();
  const { data: comments } = useArticleComments(id || "");
  const addComment = useAddComment();
  const deleteComment = useDeleteComment();
  const [newComment, setNewComment] = useState("");

  if (isLoading) {
    return <LoadingPage message="Loading article..." />;
  }

  if (error || !article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been removed.
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

  const departmentName = article.departments?.name || "SESA";

  const handleLike = () => {
    if (!user) {
      toast.error("Please sign in to like articles");
      return;
    }
    toggleLike.mutate({ articleId: id!, userId: user.id, isLiked: !!userLiked });
  };

  const handleComment = () => {
    if (!user) {
      toast.error("Please sign in to comment");
      return;
    }
    if (!newComment.trim()) return;
    addComment.mutate(
      { articleId: id!, userId: user.id, content: newComment.trim() },
      { onSuccess: () => setNewComment("") }
    );
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="bg-secondary/50 border-b py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/newspapers">News</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="truncate max-w-[200px]">{article.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Button variant="ghost" size="sm" className="mb-6" asChild>
              <Link to="/newspapers">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to News
              </Link>
            </Button>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="default" className="bg-primary">{departmentName}</Badge>
                {article.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    <Tag className="h-3 w-3 mr-1" />{tag}
                  </Badge>
                ))}
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />{article.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {article.published_at 
                    ? new Date(article.published_at).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })
                    : 'Draft'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />{article.read_time}
                </span>
              </div>
            </header>

            {/* Featured Image */}
            {article.image_url ? (
              <img 
                src={article.image_url} 
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
              />
            ) : (
              <div className="w-full h-64 md:h-80 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl mb-8 flex items-center justify-center">
                <Newspaper className="h-16 w-16 text-primary/30" />
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-lg max-w-none mb-8">
              {article.content?.split('\n').map((paragraph, index) => (
                <p key={index} className="text-foreground/80 leading-relaxed mb-4">{paragraph}</p>
              ))}
            </div>

            {/* Like & Share Actions */}
            <div className="flex items-center gap-4 pt-6 border-t mb-8">
              <Button
                variant={userLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                disabled={toggleLike.isPending}
              >
                <Heart className={`h-4 w-4 mr-2 ${userLiked ? 'fill-current' : ''}`} />
                {likeCount || 0} {(likeCount || 0) === 1 ? 'Like' : 'Likes'}
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                {comments?.length || 0} Comments
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Comments Section */}
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold">Comments</h3>
              
              {/* Add Comment */}
              {user ? (
                <div className="flex gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Textarea
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <Button
                      size="sm"
                      onClick={handleComment}
                      disabled={addComment.isPending || !newComment.trim()}
                    >
                      {addComment.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4 mr-2" />
                      )}
                      Post Comment
                    </Button>
                  </div>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-muted-foreground mb-2">Sign in to leave a comment</p>
                    <Button size="sm" asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments?.map((comment: any) => (
                  <div key={comment.id} className="flex gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium">
                          {comment.profiles?.full_name || 'Anonymous'}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(comment.created_at), 'MMM d, yyyy')}
                          </span>
                          {user?.id === comment.user_id && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => deleteComment.mutate({ commentId: comment.id, articleId: id! })}
                            >
                              <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80 mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))}
                {(!comments || comments.length === 0) && (
                  <p className="text-center text-muted-foreground py-4">No comments yet. Be the first!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles && relatedArticles.length > 0 && (
        <section className="py-12 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid gap-4">
                {relatedArticles
                  .filter(a => a.id !== article.id)
                  .slice(0, 3)
                  .map((related) => (
                    <Card key={related.id} className="card-hover">
                      <CardContent className="p-4">
                        <Link 
                          to={`/newspapers/article/${related.id}`}
                          className="flex items-center justify-between gap-4 group"
                        >
                          <div>
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {related.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {related.departments?.name} • {related.read_time}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ArticleDetail;
