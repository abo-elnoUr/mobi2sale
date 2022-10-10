export interface Employee{
  id: string;
  firstName: string;
  lastName: string;
  dateOfBrith: string;
  mobile1: string;
  mobile2: string;
  phone: string;
  email: string;
  image: string;
  visaNumber: string;
  visaImage: string;
  district: string;
  governorate: string;
  street: number;
  departments: [
    {
      id: string,
      name: string,
      selected: boolean
    }
  ]
}
