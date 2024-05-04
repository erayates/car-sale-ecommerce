export type UserType = {
  id: string;
  address: UserAddressType | null;
  avatar: string | null;
  createdAt: Date | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  onlineStatus: boolean | null;
  phone: string | null;
  updatedAt: Date | null;
  uid: string | null;
};

type UserAddressType = {
  addressLine: string;
  country: string;
  province: string;
};
