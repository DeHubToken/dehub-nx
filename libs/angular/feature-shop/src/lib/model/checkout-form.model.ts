export enum CheckoutProcessMessage {
  Confirm = 'Confirming',
  BalanceCheck = 'Checking balance',
  AllowanceCheck = 'Checking allowance',
  AllowanceSet = 'Approving allowance',
  OrderInit = 'Initializing order',
  ReceiptMint = 'Minting NFT receipt',
  VerifyReceipt = 'Verifying NFT Receipt',
  OrderSuccess = 'Thank you for your purchase! We will start working on your order immediately.',
  OrderError = 'Something went wrong. Please try again.',
}

export interface CheckoutProcess {
  icon: string;
  text: CheckoutProcessMessage;
}
