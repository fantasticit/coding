import * as React from "react";
import { FCCounter } from "./components/FCCounter";
import { StatefulCounter } from "./components/StatefulCounter";
import { GenericList } from "./components/GenericList";
import { MouseProvider } from "./components/MouseProvider";
import { withState } from "./components/withState";
import "./App.css";

interface IUser {
  name: string;
}
const users: IUser[] = [{ name: "Mike" }, { name: "Tom" }, { name: "David" }];
class UserList extends GenericList<IUser> {}

const FCCounterWithState = withState(FCCounter);

class App extends React.Component {
  state = { count: 0 };

  render() {
    return (
      <div className="App">
        <FCCounter
          label={"FCCounter"}
          count={this.state.count}
          onIncrement={() => this.setState({ count: this.state.count + 1 })}
        />
        <StatefulCounter label={"StatefulCounter"} initialCount={10} />
        <UserList
          items={users}
          itemRenderer={({ name }) => <p key={name}>{name}</p>}
        />
        <div style={{ height: 80, border: "1px solid #000" }}>
          <MouseProvider render={({ x, y }) => `x: ${x}, y: ${y}`} />
        </div>
        <FCCounterWithState initialCount={20} label={"FCCounter withState"} />
      </div>
    );
  }
}

export default App;
