// artists/onboard/page.tsx
// Artist Onboarding Form: multi-section form for artist details and image upload

"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import categoriesData from "@/data/categories.json";

const feeRanges = [
  "₹10,000 - ₹25,000",
  "₹15,000 - ₹30,000",
  "₹20,000 - ₹50,000",
  "₹25,000 - ₹60,000"
];
const languages = ["Hindi", "English", "Malayalam"];
const categories = categoriesData as string[];

// Yup schema for form validation
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  bio: yup.string().required("Bio is required"),
  category: yup.array().min(1, "Select at least one category"),
  languages: yup.array().min(1, "Select at least one language"),
  feeRange: yup.string().required("Fee range is required"),
  location: yup.string().required("Location is required"),
  image: yup.mixed().notRequired(),
});

/**
 * ArtistOnboardPage provides a multi-section form for onboarding new artists.
 * Handles image upload, validation, and saves new artists to localStorage.
 */
export default function ArtistOnboardPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const router = useRouter();
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      bio: "",
      category: [],
      languages: [],
      feeRange: "",
      location: "",
      image: undefined,
    },
  });

  // Handle form submission: save new artist to localStorage
  const onSubmit = async (data: any) => {
    // Assign a unique id and map feeRange to priceRange
    const { feeRange, image, ...rest } = data;
    let imageUrl = imageDataUrl;
    if (!imageUrl) {
      imageUrl = "/images/singer.jpg"; // fallback default image
    }
    const newArtist = { ...rest, priceRange: feeRange, id: Date.now(), image: imageUrl };
    // Save to localStorage
    if (typeof window !== "undefined") {
      const prev = localStorage.getItem("artistly_new_artists");
      const arr = prev ? JSON.parse(prev) : [];
      arr.push(newArtist);
      localStorage.setItem("artistly_new_artists", JSON.stringify(arr));
    }
    // For demo, just log to console
    console.log("Artist Submission:", newArtist);
    alert("Artist submitted! Check console for data.");
    router.push("/artists");
  };

  // Handle image file change: preview and convert to data URL
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setValue("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImageDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setImageDataUrl(null);
    }
  };

  return (
    <main className="p-4 sm:p-8 max-w-2xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Artist Onboarding Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name *</label>
          <input
            className="w-full border rounded px-3 py-2"
            {...register("name")}
            placeholder="Artist Name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>}
        </div>
        {/* Bio */}
        <div>
          <label className="block font-medium mb-1">Bio *</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            {...register("bio")}
            placeholder="Short artist bio"
            rows={3}
          />
          {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message as string}</p>}
        </div>
        {/* Category Multi-select */}
        <div>
          <label className="block font-medium mb-1">Category *</label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <div className="flex flex-wrap gap-4">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={cat}
                      checked={Array.isArray(field.value) && field.value.includes(cat)}
                      onChange={e => {
                        const valueArr = Array.isArray(field.value) ? field.value : [];
                        if (e.target.checked) {
                          field.onChange([...valueArr, cat]);
                        } else {
                          field.onChange(valueArr.filter((v: string) => v !== cat));
                        }
                      }}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            )}
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message as string}</p>}
        </div>
        {/* Languages Multi-select */}
        <div>
          <label className="block font-medium mb-1">Languages Spoken *</label>
          <Controller
            control={control}
            name="languages"
            render={({ field }) => (
              <div className="flex flex-wrap gap-4">
                {languages.map(lang => (
                  <label key={lang} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={lang}
                      checked={Array.isArray(field.value) && field.value.includes(lang)}
                      onChange={e => {
                        const valueArr = Array.isArray(field.value) ? field.value : [];
                        if (e.target.checked) {
                          field.onChange([...valueArr, lang]);
                        } else {
                          field.onChange(valueArr.filter((v: string) => v !== lang));
                        }
                      }}
                    />
                    {lang}
                  </label>
                ))}
              </div>
            )}
          />
          {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages.message as string}</p>}
        </div>
        {/* Fee Range Dropdown */}
        <div>
          <label className="block font-medium mb-1">Fee Range *</label>
          <select className="w-full border rounded px-3 py-2" {...register("feeRange")}> 
            <option value="">Select fee range</option>
            {feeRanges.map(fee => (
              <option key={fee} value={fee}>{fee}</option>
            ))}
          </select>
          {errors.feeRange && <p className="text-red-500 text-sm mt-1">{errors.feeRange.message as string}</p>}
        </div>
        {/* Profile Image Upload */}
        <div>
          <label className="block font-medium mb-1">Profile Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              width={96}
              height={96}
              className="mt-2 w-24 h-24 object-cover rounded-full"
              unoptimized
            />
          )}
        </div>
        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location *</label>
          <input
            className="w-full border rounded px-3 py-2"
            {...register("location")}
            placeholder="City, State"
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message as string}</p>}
        </div>
        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Submit Artist
          </button>
        </div>
      </form>
    </main>
  );
} 