import { Mail, Phone, BookOpen, Building2, User } from "lucide-react";

interface LecturerProps {
  name: string;
  title: string; // Lecturer / Dean
  department: string;
  courses: string[];
  image: string;
  email?: string;
  phone?: string;
}

export default function LecturerCard({
  name,
  title,
  department,
  courses,
  image,
  email,
  phone,
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

        <div className="flex items-start gap-2 text-gray-600 text-sm">
          <BookOpen size={16} className="mt-1" />
          <div>
            <p className="font-semibold text-gray-700">Courses:</p>
            <ul className="list-disc list-inside">
              {courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
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
