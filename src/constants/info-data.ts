interface InfoCardData {
  title: string;
  period: string;
  prefix?: string;
  count: number;
  shouldCountUp?: boolean;
  showProgressRing?: boolean;
  progressRingColor?: string;
  percentage?: number;
}

export const infoCardData: InfoCardData[] = [
  {
    title: "Total amount",
    period: "This month",
    prefix: "₦",
    count: 10500,
    shouldCountUp: false,
    showProgressRing: false,
  },
  {
    title: "In progress",
    period: "This month",
    count: 16,
    showProgressRing: false,
  },
  {
    title: "Paid",
    period: "This month",
    count: 114,
    showProgressRing: true,
    progressRingColor: "#34D399",
    percentage: 89,
  },
  {
    title: "Refund",
    period: "This month",
    count: 11,
    showProgressRing: true,
    progressRingColor: "#FBBF24",
    percentage: 9,
  },
  {
    title: "Failed",
    period: "This month",
    count: 2,
    shouldCountUp: false,
    showProgressRing: true,
    progressRingColor: "#F43F5E",
    percentage: 2,
  },
];
