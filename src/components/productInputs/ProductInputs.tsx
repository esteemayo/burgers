import Input from '../input/Input';
import Textarea from '../textarea/Textarea';

import { ProductInputsProps } from '@/types';

import './ProductInputs.scss';

const ProductInputs = ({
  name,
  desc,
  price,
  errors,
  onChange,
}: ProductInputsProps) => {
  return (
    <div className='productInputs'>
      <Input
        name='name'
        label='Product name'
        value={name}
        placeholder='Product name'
        onChange={onChange}
        error={errors?.name}
      />
      <Textarea
        name='desc'
        label='Description'
        value={desc}
        placeholder='Description'
        onChange={onChange}
        error={errors?.desc}
      />
      <Input
        name='price'
        type='number'
        label='Price'
        value={price}
        min={1}
        placeholder='Price'
        onChange={onChange}
        error={errors?.price}
        formatPrice
      />
    </div>
  );
};

export default ProductInputs;
