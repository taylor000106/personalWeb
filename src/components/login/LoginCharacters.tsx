"use client";

import { useCallback, useEffect, useRef } from "react";
import styles from "./login.module.css";

type LoginCharactersProps = {
  isTyping: boolean;
  passwordLen: number;
  showPassword: boolean;
  lookingAtEachOther: boolean;
};

export function LoginCharacters({
  isTyping,
  passwordLen,
  showPassword,
  lookingAtEachOther,
}: LoginCharactersProps) {
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const purpleEyesRef = useRef<HTMLDivElement>(null);
  const blackEyesRef = useRef<HTMLDivElement>(null);
  const orangeEyesRef = useRef<HTMLDivElement>(null);
  const yellowEyesRef = useRef<HTMLDivElement>(null);
  const yellowMouthRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const purpleBlinkRef = useRef(false);
  const blackBlinkRef = useRef(false);
  const purplePeekingRef = useRef(false);
  const stateRef = useRef({
    isTyping,
    passwordLen,
    showPassword,
    lookingAtEachOther,
  });

  useEffect(() => {
    stateRef.current = { isTyping, passwordLen, showPassword, lookingAtEachOther };
  }, [isTyping, passwordLen, showPassword, lookingAtEachOther]);

  const eyePupilOffset = useCallback(
    (el: HTMLElement, maxDist: number, forceX?: number, forceY?: number) => {
      if (forceX !== undefined && forceY !== undefined) {
        return { x: forceX, y: forceY };
      }
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mouseRef.current.x - cx;
      const dy = mouseRef.current.y - cy;
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist);
      const angle = Math.atan2(dy, dx);
      return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
    },
    [],
  );

  const calcPos = useCallback((el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 3;
    const dx = mouseRef.current.x - cx;
    const dy = mouseRef.current.y - cy;
    return {
      faceX: Math.max(-15, Math.min(15, dx / 20)),
      faceY: Math.max(-10, Math.min(10, dy / 30)),
      bodySkew: Math.max(-6, Math.min(6, -dx / 120)),
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener("mousemove", onMove);

    const scheduleBlink = (setter: (v: boolean) => void) => {
      const delay = Math.random() * 4000 + 3000;
      setTimeout(() => {
        setter(true);
        setTimeout(() => {
          setter(false);
          scheduleBlink(setter);
        }, 150);
      }, delay);
    };

    scheduleBlink((v) => {
      purpleBlinkRef.current = v;
    });
    scheduleBlink((v) => {
      blackBlinkRef.current = v;
    });

    let frameId = 0;

    const render = () => {
      const $purple = purpleRef.current;
      const $black = blackRef.current;
      const $orange = orangeRef.current;
      const $yellow = yellowRef.current;
      const $purpleEyes = purpleEyesRef.current;
      const $blackEyes = blackEyesRef.current;
      const $orangeEyes = orangeEyesRef.current;
      const $yellowEyes = yellowEyesRef.current;
      const $yellowMouth = yellowMouthRef.current;

      if (
        !$purple ||
        !$black ||
        !$orange ||
        !$yellow ||
        !$purpleEyes ||
        !$blackEyes ||
        !$orangeEyes ||
        !$yellowEyes ||
        !$yellowMouth
      ) {
        frameId = requestAnimationFrame(render);
        return;
      }

      const { isTyping: typing, passwordLen: pwLen, showPassword: showPw, lookingAtEachOther: looking } =
        stateRef.current;

      const pp = calcPos($purple);
      const bp = calcPos($black);
      const op = calcPos($orange);
      const yp = calcPos($yellow);
      const isHiding = pwLen > 0 && !showPw;
      const isShowingPw = pwLen > 0 && showPw;
      const purplePeeking = purplePeekingRef.current;

      if (isShowingPw) {
        $purple.style.transform = "skewX(0deg)";
        $purple.style.height = "400px";
      } else if (typing || isHiding) {
        $purple.style.transform = `skewX(${(pp.bodySkew || 0) - 12}deg) translateX(40px)`;
        $purple.style.height = "440px";
      } else {
        $purple.style.transform = `skewX(${pp.bodySkew || 0}deg)`;
        $purple.style.height = "400px";
      }

      const purpleEyeL = $purpleEyes.children[0] as HTMLElement;
      const purpleEyeR = $purpleEyes.children[1] as HTMLElement;
      purpleEyeL.style.height = purpleBlinkRef.current ? "2px" : "18px";
      purpleEyeR.style.height = purpleBlinkRef.current ? "2px" : "18px";

      let pfx: number | undefined;
      let pfy: number | undefined;
      if (isShowingPw) {
        $purpleEyes.style.left = "20px";
        $purpleEyes.style.top = "35px";
        pfx = purplePeeking ? 4 : -4;
        pfy = purplePeeking ? 5 : -4;
      } else if (looking) {
        $purpleEyes.style.left = "55px";
        $purpleEyes.style.top = "65px";
        pfx = 3;
        pfy = 4;
      } else {
        $purpleEyes.style.left = `${45 + pp.faceX}px`;
        $purpleEyes.style.top = `${40 + pp.faceY}px`;
      }

      [purpleEyeL, purpleEyeR].forEach((eye) => {
        const pupil = eye.querySelector(`.${styles.pupil}`) as HTMLElement | null;
        if (!pupil) return;
        const o = eyePupilOffset(eye, 5, pfx, pfy);
        pupil.style.transform = `translate(${o.x}px, ${o.y}px)`;
      });

      if (isShowingPw) {
        $black.style.transform = "skewX(0deg)";
      } else if (looking) {
        $black.style.transform = `skewX(${(bp.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`;
      } else if (typing || isHiding) {
        $black.style.transform = `skewX(${(bp.bodySkew || 0) * 1.5}deg)`;
      } else {
        $black.style.transform = `skewX(${bp.bodySkew || 0}deg)`;
      }

      const blackEyeL = $blackEyes.children[0] as HTMLElement;
      const blackEyeR = $blackEyes.children[1] as HTMLElement;
      blackEyeL.style.height = blackBlinkRef.current ? "2px" : "16px";
      blackEyeR.style.height = blackBlinkRef.current ? "2px" : "16px";

      let bfx: number | undefined;
      let bfy: number | undefined;
      if (isShowingPw) {
        $blackEyes.style.left = "10px";
        $blackEyes.style.top = "28px";
        bfx = -4;
        bfy = -4;
      } else if (looking) {
        $blackEyes.style.left = "32px";
        $blackEyes.style.top = "12px";
        bfx = 0;
        bfy = -4;
      } else {
        $blackEyes.style.left = `${26 + bp.faceX}px`;
        $blackEyes.style.top = `${32 + bp.faceY}px`;
      }

      [blackEyeL, blackEyeR].forEach((eye) => {
        const pupil = eye.querySelector(`.${styles.pupil}`) as HTMLElement | null;
        if (!pupil) return;
        const o = eyePupilOffset(eye, 4, bfx, bfy);
        pupil.style.transform = `translate(${o.x}px, ${o.y}px)`;
      });

      $orange.style.transform = isShowingPw ? "skewX(0deg)" : `skewX(${op.bodySkew || 0}deg)`;

      let ofx: number | undefined;
      let ofy: number | undefined;
      if (isShowingPw) {
        $orangeEyes.style.left = "50px";
        $orangeEyes.style.top = "85px";
        ofx = -5;
        ofy = -4;
      } else {
        $orangeEyes.style.left = `${82 + (op.faceX || 0)}px`;
        $orangeEyes.style.top = `${90 + (op.faceY || 0)}px`;
      }

      Array.from($orangeEyes.children).forEach((el) => {
        const o = eyePupilOffset(el as HTMLElement, 5, ofx, ofy);
        (el as HTMLElement).style.transform = `translate(${o.x}px, ${o.y}px)`;
      });

      $yellow.style.transform = isShowingPw ? "skewX(0deg)" : `skewX(${yp.bodySkew || 0}deg)`;

      let yfx: number | undefined;
      let yfy: number | undefined;
      if (isShowingPw) {
        $yellowEyes.style.left = "20px";
        $yellowEyes.style.top = "35px";
        $yellowMouth.style.left = "10px";
        $yellowMouth.style.top = "88px";
        yfx = -5;
        yfy = -4;
      } else {
        $yellowEyes.style.left = `${52 + (yp.faceX || 0)}px`;
        $yellowEyes.style.top = `${40 + (yp.faceY || 0)}px`;
        $yellowMouth.style.left = `${40 + (yp.faceX || 0)}px`;
        $yellowMouth.style.top = `${88 + (yp.faceY || 0)}px`;
      }

      Array.from($yellowEyes.children).forEach((el) => {
        const o = eyePupilOffset(el as HTMLElement, 5, yfx, yfy);
        (el as HTMLElement).style.transform = `translate(${o.x}px, ${o.y}px)`;
      });

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameId);
    };
  }, [calcPos, eyePupilOffset]);

  useEffect(() => {
    if (!(passwordLen > 0 && showPassword)) return;

    let cancelled = false;

    const schedulePeek = () => {
      if (cancelled) return;
      const delay = Math.random() * 3000 + 2000;
      setTimeout(() => {
        if (cancelled) return;
        const { passwordLen: len, showPassword: show } = stateRef.current;
        if (len > 0 && show) {
          purplePeekingRef.current = true;
          setTimeout(() => {
            purplePeekingRef.current = false;
            schedulePeek();
          }, 800);
        }
      }, delay);
    };

    schedulePeek();
    const interval = setInterval(() => {
      const { passwordLen: len, showPassword: show } = stateRef.current;
      if (len > 0 && show && !purplePeekingRef.current) schedulePeek();
    }, 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [passwordLen, showPassword]);

  return (
    <div className={styles.left}>
      <div className={styles.charactersWrap}>
        <div className={styles.characters}>
          <div ref={purpleRef} className={`${styles.char} ${styles.charPurple}`}>
            <div ref={purpleEyesRef} className={styles.eyesWrap}>
              <div className={styles.eyeball} style={{ width: 18, height: 18 }}>
                <div className={styles.pupil} style={{ width: 7, height: 7 }} />
              </div>
              <div className={styles.eyeball} style={{ width: 18, height: 18 }}>
                <div className={styles.pupil} style={{ width: 7, height: 7 }} />
              </div>
            </div>
          </div>
          <div ref={blackRef} className={`${styles.char} ${styles.charBlack}`}>
            <div ref={blackEyesRef} className={`${styles.eyesWrap} ${styles.eyesWrapTight}`}>
              <div className={styles.eyeball} style={{ width: 16, height: 16 }}>
                <div className={styles.pupil} style={{ width: 6, height: 6 }} />
              </div>
              <div className={styles.eyeball} style={{ width: 16, height: 16 }}>
                <div className={styles.pupil} style={{ width: 6, height: 6 }} />
              </div>
            </div>
          </div>
          <div ref={orangeRef} className={`${styles.char} ${styles.charOrange}`}>
            <div ref={orangeEyesRef} className={`${styles.eyesWrap} ${styles.eyesWrapFast}`}>
              <div className={styles.pupilOnly} style={{ width: 12, height: 12 }} />
              <div className={styles.pupilOnly} style={{ width: 12, height: 12 }} />
            </div>
          </div>
          <div ref={yellowRef} className={`${styles.char} ${styles.charYellow}`}>
            <div ref={yellowEyesRef} className={`${styles.eyesWrap} ${styles.eyesWrapTight} ${styles.eyesWrapFast}`}>
              <div className={styles.pupilOnly} style={{ width: 12, height: 12 }} />
              <div className={styles.pupilOnly} style={{ width: 12, height: 12 }} />
            </div>
            <div ref={yellowMouthRef} className={styles.mouth} />
          </div>
        </div>
      </div>
      <div className={styles.gridOverlay} />
      <div className={styles.blob1} />
      <div className={styles.blob2} />
    </div>
  );
}
