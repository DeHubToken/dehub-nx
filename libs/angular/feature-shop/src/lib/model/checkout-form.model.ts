export enum CheckoutStatusMessage {
  Confirm = 'Confirming',
  UpdateContacts = 'Updating contact details',
  BalanceCheck = 'Checking balance',
  AllowanceCheck = 'Checking allowance',
  AllowanceSet = 'Approving allowance',
  AllowanceApproved = 'Approved allowance',
  AllowanceApprovalError = 'Something went wrong during approval stage. Please, try again.',
  OrderInit = 'Initializing order',
  ReceiptMint = 'Minting NFT receipt',
  VerifyReceipt = 'Verifying NFT Receipt',
  OrderSuccess = 'Thank you for your purchase! We will start working on your order immediately.',
  OrderError = 'Something went wrong. Please try again.',
}

export enum CheckoutMessage {
  LowBalance = 'Balance is too low.',
}

export interface CheckoutStatus {
  icon: string;
  text: CheckoutStatusMessage;
  /** Checkout status at this point */
  isCompleted: boolean;
}
