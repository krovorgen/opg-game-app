import React, { memo, useEffect, useState } from 'react';
import cn from 'classnames';
import dayjs from 'dayjs';
import { Loader } from '@alfalab/core-components/loader';

import { useAppSelector } from '../../redux/hooks';
import { ChatForm } from './ChatForm/ChatForm';
import { UserRoleType } from '../../api/auth';

import styles from './Chat.module.scss';

type ChatProps = {
  addClass?: string;
};

export type MessageType = {
  event: string;
  date: Date;
  nickname: string;
  message: string;
  role: UserRoleType;
};

const URL = 'ws://localhost:4300/chat';

export const Chat = memo(({ addClass }: ChatProps) => {
  const currentUser = useAppSelector((state) => state.auth.user!);

  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [ws, setWs] = useState(new WebSocket(URL));

  useEffect(() => {
    ws.onopen = () => {
      setConnected(true);
      ws.send(
        JSON.stringify({
          event: 'connection',
          date: new Date(),
          nickname: currentUser.nickname,
          role: currentUser.role,
          message: 'ПОДКЛЮЧИЛСЯ',
        }),
      );
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, ...message.messages]);
    };
    return () => {
      ws.onclose = () => setWs(new WebSocket(URL));
    };
  }, [currentUser, ws]);

  return (
    <div className={cn(styles.root, addClass)}>
      <div className={styles.messages}>
        {connected ? (
          messages.length !== 0 &&
          messages.map((item, index) => (
            <div key={index} className={styles.message}>
              {dayjs(item.date).format('HH:MM:ss')}{' '}
              <span
                className={cn(styles.nickname, {
                  [styles.moder]: item.role === 'MODERATOR',
                  [styles.admin]: item.role === 'ADMIN',
                })}>
                {item.nickname}
              </span>
              : {item.message}
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
      <ChatForm socket={ws} currentUser={currentUser} />
    </div>
  );
});
