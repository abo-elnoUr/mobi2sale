export interface BranchRefund{
  id: string;
  branchId: string;
  storeId: string;
  employeeId: string;
  totalPrice: number;
  costPrice: number;
  serialNo: string;
  details: [
    {
      itemId: string,
      quantity: number,
      barCode: string,
      retailPrice: number,
      costPrice: number,
      exchangeVoucherId: string,
      isMobile: boolean,
      isDamaged: boolean
    }
  ]
}
