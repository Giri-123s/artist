import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Singers",
    image: "/images/singer.jpg",
    description: "Book vocalists for any event."
  },
  {
    name: "Dancers",
    image: "/images/dance.jpg",
    description: "Find talented dancers for your stage."
  },
  {
    name: "Speakers",
    image: "/images/Eventful.jpg",
    description: "Engage audiences with inspiring speakers."
  },
  {
    name: "DJs",
    image: "/images/dj.jpg",
    description: "Get the party started with top DJs."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-slate-100">
      <section className="max-w-2xl text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Artistly.com</h1>
        <p className="text-lg text-gray-600 mb-6">
          The easiest way for event planners and artist managers to connect, book, and manage top performing artists across India.
        </p>
        <a
          href="/artists"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition"
        >
          Explore Artists
        </a>
      </section>
      <section className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/artists?category=${encodeURIComponent(cat.name.slice(0, -1))}`}
            className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition cursor-pointer"
          >
            <div className="w-20 h-20 mb-4 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
              <Image src={cat.image} alt={cat.name} width={80} height={80} style={{ objectFit: "cover", width: 80, height: 80 }} {...(cat.image === "/images/shiva.jpg" ? { priority: false } : {})} />
            </div>
            <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>
            <p className="text-gray-500 text-sm">{cat.description}</p>
          </Link>
        ))}
      </section>
      <h1><b>Built</b> By Shivam</h1>
    </main>
  );
}
