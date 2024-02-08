import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { CHAINS, ChainType } from '../../constants/chains';
import { useAppDispatch } from '../../state';
import { setDstChain, setSourceChain } from '../../state/application';
import { useDstChain, useSourceChain } from '../../state/application/hooks';

interface ChainDialogProps {
  isSourceChain: boolean;
  open: boolean;
  onHide: () => void;
}

const ChainDialog: React.FC<ChainDialogProps> = ({
  isSourceChain,
  open,
  onHide,
}) => {
  const toast = useRef<Toast>(null);
  const { chain: sourceChain } = useSourceChain();
  const { chain: dstChain } = useDstChain();
  const dispatch = useAppDispatch();
  // const { account, web3, chainId } = useWeb3Context();

  const clickChain = async (chain: ChainType) => {
    if (isSourceChain) {
      if (sourceChain && chain.chainID === dstChain?.chainID) {
        dispatch(setDstChain({ chain: sourceChain }));
      }
      dispatch(setSourceChain({ chain }));
    } else {
      dispatch(setDstChain({ chain }));
    }
    onHide();
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={open}
        modal
        className="border-neon-1"
        header={`Select Chain`}
        onHide={onHide}
        style={{
          minWidth: '288px',
          maxWidth: '400px',
          marginTop: '124px',
          position: 'relative',
        }}
      >
        <div>
          {CHAINS.filter(chain =>
            isSourceChain ? true : chain.chainID !== sourceChain?.chainID
          ).map((chain: ChainType) => {
            return (
              <div
                className="flex flex-column"
                onClick={() => {
                  clickChain(chain);
                }}
              >
                <div className="card gray shadow-2 mt-1 flex flex-row mt-3">
                  <img
                    width={30}
                    height={30}
                    className="align-left"
                    src={chain.logo}
                    alt={chain?.name}
                  ></img>
                  <div
                    className="text right align-self-center"
                    style={{ fontSize: '15px', paddingLeft: '15px' }}
                  >
                    {chain.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Dialog>
    </>
  );
};

export default ChainDialog;
