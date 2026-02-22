document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll(".accordeon");
    if (!accordions.length) return;

    accordions.forEach((acc) => {
        const items = Array.from(acc.querySelectorAll(".accordeon-item"));

        items.forEach((item, idx) => {
            const head = item.querySelector(".accordeon-head");
            const body = item.querySelector(".accordeon-body");
            if (!head || !body) return;

            const bodyId = body.id || `acc-body-${Math.random().toString(16).slice(2)}-${idx}`;
            body.id = bodyId;

            head.setAttribute("role", "button");
            head.setAttribute("tabindex", "0");
            head.setAttribute("aria-controls", bodyId);

            const opened = item.classList.contains("is-open");
            head.setAttribute("aria-expanded", opened ? "true" : "false");
        });

        const closeAll = (except = null) => {
            items.forEach((it) => {
                if (it === except) return;
                it.classList.remove("is-open");
                const h = it.querySelector(".accordeon-head");
                if (h) h.setAttribute("aria-expanded", "false");
            });
        };

        const toggle = (item) => {
            const head = item.querySelector(".accordeon-head");
            const isOpen = item.classList.toggle("is-open");

            if (head) head.setAttribute("aria-expanded", isOpen ? "true" : "false");
            if (isOpen) closeAll(item);
        };

        acc.addEventListener("click", (e) => {
            const head = e.target.closest(".accordeon-head");
            if (!head || !acc.contains(head)) return;

            const item = head.closest(".accordeon-item");
            if (!item) return;

            toggle(item);
        });
    });
});