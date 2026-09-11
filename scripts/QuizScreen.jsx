const { Card, Button, Icon, Badge, Tag, Field, Input, Select, Checkbox, Toast } = window.UnibridgeNLDesignSystem_3cb2d1;
const { PageHero, Reveal, Rise, Tilt, Magnetic, Counter } = window;

/* ─────────────────────────────────────────────────────────────
   Fields, and the niches inside them. The quiz ranks fields on
   answer weights, then picks the niche whose profile matches the
   traits collected along the way (maths level, working mode,
   what the first job should do). Programmes are real Dutch ones.
   ───────────────────────────────────────────────────────────── */
const QFIELDS = {
  business: { name:"Business & Economics", icon:"briefcase",
    blurb:"Markets, organisations and money. The broadest English-taught offer in the country, and the easiest to enter with a Wiskunde A profile.",
    jobs:"Consulting · finance · marketing · supply chain",
    niches:[
      { key:"finance", name:"Finance & Investment", maths:"high", mode:["data","systems"], horizon:["salary","research"],
        why:"Quantitative, exam-heavy and the best-paid exit in Dutch business schools.",
        progs:[["BSc Econometrics & Operations Research","Erasmus University Rotterdam"],["MSc Finance","Tilburg University"],["BSc Economics & Business Economics","University of Amsterdam"]] },
      { key:"marketing", name:"Marketing & Consumer Behaviour", maths:"applied", mode:["people","ideas"], horizon:["creative","salary"],
        why:"Half psychology, half analytics, strong internship market in Amsterdam.",
        progs:[["MSc Marketing Management","Tilburg University"],["BSc Business Administration","Erasmus University Rotterdam"],["BSc Communication Science","University of Amsterdam"]] },
      { key:"supply", name:"Supply Chain & Logistics", maths:"applied", mode:["systems","materials"], horizon:["salary","impact"],
        why:"Rotterdam is Europe's port. This is the Dutch speciality nobody outside the country talks about.",
        progs:[["MSc Supply Chain Management","Erasmus University Rotterdam"],["BSc International Business","Maastricht University"],["MSc Operations Management","University of Groningen"]] },
      { key:"venture", name:"Entrepreneurship & Strategy", maths:"applied", mode:["people","ideas"], horizon:["own","impact"],
        why:"Built for people who want to run the thing, not join the graduate scheme.",
        progs:[["MSc Strategic Entrepreneurship","VU Amsterdam"],["BSc International Business Administration","Tilburg University"],["MSc Innovation Management","Utrecht University"]] }
    ] },
  tech: { name:"Computer Science & Data", icon:"cpu",
    blurb:"Software, algorithms and data. Almost every programme is in English and the Dutch job market absorbs graduates faster than it produces them.",
    jobs:"Software · data science · security · AI",
    niches:[
      { key:"ai", name:"Artificial Intelligence", maths:"high", mode:["data","ideas"], horizon:["research","salary"],
        why:"The Netherlands runs one of Europe's oldest dedicated AI bachelors, heavy on logic and statistics.",
        progs:[["BSc Artificial Intelligence","Radboud University"],["MSc Artificial Intelligence","University of Amsterdam"],["MSc Data Science & AI","Eindhoven University of Technology"]] },
      { key:"software", name:"Software Engineering", maths:"high", mode:["systems"], horizon:["salary","own"],
        why:"Build-first, thesis-second. The most direct route into a Dutch tech salary.",
        progs:[["BSc Computer Science & Engineering","TU Delft"],["BSc Technical Computer Science","University of Twente"],["MSc Software Technology","TU Delft"]] },
      { key:"security", name:"Cybersecurity", maths:"high", mode:["systems","data"], horizon:["impact","salary"],
        why:"Small intakes, government and banking demand, and almost no unemployment.",
        progs:[["MSc Cyber Security","TU Delft"],["BSc Computer Science","VU Amsterdam"],["MSc Computing Science (Cyber Security)","Radboud University"]] },
      { key:"datasci", name:"Data Science & Analytics", maths:"applied", mode:["data","people"], horizon:["salary","impact"],
        why:"The applied end: business questions answered with models rather than opinions.",
        progs:[["MSc Applied Data Science","Utrecht University"],["BSc Data Science & Society","Tilburg University"],["MSc Business Analytics","VU Amsterdam"]] }
    ] },
  engineering: { name:"Engineering & Built Environment", icon:"compass",
    blurb:"Making physical things work: water, energy, buildings, machines. Dutch engineering is a global export and admission is genuinely selective.",
    jobs:"Civil · mechanical · energy · architecture",
    niches:[
      { key:"water", name:"Civil & Water Engineering", maths:"high", mode:["materials","systems"], horizon:["impact","salary"],
        why:"Half this country is below sea level. Nobody teaches water management better.",
        progs:[["BSc Civil Engineering","TU Delft"],["MSc Water Management","TU Delft"],["BSc Civil Engineering","University of Twente"]] },
      { key:"mech", name:"Mechanical & Robotics", maths:"high", mode:["materials","systems"], horizon:["salary","research"],
        why:"Eindhoven sits inside the Brainport cluster, ASML, Philips, and a hundred suppliers.",
        progs:[["BSc Mechanical Engineering","Eindhoven University of Technology"],["MSc Robotics","TU Delft"],["BSc Mechanical Engineering","University of Twente"]] },
      { key:"energy", name:"Energy & Sustainable Systems", maths:"high", mode:["systems","data"], horizon:["impact","research"],
        why:"Offshore wind, grid storage and the hydrogen build-out are hiring now.",
        progs:[["MSc Sustainable Energy Technology","TU Delft"],["BSc Industrial Engineering","University of Twente"],["MSc Energy & Environmental Sciences","University of Groningen"]] },
      { key:"arch", name:"Architecture & Built Environment", maths:"applied", mode:["materials","images"], horizon:["creative","impact"],
        why:"Portfolio-led and studio-heavy. Dutch architecture practices are famous for a reason.",
        progs:[["BSc Architecture, Urbanism & Building Sciences","TU Delft"],["BSc Built Environment","Eindhoven University of Technology"],["MSc Urbanism","TU Delft"]] }
    ] },
  health: { name:"Health & Life Sciences", icon:"stethoscope",
    blurb:"Biology, medicine-adjacent research and public health. Competitive, lab-heavy and highly structured, with a numerus fixus on the popular ones.",
    jobs:"Biomedical research · public health · pharma",
    niches:[
      { key:"biomed", name:"Biomedical Sciences", maths:"applied", mode:["data","materials"], horizon:["research","impact"],
        why:"The research route into medicine-adjacent work without a Dutch medical licence.",
        progs:[["BSc Biomedical Sciences","Utrecht University"],["MSc Biomedical Sciences","Radboud University"],["BSc Medical Natural Sciences","VU Amsterdam"]] },
      { key:"publichealth", name:"Public & Global Health", maths:"applied", mode:["people","data"], horizon:["impact","research"],
        why:"Maastricht's problem-based learning is built for exactly this subject.",
        progs:[["BSc European Public Health","Maastricht University"],["MSc Global Health","Maastricht University"],["MSc Health Sciences","University of Twente"]] },
      { key:"pharma", name:"Pharmaceutical Sciences", maths:"high", mode:["materials","data"], horizon:["research","salary"],
        why:"Lab-first, and the Dutch pharma corridor around Leiden employs directly out of it.",
        progs:[["BSc Bio-Pharmaceutical Sciences","Leiden University"],["MSc Drug Discovery & Safety","VU Amsterdam"],["MSc Pharmaceutical Sciences","Utrecht University"]] },
      { key:"neuro", name:"Neuroscience & Cognition", maths:"applied", mode:["data","people"], horizon:["research","impact"],
        why:"Where psychology stops describing behaviour and starts measuring it.",
        progs:[["BSc Psychobiology","University of Amsterdam"],["MSc Cognitive Neuroscience","Radboud University"],["MSc Neuroscience","VU Amsterdam"]] }
    ] },
  creative: { name:"Creative, Media & Design", icon:"palette",
    blurb:"Media, communication and design. Portfolio counts as much as grades, and the applied universities here are the strongest route in.",
    jobs:"Product design · media · branding · UX",
    niches:[
      { key:"ux", name:"Digital Product & UX Design", maths:"applied", mode:["images","people"], horizon:["salary","creative"],
        why:"The most employable creative niche in the Randstad, and it pays like tech.",
        progs:[["BSc Communication & Multimedia Design","Amsterdam UAS (HvA)"],["MSc Human-Computer Interaction","Utrecht University"],["BSc Creative Technology","University of Twente"]] },
      { key:"media", name:"Media & Communication", maths:"low", mode:["people","ideas"], horizon:["creative","impact"],
        why:"Amsterdam is the European media capital: agencies, streamers, publishers.",
        progs:[["BSc Communication Science","University of Amsterdam"],["MSc Media Studies","Utrecht University"],["BSc International Communication","The Hague UAS"]] },
      { key:"brand", name:"Branding & Visual Design", maths:"low", mode:["images"], horizon:["creative","own"],
        why:"Studio-based and portfolio-assessed. Rotterdam's art school is the anchor.",
        progs:[["BDes Graphic Design","Willem de Kooning (Rotterdam)"],["BDes Communication & Multimedia Design","Rotterdam UAS"],["MA Design","Utrecht UAS"]] },
      { key:"game", name:"Game & Interaction Design", maths:"applied", mode:["images","systems"], horizon:["creative","own"],
        why:"A real Dutch cluster, Breda and Utrecht supply studios across Europe.",
        progs:[["BSc Creative Media & Game Technologies","Breda UAS"],["BSc Game Design & Development","Utrecht UAS"],["MSc Game & Media Technology","Utrecht University"]] }
    ] },
  social: { name:"Social Sciences & Law", icon:"scale",
    blurb:"People, institutions and rules. The Hague makes international law and policy a genuine Dutch speciality rather than a generic offer.",
    jobs:"Policy · international law · psychology · NGOs",
    niches:[
      { key:"intlaw", name:"International & European Law", maths:"low", mode:["ideas","people"], horizon:["impact","salary"],
        why:"Leiden in The Hague is the address for this subject in Europe.",
        progs:[["LLB International Law","Leiden University"],["LLM Public International Law","Leiden University"],["LLB Global Law","Tilburg University"]] },
      { key:"policy", name:"Political Science & Public Policy", maths:"applied", mode:["ideas","data"], horizon:["impact"],
        why:"Institutions, elections and the machinery behind them, with real EU proximity.",
        progs:[["BSc Political Science","University of Amsterdam"],["MSc Public Administration","Leiden University"],["BSc European Studies","Maastricht University"]] },
      { key:"psych", name:"Psychology", maths:"applied", mode:["people","data"], horizon:["impact","research"],
        why:"Statistics-heavy in the Dutch system, much less soft than students expect.",
        progs:[["BSc Psychology","University of Groningen"],["MSc Clinical Psychology","Leiden University"],["BSc Psychology","Radboud University"]] },
      { key:"ir", name:"International Relations", maths:"low", mode:["ideas","people"], horizon:["impact","creative"],
        why:"Diplomacy, security and development, taught inside the city that hosts the courts.",
        progs:[["BA International Relations & Organisations","Leiden University"],["BSc International Studies","Leiden University"],["MSc International Relations","University of Groningen"]] }
    ] },
  planet: { name:"Environment, Food & Planning", icon:"leaf",
    blurb:"Food systems, climate, agriculture and the way land gets used. Wageningen is ranked first in the world for this subject area.",
    jobs:"Sustainability · agri-food · climate policy",
    niches:[
      { key:"foodtech", name:"Food Technology", maths:"high", mode:["materials","data"], horizon:["salary","impact"],
        why:"The Netherlands is the world's second-largest food exporter on a country the size of a city.",
        progs:[["BSc Food Technology","Wageningen University"],["MSc Food Safety","Wageningen University"],["BSc Nutrition & Health","Wageningen University"]] },
      { key:"climate", name:"Climate & Environmental Science", maths:"high", mode:["data","systems"], horizon:["impact","research"],
        why:"Measurement-driven, model-heavy, and directly connected to Dutch delta policy.",
        progs:[["BSc Earth Sciences","Utrecht University"],["MSc Climate Studies","Wageningen University"],["MSc Environmental & Infrastructure Planning","University of Groningen"]] },
      { key:"agri", name:"Agri-business & Food Economics", maths:"applied", mode:["systems","people"], horizon:["salary","own"],
        why:"Where the greenhouse sector meets the trading floor.",
        progs:[["BSc Management & Consumer Studies","Wageningen University"],["MSc Management, Economics & Consumer Studies","Wageningen University"],["BSc International Food & Agribusiness","HAS Green Academy"]] },
      { key:"urban", name:"Urban & Regional Planning", maths:"applied", mode:["ideas","materials"], horizon:["impact","creative"],
        why:"Dutch spatial planning is studied worldwide, you'd be learning it at the source.",
        progs:[["BSc Spatial Planning & Design","University of Groningen"],["MSc Urban Environmental Management","Wageningen University"],["MSc Urbanism","TU Delft"]] }
    ] },
  hospitality: { name:"Hospitality, Tourism & Events", icon:"map-pin",
    blurb:"Service businesses run at scale. Dutch hotel schools are the oldest in the world and place graduates into management, not front desks.",
    jobs:"Hotel management · events · travel tech · F&B",
    niches:[
      { key:"hotel", name:"Hotel & Hospitality Management", maths:"applied", mode:["people","systems"], horizon:["salary","own"],
        why:"Placement-heavy degrees with an international management track built in.",
        progs:[["BBA Hospitality Management","Hotelschool The Hague"],["BBA International Hospitality Management","Saxion UAS"],["MSc Tourism, Society & Environment","Wageningen University"]] },
      { key:"events", name:"Events & Experience Design", maths:"low", mode:["people","images"], horizon:["creative","own"],
        why:"A live-projects degree: you run real events before you graduate.",
        progs:[["BBA Leisure & Events Management","Breda UAS"],["BBA Creative Business","Inholland UAS"],["BBA Tourism Management","Breda UAS"]] },
      { key:"travel", name:"Tourism Analytics & Destination Strategy", maths:"applied", mode:["data","people"], horizon:["impact","salary"],
        why:"Overtourism turned this into a data problem, and the Dutch are hiring for it.",
        progs:[["MSc Tourism, Society & Environment","Wageningen University"],["BBA Tourism Management","Breda UAS"],["MSc Cultural Geography","University of Groningen"]] }
    ] }
};

