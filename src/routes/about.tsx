import { createSignal, createResource, Switch, Match, Show } from "solid-js";

const fetchUser = async (id: number) => {
  const response = await fetch(`https://swapi.dev/api/people/${id}/`);
  return response.json();
}

function App() {
  const [userId, setUserId] = createSignal<number>();
  const [user] = createResource(userId, fetchUser);

  return (
    <div>
      <input
        type="number"
        min="1"
        placeholder="Enter Numeric Id"
        onInput={(e) => setUserId(Number(e.currentTarget.value))}
      />
      <Show when={user.loading}>
        <p>Loading...</p>
      </Show>
      <Switch>
        <Match when={user.error}>
          <span>Error: {user.error}</span>
        </Match>
        <Match when={user()}>
          <div>{JSON.stringify(user())}</div>
        </Match>
      </Switch>
    </div>
  );
}

export default App;
