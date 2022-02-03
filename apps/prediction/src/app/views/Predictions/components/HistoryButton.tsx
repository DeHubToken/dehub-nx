import { AutoRenewIcon, HistoryIcon, IconButton } from '@dehub/react/pcsuikit';
import { useMoralis } from 'react-moralis';
import { useAppDispatch } from '../../../state';
import { useGetIsFetchingHistory } from '../../../state/hooks';
import { setHistoryPaneState } from '../../../state/predictions';

const HistoryButton = () => {
  const isFetchingHistory = useGetIsFetchingHistory();
  const dispatch = useAppDispatch();
  const { isAuthenticated, account } = useMoralis();
  const isAuth = isAuthenticated && account;

  const handleClick = () => {
    dispatch(setHistoryPaneState(true));
  };

  return (
    <IconButton
      variant="primary"
      ml="8px"
      onClick={handleClick}
      isLoading={isFetchingHistory}
      disabled={!isAuth}
    >
      {isFetchingHistory ? (
        <AutoRenewIcon spin color="white" />
      ) : (
        <HistoryIcon width="24px" color="white" />
      )}
    </IconButton>
  );
};

export default HistoryButton;
