import Image from "next/image";
import CategoryCard from "./components/CategoryCard";
import Navbar from "./components/Navbar";  
import { CATEGORIES } from "./constants/categories";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white h-[400px]"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="flex flex-col items-center justify-center text-center h-full px-8">
          <h2 className="text-4xl font-bold mb-4">Don’t miss out!</h2>
          <p className="text-xl mb-6">
            Explore the{" "}
            <span className="text-yellow-400 font-semibold">vibrant events</span>{" "}
            happening locally and globally.
          </p>

          {/* Search Bar */}
          <div className="flex bg-white rounded-xl  w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search Events, Categories, Location..."
              className="flex-grow px-4 py-3 text-gray-700 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
              <section className="px-20 py-16 bg-white">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">
            Explore Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.link}
                image={cat.image}
                title={cat.title}
                link={cat.link}
              />
            ))}
  </div>
</section>
    </main>
  );
}
