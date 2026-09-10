/** Scroll-motion primitives for the premium site. Attaches to window for Babel scripts. */

const REDUCED = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Reveal-on-scroll. Uses IntersectionObserver where it reports, with a rect-based
   fallback on scroll/resize: an IO in a non-visible context (print, prerender,
   screenshot capture) never reports intersections and would leave content at
   opacity 0 forever. */
function useReveal() {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (REDUCED()) { setShown(true); return; }
    let done = false, raf = 0;
    const reveal = () => { if (!done) { done = true; setShown(true); cleanup(); } };
    const check = () => {
      raf = 0;
      if (!el.isConnected) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      if (r.top < vh * 0.94 && r.bottom > 0) reveal();
    };
    let last = 0, timer = 0;
    const onScroll = () => {
      const now = Date.now();
      if (now - last > 60) { last = now; check(); }
      else if (!timer) timer = setTimeout(() => { timer = 0; last = Date.now(); check(); }, 60);
    };
    const poll = setInterval(check, 250);
    let io = null;
    if (typeof IntersectionObserver === "function") {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) reveal(); },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      io.observe(el);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const t1 = setTimeout(check, 80), t2 = setTimeout(check, 700);
    function cleanup() {
      if (io) io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(timer); clearInterval(poll);
      if (raf) cancelAnimationFrame(raf);
    }
    return cleanup;
  }, []);
  return [ref, shown];
}

/** Plays a staged fade+rise on first paint. For above-the-fold intros. */
function Rise({ delay = 0, y = 18, blur = false, as = "div", style, children }) {
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    if (REDUCED()) { setShown(true); return; }
    // setTimeout, not rAF: a page opened in a background tab gets no frames and would stay blank.
    const t = setTimeout(() => setShown(true), 30);
    return () => clearTimeout(t);
  }, []);
  return React.createElement(as, {
    style: {
      opacity: shown ? 1 : 0,
      transform: shown ? "none" : `translate3d(0,${y}px,0)`,
      filter: blur && !shown ? "blur(6px)" : "none",
      transition: `opacity 1000ms var(--ease-out) ${delay}ms, transform 1000ms var(--ease-out) ${delay}ms, filter 1000ms var(--ease-out) ${delay}ms`,
      willChange: "opacity, transform", ...style
    }
  }, children);
}

/** Fades and rises its children once they enter the viewport. */
function Reveal({ delay = 0, y = 28, blur = true, as = "div", style, children }) {
  const [ref, shown] = useReveal();
  return React.createElement(as, {
    ref, style: {
      opacity: shown ? 1 : 0,
      transform: shown ? "none" : `translate3d(0,${y}px,0)`,
      filter: blur && !shown ? "blur(6px)" : "none",
      transition: `opacity 950ms var(--ease-out) ${delay}ms, transform 950ms var(--ease-out) ${delay}ms, filter 950ms var(--ease-out) ${delay}ms`,
      willChange: "opacity, transform", ...style
    }
  }, children);
}

/** Word-by-word rise, for one headline per page. */
function RevealWords({ text, delay = 0, onMount = false, stagger = 62, style }) {
  const [ref, seen] = useReveal();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    if (!onMount) return;
    if (REDUCED()) { setMounted(true); return; }
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, [onMount]);
  const shown = onMount ? mounted : seen;
  return (
    <span ref={ref} style={{display:'inline-block', ...style}}>
      {text.split(" ").map((w, i) => (
        <span key={i} style={{display:'inline-block', overflow:'hidden', verticalAlign:'top', paddingBottom:'.08em'}}>
          <span style={{
            display:'inline-block',
            transform: shown ? 'none' : 'translate3d(0,108%,0)',
            transition:`transform 1050ms var(--ease-out) ${delay + i * stagger}ms`
          }}>{w}&nbsp;</span>
        </span>
      ))}
    </span>
  );
}

/** Current scroll offset, throttled to rAF. */
function useScrollY(target) {
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    const node = target || window;
    let raf = 0;
    const read = () => { raf = 0; setY(node === window ? window.scrollY : node.scrollTop); };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    node.addEventListener("scroll", onScroll, { passive: true });
    read();
    return () => { node.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [target]);
  return y;
}

