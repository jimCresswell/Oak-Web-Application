import { FC, useState } from "react";

import { useToastContext } from "../../../context/Toast";
import IconButton from "../IconButton";

const CopyLinkButton: FC = () => {
  const [label, setLabel] = useState("Copy to clipboard");
  const { showToast } = useToastContext();

  const copyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      const copyMessage = "Copied to clipboard";
      setLabel(copyMessage);
      showToast(copyMessage);
    }
  };

  return (
    <IconButton
      icon={"Share"}
      aria-label={label}
      onClick={copyLink}
      background={"teachersHighlight"}
    />
  );
};

export default CopyLinkButton;
