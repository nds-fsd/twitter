import { useState } from "react";
import styles from "./IconButton.module.css";
import { Link } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";

const ShareButton = ({ meow }) => {
  const currentUrl = window.location.origin;
  const meowUrl = `${currentUrl}/meow/${meow._id}`;

  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
  };

  if (copied === true) {
    toast.success("Link copied!");
  }

  return (
    <div
      className={styles.iconsContainer}
      data-tooltip-id="Share"
      data-tooltip-content="Share"
      data-tooltip-place="top"
    >
      <CopyToClipboard text={meowUrl} onCopy={handleCopy}>
        <button id="shareButton" type="button" className={styles.iconButton}>
          <Link size={20} color="grey" />
          <Tooltip id="Share" />
        </button>
      </CopyToClipboard>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ShareButton;
