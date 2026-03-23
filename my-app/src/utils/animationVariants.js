// utils/animationVariants.js

const VARIANTS = {
    fadeUp: (delay = 0) => ({
      hidden:   { opacity: 0, transform: "translateY(56px) scale(0.97)" },
      visible:  {
        opacity: 1, transform: "translateY(0px) scale(1)",
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                     transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      },
      exitDown: {
        opacity: 0, transform: "translateY(-48px) scale(0.96)",
        transition: `opacity 0.45s ease-in, transform 0.45s ease-in`,
      },
      exitUp:   {
        opacity: 0, transform: "translateY(56px) scale(0.97)",
        transition: `opacity 0.45s ease-in, transform 0.45s ease-in`,
      },
    }),
  
    fadeLeft: (delay = 0) => ({
      hidden:   { opacity: 0, transform: "translateX(-60px) skewX(4deg)" },
      visible:  {
        opacity: 1, transform: "translateX(0px) skewX(0deg)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                     transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      },
      exitDown: {
        opacity: 0, transform: "translateX(50px) skewX(-3deg)",
        transition: `opacity 0.4s ease-in, transform 0.4s ease-in`,
      },
      exitUp:   {
        opacity: 0, transform: "translateX(-60px) skewX(4deg)",
        transition: `opacity 0.4s ease-in, transform 0.4s ease-in`,
      },
    }),
  
    fadeRight: (delay = 0) => ({
      hidden:   { opacity: 0, transform: "translateX(60px) skewX(-4deg)" },
      visible:  {
        opacity: 1, transform: "translateX(0px) skewX(0deg)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                     transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      },
      exitDown: {
        opacity: 0, transform: "translateX(-50px) skewX(3deg)",
        transition: `opacity 0.4s ease-in, transform 0.4s ease-in`,
      },
      exitUp:   {
        opacity: 0, transform: "translateX(60px) skewX(-4deg)",
        transition: `opacity 0.4s ease-in, transform 0.4s ease-in`,
      },
    }),
  
    zoomSpin: (delay = 0) => ({
      hidden:   { opacity: 0, transform: "scale(0.82) rotate(-2deg)" },
      visible:  {
        opacity: 1, transform: "scale(1) rotate(0deg)",
        transition: `opacity 0.65s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms,
                     transform 0.65s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
      },
      exitDown: {
        opacity: 0, transform: "scale(0.88) rotate(2deg)",
        transition: `opacity 0.35s ease-in, transform 0.35s ease-in`,
      },
      exitUp:   {
        opacity: 0, transform: "scale(0.82) rotate(-2deg)",
        transition: `opacity 0.35s ease-in, transform 0.35s ease-in`,
      },
    }),
  
    flipY: (delay = 0) => ({
      hidden:   { opacity: 0, transform: "perspective(600px) rotateX(-30deg) translateY(30px)" },
      visible:  {
        opacity: 1, transform: "perspective(600px) rotateX(0deg) translateY(0px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                     transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      },
      exitDown: {
        opacity: 0, transform: "perspective(600px) rotateX(25deg) translateY(-24px)",
        transition: `opacity 0.4s ease-in, transform 0.4s ease-in`,
      },
      exitUp:   {
        opacity: 0, transform: "perspective(600px) rotateX(-30deg) translateY(30px)",
        transition: `opacity 0.4s ease-in, transform 0.4s ease-in`,
      },
    }),
  }
  
  export default VARIANTS