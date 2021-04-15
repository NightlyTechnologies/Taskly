export default interface ICreateActivityDTO {
  title: string;
  description: string;
  requester: string;
  responsibles: string[];
  cities: string[];
  deadline: Date;
};
