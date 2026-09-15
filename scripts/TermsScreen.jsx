const { Card, Button, Icon, Badge, Alert } = window.UnibridgeNLDesignSystem_3cb2d1;
const { PageHero, Reveal, Magnetic, DrawRule } = window;

/* Defined once in Chrome.jsx, which every page loads, so the footer and this page
   never disagree. Paste the number there and it appears in both. */
const BTW_ID = window.BTW_ID || "";

const SECTIONS = [
  ["who", "file-text", "Who you are buying from",
    ["UniBridge NL, a sole proprietorship registered with the Dutch Chamber of Commerce under KvK number 42087386, based in Amsterdam, the Netherlands.",
     "Email unibridgenl@gmail.com. WhatsApp +31 6 25 29 40 80. We answer email within one working day. Our full postal address is available on request and is given on every invoice.",
     BTW_ID ? ("VAT identification number: " + BTW_ID + ".") : "VAT identification number: to be published here."]],

  ["what", "wallet", "What we sell, and what it costs",
    ["The Netherlands Student Handbook 2026/27 is a 62 page PDF, delivered by email, personalised with your name and order reference. €19, paid once. There is no subscription and nothing renews.",
     "Our service plans and add-ons are listed with their prices on the services page. Third party costs are never paid to us: university application fees, the IND residence permit fee and any housing deposit are paid by you, directly to those parties.",
     "Every price on this site is the total you pay. Where VAT applies to your purchase it is already included in the figure shown, and the country you are buying from decides whether it applies at all."]],

  ["order", "clipboard-list", "How an order is made",
    ["For the handbook: you choose your delivery timing, pay through Stripe by card or iDEAL, and the contract is made when your payment is confirmed. We never see or store your card details.",
     "For a plan: you send an enquiry, we scope the work and quote you, and the contract is made when you accept that quote in writing. Nothing is charged before then.",
     "We send written confirmation of every order by email. If it does not arrive within a few hours, tell us, because that email is also your record of what you agreed to."]],

  ["cancel", "refresh-cw", "Cancelling, refunds and the 14 day right",
    ["You have 14 days to cancel any order, without giving a reason. The full terms, the online cancellation function and the model form are on the cancellation page.",
     "There is one exception and it only applies if you choose it yourself: if you ask us to send the handbook immediately and declare at checkout that you are giving up the right to cancel, that right ends once the file has been sent. If you did not make that declaration, the 14 days run in full.",
     "Separately from the law, and on top of it: if the handbook does not help you, reply to the delivery email within 14 days and we refund you. You do not have to explain why, and you keep the file."]],

  ["updates", "sparkles", "The next edition promise",
    ["Most Dutch amounts are re-indexed on 1 January. Everyone who buys the 2026/27 handbook gets the next edition free, once, sent to the address they bought it with, when it is published. Corrections made before then are listed with their dates on the handbook page.",
     "This promise covers one further edition. It is not a subscription, it does not renew, and it ends if the handbook is discontinued, in which case nothing further is owed by either of us."]],

  ["copyright", "palette", "Copyright, and how to report an infringement",
    ["The handbook, this website, and everything written or drawn for either of them belong to UniBridge NL. Your copy of the handbook is licensed to you personally. You may print it and keep it for as long as you like. You may not resell it, republish it, or pass the file on. The free sample exists precisely so that you have something you can share.",
     "If you believe something we have published infringes your copyright, email unibridgenl@gmail.com with the word COPYRIGHT in the subject line. Tell us what the work is, where on our site it appears, and how we can reach you. We will look at it and take it down or correct it within five working days, and we will write back either way.",
     "We are a Dutch business and we host no material uploaded by other people, so the United States DMCA designated agent scheme does not apply to us and registering one would not give us anything. The route above is the one that works: it reaches a person, and it is the same route a Dutch or EU notice would take."]],

  ["ai", "cpu", "How we use AI, and where we do not",
    ["We use AI tools to help draft and lay out our written material, including parts of the handbook and this website. Nothing goes out on that basis alone. Every figure, deadline, fee and legal rule in the handbook was checked against the responsible Dutch authority by a person before publication, and the sources are named on the page they appear on.",
     "We do not use AI to make or influence any decision about a person. Nobody's application, eligibility, pricing or suitability is scored, ranked or filtered by a machine. A human reads everything you send us.",
     "We do not put your documents, passport scans, transcripts or personal details into public AI tools. If that ever changes we will say so here first and ask you before doing it.",
     "We do not publish AI generated photographs or video of people, and we do not invent students, reviews or testimonials. Where a page shows a person, it is a real person who agreed to it.",
     "If you want to know whether a specific thing we sent you was AI assisted, ask and we will tell you straight."]],

  ["marketing", "mail", "Email, marketing and how to stop it",
    ["We do not run a mailing list and we do not send newsletters. You will hear from us for one of three reasons only: you asked us something, you bought something, or you are getting the next edition you were promised.",
     "If you ever want none of it, reply with the word STOP to any email from us, or write to unibridgenl@gmail.com. We act on it the same day, and it costs you nothing. Stopping marketing never stops the emails you actually need, like your file or your refund.",
     "We never sell, rent or share your email address with anyone for their own marketing."]],

  ["age", "users", "Age",
    ["Our services are for students who will be 18 or over on the first day of their course. Universities require a formal guardianship arrangement for minors and we are not set up to provide one, so we would not be doing you a favour by pretending otherwise.",
     "If you are under 16, please do not send us your details at all. Under Dutch law we would need your parent or guardian's permission to process them, and we would rather your parent wrote to us directly.",
     "If you are between 16 and 18 and still at school, you are welcome to read everything here and to write to us with a parent copied in, but we will not take you on as a client until your start date is settled and you are 18."]],

  ["security", "shield-check", "How your information is kept",
    ["This whole site is served over HTTPS, so what you type into a form is encrypted in transit. There is no login, no account and no database on this site: we store nothing about you in your browser except your cookie choice, and the study list you build stays in your own browser and is cleared when you close the site.",
     "Form submissions reach us through Web3Forms, a third party form service, and land in a Google Workspace mailbox protected by two factor authentication. Documents you send for an application are held in Google Drive on the same account and deleted on request at any time.",
     "Web3Forms and Google are outside or partly outside the Netherlands, so some of your data is processed abroad under the safeguards those services publish. The privacy statement explains this in more detail and tells you how to have everything deleted."]],

  ["liability", "scale", "What we are and are not responsible for",
    ["The handbook and this site are information, carefully checked and honestly sourced, but they are not legal, tax, immigration, medical or financial advice, and reading them does not create a professional relationship. Dutch rules change, most of them on 1 January, and the date every figure was checked is printed on the page it appears on.",
     "Where we act for you under a plan, we are responsible for doing that work properly and on time. We are not responsible for decisions made by universities, the IND, a municipality, a landlord, a bank or an insurer, none of whom we control and none of whom we can overrule.",
     "Nothing here limits any right you have as a consumer under Dutch law. Where a sentence in these terms conflicts with that law, the law wins and the rest of these terms stay standing."]],

  ["law", "compass", "Law, and what to do if we disagree",
    ["Dutch law applies, and if you live elsewhere in the EU you keep the protection of your own country's mandatory consumer rules.",
     "If something goes wrong, write to us first. We would much rather fix it than argue about it, and most things are a misunderstanding that one email clears up.",
     "If we cannot resolve it between us, you can take a consumer complaint to the European Commission's Online Dispute Resolution platform, or to the Dutch courts. Complaints about how we handle personal data can go to the Autoriteit Persoonsgegevens."]]
];

