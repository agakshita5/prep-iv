import "server-only";
import { extractText, getDocumentProxy } from "unpdf";

// parse uploaded resume pdf to plain text
export async function parseResumePdf(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await getDocumentProxy(bytes);
  const { text } = await extractText(pdf, { mergePages: true }); // one string
  return text.trim();
}
