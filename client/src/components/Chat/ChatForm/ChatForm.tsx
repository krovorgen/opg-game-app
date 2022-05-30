import React, { ChangeEvent, memo, SyntheticEvent, useCallback, useState } from 'react';
import cn from 'classnames';
import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';
import Picker from 'emoji-picker-react';

import { useAppSelector } from '../../../redux/hooks';
import { MessageType } from '../Chat';

import styles from '../Chat.module.scss';
import { SvgSmile } from './Smile';

type ChatFormProps = {
  socket: WebSocket;
};

export const ChatForm = memo(({ socket }: ChatFormProps) => {
  const currentUser = useAppSelector((state) => state.auth.user!);

  const [inputValue, setInputValue] = useState('');
  const [isEmoji, setIsEmoji] = useState(false);

  const onEmojiClick = useCallback(
    (event: any, emojiObject: any) => {
      setInputValue(inputValue + emojiObject.emoji);
    },
    [inputValue],
  );
  const changeVisibleEmoji = useCallback(() => {
    setIsEmoji((v) => !v);
  }, []);
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
      };
      socket.send(JSON.stringify(newMessage));
      setInputValue('');
      setIsEmoji(false);
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
      <div className={styles.emoji}>
        <SvgSmile onClick={changeVisibleEmoji} />
        <div className={cn(styles.emojiWrap, { [styles.visible]: !isEmoji })}>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      </div>
      <Button size="s" view="primary" type="submit">
        Отправить
      </Button>
    </form>
  );
});
