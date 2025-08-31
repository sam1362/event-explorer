"use client";

import { useRouter } from "next/navigation";

interface CategoryCardProps {
  image?: string;
  title: string;
  link?: string; 
}

export default function CategoryCard({ image, title, link }: CategoryCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer"
    >
      <img
        src={image || "/placeholder.jpg"}
        alt={title}
        className="rounded-full w-28 h-28 mx-auto object-cover shadow-md hover:scale-105 transition"
      />
      <p className="mt-3 font-medium text-gray-700">{title}</p>
    </div>
  );
}

