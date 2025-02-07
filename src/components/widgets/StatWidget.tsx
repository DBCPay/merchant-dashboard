import CountUp from "react-countup";
import styled from "styled-components";
import { StatWidgetInterface } from "../../data/statWidget";
import { Link } from "react-router-dom";

interface StatWidgetProps extends StatWidgetInterface {}

const StatWidget = ({
  label,
  badgeClass,
  badgeIconClass,
  percentage,
  counterStart,
  counterEnd,
  prefix,
  suffix,
  duration,
  decimal,
  decimals,
  seperator,
  linkType,
  link,
  linkUrl,
  widgetIconBg,
  widgetIconClass,
  widgetIconColor,
}: StatWidgetProps) => {
  return (
    <WidgetCont className="p-4 bg-[var(--white)] hover:-translate-y-1 cursor-pointer rounded-sm">
      <div className="flex justify-between items-center">
        <h4 className="uppercase text-gray-500">{label}</h4>
        {percentage !== "" && (
          <Badge
            className={`${badgeClass} flex gap-0 items-center font-semibold text-ellipsis`}
          >
            <i className={`${badgeIconClass} flex -mr-1`}></i>
            <span className="">{percentage}</span>%
          </Badge>
        )}
      </div>

      <div className="mt-4 flex justify-between items-end">
        <div className="flex flex-col gap-4">
          <h4 className="text-2xl">
            <CountUp
              start={counterStart}
              end={counterEnd}
              prefix={prefix}
              suffix={suffix}
              duration={duration}
              decimals={decimals}
              decimal={decimal}
              separator={seperator}
            />
          </h4>
          {link &&
            linkUrl &&
            (linkType === "page" ? (
              <Link to={linkUrl} className="underline primary text-sm">
                {link}
              </Link>
            ) : (
              <a href={linkUrl} className="underline primary text-sm">
                {link}
              </a>
            ))}
        </div>
        <div>
          <span
            className={`w-12 h-12 rounded-md ${widgetIconBg} grid place-items-center`}
          >
            <i
              className={`${widgetIconColor} flex ${widgetIconClass} text-xl`}
            ></i>
          </span>
        </div>
      </div>
    </WidgetCont>
  );
};

const WidgetCont = styled.div`
  transition: 0.5s ease;
  box-shadow: 0px -2px 4px rgb(37 40 42 / 0.07);

  &:hover {
    box-shadow: 0px 2px 4px rgb(37 40 42 / 0.07);
  }
`;

const Badge = styled.p``;

export default StatWidget;
