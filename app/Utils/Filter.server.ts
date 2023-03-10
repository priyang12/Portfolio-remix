import { matchSorter, rankings as matchSorterRankings } from "match-sorter";

// Taken from KentCTodds.com
export function FilterPosts<T>(posts: Array<T>, searchString: string) {
  if (!searchString) return posts;

  const options = {
    keys: [
      {
        key: "frontmatter.title",
        threshold: matchSorterRankings.CONTAINS,
      },
      {
        key: "frontmatter.categories",
        threshold: matchSorterRankings.CONTAINS,
        maxRanking: matchSorterRankings.CONTAINS,
      },
      {
        key: "frontmatter.meta.keywords",
        threshold: matchSorterRankings.CONTAINS,
        maxRanking: matchSorterRankings.CONTAINS,
      },
      {
        key: "frontmatter.description",
        threshold: matchSorterRankings.CONTAINS,
        maxRanking: matchSorterRankings.CONTAINS,
      },
    ],
  };

  const allResults = matchSorter(posts, searchString, options);
  const searches = new Set(searchString.split(" "));
  if (searches.size < 2) {
    // if there's only one word then we're done
    return allResults;
  }

  // if there are multiple words, we'll conduct an individual search for each word
  const [firstWord, ...restWords] = searches.values();
  if (!firstWord) {
    // this should be impossible, but if it does happen, we'll just return an empty array
    return [];
  }
  const individualWordOptions = {
    ...options,
    keys: options.keys.map((key) => {
      return {
        ...key,
        maxRanking: matchSorterRankings.CASE_SENSITIVE_EQUAL,
        threshold: matchSorterRankings.WORD_STARTS_WITH,
      };
    }),
  };

  // go through each word and further filter the results
  let individualWordResults = matchSorter(
    posts,
    firstWord,
    individualWordOptions
  );
  for (const word of restWords) {
    const searchResult = matchSorter(
      individualWordResults,
      word,
      individualWordOptions
    );
    individualWordResults = individualWordResults.filter((r) =>
      searchResult.includes(r)
    );
  }
  return Array.from(new Set([...allResults, ...individualWordResults]));
}

export function FilterProjects<T>(Projects: Array<T>, searchString: string) {
  if (!searchString) return Projects;

  const options = {
    keys: [
      {
        key: "Data.Title",
        threshold: matchSorterRankings.CONTAINS,
      },
      {
        key: "Data.Description",
        threshold: matchSorterRankings.CONTAINS,
      },
      {
        key: "Data.Tags",
        threshold: matchSorterRankings.CONTAINS,
        maxRanking: matchSorterRankings.CONTAINS,
      },
      {
        key: "Data.Technologies",
        threshold: matchSorterRankings.CONTAINS,
        maxRanking: matchSorterRankings.CONTAINS,
      },
    ],
  };

  const allResults = matchSorter(Projects, searchString, options);

  const searches = new Set(searchString.split(" "));
  if (searches.size < 2) {
    // if there's only one word then we're done
    return allResults;
  }

  // if there are multiple words, we'll conduct an individual search for each word
  const [firstWord, ...restWords] = searches.values();
  if (!firstWord) {
    // this should be impossible, but if it does happen, we'll just return an empty array
    return [];
  }
  const individualWordOptions = {
    ...options,
    keys: options.keys.map((key) => {
      return {
        ...key,
        maxRanking: matchSorterRankings.CASE_SENSITIVE_EQUAL,
        threshold: matchSorterRankings.WORD_STARTS_WITH,
      };
    }),
  };

  // go through each word and further filter the results
  let individualWordResults = matchSorter(
    Projects,
    firstWord,
    individualWordOptions
  );
  for (const word of restWords) {
    const searchResult = matchSorter(
      individualWordResults,
      word,
      individualWordOptions
    );
    individualWordResults = individualWordResults.filter((r) =>
      searchResult.includes(r)
    );
  }

  return Array.from(new Set([...allResults, ...individualWordResults]));
}
