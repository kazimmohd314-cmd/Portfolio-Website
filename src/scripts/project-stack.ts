import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initProjectStack() {
  if (typeof window === 'undefined') return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  gsap.registerPlugin(ScrollTrigger);

  const cards = document.querySelectorAll<HTMLElement>('.project-card-sticky');
  if (cards.length <= 1) return;

  cards.forEach((card, index) => {
    // We animate all cards except the very last one as subsequent cards slide over
    if (index < cards.length - 1) {
      const nextCard = cards[index + 1];
      gsap.to(card, {
        scale: 0.95 - index * 0.02,
        opacity: 0.65,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: nextCard,
          start: 'top 85%',
          end: 'top 20%',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }
  });
}

