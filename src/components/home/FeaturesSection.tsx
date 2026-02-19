import { BookOpen, Newspaper, Calendar, Award, Download, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Digital Library",
    description: "Access course materials, past questions, and study resources organized by department and level.",
  },
  {
    icon: Newspaper,
    title: "Department Newspapers",
    description: "Stay updated with the latest news, articles, and announcements from each department.",
  },
  {
    icon: Calendar,
    title: "Events & Seminars",
    description: "Never miss important academic events, workshops, and seminars happening across departments.",
  },
  {
    icon: Award,
    title: "Research Hub",
    description: "Explore student research projects, publications, and academic achievements.",
  },
  {
    icon: Download,
    title: "Offline Access",
    description: "Download resources for offline study, ensuring learning never stops.",
  },
  {
    icon: Users,
    title: "Student Community",
    description: "Connect with fellow science education students and share knowledge.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-4">
            Platform Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need for
            <span className="text-primary"> Academic Success</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our comprehensive platform provides all the tools and resources science education students need to excel.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 md:p-8 rounded-2xl bg-card border border-border/50 shadow-soft card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary/10 mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
