import type { Position } from "svelte-notifications";
import { getNotificationsContext } from "svelte-notifications";

export default function toastBuilder() {
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
