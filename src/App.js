import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import DependentQueries from "./components/startUp/DependentQueries.page";
import DynamicParallel from "./components/startUp/DynamicParallel.page";
import { HomePage } from "./components/startUp/Home.page";
import ParallelQueries from "./components/startUp/ParallelQueries.page";
import RQSuperHero from "./components/startUp/RQSuperHero.page";
import { RQSuperHeroesPage } from "./components/startUp/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/startUp/SuperHeroes.page";
import PaginatedQueries from "./components/startUp/PaginatedQueries.page";
import InfiniteQueries from "./components/startUp/InfiniteQueries.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/infinite">
              <InfiniteQueries />
            </Route>
            <Route path="/paginated">
              <PaginatedQueries />
            </Route>
            <Route path="/rq-dependent">
              <DependentQueries email="example@gmail.com" />
            </Route>
            <Route path="/rq-dynamic-parallel">
              <DynamicParallel heroIds={[1, 3]} />
            </Route>
            <Route path="/rq-parallel">
              <ParallelQueries />
            </Route>
            <Route path="/rq-super-hero/:heroId">
              <RQSuperHero />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
