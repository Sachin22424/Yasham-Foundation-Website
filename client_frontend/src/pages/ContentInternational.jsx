import React, { useEffect, useState } from "react";
import axios from "axios";

const ContentInternational = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/international"); // adjust API url
        setPrograms(res.data);
      } catch (error) {
        console.error("Error fetching international programs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!programs.length) return <p className="text-center mt-5">No data found</p>;

  // First document = Intro
  const intro = programs[0];
  const subPrograms = programs.slice(1); // Rest of docs

  return (
    <div className="international-container max-w-6xl mx-auto px-4 py-10">
      {/* Intro Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">{intro.title}</h1>
        <p className="text-lg text-gray-700">{intro.description}</p>
      </div>

      {/* Sub Programs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {subPrograms.map((program) => (
          <div
            key={program._id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-semibold mb-3">{program.title}</h2>
            <p className="text-gray-600 mb-4">{program.description}</p>

            {program.images && program.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {program.images.map((img, index) => (
                  <div key={index} className="w-full">
                    <img
                      src={img.url}
                      alt={img.caption || program.title}
                      className="rounded-xl w-full h-48 object-cover"
                    />
                    {img.caption && (
                      <p className="text-sm text-gray-500 mt-1">{img.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentInternational;
