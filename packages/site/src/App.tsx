import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { trpc } from "./utils/trpc";

console.log([import.meta.env.VITE_API_URL]);

function App() {
  return (
    <div className="App">
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <ComponentThatQueries />
      </div>
    </div>
  );
}

const ComponentThatQueries = () => {
  const query = trpc.email.useQuery({ email: "lewis" });

  switch (query.status) {
    case "loading":
      return <div>Loading...</div>;
    case "error":
      return <div>{query.error.message}</div>;
    case "success":
      return <div>{query.data}</div>;
  }
};

export default App;
