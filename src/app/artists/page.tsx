// artists/page.tsx
// Artist Listing page: shows all artists with filter controls and responsive grid

"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ArtistCard, { Artist } from "@/components/ArtistCard";
import FilterBlock from "@/components/FilterBlock";
//import artistsData from "@/data/artists.json";
import categoriesData from "@/data/categories.json";

/**
 * ArtistsPage displays a filterable, responsive grid of artist cards.
 * Loads static and onboarded artists, supports filtering by category, location, and price.
 */
export default function ArtistsPage() {
  // State for all artists and loading
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  // All available categories
  const categories: string[] = categoriesData as string[];
  // Read category from query param for initial filter
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

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

  // Update selectedCategory if query param changes
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Extract unique locations and price ranges for filter dropdowns
  const locations = useMemo(() => Array.from(new Set(artists.map(a => a.location))), [artists]);
  const priceRanges = useMemo(() => Array.from(new Set(artists.map(a => a.priceRange))), [artists]);

  // Filter logic: filter artists by selected filters
  const filteredArtists = artists.filter(artist => {
    const matchCategory = selectedCategory ? artist.category.includes(selectedCategory) : true;
    const matchLocation = selectedLocation ? artist.location === selectedLocation : true;
    const matchPrice = selectedPrice ? artist.priceRange === selectedPrice : true;
    return matchCategory && matchLocation && matchPrice;
  });

  return (
    <main className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Artist Listing</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64">
          <FilterBlock
            categories={categories}
            locations={locations}
            priceRanges={priceRanges}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
          />
        </div>
        <div className="flex-1">
          {loading ? (
            <p>Loading...</p>
          ) : filteredArtists.length === 0 ? (
            <p className="text-gray-500">No artists found for selected filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtists.map(artist => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 