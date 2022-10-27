import type { Position } from "svelte-notifications";
import { getNotificationsContext } from "svelte-notifications";

const style = document.createElement("style");
style.innerHTML = `
.position-top-center {
    z-index: 9999;
}`;
document.head.appendChild(style);

export default function () {
    const { addNotification } = getNotificationsContext();
    return function toast(text: string, position: Position = "top-center") {
        addNotification({
            text,
            position,
            removeAfter: 1000,
        });
    };
}

//? Usage:
//  import getToast from "toast";
//  const toast = getToast();
