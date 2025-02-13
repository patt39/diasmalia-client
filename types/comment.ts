import { ModelType, PaginationResponse } from '@/utils/pagination-item';
import { ProfileItemModel } from './profile.type';

export type ResponseCommentModel = {
  value: Array<CommentModel>;
} & PaginationResponse;

export type CommentModel = {
  createdAt: Date;
  id: string;
  description: string;
  postId: string;
  productId: string;
  userId: string;
  color: string;
  fullName: string;
  email: string;
  userReceiveId: string;
  organizationId: string;
  profile: ProfileItemModel;
};

export type CommentFormModel = {
  organizationId: string;
  model: ModelType;
  description: string;
  postId: string;
  productId: string;
  commissionId: string;
  userId: string;
};
