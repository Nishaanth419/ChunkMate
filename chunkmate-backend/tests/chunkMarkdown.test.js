const { chunkMarkdown } = require('../utils/chunkMarkdown');

describe('chunkMarkdown()', () => {
  it('should split paragraphs with headings into separate chunks', () => {
    const md = `# Heading 1
## Heading 2

This is the first paragraph.

This is the second paragraph.`;

    const chunks = chunkMarkdown(md);

    expect(chunks.length).toBe(2);
    expect(chunks[0].content).toContain('# Heading 1');
    expect(chunks[0].content).toContain('This is the first paragraph.');
    expect(chunks[1].content).toContain('This is the second paragraph.');
  });

  it('should extract links from paragraphs', () => {
    const md = `## Heading
Here is a [link](https://example.com) to test.`;

    const chunks = chunkMarkdown(md);

    expect(chunks[0].links).toContain('https://example.com');
  });

  it('should chunk each row of a table', () => {
    const md = `# Heading

| Feature | Description |
|---------|-------------|
| Login   | [auth](https://auth.com) |
| Profile | User details |`;

    const chunks = chunkMarkdown(md);
    expect(chunks.length).toBe(2); // two rows
    expect(chunks[0].content).toContain('Feature: Login');
    expect(chunks[0].links).toContain('https://auth.com');
  });

  it('should handle no links gracefully', () => {
    const md = `# H
Text only.`;

    const chunks = chunkMarkdown(md);
    expect(chunks[0].links.length).toBe(0);
  });
});
