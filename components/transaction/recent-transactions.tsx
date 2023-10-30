/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { ButtonInput, EmptyData, LoadingFile } from "../ui";
import { GetInfiniteTransactionsAPI } from "@/api-site/transaction";
import { useInView } from "react-intersection-observer";
import { ListTransactions } from "./list-transactions";

type Props = {
  model?: string;
  days?: number;
  organizationId?: string;
};

const RecentTransactions: React.FC<Props> = ({
  model,
  organizationId,
  days,
}) => {

  const {
    isLoading: isLoadingTransaction,
    isError: isErrorTransaction,
    data: dataTransaction,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteTransactionsAPI({
    organizationId,
    model: model?.toLocaleUpperCase(),
    take: 10,
    sort: "DESC",
    queryKey: ["recent-transactions", "infinite"],
  });

  const dataTableTransactions = isLoadingTransaction ? (
    <LoadingFile />
  ) : isErrorTransaction ? (
    <strong>Error find data please try again...</strong>
  ) : dataTransaction?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      title="You don't have any supporters yet"
      description={`Share your page with your audience to get started.`}
    />
  ) : (
    dataTransaction?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListTransactions item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <div className="mt-4 px-4 py-4 overflow-hidden dark:bg-white border dark:border-gray-200 rounded-lg">
        <div className="divide-y divide-gray-200">
          <table className="min-w-full mt-4 lg:divide-y lg:divide-gray-200">
            <tbody className="divide-y divide-gray-200">
              {dataTableTransactions}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export { RecentTransactions };
