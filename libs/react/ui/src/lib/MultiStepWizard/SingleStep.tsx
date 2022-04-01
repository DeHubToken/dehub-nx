import { SingleStepType, StepStatus } from './types';

type SingleStepProps = SingleStepType;

const SingleStep = ({
  status,
  title = 'Harvest & withdraw',
  description = 'Harvest & withdraw',
  errorMsg,
}: SingleStepProps) => {
  return (
    <div className="flex">
      <div className="flex-none flex flex-column align-items-center mr-4">
        <span className="flex-none flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle border-50 z-1 shadow-2 border-primary border-1 border-solid">
          {status === StepStatus.DONE ? (
            <i className="pi pi-check" aria-hidden="true"></i>
          ) : status === StepStatus.FAILED ? (
            <i className="pi pi-times text-pink-500" aria-hidden="true"></i>
          ) : (
            <i className="pi pi-ellipsis-h" aria-hidden="true"></i>
          )}
        </span>
        <div
          className="flex-grow-1"
          style={{ width: '2px', backgroundColor: '#cadadd' }}
        />
      </div>
      <div className="flex-grow-1 flex align-items-center mr-2">
        <div className="flex flex-column mt-1 mb-4">
          <div
            className={`text-lg mb-2 ${
              status === StepStatus.DOING ? 'text-orange-500' : 'text-white'
            }`}
          >
            {title}
          </div>
          <div className="text-white mb-2">{description}</div>
          {errorMsg && errorMsg.length > 0 && status === StepStatus.FAILED && (
            <div className="flex align-items-center text-pink-500">
              <i className="pi pi-angle-right mr-2"></i>
              {errorMsg}
            </div>
          )}
        </div>
      </div>
      <div className="flex-none flex align-items-center">
        <span className="flex-none flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-2">
          {status === StepStatus.DOING && (
            <i className="pi pi-spin pi-spinner"></i>
          )}
        </span>
      </div>
    </div>
  );
};

export default SingleStep;
