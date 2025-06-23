// artists/page.tsx
// Artist Listing page: shows all artists with filter controls and responsive grid

import { Suspense } from "react";
import ArtistsPageClient from "./ArtistsPageClient";

/**
 * ArtistsPage displays a filterable, responsive grid of artist cards.
 * Loads static and onboarded artists, supports filtering by category, location, and price.
 */
export default function ArtistsPage() {
  return (
    <Suspense fallback={<div>Loading artists...</div>}>
      <ArtistsPageClient />
    </Suspense>
  );
} 