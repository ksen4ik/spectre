document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth < 1024) return;

    const items = [...document.querySelectorAll(".services__card")];
    if (!items.length) return;

    function cachePHeights() {
        items.forEach(el => {
            const p = el.querySelector("p");
            if (p) el.style.setProperty("--p-h", p.scrollHeight + "px");
        });
    }

    function updateActive() {
        const mid = window.innerHeight / 2;

        let bestEl = items[0];
        let bestDist = Infinity;

        for (const el of items) {
            const r = el.getBoundingClientRect();
            const center = r.top + r.height / 2;
            const dist = Math.abs(center - mid);

            if (dist < bestDist) {
                bestDist = dist;
                bestEl = el;
            }
        }

        items.forEach((el) => el.classList.toggle("active", el === bestEl));
    }

    let raf = 0;
    const onScroll = () => {
        if (raf) return;

        raf = requestAnimationFrame(() => {
            updateActive();
            raf = 0;
        });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { cachePHeights(); onScroll(); });

    cachePHeights();
    updateActive();
});