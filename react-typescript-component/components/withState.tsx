import * as React from "react";
import { Subtract } from "utility-types";

interface IInjectedProps {
  count: number;
  onIncrement: () => void;
}

export const withState = <BaseProps extends IInjectedProps>(
  _BaseComponent: React.ComponentType<BaseProps>
) => {
  const BaseComponent = (_BaseComponent as unknown) as React.ComponentType<
    IInjectedProps
  >;

  type HOCProps = Subtract<BaseProps, IInjectedProps> & {
    initialCount?: number;
  };
  type HOCState = { readonly count: number };

  return class HOC extends React.Component<HOCProps, HOCState> {
    readonly state: HOCState = {
      count: Number(this.props.initialCount) || 0
    };

    onIncrement = () => {
      this.setState({ count: this.state.count + 1 });
    };

    render() {
      return (
        <BaseComponent
          count={this.state.count}
          onIncrement={this.onIncrement}
          {...this.props}
        />
      );
    }
  };
};
