import { useState, useReducer } from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Snackbar from "@mui/material/Snackbar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ExportImport({ graphData, setGraph }) {
  const [copyAlertOpen, setCopyAlertOpen] = useState(false);
  const [showImport, setShowImport] = useReducer((st) => !st, false);
  const [importText, setImportText] = useState("");
  return (
    <div className="import-export rounded-lg h-full w-full">
      {/* Export */}
      <div
        className="flex items-center justify-center bg-blue-900 text-white px-2 py-0.5 rounded-t-md"
        onClick={() => setShowImport()}
      >
        {showImport ? (
          <ArrowDropDownIcon />
        ) : (
          <CheckCircleIcon className="text-lg" />
        )}
        <h2 className="flex-grow text-sm font-normal">Export</h2>
        <FileCopyIcon
          className="opacity-25 hover:opacity-80"
          onClick={() => {
            navigator.clipboard.writeText(
              JSON.stringify(graphData, null, "\t")
            );
            setCopyAlertOpen(true);
          }}
        />
      </div>

      {/* Export content */}
      {!showImport && (
        <div className="export-box h-full bg-white text-black">
          <textarea
            className="resize-none outline-none h-full w-full p-2 rounded-b-md"
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
        </div>
      )}

      {/* Import */}
      <button
        className="flex items-center h-fit justify-center bg-blue-900 text-white px-2 py-1 rounded-b-md"
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
      {showImport && (
        <div className="import-box h-full w-full bg-white text-black">
          <textarea
            className="resize-none outline-none h-full w-full p-2 rounded-b-md"
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
          />
        </div>
      )}

      {/* Submit button */}
      {showImport && (
        <button
          className=" bg-blue-300 text-black rounded-b-md py-1 cursor-pointer"
          onClick={() => setGraph(JSON.parse(importText))}
        >
          Submit
        </button>
      )}
    </div>
  );
}
