// FilterBlock.tsx
// Reusable filter sidebar for artist listing page

/**
 * FilterBlock displays dropdowns for category, location, and price range filters.
 * It is a controlled component, receiving filter state and setters as props.
 */
type FilterBlockProps = {
  categories: string[]; // All available categories
  locations: string[]; // All available locations
  priceRanges: string[]; // All available price ranges
  selectedCategory: string; // Currently selected category
  setSelectedCategory: (cat: string) => void;
  selectedLocation: string; // Currently selected location
  setSelectedLocation: (loc: string) => void;
  selectedPrice: string; // Currently selected price range
  setSelectedPrice: (price: string) => void;
};

export default function FilterBlock({
  categories,
  locations,
  priceRanges,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  selectedPrice,
  setSelectedPrice,
}: FilterBlockProps) {
  return (
    <aside className="mb-4 p-4 border rounded-lg bg-white flex flex-col gap-4">
      <h3 className="font-semibold mb-2">Filters</h3>
      {/* Category filter dropdown */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {/* Location filter dropdown */}
      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={selectedLocation}
          onChange={e => setSelectedLocation(e.target.value)}
        >
          <option value="">All</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
      {/* Price range filter dropdown */}
      <div>
        <label className="block text-sm font-medium mb-1">Price Range</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={selectedPrice}
          onChange={e => setSelectedPrice(e.target.value)}
        >
          <option value="">All</option>
          {priceRanges.map(price => (
            <option key={price} value={price}>{price}</option>
          ))}
        </select>
      </div>
    </aside>
  );
} 