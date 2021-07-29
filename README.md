# fluent-story

Tell your React story in a more fluent way; don't depend on complex, presumptuous build configs, and use whatever tooling you already have.

## Usage

```Typescript
// App.tsx

import FluentStory from "fluent-story";
import Button from "./components/Button";

const stories = { Button };

// elsewhere
<FluentStory stories={stories} />
```

How you choose to import your stories is up to you.

Here's a more realistic scenario with Vite, importing stories from a directory, similar to Storybook:

```Typescript
import FluentStory from "fluent-story";

const stories = Object.fromEntries(
  Object.entries(import.meta.globEager("./stories/*.tsx"))
    .map(([, imported]) => imported.default)
    .map(imported => [imported.title, imported.component]),
);

export default () => {
  return (<Router>
    <Switch>
      // conditionally render stories only in dev
      {import.meta.env.DEV && (
        <Route
          path="/stories"
          render={() => <Stories stories={stories} />}
          exact
        />
      )}
      // your other routes
    </Switch>
  </Router>);
}
```

Vite will remove dead code in production, and your existing build config is just used as-is.
