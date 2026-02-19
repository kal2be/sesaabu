import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, GraduationCap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/70 to-primary/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent mb-6 animate-fade-in">
            <GraduationCap className="h-4 w-4" />
            <span className="text-sm font-medium">Ahmadu Bello University, Zaria</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up">
            Science Education
            <span className="block text-accent mt-2">Students Association</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Empowering Science Education through Knowledge, Research, and Innovation. 
            Join us in shaping the future of science education in Nigeria.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/library">
                <BookOpen className="h-5 w-5" />
                Explore Library
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/departments">
                View Departments
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Users, value: "11", label: "Departments" },
              { icon: BookOpen, value: "500+", label: "Resources" },
              { icon: GraduationCap, value: "2000+", label: "Students" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/10 mb-3">
                  <stat.icon className="h-6 w-6 text-accent" />
                </div>
                <p className="font-display text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 50L48 45.7C96 41 192 33 288 35.3C384 38 480 51 576 58.2C672 65 768 67 864 63.8C960 60 1056 51 1152 48.5C1248 46 1344 49 1392 50.5L1440 52V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
