# `react-let`

Like `(let)` in Lisp, [Clojure](https://clojuredocs.org/clojure.core/let), etc., but for React/JSX.

Makes it easier to declare variables deep inside a JSX tree,
which are then passed to a `children` render function.

When used with TypeScript, the render function arguments are infered from the props given to `<Let>`.

## Usage Examples

```tsx
import React from "react";
import { Let } from "../main";

export const ExampleMemo = () => (
  <div>
    <Let result={"expensive-calculation-result"} another={42}>
      {({ result, another }) => ( // TypeScript infered: (parameter) result: string; (parameter) another: number
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
      {({ id }) => ( // TypeScript infered: (parameter) id: string
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
          {({ data }) => ( // TypeScript infered: (parameter) data: FetchData
            <>
              <pre>{JSON.stringify(data)}</pre>
            </>
          )}
        </Let>
      )}
    </div>
  );
};
```
