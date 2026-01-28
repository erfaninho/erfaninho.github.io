import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { createElement, useLayoutEffect, useRef, useState } from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
  className?: string;
  threshold?: number;
  requireScroll?: boolean;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function Reveal<T extends ElementType = "div">({
  as,
  className,
  threshold = 0.18,
  children,
  requireScroll = false,
  ...rest
}: RevealProps<T>) {
  const tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let hasScrolled = false;
    let seen = false;
    let done = false;

    const inView = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    if (!requireScroll && inView()) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (requireScroll && !hasScrolled) {
            seen = true;
            continue;
          }
          done = true;
          setVisible(true);
          observer.disconnect();
          return;
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    const onFirstScroll = () => {
      hasScrolled = true;
      if (!done && (seen || inView())) {
        done = true;
        setVisible(true);
        observer.disconnect();
      }
      window.removeEventListener("scroll", onFirstScroll);
      window.removeEventListener("wheel", onFirstScroll);
      window.removeEventListener("touchmove", onFirstScroll);
      window.removeEventListener("keydown", onFirstScroll);
    };

    if (requireScroll) {
      window.addEventListener("scroll", onFirstScroll, { passive: true });
      window.addEventListener("wheel", onFirstScroll, { passive: true });
      window.addEventListener("touchmove", onFirstScroll, { passive: true });
      window.addEventListener("keydown", onFirstScroll);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onFirstScroll);
      window.removeEventListener("wheel", onFirstScroll);
      window.removeEventListener("touchmove", onFirstScroll);
      window.removeEventListener("keydown", onFirstScroll);
    };
  }, [requireScroll, threshold]);

  const classes = ["reveal", visible ? "isVisible" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return createElement(tag, { ...rest, ref, className: classes } as any, children);
}
