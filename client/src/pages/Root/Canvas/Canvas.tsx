import React, { CanvasHTMLAttributes, DetailedHTMLProps, FC, useEffect, useRef } from 'react';

import styles from './Canvas.module.scss';

export interface ICanvasProps
  extends DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {}

export const Canvas: FC<ICanvasProps> = ({ ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
  }, []);
  return <canvas className={styles.root} width="1920" ref={canvasRef} {...props} />;
};
