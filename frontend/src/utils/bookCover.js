// Matches book names to local cover images in `Frontend/src/assets`.
// Filenames are provided by the user and may contain small spelling differences,
// so we do a "closest normalized match" instead of strict equality.

const normalizeKey = (value) => {
  if (!value) return "";
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ""); // remove spaces/punctuation for fuzzy matching
};

// Simple Levenshtein distance for small strings (we only compare against a small asset set).
const levenshtein = (a, b) => {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[a.length][b.length];
};

const assetModules = import.meta.glob("../assets/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  import: "default",
});

const assetsByNormalizedKey = Object.entries(assetModules).reduce(
  (acc, [path, url]) => {
    const filename = path.split(/[/\\]/).pop() || path;
    const basename = filename.replace(/\.[^.]+$/, ""); // remove extension
    acc[normalizeKey(basename)] = url;
    return acc;
  },
  {}
);

const assetKeys = Object.keys(assetsByNormalizedKey);

export function getLocalBookCover(book) {
  const nameKey = normalizeKey(book?.name);
  const titleKey = normalizeKey(book?.title);
  const direct = assetsByNormalizedKey[nameKey] || assetsByNormalizedKey[titleKey];
  if (direct) return direct;

  // Fuzzy match: choose the asset key with the smallest normalized edit distance.
  const candidates = [nameKey, titleKey].filter(Boolean);
  let bestUrl = null;
  let bestScore = Infinity;

  for (const candidateKey of candidates) {
    for (const assetKey of assetKeys) {
      const dist = levenshtein(candidateKey, assetKey);
      const score = dist / Math.max(candidateKey.length, assetKey.length);
      if (score < bestScore) {
        bestScore = score;
        bestUrl = assetsByNormalizedKey[assetKey];
      }
    }
  }

  // If we didn't find a "reasonably close" match, fall back to whatever is in MongoDB.
  if (bestUrl && bestScore <= 0.35) return bestUrl;
  return book?.image;
}

