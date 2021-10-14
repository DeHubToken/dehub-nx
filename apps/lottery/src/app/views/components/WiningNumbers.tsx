import { Avatar } from 'primereact/avatar';
import styled from 'styled-components';
import { Text } from '../../components/Text';
import { toLotteryNumbers } from '../../utils/numbers';

const Grid = styled.div`
  display: flex;
  grid-template-columns: auto;
  grid-column-gap: 5px;
`;

interface NumberComponentProps {
  size?: string;
  fontSize?: string;
  number: number;
}

/*
 * const RoundNumber: React.FC<NumberComponentProps> = ({
 *   size,
 *   fontSize,
 *   number
 * }) => {
 *   return (
 *     <div className="flex justify-content-center align-items-center">
 *       <div style={{ borderRadius: '50%', width: `${size}px`, height: `${size}px` }} />
 *       <div style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }}>
 *         <Text fontSize={fontSize}>{number}</Text>
 *       </div>
 *     </div>
 *   );
 * }
 */

interface WinningNumbersProps {
  number: number;
  size?: string;
  fontSize?: string;
  rounded?: boolean;
}

const WinningNumbers = ({
  number,
  size = '32px',
  fontSize = '14px',
  rounded = true,
  ...containerProps
}: WinningNumbersProps) => {
  const numbers = toLotteryNumbers(number);

  return (
    <div className="flex">
      {numbers.map((num: number, index: number) => {
        return (
          <div key={`${index}`} className="ml-1">
            {rounded ? (
              <Avatar
                label={`${num}`}
                size="large"
                shape="circle"
                style={{
                  backgroundColor: '#2196F3',
                  color: '#ffffff',
                  fontSize: `${fontSize}`,
                }}
              />
            ) : (
              <Text fontSize={fontSize}>{num}</Text>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WinningNumbers;
