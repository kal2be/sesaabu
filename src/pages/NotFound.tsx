import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center py-16 section-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            {/* 404 Illustration */}
            <div className="relative mb-8">
              <div className="text-[150px] md:text-[200px] font-display font-bold text-primary/10 leading-none select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileQuestion className="h-12 w-12 text-primary" />
                </div>
              </div>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Oops! The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/">
                  <Home className="h-5 w-5 mr-2" />
                  Go to Homepage
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/library">
                  <Search className="h-5 w-5 mr-2" />
                  Browse Library
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground mb-4">Quick Links</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/departments" className="text-primary hover:underline">
                  Departments
                </Link>
                <Link to="/about" className="text-primary hover:underline">
                  About SESA
                </Link>
                <Link to="/newspapers" className="text-primary hover:underline">
                  Newspapers
                </Link>
                <Link to="/login" className="text-primary hover:underline">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
