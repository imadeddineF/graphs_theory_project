import { useReducer } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { motion, AnimatePresence } from "framer-motion";

export default function SubMenu({ title, list, setCurrentAlgorithm }) {
  const [open, toggleOpen] = useReducer((st) => !st, true);

  return (
    <div className="text-[16px]">
      {/* Title */}
      <div
        className="py-3 z-50 px-2 flex items-center justify-between cursor-pointer hover:bg-[#0e253f] transition-all duration-300"
        style={{ borderBottom: open ? "" : "solid #06121f 1px" }}
        onClick={toggleOpen}
      >
        {title}
        {open ? (
          <ArrowDropDownIcon style={{ fontSize: "1.5rem" }} />
        ) : (
          <ArrowRightIcon style={{ fontSize: "1.5rem" }} />
        )}
      </div>

      {/* List */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.8 }}
            transition={{ duration: 0.2 }}
            className=""
          >
            {list.map((item, id) => (
              <div
                key={id}
                className="bg-[#06121f] py-3 px-4 cursor-pointer hover:bg-[#0e253f] transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentAlgorithm(item);
                }}
              >
                {item}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
