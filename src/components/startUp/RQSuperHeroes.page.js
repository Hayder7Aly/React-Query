import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../customQueryHook/useSuperHeroesData";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";

// const fetchSuperHeroes = () => {
//   return axios.get("http://localhost:4000/superheroes");
// };

// default cacheTime is 5Mins
// default staleTime is 0s

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("Perform Side Effect after data fetching : ", data);
  };

  const onError = ({ message }) => {
    console.log("Perform Side Effect after encountering error : ", message);
  };

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  );

  const [state, setState] = useState({
    name: "",
    alterEgo: "",
  });

  const { mutate, isLoading: mutateLoading } = useAddSuperHeroData();

  const clickHandler = () => {
    console.log(state);
    mutate(state);
  };

  // refetch function for on Event ..

  // const { isLoading, data, isError, error , isFetching, refetch } = useQuery(
  //   "super-heroes",
  //   fetchSuperHeroes,
  //   {
  //     // cacheTime: 5000, // cacheTime means that after 5s do not used cache data .

  //     // staleTime: 30000, // every time i am goes to queryComponent after 30s then fetch the data again that is display in network tab.

  //     // refetchOnMount: false ,// means that fetch the data only one time

  //     // refetchOnWindowFocus: false, // do not fetch the data on window focus

  //     // refetchIntervalInBackground: true
  //     // refetchInterval: 2000,

  //     // enabled: false, // for button handler to click on button to fetch data into api end point ...

  //     onSuccess,
  //     onError,
  //     select: (data) => { // is used for select only those values that we need in api data ...
  //       const superHeroNames = data.data.map(hero => hero.name)
  //       return superHeroNames
  //     }
  //   }
  // );
  // console.log("From RQ",results)
  // console.log({ isLoading, isFetching });

  if (isLoading) return <h2>Loading ...</h2>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={(e) =>
            setState({ ...state, [e.target.name]: e.target.value })
          }
        />
        <input
          type="text"
          name="alterEgo"
          value={state.alterEgo}
          onChange={(e) =>
            setState({ ...state, [e.target.name]: e.target.value })
          }
        />
        <button onClick={clickHandler}>Add</button>
        {mutateLoading ? <h2>Loading of Mutate ...</h2> : <h1>Submitted</h1>}
      </div>
      <button onClick={refetch}>Fetch</button>
      {data?.data?.map((hereo, i) => (
        <div key={i}>
          <h3>
            <Link to={`/rq-super-hero/${hereo.id}`}>{hereo.name}</Link>
          </h3>
        </div>
      ))}
      {/* {data.map(heroName => (
        <h2 key={heroName}>{heroName}</h2>
      ))} */}
    </>
  );
};
