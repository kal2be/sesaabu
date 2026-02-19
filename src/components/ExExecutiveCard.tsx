// components/ExExecutiveCard.tsx
import { Mail, Phone, GraduationCap, Briefcase } from "lucide-react";

interface ExExecutiveProps {
  name: string;
  role: string;
  department: string;
  tenure: string;
  image: string;
  email?: string;
  phone?: string;
}

export default function ExExecutiveCard({
  name,
  role,
  department,
  tenure,
  image,
  email,
  phone,
}: ExExecutiveProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden w-full max-w-sm">
      
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-white text-xl font-bold">{name}</h2>
          <p className="text-gray-200 text-sm">{role}</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 space-y-3">
        
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <GraduationCap size={16} />
          <span>{department}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Briefcase size={16} />
          <span>Tenure: {tenure}</span>
        </div>

        {email && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Mail size={16} />
            <span>{email}</span>
          </div>
        )}

        {phone && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Phone size={16} />
            <span>{phone}</span>
          </div>
        )}

      </div>
    </div>
  );
}
