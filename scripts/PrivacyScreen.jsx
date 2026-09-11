const { Card, Button, Icon, Badge, Alert } = window.UnibridgeNLDesignSystem_3cb2d1;
const { PageHero, Reveal, Rise, Stagger, Magnetic, DrawRule } = window;

const SECTIONS = [
  ["who-we-are","file-text","Who we are",
    ["UniBridge NL (KvK 42087386), based in Amsterdam, the Netherlands. Contact: unibridgenl@gmail.com."]],
  ["what-we-collect","clipboard-list","What we collect",
    ["When you fill in the Apply form, book a call, or take the Find my field quiz, we collect the information you type in, for example your name, email address, WhatsApp number, country, study preferences, and any notes you add. We only collect what's needed to respond to your request."]],
  ["how-its-used","mail","How it's used",
    ["Form submissions reach us in one of two ways. The Apply and Contact forms are delivered to our inbox by Web3Forms, a third-party form-processing service. The Find my field quiz and the call booking form send your details to a script running on our own Google account, which is what lets us email your result to you and put a call in the calendar. Either way, we don't sell your information, and we don't use it for anything beyond responding to your enquiry, application, or booking."]],
  ["google-services","calendar-check","Google services and calendar invites",
    ["Because we run on Google Workspace, the details you submit through the quiz or the booking form are processed by Google on our behalf. Google acts as our processor here, not as an independent controller of your data.",
     "When you book a call, we create a calendar event and add you as a guest, which means Google sends you an invite containing a Google Meet link. Your name and email address appear on that event so we know who we are meeting. You can decline or remove the invite from your own calendar at any time, and you can ask us to delete the event entirely.",
     "When you complete the quiz, we email the result to the address you gave us and keep a copy in our inbox so an advisor can follow up. If you would rather we didn't, say so and we'll delete it."]],
  ["your-study-list","graduation-cap","Your study list",
    ["The courses you save to My study list are stored in your own browser and never sent to us. Nobody at UniBridge NL can see them unless you choose to email the list or bring it to a call. The list is cleared automatically when you close the site, so if you want to keep your choices, email the list to yourself before you go."]],
  ["cookies","cookie","Cookies",
    ["This site uses essential cookies needed for basic site functions (like remembering your cookie preference). You can choose \u201cEssential only\u201d or \u201cAccept all\u201d in the cookie banner shown on your first visit."]],
  ["your-rights","shield-check","Your rights",
    ["Under the GDPR, you can ask us to show you what we hold about you, correct it, or delete it. Email unibridgenl@gmail.com and we'll act on it."]],
  ["retention","clock","Document retention",
    ["Any documents you send us as part of an application are used only to support that application and can be deleted on request at any time."]]
];

function PrivacyScreen({ go }) {
  return (
    <main style={{overflowX:'clip'}}>
      <PageHero overline="Legal" tone="ink"
        title="Privacy statement"
        lead="What we collect, why we collect it, and how to have it deleted. Written in plain language, because a privacy statement nobody reads protects nobody."
        meta={[["calendar-check","Last updated September 2026"],["shield-check","GDPR"],["file-text","KvK 42087386"]].map(([i,t])=>(
          <span key={t} style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:'var(--text-body-sm)'}}><Icon name={i} size={16} color="var(--gold-300)"/>{t}</span>
        ))}/>

      <section style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'clamp(40px,6vw,80px) var(--gutter-inline) 0',display:'flex',flexWrap:'wrap',alignItems:'flex-start',gap:'clamp(24px,3vw,48px)'}}>
        <div style={{flex:'3 1 min(100%,420px)',minWidth:0,display:'flex',flexDirection:'column',gap:'var(--space-5)'}}>
          {SECTIONS.map(([id,ic,t,paras],n)=>(
            <Reveal key={id} delay={Math.min(n,5)*90} y={20}>
              <Card padding="var(--space-6)" id={id}>
                <div style={{display:'flex',alignItems:'center',gap:14}}>
                  <span style={{display:'inline-flex',width:42,height:42,flex:'0 0 42px',borderRadius:'var(--radius-md)',alignItems:'center',justifyContent:'center',background:'var(--surface-accent-soft)',color:'var(--gold-700)'}}><Icon name={ic} size={20}/></span>
                  <h2 style={{margin:0,fontSize:'var(--text-h4)'}}>{t}</h2>
                </div>
                <DrawRule delay={120} width={40} style={{margin:'var(--space-4) 0'}}/>
                {paras.map(p=><p key={p} style={{margin:0,color:'var(--text-body)',lineHeight:1.7,maxWidth:'62ch',textWrap:'pretty'}}>{p}</p>)}
              </Card>
            </Reveal>
          ))}
          <Reveal delay={120} y={16}>
            <p style={{margin:0,fontSize:'var(--text-body-sm)',color:'var(--text-subtle)'}}>Last updated: September 2026.</p>
          </Reveal>
        </div>

        <div style={{flex:'1 1 240px',minWidth:0,display:'flex',flexDirection:'column',gap:'var(--space-5)',position:'sticky',top:92,alignSelf:'flex-start'}}>
          <Reveal delay={100} y={22}>
            <Card tone="sunken" elevation="none" padding="var(--space-6)">
              <div className="ub-overline">On this page</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:'var(--space-4)'}}>
                {SECTIONS.map(([id,,t])=>(
                  <a key={id} href={"#"+id} style={{fontSize:'var(--text-body-sm)',color:'var(--text-body)',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:8}}>
                    <Icon name="chevron-right" size={14} color="var(--gold-500)"/>{t}
                  </a>
                ))}
              </div>
            </Card>
          </Reveal>
          <Reveal delay={180} y={22}>
            <Card padding="var(--space-6)">
              <div className="ub-overline">Questions about your data</div>
              <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',lineHeight:1.6,margin:'var(--space-3) 0 var(--space-5)'}}>Email us and we'll show you what we hold, correct it, or delete it.</p>
              <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)'}}>
                <Magnetic strength={0.16}><Button full onClick={()=>window.open('mailto:unibridgenl@gmail.com','_blank')} iconLeft={<Icon name="mail" size={16}/>}>unibridgenl@gmail.com</Button></Magnetic>
                <Button variant="secondary" full onClick={()=>go('contact')}>Other ways to reach us</Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
Object.assign(window, { PrivacyScreen });
