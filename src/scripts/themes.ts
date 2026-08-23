document.addEventListener("astro:page-load", () => {
	const THEME_KEY = "theme";
	const themeSystem = document.getElementById(
		"theme-system",
	) as HTMLInputElement;
	const themeLight = document.getElementById(
		"theme-light",
	) as HTMLInputElement;
	const themeDark = document.getElementById(
		"theme-dark",
	) as HTMLInputElement;

	const themes: Record<string, HTMLInputElement> = {
		dark: themeDark,
		light: themeLight,
		system: themeSystem,
	};

	function updateTheme(theme: string | null) {
		if (theme) localStorage.setItem(THEME_KEY, theme);
		else localStorage.removeItem(THEME_KEY);
		(themes[theme ?? "system"] ?? themeSystem).checked = true;
	}

	Object.entries(themes).forEach(([key, input]) => {
		input.addEventListener("change", () => {
			if (input.checked)
				updateTheme(key === "system" ? null : key);
		});
	});

	updateTheme(localStorage.getItem(THEME_KEY));
});
