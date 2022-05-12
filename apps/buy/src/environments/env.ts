import { defaultSharedDevEnv, SharedEnv } from '@dehub/shared/config';

export interface Env extends SharedEnv {
  swap: {
    defaultInput: string;
    defaultOutput: string;
    factory: string;
    initCodeHash: string;
    router: string;
  };
}

export const defaultEnv: Env = {
  ...defaultSharedDevEnv,

  swap: {
    defaultInput: 'BNB',
    defaultOutput: '0xf571900aCe63Bc9b4C8F382bda9062232e4Ff477',
    factory: '0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc',
    initCodeHash:
      '0xecba335299a6693cb2ebc4782e74669b84290b6378ea3a3873c7231a8d7d1074',
    router: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
  },
};
