import{r as e,j as p}from"./index-C2iQLIf2.js";function v({title:c,titleId:l,...r},u){return e.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:u,"aria-labelledby":l},r),c?e.createElement("title",{id:l},c):null,e.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m4.5 15.75 7.5-7.5 7.5 7.5"}))}const g=e.forwardRef(v),x=e.memo(()=>{const[c,l]=e.useState(!1),[r,u]=e.useState(!1),n=e.useRef(null),s=e.useRef(null),h=e.useCallback(()=>{const t=window.pageYOffset,o=t-0,a=600;let d=null;const m=f=>{d||(d=f);const w=Math.min((f-d)/a,1),b=1-Math.pow(1-w,3);window.scrollTo(0,t-o*b),w<1&&(s.current=requestAnimationFrame(m))};s.current&&cancelAnimationFrame(s.current),s.current=requestAnimationFrame(m)},[]);return e.useEffect(()=>{if(r)return;const t=()=>{u(!0),window.removeEventListener("scroll",t)},i=setTimeout(()=>{u(!0)},500);return window.addEventListener("scroll",t,{passive:!0,once:!0}),()=>{clearTimeout(i),window.removeEventListener("scroll",t)}},[r]),e.useEffect(()=>{if(!r)return;const t=()=>{n.current&&clearTimeout(n.current),n.current=setTimeout(()=>{const o=window.pageYOffset>300;l(a=>a!==o?o:a)},16)};let i=null;if("IntersectionObserver"in window){const o=document.createElement("div");return o.style.cssText=`
        position: absolute;
        top: 300px;
        height: 1px;
        width: 1px;
        pointer-events: none;
        opacity: 0;
      `,document.body.appendChild(o),i=new IntersectionObserver(([a])=>{l(!a.isIntersecting)},{threshold:0}),i.observe(o),()=>{i.disconnect(),document.body.contains(o)&&document.body.removeChild(o)}}else return window.addEventListener("scroll",t,{passive:!0}),t(),()=>{window.removeEventListener("scroll",t),n.current&&clearTimeout(n.current)}},[r]),e.useEffect(()=>()=>{s.current&&cancelAnimationFrame(s.current),n.current&&clearTimeout(n.current)},[]),!r||!c?null:p.jsx("button",{onClick:h,className:`
        fixed bottom-6 right-6 z-50
        bg-gradient-to-r from-blue-600 to-blue-700 
        hover:from-blue-700 hover:to-blue-800
        text-white
        w-12 h-12 sm:w-14 sm:h-14 
        rounded-full
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-in-out
        transform hover:scale-110 active:scale-95
        flex items-center justify-center
        border-2 border-blue-500/20
        backdrop-blur-sm
        sm:bottom-8 sm:right-8
        group
        focus:outline-none focus:ring-4 focus:ring-blue-300/50
        animate-fadeIn
        scroll-to-top-button
        smooth-transition
      `,"aria-label":"Voltar ao topo",title:"Voltar ao topo",children:p.jsx(g,{className:"w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:-translate-y-1"})})});x.displayName="OptimizedBackToTop";export{x as default};
