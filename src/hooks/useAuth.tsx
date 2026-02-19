import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string, department?: string, level?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

 useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (!session) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      // Fetch roles separately
      fetchUserRole(session.user.id);
    }
  );

  const fetchUserRole = async (userId: string) => {
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);

    const adminRoles = ['super_admin', 'department_admin', 'editor', 'lecturer'];

    setIsAdmin(roles?.some(r => adminRoles.includes(r.role)) ?? false);
    setIsLoading(false);
  };

  return () => subscription.unsubscribe();
}, []);


  const signUp = async (email: string, password: string, fullName: string, department?: string, level?: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;
      
      toast.success('Account created successfully! You can now sign in.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success('Welcome back!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

 const signOut = async () => {
  console.log("SignOut function called");

  try {
    const { error } = await supabase.auth.signOut();
    console.log("Supabase response:", error);

    if (error) throw error;

    setUser(null);
    setSession(null);
    setIsAdmin(false);

    toast.success('Signed out successfully');
  } catch (error: any) {
    console.error("Logout error:", error);
    toast.error(error.message || 'Failed to sign out');
  }
};



  return (
    <AuthContext.Provider value={{ user, session, isLoading, signUp, signIn, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
