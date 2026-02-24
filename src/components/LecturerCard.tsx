import { Mail, Phone, BookOpen, Building2, User } from "lucide-react";

interface LecturerProps {
  name: string;
  title: string; // Lecturer / Dean
  department: string;
  image: string;
  email?: string;
}

export default function LecturerCard({
  name,
  title,
  department,
  image,
  email,
}: LecturerProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      
      {/* Image Section */}
      <div className="relative h-60">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-4">
          <div>
            <h2 className="text-white text-lg font-bold">{name}</h2>
            <p className="text-gray-100 text-sm">{title}</p>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 space-y-3">

        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Building2 size={16} />
          <span>{department}</span>
        </div>

        {email && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Mail size={16} />
            <span>{email}</span>
          </div>
        )}

      </div>
    </div>
  );
}
