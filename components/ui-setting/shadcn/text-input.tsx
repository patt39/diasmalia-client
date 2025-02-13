import { Control, Controller } from 'react-hook-form';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  min?: number;
  max?: number;
  type: 'text' | 'email' | 'password' | 'url' | 'number';
  errors: { [key: string]: any };
  placeholder?: string;
  autoComplete?: 'on' | 'off';
  required?: boolean;
  defaultValue?: string;
  pattern?: string;
  disabled?: boolean;
  labelHelp?: React.ReactNode;
}

const TextInput: React.FC<Props> = ({
  control,
  max,
  min,
  label = '',
  type,
  name,
  errors,
  pattern,
  placeholder = '',
  defaultValue,
  autoComplete,
  required,
  labelHelp,
  disabled,
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        {label ? (
          <Label htmlFor={name} className="mb-2 block text-sm font-bold">
            {label}
          </Label>
        ) : null}
        {labelHelp}
      </div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { ref, ...field } }) => (
          <>
            <Input
              className={`${errors?.[name]?.message ? 'border-red-500' : ''}`}
              type={type}
              id={name}
              pattern={pattern}
              required={required}
              placeholder={placeholder}
              autoComplete={autoComplete}
              min={min}
              max={max}
              disabled={disabled}
              {...field}
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

export { TextInput };
