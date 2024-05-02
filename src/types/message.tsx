export type MessageType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  content: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  status: string;
};
