import { useState, useReducer } from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Snackbar from "@mui/material/Snackbar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion, AnimatePresence } from "framer-motion";

export default function ExportImport({ graphData, setGraph }) {
  const [copyAlertOpen, setCopyAlertOpen] = useState(false);
  const [showImport, setShowImport] = useReducer((st) => !st, false);
  const [importText, setImportText] = useState("");
  return (
    <div className="flex flex-col rounded-lg h-full w-full overflow-hidden">
      {/* Export */}
      <button
        className="flex h-fit items-center justify-between bg-primary2 text-white px-2 py-3 hover:bg-[#112e4fd3] rounded-t-md cursor-pointer transition-all duration-300"
        onClick={() => setShowImport()}
      >
        <div className="flex items-center gap-2">
          {showImport ? (
            <ArrowDropDownIcon />
          ) : (
            <CheckCircleIcon className="text-lg" />
          )}
          <h2 className="flex-grow text-sm font-normal">Export</h2>
        </div>
        <FileCopyIcon
          className="opacity-25 hover:opacity-80"
          onClick={() => {
            navigator.clipboard.writeText(
              JSON.stringify(graphData, null, "\t")
            );
            setCopyAlertOpen(true);
          }}
        />
      </button>

      {/* Export content */}
      <AnimatePresence>
        {!showImport && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.8 }}
            transition={{ duration: 0.2 }}
            className="h-full bg-primary5 text-black"
          >
            <textarea
              className="resize-none outline-none h-full w-full p-2"
              value={JSON.stringify(graphData, null, "\t")}
              readOnly
            />
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              autoHideDuration={1500}
              open={copyAlertOpen}
              onClose={() => setCopyAlertOpen(false)}
              message="Copied to clipboard!"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Import */}
      <button
        className="flex items-center h-fit gap-2 bg-primary2 border-t-[1px] text-white px-2 py-3 rounded-b-md hover:bg-[#112e4fd3] cursor-pointer transition-all duration-300"
        onClick={() => setShowImport()}
        style={{ borderRadius: `${showImport ? "0" : "0 0 5px 5px"}` }}
      >
        {showImport ? (
          <CheckCircleIcon className="text-lg" />
        ) : (
          <ArrowDropDownIcon />
        )}
        Import
      </button>

      {/* Import content */}
      <AnimatePresence>
        {showImport && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.8 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full bg-primary5 text-black"
          >
            <textarea
              className="resize-none outline-none h-full w-full p-2"
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit button */}
      {showImport && (
        <button
          className="bg-[#91c5f8] text-[#455b7f] rounded-b-md py-3 font-bold cursor-pointer hover:bg-[#91c5f8b8] transition-all duration-200"
          onClick={() => setGraph(JSON.parse(importText))}
        >
          Submit
        </button>
      )}
    </div>
  );
}
