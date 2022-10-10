export interface AdditionVoucher{
  storeId: string;
  employeeId: string;
  supplierId: string;
  total: number;
  serialNo: string;
  details: [{
    itemId: string,
    quantity: number
  }];
}
