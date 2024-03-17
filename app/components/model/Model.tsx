"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModelProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Model: React.FC<ModelProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModel, setShowModel] = useState(open);
  useEffect(() => {
    setShowModel(open);
  }, [open]);
  const HandleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModel(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);
  const submitHandler = () => {
    if (disabled) {
      return;
    }
    onSubmit();
  };
  const secondaryActionHandler = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);
  if (!open) {
    return null;
  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 select-none">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div
            className={`translate duration-300 h-full ${
              showModel ? "translate-y-0" : "translate-y-full"
            } ${showModel ? "opacity-100" : "opacity-0"}`}
          >
            <div className=" translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* header */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button
                  onClick={HandleClose}
                  className="p-1 border-0 hover:placeholder-opacity-70 absolute left-9"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* body */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* footer */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      label={secondaryActionLabel}
                      disabled={disabled}
                      onClick={secondaryActionHandler}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={submitHandler}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
