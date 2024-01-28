import { Inject, Pipe, PipeTransform } from '@angular/core';
import { EnvToken } from '@dehub/angular/model';
import { SharedEnv, networks } from '@dehub/shared/model';

@Pipe({
  name: 'dhbExplorerUrl',
  standalone: true,
  pure: true,
})
export class ExplorerUrlPipe implements PipeTransform {
  private blockExplorerUrl = networks[this.env.web3.chainId].blockExplorerUrl;

  constructor(@Inject(EnvToken) private env: SharedEnv) {}

  transform(
    address: string,
    fragment?: undefined | 'tokentxns' | 'tokentxnsErc721'
  ): string {
    const transactionsUrl = `${this.blockExplorerUrl}/address/${address}`;

    return fragment ? `${transactionsUrl}#${fragment}` : transactionsUrl;
  }
}
