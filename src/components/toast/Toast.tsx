import toastStyle from "@/components/toast/Toast.module.css";
import { useState } from "react";

interface Props {
  toastText: string;
  toastClass?: string;
}

export default function Toast({ toastClass, toastText }: Props) {
  return (
    <div className={toastClass}>
      <div className={toastStyle.toastSuccess}>
        <p>{toastText}</p>
      </div>
    </div>
  );
}
