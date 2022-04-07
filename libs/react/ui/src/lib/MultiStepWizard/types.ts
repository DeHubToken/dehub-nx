export enum StepStatus {
  PENDING,
  DOING,
  DONE,
  FAILED,
}

export interface SingleStepType {
  status: StepStatus;
  title: string;
  description: string;
  errorMsg?: string;
  loading: boolean;
}
