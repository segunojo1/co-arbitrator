import { GlobalWorkerOptions, getDocument, version } from "pdfjs-dist/legacy/build/pdf.mjs";

const CDN_WORKER_SRC = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.mjs`;

function ensureWorkerSrc() {
  if (typeof window === "undefined") return;
  if (GlobalWorkerOptions.workerSrc) return;

  // Prefer local bundled worker, fallback to CDN when bundling cannot resolve worker URLs.
  try {
    GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
      import.meta.url,
    ).toString();
  } catch {
    GlobalWorkerOptions.workerSrc = CDN_WORKER_SRC;
  }
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function splitIntoChunks(text: string, chunkSize = 3500) {
  if (!text.trim()) return ["No readable text found in this document page."];

  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

async function parsePdfFile(file: File): Promise<string[]> {
  // Some pdfjs runtime instances require workerSrc at parse-time even if it was set earlier.
  ensureWorkerSrc();

  const arrayBuffer = await file.arrayBuffer();
  const binary = new Uint8Array(arrayBuffer);

  const pdf = await getDocument({
    data: binary,
    isEvalSupported: false,
    useSystemFonts: true,
  } as any).promise;

  const pages: string[] = [];
  for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex += 1) {
    const page = await pdf.getPage(pageIndex);
    const textContent = await page.getTextContent();

    const text = normalizeText(
      textContent.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" "),
    );

    pages.push(text || "No readable text found in this PDF page.");
  }

  return pages.length > 0 ? pages : ["No readable text found in this PDF."];
}

async function parseTextFile(file: File): Promise<string[]> {
  const raw = await file.text();
  const normalized = normalizeText(raw);
  return splitIntoChunks(normalized);
}

export async function extractDocumentPages(file: File): Promise<string[]> {
  const lower = file.name.toLowerCase();

  if (lower.endsWith(".pdf")) {
    try {
      return await parsePdfFile(file);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown parser error";
      return [
        `Unable to parse PDF text. You can still view metadata, but text extraction failed. Reason: ${message}`,
      ];
    }
  }

  if (lower.endsWith(".txt")) {
    return parseTextFile(file);
  }

  return [
    "Text extraction is currently enabled for PDF and TXT. This file type was uploaded as metadata only.",
  ];
}
