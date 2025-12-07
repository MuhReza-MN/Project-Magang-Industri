"use client";

import { motion } from "framer-motion";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";


type ActionBtnProps = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ActionButtons({ onView, onEdit, onDelete }: ActionBtnProps) {

  return (
    <div
      className=" flex lg:flex-row flex-col lg:gap-0 gap-0.5 items-stretch justify-center h-full"
    >
      <motion.button
        onClick={onView}
        initial={{ backgroundColor: "#ffffff", color: "#007cd4" }}
        whileHover={{ backgroundColor: "#007cd4", color: "#ffffff", filter: "brightness(0.9)" }}
        whileTap={{ backgroundColor: "#007cd4", color: "#ffffff", filter: "brightness(0.5)" }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className=" flex items-center justify-center overflow-hidden flex-row lg:flex-col lg:min-w-10
          bg-white border-y-2 border-l-2 border-r border-[#007cd4] w-full select-none
          rounded-l-lg lg:rounded-r-none lg:rounded-tl-lg lg:rounded-bl-lg
        "
        aria-label="View Data"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.12, type: "spring" }}
          className="flex flex-row lg:flex-col items-center gap-0.5 shrink-0 px-2 py-1 w-full"
        >
          <LuEye className="text-xl shrink-0" />
          <span className="hidden lg:block text-xs font-medium">View</span>
        </motion.div>
      </motion.button>
      <motion.button
        onClick={onEdit}
        initial={{ backgroundColor: "#ffffff", color: "#00d27f" }}
        whileHover={{ backgroundColor: "#00d27f", color: "#ffffff", filter: "brightness(0.9)" }}
        whileTap={{ backgroundColor: "#00d27f", color: "#ffffff", filter: "brightness(0.5)" }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className=" flex items-center justify-center overflow-hidden flex-row lg:flex-col lg:min-w-10
          bg-white border-y-2 border-x border-[#00d27f] w-full select-none
        "
        aria-label="Edit Data"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.12, type: "spring" }}
          className="flex flex-row lg:flex-col items-center gap-0.5 shrink-0 px-2 py-1 w-full"
        >
          <LuPencil className="text-xl shrink-0" />
          <span className="hidden lg:block text-xs font-medium">Edit</span>
        </motion.div>
      </motion.button>
      <motion.button
        onClick={onDelete}
        initial={{ backgroundColor: "#ffffff", color: "#ff3333" }}
        whileHover={{ backgroundColor: "#ff3333", color: "#ffffff", filter: "brightness(0.9)" }}
        whileTap={{ backgroundColor: "#ff3333", color: "#ffffff", filter: "brightness(0.5)" }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className=" flex items-center justify-center overflow-hidden flex-row lg:flex-col lg:min-w-10
          bg-white border-y-2 border-r-2 border-l border-[#ff3333] w-full select-none
          rounded-r-lg lg:rounded-l-none lg:rounded-tr-lg lg:rounded-br-lg 
        "
        aria-label="Delete Data"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.12, type: "spring" }}
          className="flex flex-row lg:flex-col items-center gap-0.5 shrink-0 px-2 py-1 w-full"
        >
          <LuTrash2 className="text-xl shrink-0" />
          <span className="hidden lg:block text-xs font-medium">Delete</span>
        </motion.div>
      </motion.button>
    </div>
  )
}