import { TabsEnum } from "@/enums";
import classNames from "classnames";
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

interface TopTabProps {
  currentTab: TabsEnum;
  onSelectTab: (tab: TabsEnum) => void;
}

const topTabs: TabsEnum[] = Object.values(TabsEnum);

export const TopTab = ({ currentTab, onSelectTab }: TopTabProps) => {
  const [sliderLeft, setSliderLeft] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const currentIndex = topTabs.indexOf(currentTab);
    if (buttonRefs.current[currentIndex]) {
      const { left } =
        buttonRefs.current[currentIndex]!.getBoundingClientRect();
      const parentLeft =
        buttonRefs.current[0]!.parentElement!.getBoundingClientRect().left;
      setSliderLeft(left - parentLeft);
    }
  }, [currentTab]);

  const changeTab = (tab: TabsEnum) => {
    onSelectTab(tab);
  };

  return (
    <TopTabContainer
      className="bg-gray-900 p-1 rounded-full relative"
      tabLength={topTabs.length}
    >
      <Slider style={{ left: `${sliderLeft}px` }} className="self-center" />
      {topTabs.map((item, index) => (
        <button
          key={item}
          ref={(el) => (buttonRefs.current[index] = el)}
          className={classNames(
            "font-sfpro-medium w-full py-[10px] text-sm z-2 relative",
            {
              "text-gray-200": currentTab !== item,
              "text-gray-900": currentTab === item,
            }
          )}
          onClick={() => changeTab(item)}
        >
          {item}
        </button>
      ))}
    </TopTabContainer>
  );
};

const TopTabContainer = styled.div<{ tabLength: number }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.tabLength}, 124px)`};
  gap: 4px;
  position: relative;
  overflow: hidden;
`;

const Slider = styled.div`
  position: absolute;
  width: 124px;
  height: 40px;
  background-color: white;
  border-radius: 9999px;
  transition: left 0.1s linear;
  z-index: 0;
`;