/* Each answer carries field weights and, optionally, one trait it sets. */
const QUIZ = [
  { q:"Where are you starting from?", note:"This decides whether we look at bachelor or master programmes.",
    a:[["I finish secondary school this year or next",{},["level","Bachelor"]],
       ["I already have a bachelor's degree",{},["level","Master"]],
       ["I'm mid-degree and thinking about transferring",{},["level","Transfer"]],
       ["Honestly not decided yet",{},["level","Undecided"]]] },
  { q:"Which subjects did you actually do well in, not the ones you were told to like?",
    a:[["Maths, physics, chemistry",{tech:2,engineering:3,planet:1}],
       ["Economics and business",{business:3,hospitality:1}],
       ["Biology and health",{health:3,planet:1}],
       ["History, languages, philosophy",{social:3,creative:1}],
       ["Art, design, media",{creative:3}],
       ["Computing and anything with data",{tech:3,business:1}]] },
  { q:"Be honest about maths, the Dutch entry bar is written in these exact terms.", note:"Wiskunde B is required for engineering and most CS programmes.",
    a:[["Wiskunde B level: calculus doesn't scare me",{tech:3,engineering:3},["maths","high"]],
       ["Wiskunde A level: statistics and models, applied",{business:3,planet:2,health:1},["maths","applied"]],
       ["I'd rather my maths arrived inside a research-methods course",{social:3,creative:1},["maths","low"]],
       ["I don't know which level my school gave me",{business:1,social:1},["maths","applied"]]] },
  { q:"A Dutch degree is one long project grind. Which project would you still be awake for at 2am?",
    a:[["Rebuilding a company's pricing model in a spreadsheet",{business:3}],
       ["Getting a recommender system to stop suggesting rubbish",{tech:3}],
       ["Making a pumping station survive a 1-in-10,000-year flood",{engineering:3}],
       ["Tracing why one ward's readmission rate is double the rest",{health:3}],
       ["Designing the wayfinding for a station nobody can navigate",{creative:3}],
       ["Drafting the amendment behind a court ruling",{social:3}],
       ["Cutting a dairy farm's nitrogen output by a third",{planet:3}],
       ["Turning a 200-room hotel's worst month into its best",{hospitality:3}]] },
  { q:"What do you want to spend your working day around?",
    a:[["People: persuading, teaching, negotiating",{social:2,business:2,hospitality:2},["mode","people"]],
       ["Systems: things that must not fall over",{tech:2,engineering:2},["mode","systems"]],
       ["Data, the number behind the claim",{tech:2,health:1,business:1},["mode","data"]],
       ["Materials, something you can hold or stand on",{engineering:2,planet:1,health:1},["mode","materials"]],
       ["Ideas and arguments, written down, defended",{social:2,creative:1},["mode","ideas"]],
       ["Images and interfaces, how it looks and feels",{creative:3},["mode","images"]]] },
  { q:"Dutch degrees are graded heavily on group work. What's your role in the group?",
    a:[["I chase the deadline and present it",{business:3,hospitality:1}],
       ["I build the thing and let the demo talk",{tech:3,engineering:1}],
       ["I do the measurements nobody else wants to repeat",{health:3,planet:1}],
       ["I make it look like we knew what we were doing",{creative:3}],
       ["I write the argument and hold it up under questioning",{social:3}]] },
  { q:"Which first-year course would you take over an easy elective?",
    a:[["Econometrics",{business:3,tech:1}],
       ["Linear algebra & data structures",{tech:3}],
       ["Statics, fluids & thermodynamics",{engineering:3}],
       ["Human physiology with a cadaver lab",{health:3}],
       ["Studio: form, type & material",{creative:3}],
       ["Constitutional & EU law",{social:3}],
       ["Soil, water & food systems",{planet:3}],
       ["Revenue management & service operations",{hospitality:3}]] },
  { q:"Where would you rather spend your placement year?",
    a:[["A scale-up's growth team in Amsterdam",{business:3,tech:1},["setting","office"]],
       ["An engineering firm on a North Sea wind farm",{engineering:3,planet:1},["setting","field"]],
       ["A hospital research group in Utrecht",{health:3},["setting","lab"]],
       ["A design studio in Rotterdam",{creative:3},["setting","studio"]],
       ["A tribunal or NGO in The Hague",{social:3},["setting","office"]],
       ["A greenhouse-tech company in the Westland",{planet:3,engineering:1},["setting","field"]],
       ["A hotel group's operations office",{hospitality:3},["setting","office"]]] },
  { q:"Which failure would bother you most?",
    a:[["A forecast I signed off being badly wrong",{business:3,tech:1}],
       ["A system going down because I missed an edge case",{tech:3,engineering:1}],
       ["A result that doesn't replicate",{health:3,planet:1}],
       ["Work that's technically right and completely unreadable",{creative:3,social:1}],
       ["Being out-argued on something I actually believed",{social:3}],
       ["A guest experience falling apart on my shift",{hospitality:3}]] },
  { q:"Which sentence would you rather write on your CV in four years?",
    a:[["I can tell you what a business is worth and why",{business:3}],
       ["I ship systems other people depend on",{tech:3}],
       ["I built something you can stand on",{engineering:3}],
       ["I know why a treatment works, not just that it does",{health:3}],
       ["I make complicated things understandable",{creative:3,social:1}],
       ["I changed a rule that affected thousands of people",{social:3}],
       ["I made a food chain measurably less wasteful",{planet:3}],
       ["I ran a place people wanted to come back to",{hospitality:3}]] },
  { q:"What should the first job after graduating actually do for you?",
    a:[["Pay well, quickly",{business:1,tech:1},["horizon","salary"]],
       ["Leave something better than it found it",{social:1,planet:1},["horizon","impact"]],
       ["Let me keep researching",{health:1,tech:1},["horizon","research"]],
       ["Give me creative control",{creative:1},["horizon","creative"]],
       ["Teach me enough to start my own thing",{business:1,hospitality:1},["horizon","own"]]] },
  { q:"Last one, what can your family realistically plan for each year, tuition and living together?", note:"It changes which universities we shortlist, not whether you can go.",
    a:[["Under €18,000, we need the efficient route",{},["budget","lean"]],
       ["€18,000 – €25,000",{},["budget","mid"]],
       ["Over €25,000",{},["budget","open"]],
       ["We're applying for scholarships and don't know yet",{},["budget","unknown"]]] }
];

