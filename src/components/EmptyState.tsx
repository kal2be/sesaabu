import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FolderOpen, Plus, Upload } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  actionHref?: string;
  showUpload?: boolean;
}

export function EmptyState({ 
  title, 
  description, 
  icon,
  actionLabel,
  actionHref,
  showUpload = false
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-6">
        {icon || <FolderOpen className="h-10 w-10 text-muted-foreground" />}
      </div>
      
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground max-w-md mb-6">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Button asChild>
          <Link to={actionHref}>
            {showUpload ? <Upload className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
            {actionLabel}
          </Link>
        </Button>
      )}
    </div>
  );
}

export function NoSearchResults({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-6">
        <FolderOpen className="h-10 w-10 text-muted-foreground" />
      </div>
      
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
        No Results Found
      </h3>
      <p className="text-muted-foreground max-w-md mb-2">
        We couldn't find any resources matching "<span className="font-medium text-foreground">{query}</span>".
      </p>
      <p className="text-sm text-muted-foreground">
        Try adjusting your search or filters.
      </p>
    </div>
  );
}
