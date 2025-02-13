/* eslint-disable @next/next/no-img-element */
import { useReactHookForm } from '@/components/hooks/use-react-hook-form';
import { LayoutAuth } from '@/components/layout-auth';
import { ButtonInput } from '@/components/ui-setting';
import { TextInput } from '@/components/ui-setting/shadcn';
import { TextPasswordInput } from '@/components/ui-setting/shadcn/text-password-input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicComponent } from '@/components/util/public-component';
import { UserLoginFormModel } from '@/types/user.type';
import { AlertDangerNotification } from '@/utils/alert-notification';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { loginGoogleUserAPI, loginUserAPI } from '../../api-site/user';

const schema = yup.object({
  email: yup
    .string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required(),
  password: yup.string().min(8, 'Minimum 8 symbols').required(),
});

const Login = () => {
  const { query, push } = useRouter();
  const { redirect } = query;
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const onSubmit: SubmitHandler<UserLoginFormModel> = async (
    payload: UserLoginFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    const { email, password } = payload;

    try {
      const { data: user } = await loginUserAPI({ email, password });
      // if (user?.nextStep === "SETTING_PROFILE") {
      //   window.location.href = `${process.env.NEXT_PUBLIC_SITE}/register/${user?.id}/setting-profile`;
      // } else if (user?.nextStep === "SETTING_INTEREST") {
      //   window.location.href = `${process.env.NEXT_PUBLIC_SITE}/register/${user?.id}/setting-interest`;
      // } else if (user?.nextStep === "CONFIRM_EMAIL") {
      //   await resendCodeAPI({ userId: user?.id });
      //   window.location.href = `${process.env.NEXT_PUBLIC_SITE}/register/${user?.id}/confirm-account`;
      // } else if (user?.nextStep === "COMPLETE_REGISTRATION") {
      //   window.location.href = `${process.env.NEXT_PUBLIC_SITE}/dashboard`;
      // }
      // localStorage.setItem(
      //   String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN),
      //   JSON.stringify(user?.accessToken),
      // );
      setHasErrors(false);
      setLoading(false);
      console.log('cookie save');
      window.location.href = `${
        redirect ? redirect : `${process.env.NEXT_PUBLIC_SITE}/dashboard`
      }`;
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: 'An error has occurred.',
      });
    }
  };

  return (
    <>
      <LayoutAuth title="Login">
        <div className="m-auto mt-10 w-full max-w-sm rounded-lg p-6 py-12 shadow-md dark:bg-[#121212] md:mt-16">
          {/* <div className="flex justify-center mx-auto">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
        </div> */}
          <div className="mx-auto flex justify-center">
            <h6 className="mt-3 text-center text-xl font-bold">
              {`Log in to your account`}
            </h6>
          </div>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            {hasErrors && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{hasErrors}</AlertDescription>
              </Alert>
            )}

            <div className="mb-4">
              <TextInput
                control={control}
                label="Email"
                type="email"
                name="email"
                placeholder="Email Address"
                errors={errors}
              />
            </div>

            <div className="mb-4">
              <TextPasswordInput
                control={control}
                label="Password"
                name="password"
                placeholder="Password"
                errors={errors}
              />
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm dark:dark:text-white"
                ></label>
                <Link
                  className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                  href={`/forgot-password${redirect ? `?redirect=${redirect}` : ''}`}
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <ButtonInput
                type="submit"
                className="w-full"
                variant="info"
                loading={loading}
              >
                Log In
              </ButtonInput>
            </div>
          </form>
          <div className="my-4 flex items-center justify-between">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
            <p className="text-center text-xs uppercase dark:dark:text-gray-400 dark:text-gray-500">
              or login with Social Media
            </p>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
          </div>

          <div className="flex justify-center">
            <GoogleOAuthProvider
              clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
            >
              <GoogleLogin
                size="large"
                width="100%"
                useOneTap
                theme="filled_blue"
                type="standard"
                shape="rectangular"
                onSuccess={async (credentialResponse) => {
                  try {
                    const { data: user } = await loginGoogleUserAPI({
                      token: String(credentialResponse.credential),
                    });
                    localStorage.setItem(
                      String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN),
                      JSON.stringify(user?.accessToken),
                    );
                    setHasErrors(false);
                    window.location.href = `${
                      redirect
                        ? redirect
                        : `${process.env.NEXT_PUBLIC_SITE}/dashboard`
                    }`;
                  } catch (error: any) {
                    setHasErrors(true);
                    setHasErrors(error.response.data.message);
                    AlertDangerNotification({
                      text: 'An error has occurred.',
                    });
                  }
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
          </div>

          <Link href={`/register${redirect ? `?redirect=${redirect}` : ''}`}>
            <p className="mt-8 cursor-pointer text-center text-xs font-bold text-gray-600 hover:underline dark:hover:text-blue-600">
              {' '}
              New to {process.env.NEXT_PUBLIC_NAME_SITE}? Sign up here
            </p>
          </Link>
        </div>
      </LayoutAuth>
    </>
  );
};

export default PublicComponent(Login);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/auth.json`)).default,
      },
    },
  };
}
