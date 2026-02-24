import { BookOpen } from "lucide-react";
import logo from "@/assets/IMG-20260119-WA0000.png"
interface LoadingPageProps {
  message?: string;
}

const LoadingPage = ({ message = "Loading..." }: LoadingPageProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      {/* ABU Logo Animation */}
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 h-24 w-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        
        {/* Inner pulsing logo */}
        <div className="h-24 w-24 flex items-center justify-center animate-pulse">
        <img src={logo} alt="abu-logo"/>
        </div>
      </div>

      {/* SESA Text */}
      <div className="mt-8 text-center">
        <h2 className="font-display text-2xl font-bold text-primary mb-2">SESA</h2>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>

      {/* Loading dots */}
      <div className="mt-6 flex gap-1.5">
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
};

export default LoadingPage;
