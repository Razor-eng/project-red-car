// utils/formatDate.js

export function formatDate(dateString: Date) {
    if (!dateString) return ""; // Handle null, undefined, or empty string

    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit' });
    return formatter.format(date);
}
