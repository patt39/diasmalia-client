/* eslint-disable @next/next/no-img-element */
import {
  GetAllCountiesAPI,
  GetAllCurrenciesAPI,
  UpdateOneProfileNextStepAPI,
} from '@/api-site/profile';
import { GetOneUserPublicAPI, resendCodeAPI } from '@/api-site/user';
import { LayoutSite } from '@/components/layout-site';
import { ButtonInput } from '@/components/ui-setting';
import { DateInput } from '@/components/ui-setting/ant';
import { SelectSearchInput } from '@/components/ui-setting/ant/select-search-input';
import { TextAreaInput, TextInput } from '@/components/ui-setting/shadcn';
import { PrivateComponent } from '@/components/util/private-component';
import { NextStepProfileFormModel } from '@/types/profile.type';
import { AlertDangerNotification } from '@/utils/alert-notification';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  username: yup
    .string()
    .trim('The username name cannot include leading and trailing spaces')
    .strict(true)
    .min(1, 'The username name needs to be at least 1 char')
    .max(512, 'The username name cannot exceed 512 char')
    .required(),
  url: yup.string().url().optional(),
  birthday: yup.date().max(new Date()).required(),
  currencyId: yup.string().uuid().required(),
  countryId: yup.string().uuid().required(),
});

const SettingProfile = () => {
  // const user = useAuth() as any;
  const router = useRouter();
  const { query } = useRouter();
  const userId = String(query?.userId);
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined,
  );
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { data: currencies } = GetAllCurrenciesAPI();
  const { data: countries } = GetAllCountiesAPI();
  const { data: user } = GetOneUserPublicAPI({ userId }) as any;

  if (user?.nextStep === 'CONFIRM_EMAIL') {
    window.location.href = `${process.env.NEXT_PUBLIC_SITE}/register/${user?.id}/confirm-account`;
  }

  useEffect(() => {
    if (user) {
      const fields = ['username'];
      fields?.forEach((field: any) => setValue(field, user[field]));
    }
  }, [user, setValue]);

  const saveMutation = UpdateOneProfileNextStepAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<NextStepProfileFormModel> = async (
    payload: NextStepProfileFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation.mutateAsync({
        ...payload,
        nextStep: 'CONFIRM_EMAIL',
        userId: userId,
      });
      await resendCodeAPI({ userId });
      router.push(`${`/register/${userId}/confirm-account`}`);
      setHasErrors(false);
      setLoading(false);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <LayoutSite title="Log In">
      <div className="m-auto w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <div className="mx-auto flex justify-center">
          <img
            className="h-7 w-auto sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
        </div>
        <div className="mx-auto flex justify-center">
          <h6 className="mt-3 text-center text-xl font-bold">
            {`Complete your profile`}
          </h6>
        </div>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          {hasErrors && (
            <div className="font-regular relative mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
              {hasErrors}
            </div>
          )}

          <div className="mb-4">
            <TextInput
              control={control}
              label="What do you want your link to be"
              type="text"
              name="username"
              placeholder="username"
              errors={errors}
              // prefix={'unpot.com/'}
            />
          </div>
          <div className="mb-4">
            <SelectSearchInput
              firstOptionName="Currency"
              label="Currency"
              valueType="key"
              control={control}
              errors={errors}
              placeholder="Currency"
              name="currencyId"
              dataItem={currencies}
            />
          </div>

          <div className="mb-4">
            <SelectSearchInput
              firstOptionName="Country"
              label="Country residence"
              valueType="key"
              control={control}
              errors={errors}
              placeholder="Country"
              name="countryId"
              dataItem={countries}
            />
          </div>

          <div className="mb-4">
            <DateInput
              control={control}
              label="Birthday"
              placeholder="12/01/2023"
              name="birthday"
              errors={errors}
            />
          </div>

          <div className="mb-4">
            <TextAreaInput
              control={control}
              label="Bio"
              name="description"
              placeholder="Introduce yourself and what you're creating"
              errors={errors}
            />
          </div>

          <div className="mb-4">
            <TextInput
              control={control}
              label="Web site or social link"
              type="text"
              name="url"
              placeholder="https://www.yousite.com"
              errors={errors}
            />
          </div>

          <div className="mt-6">
            <ButtonInput
              className="w-full"
              variant="info"
              type="submit"
              size="lg"
              loading={loading}
            >
              Continue
            </ButtonInput>
          </div>
        </form>
      </div>
    </LayoutSite>
  );
};

export default PrivateComponent(SettingProfile);
