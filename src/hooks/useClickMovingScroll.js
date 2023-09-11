import { useEffect } from 'react';

export const useClickMovingScroll = slider => {
  useEffect(() => {
    let isDown = false;
    let startX;
    let scrollLeft;
    let mouseCursor = {
      grab: 'grab',
      grabbing: 'grabbing',
    };

    const targetSlider = slider;
    if (!targetSlider) return;

    const handleMouseDown = event => {
      event.currentTarget.style.cursor = mouseCursor.grab;
      isDown = true;
      startX = event.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
    };

    const handleMouseUp = event => {
      event.currentTarget.style.cursor = mouseCursor.grab;
      isDown = false;
    };

    const handleMouseMove = event => {
      if (!isDown) return;
      event.preventDefault();
      event.currentTarget.style.cursor = mouseCursor.grabbing;
      const x = event.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // 페이지 이동 속도 조절
      slider.scrollLeft = scrollLeft - walk;
    };

    targetSlider.addEventListener('mousedown', handleMouseDown);
    targetSlider.addEventListener('mouseleave', handleMouseLeave);
    targetSlider.addEventListener('mouseup', handleMouseUp);
    targetSlider.addEventListener('mousemove', handleMouseMove);

    return () => {
      targetSlider.removeEventListener('mousedown', handleMouseDown);
      targetSlider.removeEventListener('mouseleave', handleMouseLeave);
      targetSlider.removeEventListener('mouseup', handleMouseUp);
      targetSlider.removeEventListener('mousemove', handleMouseMove);
    };
  }, [slider]);
};
