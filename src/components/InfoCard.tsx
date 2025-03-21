import CountUp from "react-countup";
import { ProgressRing } from "./widgets/ProgressRing";

interface InfoCardProps {
  title: string;
  period: string;
  prefix?: string;
  count: number;
  shouldCountUp?: boolean;
  showProgressRing?: boolean;
  progressRingColor?: string;
  percentage?: number;
}

export const InfoCard = ({
  title,
  period,
  count,
  prefix,
  percentage,
  progressRingColor,
  shouldCountUp = true,
  showProgressRing = true,
}: InfoCardProps) => {
  return (
    <div className="bg-white rounded-2xl flex justify-between py-5 px-6 items-center">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <p className="font-sfpro-medium text-gray-900 text-[13px] leading-[18px]">
            {title}
          </p>
          <div className="w-[2px] h-[2px] rounded-full bg-gray-900"></div>
          <p className="font-sfpro-medium text-gray-400 text-[13px] leading-[18px]">
            {period}
          </p>
        </div>
        {shouldCountUp ? (
          <CountUp
            start={0}
            end={count}
            prefix={prefix}
            duration={4}
            decimals={0}
            separator={","}
            className="text-gray-900 font-urbanist font-semibold text-[22px] leading-[30px]"
          />
        ) : (
          <h4 className="text-gray-900 font-urbanist font-semibold text-[22px] leading-[30px]">
            {prefix}
            {prefix === "₦"
              ? Number(count).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })
              : count}
          </h4>
        )}
      </div>
      {showProgressRing && percentage && progressRingColor && (
        <div>
          <ProgressRing percentage={percentage} color={progressRingColor} />
        </div>
      )}
    </div>
  );
};
