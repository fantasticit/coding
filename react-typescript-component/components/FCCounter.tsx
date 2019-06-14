import * as React from "react";

type Props = {
  label: string;
  count: number;
  onIncrement: () => void;
};

export const FCCounter: React.FC<Props> = props => {
  const { label, count, onIncrement } = props;

  return (
    <div>
      <span>
        {label}: {count}
      </span>
      <button onClick={onIncrement}>Increment</button>
    </div>
  );
};
