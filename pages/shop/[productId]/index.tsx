import { GetOneCartOrderAPI } from '@/api-site/cart';
import { GetOneProductAPI } from '@/api-site/product';
import { GetOneUserPublicAPI } from '@/api-site/user';
import { LoginModal } from '@/components/auth-modal/login-modal';
import { CartOrderFooterCart } from '@/components/cart/cart-order-footer-cart';
import { useInputState } from '@/components/hooks';
import { LayoutUserPublicSite } from '@/components/layout-user-public-site';
import { PublicLastProducts } from '@/components/shop/public-last-products';
import { ViewProductsShop } from '@/components/shop/view-products-shop';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

const ShopUserPublic = () => {
  const { query, push } = useRouter();
  const { isOpen, setIsOpen, userStorage: userBayer } = useInputState();

  const { status, data: product } = GetOneProductAPI({
    productSlug: String(query?.productId),
  });

  const {
    isPending: isPendingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({
    username: product?.profile?.username,
    userVisitorId: userBayer?.id,
  });

  const {
    isPending: isPendingCartOrder,
    isError: isErrorCartOrder,
    data: cartOrder,
  } = GetOneCartOrderAPI({
    organizationSellerId: product?.organizationId,
  });

  return (
    <>
      <LayoutUserPublicSite title={`${product?.title ?? 'Shop'}`} user={user}>
        <div className="max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-2 grid grid-cols-1 gap-y-10 sm:mt-12 sm:grid-cols-1 sm:gap-8 lg:grid-cols-5 lg:items-start lg:gap-x-10 xl:grid-cols-6 xl:gap-x-10">
              {product?.id ? (
                <>
                  <div className="my-4 border-gray-200 lg:col-span-3 xl:col-span-4">
                    <div className="flow-root">
                      <ViewProductsShop item={product} />
                    </div>
                  </div>

                  <div className="my-4 lg:sticky lg:top-6 lg:order-2 lg:col-span-2">
                    <div className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-[#121212]">
                      <div className="flow-root">
                        {product?.id && user?.organizationId ? (
                          <PublicLastProducts
                            userVisitor={{
                              id: user?.id,
                              organizationId: user?.organizationId,
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>

        {userBayer?.id && user?.id && cartOrder?.id ? (
          <CartOrderFooterCart user={user} cartOrder={cartOrder} />
        ) : null}

        <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </LayoutUserPublicSite>

      {status === 'pending' && isPendingUser && isPendingCartOrder ? (
        <LoadingFile />
      ) : null}

      {status === 'error' && isErrorUser && isErrorCartOrder ? (
        <ErrorFile
          title="404"
          description="Error find data please try again"
          className="dark:text-white"
        />
      ) : null}
    </>
  );
};

export default ShopUserPublic;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
        ...(await import(`/lang/${locale}/common.json`)).default,
      },
    },
  };
}
