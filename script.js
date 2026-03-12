/* script.js
   Interactions for FARFALINA service landing page
   - Mobile menu toggle
   - Sticky header class on scroll
   - Smooth anchor scrolling
   - Reveal on scroll (IntersectionObserver)
   - FAQ accordion behavior
   - Simple testimonial slider
   - Floating WhatsApp minor behavior
   - Sticky mobile CTA show/hide on scroll
*/

document.addEventListener('DOMContentLoaded', function(){
  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  hamburger.addEventListener('click', ()=>{
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    if(mobileNav.hasAttribute('hidden')) mobileNav.removeAttribute('hidden'); else mobileNav.setAttribute('hidden','');
  });

  // Sticky header shadow toggle
  const header = document.getElementById('site-header');
  const hero = document.getElementById('hero');
  const headerObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) header.classList.add('scrolled'); else header.classList.remove('scrolled');
    });
  },{root:null,threshold:0,rootMargin:'-80px 0px 0px 0px'});
  if(hero) headerObserver.observe(hero);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click', function(e){
      const hash = this.getAttribute('href');
      if(hash.length>1){
        const target = document.querySelector(hash);
        if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});
          // close mobile nav if open
          if(!mobileNav.hasAttribute('hidden')) mobileNav.setAttribute('hidden','');
        }
      }
    });
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');}
    });
  },{threshold:0.12});
  reveals.forEach(r=>revealObserver.observe(r));

  // FAQ accordion
  document.querySelectorAll('.accordion .accordion-item').forEach(item=>{
    const btn = item.querySelector('.acc-toggle');
    const panel = item.querySelector('.acc-panel');
    btn.addEventListener('click', ()=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if(!expanded){
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.style.maxHeight = null;
      }
    });
  });

  // Testimonial slider (scrollable track)
  (function(){
    const track = document.getElementById('review-track');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    if(!track || !prevBtn || !nextBtn) return;
    const getStep = ()=>{
      const card = track.querySelector('.review-card');
      if(!card) return track.clientWidth;
      const gap = parseInt(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 16,10);
      return card.offsetWidth + gap;
    };
    prevBtn.addEventListener('click', ()=>{
      track.scrollBy({left: -getStep(), behavior:'smooth'});
    });
    nextBtn.addEventListener('click', ()=>{
      track.scrollBy({left: getStep(), behavior:'smooth'});
    });
  })();

  // Floating WhatsApp small pulse when near top
  const whatsapp = document.querySelector('.whatsapp-fab');
  let lastScroll = window.scrollY;
  const mobileCta = document.getElementById('mobile-cta');
  window.addEventListener('scroll', ()=>{
    const current = window.scrollY;
    // show mobile CTA on small screens when not at top
    if(window.innerWidth<=800){
      if(current>120) mobileCta.style.display='flex'; else mobileCta.style.display='none';
    }
    // minor pulse when user scrolls up quickly
    if(whatsapp){
      if(current < lastScroll - 60){ whatsapp.classList.add('pulse'); setTimeout(()=>whatsapp.classList.remove('pulse'),600); }
    }
    lastScroll = current;
  });

  // Simple contact form stub (visual feedback)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Enviando…'; btn.disabled = true;
      setTimeout(()=>{ btn.textContent = 'Enviar solicitud'; btn.disabled = false; alert('Gracias — hemos recibido tu solicitud. Nos contactaremos pronto.'); form.reset(); }, 900);
    });
  }

});

/* Small CSS class for whatsapp pulse */
try{const style=document.createElement('style');style.innerHTML='.whatsapp-fab.pulse{transform:scale(1.07);transition:transform 260ms ease}';document.head.appendChild(style);}catch(e){}
