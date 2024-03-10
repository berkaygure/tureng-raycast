import { List } from "@raycast/api";
import { useState } from "react";
import LangSelector, { DEFAULT_LANG, LangItem } from "./lang-selector";
import { useTranslate } from "./translate-api";

export default function Translate() {
  const [searchText, setSearchText] = useState("");
  const [lang, setLang] = useState<LangItem>(DEFAULT_LANG);
  const { data = [], isLoading } = useTranslate(searchText, lang.source, lang.target);

  return (
    <List
      throttle
      isLoading={isLoading}
      searchText={searchText}
      navigationTitle="Translate"
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search for a translation..."
      searchBarAccessory={<LangSelector value={lang} onChange={setLang} />}
    >
      {data.map((item) => (
        <List.Item
          key={item.key}
          title={item.translated}
          subtitle={item.q}
          accessories={[
            {
              tag: item.category,
            },
          ]}
        />
      ))}
    </List>
  );
}
