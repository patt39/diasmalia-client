import { createOnUploadPostAPI } from '@/api-site/post';
import dynamic from 'next/dynamic';
import { useMemo, useRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import ReactQuill, { ReactQuillProps } from 'react-quill';

interface QuillWrapperProps extends ReactQuillProps {
  forwardedRef?: React.Ref<ReactQuill>;
}

const DynamicReactQuill = dynamic<QuillWrapperProps>(
  async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false },
);

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
  defaultValue?: string;
}

const ReactQuillInput: React.FC<Props> = ({
  control,
  label = '',
  name,
  errors,
  placeholder = '',
  defaultValue,
}) => {
  const quillRef = useRef() as any;

  const imageHandler = (e: any) => {
    const input: any = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      let data = new FormData();

      const quillObj = quillRef?.current?.getEditor();
      const range = quillObj?.getSelection();

      if (file) {
        data.append('image', file);
        const { data: responseUpload } = await createOnUploadPostAPI(data);
        console.log('responseUpload ==========>', responseUpload);
        quillObj.insertEmbed(range, 'image', responseUpload.urlFile);
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ align: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          [{ color: [] }, { background: [] }],
          ['link'],
          // ['image', 'link']
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );
  return (
    <>
      {label ? (
        <label className="mb-2 block text-sm font-bold" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: 'Please enter post description',
        }}
        render={({ field: { ref, ...field } }) => (
          <>
            <DynamicReactQuill
              {...field}
              theme="snow"
              forwardedRef={quillRef}
              placeholder={placeholder}
              modules={modules}
              // modules={{
              //   toolbar: {
              //     container: [
              //       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              //       ['bold', 'italic', 'underline', 'strike'],
              //       [{ 'align': [] }],
              //       [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
              //       [{ 'color': [] }, { 'background': [] }],
              //       ['image', 'link']
              //     ],
              //   },
              // }}
            />
          </>
        )}
      />
      {errors?.[name] && (
        <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
          {errors?.[name]?.message}
        </span>
      )}
    </>
  );
};

export { ReactQuillInput };
