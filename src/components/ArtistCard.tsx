// ArtistCard.tsx
// Reusable card component to display artist info and handle quote requests
import { useState } from "react";
import Image from "next/image";

export type Artist = {
  id: number;
  name: string;
  category: string[];
  priceRange: string;
  location: string;
  languages: string[];
  image: string;
  bio?: string;
};

/**
 * ArtistCard displays an artist's avatar, info, and a CTA to request a quote.
 * Shows a modal form for quote requests and a thank you message on submit.
 */
export default function ArtistCard({ artist }: { artist: Artist }) {
  const [showModal, setShowModal] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // Open the quote modal
  const handleOpen = () => {
    setShowModal(true);
    setThankYou(false);
    setForm({ name: "", email: "", message: "" });
  };
  // Close the quote modal
  const handleClose = () => setShowModal(false);
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Handle quote form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote Request:", { artist: artist.name, ...form });
    setThankYou(true);
    setTimeout(() => {
      setShowModal(false);
    }, 1500);
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col items-center text-center bg-white">
      <div className="w-20 h-20 mb-3 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
        <Image src={artist.image} alt={artist.name} width={80} height={80} style={{ width: 80, height: 80, objectFit: 'cover' }} {...(artist.image === "/images/Shiva.jpg" ? { priority: true } : {})} />
      </div>
      <h2 className="font-semibold text-lg mb-1">{artist.name}</h2>
      <p className="text-sm text-gray-500 mb-1">{artist.category.join(", ")}</p>
      <p className="text-xs text-gray-400 mb-1">{artist.location}</p>
      <p className="text-xs text-gray-400 mb-2">{artist.priceRange}</p>
      <button
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={handleOpen}
      >
        Ask for Quote
      </button>
      {/* Modal for quote request */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={handleClose}
              aria-label="Close"
            >
              ×
            </button>
            {thankYou ? (
              <div className="flex flex-col items-center justify-center h-32">
                <p className="text-green-600 font-semibold text-lg">Thank you for showing interest!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <h3 className="font-semibold text-lg mb-2">Request a Quote for {artist.name}</h3>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="border rounded px-2 py-1"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="border rounded px-2 py-1"
                  required
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className="border rounded px-2 py-1"
                  rows={2}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 