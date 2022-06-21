export enum CheckoutProcessMessage {
  Confirm = 'Confirming',
  AllowanceCheck = 'Checking allowance',
  AllowanceSet = 'Approving allowance',
  OrderInit = 'Initializing order',
  ReceiptMint = 'Minting NFT receipt',
  VerifyReceipt = 'Verifying NFT Receipt',
  OrderSuccess = 'Thank you for your purchase!',
  OrderError = 'Something went wrong. Please try again.',
}
