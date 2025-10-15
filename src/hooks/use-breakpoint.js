import { useState, useEffect } from 'react';

const useBreakpoint = (query)  => {
	const [matches, setMatches] = useState(() => (
		typeof window !== "undefined" ? window.matchMedia(query).matches : false
	));

	useEffect(() => {
		if (typeof window === "undefined") return;
		const mediaQuery = window.matchMedia(query);
		const handleChange = () => setMatches(mediaQuery.matches);
		handleChange();
		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [query]);

	return matches;
};

export default useBreakpoint;