import { IInstagramMedia } from './IInstagramMedia';

export interface IInstagramResponse {
  data: IInstagramMedia[];

  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next: string;
  };
}
