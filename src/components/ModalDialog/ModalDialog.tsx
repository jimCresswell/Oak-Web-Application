import { FC, ReactNode, useRef } from "react";
import {
  useOverlay,
  usePreventScroll,
  useModal,
  AriaOverlayProps,
} from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { AriaDialogProps } from "@react-types/dialog";
import { useKeyboard } from "react-aria";

import Box from "../Box";
import Flex from "../Flex";

type ModalDialogProps = AriaDialogProps &
  AriaOverlayProps & {
    title: string;
    size: "fullscreen" | "small";
    children: ReactNode;
    closeModal?: () => void;
  };
const ModalDialog: FC<ModalDialogProps> = (props) => {
  const {
    // title, // fix this
    children,
    size,
    closeModal,
    isDismissable,
  } = props;

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const ref = useRef<HTMLDivElement>(null);
  const { overlayProps, underlayProps } = useOverlay(props, ref);

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll();
  const { modalProps } = useModal();

  // Get props for the dialog and its title
  const {
    dialogProps,
    // titleProps, //titleProps should be included
  } = useDialog(props, ref);

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (e.key === "Escape") {
        if (isDismissable && closeModal) {
          closeModal();
        }
      }
      e.continuePropagation();
    },
  });

  return (
    <Box
      style={{
        position: "fixed",
        zIndex: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...underlayProps}
    >
      <FocusScope contain restoreFocus autoFocus>
        <Flex
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          {...keyboardProps}
          ref={ref}
          $background={"white"}
          $color={"black"}
          $pa={[16, 32]}
          $position={size === "fullscreen" ? "absolute" : "relative"}
          $cover={size === "fullscreen" ? true : false}
          $width={size === "small" ? ["100%", 480] : undefined}
          $overflowY="scroll"
          $overflowX="hidden"
        >
          {/* <h2 {...titleProps} style={{ marginTop: 0 }}>
            {title}
          </h2> */}
          {children}
        </Flex>
      </FocusScope>
    </Box>
  );
};

export default ModalDialog;
