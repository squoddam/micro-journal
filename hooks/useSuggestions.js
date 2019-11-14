import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function(tags, text) {
  const entriesStore = useSelector(state => state.entriesStore);

  return useMemo(
    () =>
      Object.keys(entriesStore.tags).filter(
        key =>
          !tags.includes(key) &&
          key.toLowerCase().includes(text.trim().toLowerCase())
      ),
    [entriesStore.tags, tags, text]
  );
}
