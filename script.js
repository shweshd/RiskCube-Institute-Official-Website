/* ── Site nav ── */
   const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

/* Toggle menu */
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

/* Close when clicking outside */
document.addEventListener('click', (e) => {
  if (!navLinksEl.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  }
});

/* Close when link clicked */
function closeNav() {
  hamburger.classList.remove('open');
  navLinksEl.classList.remove('open');
}
 
    /* ── Scroll reveal ── */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        entry.target.style.transitionDelay = `${siblings.indexOf(entry.target) * 80}ms`;
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObs.observe(el));
 
    /* ── Sticky nav ── */
    const navEl = document.querySelector('nav');
    window.addEventListener('scroll', () => { navEl.style.background = window.scrollY > 60 ? 'rgba(15,15,15,0.92)' : 'rgba(15,15,15,0.65)'; });
 
    /* ── About card stack ── */
    const cardStack = document.getElementById('cardStack');
    function layoutCards() {
      [...cardStack.children].forEach((card, i) => {
        card.style.zIndex = cardStack.children.length - i;
        card.style.transform = `translateY(${i*28}px) scale(${1-i*0.04}) rotate(${i*2-2}deg)`;
        card.style.opacity = i === 0 ? '1' : i === 1 ? '0.88' : '0.72';
      });
    }
    layoutCards();
    [...cardStack.querySelectorAll('.stack-card')].forEach(card => {
      card.addEventListener('click', () => { cardStack.appendChild(card); layoutCards(); });
    });
 
    /* ── Contact ── */
    const loginTriggerWrap = document.getElementById('loginTriggerWrap');
    const loginCardWrap    = document.getElementById('loginCardWrap');
    const contactFormWrap  = document.getElementById('contactFormWrap');
 
    function handleRegisterClick() {
      contactFormWrap.classList.add('form-active');
      if (!loginCardWrap.classList.contains('open')) loginTriggerWrap.classList.add('visible');
      const inner = document.querySelector('#btnRegister .tech-btn-inner');
      const txt   = document.querySelector('#btnRegister .tech-btn-text');
      const eye   = document.querySelector('#btnRegister .tech-btn-eye');
      txt.textContent = 'Sent ✓'; eye.textContent = 'Thank you';
      inner.style.background = '#1a6b2a';
      document.getElementById('btnRegister').style.pointerEvents = 'none';
      setTimeout(() => { txt.textContent = 'Register Interest'; eye.textContent = 'RCI Portal'; inner.style.background = ''; document.getElementById('btnRegister').style.pointerEvents = ''; }, 3500);
    }
    function handleLoginClick() {
      loginTriggerWrap.classList.remove('visible');
      setTimeout(() => { loginTriggerWrap.style.display = 'none'; loginCardWrap.classList.add('open'); }, 260);
    }
    function closeLoginCard() {
      loginCardWrap.classList.remove('open');
      loginTriggerWrap.style.display = '';
      requestAnimationFrame(() => requestAnimationFrame(() => loginTriggerWrap.classList.add('visible')));
    }
    function handleSubmit() {
      const name = document.getElementById('c-name').value.trim();
      const email = document.getElementById('c-email').value.trim();
      const msg   = document.getElementById('c-msg').value.trim();
      if (!name || !email || !msg) { alert('Please fill in all fields.'); return; }
      const btn = document.getElementById('formSubmitBtn');
      btn.textContent = '✓ Interest Registered'; btn.style.background = '#1a6b2a'; btn.style.pointerEvents = 'none';
      setTimeout(() => { btn.textContent = 'Register Interest →'; btn.style.background = ''; btn.style.pointerEvents = ''; document.getElementById('c-name').value=''; document.getElementById('c-email').value=''; document.getElementById('c-msg').value=''; }, 3500);
    }
 
    /* ══════════════════════════════════════════════════════════
       CUBON CHATBOT
    ══════════════════════════════════════════════════════════ */
    (function () {
      let chatOpen = false;
      let busy = false;
      const cube   = document.getElementById('CUBONCube');
      const panel  = document.getElementById('CUBONPanel');
      const msgs   = document.getElementById('CUBONMessages');
      const input  = document.getElementById('CUBONInput');
      const notif  = document.getElementById('CUBONNotif');
      const scene  = document.getElementById('CUBONScene');
      const quick  = document.getElementById('CUBONQuick');
      const exprs  = ['happy','thinking','surprised','cool','excited'];
 
      /* ── Expression helper ── */
      function setExpr(e) {
        exprs.forEach(x => cube.classList.remove(x));
        cube.classList.add(e);
      }
 
      /* Scroll → random expression wink */
      let lastScrollTime = 0;
      window.addEventListener('scroll', () => {
        const now = Date.now();
        if (now - lastScrollTime > 2200 && !chatOpen) {
          lastScrollTime = now;
          const r = exprs[Math.floor(Math.random() * exprs.length)];
          setExpr(r);
          setTimeout(() => { if (!chatOpen) setExpr('happy'); }, 1400);
        }
      });
 
      /* Auto wiggle every 7s when closed */
      setInterval(() => {
        if (!chatOpen) {
          const pick = ['surprised','thinking','cool','excited'][Math.floor(Math.random()*4)];
          setExpr(pick);
          setTimeout(() => setExpr('happy'), 1000);
        }
      }, 7000);
 
      /* Notif pulse after 3.5s */
      setTimeout(() => { if (!chatOpen) notif.classList.add('show'); }, 3500);
 
      /* ── Toggle ── */
      window.CUBONToggle = function () {
        chatOpen = !chatOpen;
        panel.classList.toggle('open', chatOpen);
        notif.classList.remove('show');
        if (chatOpen) {
          scene.style.animationPlayState = 'paused';
          setExpr('excited');
          setTimeout(() => setExpr('happy'), 900);
          if (msgs.children.length === 0) {
            setTimeout(() => addMsg('bot', "Hey! 👋 I'm <strong>CUBON</strong>, your RCI assistant. I'm here to answer questions about our Academy, Advisory, Pipeline, community, or how to get in touch!"), 350);
          }
        } else {
          scene.style.animationPlayState = '';
          setExpr('cool');
          setTimeout(() => setExpr('happy'), 1100);
        }
      };
 
      window.CUBONClose = function () {
        chatOpen = false;
        panel.classList.remove('open');
        scene.style.animationPlayState = '';
        setExpr('cool');
        setTimeout(() => setExpr('happy'), 1100);
      };
 
      /* Quick buttons */
      window.CUBONQuick = function (topic) {
        if (busy) return;
        input.value = topic;
        CUBONSend();
      };
 
      /* ── Add message ── */
      function addMsg(role, html) {
        const wrap   = document.createElement('div');
        wrap.className = `sw-msg ${role}`;
        const bubble = document.createElement('div');
        bubble.className = 'sw-bubble';
        bubble.innerHTML = html;
        wrap.appendChild(bubble);
        msgs.appendChild(wrap);
        msgs.scrollTop = msgs.scrollHeight;
      }
 
      function showTyping() {
        const w = document.createElement('div');
        w.className = 'sw-msg bot'; w.id = 'sw-typing';
        const t = document.createElement('div');
        t.className = 'sw-typing';
        t.innerHTML = '<span></span><span></span><span></span>';
        w.appendChild(t); msgs.appendChild(w);
        msgs.scrollTop = msgs.scrollHeight;
      }
      function hideTyping() { const t = document.getElementById('sw-typing'); if(t) t.remove(); }
 
      /* ── Knowledge base ── */
      const KB = [
        { k:['hello','hi','hey','hiya','howdy','sup','greet'],
          r:"Hey there! 😄 Great to see you here at RiskCube. What can I help you with? You can ask about our Academy, Advisory, Pipeline, community, or how to get in touch.", e:'excited' },
        { k:['academy','train','bootcamp','course','program','certif','learn','study','enrol'],
          r:"🎓 The <strong>RiskCube Academy</strong> runs structured training programmes and intensive bootcamps covering:<br>• Cyber Risk &amp; Digital Security<br>• AI Governance &amp; Risk<br>• Compliance Frameworks (ISO, NIST, NIS2)<br>• Operational Resilience<br><br>All programmes are co-designed with industry partners for real operational impact.", e:'happy' },
        { k:['advisory','consult','nist','iso','nis2','dora','framework','implement','embed','governance'],
          r:"🛡️ <strong>RiskCube Advisory Services</strong> helps organisations implement world-class frameworks including NIST CSF, ISO 27001, NIS2, and DORA. We give pragmatic, outcome-focused guidance tailored to your sector and maturity.", e:'cool' },
        { k:['innovat','research','incubat','ai model','ai risk','lab','next-gen','cutting'],
          r:"⚡ <strong>Innovation &amp; Incubation</strong> is where RiskCube builds tomorrow's risk tools today — AI governance models, digital security research, and next-gen risk intelligence, in partnership with academia and industry.", e:'surprised' },
        { k:['pipeline','cycle','model','hire','deploy','talent','recruit'],
          r:"🔄 The <strong>RiskCube Pipeline</strong> is a closed-loop model:<br>1️⃣ <strong>Train</strong> — rigorous curriculum with live industry input<br>2️⃣ <strong>Hire</strong> — vetted practitioners placed with top firms<br>3️⃣ <strong>Innovate</strong> — practitioners contribute back to research<br>4️⃣ <strong>Deploy</strong> — senior experts shape sector policy", e:'thinking' },
        { k:['community','student','career','professional','sector','join','member','network','who'],
          r:"🌐 The <strong>RiskCube Community</strong> spans students, early-career professionals, and senior practitioners across Financial Services, Government, Critical Infrastructure, Healthcare, Technology, and Defence &amp; Security.", e:'happy' },
        { k:['contact','reach','email','touch','address','london','register','interest','partner','hire talent'],
          r:"📬 Get in touch via:<br>• The <strong>Register Interest</strong> form on this page<br>• Email: <strong>hello@riskcube.institute</strong><br>• We're based in <strong>London, UK</strong><br><br>Whether hiring talent, joining a programme, or exploring research partnerships — the team is ready!", e:'happy' },
        { k:['what is idr','about idr','institute','who are you','tell me about'],
          r:"🏛️ <strong>RCI (RiskCube Institute)</strong> is an industry-led training and deployment institute focused on digital, cyber, and AI risk. We bridge the gap between academic knowledge and operational capability through university partnerships and live industry projects.", e:'cool' },
        { k:['price','cost','fee','afford','paid','free','scholarship'],
          r:"💡 Fees vary by programme track and duration. For detailed pricing reach out at <strong>hello@riskcube.institute</strong> — the team will walk you through the options and any available funding pathways.", e:'thinking' },
        { k:['CUBON','your name','who are you bot','chatbot','ai assistant'],
          r:"I'm <strong>CUBON</strong> 🧊 — RiskCube's Rubik's Cube AI assistant! I spin, I think, I answer questions. Ask me anything about RiskCube!", e:'excited' },
        { k:['thank','thanks','cheers','appreciate','great','awesome','nice','good bot','love you','perfect'],
          r:"You're very welcome! 🧊✨ That's what I'm here for. Anything else I can help you navigate at RiskCube?", e:'happy' },
        { k:['bye','goodbye','later','cya','see you','exit','quit','close chat'],
          r:"Catch you later! 👋 Stay cyber-safe out there. Come back any time 🛡️", e:'cool' },
      ];
 
      const fallbacks = [
        "Hmm, rotating on that one! 🤔 Try asking about our Academy, Advisory services, Pipeline, or how to contact RiskCube.",
        "Good question — that's a bit outside my cube! 😄 The team at <strong>hello@riskcube.institute</strong> can give you a proper answer.",
        "I'm still learning some edges! 🧩 For that one, reach out to the RiskCube team directly. Meanwhile, I can cover Academy, Advisory, Pipeline, or Community topics.",
        "My tiles are scrambled on that! 🔄 Ask me about RiskCube's programmes, services, or how to get in touch.",
      ];
      let fbIdx = 0;
 
      function getReply(text) {
        const t = text.toLowerCase();
        for (const entry of KB) {
          if (entry.k.some(k => t.includes(k))) return { r: entry.r, e: entry.e };
        }
        return { r: fallbacks[fbIdx++ % fallbacks.length], e: 'thinking' };
      }
 
      /* ── Send ── */
      window.CUBONSend = function () {
        const text = input.value.trim();
        if (!text || busy) return;
        input.value = ''; input.style.height = 'auto';
        addMsg('user', text);
        setExpr('thinking');
        busy = true;
        quick.style.display = 'none';
        showTyping();
        const delay = 700 + Math.random() * 700;
        setTimeout(() => {
          hideTyping();
          const { r, e } = getReply(text);
          addMsg('bot', r);
          setExpr(e);
          setTimeout(() => { if (chatOpen) setExpr('happy'); }, 2200);
          busy = false;
        }, delay);
      };
 
      window.CUBONKey = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); CUBONSend(); }
      };
 
      input.addEventListener('input', () => {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 80) + 'px';
      });
    })();
function togglePassword(){

  const password = document.getElementById("l-pass");
  const open = document.getElementById("eyeOpen");
  const closed = document.getElementById("eyeClosed");

  if(password.type === "password"){
      password.type = "text";
      open.style.display = "block";
      closed.style.display = "none";
  } else {
      password.type = "password";
      open.style.display = "none";
      closed.style.display = "block";
  }

}