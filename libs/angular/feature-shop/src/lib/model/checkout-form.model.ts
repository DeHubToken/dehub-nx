export enum CheckoutProcessMessage {
  Confirm = 'Confirming',
  UpdateContacts = 'Updating contact details',
  BalanceCheck = 'Checking balance',
  AllowanceCheck = 'Checking allowance',
  AllowanceSet = 'Approving allowance',
  OrderInit = 'Initializing order',
  ReceiptMint = 'Minting NFT receipt',
  VerifyReceipt = 'Verifying NFT Receipt',
  OrderSuccess = 'Thank you for your purchase! We will start working on your order immediately.',
  ApprovalError = 'Something went wrong during approval stage. Please, try again.',
  OrderError = 'Something went wrong. Please try again.',
}

export interface CheckoutProcess {
  icon: string;
  text: CheckoutProcessMessage;
}
