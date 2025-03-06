export interface Transaction {
  id: string;
  transactionId: string;
  transactionType: "Refund" | "Payment";
  amount: number;
  status: string;
  clientName: string;
  clientEmail: string;
  invoiceId: string;
  transactionDate: string;
  paymentMethod: "QR Code" | "Bank Transfer";
  clientId: string;
  clientIpAddress: string;
  description?: string;
}
