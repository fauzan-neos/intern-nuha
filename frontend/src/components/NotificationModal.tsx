"use client";

import { CheckCircle2, XCircle, X } from "lucide-react";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error" | "loading";
  title: string;
  message: string;
  showCloseButton?: boolean;
};

export default function NotificationModal({
  isOpen,
  onClose,
  type,
  title,
  message,
  showCloseButton = true,
}: Props) {
  // Close on Escape key
  useEffect(() => {
    if (!showCloseButton) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, showCloseButton]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-200 rounded-xl bg-white p-6 shadow-2xl">
        {showCloseButton && (
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="size-5" />
            </button>
          </div>
        )}

        <div className="text-center">
          <div
            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
              type === "success" ? "bg-emerald-100" : type === "error" ? "bg-red-100" : "bg-teal-100"
            }`}
          >
            {type === "success" ? (
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            ) : type === "error" ? (
              <XCircle className="h-10 w-10 text-red-600" />
            ) : (
              <div className="h-10 w-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="mt-2 text-gray-600">{message}</p>

          {showCloseButton && (
            <button
              onClick={onClose}
              className={`mt-6 w-full rounded-lg py-3 font-semibold text-white transition-colors ${
                type === "success"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Tutup
            </button>
          )}

          {!showCloseButton && type !== "error" && (
            <div className="mt-6 flex justify-center">
               <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600 animate-progress origin-left" />
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
