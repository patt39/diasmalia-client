/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOneCommentReplyAPI } from '@/api-site/comment';
import { CommentModel } from '@/types/comment';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateFromNow,
} from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import { ModelType } from '@/utils/pagination-item';
import { TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant/avatar-component';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { useAuth } from '../util/context-user';

type Props = {
  model: ModelType;
  item?: CommentModel;
  index?: number;
  userReceiveId: string;
};

const ListCommentsRepliesTransactions = ({ item, index }: Props) => {
  const { isOpen, setIsOpen, loading, setLoading } = useInputState();
  const { locale } = useRouter();
  const { userStorage: userVisitor } = useAuth() as any;
  const { mutateAsync: saveMutation } = DeleteOneCommentReplyAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation({ commentId: item?.id });
      AlertSuccessNotification({
        text: 'Comment deleted successfully',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };
  return (
    <>
      <div key={index} className="mt-4 flex items-start">
        <AvatarComponent size={40} profile={item?.profile} />

        <div className="ml-3">
          <div className="flex items-center space-x-px">
            <div className="flex items-center">
              <Link
                href={`/${item?.profile?.username}`}
                className="text-sm font-bold"
              >
                {' '}
                {item?.profile?.firstName} {item?.profile?.lastName}{' '}
              </Link>
              <p className="ml-3.5 text-sm font-normal text-gray-500">
                {formateFromNow(item?.createdAt as Date, locale as string)}
              </p>
            </div>
          </div>
          <p className="mt-1 text-sm font-normal text-gray-600 dark:text-gray-300">
            <HtmlParser html={String(item?.description)} />
          </p>

          <div className="mt-2 flex items-center font-medium text-gray-600">
            {userVisitor?.id === item?.userReceiveId ? (
              <>
                <ActionModalDialog
                  title="Delete?"
                  loading={loading}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  onClick={() => deleteItem(item)}
                  description="Are you sure you want to delete this comment?"
                  buttonDialog={
                    <ButtonInput
                      className="text-sm text-gray-600 hover:text-red-600"
                      variant="link"
                      type="button"
                    >
                      <TrashIcon className="size-4" />
                    </ButtonInput>
                  }
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export { ListCommentsRepliesTransactions };
