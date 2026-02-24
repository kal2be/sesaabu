import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Microscope, FlaskConical, Monitor, Calculator, Atom, BarChart3, Bug, Mountain, Cpu, BookOpen } from "lucide-react";

const departments = [
  { name: "Biology", slug: "biology", icon: Microscope, color: "from-green-500 to-emerald-600" },
  { name: "Chemistry", slug: "chemistry", icon: FlaskConical, color: "from-blue-500 to-cyan-600" },
  { name: "Computer Education", slug: "computer-education", icon: Monitor, color: "from-purple-500 to-violet-600" },
  { name: "Mathematics", slug: "mathematics", icon: Calculator, color: "from-orange-500 to-amber-600" },
  { name: "Physics", slug: "physics", icon: Atom, color: "from-red-500 to-rose-600" },
  { name: "Geographie", slug: "geography", icon: Mountain, color: "from-stone-500 to-slate-600" },
  { name: "Integrated Science", slug: "Intgrated Science", icon: Cpu, color: "from-indigo-500 to-blue-600" },
];

export function DepartmentsSection() {
  return (
    <section className="py-20 md:py-28 section-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Sections
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Academic Excellence Across
            <span className="text-primary"> All Disciplines</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our diverse Section, each dedicated to advancing science education through innovative teaching and research.
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {departments.map((dept, index) => (
            <Link key={dept.slug} to={`/departments/${dept.slug}`}>
              <Card 
                className="group h-full card-hover border-0 shadow-soft overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br ${dept.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <dept.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Education</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link to="/departments">
              View All Departments
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
