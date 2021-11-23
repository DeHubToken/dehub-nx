import { AbiItem } from 'web3-utils';
import { Interface, JsonFragment, Fragment } from '@ethersproject/abi';
import { BytesLike } from '@ethersproject/bytes';
import { getWeb3NoAccount } from './web3';
import MultiCallAbi from '../config/abi/Multicall.json';
import { getMulticallAddress } from './addressHelpers';

export interface Call {
  address: string; // Address of the contract
  name: string; // Function name on the contract (example: balanceOf)
  params?: (string | number | JsonFragment | Fragment)[]; // Function params
}

const multicall = async (
  abi: (string | JsonFragment | Fragment)[],
  calls: Call[]
) => {
  const web3 = getWeb3NoAccount();
  const multi = new web3.eth.Contract(
    MultiCallAbi as unknown as AbiItem,
    getMulticallAddress()
  );
  const itf = new Interface(abi);

  const calldata = calls.map(call => [
    call.address.toLowerCase(),
    itf.encodeFunctionData(call.name, call.params),
  ]);
  const { returnData } = await multi.methods.aggregate(calldata).call();
  const res = returnData.map((call: BytesLike, i: number) =>
    itf.decodeFunctionResult(calls[i].name, call)
  );

  return res;
};

export default multicall;
