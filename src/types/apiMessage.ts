export default interface ApiMessage {
  type: 'ERROR' | 'WARNING' | 'INFO';
  message: string;

  cause?: string;
  code?: number;
}

export type ApiMessages = { [key: string]: ApiMessage | undefined | null };
