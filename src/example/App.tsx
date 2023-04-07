import { useState } from "react";
import { Let } from "../main";

export const ExampleMemo = () => (
  <div>
    <Let result={"expensive-calculation-result"} another={42}>
      {({ result, another }) => (
        // ^? (parameter) result: string; (parameter) another: number
        <p>
          {result}. {another}.
        </p>
      )}
    </Let>
  </div>
);

export const ExampleInput = () => (
  <div>
    <Let id={"myId"}>
      {({ id }) => (
        // ^? (parameter) id: string
        <>
          <label htmlFor={id}>{id}</label>
          <input id={id} />
        </>
      )}
    </Let>
  </div>
);

export const ExampleAsync = () => {
  type FetchData = { str: string; num: number };
  type FetchResult = { state: "loading" | "finished" | "error"; data?: FetchData };
  const [fetchResult, setFetchResult] = useState<FetchResult>({ state: "loading" });
  return (
    <div>
      {fetchResult.state === "loading" ? (
        "loading…"
      ) : fetchResult.state === "error" ? (
        "error!"
      ) : (
        <Let data={fetchResult.data}>
          {({ data }) => (
            // ^? (parameter) data: FetchData
            <>
              <pre>{JSON.stringify(data)}</pre>
            </>
          )}
        </Let>
      )}
    </div>
  );
};

export const ExampleVanilla = () => (
  <div>
    {(() => {
      const result = "expensive-calculation-result";
      const another = 42;

      return (
        <p>
          {result}. {another}.
        </p>
      );
    })()}
  </div>
);

function App() {
  return (
    <div className="App">
      <p>hello world!</p>
      <hr />
      <ExampleMemo />
      <hr />
      <ExampleInput />
    </div>
  );
}

export default App;
