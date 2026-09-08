const { Card } = window.UnibridgeNLDesignSystem_3cb2d1;

function PrivacyScreen({ go }) {
  return (
    <main style={{maxWidth:820,margin:'0 auto',padding:'var(--space-12) var(--gutter-inline) var(--space-20)'}}>
      <div className="ub-overline">Legal</div>
      <h1 style={{fontSize:'var(--text-h1)',margin:'var(--space-3) 0 var(--space-6)'}}>Privacy statement</h1>

      <Card padding="var(--space-8)" style={{display:'flex',flexDirection:'column',gap:'var(--space-6)'}}>
        <section>
          <h3 style={{fontSize:'var(--text-h4)',margin:'0 0 var(--space-2)'}}>Who we are</h3>
          <p style={{fontSize:'var(--text-body)',color:'var(--text-body)',margin:0}}>UniBridge NL (KvK 42087386), based in Amsterdam, the Netherlands. Contact: <a href="mailto:unibridgenl@gmail.com" style={{color:'var(--text-link)'}}>unibridgenl@gmail.com</a>.</p>
        </section>

        <section>
          <h3 style={{fontSize:'var(--text-h4)',margin:'0 0 var(--space-2)'}}>What we collect</h3>
          <p style={{fontSize:'var(--text-body)',color:'var(--text-body)',margin:0}}>When you fill in the Apply form, book a call, or take the Find my field quiz, we collect the information you type in — for example your name, email address, WhatsApp number, country, study preferences, and any notes you add. We only collect what's needed to respond to your request.</p>
        </section>

        <section>
          <h3 style={{fontSize:'var(--text-h4)',margin:'0 0 var(--space-2)'}}>How it's used</h3>
          <p style={{fontSize:'var(--text-body)',color:'var(--text-body)',margin:0}}>Form submissions are sent to our inbox using Web3Forms, a third-party form-processing service, so we can reply to you directly. We don't sell your information, and we don't use it for anything beyond responding to your enquiry, application, or booking.</p>
        </section>

        <section>
          <h3 style={{fontSize:'var(--text-h4)',margin:'0 0 var(--space-2)'}}>Cookies</h3>
          <p style={{fontSize:'var(--text-body)',color:'var(--text-body)',margin:0}}>This site uses essential cookies needed for basic site functions (like remembering your cookie preference). You can choose "Essential only" or "Accept all" in the cookie banner shown on your first visit.</p>
        </section>

        <section>
          <h3 style={{fontSize:'var(--text-h4)',margin:'0 0 var(--space-2)'}}>Your rights</h3>
          <p style={{fontSize:'var(--text-body)',color:'var(--text-body)',margin:0}}>Under the GDPR, you can ask us to show you what we hold about you, correct it, or delete it. Email <a href="mailto:unibridgenl@gmail.com" style={{color:'var(--text-link)'}}>unibridgenl@gmail.com</a> and we'll act on it.</p>
        </section>

        <section>
          <h3 style={{fontSize:'var(--text-h4)',margin:'0 0 var(--space-2)'}}>Document retention</h3>
          <p style={{fontSize:'var(--text-body)',color:'var(--text-body)',margin:0}}>Any documents you send us as part of an application are used only to support that application and can be deleted on request at any time.</p>
        </section>

        <p style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)',margin:0}}>Last updated: September 2026.</p>
      </Card>
    </main>
  );
}
Object.assign(window, { PrivacyScreen });
