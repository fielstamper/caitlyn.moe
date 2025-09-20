
document.addEventListener("astro:page-load", () => {

	let darkmode = localStorage.getItem("darkmode");
	const themeSwitch = document.getElementById("theme-switch");

	const enabledarkmode = () => {
		document.body.classList.add("darkmode");
		localStorage.setItem("darkmode", "active");
	};

	const disabledarkmode = () => {
		document.body.classList.remove("darkmode");
		localStorage.setItem("darkmode", null);
	};

	if (darkmode === "active") enabledarkmode();

	themeSwitch.addEventListener("click", () => {
		darkmode = localStorage.getItem("darkmode");
		darkmode !== "active" ? enabledarkmode() : disabledarkmode();
	});
});
