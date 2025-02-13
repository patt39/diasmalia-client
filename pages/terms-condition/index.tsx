import { LayoutSite } from '@/components/layout-site';
import { GetStaticPropsContext } from 'next';

const TermsCondition = () => {
  return (
    <>
      <LayoutSite title="Terms Condition">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 bg-white py-12 dark:bg-black sm:py-16 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-4xl">
                Terms of use
              </h2>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl xl:max-w-4xl">
                <div className="mt-8">
                  <p className="font-pj text-base font-normal leading-7 text-gray-700">
                    Welcome to {process.env.NEXT_PUBLIC_NAME_SITE} this page
                    explains our terms of use. When you use{' '}
                    {process.env.NEXT_PUBLIC_NAME_SITE}, you’re agreeing to all
                    the rules on this page. Some of them need to be expressed in
                    legal language, but we’ve done our best to offer you clear
                    and simple explanations of what everything means.
                  </p>

                  <h2 className="font-pj mt-12 text-3xl font-bold">
                    Website Visitors
                  </h2>

                  <p className="font-pj mt-4 text-base font-normal leading-7 text-gray-700">
                    To sign up for a {process.env.NEXT_PUBLIC_NAME_SITE}{' '}
                    account, you need to be 18 or over. You’re responsible for
                    your account and all the activity on it. You can browse{' '}
                    {process.env.NEXT_PUBLIC_NAME_SITE} without registering for
                    an account. But to use some of our features, you’ll need to
                    register, choose a username, and set a password. When you do
                    that, the information you give us has to be accurate and
                    complete. Don’t impersonate anyone else or choose names that
                    are offensive or that violate anyone’s rights. If you don’t
                    follow these rules, we may cancel your account.
                  </p>
                  <p className="font-pj mt-4 text-base font-normal leading-7 text-gray-700">
                    You’re responsible for all the activity on your account, and
                    for keeping your password confidential. If you find out that
                    someone has used your account without your permission, you
                    should report it to support@unpot.com.
                  </p>

                  <p className="font-pj mt-4 text-base font-normal leading-7 text-gray-700">
                    To sign up for an account, you need to be at least 18 years
                    old, or old enough to form a binding contract where you
                    live. If necessary, we may ask you for proof of age.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <footer className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-8 xl:gap-x-12">
              <div className="lg:col-span-2">
                <p className="text-base font-semibold">Company</p>

                <ul className="mt-6 space-y-5">
                  <li>
                    <a
                      href="#"
                      title=""
                      className="flex text-sm transition-all duration-200 hover:text-indigo-600 focus:text-indigo-600"
                    >
                      About
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      title=""
                      className="flex text-sm transition-all duration-200 hover:text-indigo-600 focus:text-indigo-600"
                    >
                      Features
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      title=""
                      className="flex text-sm transition-all duration-200 hover:text-indigo-600 focus:text-indigo-600"
                    >
                      Works
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      title=""
                      className="flex text-sm transition-all duration-200 hover:text-indigo-600 focus:text-indigo-600"
                    >
                      {' '}
                      Career{' '}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-2">
                <p className="text-base font-semibold">Help</p>

                <ul className="mt-6 space-y-4">
                  <li>
                    <a
                      href="#"
                      title=""
                      className="flex text-sm transition-all duration-200 hover:text-indigo-600 focus:text-indigo-600"
                    >
                      {' '}
                      Customer Support{' '}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      title=""
                      className="flex text-sm transition-all duration-200 hover:text-indigo-600 focus:text-indigo-600"
                    >
                      {' '}
                      Delivery Details{' '}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      title=""
                      className="flex text-sm transition-all duration-200 hover:text-indigo-600 focus:text-indigo-600"
                    >
                      {' '}
                      Terms & Conditions{' '}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      title=""
                      className="flex text-sm transition-all duration-200 hover:text-indigo-600 focus:text-indigo-600"
                    >
                      {' '}
                      Privacy Policy{' '}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-2">
                <p className="text-base font-semibold">Resources</p>

                <ul className="mt-6 space-y-5">
                  <li>
                    <a
                      href="#"
                      title=""
                      className="flex text-sm transition-all duration-200 hover:text-indigo-600 focus:text-indigo-600"
                    >
                      {' '}
                      Free eBooks{' '}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      title=""
                      className="flex text-sm transition-all duration-200 hover:text-indigo-600 focus:text-indigo-600"
                    >
                      {' '}
                      Development Tutorial{' '}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      title=""
                      className="flex text-sm transition-all duration-200 hover:text-indigo-600 focus:text-indigo-600"
                    >
                      {' '}
                      How to - Blog{' '}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      title=""
                      className="flex text-sm transition-all duration-200 hover:text-indigo-600 focus:text-indigo-600"
                    >
                      {' '}
                      YouTube Playlist{' '}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-2">
                <p className="text-base font-semibold">Extra Links</p>

                <ul className="mt-6 space-y-5">
                  <li>
                    <a
                      href="#"
                      title=""
                      className="flex text-sm transition-all duration-200 hover:text-indigo-600 focus:text-indigo-600"
                    >
                      {' '}
                      Customer Support{' '}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      title=""
                      className="flex text-sm transition-all duration-200 hover:text-indigo-600 focus:text-indigo-600"
                    >
                      {' '}
                      Delivery Details{' '}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      title=""
                      className="flex text-sm transition-all duration-200 hover:text-indigo-600 focus:text-indigo-600"
                    >
                      {' '}
                      Terms & Conditions{' '}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      title=""
                      className="flex text-sm transition-all duration-200 hover:text-indigo-600 focus:text-indigo-600"
                    >
                      {' '}
                      Privacy Policy{' '}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <hr className="mb-10 mt-16 border-gray-200" />

            <div className="sm:flex sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600">
                © Copyright 2021, All Rights Reserved by Postcraft
              </p>

              <ul className="mt-5 flex items-center space-x-3 sm:mt-0 md:order-3">
                <li>
                  <a
                    href="#"
                    title=""
                    className="flex size-7 items-center justify-center rounded-full border border-gray-300 bg-transparent text-gray-800 transition-all duration-200 hover:border-orange-600 hover:bg-orange-600 hover:text-white focus:border-orange-600 focus:bg-orange-600 focus:text-white"
                  >
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    title=""
                    className="flex size-7 items-center justify-center rounded-full border border-gray-300 bg-transparent text-gray-800 transition-all duration-200 hover:border-orange-600 hover:bg-orange-600 hover:text-white focus:border-orange-600 focus:bg-orange-600 focus:text-white"
                  >
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    title=""
                    className="flex size-7 items-center justify-center rounded-full border border-gray-300 bg-transparent text-gray-800 transition-all duration-200 hover:border-orange-600 hover:bg-orange-600 hover:text-white focus:border-orange-600 focus:bg-orange-600 focus:text-white"
                  >
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                      <circle cx="16.806" cy="7.207" r="1.078"></circle>
                      <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    title=""
                    className="flex size-7 items-center justify-center rounded-full border border-gray-300 bg-transparent text-gray-800 transition-all duration-200 hover:border-orange-600 hover:bg-orange-600 hover:text-white focus:border-orange-600 focus:bg-orange-600 focus:text-white"
                  >
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                      ></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </LayoutSite>
    </>
  );
};

export default TermsCondition;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
