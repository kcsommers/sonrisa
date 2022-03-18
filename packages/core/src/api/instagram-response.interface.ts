import { IInstagramMedia } from './instagram-media.interface';

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
