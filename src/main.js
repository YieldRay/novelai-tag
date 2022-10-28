import "./app.css";
import App from "./App.svelte";

const app = new App({
    target: document.getElementById("app"),
});

export default app;


//? Statistic
fetch("https://kokomi.deta.dev/record", {
    method: "POST",
    headers: { "Content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ url: location.href, ref: document.referrer, lang: navigator.language }),
});

window.onerror = function (msg, src, lineno, colno, error) {
    fetch("https://kokomi.deta.dev/error", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({
            url: location.href,
            src: src,
            error: { name: error.name, message: error.message, stack: error.stack },
        }),
    });
};
