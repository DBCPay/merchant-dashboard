export interface InvoiceWidgetType {
  title: string;
  period: string;
  prefix?: string;
  count: number;
  shouldCountUp?: boolean;
  showProgressRing?: boolean;
  progressRingColor?: string;
  percentage?: number;
}
