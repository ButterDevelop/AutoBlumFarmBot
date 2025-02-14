import { useState, useEffect, useCallback, MutableRefObject } from 'react';
import throttle from 'lodash/throttle';

const timing = (1 / 60) * 1000;
const decay = (v: number) => -0.1 * ((1 / timing) ^ 4) + v;

interface ScrollBoxHook {
    isDragging: boolean;
}

function useScrollBox(scrollRef: MutableRefObject<HTMLDivElement | null>): ScrollBoxHook {
    const [clickStartY, setClickStartY] = useState<number>();
    const [scrollStartY, setScrollStartY] = useState<number>();
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [direction, setDirection] = useState<number>(0);
    const [momentum, setMomentum] = useState<number>(0);
    const [lastScrollY, setLastScrollY] = useState<number>(0);
    const [speed, setSpeed] = useState<number>(0);

    const handleLastScrollY = useCallback(
        throttle((screenY: number) => {
            setLastScrollY(screenY);
        }, timing),
        []
    );
    const handleMomentum = useCallback(
        throttle((nextMomentum: number) => {
            if (scrollRef.current) {
                setMomentum(nextMomentum);
                scrollRef.current.scrollTop = scrollRef.current.scrollTop + nextMomentum * timing * direction;
            }
        }, timing),
        [scrollRef, direction]
    );

    useEffect(() => {
        if (direction !== 0) {
            if (momentum > 0.1 && !isDragging) {
                handleMomentum(decay(momentum));
            } else if (isDragging) {
                setMomentum(speed);
            } else {
                setDirection(0);
            }
        }
    }, [momentum, isDragging, speed, direction, handleMomentum]);

    useEffect(() => {
        const handleDragStart = (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && e.target.tagName.toLowerCase() === 'button') {
                return;
            }
            setClickStartY(e.screenY);
            setScrollStartY(scrollRef.current!.scrollTop);
            setDirection(0);
        };
        const handleDragMove = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            if (clickStartY !== undefined && scrollStartY !== undefined) {
                const touchDelta = clickStartY - e.screenY;
                scrollRef.current!.scrollTop = scrollStartY + touchDelta;

                if (Math.abs(touchDelta) > 1) {
                    setIsDragging(true);
                    setDirection(touchDelta / Math.abs(touchDelta));
                    setSpeed(Math.abs((lastScrollY - e.screenY) / timing));
                    handleLastScrollY(e.screenY);
                }
            }
        };
        const handleDragEnd = () => {
            if (isDragging && clickStartY !== undefined) {
                setClickStartY(undefined);
                setScrollStartY(undefined);
                setIsDragging(false);
            }
        };

        const currentScrollRef = scrollRef.current;

        if (currentScrollRef) {
            currentScrollRef.addEventListener('mousedown', handleDragStart);
            document.addEventListener('mousemove', handleDragMove);
            document.addEventListener('mouseup', handleDragEnd);
            currentScrollRef.addEventListener('mouseleave', handleDragEnd);

            return () => {
                currentScrollRef.removeEventListener('mousedown', handleDragStart);
                document.removeEventListener('mousemove', handleDragMove);
                document.removeEventListener('mouseup', handleDragEnd);
                currentScrollRef.removeEventListener('mouseleave', handleDragEnd);
            };
        }
    }, [scrollRef, clickStartY, isDragging, scrollStartY, handleLastScrollY, lastScrollY]);

    return { isDragging };
}

export default useScrollBox;
