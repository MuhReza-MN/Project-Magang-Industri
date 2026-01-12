"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { animate, AnimatePresence, motion, useMotionValue } from "framer-motion";
import { RiCloseLargeFill } from "react-icons/ri";
import { FiZoomIn, FiZoomOut, FiCheck, FiTrash2 } from "react-icons/fi";
import { HiOutlineUpload } from "react-icons/hi";
import { useDropzone } from "react-dropzone";
import Image from "next/image";


export default function PosterUploadModal({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [hasPreview, setHasPreview] = useState(false);


  const [scale, setScale] = useState(1);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scaleMv = useMotionValue(1);

  const handleZoom = (newScale: number) => {
    const clamped = Math.min(Math.max(newScale, 1), 3);

    animate(scaleMv, clamped, { duration: 0.3, ease: "easeInOut" });
    setScale(clamped);

    if (clamped === 1) {
      animate(x, 0, { duration: 0.3 });
      animate(y, 0, { duration: 0.3 });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setScale(1);
    animate(scaleMv, 1, { duration: 0.2, ease: "easeInOut" });
    animate(x, 0, { duration: 0.2, ease: "easeInOut" });
    animate(y, 0, { duration: 0.2, ease: "easeInOut" });
  };

  const handleConfirm = async () => {
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload-poster", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Upload gagal");
      return;
    }

    onUploaded(data.url);
    handleClose();
  };


  const onDrop = (acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    if (!f) return;

    // Validate size (2MB)
    if (f.size > 2 * 1024 * 1024) {
      alert("Ukuran maksimal 2MB");
      return;
    }

    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setHasPreview(true);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: hasPreview,
    noKeyboard: hasPreview,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: 1,
  });


  return (
    <>
      <motion.button
        type="button"
        whileTap={{ scale: 0.95, filter: "brightness(0.75)" }}
        whileHover={{ scale: 1.05, filter: "brightness(0.85)" }}
        transition={{ duration: 0.1, type: "spring", stiffness: 500, damping: 25 }}
        onClick={() => setOpen(true)}
        className="px-4 py-1 mx-2 w-[250px] rounded bg-neutral-300 text-black font-bold"
      >
        Ganti Poster
      </motion.button>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-80 flex items-center justify-center bg-black/40"
              >
                <motion.div
                  initial={{ scale: 0.95, y: 30 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 30 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative bg-white rounded-xl shadow-xl w-[95%] max-w-5xl h-[85vh] p-4 flex flex-col"
                >
                  <motion.button
                    type="button"
                    onClick={handleClose}
                    whileTap={{ scale: 0.85 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-2 right-2 z-60 bg-black/70 hover:bg-black/90 active:bg-black/90 text-white/80 hover:text-white/90 active:text-white/90 rounded-full p-2 transition-colors duration-100"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                    >
                      <RiCloseLargeFill size={22} />
                    </motion.div>
                  </motion.button>

                  <div
                    {...getRootProps()}
                    className={`relative flex-1 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden
                      ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
                    `}
                  >
                    <input {...getInputProps()} />
                    {hasPreview && previewUrl ? (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ scale: scaleMv, x, y }}
                        drag
                        dragConstraints={{
                          left: -150 * scale,
                          right: 150 * scale,
                          top: -150 * scale,
                          bottom: 150 * scale,
                        }}
                        dragElastic={0.2}
                        dragMomentum={false}
                      >
                        {/** biome-ignore lint/performance/noImgElement: <explanation> */}
                        <img
                          src={previewUrl}
                          className="max-w-full max-h-full object-contain pointer-events-none"
                          alt="Poster preview"
                        />
                      </motion.div>
                    ) : (
                      <>
                        <HiOutlineUpload size={64} className="text-neutral-500" />
                        <p className="mt-3 font-semibold text-neutral-500">
                          {isDragActive ? "Lepaskan file..." : "Drop poster here or click to upload"}
                        </p>
                        <p className="text-xs mt-1 text-neutral-500">Max 2MB • JPG / PNG / WEBP (will convert to WEBP)</p>
                      </>
                    )}

                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      {hasPreview && (
                        <>
                          <motion.button
                            type="button"
                            onClick={() => handleZoom(scale + 0.2)}
                            disabled={scale >= 3}
                            whileTap={{ scale: 0.85 }}
                            animate={scale >= 3 ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 0.2 }}
                            className={`w-[clamp(2.5rem,3vw,20rem)] h-[clamp(2.5rem,3vw,20rem)] rounded-full flex items-center justify-center 
                          ${scale >= 3 ? "cursor-not-allowed bg-gray-800/60" : "bg-gray-300/60 hover:bg-gray-200/80 active:bg-gray-200/80"}
                        `}
                          >
                            <FiZoomIn
                              className={`text-[clamp(2rem,2.5vw,10rem)] 
                            ${scale >= 3 ? "text-gray-300/70" : "text-slate-950/70 hover:text-black/80 active:text-black/80"}
                          `}
                            />
                          </motion.button>
                          <motion.button
                            type="button"
                            onClick={() => handleZoom(scale - 0.2)}
                            disabled={scale <= 1}
                            whileTap={{ scale: 0.85 }}
                            animate={scale <= 1 ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 0.2 }}
                            className={`w-[clamp(2.5rem,3vw,20rem)] h-[clamp(2.5rem,3vw,20rem)] rounded-full flex items-center justify-center 
                          ${scale <= 1 ? "cursor-not-allowed bg-gray-800/60" : "bg-gray-300/60 hover:bg-gray-200/80 active:bg-gray-200/80"}
                        `}
                          >
                            <FiZoomOut
                              className={`text-[clamp(2rem,2.5vw,10rem)] 
                            ${scale <= 1 ? "text-gray-300/70" : "text-slate-950/70 hover:text-black/80 active:text-black/80"}
                          `}
                            />
                          </motion.button>
                        </>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 flex gap-2">
                      {hasPreview && (
                        <>
                          <button
                            type="button"
                            onClick={handleConfirm}
                            className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700"
                          >
                            <FiCheck />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFile(null);
                              setPreviewUrl(null);
                              setHasPreview(false);
                              handleZoom(1);
                            }}
                            className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700"
                          >
                            <FiTrash2 />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
