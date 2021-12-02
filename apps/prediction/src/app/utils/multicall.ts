import { Interface, JsonFragment, Fragment } from '@ethersproject/abi';
import { getMultiCallContract } from './contractHelpers';

export interface Call {
  address: string; // Address of the contract
  name: string; // Function name on the contract (example: balanceOf)
  params?: (string | number | JsonFragment | Fragment)[]; // Function params
}

const multicall = async (
  abi: (string | JsonFragment | Fragment)[],
  calls: Call[]
) => {
  try {
    const multi = getMultiCallContract();
    const itf = new Interface(abi);

    const calldata = calls.map(call => [
      call.address.toLowerCase(),
      itf.encodeFunctionData(call.name, call.params),
    ]);
    const { returnData } = await multi.aggregate(calldata);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = returnData.map((call: any, i: number) =>
      itf.decodeFunctionResult(calls[i].name, call)
    );

    return res;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      console.error(error);
      throw new Error('unknown error in multicall');
    }
  }
};

export default multicall;
