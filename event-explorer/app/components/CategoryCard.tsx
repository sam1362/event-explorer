"use client";

import React from "react";
import { useRouter as useNextRouter } from "next/navigation";

interface CategoryCardProps {
  image?: string;
  title: string;
  link?: string;
  onClick?: () => void;
}

// ✅ Router-safe hook (برای Next و Storybook)
function useRouterSafe() {
  if (typeof window === "undefined") {
    return { push: () => {} };
  }
  const isStorybook = window.location.port === "6006";
  if (isStorybook) {
    return { push: (href: string) => console.log("Mock navigate:", href) };
  }
  return useNextRouter();
}

export default function CategoryCard({
  image,
  title,
  link,
  onClick,
}: CategoryCardProps) {
  const router = useRouterSafe();

  const handleClick = () => {
    if (onClick) onClick(); // 👈 برای Storybook
    if (link) router.push(link);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer text-center"
      style={{ width: "150px", margin: "auto" }}
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
