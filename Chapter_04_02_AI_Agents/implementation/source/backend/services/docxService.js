const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, AlignmentType, ShadingType, Footer, PageNumber,
} = require('docx');

const FONT = 'Calibri';
const HEADINGS = [HeadingLevel.TITLE, HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3, HeadingLevel.HEADING_4];

// **bold** and `code` inline -> TextRuns
function runs(text, opts = {}) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).map((p) => {
    if (p.startsWith('**')) return new TextRun({ text: p.slice(2, -2), bold: true, font: FONT, ...opts });
    if (p.startsWith('`')) return new TextRun({ text: p.slice(1, -1), font: 'Consolas', ...opts });
    const missing = p.includes('MISSING');
    return new TextRun({ text: p, font: FONT, color: missing ? 'B45309' : undefined, ...opts });
  });
}

const cells = (line) => line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

function table(rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rows.map((r, i) => new TableRow({
      tableHeader: i === 0,
      cantSplit: true,
      children: r.map((c) => new TableCell({
        shading: i === 0 ? { type: ShadingType.CLEAR, fill: 'E8EAF6' } : undefined,
        margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [new Paragraph({ children: runs(c.replace(/<br\s*\/?>/g, ' '), { size: 18, bold: i === 0 || undefined }) })],
      })),
    })),
  });
}

function markdownToBlocks(md) {
  const out = [];
  const lines = md.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*\|/.test(line)) {
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        if (!/^\s*\|[\s:|-]+\|\s*$/.test(lines[i])) rows.push(cells(lines[i]));
        i++;
      }
      i--;
      const width = Math.max(...rows.map((r) => r.length));
      out.push(table(rows.map((r) => [...r, ...Array(width - r.length).fill('')])), new Paragraph({ text: '' }));
      continue;
    }
    const h = line.match(/^(#{1,4})\s+(.*)/);
    if (h) { out.push(new Paragraph({ heading: HEADINGS[h[1].length], spacing: { before: 240, after: 120 }, keepNext: true, children: runs(h[2]) })); continue; }
    const b = line.match(/^(\s*)[-*]\s+(.*)/);
    if (b) { out.push(new Paragraph({ bullet: { level: Math.min(Math.floor(b[1].length / 2), 3) }, children: runs(b[2]) })); continue; }
    const n = line.match(/^\s*(\d+)\.\s+(.*)/);
    if (n) { out.push(new Paragraph({ indent: { left: 360 }, spacing: { after: 60 }, children: runs(`${n[1]}. ${n[2]}`) })); continue; }
    const q = line.match(/^>\s?(.*)/);
    if (q) { out.push(new Paragraph({ indent: { left: 360 }, children: runs(q[1], { italics: true, color: '555555' }) })); continue; }
    if (/^---+\s*$/.test(line)) { out.push(new Paragraph({ border: { bottom: { style: 'single', size: 6, color: 'CCCCCC', space: 1 } } })); continue; }
    if (line.trim()) out.push(new Paragraph({ spacing: { after: 120 }, children: runs(line) }));
  }
  return out;
}

async function buildDocx({ title, source, status, version, markdown }) {
  const doc = new Document({
    styles: { default: { document: { run: { font: FONT, size: 22 } } } },
    sections: [{
      properties: { page: { margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } },
      footers: {
        default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
          new TextRun({ text: `${title} · ${status} · v${version} · Page `, size: 16, font: FONT }),
          new TextRun({ children: [PageNumber.CURRENT], size: 16, font: FONT }),
        ] })] }),
      },
      children: [
        new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: title, font: FONT })] }),
        new Paragraph({ children: runs(`**Source:** ${source}   **Version:** ${version}   **Review Status:** ${status}   **Generated:** ${new Date().toLocaleDateString('en-GB')}`) }),
        new Paragraph({ text: '' }),
        ...markdownToBlocks(markdown),
      ],
    }],
  });
  return Packer.toBuffer(doc);
}

module.exports = { buildDocx };
