"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import ExpandImage from "@/components/ui/expandImgBtn";
import { motion } from "framer-motion";
import { logoFont } from "@/lib/fonts";
import { FaEdit } from "react-icons/fa";
import ActionButtons from "@/components/navbar/dashboard/DBActionBtn";
import { useRouter } from "next/navigation";

type EditEventProps = {
  event: {
    id: string;
    title: string;
    status: string;
    posterImage: string | null;
    startAt: Date;
    endAt: Date | null;
    eo: { id: string; name: string | null };
    _count: { participants: number };
  };
  participants: {
    id: string;
    name: string | null;
    email: string;
    contact: string | null;
    status: string;
  }[];
};

export default function ViewEvent({
  event,
  participants,
}: EditEventProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isTouch, setIsTouch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const tableScrollRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const total = participants.length;
  const verified = participants.filter(p => p.status === "VERIFIED").length;
  const attended = participants.filter(p => p.status === "ATTENDED").length;

  const formatDate = (d?: Date | null) =>
    d
      ? d.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      : "-";


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

  const filteredParticipants = useMemo(() => {
    return participants.filter(p => {
      const matchSearch =
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "ALL" || p.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [participants, search, statusFilter]);

  const canAddParticipant =
    event.status === "JOINABLE" || event.status === "ONGOING";

  return (
    <div className="h-full flex flex-col contain-inline-size">
      <div className="absolute h-full inset-0 bg-linear-to-tr from-violet-200 via-violet-300 to-blue-200 -z-10" />

      <div className="sticky top-[clamp(3.5rem,6vh,6rem)] z-30 bg-neutral-100/95 backdrop-blur-3xl border-b border-neutral-200 text-black">
        <div className="flex flex-col md:flex-row gap-2 mt-4 mx-2 mb-2">
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
                    image={event.posterImage}
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
                    src={event.posterImage ? `${event.posterImage}` : "/placeholder.webp"}
                    layout="fill"
                    objectFit="contain"
                    alt={`${event.title} Poster Image`}
                    priority={false}
                  />
                </motion.div>
              </motion.div>
            )}
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 text-sm">
            <div className="col-span-2 flex flex-row items-center gap-2">
              <h2 className=" text-2xl font-bold pt-1 pl-2 pr-5 rounded-md w-fit">
                {event.title}
              </h2>
            </div>
            <div>
              Status
              <div className="block w-full border rounded py-1 px-3 bg-neutral-50">
                {event.status}
              </div>
            </div>
            <div>
              Organizer
              <div className="block w-full border rounded py-1 px-3 bg-neutral-50">
                {event.eo.name ?? "-"}
              </div>
            </div>
            <div>
              Start Date
              <div
                className="block w-full border rounded py-1 px-3 bg-neutral-50"
              >
                {formatDate(event.startAt)}
              </div>
            </div>

            <div>
              End Date
              <div
                className="block w-full border rounded py-1 px-3 bg-neutral-50"
              >
                {formatDate(event.endAt)}
              </div>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4 mt-2 font-semibold">
              <div>Pending Verification : -</div>
              <div>Verified Participants : -</div>
              <div>Attended the Event : -</div>
              <div>Participant Rate : -</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 sticky z-30 bg-white overflow-hidden">
        <div className="flex items-center gap-3 py-2 px-4 border-b-3 border-neutral-300/70 text-sm">
          <label className="flex flex-col text-neutral-700 font-bold">
            Cari Peserta
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-3 py-2 rounded-md bg-white text-neutral-600 border border-neutral-200 w-96"
              placeholder="Search name or email..."
            />
          </label>
          <label className="flex flex-col text-neutral-700 font-bold">
            Filter Status
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-md bg-white border border-neutral-200 text-neutral-600"
            >
              <option value="ALL">All</option>
              <option value="REGISTERED">Registered</option>
              <option value="VERIFIED">Verified</option>
              <option value="ATTENDED">Attended</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </label>
          <motion.button
            type="button"
            onClick={() => {
              if (!canAddParticipant) return;
              router.push(`/dashboard/event-list/${event.id}/add-participant`);
            }}
            disabled={!canAddParticipant}
            whileTap={canAddParticipant && { scale: 0.95, filter: "brightness(0.75)" }}
            whileHover={canAddParticipant && { scale: 1.05, filter: "brightness(0.85)" }}
            transition={{ duration: 0.1, type: "spring", stiffness: 500, damping: 25 }}
            className={`px-3 py-2 mt-6 rounded-md font-bold border border-neutral-200
              ${canAddParticipant
                ? "bg-green-500 text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Tambah Peserta Baru
          </motion.button>
        </div>
      </div>
      <div className="flex-1 bg-white overflow-hidden">
        <div ref={tableScrollRef} className="h-full overflow-y-auto">
          <table className="w-full table-fixed border-collapse text-sm text-black">
            <thead className="sticky top-0 bg-neutral-100 z-10">
              <tr>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredParticipants.map(p => (
                <tr key={p.id} className="border-b">
                  <td className="px-4 py-3 font-semibold">{p.status}</td>
                  <td className="px-4 py-3 truncate">{p.name ?? "-"}</td>
                  <td className="px-4 py-3 truncate">{p.email}</td>
                  <td className="px-4 py-3 truncate">{p.contact ?? "-"}</td>
                  <td className="px-4 py-3 text-center">
                    <ActionButtons
                      onEdit={() =>
                        router.push(`/dashboard/event-list/${event.id}/${p.id}`)
                      }
                      noView={true}
                    />
                  </td>
                </tr>
              ))}

              {filteredParticipants.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-neutral-400">
                    No participants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
