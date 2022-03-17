declare namespace MoralisMissingTypes {
  declare namespace Moralis {
    declare namespace Cloud {
      function getLogger(): {
        info: (error: string) => void;
        warn: (error: string) => void;
        error: (error: string) => void;
      };
    }
  }
}

declare const {
  Moralis,
}: typeof import('moralis') & typeof MoralisMissingTypes;
