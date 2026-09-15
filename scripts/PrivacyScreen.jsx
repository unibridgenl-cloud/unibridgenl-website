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
    ["There is no advertising, no analytics and no tracking on this site. No Google Analytics, no Meta pixel, nothing that follows you anywhere. The only thing kept in your browser is a note that you have seen the banner, plus the study list you build yourself, which never leaves your device. That is why the banner has no \u201caccept all\u201d button: there is nothing to accept."]],
  ["legal-basis","scale","Why we are allowed to hold it",
    ["Three grounds cover everything we do. Your consent, when you tick a box to have your quiz result emailed or your file sent straight away, and you can withdraw it whenever you like. Performing a contract, when you have bought the handbook or booked a plan and we need your details to deliver it. And our legitimate interest in answering an enquiry you sent us, which is simply replying to your own question.",
     "We do not profile you, we do not score you, and no decision about you is taken automatically. A person reads everything."]],
  ["how-long","clock","How long we keep it",
    ["Enquiries and quiz entries: two years, then deleted, because students often come back a year later and it saves you retyping everything.",
     "Application documents: for as long as we are working on your application and twelve months after it finishes, so we can help if something is queried. Deleted sooner the moment you ask.",
     "Purchase records: seven years, because Dutch tax law requires us to keep the administration of a sale for that long. This one we cannot shorten, even at your request.",
     "Anything you ask us to delete that we are not legally obliged to keep is gone the same day, and we write back to confirm it."]],
  ["where-it-goes","upload-cloud","Where your data physically goes",
    ["Two processors, both named. Web3Forms delivers the Apply, Contact and handbook order forms into our inbox. Google Workspace holds that inbox, the calendar and any documents you send. Stripe handles payments and we never see your card details.",
     "Some of these process data outside the Netherlands, including in the United States, under the transfer safeguards each of them publishes. If you would rather not use a form at all, email or WhatsApp us directly and nothing passes through a form service."]],
  ["security","shield-check","How it is protected",
    ["The whole site is served over HTTPS, so anything you type into a form is encrypted on its way to us. There is no login, no account and no database on this site.",
     "Our mailbox and drive are protected by two factor authentication. The study list you build stays in your own browser, is never sent to us, and is cleared when you close the site.",
     "We are one small business, not a bank. If something ever did go wrong with your data we would tell you plainly and quickly, and report it to the Autoriteit Persoonsgegevens where the law requires."]],
  ["ai","cpu","AI, and what we do not put into it",
    ["We use AI tools to help draft and lay out our written material. We do not use AI to make or influence any decision about a person, and we do not put your documents, passport scans, transcripts or personal details into public AI tools. The terms page explains this in full."]],
  ["marketing","mail","Email and how to stop it",
    ["We run no mailing list and send no newsletters. You hear from us when you have asked us something, bought something, or are receiving the next edition of the handbook you were promised. Reply STOP to any email, or write to unibridgenl@gmail.com, and it ends the same day. We never sell or share your address."]],
  ["children","users","If you are under 18",
    ["Our services are for students who will be 18 or over when their course starts, and the application form will not submit if you tell us you will not be. If you are under 16, please do not send us your details: we would need a parent or guardian's permission to hold them, and we would rather they wrote to us directly."]],
  ["complain","circle-alert","If you are unhappy with us",
    ["Tell us first, at unibridgenl@gmail.com, and we will try to put it right. You also have the right to complain to the Dutch data protection authority, the Autoriteit Persoonsgegevens, at autoriteitpersoonsgegevens.nl, and you do not need our permission or our agreement to do so."]],
  ["your-rights","shield-check","Your rights",
    ["Under the GDPR you can ask us to show you what we hold about you, correct it, delete it, restrict what we do with it, object to it, or have it sent to you in a portable form. Email unibridgenl@gmail.com and we act on it, normally the same day and always within a month, free of charge."]],
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
