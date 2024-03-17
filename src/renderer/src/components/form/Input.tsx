import { UseFormRegister, Path, type FieldValues, type IsAny, type DeepRequired, type GlobalError, type FieldErrorsImpl } from 'react-hook-form';
import { useAppSelector } from '../../store/hooks';

type FieldErrors<T extends FieldValues = FieldValues> = Partial<
  FieldValues extends IsAny<FieldValues>
    ? unknown
    : FieldErrorsImpl<DeepRequired<T>>
> & {
  root?: Record<string, GlobalError> & GlobalError;
};
type InputProps = {
  register: UseFormRegister<AppNetwork>;
  label: string;
  value: Path<AppNetwork>;
  type: string;
  errors: FieldErrors<AppNetwork>;
  autoFocus: boolean;
  required: boolean;
  placeholder?: string;
  hidden?: boolean;
};
const getPattern = (type: string): RegExp => {
  if (type === 'email') {
    return /\S+@\S+\.\S+/;
  } else if (type === 'tel') {
    return /^\d{11}$/;
  }
  return /\S+/;
};

const Input = ({
  register,
  errors,
  label,
  value,
  required,
  type,
  autoFocus,
  hidden,
}: InputProps): JSX.Element => {
  const { isDarkMode } = useAppSelector((state) => state.app);
  return (
    <div className={`relative z-0 w-full mb-5 group ${hidden ? 'hidden' : ''}`}>
      <input
        autoFocus={autoFocus}
        {...register(value, {
          required: required
            ? {
                value: true,
                message: `${label} is required`,
              }
            : undefined,
          min:
            type === 'number'
              ? { value: 1, message: `Invalid ${label}` }
              : undefined,
          pattern: {
            value: getPattern(type),
            message: `Invalid ${label}`,
          },
        })}
        type={type}
        className={`block py-2.5 px-0 w-full text-sm ${
          isDarkMode
            ? 'text-white focus:border-white border-gray-600'
            : 'text-blue-gray-700 focus:border-blue-gray-700'
        } bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 peer`}
        placeholder=' '
      />
      <label
        className={`peer-focus:font-medium absolute text-sm text-blue-200 ${
          isDarkMode ? 'text-white peer-focus:text-white' : 'text-gray-900'
        } duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
      >
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      {errors[value] && (
        <div className='text-red-500'>{errors[value]?.message}</div>
      )}
    </div>
  );
};

export default Input;
