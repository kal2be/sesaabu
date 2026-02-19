import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Newspaper, Users, Download, TrendingUp, Clock } from 'lucide-react';
import { useAdminStats, useAdminResources, useAdminArticles } from '@/hooks/useAdminData';
import LoadingSpinner from '@/components/LoadingSpinner';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: resources } = useAdminResources();
  const { data: articles } = useAdminArticles();

  const recentResources = resources?.slice(0, 5) || [];
  const recentArticles = articles?.slice(0, 5) || [];

  const statCards = [
    {
      title: 'Total Resources',
      value: stats?.totalResources || 0,
      icon: FileText,
      description: 'Academic materials in library',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Total Articles',
      value: stats?.totalArticles || 0,
      icon: Newspaper,
      description: 'News and announcements',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Registered Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      description: 'Students and staff',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Downloads',
      value: stats?.totalDownloads || 0,
      icon: Download,
      description: 'Resource downloads',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      {statsLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => (
              <Card key={stat.title} className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  Recent Resources
                </CardTitle>
                <CardDescription>Latest additions to the library</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentResources.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No resources yet</p>
                  ) : (
                    recentResources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{resource.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {resource.departments?.name} • {resource.level}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(resource.created_at), 'MMM d')}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  Recent Articles
                </CardTitle>
                <CardDescription>Latest news and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentArticles.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No articles yet</p>
                  ) : (
                    recentArticles.map((article) => (
                      <div key={article.id} className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{article.title}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground">
                              {article.departments?.name}
                            </p>
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                              article.status === 'published' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {article.status}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(article.created_at), 'MMM d')}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