/** 0→1 progress of an element travelling through the viewport. For scroll-scrubbed scenes. */
function useScrollProgress() {
  const ref = React.useRef(null);
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      setP(Math.min(1, Math.max(0, -r.top / span)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    read();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return [ref, p];
}

/* Eased count-up driven by an interval, not rAF: a context that delivers no frames
   (background tab, print, capture) must still land on the real number — a stuck
   counter would advertise "€0". The value is also forced to the target on finish. */
function useCountUp(to, duration, run) {
  const [n, setN] = React.useState(null); // null until the first tick: never render a stale 0
  React.useEffect(() => {
    if (!run) return;
    if (REDUCED()) { setN(to); return; }
    const t0 = Date.now();
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - t0) / duration);
      setN(p >= 1 ? to : Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p >= 1) clearInterval(id);
    }, 32);
    const safety = setTimeout(() => { clearInterval(id); setN(to); }, duration + 400);
    return () => { clearInterval(id); clearTimeout(safety); };
  }, [run, to, duration]);
  return n;
}

/** Counts up to `to` when scrolled into view. */
function Counter({ to, suffix = "", duration = 1600, style }) {
  const [ref, shown] = useReveal();
  const n = useCountUp(to, duration, shown);
  return <span ref={ref} style={style}>{n === null ? to : n}{suffix}</span>;
}

/** Button wrapper that leans a few px toward the cursor. */
function Magnetic({ strength = 0.28, children, style }) {
  const ref = React.useRef(null);
  const [d, setD] = React.useState({ x: 0, y: 0 });
  const move = (e) => {
    if (REDUCED()) return;
    const r = ref.current.getBoundingClientRect();
    setD({ x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength });
  };
  return (
    <span ref={ref} onMouseMove={move} onMouseLeave={() => setD({ x: 0, y: 0 })}
      style={{display:'inline-flex',transform:`translate3d(${d.x}px,${d.y}px,0)`,
        transition:'transform 500ms var(--ease-out)', ...style}}>{children}</span>
  );
}

/** Very slight 3D lean on hover, with a moving specular sheen. */
function Tilt({ max = 6, children, style }) {
  const ref = React.useRef(null);
  const [t, setT] = React.useState(null);
  const move = (e) => {
    if (REDUCED()) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * max * 2, ry: (px - 0.5) * max * 2, gx: px * 100, gy: py * 100 });
  };
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={() => setT(null)}
      style={{position:'relative',height:'100%',perspective:900, ...style}}>
      <div style={{height:'100%',transformStyle:'preserve-3d',
        transform: t ? `rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateZ(0)` : 'none',
        transition:`transform ${t ? 220 : 700}ms var(--ease-out)`}}>
        {children}
        <span aria-hidden="true" style={{position:'absolute',inset:0,borderRadius:'var(--radius-card)',pointerEvents:'none',
          opacity: t ? 1 : 0, transition:'opacity 400ms var(--ease-standard)',
          background: t ? `radial-gradient(340px circle at ${t.gx}% ${t.gy}%, rgba(184,124,70,.13), transparent 65%)` : 'none'}}/>
      </div>
    </div>
  );
}

/** Seamless logo/word strip that drifts sideways forever. */
function Marquee({ items, speed = 46, height = 68, render }) {
  const row = [...items, ...items];
  return (
    <div style={{overflow:'hidden',maskImage:'linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)',WebkitMaskImage:'linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)'}}>
      <div className="ub-marquee" style={{display:'flex',alignItems:'center',gap:'clamp(40px,6vw,88px)',width:'max-content',animationDuration:speed+'s',height}}>
        {row.map((it, i) => <div key={i} style={{flex:'0 0 auto'}}>{render(it, i)}</div>)}
      </div>
    </div>
  );
}

/** Reveals each child in sequence. Pass plain children; no wrapper markup needed. */
function Stagger({ step = 90, delay = 0, y = 22, blur = true, style, children }) {
  const kids = React.Children.toArray(children);
  return (
    <React.Fragment>
      {kids.map((c, i) => <Reveal key={i} delay={delay + i * step} y={y} blur={blur} style={style}>{c}</Reveal>)}
    </React.Fragment>
  );
}

/** Hairline that draws itself out from the left when seen. */
function DrawRule({ width = 56, delay = 0, style }) {
  const [ref, shown] = useReveal();
  return <span ref={ref} style={{display:'block',height:1,background:'var(--gold-500)',width:shown?width:0,opacity:shown?1:0,
    transition:`width 900ms var(--ease-out) ${delay}ms, opacity 500ms var(--ease-out) ${delay}ms`, ...style}}/>;
}

