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
      <Header className="flex items-center gap-2  h-[56px] md:h-[64px] lg:h-[72px] cursor-pointer">
        <img src={dbcLogo} />
        <span className="link-name text-[var(--base-color)] font-semibold italic">
          DBCPay
        </span>
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

  a,
  button:not(.floating),
  header {
    transition: 0.4s ease;
  }

  a,
  button:not(.floating) {
    i,
    span {
      transition: 0.4s ease;
    }
  }

  header {
    img {
      transition: 0.4s ease;
    }
  }

  &.hide {
    width: 84px;

    a,
    button:not(.floating),
    header {
      gap: 2.4rem;
      padding-left: 25px;
    }

    header span {
      display: none;
    }

    header img {
      width: 40px;
      height: 40px;
    }

    header {
      padding: 1rem;
    }

    @media (min-width: 640px) {
      a,
      button:not(.floating) {
        i {
          transform: translateX(3.2px);
        }
      }

      header {
        img {
          transform: translateX(3.2px);
        }
      }
    }
  }

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

    &.hide {
      width: 100dvw;

      a,
      button:not(.floating) {
        gap: initial;
        padding-left: initial;
      }
    }

    &.out-of-view {
      transform: translateX(0%);
    }
  }
`;

const Header = styled.header`
  padding: 1rem 1.2rem;

  span {
    font-size: 1.5rem;
    cursor: pointer;
  }

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
