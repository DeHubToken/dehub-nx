import styled from 'styled-components';
import uniqueId from 'lodash/uniqueId';
import { Avatar } from 'primereact/avatar';

import { Text } from '../../components/Text';

const Grid = styled.div`
  display: flex;
  grid-template-columns: auto;
  grid-column-gap: 5px;
`

interface NumberComponentProps {
  size?: string;
  fontSize?: string;
  number: number
}

// const RoundNumber: React.FC<NumberComponentProps> = ({
//   size,
//   fontSize,
//   number
// }) => {
//   return (
//     <div className="flex justify-content-center align-items-center">
//       <div style={{ borderRadius: '50%', width: `${size}px`, height: `${size}px` }} />
//       <div style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }}>
//         <Text fontSize={fontSize}>{number}</Text>
//       </div>
//     </div>
//   );
// }

interface WinningNumbersProps {
  numbers: number[],
  size?: string,
  fontSize?: string,
  rounded?: boolean
}

const WinningNumbers = ({
  numbers,
  size = '32px',
  fontSize = '14px',
  rounded = true,
  ...containerProps
} : WinningNumbersProps) => {
  return (
    <div className="flex">
      {
        numbers.map((num, index) => {
          return (
            <div key={uniqueId()} className="ml-1">
              {
                rounded ?
                <Avatar
                  label={`${num}`}
                  size="large"
                  shape="circle"
                  style={{ backgroundColor: '#2196F3', color: '#ffffff', fontSize: `${fontSize}` }}
                />
                // <RoundNumber
                //   size={size}
                //   fontSize={fontSize}
                //   number={num}
                // />
                :
                <Text
                  fontSize={fontSize}
                >
                  {num}
                </Text>
              }
            </div>
          );
        })
      }
    </div>
  );
}

export default WinningNumbers;