const ANALYSIS_STEPS = [
  ["file-check","Scoring your answers across eight subject areas"],
  ["search","Matching your maths profile to entry requirements"],
  ["graduation-cap","Filtering programmes taught in English"],
  ["map-pin","Checking intake, deadlines and city cost of living"],
  ["shield-check","Ranking the niches that fit your working style"]
];

const BUDGET_NOTE = {
  lean:"Applied-sciences universities (UAS) and the northern cities keep you inside this. We'd shortlist there first.",
  mid:"Comfortable at most research universities outside Amsterdam, including a room at market rate.",
  open:"Amsterdam, Delft and Utrecht are all realistic, including their more selective programmes.",
  unknown:"We'll map both a scholarship route and a self-funded one before you commit to anything."
};

function Ring({ p, size = 72 }) {
  const r = (size - 8) / 2, c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{transform:'rotate(-90deg)',flex:'0 0 auto'}} aria-hidden="true">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--cream-400)" strokeWidth="4"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--gold-500)" strokeWidth="4" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - p)} style={{transition:'stroke-dashoffset 640ms var(--ease-out)'}}/>
    </svg>
  );
}

/** Bachelor-level students shouldn't be shown an MSc at all: programmes are picked
    at the student's entry level, topping up from the next-ranked niches in the same
    field when one niche doesn't hold three at that level. */
