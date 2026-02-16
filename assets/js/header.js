document.addEventListener("DOMContentLoaded", function () {
	const header = document.querySelector("header");
	const heroWithImageBg = document.querySelector(".hero-with-image-bg");

	if (!header || !heroWithImageBg) return;

	let threshold = 0;

	const recalc = () => {
		threshold = heroWithImageBg.offsetTop + heroWithImageBg.offsetHeight;
	};

	const apply = () => {
		if (document.body.classList.contains("menu-open")) return;

		header.classList.toggle("fixed", window.scrollY >= threshold);
	};

	recalc();
	apply();

	window.addEventListener('scroll', () => requestAnimationFrame(apply), { passive: true });

	window.addEventListener("resize", () => {
		recalc();
		apply();
	});

	window.addEventListener("load", () => {
		recalc();
		apply();
	});
});