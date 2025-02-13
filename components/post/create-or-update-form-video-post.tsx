import { GetAllCategoriesAPI } from '@/api-site/category';
import { CreateOrUpdateOnePostAPI } from '@/api-site/post';
import { PostFormModel, arrayWhoCanSees } from '@/types/post';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { filterImageAndFile } from '@/utils/utils';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, UploadFile, UploadProps } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ReactQuillInput } from '../ui-setting';
import { ButtonInput } from '../ui-setting/button-input';
import { SelectInput, TextInput } from '../ui-setting/shadcn';

type Props = {
  organizationId: string;
  uploadImages?: any;
  postId?: string;
  post?: any;
  refetch?: any;
};

const schema = yup.object({
  title: yup.string().required(),
  whoCanSee: yup.string().required('Who can see this post'),
  description: yup.string().optional(),
  urlMedia: yup.string().url().required(),
  // membershipId: yup.string().when("whoCanSee", (enableUrlMedia, schema) => {
  //   if ((enableUrlMedia[0] as WhoCanSeeType) === "MEMBERSHIP")
  //     return yup.string().uuid().required("membership is a required field");
  //   return schema.nullable();
  // }),
});

const CreateOrUpdateFormVideoPost = ({
  postId,
  post,
  refetch,
  uploadImages,
  organizationId,
}: Props) => {
  const { push, back } = useRouter();

  const [imageList, setImageList] = useState<UploadFile[]>(uploadImages ?? []);
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

  const watchWhoCanSee = watch('whoCanSee', null);

  const { data: categories } = GetAllCategoriesAPI({
    isPaginate: 'false',
    organizationId,
    sort: 'DESC',
    take: 100,
  });

  useEffect(() => {
    if (post) {
      const fields = [
        'title',
        'urlMedia',
        'description',
        'whoCanSee',
        'type',
        'categoryId',
        'membershipId',
      ];
      fields?.forEach((field: any) => setValue(field, post[field]));
    }
  }, [post, postId, setValue]);

  // Create or Update data
  const saveMutation = CreateOrUpdateOnePostAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<PostFormModel> = async (
    data: PostFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      const { newImageLists } = filterImageAndFile({
        imageList,
      });
      const payload = {
        ...data,
        imageList,
        newImageLists,
      };

      await saveMutation.mutateAsync({
        ...payload,
        type: 'VIDEO',
        postId: post?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Post save successfully',
      });
      if (post?.id) {
        refetch();
      } else {
        push(`/posts`);
      }
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const handleImageChange: UploadProps['onChange'] = ({ fileList }) =>
    setImageList(fileList);

  return (
    <>
      <div className="mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flow-root">
            <div className="overflow-hidden rounded-lg border  border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
              <div className="px-4 py-5">
                <h2 className="text-base font-bold">
                  {post?.id ? 'Update' : 'Create a New'} Video
                </h2>

                <div className="mt-2">
                  <div className="mx-auto justify-center text-center">
                    <Upload
                      multiple={false}
                      name="attachmentImages"
                      listType="picture-card"
                      fileList={imageList}
                      onChange={handleImageChange}
                      accept=".png,.jpg,.jpeg,.gif"
                      maxCount={1}
                    >
                      {imageList.length >= 1 ? null : (
                        <div className="text-center dark:text-white">
                          <UploadOutlined />
                          <div style={{ marginTop: 8 }}>Upload cover</div>
                        </div>
                      )}
                    </Upload>
                  </div>
                </div>

                <div className="mt-2">
                  <TextInput
                    control={control}
                    label="Title"
                    type="text"
                    name="title"
                    required
                    placeholder="Title"
                    errors={errors}
                  />
                </div>
                <div className="mt-4">
                  <TextInput
                    control={control}
                    label="Url video"
                    type="text"
                    name="urlMedia"
                    required
                    placeholder="e.g. https://youtube.com/watch?v=abc123"
                    errors={errors}
                  />
                </div>
                <span className="text-sm font-medium text-gray-400">
                  {`Add a url to an external platform. Currently supported platforms are DailyMotion, Facebook, Giphy, Instagram, MixCloud, SoundCloud, Spotify, TikTok, Twitch, Twitter, Vimeo and YouTube.`}
                </span>

                <div className="mt-4">
                  <SelectInput
                    firstOptionName="Choose who can see this post?"
                    label="Who can see this post?"
                    control={control}
                    errors={errors}
                    placeholder="Select who can see this post?"
                    valueType="text"
                    name="whoCanSee"
                    dataItem={arrayWhoCanSees}
                  />
                </div>

                <div className="mt-4">
                  <SelectInput
                    firstOptionName="Choose category post"
                    label="Category post"
                    control={control}
                    errors={errors}
                    placeholder="Select category post"
                    valueType="key"
                    name="categoryId"
                    allowClear={true}
                    dataItem={categories}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-400">
                      {`Categories makes it easy to browse your posts.`}
                    </span>
                    <label className="mb-2 block text-sm dark:text-white"></label>
                    <Link
                      className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                      href="/shop/config"
                    >
                      Setting category
                    </Link>
                  </div>
                </div>

                <div className="mt-4">
                  <ReactQuillInput
                    control={control}
                    label="Description"
                    name="description"
                    placeholder="Write description"
                    errors={errors}
                  />
                  {/* <TextAreaInput
                    row={4}
                    control={control}
                    label="Description"
                    name="description"
                    placeholder="Description"
                    errors={errors}
                  /> */}
                  <span className="text-sm font-medium text-gray-400">
                    {`Provide a full description of the item that you are selling.`}
                  </span>
                </div>

                <div className="mt-4">
                  <ButtonInput
                    type="submit"
                    className="w-full"
                    size="lg"
                    variant="info"
                    loading={loading}
                  >
                    Save and Publish
                  </ButtonInput>
                </div>
                <div className="my-4 flex items-center space-x-4">
                  <ButtonInput
                    type="button"
                    className="w-full"
                    size="lg"
                    variant="outline"
                    onClick={() => back()}
                  >
                    Cancel
                  </ButtonInput>
                  <ButtonInput
                    type="submit"
                    className="w-full"
                    size="lg"
                    variant="info"
                    loading={loading}
                  >
                    Save as Draft
                  </ButtonInput>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { CreateOrUpdateFormVideoPost };
