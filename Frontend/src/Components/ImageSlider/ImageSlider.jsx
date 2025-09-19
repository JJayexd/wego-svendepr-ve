import { useState, useEffect } from "react";
import { useFetch } from "../../Hooks/useFetch";

export const ImageSlider = () => {
  const { data, loading, error } = useFetch("http://localhost:4000/api/slides");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data || data.length === 0) return <p>Ingen..</p>;

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
      {data.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "relative" : "opacity-0"
          }`}
        >
          <img
            src={`http://localhost:4000${slide.imageUrl}`}
            alt={slide.text}
            className="w-full h-[400px] md:h-full object-cover"
          />
        </div>
      ))}

      {/* Skift */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
