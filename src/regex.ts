function extractMarkdownLinks(markdown: string) {
	// Regex for find all markdown links
	const regex = /\[([^\]]+)\]\([^)]+\)/g;

	// Replace the links for content in brackets
	return markdown.replace(regex, (match, p1) => p1);
}

function extractItalic(markdown: string) {
	// Regex for find all italic
	const regex = /(\*\w*\w\*)/g;

	// Replace the italic markdown for whatsapp italic
	markdown = markdown.replace(regex, (match, p1) => {
		return `_${p1}_`;
	});
	markdown = markdown.replaceAll("*_*", "**"); // bold
	markdown = markdown.replaceAll("*_", "_").replaceAll("_*", "_"); // italic
	return markdown;
}

function convertBold(markdown: string) {
	return markdown.replaceAll("**", "*");
}

function convertStrikeThrough(markdown: string) {
	return markdown.replaceAll("~~", "~");
}

function convertQuote(markdown: string) {
	const regex = /^>(\S+)/gm;

	markdown = markdown.replace(regex, (match, p1) => {
		return `> ${p1}`;
	});
	markdown = markdown.replaceAll("> \n", ""); // remove the empty quote
	return markdown;
}

function convertTitles(markdown: string) {
	const regex = /^(#{1,6})\s*(.+)/gm;
	return markdown.replace(regex, (match, hashes, title) => {
		return `*${title.trim()}*`;
	});
}

function removeImages(markdown: string) {
	const regex = /!\[.*?\]\(.*?\)/g;
	return markdown.replace(regex, (match, p1) => {
		return "";
	});
}

function convertHighlight(markdown: string) {
	const regex = /==([^=]+)==/g;
	return markdown.replace(regex, (match, p1) => {
		return `*${p1}*`;
	});
}

function convertEquations(markdown: string) {
	const regex = /\$([^$]+)\$/g;

	return markdown.replace(regex, (match, p1) => {
		return `\`${p1}\``;
	});
}

function convertCheckList(markdown: string) {
	return markdown.replaceAll("- [ ] ", "- ").replaceAll("- [x] ", "- ");
}

function removeExtraBreakLines(markdown: string) {
	const regex = /\n{3,}/g;

	return markdown.replace(regex, (match, p1) => {
		return "\n\n";
	});
}

function removeHorizontalLine(markdown: string) {
	const regex = /-{3,}/g;
	return markdown.replace(regex, (match, p1) => {
		return "";
	});
}

export function converts(markdown: string) {
	markdown = removeImages(markdown);
	markdown = extractMarkdownLinks(markdown);
	markdown = extractItalic(markdown);
	markdown = convertTitles(markdown);
	markdown = convertBold(markdown);
	markdown = convertStrikeThrough(markdown);
	markdown = convertQuote(markdown);
	markdown = convertHighlight(markdown);
	markdown = convertEquations(markdown);
	markdown = convertCheckList(markdown);
	markdown = removeHorizontalLine(markdown);
	markdown = removeExtraBreakLines(markdown);
	return markdown;
}
