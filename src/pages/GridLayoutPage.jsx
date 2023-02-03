import { useEffect, useMemo } from "react";
import { useSearch } from "hooks/useSearch.js";
import { useIsNearScreen } from "hooks/useIsNearScreen.js";
import SearchResults from "components/SearchResults";
import GridItems from "components/GridItems";
import { useData } from "hooks/useData";

const GridLayoutPage = ({ mainPath }) => {
  const { searchResultsItems } = useSearch();
  const { isNearScreen, fromRef } = useIsNearScreen({ once: false });
  const {
    data: { isLoading, next },
    setData,
  } = useData();

  useEffect(() => {
    // stops pagination when data is loading
    if (isLoading) return;
    // stops pagination if next fetch is not possible
    if (!next) return;

    if (isNearScreen) {
      setData((prev) => ({
        ...prev,
        [mainPath]: {
          ...prev[mainPath],
          page: prev[mainPath].page + 1,
        },
      }));
    }
  }, [isNearScreen]);


  if (searchResultsItems.length > 0) {
    return <SearchResults searchResultsItems={searchResultsItems} />;
  }

  return (
    <>
      <GridItems mainPath={mainPath} />
      {/* is near screen viewfinder */}
      <div ref={fromRef}></div>
    </>
  );
};

export default GridLayoutPage;
