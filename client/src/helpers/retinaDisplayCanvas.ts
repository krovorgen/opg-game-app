export const retinaDisplay = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  if (window.devicePixelRatio > 1) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    canvas.width = canvasWidth * window.devicePixelRatio;
    canvas.height = canvasHeight * window.devicePixelRatio;
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';

    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
};
