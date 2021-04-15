export default interface IUpdateActivityDTO {
  id: string;
  title?: string;
  description?: string;
  requester?: string;
  status?: string;
  responsibles?: string[];
  cities?: string[];
  deadline?: Date;
};
