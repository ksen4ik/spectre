document.addEventListener("DOMContentLoaded", () => {
	if (window.innerWidth >= 1024) return;

	const header = document.querySelector("header");
	const mobileMenu = document.querySelector(".mobileMenu");
	if (!header || !mobileMenu) return;

	const headerFixedInitially = header.classList.contains("fixed");

	document.addEventListener("click", (event) => {
		const burgerBtn = event.target.closest(".burger");
		if (!burgerBtn) return;

		burgerBtn.classList.toggle("active");
		mobileMenu.classList.toggle("active");
		document.body.classList.toggle("lock");

		const burgerActiveNow = burgerBtn.classList.contains("active");

		document.body.classList.toggle("menu-open", burgerActiveNow);

		header.classList.toggle("fixed", headerFixedInitially || burgerActiveNow);
	});
});