import { UseFormRegister, Path, type DeepRequired, type FieldErrorsImpl, type FieldValues, type GlobalError, type IsAny } from 'react-hook-form';
import { useAppSelector } from '../../store/hooks';
type FieldErrors<T extends FieldValues = FieldValues> = Partial<
  FieldValues extends IsAny<FieldValues>
    ? unknown
    : FieldErrorsImpl<DeepRequired<T>>
> & {
  root?: Record<string, GlobalError> & GlobalError;
};
interface SelectProps {
  register: UseFormRegister<AppNetwork>;
  label: string;
  value: Path<AppNetwork>;
  options: Option[];
  isChange: boolean;
  required: boolean;
  requiredMessage: string;
  errors: FieldErrors<AppNetwork>;

  onSelectChange: (selectedHostel: Option | undefined) => void;
}

const Select = ({
  register,
  isChange,
  onSelectChange,
  options,
  label,
  value,
  errors,
  required,
  requiredMessage,
}: SelectProps): JSX.Element => {
  const { isDarkMode } = useAppSelector((state) => state.app);
  return (
    <div className='relative z-0 w-full mb-5 group'>
      <label
        className={`block mb-2 text-sm ${
          isDarkMode ? 'text-white' : 'text-blue-gray-700'
        }`}
      >
        Select {label} {<span className='text-red-500'>*</span>}
      </label>
      <select
        {...register(value, {
          required: required
            ? {
                value: true,
                message: requiredMessage,
              }
            : undefined,
          onChange: isChange
            ? (event): void => {
                const selectedHostel = options.find(
                  (option) => option.id === event.target.value
                );
                onSelectChange(selectedHostel);
              }
            : undefined,
        })}
        className={`block py-2.5 px-1 w-full text-sm text-blue-gray-400 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer`}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {errors[value] && (
        <p className='text-red-500'>{errors[value]?.message}</p>
      )}
    </div>
  );
};

Select.displayName = 'Select';

export default Select;
