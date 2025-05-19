const marked = require('marked');

// Extract links
function extractLinks(text) {
  const regex = /\[.*?\]\((.*?)\)/g;
  const links = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    links.push(match[1]);
  }
  return links;
}

// Format heading levels into strings
function formatHeadings(headings) {
  return headings
    .map((text, i) => `${'#'.repeat(i + 1)} ${text}`)
    .join('\n');
}

// Convert any cell (text or token) into string
function renderCell(cell) {
  if (typeof cell === 'string') return cell;
  if (typeof cell === 'object' && cell.tokens) {
    return marked.Parser.parseInline(cell.tokens);
  }
  return String(cell);
}

function chunkMarkdown(markdownText) {
  const tokens = marked.lexer(markdownText);
  const chunks = [];
  let currentHeadings = [];

  for (const token of tokens) {
    // Track headings
    if (token.type === 'heading') {
      currentHeadings[token.depth - 1] = token.text;
      currentHeadings = currentHeadings.slice(0, token.depth);
    }

    // Handle paragraphs
    if (token.type === 'paragraph') {
      const context = formatHeadings(currentHeadings);
      const content = `${context}\n${token.text}`;
      chunks.push({
        content,
        links: extractLinks(token.text)
      });
    }

    // ✅ Handle tables (with token headers/rows)
    if (token.type === 'table') {
      const context = formatHeadings(currentHeadings);
      const headers = token.header.map(renderCell);
      const rows = token.rows.map(row => row.map(renderCell));

      for (const row of rows) {
        const rowText = row.map((cell, i) => `${headers[i]}: ${cell}`).join('\n');
        chunks.push({
          content: `${context}\n${rowText}`,
          links: extractLinks(rowText)
        });
      }
    }
  }

  return chunks;
}

module.exports = { chunkMarkdown };
