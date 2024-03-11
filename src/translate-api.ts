import { useFetch } from "@raycast/utils";

export type Lang = "en" | "de" | "es" | "fr" | "tr";

const BACKEND = `https://tureng-api.bgure.workers.dev/`;

export interface TranslatedResult {
  category: string;
  q: string;
  translated: string;
  key: string;
  path: string;
}

/**
 *  Fetches the translation from the backend
 *
 * @param searchText
 * @param source
 * @param target
 * @returns
 */
export function useTranslate(searchText: string, source: Lang, target: Lang) {
  // it only work when a passed url as a function
  return useFetch<TranslatedResult[], TranslatedResult[], TranslatedResult[]>(
    () => `${BACKEND}?${new URLSearchParams({ sl: source, tl: target, q: searchText }).toString()}`,
    {
      execute: searchText.length > 0,
      headers: {
        "Content-Type": "application/json",
      },
      mapResult: (result: TranslatedResult[]) => {
        return {
          data: result,
        };
      },
      parseResponse: (response) => response.json(),
      keepPreviousData: true,
    },
  );
}
