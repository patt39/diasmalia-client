/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Skeleton } from "antd";
import { CommentModel } from "@/types/comment";
import { GetInfiniteCommentsAPI } from "@/api-site/comment";
import { ListCommentTransactions } from "../comment/list-comments-transactions";
import { ModelType } from "@/utils/pagination-item";
import { ButtonInput } from "../ui";

const RecentCommentTransactions: React.FC<{
  organizationId?: string;
  modelIds: ModelType[];
  model: ModelType;
}> = ({ organizationId, modelIds, model }) => {
  const {
    isLoading: isLoadingComments,
    isError: isErrorComments,
    data: dataComments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteCommentsAPI({
    take: 6,
    sort: "DESC",
    modelIds: ["DONATION"],
    organizationId,
  });

  const dataTableTransactions = isLoadingComments ? (
    <Skeleton
      className="py-4"
      loading={isLoadingComments}
      avatar
      paragraph={{ rows: 1 }}
    />
  ) : isErrorComments ? (
    <strong>Error find data please try again...</strong>
  ) : dataComments?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataComments?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item: CommentModel, index: number) => (
        <ListCommentTransactions
          item={item}
          key={index}
          index={index}
          model={model}
          modelIds={modelIds}
          organizationId={organizationId}
        />
      ))
  );

  return (
    <>
      <div className="flex items-center">
        <p className="text-lg font-bold">Supporters</p>
      </div>

      <ul className="mt-4 divide-y divide-gray-200 my-2">
        {dataTableTransactions}
      </ul>

      {hasNextPage ? (
        <>
          <div className="mt-2 text-center justify-center mx-auto">
            <div className="sm:mt-0">
              <ButtonInput
                shape="default"
                type="button"
                size="large"
                onClick={() => fetchNextPage()}
                loading={isFetchingNextPage ? true : false}
                color={"gray"}
                defaultColor="gray"
                minW="fit"
              >
                Load More
              </ButtonInput>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export { RecentCommentTransactions };