const BACHELOR_RE = /^(BSc|BA|BBA|BDes|LLB)\b/;
const levelOf = (title) => BACHELOR_RE.test(title) ? "Bachelor" : "Master";
function pickProgs(niches, level) {
  const all = [];
  niches.forEach(([n]) => n.progs.forEach(([title,uni]) => all.push({ title, uni, niche:n })));
  if (level !== "Bachelor" && level !== "Master") return all.slice(0,3);
  const match = all.filter(p => levelOf(p.title) === level);
  return (match.length >= 3 ? match : match.concat(all.filter(p => levelOf(p.title) !== level))).slice(0,3);
}

/** Ranks a field's niches against the traits the quiz collected. */
function rankNiches(fieldKey, traits) {
  return QFIELDS[fieldKey].niches
    .map(n => {
      let s = 0;
      if (traits.maths && n.maths === traits.maths) s += 3;
      if (traits.maths === "high" && n.maths === "applied") s += 1;
      if (traits.mode && n.mode.includes(traits.mode)) s += 3;
      if (traits.horizon && n.horizon.includes(traits.horizon)) s += 2;
      if (traits.setting === "lab" && ["biomed","pharma","climate","foodtech"].includes(n.key)) s += 1;
      if (traits.setting === "studio" && ["brand","ux","arch","game"].includes(n.key)) s += 1;
      if (traits.setting === "field" && ["water","energy","agri","climate"].includes(n.key)) s += 1;
      return [n, s];
    })
    .sort((a,b) => b[1] - a[1]);
}

