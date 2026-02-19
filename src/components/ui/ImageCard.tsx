import { Eye } from "lucide-react";

export function ImageCard({ member }) {
  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
      
      {/* Image */}
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-60 object-cover group-hover:scale-105 transition duration-300"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 p-4 flex flex-col justify-end">
        <h3 className="text-white font-semibold text-lg">
          {member.name}
        </h3>

        <p className="text-blue-300 text-sm font-medium">
          {member.role}
        </p>

        <p className="text-gray-300 text-xs mt-1">
          {member.department}
        </p>

        <p className="text-gray-400 text-xs">
          Level: {member.level}
        </p>

        <div className="absolute top-3 right-3">
          <Eye className="text-white w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
