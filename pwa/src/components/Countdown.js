import React, { useState } from "react";

function Countdown({ style, to }) {
	const [currentTime, setCurrentTime] = useState(Date.now());

	setInterval(() => {
		setCurrentTime(Date.now());
	}, 1000);

	let seconds = (Date.parse(to) - Date.now()) / 1000;

	let isDue = seconds < 0;
	if (isDue) seconds *= -1;

	seconds -= seconds % 1;
	let minuites = seconds / 60;
	minuites -= minuites % 1;
	seconds -= minuites * 60;
	let hours = minuites / 60;
	hours -= hours % 1;
	minuites -= hours * 60;
	let days = hours / 24;
	days -= days % 1;
	hours -= days * 24;

	let prettyCountdown = "";
	if (days) prettyCountdown += `${days} days, `;
	if (hours) prettyCountdown += `${hours} hours and `;
	prettyCountdown += `${minuites} min `;
	if (isDue) prettyCountdown += "due";
	else prettyCountdown += "left";

	return <span style={style}>{prettyCountdown}</span>;
}

export default Countdown;
