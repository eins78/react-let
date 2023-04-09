# `react-let`

<a href="https://www.npmjs.com/package/react-let"><img src="https://img.shields.io/npm/v/react-let.svg?sanitize=true" alt="Version"></a>
<a href="https://www.npmjs.com/package/react-let"><img src="https://img.shields.io/npm/l/react-let.svg?sanitize=true" alt="License"></a>
 

Like `(let)` in Lisp, [Clojure](https://clojuredocs.org/clojure.core/let), etc., but for React/JSX.

Makes it easier to declare variables deep inside a JSX tree,
which are then passed to a `children` render function.

When used with TypeScript, the render function arguments are infered from the props given to `<Let>`.

## Installation

```shell
npm add react-let
# alternative:
yarn add react-let
```

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

All examples can be found in `src/example/App.tsx`,
and be can be run using:

```shell
npm ci
npm run dev
```

## Alternatives

Instead of using this component, you can use an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) inside which you can declare JavaScript variables normally (i.e. you can use statements and not just expressions).

```tsx
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
```

## Development

The command to run the examples could is used for development (but no work is currently planned as the component is feature-complete).

To publish a new version:

```shell
npm version <major|minor|patch|…>
npm publish && \
git push --tags origin HEAD:main
```

## Copyright / License

© Max F. Albrecht <https://github.com/eins78>

License: MIT <https://eins78.mit-license.org>
