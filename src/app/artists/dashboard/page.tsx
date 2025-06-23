// artists/dashboard/page.tsx
// Manager Dashboard: table of all artist submissions with view details modal

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Table from "@/components/Table";
import type { Artist } from "@/components/ArtistCard";

// Table columns for artist data
const columns: { key: keyof Artist; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "location", label: "City" },
  { key: "priceRange", label: "Fee" },
];

/**
 * ManagerDashboardPage displays a table of all artist submissions (static + onboarded).
 * Clicking 'View' opens a modal with full artist details.
 */
export default function ManagerDashboardPage() {
  // State for all artists, loading, and selected artist for modal
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  // Fetch artists from static JSON and localStorage (onboarded)
  useEffect(() => {
    async function fetchArtists() {
      const res = await fetch("/artists.json");
      const staticArtists = await res.json();
      let newArtists: Artist[] = [];
      if (typeof window !== "undefined") {
        const local = localStorage.getItem("artistly_new_artists");
        newArtists = local ? JSON.parse(local) : [];
      }
      setArtists([...staticArtists, ...newArtists]);
      setLoading(false);
    }
    fetchArtists();
  }, []);

  return (
    <main className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Manager Dashboard</h1>
      {/* Table of artists with View action */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          columns={columns}
          data={artists}
          renderActions={(artist) => (
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => setSelectedArtist(artist)}
            >
              View
            </button>
          )}
        />
      )}
      {/* Modal for artist details */}
      {selectedArtist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedArtist(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex flex-col items-center gap-3">
              <Image
                src={selectedArtist.image}
                alt={selectedArtist.name}
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded-full mb-2"
                unoptimized={selectedArtist.image.startsWith("data:")}
              />
              <h2 className="text-xl font-bold mb-1">{selectedArtist.name}</h2>
              <p className="text-gray-500 mb-1">{selectedArtist.category.join(", ")}</p>
              <p className="text-gray-400 text-sm mb-1">{selectedArtist.location}</p>
              <p className="text-gray-400 text-sm mb-1">Fee: {selectedArtist.priceRange}</p>
              <p className="text-gray-400 text-sm mb-1">Languages: {selectedArtist.languages?.join(", ")}</p>
              {selectedArtist.bio && (
                <div className="mt-2 w-full">
                  <h3 className="font-semibold">Bio</h3>
                  <p className="text-gray-700 text-sm mt-1">{selectedArtist.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 