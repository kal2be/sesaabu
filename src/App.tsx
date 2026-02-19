import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Departments from "./pages/Departments";
import DepartmentDetail from "./pages/DepartmentDetail";
import Library from "./pages/Library";
import ResourceDetail from "./pages/ResourceDetail";
import Newspapers from "./pages/Newspapers";
import DepartmentNewspaper from "./pages/DepartmentNewspaper";
import ArticleDetail from "./pages/ArticleDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccessDenied from "./pages/AccessDenied";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import Prof from "./pages/Prof";
import Ai from "./pages/Ai";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminResources from "./pages/admin/AdminResources";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import Excutive from "./pages/Excutive";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/:slug" element={<DepartmentDetail />} />
            <Route path="/library" element={<Library />} />
            <Route path="/resources/:id" element={<ResourceDetail />} />
            <Route path="/newspapers" element={<Newspapers />} />
            <Route path="/newspapers/:slug" element={<DepartmentNewspaper />} />
            <Route path="/newspapers/article/:id" element={<ArticleDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/team" element={<Team/>} />
            <Route path="/ai" element={<Ai />} />
             <Route path="/exco" element={<Excutive />} />
            <Route path="/lecturer" element={<Prof />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/resources" element={<AdminResources />} />
            <Route path="/admin/articles" element={<AdminArticles />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
