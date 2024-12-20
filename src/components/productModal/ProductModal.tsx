'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useMemo, useState } from 'react';

import ProductImage from '../productImage/ProductImage';
import Modal from '../modal/Modal';
import ProductInputs from '../productInputs/ProductInputs';

import { useProductModal } from '@/hooks/useProductModal';
import { createProduct } from '@/services/productService';
import { validateProductInput } from '@/validations/product';

import { formatPrice } from '@/utils/formatPrice';
import { upload } from '@/utils/upload';
import { ProductData, ProductErrors } from '@/types';

const enum STEPS {
  INFO = 0,
  IMAGE = 1,
}

const initialState: ProductData = {
  name: '',
  desc: '',
  price: '',
};

const ProductModal = () => {
  const router = useRouter();

  const isOpen = useProductModal((store) => store.isOpen);
  const onClose = useProductModal((store) => store.onClose);

  const [file, setFile] = useState<File[]>();
  const [ingredient, setIngredient] = useState('');
  const [step, setStep] = useState(STEPS.INFO);
  const [isLoading, setIsLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ProductErrors>({});
  const [data, setData] = useState(initialState);
  const [ingredients, setIngredients] = useState<string[]>([]);

  const { rawPrice, formattedPrice } = formatPrice(data.price);

  const onPrev = useCallback(() => {
    setStep((value) => {
      return value - 1;
    });
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => {
      return value + 1;
    });
  }, []);

  const handleChange = useCallback(
    ({
      target: input,
    }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = input;

      setData((prev) => {
        return { ...prev, [name]: value };
      });
    },
    []
  );

  const handleAddIngredient = useCallback(
    ({ target: input }: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = input;

      if (ingredients.includes(value)) {
        return;
      }

      setIngredient(value);
    },
    [ingredients]
  );

  const handleIngredients = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      setLoading(true);

      setTimeout(() => {
        setIngredients((prev) => {
          return [...prev, ingredient];
        });

        setIngredient('');
        setLoading(false);
      }, 1000);
    },
    [ingredient]
  );

  const handleDelete = useCallback(
    (_e: React.MouseEvent<HTMLImageElement>, value: string) => {
      setIngredients((prev) => {
        return [...prev].filter((item) => item !== value);
      });
    },
    []
  );

  const handleClear = useCallback(() => {
    setIngredients([]);
    setData(initialState);
  }, []);

  const handleCreate = useCallback(
    async <T extends object>(product: T) => {
      setIsLoading(true);

      try {
        const { status } = await createProduct({ ...product });

        if (status === 201) {
          handleClear();
          setStep(STEPS.INFO);

          toast.success('Product created!');
          onClose();

          router.push('/products');
        }
      } catch (err: unknown) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    [handleClear, onClose, router]
  );

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.IMAGE) {
      return onNext();
    }

    const errors = validateProductInput(data, ingredients);
    if (Object.keys(errors).length > 0) return setErrors(errors);

    setErrors({});

    const selectedFile = file?.[0];
    const url = await upload(selectedFile);

    const newProduct = {
      ...data,
      price: rawPrice,
      ingredients,
      image: url,
    };

    await handleCreate({ ...newProduct });
  }, [data, file, handleCreate, ingredients, onNext, rawPrice, step]);

  const actionLabel = useMemo(() => {
    return step === STEPS.IMAGE ? 'Create' : 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    return step !== STEPS.INFO ? 'Back' : undefined;
  }, [step]);

  const secondaryAction = useMemo(() => {
    return step !== STEPS.INFO ? onPrev : undefined;
  }, [onPrev, step]);

  useEffect(() => {
    setTimeout(() => {
      if (Object.keys(errors).length > 0) {
        setErrors({});
      }
    }, 5000);
  }, [errors]);

  const { name, desc } = data;

  let bodyContent: JSX.Element | undefined;

  bodyContent = (
    <ProductInputs
      name={name}
      desc={desc}
      price={formattedPrice}
      errors={errors}
      onChange={handleChange}
    />
  );

  if (step === STEPS.IMAGE) {
    bodyContent = (
      <ProductImage
        ingredient={ingredient}
        ingredients={ingredients}
        loading={loading}
        error={errors.ingredients}
        onAdd={handleIngredients}
        onChange={handleAddIngredient}
        onDelete={handleDelete}
        onSelect={setFile}
      />
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      title='Create a new product'
      disabled={isLoading}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      onClose={onClose}
      onSubmit={onSubmit}
      secondaryAction={secondaryAction}
    />
  );
};

export default ProductModal;
