import { Layout } from "@/components/layout/Layout";
import { Target, Eye, Users, BookOpen, Lightbulb, Globe } from "lucide-react";

const objectives = [
  {
    icon: BookOpen,
    title: "Academic Excellence",
    description: "Foster a culture of academic excellence and continuous learning among science education students.",
  },
  {
    icon: Users,
    title: "Knowledge Sharing",
    description: "Create platforms for sharing knowledge, resources, and best practices across all departments.",
  },
  {
    icon: Lightbulb,
    title: "Research Development",
    description: "Encourage and support student research initiatives in science education methodologies.",
  },
  {
    icon: Globe,
    title: "Digital Transformation",
    description: "Leverage technology to enhance learning experiences and resource accessibility.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary via-primary to-abu-green-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
              About SESA
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Shaping the Future of
              <span className="text-accent block mt-2">Science Education</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              The Science Education Students Association at Ahmadu Bello University, Zaria, 
              is dedicated to empowering students through knowledge, research, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 section-pattern">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {/* Mission */}
            <div className="p-8 md:p-10 rounded-2xl bg-card border border-border shadow-soft">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary/10 mb-6">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To create a vibrant community of science education students who are equipped with 
                the knowledge, skills, and resources needed to excel academically and contribute 
                meaningfully to the advancement of science education in Nigeria and beyond.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 md:p-10 rounded-2xl bg-card border border-border shadow-soft">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-accent/20 mb-6">
                <Eye className="h-7 w-7 text-accent" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Vision
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the leading student association in promoting academic excellence, 
                research innovation, and digital transformation in science education across 
                Nigerian universities and the African continent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 md:py-28 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Goals
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Core Objectives
            </h2>
            <p className="text-muted-foreground text-lg">
              We are driven by clear objectives that guide our activities and initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {objectives.map((obj, index) => (
              <div
                key={obj.title}
                className="flex gap-5 p-6 rounded-xl bg-card border border-border/50 shadow-soft card-hover"
              >
                <div className="shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <obj.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {obj.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {obj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                A Legacy of Excellence
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                The Science Education Students Association (SESA) was established at Ahmadu Bello University, 
                Zaria, as a platform to unite science education students across various departments. 
                Over the years, SESA has grown to become one of the most vibrant and impactful student 
                associations in the Faculty of Education.
              </p>
              <p>
                Our association brings together students from Biology, Chemistry, Computer Education, 
                EDSE, Gens, Geology, Mathematics, Physics, Zoology, Statistics, and SEIT departments, 
                creating a diverse community of future science educators.
              </p>
              <p>
                Through our digital platform, we continue to break barriers and make educational resources 
                accessible to all our members, fostering academic excellence and preparing the next 
                generation of science educators for the challenges of tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
