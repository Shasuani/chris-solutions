import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registered once here instead of repeatedly in every component.
gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Builds a component's entrance animations inside a gsap.context scoped to
 * `ref`, then reverts the whole context on unmount.
 *
 * Why useLayoutEffect: it runs after the DOM is committed but before the
 * browser paints, so the tween's from-state is applied without a visible
 * flash — and nothing is hidden by CSS, so a GSAP failure can never leave
 * content permanently invisible.
 *
 * Reverting the context also tears down every ScrollTrigger the component
 * created; StrictMode's double-invoked effects would otherwise stack
 * duplicate triggers on top of each other.
 */
export function useReveal(ref, build) {
  useLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    const ctx = gsap.context(build, ref);
    return () => ctx.revert();
    // `build` is defined inline per component and intentionally runs once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { gsap };
