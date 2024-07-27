'use client';
export type inputParamsType = {
  type?: 'text' | 'password' | 'email' | 'url';
  placeholder: string;
  onChange: (e: any) => void;
  label: string;
};
export const Input = ({
  type = 'text',
  placeholder,
  onChange,
  label,
}: inputParamsType) => {
  return (
    <div className={'flex flex-col'}>
      <label className={'ml-1 text-sm'}>* {label}</label>
      <input
        className={'border border-black px-4 py-2 rounded-md'}
        type={type}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e);
        }}
      />
    </div>
  );
};
