import * as React from "react";

export interface IGenericListProps<T> {
  items: T[];
  itemRenderer: (item: T) => React.ReactElement;
}

export class GenericList<T> extends React.Component<IGenericListProps<T>, {}> {
  render() {
    const { items, itemRenderer } = this.props;

    return <div>{items.map(itemRenderer)}</div>;
  }
}
