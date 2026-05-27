"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getFirebase } from "@/lib/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ImagePlus, X, Save, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAdminGuard } from "@/hooks/useAdminGuard";

interface ServiceFormProps {
  serviceId?: string; // If provided, we are in edit mode
}

export default function ServiceForm({ serviceId }: ServiceFormProps) {
  const { loading } = useAdminGuard();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isActive, setIsActive] = useState(true);
  
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  
  const [fetching, setFetching] = useState(!!serviceId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (serviceId && !loading) {
      const fetchService = async () => {
        try {
          const { db } = getFirebase();
          if (!db) return;
          const docSnap = await getDoc(doc(db, "services", serviceId));
          if (docSnap.exists()) {
            const data = docSnap.data();
            setTitle(data.title || "");
            setDescription(data.description || "");
            setPrice(data.price?.toString() || "");
            setCategory(data.category || "");
            setIsActive(data.isActive ?? true);
            setImageUrl(data.imageUrl || "");
            setImagePreview(data.imageUrl || "");
          } else {
            setError("Service not found");
          }
        } catch (err) {
          setError("Failed to load service");
        } finally {
          setFetching(false);
        }
      };
      fetchService();
    }
  }, [serviceId, loading]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setImageUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const { db, storage } = getFirebase();
      if (!db || !storage) return;
      // Create a doc reference. If new, generate ID. If edit, use existing ID.
      const serviceRef = serviceId 
        ? doc(db, "services", serviceId) 
        : doc(db, "services", doc(db, "services").id); // Generating a new document reference with auto-ID
      
      const targetId = serviceId || serviceRef.id;
      let finalImageUrl = imageUrl;

      if (imageFile) {
        // Upload new image
        const storageRef = ref(storage, `services/${targetId}/cover`);
        await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(storageRef);
      }

      const serviceData = {
        title,
        description,
        price: Number(price) || 0,
        category,
        isActive,
        imageUrl: finalImageUrl,
        updatedAt: serverTimestamp(),
      };

      if (!serviceId) {
        // If it's a new service, also set createdAt
        Object.assign(serviceData, { createdAt: serverTimestamp() });
      }

      await setDoc(serviceRef, serviceData, { merge: true });
      router.push("/admin");
    } catch (err: any) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save service");
      setSaving(false);
    }
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16 px-4 md:px-8 max-w-4xl mx-auto text-white">
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/admin" 
          className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{serviceId ? "Edit Service" : "Add New Service"}</h1>
          <p className="text-slate-400">
            {serviceId ? "Modify existing service details." : "Create a new service offering for the platform."}
          </p>
        </div>
      </div>

      <div className="bg-[#0d1520] border border-slate-700/60 rounded-3xl p-6 md:p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Service Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. CNC Machining"
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Category *</label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Manufacturing"
                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Description *</label>
                <textarea
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the service..."
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                <div>
                  <p className="font-medium text-slate-200">Active Status</p>
                  <p className="text-xs text-slate-400">Show this service to customers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Service Image *</label>
              
              <div 
                className={`relative border-2 border-dashed rounded-2xl overflow-hidden flex flex-col items-center justify-center transition-colors
                  ${imagePreview ? "border-slate-600 bg-slate-900/50" : "border-slate-700 hover:border-cyan-500/50 bg-slate-900/20"}
                  aspect-[4/3] w-full
                `}
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={removeImage}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transform transition hover:scale-105"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 pointer-events-none">
                    <ImagePlus className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-sm text-slate-400 font-medium">Click to upload an image</p>
                    <p className="text-xs text-slate-500 mt-1">JPEG, PNG, WEBP (Max 5MB)</p>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg, image/png, image/webp"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required={!imagePreview} // Required only if there's no preview shown
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-700/50 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium px-8 py-3 rounded-xl transition-all shadow-[0_4px_16px_rgba(6,182,212,0.25)] hover:shadow-[0_4px_24px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" /> Save Service
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
