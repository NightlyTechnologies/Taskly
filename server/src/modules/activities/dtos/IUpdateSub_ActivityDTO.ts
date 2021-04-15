export default interface IUpdateSub_ActivityDTO {
  id: string;
  title?: string;
  deadline?: Date;
  description?: string;
  activity?: string;
  responsibles?: string[];
  status?: string[];
};
