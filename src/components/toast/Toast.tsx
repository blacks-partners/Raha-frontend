import toastStyle from "@/components/toast/Toast.module.css";
import { useState } from "react";

interface Props {
  toastText: string;
}

export default function Toast({ toastText }: Props) {
  return (
    <div className={toastStyle.toastArea}>
      <div className={toastStyle.toastSuccess}>
        <p>{toastText}</p>
      </div>
    </div>
  );
}
