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
	return dateTime;
}