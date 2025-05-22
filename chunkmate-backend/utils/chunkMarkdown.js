const marked = require('marked');

// Extract links from [text](url) and <a href="...">
function extractLinks(text) {
  const markdownRegex = /\[.*?\]\((.*?)\)/g;
  const htmlRegex = /<a\s+href=["'](.*?)["']/g;
  const links = [];
  let match;

  while ((match = markdownRegex.exec(text)) !== null) {
    links.push(match[1]);
  }
  while ((match = htmlRegex.exec(text)) !== null) {
    links.push(match[1]);
  }

  return links;
}

// Format heading context as "# Heading", "## Subheading", etc.
function formatHeadings(headings) {
  return headings
    .map((text, i) => `${'#'.repeat(i + 1)} ${text}`)
    .join('\n');
}

// ✅ Safely convert table cell to readable Markdown text
function getRawText(cell) {
  if (typeof cell === 'string') return cell;
  if (typeof cell === 'object') {
    if ('text' in cell) return cell.text;
    if ('tokens' in cell) return marked.Parser.parseInline(cell.tokens);
  }
  return String(cell);
}

function chunkMarkdown(markdownText) {
  const tokens = marked.lexer(markdownText);
  const chunks = [];
  let currentHeadings = [];

  for (const token of tokens) {
    // Capture heading levels
    if (token.type === 'heading') {
      currentHeadings[token.depth - 1] = token.text;
      currentHeadings = currentHeadings.slice(0, token.depth);
    }

    // Chunk paragraphs
    if (token.type === 'paragraph') {
      const context = formatHeadings(currentHeadings);
      const content = `${context}\n${token.text}`;
      chunks.push({
        content,
        links: extractLinks(token.text),
      });
    }

    // Chunk tables
    if (token.type === 'table') {
      const context = formatHeadings(currentHeadings);
      const headers = token.header.map(getRawText);
      const rows = token.rows.map(row => row.map(getRawText));

      for (const row of rows) {
        const rowTextParts = [];
        const allLinks = [];

        row.forEach((cell, i) => {
          const rendered = `${headers[i]}: ${cell}`;
          rowTextParts.push(rendered);
          allLinks.push(...extractLinks(cell));
        });

        const rowText = rowTextParts.join('\n');

        chunks.push({
          content: `${context}\n${rowText}`,
          links: allLinks,
        });
      }
    }
  }

  return chunks;
}

module.exports = { chunkMarkdown };
