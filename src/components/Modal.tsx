import classNames from "classnames";
import React, { PropsWithChildren, useRef } from "react";

const defaultStyles =
  "h-[80%] max-h-[650px] flex flex-col relative p-6 md:p-8 lg:p-10 w-10/12 max-w-[900px] bg-white rounded-lg";
interface ModalProps extends PropsWithChildren {
  onClose: () => void;
  modalContentContainerStyle?: string;
  shouldModalCloseOnClick?: boolean;
  inlineModalContentStyle?: any;
}

const Modal = ({
  children,
  onClose,
  modalContentContainerStyle,
  shouldModalCloseOnClick = true,
  inlineModalContentStyle = {},
}: ModalProps) => {
  const modelRef = useRef<HTMLElement | null>(null);
  return (
    <div
      className="fixed grid place-items-center w-dvw h-dvh bg-[rgba(0,0,0,0.3)] z-[100000000] fade-in top-0 left-0 right-0 bottom-0"
      onClick={(e) => {
        if (!shouldModalCloseOnClick) return;
        if (e.target === modelRef.current) {
          onClose();
          e.stopPropagation();
        }
      }}
      ref={modelRef as any}
    >
      <div
        className={classNames(defaultStyles, modalContentContainerStyle)}
        style={inlineModalContentStyle}
      >
        <button
          className="cursor-pointer absolute right-6 md:right-8 lg:right-10 text-2xl lg:text-3xl translate-y-1 danger-bg"
          onClick={onClose}
        >
          {/* <i className="fi fi-sr-circle-xmark flex"></i> */}
          <i className="fi fi-rr-cross-small flex danger"></i>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
