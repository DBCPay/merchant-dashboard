import { PropsWithChildren } from "react";

const index = (props: PropsWithChildren) => {
  return <div>{props.children}</div>;
};

export default index;
