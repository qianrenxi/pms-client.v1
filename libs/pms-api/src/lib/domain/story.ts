import { Product } from './product';
import { ProductFolder } from './product-folder';
import { Plan } from './plan';
import { User } from './user';
import { Attachment } from './atachement';

export enum StoryStatus {
  draft,
  active,
  closed,
  changed
}

export enum StoryStage {
  planed,
  projected
  // ...
}

export class Story {
  id: number;
  title: string;
  product: Product; //??
  folder: ProductFolder;
  plan: Plan;
  source: { value: string; lable: string }; // dict
  sourceComment: string;
  titleColor: string;
  priority: { value: number; label: string }; //dict
  predictHours: number;
  needReview: boolean;
  reviewer: User;
  description: string;
  acceptanceCriteria: string;
  attachments: Attachment[];
  trackers: User[];
  keywords: string[];
  status: StoryStatus;
  assignTo: User;
  stage: StoryStage;
}
