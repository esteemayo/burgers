import ReactSelect from 'react-select';

import './Select.scss';

const Select = () => {
  const options = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className='select'>
      <ReactSelect
        placeholder='Select your gender'
        isClearable
        options={options}
        formatOptionLabel={(option) => (
          <div className='selectOption'>
            <span>{option.label}</span>
          </div>
        )}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary: '#00000059',
            primary25: '#f7dbdb',
          },
        })}
      />
    </div>
  );
};

export default Select;
