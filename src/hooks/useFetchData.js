import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTransformedDataArray } from "services/getTransformedDataArray";
// import useIsNearScreen from "./useIsNearScreen";

export const useFetchData = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let location = useLocation();

  let mainPath = location.pathname.slice(1).split("/")[0];
  if (mainPath === "characters") {
    mainPath = "people";
  }

  useEffect(() => {
    if (mainPath === "starships" && page >= 5) return;
    if (mainPath === "planets" && page >= 8) return;
    if (mainPath === "people" && page >= 10) return;
    setIsLoading(true);

    getTransformedDataArray({ page, typeOfData: mainPath })
      .then((data) => {
        //checking data is not null
        data && setData((prev) => [...prev, ...data]);
        // sorting items may be applied in future iterations
        // data && setPlanets((prev) => sortObjItems([...prev, ...data]));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, mainPath]);

  return {
    isLoading,
    data,
    setPage,
  };
};
