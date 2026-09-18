export interface DiffLine {
  type: "added" | "removed" | "unchanged";
  content: string;
  oldLineNumber?: number;
  newLineNumber?: number;
}

export interface DiffSummary {
  addedCount: number;
  removedCount: number;
  unchangedCount: number;
  lines: DiffLine[];
}

/**
 * Computes a line-by-line diff between original and modified text
 * using an efficient Longest Common Subsequence (LCS) approach.
 */
export function computeLineDiff(originalText: string, modifiedText: string): DiffSummary {
  const origLines = originalText ? originalText.split("\n") : [];
  const modLines = modifiedText ? modifiedText.split("\n") : [];

  const n = origLines.length;
  const m = modLines.length;

  // Build LCS matrix (bounded for performance on large files)
  const maxLines = 800;
  const clampedOrig = origLines.slice(0, maxLines);
  const clampedMod = modLines.slice(0, maxLines);

  const dp: number[][] = Array.from({ length: clampedOrig.length + 1 }, () =>
    new Array(clampedMod.length + 1).fill(0)
  );

  for (let i = 0; i < clampedOrig.length; i++) {
    for (let j = 0; j < clampedMod.length; j++) {
      if (clampedOrig[i] === clampedMod[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  // Backtrack to construct diff
  const diffLines: DiffLine[] = [];
  let i = clampedOrig.length;
  let j = clampedMod.length;
  let addedCount = 0;
  let removedCount = 0;
  let unchangedCount = 0;

  const rawEntries: DiffLine[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && clampedOrig[i - 1] === clampedMod[j - 1]) {
      rawEntries.push({
        type: "unchanged",
        content: clampedOrig[i - 1],
        oldLineNumber: i,
        newLineNumber: j,
      });
      unchangedCount++;
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      rawEntries.push({
        type: "added",
        content: clampedMod[j - 1],
        newLineNumber: j,
      });
      addedCount++;
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      rawEntries.push({
        type: "removed",
        content: clampedOrig[i - 1],
        oldLineNumber: i,
      });
      removedCount++;
      i--;
    }
  }

  // Reverse since we backtracked from the end
  diffLines.push(...rawEntries.reverse());

  return {
    addedCount,
    removedCount,
    unchangedCount,
    lines: diffLines,
  };
}
