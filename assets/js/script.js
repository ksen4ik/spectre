document.addEventListener("DOMContentLoaded", () => {
    const selects = [...document.querySelectorAll(".form__field.select")];

    const closeAll = (except = null) => {
        selects.forEach(s => {
            if (s === except) return;
            s.classList.remove("is-open");
        });
    };

    selects.forEach(root => {
        const head = root.querySelector(".form__head");
        const valueEl = root.querySelector(".form__head-value");
        const items = [...root.querySelectorAll(".form__item")];

        if (!head || !valueEl || !items.length) return;

        head.addEventListener("click", (e) => {
            e.preventDefault();
            const willOpen = !root.classList.contains("is-open");
            closeAll(root);
            root.classList.toggle("is-open", willOpen);
        });

        items.forEach(item => {
            item.addEventListener("click", () => {
                const radio = item.querySelector('input[type="radio"]');
                const text = item.querySelector("p")?.textContent?.trim() || "";

                if (radio) {
                    radio.checked = true;
                    radio.dispatchEvent(new Event("change", { bubbles: true }));
                }

                items.forEach(i => i.classList.remove("is-active"));
                item.classList.add("is-active");

                valueEl.textContent = text;
                root.classList.add("is-selected");

                root.classList.remove("is-open");
            });
        });

        const checked = root.querySelector('input[type="radio"]:checked');
        if (checked) {
            const item = checked.closest(".form__item");
            const text = item?.querySelector("p")?.textContent?.trim();
            if (item && text) {
                items.forEach(i => i.classList.remove("is-active"));
                item.classList.add("is-active");
                valueEl.textContent = text;
                root.classList.add("is-selected");
            }
        }
    });

    document.addEventListener("click", (e) => {
        const el = e.target instanceof Element ? e.target : null;
        if (!el?.closest(".form__field.select")) closeAll();
    });
});