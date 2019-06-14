import * as React from "react";

type Props = {
  label: string;
  initialCount: number;
};

type State = {
  count: number;
};

export class StatefulCounter extends React.Component<Props, State> {
  static defaultProps = {
    initialCount: 0
  };

  readonly state: State = {
    count: this.props.initialCount
  };

  componentWillReceiveProps({ initialCount }: Props) {
    this.setState({ count: initialCount });
  }

  onIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    const { label } = this.props;
    const { count } = this.state;

    return (
      <div>
        <span>
          {label}: {count}
        </span>
        <button onClick={this.onIncrement}>Increment</button>
      </div>
    );
  }
}
