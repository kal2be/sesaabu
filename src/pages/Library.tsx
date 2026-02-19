import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  BookOpen, Search, Download, FileText, FolderOpen, 
  Filter, Clock, ChevronRight, GraduationCap
} from "lucide-react";
import { useResources } from "@/hooks/useResources";
import { useDepartments } from "@/hooks/useDepartments";
import LoadingSpinner from "@/components/LoadingSpinner";
import { EmptyState, NoSearchResults } from "@/components/EmptyState";
import { Database } from "@/integrations/supabase/types";

type ResourceLevel = Database['public']['Enums']['resource_level'];
type ResourceType = Database['public']['Enums']['resource_type'];

const levels: { value: ResourceLevel | "all"; label: string }[] = [
  { value: "all", label: "All Levels" },
  { value: "100L", label: "100 Level" },
  { value: "200L", label: "200 Level" },
  { value: "300L", label: "300 Level" },
  { value: "400L", label: "400 Level" },
];

const categories: { value: ResourceType | "all"; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "course_material", label: "Course Materials" },
  { value: "study_material", label: "Study Materials" },
  { value: "past_question", label: "Past Questions" },
  { value: "student_project", label: "Student Projects" },
];

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState<ResourceLevel | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<ResourceType | "all">("all");

  const { data: departments, isLoading: deptsLoading } = useDepartments();
  
  const { data: resources, isLoading: resourcesLoading } = useResources({
    departmentId: selectedDepartment !== "all" ? selectedDepartment : undefined,
    level: selectedLevel !== "all" ? selectedLevel : undefined,
    type: selectedCategory !== "all" ? selectedCategory : undefined,
    search: searchQuery || undefined,
  });

  const isLoading = deptsLoading || resourcesLoading;

  const departmentMap = useMemo(() => {
    if (!departments) return {};
    return departments.reduce((acc, dept) => {
      acc[dept.id] = dept.name;
      return acc;
    }, {} as Record<string, string>);
  }, [departments]);

  const getResourceTypeLabel = (type: ResourceType) => {
    const typeMap: Record<ResourceType, string> = {
      course_material: "Course Materials",
      study_material: "Study Materials",
      past_question: "Past Questions",
      student_project: "Student Project",
    };
    return typeMap[type] || type;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-abu-green-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
              <BookOpen className="inline-block h-4 w-4 mr-1" />
              Digital Library
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Academic Resources
              <span className="text-accent block mt-2">At Your Fingertips</span>
            </h1>
            <p className="text-lg text-white/80">
              Access course materials, past questions, study guides, and student projects 
              organized by department and level.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-secondary/50 border-b border-border sticky top-16 md:top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search resources by title, course code..." 
                className="pl-12 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[180px] h-12">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments?.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={(v) => setSelectedLevel(v as ResourceLevel | "all")}>
                <SelectTrigger className="w-[140px] h-12">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as ResourceType | "all")}>
                <SelectTrigger className="w-[160px] h-12">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Resources List */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <LoadingSpinner size="lg" />
            </div>
          ) : !resources || resources.length === 0 ? (
            searchQuery ? (
              <NoSearchResults query={searchQuery} />
            ) : (
              <EmptyState
                icon={<BookOpen className="h-10 w-10 text-muted-foreground" />}
                title="No Resources Available"
                description="No resources match your current filters. Try adjusting your selection."
              />
            )
          ) : (
            <>
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{resources.length}</span> resources
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  <span>Sort by: Recent</span>
                </div>
              </div>

              {/* Resources Grid */}
              <div className="grid gap-4">
                {resources.map((resource) => (
                  <Card key={resource.id} className="group card-hover border shadow-soft">
                    <CardContent className="p-0">
                      <Link to={`/resources/${resource.id}`}>
                        <div className="flex flex-col md:flex-row md:items-center gap-4 p-5">
                          {/* Icon */}
                          <div className="shrink-0 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                            {resource.type === 'student_project' ? (
                              <GraduationCap className="h-7 w-7 text-primary" />
                            ) : (
                              <FileText className="h-7 w-7 text-primary" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                              {resource.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                              <span className="inline-flex items-center gap-1">
                                <FolderOpen className="h-4 w-4" />
                                {departmentMap[resource.department_id] || 'Unknown'}
                              </span>
                              <span>{resource.level}</span>
                              <span className="px-2 py-0.5 rounded-full bg-accent/20 text-xs font-medium">
                                {getResourceTypeLabel(resource.type)}
                              </span>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Download className="h-4 w-4" />
                              <span>{resource.download_count}</span>
                            </div>
                            <div className="hidden sm:flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{new Date(resource.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {/* Arrow */}
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Library;
