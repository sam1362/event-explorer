import Image from "next/image";
import { Star } from "lucide-react";

interface EventCardProps {
  title?: string;
  date?: string;
  venue?: string;
  time?: string;
  category?: string;
  image?: string;
  url?: string;
}

export default function EventCard({
  title,
  date,
  venue,
  time,
  category,
  image,
  url,
}: EventCardProps) {
  return (
    <div className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      {/* image + star + Badge */}
      <div className="relative">
       
        <Image
          src={image || "/placeholder.jpg"}
          alt={title || "Event image"}
          width={400}
          height={200}
          className="w-full h-40 object-cover bg-gray-200"
          priority={false}
          unoptimized={false}
        />

        <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100">
          <Star size={18} className="text-gray-500" />
        </button>

        {category ? (
          <span className="absolute bottom-0 left-0 text-xs font-medium bg-yellow-400 text-gray-800 px-2 py-1 rounded-tr-lg">
            {category}
          </span>
        ) : null}
      </div>

      {/* texts */}
      <div className="p-4">
        <h2 className="text-base font-semibold text-gray-900 line-clamp-2">
          {title || "Event name not available"}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {date || "Date not available"} | {venue || "Venue not available"}
        </p>
        <p className="text-sm text-gray-600">
          {time || "Time not available"}
        </p>
      </div>

      {/* clickable */}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
        >
          <span className="sr-only">View Event</span>
        </a>
      )}
    </div>
  );
}
