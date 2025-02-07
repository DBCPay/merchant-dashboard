import { PropsWithChildren } from "react";
import LayoutWrapper from "./LayoutWrapper";

const index = (props: PropsWithChildren) => {
  return (
    <div>
      <LayoutWrapper>{props.children}</LayoutWrapper>
    </div>
  );
};

export default index;
