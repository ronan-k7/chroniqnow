import { buildSearchIndex } from "@/lib/searchIndex";

// Generated once at build time → written to out/search-index.json
// (works with `output: "export"`). New articles added to src/data/*.json are
// picked up automatically on the next build.
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex());
}
