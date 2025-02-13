import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import dbcLogo from "@/assets/images/dashboard-logo.svg";
import { Plus } from "lucide-react";
import { FloatingActions } from "./page";

interface SidebarProps extends PropsWithChildren {
  toggleHide: (e: any) => void;
  smallNav: boolean;
  sideNavRef: React.MutableRefObject<HTMLElement | null>;
}

const Sidebar = ({ toggleHide, smallNav, sideNavRef }: SidebarProps) => {
  const toggleInView = (e: any) => {
    if (sideNavRef.current === null) return;
    sideNavRef.current.classList.toggle("out-of-view");
  };

  return (
    <SideNavContainer ref={sideNavRef} className="hide out-of-view side-nav">
      <Header className="flex justify-center items-center pt-5 h-[4.5rem] cursor-pointer">
        <img src={dbcLogo} className="w-9 h-9" />
      </Header>
      <div className="self-center mt-auto mb-9">
        <FloatingActions />
      </div>
      {/* <Footer
        onClick={(e) => toggleHide(e)}
        className={`flex justify-end items-center text-black ${
          smallNav && "justify-center"
        } cursor-pointer`}
      >
        {smallNav ? (
          <i className="fi fi-rr-angle-double-small-right flex"></i>
        ) : (
          <>
            <i className="fi fi-rr-angle-double-small-left flex"></i>
            <span className="ml-2 text-sm font-medium">Collapse</span>
          </>
        )}
      </Footer> */}
    </SideNavContainer>
  );
};

const SideNavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 185px;
  grid-column: 1 / 2;
  background-color: #f3f4f6;
  transition: 0.4s ease;
  overflow: hidden;
  width: 80px;

  @media (max-width: 640px) {
    position: fixed;
    height: max-content;
    transition: 0.4s ease;
    z-index: 1000;
    width: 100dvw;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom-right-radius: 0rem;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;

    &.out-of-view {
      transform: translateX(0%);
    }
  }
`;

const Header = styled.header`
  @media (max-width: 640px) {
    display: none;
  }
`;

const Footer = styled.footer`
  padding: 1rem;

  i {
    color: #000;
    font-size: 1.6rem;
    cursor: pointer;
  }

  &:hover {
    i,
    span {
      color: var(--base-color);
    }
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const CustomPlus = styled(Plus)`
  &.size-6 {
    width: 1.5rem;
    height: 1.5rem;
  }
  &.size-7 {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

export default Sidebar;
