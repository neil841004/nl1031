import{D as ae,d as ve,f as be,u as we,h as ft,r as A,g as T,i as Z,$ as Bt,S as D,p as G,c as _,e as H,j as At,k as ne,s as dt,P as R,l as $e,m as ke,n as xe,C as pt,o as wt,b as ie,t as Tt}from"./photos-Dlfpsx2v.js";const X={get(e,t){try{const s=localStorage.getItem(e);return s?JSON.parse(s):t}catch{return t}},set(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}},i={api:null,guest:X.get("nl:guest",null),config:ve,quiz:ae,likes:{},myLikes:new Set(X.get("nl:likes",[])),notes:[],board:[],result:X.get("nl:result",null),stats:{guests:0,notes:0,players:0,likes:0},booted:!1,online:!0,since:0},lt=new Map;function W(e,t){return lt.has(e)||lt.set(e,new Set),lt.get(e).add(t),()=>lt.get(e).delete(t)}function B(...e){for(const t of e)lt.get(t)?.forEach(s=>s())}let qe=null;const ot=()=>qe??(qe=be().then(e=>i.api=e));function at(e){i.online!==e&&(i.online=e,B("net"))}function Se(e){const t={gid:i.guest?.gid??we(),name:e};i.guest=t,X.set("nl:guest",t),B("guest");const s=async a=>{try{await(await ot()).join(e,t.gid),Ct=null,Xt()}catch{a>0&&setTimeout(()=>s(a-1),4e3)}};return s(5),t}let Ct=null;function Xt(){return i.guest?Ct??(Ct=(async()=>{try{const e=await ot();let t=await e.boot(i.guest.gid);if(t.known===!1){const s=await e.join(i.guest.name,i.guest.gid);i.guest=s,X.set("nl:guest",s),nt=new Set,X.set("nl:likes-sent",[]),t=await e.boot(s.gid),i.result=null,X.set("nl:result",null)}i.config=t.config,i.quiz=t.quiz.length?t.quiz:ae,nt=new Set(t.myLikes),U||(i.myLikes=new Set(t.myLikes)),i.likes=t.likes,Ht(),i.notes=Nt(t.notes),i.board=t.board,i.result=t.result??i.result,t.result&&X.set("nl:result",t.result),i.stats=t.stats,i.since=t.now,i.booted=!0,at(!0),B("likes","notes","board","stats","result","config"),U&&ht()}catch{at(!1),setTimeout(()=>(Ct=null,Xt()),6e3)}})()):Promise.resolve()}let gt=0,yt=!1;function Le(){if(yt)return;yt=!0;const e=async()=>{if(gt=0,!yt)return;if(document.visibilityState==="visible"&&i.booted&&i.guest)try{const a=await(await ot()).poll(i.guest.gid,i.since);!U&&!bt&&(i.likes=a.likes,Ht(),B("likes"));const n=new Set(i.notes.map(w=>w.id)),l=a.notes.filter(w=>!n.has(w.id)),r=new Set(a.hidden),f=i.notes.length;i.notes=Nt([...i.notes.filter(w=>!r.has(w.id)),...l]),(l.length||i.notes.length!==f)&&B("notes"),i.board=a.board,i.stats=a.stats,i.config=a.config,i.since=Math.max(i.since,a.now-6e4),at(!0),B("board","stats","config")}catch{at(!1)}const t=i.api?.kind==="local"?4e3:2e4+Math.random()*8e3;gt=window.setTimeout(e,t)};e(),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&yt&&gt&&(clearTimeout(gt),e())})}let U=X.get("nl:likes-dirty",!1),bt=!1,nt=new Set(X.get("nl:likes-sent",[])),ut=0;function Ht(){for(const e of new Set([...i.myLikes,...nt])){const t=(i.myLikes.has(e)?1:0)-(nt.has(e)?1:0);t&&(i.likes[e]=Math.max(0,(i.likes[e]??0)+t))}}function Ot(e){return i.myLikes.has(e)}function oe(e){return i.likes[e]??0}function ze(e,t){const s=i.myLikes.has(e),a=t??!s;return a===s||(a?i.myLikes.add(e):i.myLikes.delete(e),i.likes[e]=Math.max(0,(i.likes[e]??0)+(a?1:-1)),X.set("nl:likes",[...i.myLikes]),U=!0,X.set("nl:likes-dirty",!0),B("likes"),clearTimeout(ut),ut=window.setTimeout(ht,900)),a}async function ht(){if(!i.guest||bt)return;bt=!0;const e=new Set(i.myLikes);U=!1;try{const s=await(await ot()).setLikes(i.guest.gid,[...e]);nt=e,X.set("nl:likes-sent",[...nt]),i.likes=s.likes,Ht(),X.set("nl:likes-dirty",U),at(!0),B("likes")}catch{U=!0,at(!1),ut=window.setTimeout(ht,8e3)}finally{bt=!1,U&&(clearTimeout(ut),ut=window.setTimeout(ht,900))}}window.addEventListener("pagehide",()=>{U&&ht()});function Nt(e){return[...e].sort((t,s)=>s.ts-t.ts)}async function Ee(e,t){const a=await(await ot()).postNote(i.guest.gid,i.guest.name,e,t);return i.notes=Nt([a,...i.notes.filter(n=>n.id!==a.id)]),t||i.stats.notes++,B("notes","stats"),a}const V={get:()=>X.get(`nl:quiz:${i.guest?.gid}`,null),set:e=>X.set(`nl:quiz:${i.guest?.gid}`,e)};async function Me(e,t){const s=await ot(),a=await s.submitQuiz(i.guest.gid,i.guest.name,e,t);return i.result=a,X.set("nl:result",a),B("result"),s.poll(i.guest.gid,i.since).then(n=>{i.board=n.board,i.stats=n.stats,B("board","stats")},()=>{}),a}const st=[];let It=0;function re(e){history.pushState({overlay:!0},"");const t={close:e,done:!1};return st.push(t),()=>{if(t.done)return;t.done=!0;const s=st.indexOf(t);s>=0&&st.splice(s,1),It++,history.back()}}addEventListener("popstate",()=>{if(It){It--;return}const e=st.pop();e&&!e.done&&(e.done=!0,e.close())});function Te(){for(;st.length;){const e=st.pop();e.done||(e.done=!0,e.close())}}const Ce="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",$t=(e="")=>`<svg class="${e}" viewBox="0 0 24 24" aria-hidden="true"><path d="${Ce}"/></svg>`;function le(e){const t=Ot(e);return`<button class="like ${t?"on":""}" data-like="${e}" aria-pressed="${t}" aria-label="喜歡這張照片">
    <span class="like-icon">${$t("o")}${$t("f")}</span>
    <span class="like-n" data-count="${e}">${Z(oe(e))}</span>
  </button>`}let Ie=null;const ce=()=>Ie??(Ie=document.body.appendChild(T('<div class="heart-layer" aria-hidden="true"></div>'))),Qt=["var(--heart)","var(--heart)","#f07b8c","#f6b3bd","#ffffff","#c92f4a"];function de(e,t,s=22){if(A())return;const a=ce();for(let n=0;n<s;n++){const l=T(`<span class="burst">${$t()}</span>`),r=10+Math.random()*22;l.style.cssText=`left:${e}px;top:${t}px;width:${r}px;height:${r}px;color:${Qt[n%Qt.length]}`,a.appendChild(l);const f=-Math.PI/2+(Math.random()-.5)*Math.PI*1.25,w=50+Math.random()*150,x=Math.cos(f)*w,y=Math.sin(f)*w-40-Math.random()*80,m=(Math.random()-.5)*70,$=850+Math.random()*650;l.animate([{transform:"translate(-50%,-50%) scale(0.2) rotate(0deg)",opacity:0},{transform:`translate(calc(-50% + ${x*.35}px), calc(-50% + ${y*.35}px)) scale(1.15) rotate(${m*.5}deg)`,opacity:1,offset:.22},{transform:`translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0.85) rotate(${m}deg)`,opacity:0}],{duration:$,delay:Math.random()*120,easing:"cubic-bezier(0.22, 1, 0.36, 1)",fill:"both"}).onfinish=()=>l.remove()}}function pe(e,t,s){const a=e.getBoundingClientRect(),n=t??a.left+a.width/2,l=s??a.top+a.height/2,r=T(`<span class="big-heart">${$t()}</span>`);if(r.style.cssText=`left:${n}px;top:${l}px`,ce().appendChild(r),A()){r.animate([{opacity:1},{opacity:0}],{duration:600}).onfinish=()=>r.remove();return}r.animate([{transform:"translate(-50%,-50%) scale(0)",opacity:0},{transform:"translate(-50%,-50%) scale(1.18)",opacity:1,offset:.25},{transform:"translate(-50%,-50%) scale(0.96)",opacity:1,offset:.4},{transform:"translate(-50%,-50%) scale(1)",opacity:1,offset:.7},{transform:"translate(-50%,-62%) scale(0.9)",opacity:0}],{duration:1e3,easing:"cubic-bezier(0.22, 1, 0.36, 1)"}).onfinish=()=>r.remove(),de(n,l,16)}function Pt(e,t,s){const a=ze(e,s);if(a){ft(10);const n=t??document.querySelector(`[data-like="${e}"]`);if(n){const l=n.querySelector(".like-icon").getBoundingClientRect();de(l.left+l.width/2,l.top+l.height/2)}}return a}function Ae(){document.addEventListener("click",t=>{const s=t.target.closest("[data-like]");s&&(t.stopPropagation(),Pt(s.dataset.like,s))});let e={};W("likes",()=>{for(const t of Bt("[data-like]")){const s=t.dataset.like,a=Ot(s);t.classList.contains("on")!==a&&(t.classList.toggle("on",a),t.setAttribute("aria-pressed",String(a)),a&&t.querySelector(".f")?.animate([{transform:"scale(0.4)"},{transform:"scale(1.25)"},{transform:"scale(1)"}],{duration:420,easing:"cubic-bezier(0.22, 1, 0.36, 1)"}))}for(const t of Bt("[data-count]")){const s=t.dataset.count,a=oe(s);t.textContent!==Z(a)&&Xe(t,a,(e[s]??a)<a),e[s]=a}})}function Xe(e,t,s=!0){const a=Z(t);if(A()||!e.isConnected){e.textContent=a;return}e.animate([{transform:"translateY(0)",opacity:1},{transform:`translateY(${s?-60:60}%)`,opacity:0}],{duration:160,easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"}).onfinish=()=>{e.textContent=a,e.animate([{transform:`translateY(${s?60:-60}%)`,opacity:0},{transform:"translateY(0)",opacity:1}],{duration:260,easing:"cubic-bezier(0.22, 1, 0.36, 1)"})}}function it(e){Gt(e),document.fonts?.ready.then(()=>Gt(e))}function Gt(e){e.querySelectorAll("[data-fit]").forEach(t=>{const s=t.closest("[data-fit-box]")??t.parentElement.closest("h1, h2, p, div, a"),a=Number(t.dataset.fit)||1/0;t.style.fontSize="100px",t.style.whiteSpace="nowrap",t.style.display="inline-block";const n=t.getBoundingClientRect().width,l=getComputedStyle(s),r=s.clientWidth-parseFloat(l.paddingLeft)-parseFloat(l.paddingRight);n&&r>0&&(t.style.fontSize=`${Math.min(a,Math.floor(100*r/n*.99*10)/10)}px`),t.style.display=""})}const Ut=["3650","3531","3673","3736","3789"],He=3600;function Oe(e){const t=i.guest,s=T(`<main class="screen intro">
    <div class="intro-photo" aria-hidden="true">
      ${Ut.map((y,m)=>G(_.get(y),{eager:m===0,pos:!1,sizes:"100vw",cls:`shot${m===0?" now":""}`})).join("")}
    </div>
    <div class="intro-scrim" aria-hidden="true"></div>
    <header class="intro-head meta-row caps rise" style="--d:200ms">
      <span>${D.brideEn} &amp; ${D.groomEn}</span><span>10 . 31</span><span>continue...</span>
    </header>
    <div class="intro-title">
      <p class="intro-just script write" style="--d:700ms" aria-hidden="true">just</p>
      <h1 class="intro-name" data-fit-box>
        <span class="mask"><span class="display" data-fit style="--d:250ms">Married</span></span>
        <span class="sr">${D.groom}與${D.bride}的婚禮</span>
      </h1>
      <p class="intro-line caps rise" style="--d:900ms">${D.groom} × ${D.bride}　·　${D.date}　·　${D.venue}</p>
    </div>
    <div class="intro-card">
      ${t?`<div class="intro-ask rise" style="--d:1100ms">
              <p class="ask-label caps">Welcome back</p>
              <p class="ask-q">歡迎回來，${H(t.name)}。</p>
              <div class="ask-row">
                <a class="btn" href="#/home">繼續 <span class="en">continue</span></a>
                <button class="btn quiet" type="button" data-rename>換個稱呼</button>
              </div>
            </div>`:""}
      <form class="intro-ask rise" style="--d:1100ms" ${t?"hidden":""} novalidate>
        <p class="ask-label caps" aria-hidden="true">Your name</p>
        <label class="ask-q" for="guest-name">我們該怎麼稱呼你？</label>
        <div class="ask-field">
          <input id="guest-name" name="name" type="text" autocomplete="nickname" enterkeyhint="go" maxlength="20"
            placeholder="例如：阿哲、王伯伯、大安圖傳 103" aria-describedby="name-note" />
          <button class="btn ask-go" type="submit">進場 <span class="en">continue...</span></button>
        </div>
        <p class="ask-note" id="name-note">這個稱呼會出現在你的紙條與排行榜上。</p>
      </form>
    </div>
  </main>`);e.append(s),At(s),it(s);const a=[...s.querySelectorAll(".shot")];Ut.slice(1).forEach(y=>ne(y));let n=0;const l=A()?0:window.setInterval(()=>{const y=a[n];n=(n+1)%a.length;const m=a[n];a.forEach($=>$.classList.remove("top")),y.classList.add("under"),m.classList.remove("now","under"),m.offsetWidth,m.classList.add("now","top"),setTimeout(()=>y.classList.remove("now","under"),1600)},He),r=s.querySelector("form"),f=r.querySelector("input"),w=r.querySelector(".ask-go");f.addEventListener("focus",()=>s.classList.add("typing")),f.addEventListener("blur",()=>setTimeout(()=>s.classList.remove("typing"),120)),s.querySelector("[data-rename]")?.addEventListener("click",()=>{s.querySelector(".intro-ask:not(form)")?.remove(),r.hidden=!1,f.value=t?.name??"",f.focus()}),r.addEventListener("submit",async y=>{y.preventDefault();const m=f.value.trim().replace(/\s+/g," ").slice(0,20);if(!m){f.focus(),r.querySelector(".ask-field").animate([{transform:"translateX(0)"},{transform:"translateX(-6px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:360,easing:"cubic-bezier(0.22, 1, 0.36, 1)"});return}w.disabled=!0,Se(m),f.blur(),s.classList.add("leaving"),setTimeout(()=>location.hash="#/home",A()?0:420)});const x=()=>it(s);return addEventListener("resize",x),()=>{clearInterval(l),removeEventListener("resize",x)}}function kt(e){const t=(s,a)=>`<a href="#/${s}" ${e===s?'aria-current="page"':""}>${a}</a>`;return`<header class="bar">
    <a class="mark" href="#/home" aria-label="回到首頁">Linda &amp; Neil</a>
    <nav aria-label="主選單">${t("album","相冊")}${t("notes","紙條")}${t("quiz","遊戲")}</nav>
  </header>`}function Ne(e){if(!("IntersectionObserver"in window))return()=>{};e.classList.add("js-reveal");const t=new IntersectionObserver(a=>{for(const n of a)n.isIntersecting&&(n.target.classList.add("in"),t.unobserve(n.target))},{rootMargin:"0px 0px -8% 0px"}),s=()=>e.querySelectorAll("[data-reveal]:not(.in)").forEach(a=>t.observe(a));return s(),Object.assign(()=>t.disconnect(),{watch:s})}function ue(e){const t=i.guest,s=T(`<div class="screen home screen-enter">
    ${kt("home")}
    <main>
      <section class="hello">
        <div class="hello-grid">
          <div class="hello-photo big rise">${G(_.get("3605"),{sizes:"62vw",eager:!0})}</div>
          <div class="hello-vert rise" style="--i:1" aria-hidden="true"><span class="caps vert">Celebrate&nbsp;&nbsp;with you</span></div>
        </div>
        <div class="hello-grid two">
          <div class="hello-photo rise" style="--i:2">${G(_.get("3600"),{sizes:"50vw"})}</div>
          <div class="hello-photo rise" style="--i:3">${G(_.get("3588"),{sizes:"50vw"})}</div>
        </div>
        <p class="caps hello-kicker rise" style="--i:3">Welcome</p>
        <h1 class="hello-h rise" style="--i:4">${H(t.name)}，<br>歡迎你來。</h1>
        <p class="hello-p rise" style="--i:5">這裡有我們的婚紗照、可以傳給我們的紙條，和一份關於我們兩個人的小考。</p>
        <p class="caps hello-count" data-stat-guests></p>
      </section>

      <a class="door door-album" href="#/album">
        <div class="door-bg">${G(_.get("3627"),{sizes:"100vw"})}</div>
        <div class="door-scrim" aria-hidden="true"></div>
        <p class="door-top caps meta-row"><span>Chapter 01</span><span data-album-meta></span></p>
        <p class="door-script script" data-reveal aria-hidden="true">our</p>
        <h2 class="door-display display" data-fit-box><span data-fit>Album</span></h2>
        <p class="door-zh" data-reveal>相冊<span class="caps">翻開 →</span></p>
      </a>

      <a class="door door-notes" href="#/notes">
        <div class="door-blur" style="background-image:url(${dt("3686",640)})" aria-hidden="true"></div>
        <div class="door-inset" data-reveal>${G(_.get("3686"),{sizes:"60vw"})}</div>
        <div class="door-notes-copy">
          <p class="caps" data-reveal>Leave us a note</p>
          <h2 class="door-zh" data-reveal>傳紙條</h2>
          <blockquote class="door-quote" data-latest-note data-reveal></blockquote>
          <p class="caps meta-row"><span data-notes-meta></span><span>2026</span></p>
        </div>
      </a>

      <a class="door door-quiz" href="#/quiz">
        <div class="door-quiz-photo" data-reveal>${G(_.get("3646"),{sizes:"70vw"})}</div>
        <p class="caps door-quiz-label" data-reveal>| &nbsp;How well do you know us&nbsp; |</p>
        <h2 class="door-zh" data-reveal>考考你</h2>
        <p class="door-sub" data-quiz-sub data-reveal></p>
        <p class="caps door-go" data-reveal><span data-quiz-meta></span> →</p>
      </a>
    </main>

    <footer class="home-foot">
      <p class="caps meta-row foot-years"><span>2011</span><i aria-hidden="true"></i><span>2026</span></p>
      <p class="foot-script script" aria-hidden="true">Thank you</p>
      <p class="foot-display display" data-fit-box><span data-fit>Our story</span></p>
      <div class="foot-row">
        <p>${D.groom} × ${D.bride}<br>${D.date}　${D.venue}</p>
        <a class="btn quiet" href="#/">換個稱呼</a>
      </div>
    </footer>
  </div>`);e.append(s),At(s),it(s);const a=Ne(s),n=w=>s.querySelector(w),l=()=>{const w=i.stats;n("[data-stat-guests]").textContent=w.guests>1?`${Z(w.guests)} guests are here　·　已經有 ${Z(w.guests)} 位賓客進場`:"";const x=i.myLikes.size;n("[data-album-meta]").textContent=x?`${R.length} photos · ♡ ${x}`:`${R.length} photos`;const y=i.notes.find(S=>!S.private);n("[data-latest-note]").innerHTML=y?`<p>「${H(y.text.length>40?y.text.slice(0,40)+"…":y.text)}」</p><cite>— ${H(y.name)}</cite>`:"<p>還沒有人傳紙條。你可以當第一個。</p>",n("[data-notes-meta]").textContent=w.notes?`${Z(w.notes)} notes`:"write the first one";const m=i.result,$=V.get(),O=i.quiz.length;n("[data-quiz-sub]").textContent=m?`你答對了 ${m.score} 題，答對率 ${m.pct}%。`:$&&$.answers.length?`你寫到第 ${$.answers.length} 題，回來把它寫完吧。`:`${O} 題選擇題，沒有時間限制，每個人只有一次機會。`,n("[data-quiz-meta]").textContent=m?"看排行榜":$?.answers.length?"繼續作答":"開始作答"};l();const r=[W("stats",l),W("notes",l),W("likes",l),W("result",l),W("config",l)],f=()=>it(s);return addEventListener("resize",f),()=>{r.forEach(w=>w()),a(),removeEventListener("resize",f)}}let Lt=null,Kt=!1;function Pe(e){if(Lt)return;let t=R.findIndex(u=>u.id===e);if(t<0)return;const s=document.activeElement,a=T(`<div class="lightbox" role="dialog" aria-modal="true" aria-label="照片">
    <div class="lb-top">
      <p class="lb-n" aria-live="polite"></p>
      <button class="lb-x" type="button" aria-label="關閉">關閉</button>
    </div>
    <div class="lb-track"></div>
    <div class="lb-foot">
      <div class="lb-like"></div>
      <p class="lb-hint" hidden>把手機轉橫，看得更清楚</p>
    </div>
  </div>`);Lt=a,document.body.append(a),document.documentElement.style.overflow="hidden";const n=a.querySelector(".lb-track");requestAnimationFrame(()=>a.classList.add("open"));const l=u=>{const b=R[u];return b?T(`<div class="lb-slide" data-id="${b.id}">
      <img src="${dt(b.id,1280)}" srcset="${ke(b.id)}" sizes="100vw" alt="" style="aspect-ratio:${b.w}/${b.h};background:${b.color} url(${b.lqip}) center/cover" decoding="async">
    </div>`):T('<div class="lb-slide"></div>')};let r=[];const f=()=>{r=[l(t-1),l(t),l(t+1)],n.replaceChildren(...r),r.forEach((q,C)=>q.style.transform=`translateX(${(C-1)*100}%)`);const u=R[t];a.querySelector(".lb-n").textContent=`${t+1} / ${R.length}`,a.querySelector(".lb-like").innerHTML=le(u.id);const b=!Kt&&$e(u)&&innerHeight>innerWidth;a.querySelector(".lb-hint").hidden=!b,b&&(Kt=!0),[t-1,t+1].forEach(q=>R[q]&&(new Image().src=dt(R[q].id,1280))),c={s:1,x:0,y:0}};f();const w=()=>{a.classList.remove("open"),a.classList.add("closing"),document.documentElement.style.overflow="",removeEventListener("keydown",O),setTimeout(()=>a.remove(),A()?0:300),Lt=null,s?.focus?.()},x=re(w),y=()=>{x(),w()},m=u=>{const b=t+u;if(!R[b])return $(0);$(-u*100,()=>{t=b,f()})};function $(u,b){n.style.transition=A()?"none":"transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",n.style.transform=`translateX(${u}%)`;const q=()=>{n.style.transition="none",n.style.transform="translateX(0)",b?.()};A()?q():setTimeout(q,330)}const O=u=>{u.key==="Escape"?y():u.key==="ArrowRight"?m(1):u.key==="ArrowLeft"&&m(-1)};addEventListener("keydown",O),a.querySelector(".lb-x").addEventListener("click",y),setTimeout(()=>a.querySelector(".lb-x").focus({preventScroll:!0}),50);const S=new Map;let c={s:1,x:0,y:0},d=null,k=0,g=0;const z=()=>r[1]?.querySelector("img"),M=()=>{const u=z();u&&(u.style.transform=`translate(${c.x}px, ${c.y}px) scale(${c.s})`)};n.addEventListener("pointerdown",u=>{if(n.setPointerCapture(u.pointerId),S.set(u.pointerId,{x:u.clientX,y:u.clientY}),S.size===2){const[b,q]=[...S.values()];d={kind:"pinch",x0:0,y0:0,d0:Math.hypot(b.x-q.x,b.y-q.y),s0:c.s,t:performance.now()},n.style.transform="translateX(0)",z()&&(z().src=dt(R[t].id,2048))}else d={kind:c.s>1?"pan":"pending",x0:u.clientX,y0:u.clientY,zx:c.x,zy:c.y,t:performance.now()}}),n.addEventListener("pointermove",u=>{if(!S.has(u.pointerId)||!d)return;if(S.set(u.pointerId,{x:u.clientX,y:u.clientY}),d.kind==="pinch"&&S.size===2){const[C,I]=[...S.values()];c.s=Math.max(1,Math.min(4,d.s0*Math.hypot(C.x-I.x,C.y-I.y)/d.d0)),c.s===1&&(c.x=c.y=0),M();return}const b=u.clientX-d.x0,q=u.clientY-d.y0;if(d.kind==="pan"){c.x=d.zx+b,c.y=d.zy+q,M();return}if(d.kind==="pending"&&Math.hypot(b,q)>8&&(d.kind=Math.abs(b)>Math.abs(q)?"swipe":"down"),d.kind==="swipe"&&(n.style.transform=`translateX(${b}px)`),d.kind==="down"){const C=Math.max(0,q);n.style.transform=`translateY(${C}px) scale(${1-Math.min(.15,C/2e3)})`,a.style.setProperty("--fade",String(Math.max(.3,1-C/400)))}});const N=u=>{if(!S.has(u.pointerId))return;const b=S.get(u.pointerId);if(S.delete(u.pointerId),!d)return;const q=d.kind;if(q==="pinch"){if(S.size===0)d=null;else{const[j]=[...S.values()];d={kind:c.s>1?"pan":"pending",x0:j.x,y0:j.y,zx:c.x,zy:c.y,t:performance.now()}}return}const C=b.x-d.x0,I=b.y-d.y0,K=performance.now()-d.t;if(d=null,q==="swipe"){const j=n.clientWidth;C<-j*.2||C<-40&&K<250?m(1):C>j*.2||C>40&&K<250?m(-1):(n.style.transition="transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",n.style.transform="translateX(0)");return}if(q==="down"){I>110?y():(n.style.transition="transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",n.style.transform="",a.style.setProperty("--fade","1"));return}if(q==="pan"||Math.hypot(C,I)>10)return;const tt=performance.now();if(tt-k<300){if(clearTimeout(g),k=0,c.s>1){c={s:1,x:0,y:0},M();return}const j=R[t].id;Pt(j,a.querySelector("[data-like]"),!0),pe(n,u.clientX,u.clientY),ft(10);return}k=tt,g=window.setTimeout(()=>a.classList.toggle("bare"),300)};n.addEventListener("pointerup",N),n.addEventListener("pointercancel",N),n.addEventListener("transitionend",()=>n.style.transition="none")}function he(e,t={}){const s=document.activeElement,a=T(`<div class="sheet ${t.cls??""}" role="dialog" aria-modal="true" aria-label="${t.label??""}">
    <div class="sheet-scrim" data-close></div>
    <div class="sheet-paper">
      <div class="sheet-grip" aria-hidden="true"></div>
      <button class="sheet-x" type="button" data-close aria-label="關閉">關閉</button>
      <div class="sheet-body">${e}</div>
    </div>
  </div>`);document.body.append(a),document.documentElement.style.overflow="hidden";const n=a.querySelector(".sheet-paper");requestAnimationFrame(()=>a.classList.add("open"));let l=!1;const r=()=>{l||(l=!0,a.classList.remove("open"),a.classList.add("closing"),document.documentElement.style.overflow="",removeEventListener("keydown",w),setTimeout(()=>a.remove(),A()?0:320),s?.focus?.(),t.onClose?.())},f=re(r);a.close=()=>{f(),r()};const w=$=>$.key==="Escape"&&a.close();addEventListener("keydown",w),a.addEventListener("click",$=>{$.target.closest("[data-close]")&&a.close()});let x=-1;const y=a.querySelector(".sheet-grip");y.addEventListener("pointerdown",$=>{x=$.clientY,y.setPointerCapture($.pointerId),n.style.transition="none"}),y.addEventListener("pointermove",$=>{x<0||(n.style.transform=`translateY(${Math.max(0,$.clientY-x)}px)`)});const m=$=>{if(x<0)return;const O=$.clientY-x;x=-1,n.style.transition="",n.style.transform="",O>90&&a.close()};return y.addEventListener("pointerup",m),y.addEventListener("pointercancel",m),setTimeout(()=>a.querySelector("[autofocus], .sheet-body button, .sheet-body textarea")?.focus({preventScroll:!0}),60),a}const Q=xe(),rt=Q.length,zt={studio:{script:"with you",display:"Smile"},meadow:{script:"Love",display:"Meadow"},sea:{script:"Peace",display:"Seaside"},golden:{script:"Happy",display:"Golden"},tide:{script:"forever",display:"Soul mate"}},Vt=["♡ we are married ♡","| a good mood |","| you &amp; me |","stay with you","together for life","music | faith | life","beautiful","soul mate"],ct=e=>Vt[e%Vt.length],_t=e=>ct(e).replace(/[|♡]/g,"").trim(),Ye=["01","02","03","04","05"],Re=new Map(Q.flatMap(e=>"photos"in e?e.photos:[]).map((e,t)=>[e.id,t+1])),fe=e=>!e||e.kind==="cover"?pt[0]:e.kind==="end"?pt[pt.length-1]:e.ch;function F(e,t="",s="(min-width: 700px) 30vw, 80vw"){return`<figure class="pf ${t}" data-photo="${e.id}">
    ${G(e,{sizes:s,alt:""})}
    <figcaption class="pf-like">${le(e.id)}</figcaption>
  </figure>`}const vt=e=>`style="--n:${e.length}"`;function De(e){const t=Q[e];if(!t)return'<div class="page page-none"></div>';const s=fe(t),a=`class="page page-${t.kind}" data-ch="${s.key}"`;switch(t.kind){case"cover":return`<article ${a}>
        ${F(_.get("3654"),"bg","(min-width: 700px) 40vw, 100vw")}
        <div class="pg-scrim"></div>
        <p class="pg-top caps meta-row"><span>${D.brideEn} &amp; ${D.groomEn}</span><span>${R.length} photos</span><span>continue...</span></p>
        <div class="pg-title">
          <p class="pg-script script">in the</p>
          <h2 class="pg-display display" ${vt("Light")}>Light</h2>
          <p class="pg-sub caps">在光裡 · 婚紗相冊 · swipe ←</p>
        </div>
      </article>`;case"opener":{const n=zt[s.key],l=pt.findIndex(r=>r.key===s.key);return`<article ${a}>
        ${F(t.photos[0],"bg","(min-width: 700px) 40vw, 100vw")}
        <div class="pg-scrim"></div>
        <p class="pg-top caps meta-row"><span>Chapter ${Ye[l]}</span><span>${s.zh}</span><span>${s.count} photos</span></p>
        <div class="pg-title">
          <p class="pg-script script">${n.script}</p>
          <h2 class="pg-display display" ${vt(n.display)}>${n.display}</h2>
          <p class="pg-sub caps">${s.zh}　·　${wt(s)}</p>
        </div>
      </article>`}case"trio":{const[n,l,r]=t.photos;return`<article ${a}>
        <div class="trio${t.n%2?" flip":""}">
          ${F(n,"t-a")}
          <div class="t-panel"><span class="caps vert">${_t(t.n)}</span></div>
          ${F(l,"t-b","(min-width: 700px) 15vw, 50vw")}
          ${F(r,"t-c","(min-width: 700px) 15vw, 50vw")}
        </div>
      </article>`}case"split":{const[n,l]=t.photos;return`<article ${a}>
        <div class="split-block"></div>
        ${F(n,"s-p")}
        <p class="s-caps caps">${ct(t.n)}</p>
        ${F(l,"s-l","(min-width: 700px) 40vw, 100vw")}
      </article>`}case"full":return`<article ${a}>
        ${F(t.photos[0],"bg","(min-width: 700px) 40vw, 100vw")}
        <div class="pg-scrim low"></div>
        <p class="pg-foot caps">${ct(t.n)}</p>
      </article>`;case"caption":return`<article ${a}>
        ${F(t.photos[0],"c-photo","(min-width: 700px) 40vw, 100vw")}
        <p class="c-caps caps">${ct(t.n)}</p>
      </article>`;case"inset":{const[n,l]=t.photos;return`<article ${a}>
        <div class="i-blur" style="background-image:url(${dt(n.id,640)})"></div>
        ${F(n,"i-a framed")}
        ${F(l,"i-b framed")}
        <p class="i-foot caps meta-row"><span>${_t(t.n)}</span><span>2026</span></p>
      </article>`}case"lands":return`<article ${a}>
        <div class="lands">${t.photos.map(n=>F(n,"l-x","(min-width: 700px) 35vw, 85vw")).join("")}</div>
        <p class="l-caps caps">${s.zh}　·　${wt(s)}</p>
      </article>`;case"land":return`<article ${a}>
        <p class="pg-top caps meta-row"><span>${s.zh}</span><span>${ct(t.n)}</span></p>
        ${F(t.photos[0],"ld","(min-width: 700px) 35vw, 90vw")}
        <h2 class="pg-display display ld-word" ${vt(zt[s.key].display)}>${zt[s.key].display}</h2>
      </article>`;case"end":return`<article ${a}>
        <p class="pg-top caps meta-row"><span>2011</span><i aria-hidden="true"></i><span>2026</span></p>
        <div class="end-copy">
          <p class="end-zh">從前後座，<br>到往後餘生。</p>
          <p class="end-note">謝謝你把我們的相冊翻到最後。</p>
          <div class="end-actions">
            <a class="btn" href="#/notes">傳一張紙條給我們 <span class="arrow" aria-hidden="true">→</span></a>
            <button class="btn quiet" type="button" data-goto="0">回到第一頁</button>
          </div>
        </div>
        <div class="pg-title">
          <p class="pg-script script">Thank you</p>
          <h2 class="pg-display display" ${vt("Our story")}>Our story</h2>
        </div>
      </article>`}}function et(e){const t=T(De(e));return At(t),t.querySelectorAll("img.in").forEach(s=>s.style.transition="none"),t}function Fe(e,t){const s=T(`<div class="screen album">
    ${kt("album")}
    <div class="album-head">
      <p class="album-ch" aria-live="polite"><span data-zh></span><span class="latin" data-en></span></p>
      <p class="album-n" data-n></p>
    </div>
    <div class="book" role="region" aria-roledescription="相冊" aria-label="婚紗照相冊，左右滑動翻頁">
      <div class="stage"></div>
    </div>
    <div class="album-foot">
      <div class="album-progress" aria-hidden="true"><i></i></div>
      <div class="album-tools">
        <button class="tool" type="button" data-prev aria-label="上一頁">←</button>
        <button class="tool tool-toc" type="button" data-toc>目錄</button>
        <button class="tool" type="button" data-next aria-label="下一頁">→</button>
      </div>
    </div>
  </div>`);e.append(s);const a=s.querySelector(".book"),n=s.querySelector(".stage");let l=!1,r=0,f=[];const w=()=>l?Math.max(0,2*r-1):r,x=o=>r=l?Math.ceil(o/2):o,y=()=>l?Math.ceil((rt-1)/2):rt-1;function m(){const o=a.getBoundingClientRect(),p=w(),h=o.width>=700&&o.width/o.height>1.15,v=10,L=o.width-v*2,E=o.height-v*2;let P,Y;h?(Y=E,P=Math.min(L/2,Y*.5625)):(P=L,Y=E),n.style.width=`${h?P*2:P}px`,n.style.height=`${Y}px`,(h!==l||!f.length)&&(l=h,s.classList.toggle("is-wide",l),x(p),$())}function $(){n.replaceChildren(),f=l?[et(2*r-1),et(2*r)].map((o,p)=>O(o,p?"right":"left")):[O(et(r),"single")],n.append(...f),d(),k()}function O(o,p){const h=T(`<div class="slot slot-${p}"><div class="shade"></div></div>`);return h.prepend(o),h}function S(o,p){f[o].firstElementChild.replaceWith(et(p))}function c(){return Q[l?2*r<rt?2*r:2*r-1:r]}function d(){const o=c(),p=fe(o);s.querySelector("[data-zh]").textContent=o.kind==="cover"?"相冊":o.kind==="end"?"最後一頁":p.zh,s.querySelector("[data-en]").textContent=o.kind==="cover"?"In the light":o.kind==="end"?"The end":wt(p);const h=(l?[Q[2*r-1],Q[2*r]]:[o]).flatMap(Y=>Y&&"photos"in Y?Y.photos:[]),v=h.map(Y=>Re.get(Y.id)).sort((Y,qt)=>Y-qt),L=h[0];s.querySelector("[data-n]").textContent=v.length?`${v[0]}${v.length>1?`–${v[v.length-1]}`:""} / ${R.length}`:"";const E=(l?2*r:r)/(rt-1);s.querySelector(".album-progress i").style.transform=`scaleX(${Math.min(1,E)})`,s.querySelector("[data-prev]").disabled=r<=0,s.querySelector("[data-next]").disabled=r>=y();const P=o.kind==="opener"?o.ch.key:L?.id??o.kind;history.replaceState(null,"",`#/album/${P}`)}function k(){const o=w();for(let p=o-2;p<=o+(l?5:3);p++){const h=Q[p];h&&"photos"in h&&h.photos.forEach(v=>ne(v.id))}}let g=null,z=!1;function M(o){if(z||o===1&&r>=y()||o===-1&&r<=0)return null;let p,h,v;l?o===1?(p=2*r,h=2*r+1,S(1,2*r+2),v=f[1]):(p=2*r-2,h=2*r-1,S(0,2*r-3),v=f[0]):(p=o===1?r:r-1,h=-1,o===1&&S(0,r+1),v=f[0]);const L=T(`<div class="leaf ${l?"leaf-wide":""}">
      <div class="face front"></div><div class="face back"></div>
    </div>`);L.children[0].append(et(p),T('<div class="sheen"></div>')),L.children[1].append(h>=0?et(h):T('<div class="page page-back"></div>'),T('<div class="sheen"></div>')),n.append(L);const E={dir:o,leaf:L,under:v,angle:o===1?0:-180};return N(E,E.angle),E}function N(o,p){o.angle=p,o.leaf.style.transform=`rotateY(${p}deg)`;const h=-p/180,v=Math.sin(h*Math.PI);o.leaf.children[0].lastElementChild.style.opacity=String(h<.5?h*.9:0),o.leaf.children[1].lastElementChild.style.opacity=String(h>=.5?(1-h)*.9:0),o.leaf.style.setProperty("--lift",String(v)),o.under.querySelector(".shade").style.opacity=String(o.dir===1?(1-h)*.55*v+0:h*.55*v)}function u(o,p,h=0){z=!0;const v=p?o.dir===1?-180:0:o.dir===1?0:-180,L=o.angle,E=Math.abs(v-L),P=A()?1:Math.max(220,Math.min(620,E/180*620-Math.abs(h)*120)),Y=performance.now(),qt=St=>1-Math.pow(1-St,3),Wt=St=>{const jt=Math.min(1,(St-Y)/P);if(N(o,L+(v-L)*qt(jt)),jt<1)return requestAnimationFrame(Wt);b(o,p)};requestAnimationFrame(Wt)}function b(o,p){p&&(r+=o.dir),o.leaf.remove(),l?(S(0,2*r-1),S(1,2*r)):S(0,r),f.forEach(h=>h.querySelector(".shade").style.opacity="0"),g=null,z=!1,p&&(ft(6),d(),k())}function q(o){const p=M(o);p&&u(p,!0)}function C(o){z||(x(Math.max(0,Math.min(rt-1,o))),n.animate([{opacity:0},{opacity:1}],{duration:A()?1:420,easing:"ease"}),$())}let I=null,K=!1,tt=0,j=0,J=0,Yt=0,mt={t:0,id:""};a.addEventListener("pointerdown",o=>{z||o.target.closest("button, a")||(I={x:o.clientX,y:o.clientY,t:performance.now(),id:o.pointerId},K=!1,tt=o.clientX,j=I.t,J=0)}),a.addEventListener("pointermove",o=>{if(!I||o.pointerId!==I.id)return;const p=o.clientX-I.x,h=o.clientY-I.y;if(!K){if(Math.abs(p)<8||Math.abs(p)<Math.abs(h))return;if(g=M(p<0?1:-1),!g){I=null;return}K=!0,a.setPointerCapture(o.pointerId)}const v=performance.now();J=(o.clientX-tt)/Math.max(1,v-j),tt=o.clientX,j=v;const L=n.clientWidth/(l?2:1),E=Math.max(-1,Math.min(1,p/L));g.dir===1?N(g,Math.max(-180,Math.min(0,E*180))):N(g,Math.max(-180,Math.min(0,-180+E*180)))});const Rt=o=>{if(!I||o.pointerId!==I.id)return;const p=I;if(I=null,K&&g){const h=g,v=-h.angle/180,L=h.dir===1?J<-.35:J>.35,E=h.dir===1?J>.35:J<-.35;u(h,!E&&(L||(h.dir===1?v>.4:v<.6)),J),K=!1;return}o.type!=="pointercancel"&&(Math.hypot(o.clientX-p.x,o.clientY-p.y)>10||ge(o))};a.addEventListener("pointerup",Rt),a.addEventListener("pointercancel",Rt);function ge(o){const p=o.target,h=p.closest(".pf");if(h&&p.closest(".ph")){const E=h.dataset.photo,P=performance.now();if(P-mt.t<300&&mt.id===E){clearTimeout(Yt),mt={t:0,id:""},Pt(E,h.querySelector("[data-like]"),!0),pe(h.querySelector(".ph"),o.clientX,o.clientY);return}mt={t:P,id:E},Yt=window.setTimeout(()=>Pe(E),300);return}const v=a.getBoundingClientRect(),L=(o.clientX-v.left)/v.width;L>.62?q(1):L<.38&&q(-1)}s.addEventListener("click",o=>{const p=o.target;p.closest("[data-next]")?q(1):p.closest("[data-prev]")?q(-1):p.closest("[data-toc]")?ye():p.closest("[data-goto]")&&C(Number(p.closest("[data-goto]").dataset.goto))});const Dt=o=>{document.querySelector(".lightbox, .sheet")||(o.key==="ArrowRight"?q(1):o.key==="ArrowLeft"&&q(-1))};addEventListener("keydown",Dt);function ye(){const o=pt.map(v=>{const L=Q.findIndex(P=>P.kind==="opener"&&P.ch.key===v.key),E=Q[L].photos[0];return`<li><button type="button" class="toc-row" data-goto="${L}">
        <span class="toc-photo">${G(E,{sizes:"120px"})}</span>
        <span class="toc-name"><span class="toc-zh">${v.zh}</span><span class="latin">${wt(v)}</span></span>
        <span class="toc-n">${v.count} 張</span>
      </button></li>`}).join(""),p=R.filter(v=>Ot(v.id)),h=he(`<h2 class="sheet-title">目錄</h2>
      <ol class="toc">${o}</ol>
      ${p.length?`<p class="toc-liked">你按過愛心的有 ${p.length} 張。</p>`:""}`);h.addEventListener("click",v=>{const L=v.target.closest("[data-goto]");L&&(h.close(),setTimeout(()=>C(Number(L.dataset.goto)),60))})}const xt=(()=>{if(!t)return 0;const o=Q.findIndex(p=>"photos"in p&&p.photos.some(h=>h.id===t)||p.kind==="opener"&&p.ch.key===t||p.kind===t);return Math.max(0,o)})();r=xt,l=!1,f=[];const Ft=new ResizeObserver(()=>{z||m()});return m(),xt&&(x(xt),$()),Ft.observe(a),()=>{Ft.disconnect(),removeEventListener("keydown",Dt)}}const Jt=["warm","white","blue","warm","white","slate","warm","white"],Zt=[78,88,72,94,82,68],Et="nl:draft";function We(e){let t=2166136261;for(let s=0;s<e.length;s++)t=Math.imul(t^e.charCodeAt(s),16777619);return t>>>0}function je(e,t){const s=We(e.id),a=[...e.text].length,n=a<=14?"xl":a<=44?"l":"m",l=e.private?"private":Jt[s%Jt.length],r=Zt[(s>>4)%Zt.length],f=(s>>8)%2?"r":"l";return T(`<li class="note n-${l} n-${n} n-${f}" data-id="${e.id}" style="--w:${r}%">
    ${e.private?'<p class="note-tag caps">♡ only for us ♡　只給新人看</p>':""}
    <p class="note-text">${H(e.text)}</p>
    <p class="note-by"><span class="note-name">${H(e.name)}</span><time datetime="${new Date(e.ts).toISOString()}" data-ts="${e.ts}">${e.mine?"你・":""}${ie(e.ts,t)}</time></p>
  </li>`)}function Be(e){const t=T(`<div class="screen notes-screen screen-enter">
    ${kt("notes")}
    <main class="notes">
      <header class="notes-hi">
        <p class="caps meta-row notes-meta rise"><span>Leave us a note</span><span data-note-count></span></p>
        <p class="notes-script script write" style="--d:300ms" aria-hidden="true">leave us a</p>
        <p class="notes-display display" data-fit-box aria-hidden="true"><span class="mask"><span data-fit>Notes</span></span></p>
        <h1 class="notes-h rise" style="--i:1">傳紙條給我們</h1>
        <p class="rise" style="--i:2">高中那幾年，我們坐前後座，紙條都是從後面遞過來的。今天換你，寫一張給我們。</p>
      </header>
      <ol class="wall" data-wall aria-label="大家的紙條"></ol>
      <p class="wall-empty" hidden>還沒有人傳紙條。<br>你可以當第一個。</p>
    </main>
    <div class="notes-cta">
      <button class="btn" type="button" data-write>寫一張紙條 <span class="arrow" aria-hidden="true">→</span></button>
    </div>
  </div>`);e.append(t),it(t);const s=t.querySelector("[data-wall]"),a=t.querySelector(".wall-empty"),n=t.querySelector("[data-note-count]"),l=t.querySelector("[data-write]");let r=!0;const f=()=>{const y=Date.now(),m=i.notes,$=new Map([...s.children].map(d=>[d.dataset.id,d])),O=new Set(m.map(d=>d.id));for(const[d,k]of $)O.has(d)||k.remove();let S=null;m.forEach((d,k)=>{let g=$.get(d.id);g||(g=je(d,y),r?(g.classList.add("rise"),g.style.setProperty("--i",String(Math.min(k,8)+2))):g.classList.add("arrive"),S?S.after(g):s.prepend(g)),S=g}),r=!1;const c=m.filter(d=>!d.private).length;n.textContent=i.stats.notes||c?`${Z(Math.max(i.stats.notes,c))} notes`:"",a.hidden=m.length>0||!i.booted,l.disabled=!i.config.notesOpen,l.innerHTML=i.config.notesOpen?'寫一張紙條 <span class="arrow" aria-hidden="true">→</span>':"紙條已經收起來了"};f();const w=window.setInterval(()=>{const y=Date.now();s.querySelectorAll("time[data-ts]").forEach(m=>{const $=m.textContent.startsWith("你・")?"你・":"";m.textContent=$+ie(Number(m.dataset.ts),y)})},6e4);l.addEventListener("click",te),location.hash.endsWith("/write")&&setTimeout(te,300);const x=[W("notes",f),W("stats",f),W("config",f)];return()=>{x.forEach(y=>y()),clearInterval(w)}}function te(){const e=i.guest.name;let t="";try{t=localStorage.getItem(Et)??""}catch{}const s=he(`<h2 class="sheet-title">寫一張紙條</h2>
    <form class="compose" novalidate>
      <div class="slip">
        <label class="sr" for="note-text">想對我們說的話</label>
        <textarea id="note-text" maxlength="300" rows="6" placeholder="想對我們說的話…" aria-describedby="note-len"></textarea>
        <p class="slip-by">${H(e)}</p>
      </div>
      <p class="slip-len" id="note-len">0 / 300 字</p>
      <fieldset class="who">
        <legend>誰看得到這張紙條</legend>
        <label><input type="radio" name="who" value="public" checked><span>大家都看得到</span></label>
        <label><input type="radio" name="who" value="private"><span>只給新人看</span></label>
      </fieldset>
      <p class="who-note" data-who-note>會出現在留言板上，署名「${H(e)}」。</p>
      <button class="btn send" type="submit" disabled>傳出去 <span class="arrow" aria-hidden="true">→</span></button>
    </form>`,{cls:"sheet-compose",label:"寫一張紙條"}),a=s.querySelector("form"),n=a.querySelector("textarea"),l=a.querySelector(".slip-len"),r=a.querySelector(".send"),f=a.querySelector("[data-who-note]");n.value=t;const w=()=>{l.textContent=`${[...n.value].length} / 300 字`,r.disabled=!n.value.trim();try{localStorage.setItem(Et,n.value)}catch{}};w(),n.addEventListener("input",w),a.addEventListener("change",()=>{const x=a.elements.namedItem("who").value==="private";a.classList.toggle("is-private",x),f.textContent=x?"不會出現在留言板上，只有昇翰和優看得到。你自己也還看得到它。":`會出現在留言板上，署名「${e}」。`}),setTimeout(()=>n.focus(),380),a.addEventListener("submit",async x=>{x.preventDefault();const y=n.value.trim();if(!y)return;const m=a.elements.namedItem("who").value==="private";r.disabled=!0,r.textContent="傳送中…";try{await Ee(y,m);try{localStorage.removeItem(Et)}catch{}ft(12);const $=a.querySelector(".slip");A()||await $.animate([{transform:"none",opacity:1},{transform:"perspective(800px) rotateX(70deg) scaleY(0.55)",opacity:1,offset:.45},{transform:"perspective(800px) rotateX(80deg) scaleY(0.3) translateY(-60vh) rotate(-6deg)",opacity:0}],{duration:720,easing:"cubic-bezier(0.76, 0, 0.24, 1)",fill:"forwards"}).finished,s.close(),Tt(m?"紙條交給新人了，只有他們看得到。":"紙條傳出去了，謝謝你。"),window.scrollTo({top:0,behavior:A()?"auto":"smooth"})}catch{r.disabled=!1,r.innerHTML='再傳一次 <span class="arrow" aria-hidden="true">→</span>',Tt("沒傳出去，連線不太穩。內容還在，再按一次試試看。")}})}const Qe=["答對了。","沒錯，就是這個。","你很懂。","對！"],Ge=["差一點。","不是這個喔。","猜錯了，沒關係。","嗯，不是這個。"];function Ue(e){return e>=100?"全對。你可能比我們還懂我們。":e>=80?"你一定是一路看著我們走過來的人。":e>=60?"已經很懂我們了，剩下的，今天補上。":e>=40?"一半一半，剛剛好。剩下的故事，等一下敬酒的時候問我們。":"沒關係。答錯的每一題，都是今天認識我們的理由。謝謝你來。"}function Ke(e){const t=T(`<div class="screen quiz-screen screen-enter">${kt("quiz")}<main class="quiz"></main></div>`);e.append(t);const s=t.querySelector("main");let a="intro",n=0;const l=()=>{if(i.result&&(a="result"),a==="result"&&i.result)return m(i.result);const c=V.get();if(a==="q"&&c)return f(Math.min(c.answers.length,i.quiz.length-1));r()};function r(){a="intro";const c=V.get(),d=i.quiz.length,k=i.config.quizOpen;s.className="quiz quiz-intro",s.innerHTML=`
      <p class="caps meta-row quiz-meta rise"><span>How well do you know us</span><span>${d} Q</span></p>
      <p class="quiz-script script write" style="--d:300ms" aria-hidden="true">how well</p>
      <p class="quiz-display display" data-fit-box aria-hidden="true"><span class="mask"><span data-fit>Do you know us</span></span></p>
      <h1 class="quiz-title rise" style="--i:1">你有多懂我們？</h1>
      <p class="quiz-lead rise" style="--i:2">${d} 題選擇題，都是關於我們兩個人的事。沒有時間限制，慢慢想。</p>
      <ul class="quiz-rules rise" style="--i:3">
        <li>每個人只有一次機會，交卷之後就不能重來。</li>
        <li>中途離開沒關係，回來可以接著寫。</li>
        <li>答對最多的人，沒有獎品。真的沒有。只有我們的感謝，和一整晚可以炫耀的權利。</li>
      </ul>
      <div class="quiz-go rise" style="--i:4">
        ${k?`<button class="btn" type="button" data-start>${c?.answers.length?`接著寫第 ${c.answers.length+1} 題`:"開始作答"} <span class="arrow" aria-hidden="true">→</span></button>`:'<p class="quiz-closed">遊戲現在沒有開放作答，等一下再來看看。</p>'}
      </div>`,it(s),s.querySelector("[data-start]")?.addEventListener("click",()=>{V.get()||V.set({answers:[],started:Date.now()}),a="q",l()})}function f(c){n=c;const d=i.quiz[c],k=i.quiz.length;s.className="quiz quiz-q",s.innerHTML=`
      <div class="q-progress caps" aria-hidden="true"><span>Question ${String(c+1).padStart(2,"0")}</span><span>${String(c+1).padStart(2,"0")} / ${String(k).padStart(2,"0")}</span></div>
      <div class="q-bar" aria-hidden="true"><i style="transform:scaleX(${c/k})"></i></div>
      <h1 class="q-text rise"><span class="sr">第 ${c+1} 題，共 ${k} 題：</span>${H(d.q)}</h1>
      <ol class="q-options">
        ${d.options.map((g,z)=>`<li class="rise" style="--i:${z+1}"><button class="opt" type="button" data-k="${z}"><span class="opt-k latin">${"ABCDEF"[z]}</span><span class="opt-t">${H(g)}</span></button></li>`).join("")}
      </ol>
      <div class="q-reveal" hidden>
        <p class="q-verdict" role="status"></p>
        ${d.note?`<p class="q-note">${H(d.note)}</p>`:""}
        <button class="btn" type="button" data-next></button>
        ${c===k-1?'<p class="q-last">交卷之後就不能再作答囉。</p>':""}
      </div>`,requestAnimationFrame(()=>s.querySelector(".q-bar i").style.transform=`scaleX(${(c+.5)/k})`),s.querySelectorAll(".opt").forEach(g=>g.addEventListener("click",()=>w(Number(g.dataset.k)))),window.scrollTo({top:0})}function w(c){const d=i.quiz[n],k=V.get()??{answers:[],started:Date.now()};k.answers=k.answers.slice(0,n),k.answers[n]=c,V.set(k);const g=c===d.answer;ft(g?12:[8,60,8]),s.querySelectorAll(".opt").forEach(u=>{const b=Number(u.dataset.k);u.disabled=!0,b===d.answer&&u.classList.add("right"),b===c&&u.classList.add("picked",g?"is-right":"is-wrong"),b!==d.answer&&b!==c&&u.classList.add("dim")});const z=s.querySelector(".q-reveal"),M=n===i.quiz.length-1;z.querySelector(".q-verdict").textContent=(g?Qe:Ge)[n%4],z.classList.toggle("is-right",g);const N=z.querySelector("[data-next]");N.innerHTML=M?'交卷，看結果 <span class="arrow" aria-hidden="true">→</span>':'下一題 <span class="arrow" aria-hidden="true">→</span>',z.hidden=!1,z.classList.add("rise"),s.querySelector(".q-bar i").style.transform=`scaleX(${(n+1)/i.quiz.length})`,N.addEventListener("click",()=>M?y():x()),setTimeout(()=>z.scrollIntoView({behavior:A()?"auto":"smooth",block:"nearest"}),120)}function x(){if(A())return f(n+1);s.animate([{opacity:1,transform:"none"},{opacity:0,transform:"translateX(-24px)"}],{duration:200,easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"}).onfinish=()=>f(n+1)}async function y(){const c=V.get(),d=s.querySelector("[data-next]");d.disabled=!0,d.textContent="改考卷中…";const k=i.quiz.map((g,z)=>c.answers[z]??-1);try{const g=await Me(k,Date.now()-c.started);a="result",m(g,!0)}catch(g){d.disabled=!1,d.innerHTML='再交一次 <span class="arrow" aria-hidden="true">→</span>',Tt(g instanceof Error&&g.message?g.message:"沒交出去，連線不太穩，再按一次試試看。")}}function m(c,d=!1){s.className="quiz quiz-result";const k=i.config.boardSize,g=c.players>1?Math.round((c.players-c.rank)/(c.players-1)*100):0,z=c.rank<=k&&c.pct>=i.config.boardMinPct?`你在排行榜上，第 ${c.rank} 名。`:g>=50?`你贏過了 ${g}% 的賓客。`:"";if(s.innerHTML=`
      <p class="caps meta-row r-meta rise"><span>Your score</span><span>你的答對率</span></p>
      <p class="r-pct latin" aria-label="答對率 ${c.pct}%"><span class="mask"><span><span data-pct>${d&&!A()?0:c.pct}</span><span class="r-unit">%</span></span></span></p>
      <p class="r-line rise" style="--i:1">答對 ${c.score} 題，共 ${c.total} 題。${z}</p>
      <p class="r-msg rise" style="--i:2">${Ue(c.pct)}</p>

      <section class="board-wrap rise" style="--i:3" aria-labelledby="board-h">
        <p class="board-script script" aria-hidden="true">the best</p>
        <h2 id="board-h" class="board-h">排行榜 <span class="caps">Top ${k}</span></h2>
        <ol class="board" data-board></ol>
        <p class="board-note">前 ${k} 名沒有獎品。真的沒有。只有我們的感謝，和一整晚可以拿出來說嘴的權利。</p>
      </section>

      <details class="review rise" style="--i:4">
        <summary>看看每一題的答案</summary>
        <ol class="review-list">
          ${i.quiz.map((M,N)=>{const u=c.answers[N],b=u===M.answer;return`<li class="${b?"ok":"no"}">
                <p class="rv-q">${H(M.q)}</p>
                <p class="rv-a">${b?"你答對了：":`你選了「${H(M.options[u]??"沒有作答")}」，答案是：`}<strong>${H(M.options[M.answer])}</strong></p>
                ${M.note?`<p class="rv-note">${H(M.note)}</p>`:""}
              </li>`}).join("")}
        </ol>
      </details>

      <div class="r-next rise" style="--i:5">
        <a class="btn" href="#/notes">去傳一張紙條給我們 <span class="arrow" aria-hidden="true">→</span></a>
        <a class="btn quiet" href="#/album">翻翻相冊</a>
      </div>`,$(),d&&!A()){const M=s.querySelector("[data-pct]"),N=performance.now(),u=b=>{const q=Math.min(1,(b-N)/1400);M.textContent=String(Math.round(c.pct*(1-Math.pow(1-q,3)))),q<1&&requestAnimationFrame(u)};requestAnimationFrame(u),window.scrollTo({top:0})}}function $(){const c=s.querySelector("[data-board]");if(!c)return;const d=i.board;c.innerHTML=d.length?d.map((k,g)=>`<li class="${k.mine?"mine":""}">
              <span class="b-rank latin">${g+1}</span>
              <span class="b-name">${H(k.name)}${k.mine?"<em>（你）</em>":""}</span>
              <span class="b-pct">${k.pct}%</span>
            </li>`).join(""):'<li class="b-empty">排行榜正在等第一個交卷的人。</li>'}l();let O=`${i.config.quizOpen}/${i.quiz.length}`;const S=[W("board",$),W("result",()=>a!=="q"&&l()),W("config",()=>{const c=`${i.config.quizOpen}/${i.quiz.length}`;c!==O&&a==="intro"&&l(),O=c})];return()=>S.forEach(c=>c())}const Ve={"":Oe,home:ue,album:Fe,notes:Be,quiz:Ke},ee=document.getElementById("app");let se,Mt="";function me(){Te();const[,e="",t]=location.hash.replace(/^#/,"").split("/"),s=i.guest?e:"";!i.guest&&e&&history.replaceState(null,"","#/");const a=Ve[s]??ue,n=`${s}/${t??""}`;if(n===Mt)return;const l=Mt.split("/")[0]===s;Mt=n,!(l&&s==="album")&&(se?.(),ee.replaceChildren(),document.body.dataset.view=s||"intro",window.scrollTo(0,0),se=a(ee,t))}Ae();i.guest&&Xt();Le();window.addEventListener("hashchange",me);me();
