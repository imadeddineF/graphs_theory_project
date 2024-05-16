/* eslint-disable react/prop-types */
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

/**
 * Alert component to display error messages in a snackbar.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.openError - Flag indicating whether the snackbar is open.
 * @param {function} props.setOpenError - Function to set the openError flag.
 * @param {string} props.error - The error message to display.
 * @returns {JSX.Element} The SnackbarAlert component.
 */
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * SnackbarAlert component to display error messages in a snackbar.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.openError - Flag indicating whether the snackbar is open.
 * @param {function} props.setOpenError - Function to set the openError flag.
 * @param {string} props.error - The error message to display.
 * @returns {JSX.Element} The SnackbarAlert component.
 */

export default function SnackbarAlert({ openError, setOpenError, error }) {
  /**
   * Function to close the snackbar.
   *
   * @param {object} evt - The event object.
   * @param {string} reason - The reason for closing the snackbar.
   */
  function closeSnackbar(evt, reason) {
    if (reason === "clickaway") return;
    setOpenError(false);
  }

  return (
    <Snackbar open={openError} autoHideDuration={3000} onClose={closeSnackbar}>
      <Alert onClose={closeSnackbar} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
}