function EmailGate({ lead, setLead, onStart }) {
  const valid = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(lead.email.trim()) && lead.name.trim().length > 1;
  const set = (k,v) => setLead(l => ({...l, [k]:v}));
  return (
    <Reveal y={22} style={{flex:'3 1 min(100%,420px)',minWidth:0}}>
      <Card padding="var(--space-8)" style={{position:'relative',overflow:'hidden'}}>
        <div className="ub-aurora" aria-hidden="true" style={{position:'absolute',inset:'-40%',opacity:.45,pointerEvents:'none'}}/>
        <div style={{position:'relative'}}>
          <div className="ub-overline">Before we start</div>
          <h2 style={{fontSize:'clamp(24px,2.6vw,34px)',letterSpacing:'-.025em',margin:'var(--space-4) 0 var(--space-3)',maxWidth:'20ch'}}>Where should we send your result?</h2>
          <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)',maxWidth:'50ch',margin:'0 0 var(--space-6)',textWrap:'pretty'}}>
            Twelve questions, about four minutes. Your advisor reads the result before your call, so the first conversation starts from something real.
          </p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-4)'}}>
            <div style={{flex:'1 1 min(100%,220px)',minWidth:0}}>
              <Field label="First name" required>
                <Input value={lead.name} onChange={e=>set('name',e.target.value)} placeholder="Amara"/>
              </Field>
            </div>
            <div style={{flex:'1 1 min(100%,240px)',minWidth:0}}>
              <Field label="Email" required hint="Your result lands here the moment it's ready.">
                <Input type="email" value={lead.email} onChange={e=>set('email',e.target.value)} placeholder="you@example.com"/>
              </Field>
            </div>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-4)',marginTop:'var(--space-4)'}}>
            <div style={{flex:'1 1 min(100%,220px)',minWidth:0}}>
              <Field label="Where are you applying from?">
                <Input value={lead.country} onChange={e=>set('country',e.target.value)} placeholder="Nigeria"/>
              </Field>
            </div>
            <div style={{flex:'1 1 min(100%,240px)',minWidth:0}}>
              <Field label="When would you start?">
                <Select value={lead.intake} onChange={e=>set('intake',e.target.value)} options={["September 2027","February 2028","September 2028","Still deciding"]}/>
              </Field>
            </div>
          </div>
          <div style={{marginTop:'var(--space-5)'}}>
            <Checkbox checked={lead.consent} onChange={v=>set('consent',v)}
              label="Send me my result and the matching programmes"
              description="One email with your ranking. No newsletter, and you can ask us to delete it at any time."/>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'var(--space-4)',marginTop:'var(--space-6)'}}>
            <Magnetic strength={0.16}>
              <Button size="lg" disabled={!valid} onClick={onStart} iconRight={<Icon name="arrow-right" size={16}/>}>Start the assessment</Button>
            </Magnetic>
            <span style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>
              <Icon name="shield-check" size={16} color="var(--moss-500)"/>12 questions · about 4 minutes
            </span>
          </div>
        </div>
      </Card>
    </Reveal>
  );
}

function Analysing({ name, onDone }) {
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    if (step >= ANALYSIS_STEPS.length) { const t = window.setTimeout(onDone, 620); return () => window.clearTimeout(t); }
    const t = window.setTimeout(() => setStep(s => s + 1), step === 0 ? 620 : 760);
    return () => window.clearTimeout(t);
  }, [step]);
  const p = Math.min(1, step / ANALYSIS_STEPS.length);
  return (
    <div style={{flex:'3 1 min(100%,420px)',minWidth:0}}>
      <Card padding="var(--space-8)">
        <div style={{display:'flex',alignItems:'center',gap:'var(--space-5)',marginBottom:'var(--space-6)'}}>
          <Ring p={p}/>
          <div>
            <div className="ub-overline">Reading your answers</div>
            <h2 style={{fontSize:'clamp(20px,2.2vw,28px)',letterSpacing:'-.02em',margin:'6px 0 0'}}>Working out where you'd actually thrive{name ? ", " + name : ""}</h2>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
          {ANALYSIS_STEPS.map(([ic,label],n)=>{
            const state = n < step ? 'done' : n === step ? 'live' : 'idle';
            return (
              <div key={label} style={{display:'flex',alignItems:'center',gap:12,opacity:state==='idle'?.42:1,transition:'opacity 420ms var(--ease-standard)'}}>
                <span style={{display:'inline-flex',width:28,height:28,flex:'0 0 28px',borderRadius:'50%',alignItems:'center',justifyContent:'center',
                  background:state==='done'?'var(--surface-tertiary-soft)':state==='live'?'var(--surface-accent-soft)':'var(--surface-sunken)',
                  color:state==='done'?'var(--moss-700)':state==='live'?'var(--gold-700)':'var(--text-subtle)',
                  transition:'background-color 420ms var(--ease-standard)'}}>
                  <Icon name={state==='done'?'check':ic} size={14}/>
                </span>
                <span style={{fontSize:'var(--text-body-sm)',color:state==='idle'?'var(--text-subtle)':'var(--text-body)',fontWeight:state==='live'?700:400}}>{label}</span>
                {state==='live' && <span className="ub-pulse" style={{width:6,height:6,borderRadius:999,background:'var(--gold-500)',marginLeft:'auto'}}/>}
              </div>
            );
          })}
        </div>
        <div style={{height:6,borderRadius:6,background:'var(--surface-sunken)',overflow:'hidden',marginTop:'var(--space-8)'}}>
          <div style={{height:'100%',borderRadius:6,width:(p*100)+'%',background:'linear-gradient(90deg,var(--gold-700),var(--gold-300))',transition:'width 700ms var(--ease-out)'}}/>
        </div>
      </Card>
    </div>
  );
}

const WEB3FORMS_KEY = "a828545d-4f6f-4f85-8ddf-888a55281203";

/* Apps Script web app on unibridgenl@gmail.com. Emails the result to the student
   and copies the advisor. text/plain avoids a CORS preflight Apps Script cannot answer. */
const UB_ENDPOINT = "https://script.google.com/macros/s/AKfycbxXrbOgXwzirT8fnW_dlVDAXTd0jhAEzIVQAMjiYgNiD_Qp6B_AiIMTMiG-64AaRSjd/exec";
const UB_TOKEN = "ub-2026-9f3a71";

