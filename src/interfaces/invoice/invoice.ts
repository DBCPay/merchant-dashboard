export interface Invoice {
  id: string;
  invoiceId: string;
  amount: number;
  status: string;
  clientId: string;
  clientDetails: {
    clientName: string;
    clientEmail: string;
    imageUrl: string;
  };
  issuedAt: string;
  dueAt: string;
}