function TermsScreen({ go }) {
  return (
    <main style={{overflowX:'clip'}}>
      <PageHero overline="Legal" tone="ink"
        title="Terms of sale"
        lead="What you are buying, what it costs, how to cancel it, and what we are on the hook for. Written to be read, not to be skipped."
        meta={[["calendar-check","Last updated September 2026"],["file-text","KvK 42087386"],["refresh-cw","14 day cancellation right"]].map(([i,t])=>(
          <span key={t} style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:'var(--text-body-sm)'}}><Icon name={i} size={16} color="var(--gold-300)"/>{t}</span>
        ))}/>

      <section style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'clamp(40px,6vw,80px) var(--gutter-inline) 0',display:'flex',flexWrap:'wrap',alignItems:'flex-start',gap:'clamp(24px,3vw,48px)'}}>
        <div style={{flex:'3 1 min(100%,420px)',minWidth:0,display:'flex',flexDirection:'column',gap:'var(--space-5)'}}>
          {SECTIONS.map(([id,ic,t,paras],n)=>(
            <Reveal key={id} delay={Math.min(n,5)*90} y={20}>
              <Card padding="var(--space-6)" id={id} style={{scrollMarginTop:88}}>
                <div style={{display:'flex',alignItems:'center',gap:14}}>
                  <span style={{display:'inline-flex',width:42,height:42,flex:'0 0 42px',borderRadius:'var(--radius-md)',alignItems:'center',justifyContent:'center',background:'var(--surface-accent-soft)',color:'var(--gold-700)'}}><Icon name={ic} size={20}/></span>
                  <h2 style={{margin:0,fontSize:'var(--text-h4)'}}>{t}</h2>
                </div>
                <DrawRule delay={120} width={40} style={{margin:'var(--space-4) 0'}}/>
                <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
                  {paras.map(p=><p key={p} style={{margin:0,color:'var(--text-body)',lineHeight:1.7,maxWidth:'62ch',textWrap:'pretty'}}>{p}</p>)}
                </div>
              </Card>
            </Reveal>
          ))}
          <Reveal delay={120} y={16}>
            <p style={{margin:0,fontSize:'var(--text-body-sm)',color:'var(--text-subtle)'}}>Last updated: September 2026. We date every change rather than quietly editing.</p>
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
              <div className="ub-overline">Need to cancel?</div>
              <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',lineHeight:1.6,margin:'var(--space-3) 0 var(--space-5)'}}>No reason needed, and we will not ask for one.</p>
              <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)'}}>
                <Magnetic strength={0.16}><Button full onClick={()=>go('cancel')} iconLeft={<Icon name="refresh-cw" size={16}/>}>Cancel an order</Button></Magnetic>
                <Button variant="secondary" full onClick={()=>go('privacy')}>Privacy statement</Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
Object.assign(window, { TermsScreen });