/** Count-up that also formats a currency prefix, e.g. €1,450. */
function MoneyCounter({ to, prefix = '\u20ac', duration = 1100 }) {
  const [ref, shown] = useReveal();
  const v = useCountUp(to, duration, shown);
  return <span ref={ref}>{prefix}{(v === null ? to : v).toLocaleString('en-US')}</span>;
}

/** Reading-progress hairline pinned to the very top of the window. */
function ScrollBar() {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const read = () => { raf = 0; const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0); };
    const on = () => { if (!raf) raf = requestAnimationFrame(read); };
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    read();
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);
  return <div aria-hidden="true" style={{position:'fixed',top:0,left:0,right:0,height:2,zIndex:40,pointerEvents:'none'}}>
    <div style={{height:'100%',width:(p*100)+'%',background:'linear-gradient(90deg,var(--gold-700),var(--gold-300))',
      opacity:p>0.004?1:0,transition:'opacity 400ms var(--ease-standard)'}}/>
  </div>;
}

/** Shared inner-page hero. tone="ink" matches the home page's espresso band (informational
 *  pages); tone="moss" marks the two pages where you act (apply, book a call). */
function PageHero({ overline, title, lead, meta, children, tone = 'ink' }) {
  const y = useScrollY();
  const moss = tone === 'moss';
  const bg = moss
    ? 'linear-gradient(165deg,#3E4229 0%,#545839 58%,#5F6440 100%)'
    : 'var(--ink-900)';
  const glow = moss
    ? 'radial-gradient(46% 52% at 20% 26%,rgba(224,227,211,.16),transparent 64%),radial-gradient(40% 46% at 80% 66%,rgba(214,168,119,.20),transparent 66%)'
    : 'radial-gradient(42% 48% at 22% 30%,rgba(184,124,70,.26),transparent 64%),radial-gradient(38% 44% at 78% 64%,rgba(193,97,63,.20),transparent 66%)';
  const accent = moss ? 'var(--moss-100)' : 'var(--gold-300)';
  return (
    <div style={{position:'relative',overflow:'hidden',background:bg,color:'var(--cream-200)',
      borderBottom:'1px solid rgba(251,244,236,.14)',padding:'clamp(56px,8vw,104px) 0 clamp(44px,6vw,72px)'}}>
      <div aria-hidden="true" style={{position:'absolute',inset:'-24% -12%',background:glow,pointerEvents:'none',
        animation:'ub-aurora 26s var(--ease-in-out) infinite',transform:`translate3d(0,${y * 0.08}px,0)`}}/>
      <div aria-hidden="true" style={{position:'absolute',inset:0,opacity:.45,pointerEvents:'none',
        background:'radial-gradient(1px 1px at 14% 24%,rgba(251,244,236,.8),transparent 60%),radial-gradient(1px 1px at 72% 18%,rgba(251,244,236,.6),transparent 60%),radial-gradient(1.5px 1.5px at 58% 74%,rgba(251,244,236,.5),transparent 60%),radial-gradient(1px 1px at 88% 52%,rgba(251,244,236,.55),transparent 60%)'}}/>
      <div style={{position:'relative',maxWidth:'var(--content-max)',margin:'0 auto',padding:'0 var(--gutter-inline)'}}>
        {overline && <Rise delay={40}><div className="ub-overline" style={{color:accent}}>{overline}</div></Rise>}
        <DrawRule delay={220} style={{margin:'14px 0 18px',background:accent}}/>
        <h1 style={{fontSize:'var(--text-h1)',letterSpacing:'-.025em',margin:'0 0 var(--space-4)',maxWidth:'26ch',color:'var(--cream-100)'}}>
          <RevealWords text={title} onMount delay={160}/>
        </h1>
        {lead && <Rise delay={520}><p style={{fontSize:'var(--text-body-lg)',color:'var(--ink-100)',maxWidth:'58ch',margin:0,textWrap:'pretty'}}>{lead}</p></Rise>}
        {meta && <Rise delay={680}><div style={{display:'flex',gap:'var(--space-6)',flexWrap:'wrap',marginTop:'var(--space-6)',color:'var(--cream-200)'}}>{meta}</div></Rise>}
        {children && <Rise delay={760}><div style={{marginTop:'var(--space-8)'}}>{children}</div></Rise>}
      </div>
    </div>
  );
}

Object.assign(window, { useReveal, Reveal, Rise, RevealWords, useScrollY, useScrollProgress, Counter, useCountUp, MoneyCounter, Magnetic, Tilt, Marquee, Stagger, DrawRule, ScrollBar, PageHero });
