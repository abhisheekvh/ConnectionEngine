export interface signupDTO {
  email: string;
  password: string;
  qrText: string | null;
  sharedKey: string | null;
  showQr: boolean;
}
