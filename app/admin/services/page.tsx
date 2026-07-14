"use client";

import { useEffect, useState } from "react";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { useAdminMode } from "@/app/context/AdminModeContext";
import { getFirebase } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, ShieldAlert } from "lucide-react";

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminDashboard() {
  const { loading } = useAdminGuard();
  const { isAdminMode, toggleAdminMode } = useAdminMode();
  const [services, setServices] = useState<ServiceData[]>([]);
  const [fetching, setFetching] = useState(true);

  const fetchServices = async () => {
    setFetching(true);
    try {
      const { db } = getFirebase();
      if (!db) return;
      const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data: ServiceData[] = [];
      snapshot.forEach((docSnap) => {
        data.push({ id: docSnap.id, ...docSnap.data() } as ServiceData);
      });
      setServices(data);
    } catch (err) {
      console.error("Failed to fetch services", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchServices();
    }
  }, [loading]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        const { db } = getFirebase();
        if (!db) return;
        await deleteDoc(doc(db, "services", id));
        setServices((prev) => prev.filter((s) => s.id !== id));
      } catch (err) {
        console.error("Failed to delete", err);
        alert("Failed to delete service.");
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-24 text-white">Loading Admin...</div>;

  return (
    <div className="min-h-screen pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Manage your services and platform settings.</p>
        </div>

        {/* Global Toggle inside Admin Dashboard as well for convenience */}
        <div className="flex items-center gap-3 bg-slate-800/50 p-1.5 rounded-full border border-slate-700/50">
          <button
            onClick={() => { if (!isAdminMode) toggleAdminMode(); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isAdminMode ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-slate-400 hover:text-white"}`}
          >
            Admin Mode
          </button>
          <button
            onClick={() => { if (isAdminMode) toggleAdminMode(); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!isAdminMode ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-slate-400 hover:text-white"}`}
          >
            Customer View
          </button>
        </div>
      </div>

      {!isAdminMode ? (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-yellow-500 mb-1">Customer View Active</h3>
            <p className="text-slate-300">You are currently viewing the platform as a normal customer would. To manage services, toggle back to Admin Mode above.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">All Services</h2>
            <Link
              href="/admin/services/new"
              className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" /> Add New Service
            </Link>
          </div>

          {fetching ? (
            <div className="text-center py-12 text-slate-400">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="text-center py-12 border border-slate-800 rounded-2xl bg-[#0d1520]/50 text-slate-400">
              No services found. Click &apos;Add New Service&apos; to create one.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#0d1520] border border-slate-700/60 rounded-2xl overflow-hidden shadow-lg flex flex-col"
                >
                  <div className="h-40 w-full relative bg-slate-800">
                    {service.imageUrl && (
                      <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
                    )}
                    {!service.isActive && (
                      <div className="absolute top-2 left-2 bg-red-500/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-md">
                        INACTIVE
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded-md text-cyan-400 text-xs font-bold font-mono">
                      ₹{service.price}
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-white line-clamp-1">{service.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-grow">{service.description}</p>
                    <div className="flex gap-2 text-xs text-slate-500 mb-4">
                      <span className="bg-slate-800 px-2 py-1 rounded-md">{service.category}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50">
                      <Link
                        href={`/admin/services/${service.id}/edit`}
                        className="flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
