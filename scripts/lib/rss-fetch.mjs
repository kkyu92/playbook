/**
 * RSS fetch + Atom feed parse helper.
 * 기존 scout-geeknews.mjs / curate-geeknews.mjs 의 공통 로직 추출.
 */

const FEED_URL = "https://news.hada.io/rss/news";
const FALLBACK_FEED_URL = "http://feeds.feedburner.com/geeknews-feed";

export async function fetchGeekNews() {
  let res;
  try {
    res = await fetch(FEED_URL, {
      redirect: "follow",
      headers: { "User-Agent": "playbook-bot/1.0" },
    });
  } catch (err) {
    console.warn(`⚠️ Primary feed network error: ${err.message}, trying fallback`);
  }

  if (!res || !res.ok) {
    const fallbackRes = await fetch(FALLBACK_FEED_URL, {
      headers: { "User-Agent": "playbook-bot/1.0" },
    });
    if (!fallbackRes.ok) throw new Error(`Feed fetch failed: ${fallbackRes.status}`);
    return fallbackRes.text();
  }
  return res.text();
}

export function parseAtomFeed(xml) {
  const entries = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];
    const title =
      entry.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1]
        ?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, "$1")
        .trim() || "";
    const link = entry.match(/<link[^>]*href="([^"]+)"/)?.[1] || "";
    const published = entry.match(/<published>([\s\S]*?)<\/published>/)?.[1]?.trim() || "";
    const content = entry.match(/<content[^>]*>([\s\S]*?)<\/content>/)?.[1]
      ?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, "$1")
      .trim() || "";
    const description = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 500);

    if (title) entries.push({ title, link, published, description });
  }
  return entries;
}
