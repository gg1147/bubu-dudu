/* ─── Invitation – Clean standalone JS ─── */
(function () {
  'use strict';

  /* ── Inject toast + spinner styles ── */
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .rsvp-toast {
      position: fixed;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(-120%);
      z-index: 10000;
      padding: 1.2rem 2rem;
      border-radius: 1rem;
      font-family: var(--font-serif, Georgia, serif);
      font-size: 1rem;
      line-height: 1.5;
      max-width: 90vw;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
      transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s;
      opacity: 0;
    }
    .rsvp-toast.visible {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    .rsvp-toast.success {
      background: linear-gradient(135deg, #f5ecd4, #fff8e7);
      color: #5a3e3b;
      border: 1px solid #d4af37;
    }
    .rsvp-toast.error {
      background: linear-gradient(135deg, #fff0f0, #fff5f5);
      color: #8a4f4c;
      border: 1px solid #e2b4b1;
    }
    .rsvp-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: rsvpSpin 0.6s linear infinite;
      vertical-align: middle;
    }
    @keyframes rsvpSpin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleEl);

  /* ── Toast notification helper ── */
  function showToast(message, type) {
    // Remove existing toast
    const existing = document.querySelector('.rsvp-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'rsvp-toast ' + (type || 'success');
    toast.textContent = message;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('visible'));
    });

    // Auto dismiss
    const duration = type === 'error' ? 4000 : 5000;
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }

  /* ── Language Toggle (EN ↔ HI) ──────────────────────────────────── */
  const i18n = {
    en: {
      intro_text:
        'With the blessings of Shri Ganesh and our beloved families, we joyfully invite you to celebrate the union of',
      parent_sub:
        'Daughter of Mrs. Sunita & Mr. Mukesh Kumar Gupta & Son of Mrs. Sneh & Mr. Ashok Kumar',
      scroll_hint: 'Scroll to see magic',
      save_date: 'Save the Date',
      scratch_desc: 'Scratch below to reveal our wedding date',
      the_date: 'The Date',
      our_story: 'Our Story',
      forever_us: 'Forever Us',
      the_venue: 'The Venue',
      where: 'Where',
      venue_quote:
        'Join us as we celebrate amidst open skies and golden sunsets',
      view_maps: 'VIEW ON MAPS',
      festivities: 'Festivities',
      celebrations_unfold: 'The Celebrations Unfold',
      rsvp_join: 'Join the Celebration',
      rsvp_title: 'RSVP',
      rsvp_desc:
        'Kindly let us know if you can make it — your presence will make this celebration whole.',
      your_details: 'Your details',
      your_name: 'Your name',
      phone_number: 'Phone number',
      will_you_join: 'Will you join us?',
      joyfully_accept: 'Joyfully accept 🎉',
      regrettably_decline: 'Regrettably decline',
      party_size: 'Party size',
      events_attend: "Events you'll attend",
      song_request: 'A song for the dance floor',
      marriage_advice: 'Marriage advice for us',
      send_rsvp: 'Send RSVP',
      contacts_sub: 'Reach Out',
      contacts_title: 'Contact Us',
      groom_side: "Groom's Side",
      bride_side: "Bride's Side",
      groom_father: "Groom's Father",
      groom_brother: "Groom's Brother",
      groom_label: 'Groom',
      bride_father: "Bride's Father",
      bride_brother: "Bride's Brother",
      bride_label: 'Bride',
      footer_msg:
        "Your presence will turn this real-life romance into a blockbuster we'll never forget.<br/><br/>Come, dance, laugh, and celebrate with us in true Bollywood style!",
      warm_regards: 'Warm regards,',
      the_lovely: "The Lovely People's",
      haldi: 'Haldi Ceremony',
      sangeet: 'Sangeet Night',
      wedding: 'Sun Downer Wedding',
      countdown_quote: 'A lifetime of togetherness begins with one sacred step',
      the_wedding: 'The Wedding',
      scratch_month: 'MONTH',
      scratch_day: 'DAY',
      scratch_year: 'YEAR',
      cd_days: 'DAYS',
      cd_hours: 'HOURS',
      cd_mins: 'MINS',
      cd_secs: 'SECS',
      story_1: 'Memories together',
      story_2: 'Written in the stars',
      story_3: 'Joy and laughter',
      story_4: 'Forever Us',
      venue_name: 'Sahib Farms & Resorts',
      tagline_haldi: '"A joyful splash of turmeric, blessings, and laughter."',
      tagline_sangeet: '"An evening of music, dance, and endless celebration."',
      tagline_wedding: '"Vows beneath the setting sun to begin our forever."',
      dress_code: 'Dress code',
      colors_haldi: 'Yellow · Pink · Peach',
      dressnote_haldi: 'Bright & festive daywear',
      colors_sangeet: 'Blue · Black · Dark Green',
      dressnote_sangeet: 'Elegant evening wear',
      colors_wedding: 'Maroon · Ivory · Gold',
      dressnote_wedding: 'Traditional Indian — sarees, lehengas, sherwanis',
      get_directions: 'GET DIRECTIONS',
      song_placeholder: 'e.g. Kala Chashma',
      footer_couple: 'Manisha & Gagan',
      couple_manisha: 'Manisha',
      couple_gagan: 'Gagan',
      couple_amp: '&',
    },
    hi: {
      intro_text:
        'श्री गणेश जी और अपने परिवारजनों के आशीर्वाद से, हम आपको इस पवित्र बंधन में सम्मिलित होने का हर्षपूर्वक निमंत्रण देते हैं',
      parent_sub:
        'श्रीमती सुनीता एवं श्री मुकेश कुमार गुप्ता की सुपुत्री एवं श्रीमती स्नेह एवं श्री अशोक कुमार के सुपुत्र',
      scroll_hint: 'जादू देखने के लिए स्क्रॉल करें',
      save_date: 'तारीख़ याद रखें',
      scratch_desc: 'शादी की तारीख़ जानने के लिए स्क्रैच करें',
      the_date: 'तारीख़',
      our_story: 'हमारी कहानी',
      forever_us: 'हमेशा साथ',
      the_venue: 'स्थान',
      where: 'कहाँ',
      venue_quote: 'खुले आसमान और सुनहरी शाम में हमारे साथ जश्न मनाएँ',
      view_maps: 'नक्शे पर देखें',
      festivities: 'उत्सव',
      celebrations_unfold: 'जश्न की शुरुआत',
      rsvp_join: 'जश्न में शामिल हों',
      rsvp_title: 'उपस्थिति',
      rsvp_desc:
        'कृपया हमें बताएं कि क्या आप आ सकते हैं — आपकी उपस्थिति इस जश्न को पूरा करेगी।',
      your_details: 'आपकी जानकारी',
      your_name: 'आपका नाम',
      phone_number: 'फ़ोन नंबर',
      will_you_join: 'क्या आप आएंगे?',
      joyfully_accept: 'खुशी से स्वीकार 🎉',
      regrettably_decline: 'खेद सहित अस्वीकार',
      party_size: 'कितने लोग आएंगे',
      events_attend: 'किन कार्यक्रमों में शामिल होंगे',
      song_request: 'डांस फ्लोर के लिए एक गाना',
      marriage_advice: 'हमारे लिए शादी की सलाह',
      send_rsvp: 'भेजें',
      contacts_sub: 'संपर्क करें',
      contacts_title: 'फ़ोन नंबर',
      groom_side: 'वर पक्ष',
      bride_side: 'वधू पक्ष',
      groom_father: 'वर के पिता',
      groom_brother: 'वर का भाई',
      groom_label: 'दूल्हा',
      bride_father: 'वधू के पिता',
      bride_brother: 'वधू का भाई',
      bride_label: 'दुल्हन',
      footer_msg:
        'आपकी उपस्थिति इस प्रेम कहानी को एक यादगार ब्लॉकबस्टर बना देगी।<br/><br/>आइए, नाचें, हँसें और सच्चे बॉलीवुड अंदाज़ में जश्न मनाएँ!',
      warm_regards: 'शुभकामनाओं सहित,',
      the_lovely: 'प्यारे लोग',
      haldi: 'हल्दी समारोह',
      sangeet: 'संगीत की रात',
      wedding: 'सनडाउनर विवाह',
      countdown_quote: 'एक साथ जीवन भर की शुरुआत एक पवित्र कदम से होती है',
      the_wedding: 'विवाह',
      scratch_month: 'महीना',
      scratch_day: 'दिन',
      scratch_year: 'साल',
      cd_days: 'दिन',
      cd_hours: 'घंटे',
      cd_mins: 'मिनट',
      cd_secs: 'सेकंड',
      story_1: 'साथ की यादें',
      story_2: 'सितारों में लिखा',
      story_3: 'खुशियाँ और हँसी',
      story_4: 'हमेशा साथ',
      venue_name: 'साहिब फार्म्स & रिसॉर्ट्स',
      tagline_haldi: '"हल्दी, आशीर्वाद और हँसी का खुशनुमा रंग।"',
      tagline_sangeet: '"संगीत, नृत्य और अनंत उत्सव की एक शाम।"',
      tagline_wedding: '"डूबते सूरज के नीचे हमेशा साथ रहने का वादा।"',
      dress_code: 'ड्रेस कोड',
      colors_haldi: 'पीला · गुलाबी · पीच',
      dressnote_haldi: 'चमकीले और उत्सवी कपड़े',
      colors_sangeet: 'नीला · काला · गहरा हरा',
      dressnote_sangeet: 'शानदार शाम की पोशाक',
      colors_wedding: 'मैरून · आइवरी · गोल्ड',
      dressnote_wedding: 'पारंपरिक भारतीय — साड़ी, लहंगा, शेरवानी',
      get_directions: 'रास्ता देखें',
      song_placeholder: 'जैसे: काला चश्मा',
      footer_couple: 'मनीषा & गगन',
      couple_manisha: 'मनीषा',
      couple_gagan: 'गगन',
      couple_amp: '&',
    },
  };

  let currentLang = 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = i18n[lang][key];
        } else {
          el.innerHTML = i18n[lang][key];
        }
      }
    });
    // Update the toggle button text
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.textContent = lang === 'en' ? 'हिंदी' : 'EN';
      langBtn.title = lang === 'en' ? 'Switch to Hindi' : 'Switch to English';
    }
  }

  // Inject language toggle button
  const langToggle = document.createElement('button');
  langToggle.id = 'lang-toggle';
  langToggle.textContent = 'हिंदी';
  langToggle.title = 'Switch to Hindi';
  langToggle.style.cssText = `
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 1000;
    width: auto;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    background: rgba(255,255,255,0.95);
    border: 1px solid rgb(220,209,196);
    font-family: var(--font-sans, sans-serif);
    font-size: 0.8rem;
    font-weight: 600;
    color: rgb(138,79,76);
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: 0.3s;
    backdrop-filter: blur(8px);
    letter-spacing: 0.05em;
  `;
  langToggle.addEventListener('click', () => {
    applyLanguage(currentLang === 'en' ? 'hi' : 'en');
  });
  document.body.appendChild(langToggle);

  /* ── Show main content immediately ── */
  const main = document.getElementById('main-content');
  if (main) main.classList.add('visible');
  document.body.classList.remove('no-scroll');

  /* ── Music toggle ── */
  const audio = document.getElementById('bg-music');
  const btn = document.querySelector('.btn-micro');
  let playing = false;

  if (btn && audio) {
    btn.addEventListener('click', () => {
      if (playing) {
        audio.pause();
        btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
      } else {
        audio.play().catch(() => {});
        btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
      }
      playing = !playing;
    });
  }

  /* ── Countdown timer ── */
  const WEDDING_DATE = new Date('2026-11-20T15:00:00+05:30');

  function updateCountdown() {
    const now = new Date();
    let diff = WEDDING_DATE - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    const nums = document.querySelectorAll('.cd-num');
    if (nums.length >= 4) {
      nums[0].textContent = days;
      nums[1].textContent = hours;
      nums[2].textContent = String(mins).padStart(2, '0');
      nums[3].textContent = String(secs).padStart(2, '0');
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ── Scratch cards ── */
  const scratchCanvases = document.querySelectorAll('.scratch-canvas');
  scratchCanvases.forEach((canvas) => {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Draw rose-themed overlay (matches wedding palette)
    ctx.fillStyle = '#8a4f4c';
    ctx.fillRect(0, 0, w, h);
    // Add a subtle gradient shimmer
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, 'rgba(212,175,55,0.3)');
    grad.addColorStop(0.5, 'rgba(138,79,76,0.1)');
    grad.addColorStop(1, 'rgba(212,175,55,0.3)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#f5ecd4';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦ SCRATCH ✦', w / 2, h / 2 + 5);
    canvas.style.opacity = '1';
    canvas.style.display = 'block';

    let scratching = false;

    function scratch(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      checkProgress();
    }

    function checkProgress() {
      const data = ctx.getImageData(0, 0, w, h).data;
      let clear = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) clear++;
      }
      if (clear / (w * h) > 0.45) {
        canvas.style.opacity = '0';
        setTimeout(() => (canvas.style.display = 'none'), 400);
      }
    }

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches ? e.touches[0] : e;
      return {
        x: ((touch.clientX - rect.left) / rect.width) * w,
        y: ((touch.clientY - rect.top) / rect.height) * h,
      };
    }

    canvas.addEventListener('mousedown', (e) => {
      scratching = true;
      const p = getPos(e);
      scratch(p.x, p.y);
    });
    canvas.addEventListener('mousemove', (e) => {
      if (!scratching) return;
      const p = getPos(e);
      scratch(p.x, p.y);
    });
    canvas.addEventListener('mouseup', () => (scratching = false));
    canvas.addEventListener('mouseleave', () => (scratching = false));

    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      scratching = true;
      const p = getPos(e);
      scratch(p.x, p.y);
    });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!scratching) return;
      const p = getPos(e);
      scratch(p.x, p.y);
    });
    canvas.addEventListener('touchend', () => (scratching = false));
  });

  /* ── Petal canvas animation ── */
  const petalCanvas = document.getElementById('petals-canvas');
  if (petalCanvas) {
    const pctx = petalCanvas.getContext('2d');
    let petals = [];
    const PETAL_COUNT = 25;

    function resizeCanvas() {
      petalCanvas.width = window.innerWidth;
      petalCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function createPetal() {
      return {
        x: Math.random() * petalCanvas.width,
        y: -20,
        size: 6 + Math.random() * 8,
        speedY: 0.6 + Math.random() * 1.2,
        speedX: -0.5 + Math.random() * 1,
        rotation: Math.random() * 360,
        rotSpeed: -1 + Math.random() * 2,
        opacity: 0.4 + Math.random() * 0.5,
        color: ['#f7dcda', '#e2b4b1', '#fce4ec', '#f8bbd0', '#ffcdd2'][
          Math.floor(Math.random() * 5)
        ],
      };
    }

    for (let i = 0; i < PETAL_COUNT; i++) {
      const p = createPetal();
      p.y = Math.random() * petalCanvas.height;
      petals.push(p);
    }

    function drawPetal(p) {
      pctx.save();
      pctx.translate(p.x, p.y);
      pctx.rotate((p.rotation * Math.PI) / 180);
      pctx.globalAlpha = p.opacity;
      pctx.fillStyle = p.color;
      pctx.beginPath();
      pctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
      pctx.fill();
      pctx.restore();
    }

    function animatePetals() {
      pctx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > petalCanvas.height + 20) {
          Object.assign(p, createPetal());
        }
        drawPetal(p);
      });
      requestAnimationFrame(animatePetals);
    }
    animatePetals();
  }

  /* ── Simple scroll reveal ── */
  const reveals = document.querySelectorAll(
    '.reveal, .event-block, .venue-card, .cd-card'
  );
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translate(0, 0)';
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ── RSVP form → Google Sheet ─────────────────────────────────────────
   *  Responses are POSTed to a Google Apps Script Web App, which appends
   *  each RSVP as a row in your Google Sheet. The Apps Script code and the
   *  step-by-step setup are in `google-apps-script.gs` in this folder.
   *
   *  ONE-TIME SETUP (summary):
   *  1. Open your Google Sheet → Extensions → Apps Script.
   *  2. Paste the contents of `google-apps-script.gs`, then Save.
   *  3. Deploy → New deployment → type "Web app" →
   *       Execute as: Me   |   Who has access: Anyone
   *     Copy the Web app URL (https://script.google.com/macros/s/…/exec).
   *  4. Paste that URL into SHEET_ENDPOINT below.
   *
   *  Until SHEET_ENDPOINT is filled in, the form still shows the thank-you
   *  message but does not send anything (a warning is logged to the console).
   * ---------------------------------------------------------------------- */
  const SHEET_ENDPOINT =
    'https://script.google.com/macros/s/AKfycbz8OfpI0XLpsgPHVh0TJu-xF7Y8TrusWChrPTfoxYQSptjmguZlpb3O9w6447Q_1hCf/exec';

  const form = document.querySelector('.rsvp-form');
  if (form) {
    /* -- Event cards: toggle the visual tick when a card is clicked -- */
    form.querySelectorAll('.rsvp-event').forEach((box) => {
      const label = box.closest('label');
      const tick = label && label.querySelectorAll(':scope > div')[1];
      const svg = tick && tick.querySelector('svg');
      const paint = () => {
        if (!tick) return;
        tick.style.background = box.checked
          ? 'rgb(138, 79, 76)'
          : 'transparent';
        if (svg) svg.style.opacity = box.checked ? '1' : '0';
      };
      box.addEventListener('change', paint);
      paint();
    });

    /* -- "Will you join us?" radios: move the highlight on selection -- */
    const attendingInputs = form.querySelectorAll('input[name="attending"]');
    const paintAttending = () => {
      attendingInputs.forEach((inp) => {
        const lbl = inp.closest('label');
        if (!lbl) return;
        if (inp.checked) {
          lbl.style.background = 'rgb(138, 79, 76)';
          lbl.style.color = 'white';
          lbl.style.borderColor = 'rgb(138, 79, 76)';
        } else {
          lbl.style.background = 'rgb(255, 255, 255)';
          lbl.style.color = 'rgb(138, 79, 76)';
          lbl.style.borderColor = 'rgb(226, 215, 200)';
        }
      });
    };
    attendingInputs.forEach((inp) =>
      inp.addEventListener('change', paintAttending)
    );
    paintAttending();

    const submitBtn = form.querySelector('button');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const val = (id) => {
          const el = document.getElementById(id);
          return el ? el.value.trim() : '';
        };

        const name = val('rsvp-name');
        const phoneRaw = val('rsvp-phone');
        const phone = phoneRaw ? '+91' + phoneRaw : '';

        /* -- Validation -- */
        if (!name) {
          showToast('Please enter your name before sending the RSVP.', 'error');
          const el = document.getElementById('rsvp-name');
          if (el) el.focus();
          return;
        }
        if (!phoneRaw || phoneRaw.length < 10) {
          showToast('Please enter a valid 10-digit phone number.', 'error');
          const el = document.getElementById('rsvp-phone');
          if (el) el.focus();
          return;
        }

        const attendingEl = form.querySelector(
          'input[name="attending"]:checked'
        );
        const attending = attendingEl
          ? attendingEl.value === 'yes'
            ? 'Joyfully accept'
            : 'Regrettably decline'
          : '';
        const events = Array.from(
          form.querySelectorAll('.rsvp-event:checked')
        ).map((b) => b.value);

        /* -- Build the payload for the Google Sheet -- */
        const payload = {
          name: name,
          phone: phone,
          attending: attending,
          party: val('rsvp-party'),
          song: val('rsvp-song'),
          events: events.join(', '),
          advice: val('rsvp-advice'),
        };

        const finish = () => {
          showToast(
            "Thank you for your RSVP! 🎉 We can't wait to celebrate with you!",
            'success'
          );
          form.reset();
          // repaint toggles to match the reset (default) state
          form
            .querySelectorAll('.rsvp-event')
            .forEach((b) => b.dispatchEvent(new Event('change')));
          paintAttending();
        };

        const configured =
          typeof SHEET_ENDPOINT === 'string' &&
          SHEET_ENDPOINT.indexOf('script.google.com') !== -1;

        if (configured) {
          // Use a hidden iframe + real HTML form submission.
          // This is the most reliable way to send data to Google Apps
          // Script — avoids all CORS/no-cors/opaque-response issues.
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="rsvp-spinner"></span> Sending...';
          submitBtn.style.opacity = '0.7';

          const iframeName = 'rsvp_iframe_' + Date.now();
          const iframe = document.createElement('iframe');
          iframe.name = iframeName;
          iframe.style.display = 'none';
          document.body.appendChild(iframe);

          const hiddenForm = document.createElement('form');
          hiddenForm.method = 'POST';
          hiddenForm.action = SHEET_ENDPOINT;
          hiddenForm.target = iframeName;
          hiddenForm.style.display = 'none';

          Object.keys(payload).forEach((key) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = payload[key];
            hiddenForm.appendChild(input);
          });

          document.body.appendChild(hiddenForm);
          hiddenForm.submit();

          // Clean up and show success after a short delay
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send RSVP';
            submitBtn.style.opacity = '1';
            hiddenForm.remove();
            iframe.remove();
            finish();
          }, 2000);
        } else {
          console.warn(
            'RSVP not sent: set SHEET_ENDPOINT to your Apps Script Web App URL in index.js.'
          );
          finish();
        }
      });
    }
  }

  /* ── Venue button ── */
  const venueBtn = document.querySelector('.venue-btn');
  if (venueBtn) {
    venueBtn.addEventListener('click', () => {
      window.open('https://maps.app.goo.gl/Paa2zZ3nJZ9rDPaq6', '_blank');
    });
  }
})();
