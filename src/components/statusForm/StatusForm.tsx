'use client';

import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import Spinner from '../spinner/Spinner';

import { StatusFormProps } from '@/types';
import { updateOrder } from '@/services/orderService';

const StatusForm = ({ actionId, status }: StatusFormProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async ({
      actionId,
      status,
    }: {
      actionId: string;
      status: string;
    }) => {
      const { data } = await updateOrder(actionId, { status });
      return data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const statusLists = useMemo(
    () => ['not paid', 'preparing', 'on the way', 'delivered'],
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const input = form.elements[0] as HTMLInputElement;
      const status = input.value;

      if (input.value.length < 1) {
        toast.error('Status must not be empty');
        return;
      }

      if (!statusLists.includes(input.value)) {
        toast.error('Invalid order status entered');
        input.value = '';
        return;
      }

      setIsLoading(true);

      setTimeout(() => {
        mutate({ actionId, status });

        form.reset();
        toast.success('Status updated!');

        setIsLoading(false);
      }, 3000);
    },
    [actionId, mutate]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder={status} />
      <button type='submit' disabled={isLoading}>
        {isLoading ? (
          <Spinner size={15} />
        ) : (
          <Image src='/img/edit.png' width={20} height={20} alt='edit icon' />
        )}
      </button>
    </form>
  );
};

export default StatusForm;
