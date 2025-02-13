import { logoutUsersAPI } from '@/api-site/user';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { ThemeToggle } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export type NavbarProps = {
  title: string;
  href: string;
  description?: string;
  icon?: any;
};

interface Props {
  user?: any;
  showDrawer?: () => void;
}

const HorizontalNavDashboard = ({ user, showDrawer }: Props) => {
  const t = useTranslations('menu_site');
  const { push } = useRouter();

  const logoutUserItem = async () => {
    Cookies.remove(String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN));
    await logoutUsersAPI();
    push(`/`);
    location.reload();
  };

  return (
    <>
      <header className="sticky top-0 z-20 border-gray-300 dark:bg-[#1c1b22]">
        <div className="px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center -m-2 lg:hidden">
              <Button onClick={showDrawer} type="button" variant="ghost">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </Button>
            </div>

            <div className="flex ml-2 xl:ml-0">
              <div className="flex items-center flex-shrink-0">
                <div className="block w-auto h-8 lg:hidden">
                  <div className="flex items-center">
                    <div className="relative shrink-0 cursor-pointer">
                      <img
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                        alt={process.env.NEXT_PUBLIC_NAME_SITE}
                      />
                    </div>
                  </div>
                </div>
                <div className="hidden w-auto h-8 lg:block">
                  <div className="flex items-center">
                    <div className="relative shrink-0 cursor-pointer">
                      <img
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                        alt={process.env.NEXT_PUBLIC_NAME_SITE}
                      />
                    </div>

                    <div className="ml-2 cursor-pointer">
                      <p className="text-lg font-bold">
                        {process.env.NEXT_PUBLIC_NAME_SITE}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end ml-auto">
              <div className="relative">
                <ThemeToggle />
              </div>

              <div className="relative">
                {user?.profile ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="flex max-w-xs items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                        >
                          <AvatarComponent
                            className="size-9"
                            profile={user?.profile}
                          />
                          <div className="ml-2 min-w-0 flex-1">
                            <p className="hidden w-auto ml-1 text-sm font-bold text-gray-900 dark:text-white lg:block">
                              {user?.profile?.firstName}{' '}
                              {user?.profile?.lastName}
                            </p>
                            <p className="mt-1 hidden text-sm font-medium text-gray-600 sm:table-cell">
                              <span>{user?.profile?.email}</span>
                            </p>
                          </div>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40 dark:border-gray-800 dark:bg-[#1c1b22]">
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => push(`/dashboard`)}>
                            <span className="cursor-pointer">
                              {t('dashboard')}
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => push(`/contributors`)}
                          >
                            <span className="cursor-pointer">
                              {t('contributor')}
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logoutUserItem()}>
                          <span className="cursor-pointer">{t('logout')}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export { HorizontalNavDashboard };
