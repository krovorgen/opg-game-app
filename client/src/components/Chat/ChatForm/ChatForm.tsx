import React, { ChangeEvent, memo, SyntheticEvent, useCallback, useState } from 'react';
import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';

import { UserType } from '../../../api/auth';
import { MessageType } from '../Chat';

import styles from '../Chat.module.scss';

type ChatFormProps = {
  socket: WebSocket;
  currentUser: UserType;
};

export const ChatForm = memo(({ socket, currentUser }: ChatFormProps) => {
  const [inputValue, setInputValue] = useState('');

  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }, []);
  const sendMessage = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { message } = e.currentTarget.elements as typeof e.currentTarget.elements & {
        message: { value: string };
      };
      const newMessage: MessageType = {
        event: 'message',
        date: new Date(),
        nickname: currentUser.nickname,
        message: message.value,
        role: currentUser.role,
      };
      socket.send(JSON.stringify(newMessage));
      setInputValue('');
    },
    [currentUser, socket],
  );

  return (
    <form className={styles.controls} onSubmit={sendMessage}>
      <Input
        placeholder="Введите сообщение..."
        name="message"
        value={inputValue}
        onChange={onChangeInput}
        size="s"
        block
        required
      />
      <Button size="s" view="primary" type="submit">
        Отправить
      </Button>
    </form>
  );
});
