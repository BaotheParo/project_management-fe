// src/components/Notification.jsx
import { CheckCircleIcon } from "@phosphor-icons/react";
import { useEffect } from "react";

export default function SuccessNotification({
    message,
    subText,
    onClose,
}) {
    useEffect(() => {
    const timer = setTimeout(() => onClose(), 4000);
    return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-5 right-5 bg-white text-black border border-[#e5e7eb] px-5 py-3 rounded-lg shadow-lg flex gap-5 animate-slide-up">
            <CheckCircleIcon size={20} color="#00a63e" weight="bold" />
            <div>
            <div className="font-medium text-sm text-[#00a63e]">{message}</div>
            {subText && <div className="text-xs text-gray-400">{subText}</div>}
            </div>
        </div>
    );
}