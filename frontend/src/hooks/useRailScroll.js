import { useCallback, useEffect, useRef, useState } from 'react';

const DRAG_THRESHOLD = 8;

export function useRailScroll(itemCount = 0) {
  const scrollRef = useRef(null);

  const isPointerDownRef = useRef(false);
  const isRealDraggingRef = useRef(false);
  const wasDraggedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const capturedPointerIdRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    const current = Math.max(0, el.scrollLeft);
    const epsilon = 4;

    setCanScrollLeft(current > epsilon);
    setCanScrollRight(current < maxScrollLeft - epsilon);
  }, []);

  const scrollByPage = useCallback(
    (direction) => {
      const el = scrollRef.current;
      if (!el) return;

      const amount = Math.max(260, el.clientWidth * 0.82);

      el.scrollBy({
        left: direction === 'next' ? amount : -amount,
        behavior: 'smooth',
      });

      window.requestAnimationFrame(updateScrollState);
      window.setTimeout(updateScrollState, 250);
      window.setTimeout(updateScrollState, 500);
    },
    [updateScrollState]
  );

  const scrollPrev = useCallback(() => {
    scrollByPage('prev');
  }, [scrollByPage]);

  const scrollNext = useCallback(() => {
    scrollByPage('next');
  }, [scrollByPage]);

  const clearDrag = useCallback(
    (event) => {
      const el = scrollRef.current;

      isPointerDownRef.current = false;
      isRealDraggingRef.current = false;

      if (el) {
        el.classList.remove('is-dragging-ready');
        el.classList.remove('is-dragging');

        const pointerId = event?.pointerId ?? capturedPointerIdRef.current;

        if (pointerId !== null && pointerId !== undefined) {
          try {
            if (el.hasPointerCapture?.(pointerId)) {
              el.releasePointerCapture(pointerId);
            }
          } catch {
            // ignore
          }
        }
      }

      capturedPointerIdRef.current = null;
      updateScrollState();
    },
    [updateScrollState]
  );

  const onPointerDown = useCallback((event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    const el = scrollRef.current;
    if (!el) return;

    isPointerDownRef.current = true;
    isRealDraggingRef.current = false;
    wasDraggedRef.current = false;

    startXRef.current = event.clientX;
    startScrollLeftRef.current = el.scrollLeft;

    el.classList.add('is-dragging-ready');
  }, []);

  const onPointerMove = useCallback((event) => {
    const el = scrollRef.current;
    if (!el || !isPointerDownRef.current) return;

    const dx = event.clientX - startXRef.current;

    if (Math.abs(dx) < DRAG_THRESHOLD && !isRealDraggingRef.current) {
      return;
    }

    if (!isRealDraggingRef.current) {
      isRealDraggingRef.current = true;
      wasDraggedRef.current = true;

      el.classList.add('is-dragging');

      try {
        el.setPointerCapture?.(event.pointerId);
        capturedPointerIdRef.current = event.pointerId;
      } catch {
        // ignore
      }
    }

    el.scrollLeft = startScrollLeftRef.current - dx;
  }, []);

  const onClickCapture = useCallback((event) => {
    if (!wasDraggedRef.current) return;

    event.preventDefault();
    event.stopPropagation();

    window.setTimeout(() => {
      wasDraggedRef.current = false;
    }, 0);
  }, []);

  const onWheel = useCallback(
    (event) => {
      const el = scrollRef.current;
      if (!el) return;

      if (!event.shiftKey) return;

      event.preventDefault();
      el.scrollLeft += event.deltaY;

      window.requestAnimationFrame(updateScrollState);
    },
    [updateScrollState]
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;

    updateScrollState();

    const rafId = window.requestAnimationFrame(updateScrollState);
    const timeout300 = window.setTimeout(updateScrollState, 300);
    const timeout800 = window.setTimeout(updateScrollState, 800);
    const timeout1400 = window.setTimeout(updateScrollState, 1400);

    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    const handleImageLoad = () => {
      window.requestAnimationFrame(updateScrollState);
    };

    const imageNodes = Array.from(el.querySelectorAll('img'));
    imageNodes.forEach((img) => {
      img.addEventListener('load', handleImageLoad);
      img.addEventListener('error', handleImageLoad);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeout300);
      window.clearTimeout(timeout800);
      window.clearTimeout(timeout1400);

      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);

      imageNodes.forEach((img) => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, [updateScrollState, itemCount]);

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollPrev,
    scrollNext,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: clearDrag,
      onPointerCancel: clearDrag,
      onPointerLeave: clearDrag,
      onWheel,
    },
    onClickCapture,
  };
}
