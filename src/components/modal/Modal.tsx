'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Spinner from '../spinner/Spinner';

import { ModalProps } from '@/types';

import './Modal.scss';

const Modal = ({
  isOpen,
  title,
  size = 'small',
  disabled,
  actionLabel,
  secondaryActionLabel,
  body,
  footer,
  onClose,
  onSubmit,
  secondaryAction,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const onCloseHandler = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains('modal')) {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onSubmit();
    },
    [disabled, onSubmit]
  );

  const handleSecondaryAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled || !secondaryAction) {
        return;
      }

      secondaryAction();
    },
    [disabled, secondaryAction]
  );

  const modalClasses = useMemo(() => {
    return showModal?.toString() === 'true' ? 'box active' : 'box';
  }, [showModal]);

  const actionLabelClasses = useMemo(() => {
    return !secondaryAction || !secondaryActionLabel
      ? size === 'small'
        ? 'btnPrimary'
        : 'btnPrimary full'
      : 'btnPrimary';
  }, [secondaryAction, secondaryActionLabel, size]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  if (!isOpen) {
    return;
  }

  return (
    <aside className='modal' onClick={onCloseHandler}>
      <div className={modalClasses}>
        <div className='wrapper'>
          <h1 className='modalHeading'>{title}</h1>
          <div className='modalBody'>{body}</div>
          <hr />
          <div className='modalFooter'>
            <div className='modalBtnWrap'>
              {secondaryActionLabel && secondaryAction && (
                <button
                  type='button'
                  disabled={!!disabled}
                  className='btnSecondary'
                  onClick={handleSecondaryAction}
                >
                  {secondaryActionLabel}
                </button>
              )}
              {actionLabel && (
                <button
                  type='button'
                  disabled={!!disabled}
                  className={actionLabelClasses}
                  onClick={handleSubmit}
                >
                  {!!disabled ? <Spinner /> : actionLabel}
                </button>
              )}
            </div>
            {footer}
          </div>
          <div className='modalCloseBtnWrap'>
            <button onClick={handleClose} type='button' className='closeBtn'>
              <Image
                src='/svg/x-mark.svg'
                width={25}
                height={25}
                alt='close icon'
              />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
