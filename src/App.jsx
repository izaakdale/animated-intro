import ReactLogo from './assets/react.svg';

import { useEffect, useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenis = new Lenis();

  lenis.on('scroll', (e) => {
    console.log(e);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  const comp = useRef(null);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();

      t1.from('#intro-slider', {
        xPercent: '-100',
        duration: 1.3,
        delay: 0.3,
      })
        .from(['#title-1', '#title-2', '#title-3'], {
          opacity: 0,
          y: -30,
          stagger: 0.3,
        })
        .to(['#title-1', '#title-2', '#title-3'], {
          opacity: 0,
          y: -30,
          stagger: 0.3,
          delay: 0.3,
        })
        .to('#intro-slider', {
          xPercent: '-100',
          duration: 1.3,
          delay: 0.3,
        })
        .from('#welcome', {
          opacity: 0,
          duration: 1,
        });
    }, comp);

    return () => ctx.revert();
  }, []);

  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const imgEl = imgRef.current;
    gsap.fromTo(
      imgEl,
      { xPercent: '-150', opacity: 0, rotate: 0 },
      {
        xPercent: '0',
        duration: 3,
        opacity: 1,
        rotate: 360,
        scrollTrigger: {
          trigger: imgEl,
        },
      }
    );

    const textEl = textRef.current;

    let t2 = gsap.timeline({
      scrollTrigger: {
        trigger: textEl,
        start: '-100% 70%',
        end: '200% 70%',
        scrub: true,
        markers: false,
      },
    });

    t2.fromTo(textEl, { x: -400 }, { x: 400 });
  }, []);

  return (
    <div className='relative' ref={comp}>
      <div
        id='intro-slider'
        className='h-screen w-full flex flex-col p-10 bg-gray-100 absolute top-0 left-0 font-spaceGrotesk text-9xl text-gray-950 z-10 gap-10 tracking-tight'
      >
        <h1 id='title-1'>Software Engineer</h1>
        <h1 id='title-2'>Designer</h1>
        <h1 id='title-3'>Freelancer</h1>
      </div>
      <div className='h-screen flex bg-gray-950 justify-center place-items-center'>
        <h1
          id='welcome'
          className='text-9xl font-bold text-gray-100 font-spaceGrotesk'
        >
          Welcome.
        </h1>
      </div>
      <div className='h-screen flex bg-gray-950 justify-center place-items-center'>
        <img src={ReactLogo} alt='' className='h-36' ref={imgRef} />
      </div>
      <div className='h-screen flex bg-gray-950 justify-center place-items-center'>
        <p className='text-5xl' ref={textRef}>
          Hello, my name is Izaak
        </p>
      </div>
    </div>
  );
}

export default App;
