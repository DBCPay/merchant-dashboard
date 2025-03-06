import { PropsWithChildren } from "react";
import { pulse } from "react-animations";
import styled, { keyframes } from "styled-components";
import authBg from "../../assets/images/auth-bg.jpg";

const LayoutWrapper = (props: PropsWithChildren) => {
  return (
    <div
      className="flex justify-center items-start pt-48 pb-24 relative min-h-dvh w-dvw bg-cover overflow-x-hidden"
      style={{
        backgroundImage: `url(${authBg})`,
      }}
    >
      <Grid className="grid w-full h-full bg-red-500 bg-opacity-70 absolute top-0 left-0">
        <div className="w-4/5 mx-auto my-8 md:my-0 md:max-w-none md:w-full h-full relative flex-col gap-4 min-h-[200px]">
          {/* <div className="w-full max-w-[350px] flex justify-center items-center">
            <img src={socialInteraction} className="h-[80%] " />
          </div> */}
        </div>
        <div className="h-full">
          <div className="w-full h-full flex justify-center">
            <div className="w-full rounded-t-lg md:rounded-t-xl bg-white"></div>
          </div>
        </div>
      </Grid>

      {/* Form */}
      <div className="bg-white shadow-md w-[90%] max-w-[500px] mx-auto relative z-10 p-8 rounded-md">
        {props.children}
      </div>
    </div>
  );
};

// Keyframes
const bounceAnimation = keyframes`${pulse}`;

// Styled components
const BouncyDiv = styled.div`
  animation: 3s ${bounceAnimation} infinite linear;
`;

const Grid = styled.div`
  grid-template-rows: 280px 1fr;
`;
export default LayoutWrapper;
