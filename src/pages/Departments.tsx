import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Microscope, FlaskConical, Monitor, Calculator, Atom, 
  BarChart3, Bug, Mountain, Cpu, BookOpen, Beaker,
  ArrowRight, Search, Users, FileText, Newspaper
} from "lucide-react";
import { useDepartments } from "@/hooks/useDepartments";
import LoadingSpinner from "@/components/LoadingSpinner";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Microscope,
  FlaskConical,
  Monitor,
  Calculator,
  Atom,
  BarChart3,
  Bug,
  Mountain,
  Cpu,
  BookOpen,
  Beaker,
};

const colorMap: Record<string, string> = {
  "biology-Education": "from-green-800 to-green-200",
  "chemistry Education": "from-green-800 to-green-200",
  "computer-education": "from-green-800 to-green-200",
   "mathematics": "from-green-800 to-green-200",
  "physics": "from-green-800 to-green-200", 
  "Integrated Science": "from-green-800 to-green-200",
  "Geographie Education": "from-green-800 to-green-200",
};

const Departments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: departments, isLoading } = useDepartments();

  const filteredDepartments = departments?.filter(dept => 
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              Explore Departments
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Our Academic
              <span className="text-accent"> Section</span>
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Discover our 07 pecialized Section, each committed to excellence in science education.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search departments..." 
                className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-16 md:py-24 section-pattern">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredDepartments?.map((dept) => {
                const IconComponent = iconMap[dept.icon || "BookOpen"] || BookOpen;
                const colorClass = colorMap[dept.slug] || "from-primary to-primary-foreground";
                
                return (
                  <Card 
                    key={dept.slug}
                    className="group overflow-hidden border-0 shadow-soft card-hover"
                  >
                    {/* Header */}
                    <div className={`h-3 bg-gradient-to-r ${colorClass}`} />
                    
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`shrink-0 h-14 w-14 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-lg font-semibold text-foreground truncate">
                            {dept.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {dept.description}
                          </p>
                        </div>
                      </div>

                      {/* Stats - Using placeholder counts for now */}
                      <div className="flex gap-4 mb-5 py-4 border-y border-border">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Resources</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <Link to={`/departments/${dept.slug}`}>
                            View Section
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/newspapers/${dept.slug}`}>
                            <Newspaper className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Departments;
