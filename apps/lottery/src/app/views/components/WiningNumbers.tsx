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
                className="shadow-3"
                style={{
                  background:
                    'linear-gradient(128deg, rgba(31, 122, 153, 0.5) 0%, rgba(25, 120, 173, 0.5) 45%, rgba(162, 75, 180, 0.5) 100%)',
                  color: '#ffffff',
                  fontSize: `${fontSize}`,
                  fontWeight: 900,
                  marginRight: '5px',
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
