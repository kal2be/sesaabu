import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ShieldX, Home, LogIn, ArrowLeft } from "lucide-react";

const AccessDenied = () => {
  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center py-16 section-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            {/* 403 Illustration */}
            <div className="relative mb-8">
              <div className="text-[150px] md:text-[200px] font-display font-bold text-destructive/10 leading-none select-none">
                403
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center">
                  <ShieldX className="h-12 w-12 text-destructive" />
                </div>
              </div>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Access Denied
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Sorry, you don't have permission to access this page. 
              Please sign in with an authorized account or contact an administrator.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/login">
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/">
                  <Home className="h-5 w-5 mr-2" />
                  Go to Homepage
                </Link>
              </Button>
            </div>

            {/* Help */}
            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground mb-2">Need help?</p>
              <p className="text-sm text-muted-foreground">
                Contact the SESA admin team if you believe this is an error.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AccessDenied;