function QuizScreen({ go }) {
  const [stage, setStage] = React.useState("gate"); // gate → quiz → analysing → result
  const [lead, setLead] = React.useState({ name:"", email:"", country:"", intake:"September 2027", consent:true });
  const [i, setI] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [picked, setPicked] = React.useState(null);
  const [sent, setSent] = React.useState(false);

  /* Scores and traits are DERIVED from the answer map, never accumulated, so going
     Back and re-answering replaces that answer instead of scoring both. */
  const { scores, traits } = React.useMemo(() => {
    const sc = {}, tr = {};
    Object.keys(answers).map(Number).sort((a,b)=>a-b).forEach(qi => {
      const row = QUIZ[qi] && QUIZ[qi].a[answers[qi]];
      if (!row) return;
      const w = row[1] || {}, trait = row[2];
      for (const k in w) sc[k] = (sc[k]||0) + w[k];
      if (trait) tr[trait[0]] = trait[1];
    });
    return { scores: sc, traits: tr };
  }, [answers]);

  const lock = React.useRef(false);
  React.useEffect(() => { setPicked(answers[i] != null ? answers[i] : null); lock.current = false; }, [i]);

  const choose = (weights, trait, n) => {
    if (lock.current) return;
    lock.current = true;
    setPicked(n);
    setAnswers(a => ({...a, [i]: n}));
    window.setTimeout(() => {
      if (i + 1 >= QUIZ.length) setStage("analysing"); else setI(v => v + 1);
    }, 320);
  };

  const back = () => {
    if (i === 0) { setStage("gate"); return; }
    lock.current = false;
    setI(v => Math.max(0, v - 1));
  };

  const restart = () => {
    lock.current = false;
    setAnswers({}); setI(0); setPicked(null); setSent(false); setStage("quiz");
  };

  const ranked = Object.keys(QFIELDS).map(k => [k, scores[k]||0]).sort((a,b) => b[1]-a[1]);
  const topKey = ranked[0] ? ranked[0][0] : "business";
  const max = Math.max(1, ranked[0] ? ranked[0][1] : 1);
  const field = QFIELDS[topKey];
  const niches = stage === "result" ? rankNiches(topKey, traits) : [];
  const bestNiche = niches.length ? niches[0][0] : null;
  const level = traits.level === "Master" ? "Master" : traits.level === "Bachelor" ? "Bachelor" : "Bachelor or Master";

  const reasons = bestNiche ? [
    traits.maths === "high"
      ? ["sigma","Your maths profile clears the Wiskunde B bar, which opens the programmes most applicants are filtered out of."]
      : traits.maths === "applied"
        ? ["sigma","A Wiskunde A profile fits this route: statistics and applied models rather than pure calculus."]
        : ["sigma","We've kept you away from Wiskunde B programmes: nothing here will fail you on a maths requirement."],
    traits.mode === "people" ? ["users","You chose people over systems three times. This niche is client-facing rather than back-office."]
      : traits.mode === "data" ? ["chart","You keep reaching for the number behind the claim, so this niche is measurement-led."]
      : traits.mode === "images" ? ["palette","You pick the visual answer every time. This niche is assessed on portfolio as much as grades."]
      : traits.mode === "materials" ? ["compass","You want something physical at the end of it. This niche builds, tests and measures."]
      : traits.mode === "ideas" ? ["file-text","You'd rather write and defend an argument, so this niche is reading and reasoning heavy."]
      : ["cpu","You gravitate to systems that must not fall over, which is exactly what this niche trains."],
    ["briefcase", bestNiche.why]
  ] : [];

  const sendRef = React.useRef(false);
  React.useEffect(() => {
    if (stage !== "result" || !lead.consent || sendRef.current) return;
    if (!bestNiche) return;
    sendRef.current = true;
    const progs = (bestNiche.progs || []).map(([p,u]) => `${p}, ${u}`).join("\n");
    const body = `New Find my field result via unibridgenl.com

Name: ${lead.name}
Email: ${lead.email}
Country: ${lead.country || "Not provided"}
Intake: ${lead.intake}

Top field: ${field.name}
Best niche: ${bestNiche.name}
Suggested level: ${level}

Matching programmes:
${progs}`;
    fetch(UB_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        token: UB_TOKEN,
        type: "quiz",
        name: lead.name,
        email: lead.email,
        country: lead.country,
        intake: lead.intake,
        field: field.name,
        niche: bestNiche.name,
        level: level,
        why: bestNiche.why,
        programmes: (bestNiche.progs || []).map(([p,u]) => ({ name: p, university: u }))
      })
    }).then(r => r.json()).then(d => { if (d && d.ok) setSent(true); }).catch(() => {
      /* Endpoint down: fall back to the old advisor-only notification so the lead is never lost. */
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Find my field result: ${lead.name || "Website visitor"}`,
          from_name: lead.name || "UniBridge NL website",
          email: lead.email,
          message: body
        })
      }).catch(() => {});
    });
  }, [stage, bestNiche, lead, field, level]);

  return (
    <main style={{overflowX:'clip'}}>
      <PageHero overline="Find my field" tone="ink"
        title={stage === "result" ? "Your field, narrowed to a niche" : stage === "analysing" ? "Reading your answers" : stage === "quiz" ? "Twelve questions. One honest starting point." : "Find the field that fits you"}
        lead={stage === "result"
          ? "Eight subject areas, scored against your answers, then narrowed to the specific niche and the Dutch programmes that teach it in English."
          : stage === "analysing"
            ? "We're scoring eight subject areas, then checking your profile against real entry requirements."
            : "Tell us where to send the result, then answer twelve questions about how you actually work. You'll get a niche, not a vague category."}
        meta={[["clock","About 4 minutes"],["file-check","Emailed to you and your advisor"],["graduation-cap","16 partner universities"]].map(([ic,t])=>(
          <span key={t} style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:'var(--text-body-sm)'}}><Icon name={ic} size={16} color="var(--gold-300)"/>{t}</span>
        ))}/>

      <section style={{maxWidth:1080,margin:'0 auto',padding:'clamp(36px,5vw,72px) var(--gutter-inline) 0',display:'flex',flexWrap:'wrap',alignItems:'flex-start',gap:'clamp(24px,3vw,44px)'}}>

        {stage === "gate" && <EmailGate lead={lead} setLead={setLead} onStart={()=>setStage("quiz")}/>}

        {stage === "analysing" && <Analysing name={lead.name.trim()} onDone={()=>{ setStage("result"); }}/>}

        {stage === "quiz" && (
          <Reveal y={22} style={{flex:'3 1 min(100%,420px)',minWidth:0}}>
            <Card padding="var(--space-8)">
              <div style={{display:'flex',alignItems:'center',gap:'var(--space-5)',marginBottom:'var(--space-6)'}}>
                <Ring p={i / QUIZ.length}/>
                <div>
                  <div className="ub-overline">Question {i+1} of {QUIZ.length}</div>
                  <div style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',marginTop:4}}>Pick the answer that's closest, there are no wrong ones.</div>
                </div>
              </div>
              <div key={i} className="ub-page">
                <h2 style={{fontSize:'clamp(21px,2.3vw,30px)',letterSpacing:'-.02em',margin:'0 0 var(--space-3)',maxWidth:'28ch'}}>{QUIZ[i].q}</h2>
                {QUIZ[i].note && <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',margin:'0 0 var(--space-5)',maxWidth:'46ch'}}>{QUIZ[i].note}</p>}
                <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)',marginTop:QUIZ[i].note?0:'var(--space-6)'}}>
                  {QUIZ[i].a.map(([label,w,trait],n)=>{
                    const on = picked === n;
                    return (
                      <button key={label} onClick={()=>choose(w,trait,n)} style={{
                        textAlign:'left',cursor:'pointer',font:'500 16px/1.4 var(--font-sans)',
                        display:'flex',alignItems:'center',gap:14,padding:'15px 18px',
                        border:'1px solid '+(on?'var(--gold-500)':'var(--border-hairline)'),
                        background:on?'var(--surface-accent-soft)':'var(--surface-card)',
                        color:'var(--text-heading)',borderRadius:'var(--radius-md)',
                        animation:`ub-slot 420ms var(--ease-out) ${n*55}ms both`,
                        transition:'transform 260ms var(--ease-out), border-color 260ms var(--ease-standard), background-color 260ms var(--ease-standard), box-shadow 260ms var(--ease-standard)',
                        transform:on?'translateX(6px)':'none',
                        boxShadow:on?'0 12px 26px -16px rgba(46,21,4,.55)':'none'}}>
                        <span style={{display:'inline-flex',width:26,height:26,flex:'0 0 26px',borderRadius:'50%',alignItems:'center',justifyContent:'center',
                          border:'1px solid '+(on?'var(--gold-500)':'var(--border-default)'),background:on?'var(--gold-500)':'transparent',
                          color:on?'var(--text-on-accent)':'var(--text-muted)',font:'700 12px var(--font-sans)'}}>{on ? <Icon name="check" size={13}/> : String.fromCharCode(65+n)}</span>
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,marginTop:'var(--space-8)',borderTop:'1px solid var(--border-hairline)',paddingTop:'var(--space-4)'}}>
                <Button variant="ghost" onClick={back} iconLeft={<Icon name="arrow-left" size={16}/>}>Back</Button>
                <span style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)',textAlign:'right'}}>Result goes to {lead.email.trim() || "your inbox"}</span>
              </div>
            </Card>
          </Reveal>
        )}

        {stage === "result" && (
          <div style={{flex:'3 1 min(100%,420px)',minWidth:0,display:'flex',flexDirection:'column',gap:'var(--space-5)'}}>
            <Reveal y={24}>
              <Card padding="var(--space-8)" style={{position:'relative',overflow:'hidden'}}>
                <div className="ub-aurora" aria-hidden="true" style={{position:'absolute',inset:'-40%',opacity:.5,pointerEvents:'none'}}/>
                <div style={{position:'relative'}}>
                  <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:10,marginBottom:'var(--space-4)'}}>
                    <span className="ub-overline">Your strongest match</span>
                    <Badge tone="accent">{level} level</Badge>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:'var(--space-2)'}}>
                    <span style={{display:'inline-flex',width:54,height:54,flex:'0 0 54px',borderRadius:'var(--radius-md)',alignItems:'center',justifyContent:'center',background:'var(--surface-accent-soft)',color:'var(--gold-700)',animation:'ub-float 6s var(--ease-standard) infinite'}}><Icon name={field.icon} size={26}/></span>
                    <div>
                      <div style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',marginBottom:2}}>{field.name}</div>
                      <h2 style={{margin:0,fontSize:'clamp(23px,2.7vw,36px)',letterSpacing:'-.025em',lineHeight:1.1}}>{bestNiche.name}</h2>
                    </div>
                  </div>
                  <p style={{color:'var(--text-muted)',fontSize:'var(--text-body-lg)',margin:'var(--space-4) 0 var(--space-6)',maxWidth:'54ch',textWrap:'pretty'}}>{field.blurb}</p>
                  <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)',borderTop:'1px solid var(--border-hairline)',paddingTop:'var(--space-5)'}}>
                    <div className="ub-overline">Why this one</div>
                    {reasons.map(([ic,text])=>(
                      <div key={text} style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                        <span style={{display:'inline-flex',width:24,height:24,flex:'0 0 24px',marginTop:1,borderRadius:'50%',alignItems:'center',justifyContent:'center',background:'var(--surface-tertiary-soft)',color:'var(--moss-700)'}}><Icon name="check" size={12}/></span>
                        <span style={{fontSize:'var(--text-body-sm)',color:'var(--text-body)',lineHeight:1.6,textWrap:'pretty'}}>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={100} y={22}>
              <Card padding="var(--space-6)">
                <div className="ub-overline">Programmes that teach it, in English</div>
                <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',margin:'var(--space-3) 0 var(--space-5)',maxWidth:'50ch'}}>Shortlisted for {level.toLowerCase()} entry. Your advisor checks each one against your grades before you apply.</p>
                <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)'}}>
                  {pickProgs(niches, level).map((p,n)=>(
                    <div key={p.title} className="ub-liftrow" style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:12,padding:'14px 16px',border:'1px solid var(--border-hairline)',borderRadius:'var(--radius-md)',animation:`ub-row 520ms var(--ease-out) ${140+n*90}ms both`}}>
                      <span style={{display:'inline-flex',width:28,height:28,flex:'0 0 28px',borderRadius:'50%',alignItems:'center',justifyContent:'center',background:'var(--surface-accent-soft)',color:'var(--gold-700)',font:'700 12px var(--font-sans)'}}>{n+1}</span>
                      <span style={{flex:'1 1 220px',minWidth:0}}>
                        <span style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:8}}>
                          <span style={{fontSize:'var(--text-body-sm)',fontWeight:700,color:'var(--text-heading)'}}>{p.title}</span>
                          <Badge tone={levelOf(p.title) === level ? "success" : "neutral"}>{levelOf(p.title)}</Badge>
                        </span>
                        <span style={{display:'block',fontSize:'var(--text-caption)',color:'var(--text-muted)',marginTop:2}}>{p.uni}{p.niche.key !== bestNiche.key ? " · " + p.niche.name : ""}</span>
                      </span>
                      <Button size="sm" variant="secondary" onClick={()=>go('universities')}>See university</Button>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>

            <Reveal delay={150} y={22}>
              <Card padding="var(--space-6)">
                <div className="ub-overline">Also worth looking at</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))',gap:'var(--space-4)',marginTop:'var(--space-5)'}}>
                  {niches.slice(1,4).map(([n])=>(
                    <div key={n.key} style={{padding:'var(--space-5)',border:'1px solid var(--border-hairline)',borderRadius:'var(--radius-md)',background:'var(--surface-page)'}}>
                      <div style={{fontSize:'var(--text-body-sm)',fontWeight:700,color:'var(--text-heading)'}}>{n.name}</div>
                      <p style={{fontSize:'var(--text-caption)',color:'var(--text-muted)',lineHeight:1.55,margin:'6px 0 var(--space-3)'}}>{n.why}</p>
                      <div style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)'}}>{n.progs[0][1]}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>

            <Reveal delay={200} y={22}>
              <Card padding="var(--space-6)">
                <div className="ub-overline">How the eight subject areas scored</div>
                <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)',marginTop:'var(--space-5)'}}>
                  {ranked.slice(0,6).map(([k,v],n)=>(
                    <div key={k}>
                      <div style={{display:'flex',justifyContent:'space-between',gap:12,fontSize:'var(--text-body-sm)',marginBottom:6}}>
                        <span style={{color:'var(--text-heading)',fontWeight:n?500:700}}>{QFIELDS[k].name}</span>
                        <span style={{color:'var(--text-subtle)'}}>{Math.round((v/max)*100)}%</span>
                      </div>
                      <div style={{height:6,borderRadius:6,background:'var(--surface-sunken)',overflow:'hidden'}}>
                        <div style={{height:'100%',borderRadius:6,width:((v/max)*100)+'%',
                          background:n?'var(--gold-300)':'linear-gradient(90deg,var(--gold-700),var(--gold-300))',
                          animation:`ub-bar 900ms var(--ease-out) ${120+n*90}ms both`}}/>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>

            <Reveal delay={240} y={22}>
              <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-3)'}}>
                <Magnetic strength={0.18}><Button size="lg" onClick={()=>go('apply')} iconRight={<Icon name="arrow-right" size={16}/>}>Build my shortlist</Button></Magnetic>
                <Button size="lg" variant="secondary" onClick={()=>go('call')} iconLeft={<Icon name="video" size={16}/>}>Talk it through, free</Button>
                <Button size="lg" variant="ghost" onClick={restart} iconLeft={<Icon name="refresh-cw" size={16}/>}>Retake</Button>
              </div>
            </Reveal>
          </div>
        )}

        <div style={{flex:'1 1 250px',minWidth:0,display:'flex',flexDirection:'column',gap:'var(--space-5)',position:'sticky',top:92,alignSelf:'flex-start'}}>
          {stage === "result" ? (
            <React.Fragment>
              <Reveal delay={140} y={22}>
                <Card tone="sunken" elevation="none" padding="var(--space-6)">
                  <div className="ub-overline">Your profile</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:8,margin:'var(--space-4) 0 var(--space-4)'}}>
                    <Tag tone="gold">{level}</Tag>
                    {traits.maths && <Tag>{traits.maths === "high" ? "Wiskunde B" : traits.maths === "applied" ? "Wiskunde A" : "Maths-light"}</Tag>}
                    {traits.mode && <Tag>{traits.mode} first</Tag>}
                    {traits.horizon && <Tag>{traits.horizon === "own" ? "Own business" : traits.horizon}</Tag>}
                    <Tag>{lead.intake}</Tag>
                  </div>
                  <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',lineHeight:1.6,margin:0}}>{BUDGET_NOTE[traits.budget] || BUDGET_NOTE.unknown}</p>
                </Card>
              </Reveal>
              <Reveal delay={200} y={22}>
                <Card padding="var(--space-6)">
                  <div className="ub-overline">Then what?</div>
                  <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)',marginTop:'var(--space-4)'}}>
                    {[["search","We check entry requirements","Grades, English test, prerequisites, per programme."],["file-text","You get a real shortlist","Five options you can actually get into, with costs."],["video","We talk it through","Fifteen minutes, free, no obligation."]].map(([ic,t,d])=>(
                      <div key={t} style={{display:'flex',gap:12}}>
                        <span style={{display:'inline-flex',width:30,height:30,flex:'0 0 30px',borderRadius:'50%',alignItems:'center',justifyContent:'center',background:'var(--surface-tertiary-soft)',color:'var(--moss-700)'}}><Icon name={ic} size={15}/></span>
                        <span>
                          <span style={{display:'block',fontSize:'var(--text-body-sm)',fontWeight:700,color:'var(--text-heading)'}}>{t}</span>
                          <span style={{display:'block',fontSize:'var(--text-caption)',color:'var(--text-muted)',lineHeight:1.5}}>{d}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{marginTop:'var(--space-5)'}}>
                    <Button variant="secondary" full onClick={()=>go('call')} iconLeft={<Icon name="video" size={16}/>}>Book a free 15-min call</Button>
                  </div>
                </Card>
              </Reveal>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Reveal delay={140} y={22}>
                <Card tone="sunken" elevation="none" padding="var(--space-6)">
                  <div className="ub-overline">What you get</div>
                  <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)',marginTop:'var(--space-4)'}}>
                    {[["compass","A niche, not a category","Not \u201cbusiness\u201d, supply chain, or finance, or entrepreneurship."],["graduation-cap","Named programmes","Real Dutch degrees taught in English, at named universities."],["shield-check","An entry-requirement check","Your maths level read against what each programme demands."]].map(([ic,t,d])=>(
                      <div key={t} style={{display:'flex',gap:12}}>
                        <span style={{display:'inline-flex',width:30,height:30,flex:'0 0 30px',borderRadius:'50%',alignItems:'center',justifyContent:'center',background:'var(--surface-accent-soft)',color:'var(--gold-700)'}}><Icon name={ic} size={15}/></span>
                        <span>
                          <span style={{display:'block',fontSize:'var(--text-body-sm)',fontWeight:700,color:'var(--text-heading)'}}>{t}</span>
                          <span style={{display:'block',fontSize:'var(--text-caption)',color:'var(--text-muted)',lineHeight:1.5}}>{d}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Reveal>
              <Reveal delay={220} y={22}>
                <Card padding="var(--space-6)">
                  <div className="ub-overline">What this is</div>
                  <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',lineHeight:1.6,margin:'var(--space-3) 0 0'}}>A starting point, not a verdict. It narrows eight broad subject areas down to one niche worth researching, then a human checks it against your grades.</p>
                </Card>
              </Reveal>
            </React.Fragment>
          )}
        </div>
      </section>

      {sent && <div style={{position:'fixed',right:24,bottom:24,zIndex:50}}>
        <Toast tone="success" title="Result sent" message={"Your niche match is on its way to " + lead.email.trim() + " and to your advisor at unibridgenl@gmail.com."} onClose={()=>setSent(false)}/>
      </div>}
    </main>
  );
}
Object.assign(window, { QuizScreen });
