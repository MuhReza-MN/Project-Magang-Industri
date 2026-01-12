"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ExpandImage from "@/components/ui/expandImgBtn";
import { motion } from "framer-motion";
import { createEvent } from "./action";
import { FaBars } from "react-icons/fa6";
import PosterUploadModal from "@/components/ui/uploadPosterBtn";

type CreateEventProps = {
  event: {
    id: string;
    title: string;
    description: string | null;
    status: string;
    posterImage: string | null;
    details: string | null;
    startAt: Date;
    endAt: Date | null;
    eo: { id: string; name: string | null };
    _count: { participants: number };
  };
  eoUsers: {
    id: string;
    name: string | null;
  }[];
  currentUserRole: string | null;
};

type EventDetails = {
  intro: string;
  sections: {
    id: string;
    title: string;
    items: {
      id: string;
      text: string;
    }[];
  }[];
};

export default function CreateEvent({
  event,
  eoUsers,
  currentUserRole
}: CreateEventProps) {
  const router = useRouter();
  const lastWarn = useRef(0);
  const [isTouch, setIsTouch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posterUrl, setPosterUrl] = useState<string | null>(event.posterImage);
  const [dragging, setDragging] = useState<{
    sectionId: string;
    itemIndex: number;
  } | null>(null);


  const [form, setForm] = useState({
    title: event.title,
    description: event.description,
    status: event.status,
    eoId: event.eo.id,
    startAt: event.startAt.toISOString().slice(0, 10),
    endAt: event.endAt?.toISOString().slice(0, 10) ?? "",
    posterImage: event.posterImage ?? "/placeholder.webp",
  });

  const statusLockedForEO = currentUserRole === "EO";

  useEffect(() => {
    if (!event) return;
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [event]);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mql = window.matchMedia("(pointer: coarse)");
    const set = () => setIsTouch(mql.matches);
    set();
    mql.addEventListener("change", set);
    return () => mql.removeEventListener("change", set);
  }, []);

  const parsedDetails: EventDetails = useMemo(() => {
    try {
      return event.details
        ? JSON.parse(event.details)
        : { intro: "", sections: [] };
    } catch {
      return { intro: "", sections: [] };
    }
  }, [event.details]);
  const [details, setDetails] = useState<EventDetails>(parsedDetails);
  useEffect(() => {
    setDetails(parsedDetails);
  }, [parsedDetails]);

  const addItem = (sectionId: string) => {
    setDetails((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId
          ? {
            ...s,
            items: [
              ...s.items,
              { id: crypto.randomUUID(), text: "" },
            ],
          }
          : s
      ),
    }));
  };

  const removeItem = (sectionId: string, itemId: string) => {
    setDetails((prev) => {
      const section = prev.sections.find((s) => s.id === sectionId);
      if (!section) return prev;

      if (section.items.length === 1) {
        const now = Date.now();
        if (now - lastWarn.current > 100) {
          alert("Minimal 1 item diperlukan");
          lastWarn.current = now;
        }
        return prev;
      }

      return {
        ...prev,
        sections: prev.sections.map((s) =>
          s.id === sectionId
            ? {
              ...s,
              items: s.items.filter((i) => i.id !== itemId),
            }
            : s
        ),
      };
    });
  };


  const validateDetails = () => {
    if (!details.intro.trim()) {
      alert("Intro ketentuan tidak boleh kosong");
      return false;
    }

    for (const section of details.sections) {

      for (const item of section.items) {
        if (!item.text.trim()) {
          alert(`Item kosong ditemukan di bagian "${section.title}"`);
          return false;
        }
      }
    }

    if (form.endAt) {
      const start = new Date(form.startAt);
      const end = new Date(form.endAt);

      if (end < start) {
        alert("Tanggal selesai harus sama atau setelah tanggal mulai");
        return false;
      }
    }

    if (!form.description?.trim()) {
      alert("Deskripsi event tidak boleh kosong");
      return false;
    }

    return true;
  };

  return (
    <div className="h-full flex flex-col contain-inline-size">
      <div className="absolute h-full inset-0 bg-linear-to-tr from-violet-200 via-violet-300 to-blue-200 -z-10" />

      <div className="sticky top-[clamp(3.5rem,6vh,6rem)] z-30 bg-neutral-100/95 backdrop-blur-3xl border-b border-neutral-200 text-black">
        <div className="flex flex-col md:flex-row gap-2 mt-4 mx-2 mb-2 h-fit justify-center items-start">
          <div className="flex flex-col h-full justify-between items-end">
            <div className="relative flex items-center w-[250px] h-[250px] border-4 border-gray-100/70 bg-white/90 m-2 overflow-hidden rounded-lg shadow-lg">
              {isTouch ? ("") : (
                <motion.div
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  className="absolute inset-0 bg-gray z-60 w-full h-full object-contain justify-center items-center pointer-events-auto">
                  <div className="flex pointer-events-auto h-full w-full">
                    <ExpandImage
                      aria-label="Tampilkan Poster layar penuh"
                      imageName={`Poster ${event.title}`}
                      image={posterUrl}
                      FABmode={false}
                    />
                  </div>
                </motion.div>
              )}
              {isLoading ? (
                <div className="flex items-center justify-center w-full h-full">
                  <div className="w-24 h-24 border-12 border-gray-300 border-t-[#eb4b3f] rounded-full animate-spin" />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex items-center justify-center w-full h-full overflow-hidden"
                >
                  {isTouch ? (
                    <div className="absolute z-50 -top-1 -right-1 md:-top-2 md:-right-2">
                      <ExpandImage
                        aria-label="Tampilkan Poster layar penuh"
                        imageName={`Poster ${event.title}`}
                        image={event.posterImage}
                        FABmode={true}
                      />
                    </div>
                  ) : ("")}
                  <motion.div
                    animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ type: "spring", duration: 0.3, stiffness: 250, damping: 20 }}
                    className="flex w-full h-full"
                  >
                    <Image
                      className=" bg-gray-100/70 p-[clamp(0.25rem,0.5vw,1rem)]"
                      src={posterUrl || "/placeholder.webp"}
                      layout="fill"
                      objectFit="contain"
                      alt={`${event.title} Poster Image`}
                      priority={false}
                    />
                  </motion.div>
                </motion.div>
              )}
            </div>
            <PosterUploadModal
              onUploaded={(url) => {
                setPosterUrl(url);
                setForm((f) => ({ ...f, posterImage: url }));
              }}
            />


          </div>
          <div className="flex-1 grid grid-cols-2 gap-x-5 gap-y-1 text-sm h-full">
            <div className=" flex flex-row items-center gap-2 w-full h-full col-span-2">
              <h2 className=" text-2xl font-bold p-1 rounded-md">
                Buat Event Baru
              </h2>
              <div className="flex gap-5 ml-5 w-[50%]">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95, filter: "brightness(0.75)" }}
                  whileHover={{ scale: 1.05, filter: "brightness(0.85)" }}
                  transition={{ duration: 0.1, type: "spring", stiffness: 500, damping: 25 }}
                  className={`px-4 py-2 rounded font-bold w-full bg-green-600 text-white`}
                  onClick={async () => {
                    if (!validateDetails()) return;

                    if (
                      confirm("Simpan event baru ini?")
                    ) {
                      const normalizedDetails = {
                        ...details,
                        intro: details.intro.trim(),
                        sections: details.sections.map((s) => ({
                          ...s,
                          items: s.items.map((i) => ({
                            ...i,
                            text: i.text.trim(),
                          })),
                        })),
                      };

                      await createEvent({
                        ...form,
                        posterImage: form.posterImage || "/placeholder.webp",
                        description: form.description?.trim(),
                        details: JSON.stringify(normalizedDetails),
                      });
                      router.push("/dashboard/event-list");
                    }
                  }}
                >
                  Simpan Event
                </motion.button>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95, filter: "brightness(0.75)" }}
                  whileHover={{ scale: 1.05, filter: "brightness(0.85)" }}
                  transition={{ duration: 0.1, type: "spring", stiffness: 500, damping: 25 }}
                  className="px-4 py-2 rounded bg-red-700 text-white font-bold w-full"
                  onClick={() => {
                    if (
                      confirm("Batalkan aksi dan kembali ke daftar event?")
                    ) {
                      router.push("/dashboard/event-list");
                    }
                  }}

                >
                  Kembali
                </motion.button>
              </div>

            </div>
            <label className="col-span-2">
              Nama Event
              <input
                value={form.title}
                required
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="block w-full border rounded p-2 bg-neutral-50"
              />
            </label>
            <label>
              Status Event
              <select
                value={form.status}
                disabled={statusLockedForEO}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className={`block w-full border rounded p-2 ${statusLockedForEO
                  ? "bg-neutral-100 cursor-not-allowed"
                  : "bg-neutral-50"
                  }`}
              >
                {statusLockedForEO ? (
                  <option value="UNAPPROVED">UNAPPROVED</option>
                ) : (
                  <>
                    <option>UPCOMING</option>
                    <option>JOINABLE</option>
                    <option>ONGOING</option>
                    <option>CLOSED</option>
                    <option>FINISHED</option>
                    <option>CANCELLED</option>
                  </>
                )}
              </select>
            </label>

            <label>
              Organizer
              <select
                value={form.eoId}
                required
                onChange={(e) => setForm({ ...form, eoId: e.target.value })}
                disabled={eoUsers.length === 0 || currentUserRole === "EO"}
                className={`block w-full border rounded p-2 ${currentUserRole === "EO"
                  ? "bg-neutral-100 cursor-not-allowed"
                  : "bg-neutral-50"
                  }`}
              >
                {eoUsers.map((eo) => (
                  <option key={eo.id} value={eo.id}>
                    {eo.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Tanggal Mulai
              <input
                type="date"
                value={form.startAt}
                onChange={(e) => setForm({ ...form, startAt: e.target.value })}
                className="block w-full border rounded p-2 bg-neutral-50"
              />
            </label>
            <label>
              Tanggal Selesai
              <input
                type="date"
                value={form.endAt}
                min={form.startAt}
                onChange={(e) => setForm({ ...form, endAt: e.target.value })}
                className="block w-full border rounded p-2 bg-neutral-50"
              />
            </label>
            <label className="col-span-2">
              Deskripsi Event
              <textarea
                value={form.description}
                required
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="block w-full border rounded p-2 bg-neutral-50"
              />
            </label>
          </div>
        </div>
        <div className="col-span-2 mt-1 mb-10 px-4">
          <h3 className="text-lg font-bold mb-1 border-b">Detail Event</h3>

          <label className="block mb-3">
            Intro Ketentuan
            <textarea
              value={details.intro}
              required
              onChange={(e) => setDetails({ ...details, intro: e.target.value })}
              rows={2}
              className="block w-full border rounded p-2 bg-neutral-50"
            />
          </label>
          <div className="space-y-4">
            {details.sections.map((section, sIdx) => (
              <div
                key={section.id}
                className="border rounded p-3 bg-neutral-50"
              >
                {/* Section title */}
                <h4 className="font-semibold mb-2">
                  {section.title}
                </h4>

                {/* Items */}
                <div className="space-y-2">
                  {section.items.map((item, iIdx) => (
                    // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
                    <div key={item.id}
                      draggable
                      onDragStart={() => {
                        if (section.items.length === 1) return;
                        setDragging({ sectionId: section.id, itemIndex: iIdx });
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        if (!dragging || dragging.sectionId !== section.id) {
                          setDragging(null);
                          return;
                        }

                        const next = [...details.sections];
                        const items = [...section.items];

                        const [moved] = items.splice(dragging.itemIndex, 1);
                        items.splice(iIdx, 0, moved);

                        next[sIdx] = { ...section, items };
                        setDetails({ ...details, sections: next });
                        setDragging(null);
                      }}
                      className="flex gap-2 items-center cursor-move"
                    >
                      <span className="flex align-middle justify-center select-none">
                        <FaBars className="flex shrink-0 w-full h-full" />
                      </span>
                      <input
                        value={item.text}
                        onChange={(e) => {
                          const next = [...details.sections];
                          const items = [...section.items];
                          items[iIdx] = { ...item, text: e.target.value };
                          next[sIdx] = { ...section, items };
                          setDetails({ ...details, sections: next });
                        }}
                        className="flex-1 border rounded p-2 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(section.id, item.id)}
                        className="px-2 rounded bg-red-500 text-white"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addItem(section.id)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    + Tambah item
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}
