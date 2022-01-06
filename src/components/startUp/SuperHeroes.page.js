import { useState, useEffect } from "react";
import axios from "axios";

export const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/superheroes")
      .then(({ data }) => {
        // console.log(data)
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <h1>Loading</h1>;

  if (error) return <h2>Network Worth : {error}</h2>;

  return (
    <>
      <h1>Super Heroes Page</h1>
      {data.map((hero, i) => (
        <div key={i}>
          <h1>{hero.name}</h1>
        </div>
      ))}
    </>
  );
};
