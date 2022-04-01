import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useMemo } from 'react';
import SingleStep from './SingleStep';
import { SingleStepType } from './types';

interface MultiStepWizardProps {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  steps: SingleStepType[];
  execute: () => void;
  isAvailable: () => boolean;
  isExecuting: () => boolean;
}

const MultiStepWizard = ({
  visible,
  onDismiss,
  title = 'MultiStepWizard',
  steps,
  execute,
  isAvailable,
  isExecuting,
}: MultiStepWizardProps) => {
  const disabled = useMemo(() => isAvailable(), [isAvailable]);
  const executing = useMemo(() => isExecuting(), [isExecuting]);

  return (
    <Dialog
      visible={visible}
      modal
      className="p-fluid border-neon-1"
      header={title}
      onHide={onDismiss}
      style={{
        maxWidth: '650px',
      }}
    >
      {steps.map((step: SingleStepType, index: number) => (
        <SingleStep
          key={index}
          status={step.status}
          loading={step.loading}
          title={step.title}
          description={step.description}
          errorMsg={step.errorMsg}
        />
      ))}
      <Button
        className="p-button w-full mt-5"
        disabled={disabled}
        onClick={execute}
        loading={executing}
        label="Execute"
        loadingIcon={'pi pi-spin pi-spinner'}
      />
    </Dialog>
  );
};

export default MultiStepWizard;
