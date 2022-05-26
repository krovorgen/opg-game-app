import React, { memo, SyntheticEvent, useCallback } from 'react';
import cn from 'classnames';
import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';

import styles from './Chat.module.scss';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../redux/hooks';

type ChatProps = {
  addClass?: string;
};

export const Chat = memo(({ addClass }: ChatProps) => {
  const currentUser = useAppSelector((state) => state.auth.user!);
  const sendMessage = useCallback(async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { message } = e.currentTarget.elements as typeof e.currentTarget.elements & {
      message: { value: string };
    };
    toast(message.value, { position: 'top-right', autoClose: 5000 });
    message.value = '';
  }, []);
  return (
    <div className={cn(styles.root, addClass)}>
      <div className={styles.messages}>
        {Array(28)
          .fill(0)
          .map((_, index) => (
            <div key={index} className={styles.message}>
              {currentUser.nickname}: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
              accusantium adipisci alias aliquid animi asperiores, autem corporis culpa cupiditate
              dolorum, explicabo in ipsum qui rem rerum sunt tenetur ullam, voluptates?
            </div>
          ))}
      </div>
      <form className={styles.controls} onSubmit={sendMessage}>
        <Input placeholder="Введите сообщение..." name="message" size="s" block required />
        <Button size="s" view="primary">
          Отправить
        </Button>
      </form>
    </div>
  );
});
