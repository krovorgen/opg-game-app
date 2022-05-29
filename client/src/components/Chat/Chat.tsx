import React, { ChangeEvent, memo, SyntheticEvent, useCallback, useState } from 'react';
import cn from 'classnames';
import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';
import Picker from 'emoji-picker-react';

import styles from './Chat.module.scss';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../redux/hooks';

type ChatProps = {
  addClass?: string;
};

export const Chat = memo(({ addClass }: ChatProps) => {
  const currentUser = useAppSelector((state) => state.auth.user!);

  const [inputValue, setInputValue] = useState('');
  const [isEmoji, setIsEmoji] = useState(false);

  const onEmojiClick = (event: any, emojiObject: any) => {
    setInputValue(inputValue + emojiObject.emoji);
  };

  const changeVisibleEmoji = useCallback(() => {
    setIsEmoji((v) => !v);
  }, []);

  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }, []);

  const sendMessage = useCallback(async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { message } = e.currentTarget.elements as typeof e.currentTarget.elements & {
      message: { value: string };
    };
    toast(message.value, { position: 'top-right', autoClose: 5000 });
    setInputValue('');
    setIsEmoji(false);
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
              dolorum, explicabo in ipsum qui rem rerum sunt tenetur ullam, voluptates?orem ipsum
              dolor sit amet, consectetur adipisicing elit. Ab accusantium adipisci alias aliquid
              animi asperiores, autem corporis culpa cupiditate dolorum, explicabo in ipsum qui rem
              rerum sunt tenetur ullam, voluptates?
            </div>
          ))}
      </div>
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
          <svg
            width="48"
            height="48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={changeVisibleEmoji}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32 26.667h2.667a10.666 10.666 0 1 1-21.334 0H16a8 8 0 0 0 16 0zM24 48a24 24 0 1 0 0-48 24 24 0 0 0 0 48zm0-2.667a21.333 21.333 0 1 0 0-42.666 21.333 21.333 0 0 0 0 42.666zm-8-24A2.667 2.667 0 1 0 16 16a2.667 2.667 0 0 0 0 5.333zm16 0A2.667 2.667 0 1 0 32 16a2.667 2.667 0 0 0 0 5.333z"
              fill="#000"
            />
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h48v48H0z" />
              </clipPath>
            </defs>
          </svg>
          <div className={cn(styles.emojiWrap, { [styles.visible]: !isEmoji })}>
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        </div>
        <Button size="s" view="primary" type="submit">
          Отправить
        </Button>
      </form>
    </div>
  );
});
