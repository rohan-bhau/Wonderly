"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { tourSchema } from "@/lib/validation/tour";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";

const categories = [
  "Adventure", "Beach", "Mountain", "Cultural", "Wildlife", "City",
];

const difficulties = ["easy", "moderate", "challenging"] as const;

interface FormValues {
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  price: string;
  departureDate: string;
  duration: string;
  location: string;
  groupSize: string;
  difficulty: string;
  images: string[];
  itinerary: { day: number; title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
}

export default function AddTourPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      shortDescription: "",
      fullDescription: "",
      category: "",
      price: "",
      departureDate: "",
      duration: "",
      location: "",
      groupSize: "",
      difficulty: "moderate",
      images: [""],
      itinerary: [{ day: 1, title: "", description: "" }],
      inclusions: [""],
      exclusions: [""],
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctl = control as any;

  const {
    fields: imageFields,
    append: addImage,
    remove: removeImage,
  } = useFieldArray({ control: ctl, name: "images" });

  const {
    fields: itineraryFields,
    append: addItinerary,
    remove: removeItinerary,
  } = useFieldArray({ control: ctl, name: "itinerary" });

  const {
    fields: inclusionFields,
    append: addInclusion,
    remove: removeInclusion,
  } = useFieldArray({ control: ctl, name: "inclusions" });

  const {
    fields: exclusionFields,
    append: addExclusion,
    remove: removeExclusion,
  } = useFieldArray({ control: ctl, name: "exclusions" });

  async function onSubmit(data: FormValues) {
    setServerError("");
    setLoading(true);
    try {
      const parsed = tourSchema.parse({
        ...data,
        price: data.price ? Number(data.price) : 0,
        groupSize: data.groupSize ? Number(data.groupSize) : 0,
      });
      const res = await fetch("/api/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.message || "Failed to create tour");
        return;
      }
      router.push(`/tours/${json.data.tour._id}`);
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark font-heading">Add New Tour</h1>
            <p className="text-body mt-1">Create a new travel experience</p>
          </div>
          <Link href="/items/manage">
            <Button variant="secondary">My Tours</Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-dark font-heading">Basic Information</h2>

            <Input
              label="Title"
              placeholder="e.g. Amalfi Coast Sailing Adventure"
              {...register("title", { required: "Title is required" })}
              error={errors.title?.message}
            />

            <div>
              <label className="block text-sm font-medium text-dark mb-1">Short Description</label>
              <textarea
                {...register("shortDescription", { required: "Short description is required", minLength: { value: 10, message: "Must be at least 10 characters" } })}
                rows={3}
                placeholder="Brief overview of the tour..."
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-dark placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
              {errors.shortDescription && (
                <p className="mt-1 text-xs text-red-500">{errors.shortDescription.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-1">Full Description</label>
              <textarea
                {...register("fullDescription", { required: "Full description is required", minLength: { value: 20, message: "Must be at least 20 characters" } })}
                rows={6}
                placeholder="Detailed description of the tour..."
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-dark placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
              {errors.fullDescription && (
                <p className="mt-1 text-xs text-red-500">{errors.fullDescription.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Category</label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>
                )}
              </div>

              <Input
                label="Price ($)"
                type="number"
                placeholder="e.g. 1899"
                {...register("price", { required: "Price is required" })}
                error={errors.price?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Departure Date"
                type="date"
                {...register("departureDate", { required: "Departure date is required" })}
                error={errors.departureDate?.message}
              />

              <Input
                label="Duration"
                placeholder="e.g. 7 Days"
                {...register("duration", { required: "Duration is required" })}
                error={errors.duration?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Location"
                placeholder="e.g. Amalfi Coast, Italy"
                {...register("location", { required: "Location is required" })}
                error={errors.location?.message}
              />

              <Input
                label="Group Size"
                type="number"
                placeholder="e.g. 10"
                {...register("groupSize", { required: "Group size is required" })}
                error={errors.groupSize?.message}
              />

              <div>
                <label className="block text-sm font-medium text-dark mb-1">Difficulty</label>
                <select
                  {...register("difficulty")}
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {difficulties.map((d) => (
                    <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-dark font-heading">Images</h2>

            {imageFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Image URL"
                    {...register(`images.${index}`, { required: "Image URL is required" })}
                    error={errors.images?.[index]?.message}
                  />
                </div>
                {imageFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addImage("")}
              className="flex items-center gap-2 text-sm text-primary font-medium hover:text-primary-light transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add another image
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-dark font-heading">Itinerary</h2>

            {itineraryFields.map((field, index) => (
              <div key={field.id} className="p-4 bg-surface rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-dark">Day {index + 1}</span>
                  {itineraryFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItinerary(index)}
                      className="p-1 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    placeholder="Title"
                    {...register(`itinerary.${index}.title`, { required: "Title is required" })}
                    error={errors.itinerary?.[index]?.title?.message}
                  />
                </div>
                <textarea
                  {...register(`itinerary.${index}.description`, { required: "Description is required" })}
                  rows={2}
                  placeholder="Description of the day's activities..."
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-dark placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
                {errors.itinerary?.[index]?.description && (
                  <p className="text-xs text-red-500">{errors.itinerary[index]?.description?.message}</p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItinerary({ day: itineraryFields.length + 1, title: "", description: "" })}
              className="flex items-center gap-2 text-sm text-primary font-medium hover:text-primary-light transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add day
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-semibold text-dark font-heading">Inclusions</h2>
              {inclusionFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="e.g. All accommodation"
                      {...register(`inclusions.${index}`, { required: "Inclusion is required" })}
                      error={errors.inclusions?.[index]?.message}
                    />
                  </div>
                  {inclusionFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInclusion(index)}
                      className="p-2 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addInclusion("")}
                className="flex items-center gap-2 text-sm text-primary font-medium hover:text-primary-light transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add inclusion
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-semibold text-dark font-heading">Exclusions</h2>
              {exclusionFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="e.g. Flights"
                      {...register(`exclusions.${index}`)}
                    />
                  </div>
                  {exclusionFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExclusion(index)}
                      className="p-2 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addExclusion("")}
                className="flex items-center gap-2 text-sm text-primary font-medium hover:text-primary-light transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add exclusion
              </button>
            </div>
          </div>

          {serverError && (
            <div className="bg-red-50 text-red-600 rounded-xl px-4 py-3 text-sm text-center">
              {serverError}
            </div>
          )}

          <div className="flex items-center gap-4">
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? "Creating..." : "Create Tour"}
            </Button>
            <Link href="/items/manage">
              <Button variant="secondary" size="lg">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
