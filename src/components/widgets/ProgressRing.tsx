import React from "react";

interface ProgressRingProps {
  percentage: number;
  color: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  color,
}) => {
  const radius = 27; // Radius of the circle
  const strokeWidth = 5; // Width of the stroke
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      {/* Background Circle */}
      <circle
        stroke="#e5e7eb" // Light gray
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* Progress Circle */}
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
      {/* Text Percentage */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="14px"
        fontWeight="bold"
        fill="#181D27" // Dark gray
        className="font-urbanist font-semibold text-[#181D27] leading-5"
      >
        {percentage}%
      </text>
    </svg>
  );
};
