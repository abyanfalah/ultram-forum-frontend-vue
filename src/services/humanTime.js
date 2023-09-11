import moment from "moment";

export function threadDate(dateTime) {
	return new Date(dateTime).toLocaleString('en-us', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		// timeZone: 'utc'
		// timeStyle: "medium",
		hour: 'numeric',
		minute: 'numeric',
	});
}

export function timesAgo(dateTime) {

	const minutesAgo = moment().diff(
		moment(dateTime), 'minutes'
	);
	if (minutesAgo < 1) return 'Just now';
	if (minutesAgo < 59) return `${minutesAgo}m ago`;

	const hoursAgo = moment().diff(
		moment(dateTime), 'hours'
	);
	if (hoursAgo < 24) return `${hoursAgo}h ago`;

	const daysAgo = moment().diff(
		moment(dateTime), 'days'
	);
	if (daysAgo < 2) return `Yesterday`;
	if (daysAgo < 7) return `${daysAgo}d ago`;
	if (daysAgo < 14) return 'A week ago';

	return moment(dateTime, 'DD MMM, YYYY [at] h:mm A');
}