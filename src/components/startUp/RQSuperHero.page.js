import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSuperHeroData } from "../customQueryHook/useSuperHeroData";

const RQSuperHero = () => {
  const { heroId } = useParams();
  const { isLoading, isError, data, error } = useSuperHeroData(heroId);

  if (isLoading) return <h2>Loading ...</h2>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <div>
      Super Hero Details
      {data && (
        <div>
          <li>{data.data.id}</li>
          <li>{data.data.name}</li>
          <li>{data.data.alterEgo}</li>
        </div>
      )}
    </div>
  );
};

export default RQSuperHero;
