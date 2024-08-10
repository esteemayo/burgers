'use client';

import Input from '../input/Input';
import { RegisterLocationProps } from '@/types';

const RegisterLocation = ({
  street,
  city,
  state,
  errors,
  onChange,
}: RegisterLocationProps) => {
  return (
    <>
      <Input
        name='street'
        label='Street'
        value={street}
        placeholder='Enter your street'
        onChange={onChange}
        error={errors['street']}
      />
      <Input
        name='city'
        label='City'
        value={city}
        placeholder='Enter your city'
        onChange={onChange}
        error={errors['city']}
        autoFocus
      />
      <Input
        name='state'
        label='State'
        value={state}
        placeholder='Enter your state'
        onChange={onChange}
        error={errors['state']}
      />
    </>
  );
};

export default RegisterLocation;