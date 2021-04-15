export interface IMayor {
  name: string;
  birth: Date;
  email: string;
  phone: string;
  reelected: boolean;
}

export interface ITax {
  name: string;
  birth: Date;
  email: string;
  phone: string;
  role: string;
}

export interface ISupervisor {
  name: string;
  qualification: Date;
  email: string;
  phone: string;
  role: string;
}

export interface IVtn {
  year: number;
  good: number;
  regular: number;
  restricted: number;
  planted: number;
  natural: number;
  preservation: number;
}

export interface ITasks {
  audit1: boolean;
  audit2: boolean;
  audit3: boolean;
  audit4: boolean;
  audit5: boolean;
  cafirs: boolean;
  diffs: boolean;
}
