import{D as ie,d as we,f as $e,u as ke,h as vt,r as C,g as M,i as Q,$ as Gt,S as T,p as V,c as J,e as N,j as oe,k as re,s as le,l as qe,C as Le,b as ce,t as Mt}from"./photos-6plI7D-q.js";const z={get(e,t){try{const s=localStorage.getItem(e);return s?JSON.parse(s):t}catch{return t}},set(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}},n={api:null,guest:z.get("nl:guest",null),config:we,quiz:ie,likes:{},myLikes:new Set(z.get("nl:likes",[])),notes:[],board:[],result:z.get("nl:result",null),stats:{guests:0,notes:0,players:0,likes:0},booted:!1,online:!0,since:0},rt=new Map;function R(e,t){return rt.has(e)||rt.set(e,new Set),rt.get(e).add(t),()=>rt.get(e).delete(t)}function F(...e){for(const t of e)rt.get(t)?.forEach(s=>s())}let Se=null;const st=()=>Se??(Se=$e().then(e=>n.api=e));function Z(e){n.online!==e&&(n.online=e,F("net"))}function xe(e){const t={gid:n.guest?.gid??ke(),name:e};n.guest=t,z.set("nl:guest",t),F("guest");const s=async a=>{try{await(await st()).join(e,t.gid),Tt=null,Ht()}catch{a>0&&setTimeout(()=>s(a-1),4e3)}};return s(5),t}let Tt=null;function Ht(){return n.guest?Tt??(Tt=(async()=>{try{const e=await st();let t=await e.boot(n.guest.gid);if(t.known===!1){const s=await e.join(n.guest.name,n.guest.gid);n.guest=s,z.set("nl:guest",s),tt=new Set,z.set("nl:likes-sent",[]),t=await e.boot(s.gid),n.result=null,z.set("nl:result",null)}if(n.config=t.config,n.quiz=t.quiz.length?t.quiz:ie,tt=new Set(t.myLikes),Y||(n.myLikes=new Set(t.myLikes)),n.likes=t.likes,Nt(),n.notes=Pt(t.notes),n.board=t.board,n.result=t.result,z.set("nl:result",t.result),!t.result){const s=X.get();s&&s.answers.length>=n.quiz.length&&localStorage.removeItem(`nl:quiz:${n.guest.gid}`)}n.stats=t.stats,n.since=t.now,n.booted=!0,Z(!0),F("likes","notes","board","stats","result","config"),Y&&dt()}catch{Z(!1),setTimeout(()=>(Tt=null,Ht()),6e3)}})()):Promise.resolve()}let ht=0,ft=!1;function ze(){if(ft)return;ft=!0;const e=async()=>{if(ht=0,!ft)return;if(document.visibilityState==="visible"&&n.booted&&n.guest)try{const a=await(await st()).poll(n.guest.gid,n.since);!Y&&!mt&&(n.likes=a.likes,Nt(),F("likes"));const o=new Set(n.notes.map(l=>l.id)),c=a.notes.filter(l=>!o.has(l.id)),p=new Set(a.hidden),h=n.notes.length;n.notes=Pt([...n.notes.filter(l=>!p.has(l.id)),...c]),(c.length||n.notes.length!==h)&&F("notes"),n.board=a.board,n.stats=a.stats,n.config=a.config,n.since=Math.max(n.since,a.now-6e4),Z(!0),F("board","stats","config")}catch{Z(!1)}const t=n.api?.kind==="local"?4e3:2e4+Math.random()*8e3;ht=window.setTimeout(e,t)};e(),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&ft&&ht&&(clearTimeout(ht),e())})}let Y=z.get("nl:likes-dirty",!1),mt=!1,tt=new Set(z.get("nl:likes-sent",[])),ct=0;function Nt(){for(const e of new Set([...n.myLikes,...tt])){const t=(n.myLikes.has(e)?1:0)-(tt.has(e)?1:0);t&&(n.likes[e]=Math.max(0,(n.likes[e]??0)+t))}}function Ot(e){return n.myLikes.has(e)}function de(e){return n.likes[e]??0}function Ee(e,t){const s=n.myLikes.has(e),a=!s;return a===s||(a?n.myLikes.add(e):n.myLikes.delete(e),n.likes[e]=Math.max(0,(n.likes[e]??0)+(a?1:-1)),z.set("nl:likes",[...n.myLikes]),Y=!0,z.set("nl:likes-dirty",!0),F("likes"),clearTimeout(ct),ct=window.setTimeout(dt,900)),a}async function dt(){if(!n.guest||mt)return;mt=!0;const e=new Set(n.myLikes);Y=!1;try{const s=await(await st()).setLikes(n.guest.gid,[...e]);tt=e,z.set("nl:likes-sent",[...tt]),n.likes=s.likes,Nt(),z.set("nl:likes-dirty",Y),Z(!0),F("likes")}catch{Y=!0,Z(!1),ct=window.setTimeout(dt,8e3)}finally{mt=!1,Y&&(clearTimeout(ct),ct=window.setTimeout(dt,900))}}window.addEventListener("pagehide",()=>{Y&&dt()});function Pt(e){return[...e].sort((t,s)=>s.ts-t.ts)}async function Me(e,t){const a=await(await st()).postNote(n.guest.gid,n.guest.name,e,t);return n.notes=Pt([a,...n.notes.filter(o=>o.id!==a.id)]),n.stats.notes++,F("notes","stats"),a}const X={get:()=>z.get(`nl:quiz:${n.guest?.gid}`,null),set:e=>z.set(`nl:quiz:${n.guest?.gid}`,e)};async function Te(e,t){const s=await st(),a=await s.submitQuiz(n.guest.gid,n.guest.name,e,t);return n.result=a,z.set("nl:result",a),F("result"),s.poll(n.guest.gid,n.since).then(o=>{n.board=o.board,n.stats=o.stats,F("board","stats")},()=>{}),a}function Ce(){for(const e of Object.keys(localStorage))e.startsWith("nl:")&&localStorage.removeItem(e)}const K=[];let Ct=0;function Ie(e){history.pushState({overlay:!0},"");const t={close:e,done:!1};return K.push(t),()=>{if(t.done)return;t.done=!0;const s=K.indexOf(t);s>=0&&K.splice(s,1),Ct++,history.back()}}addEventListener("popstate",()=>{if(Ct){Ct--;return}const e=K.pop();e&&!e.done&&(e.done=!0,e.close())});function Ae(){for(;K.length;){const e=K.pop();e.done||(e.done=!0,e.close())}}const ue=e=>n.booted?Q(de(e)):"";function He(e){e.querySelectorAll("[data-like]").forEach(t=>{const s=Ot(t.dataset.like);t.classList.toggle("on",s),t.setAttribute("aria-pressed",String(s))}),e.querySelectorAll("[data-count]").forEach(t=>t.textContent=ue(t.dataset.count))}const Ne="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",It=(e="")=>`<svg class="${e}" viewBox="0 0 24 24" aria-hidden="true"><path d="${Ne}"/></svg>`;function Oe(e){const t=Ot(e);return`<button class="like ${t?"on":""}" data-like="${e}" aria-pressed="${t}" aria-label="喜歡這張照片">
    <span class="like-icon">${It("o")}${It("f")}</span>
    <span class="like-n" data-count="${e}">${ue(e)}</span>
  </button>`}let Pe=null;const Re=()=>Pe??(Pe=document.body.appendChild(M('<div class="heart-layer" aria-hidden="true"></div>'))),Qt=["var(--heart)","var(--heart)","#f07b8c","#f6b3bd","#ffffff","#c92f4a"];function De(e,t,s=22){if(C())return;const a=Re();for(let o=0;o<s;o++){const c=M(`<span class="burst">${It()}</span>`),p=10+Math.random()*22;c.style.cssText=`left:${e}px;top:${t}px;width:${p}px;height:${p}px;color:${Qt[o%Qt.length]}`,a.appendChild(c);const h=-Math.PI/2+(Math.random()-.5)*Math.PI*1.25,l=50+Math.random()*150,f=Math.cos(h)*l,m=Math.sin(h)*l-40-Math.random()*80,$=(Math.random()-.5)*70,g=850+Math.random()*650;c.animate([{transform:"translate(-50%,-50%) scale(0.2) rotate(0deg)",opacity:0},{transform:`translate(calc(-50% + ${f*.35}px), calc(-50% + ${m*.35}px)) scale(1.15) rotate(${$*.5}deg)`,opacity:1,offset:.22},{transform:`translate(calc(-50% + ${f}px), calc(-50% + ${m}px)) scale(0.85) rotate(${$}deg)`,opacity:0}],{duration:g,delay:Math.random()*120,easing:"cubic-bezier(0.22, 1, 0.36, 1)",fill:"both"}).onfinish=()=>c.remove()}}function Fe(e,t,s){const a=Ee(e);if(a){vt(10);const o=t??document.querySelector(`[data-like="${e}"]`);if(o){const c=o.querySelector(".like-icon").getBoundingClientRect();De(c.left+c.width/2,c.top+c.height/2)}}return a}function We(){document.addEventListener("click",t=>{const s=t.target.closest("[data-like]");s&&(t.stopPropagation(),Fe(s.dataset.like,s))});let e={};R("likes",()=>{for(const t of Gt("[data-like]")){const s=t.dataset.like,a=Ot(s);t.classList.contains("on")!==a&&(t.classList.toggle("on",a),t.setAttribute("aria-pressed",String(a)),a&&t.querySelector(".f")?.animate([{transform:"scale(0.4)"},{transform:"scale(1.25)"},{transform:"scale(1)"}],{duration:420,easing:"cubic-bezier(0.22, 1, 0.36, 1)"}))}for(const t of Gt("[data-count]")){const s=t.dataset.count,a=de(s);n.booted&&(t.textContent===""?t.textContent=Q(a):t.textContent!==Q(a)&&Xe(t,a,(e[s]??a)<a),e[s]=a)}})}function Xe(e,t,s=!0){const a=Q(t);if(C()||!e.isConnected){e.textContent=a;return}e.animate([{transform:"translateY(0)",opacity:1},{transform:`translateY(${s?-60:60}%)`,opacity:0}],{duration:160,easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"}).onfinish=()=>{e.textContent=a,e.animate([{transform:`translateY(${s?60:-60}%)`,opacity:0},{transform:"translateY(0)",opacity:1}],{duration:260,easing:"cubic-bezier(0.22, 1, 0.36, 1)"})}}function et(e){Vt(e),document.fonts?.ready.then(()=>Vt(e))}function Vt(e){e.querySelectorAll("[data-fit]").forEach(t=>{const s=t.closest("[data-fit-box]")??t.parentElement.closest("h1, h2, p, div, a"),a=Number(t.dataset.fit)||1/0;t.style.fontSize="100px",t.style.whiteSpace="nowrap",t.style.display="inline-block";const o=t.getBoundingClientRect().width,c=getComputedStyle(s),p=s.clientWidth-parseFloat(c.paddingLeft)-parseFloat(c.paddingRight);o&&p>0&&(t.style.fontSize=`${Math.min(a,Math.floor(100*p/o*.99*10)/10)}px`),t.style.display=""})}const Jt=["3650","3531","3673","3736","3789"],je=3600;function Ye(e){const t=n.guest,s=M(`<main class="screen intro${t?"":" cover"}">
    <div class="intro-photo" aria-hidden="true">
      ${Jt.map((y,L)=>V(J.get(y),{eager:L===0,pos:!1,sizes:"100vw",cls:`shot${L===0?" now":""}`})).join("")}
    </div>
    <div class="intro-scrim" aria-hidden="true"></div>
    <header class="intro-head meta-row caps rise" style="--d:200ms">
      <span>${T.brideEn} &amp; ${T.groomEn}</span><span>10 . 31</span>
    </header>
    <div class="intro-title">
      <div class="intro-words">
        <p class="intro-just script write" style="--d:700ms" aria-hidden="true">just</p>
        <h1 class="intro-name" data-fit-box>
          <span class="mask"><span class="display" data-fit style="--d:250ms">Married</span></span>
          <span class="sr">${T.groom}與${T.bride}的婚禮</span>
        </h1>
      </div>
      <p class="intro-line rise" style="--d:900ms">${T.groom} × ${T.bride}　·　${T.date}</p>
    </div>
    ${t?"":'<button class="intro-tap rise" type="button" style="--d:1700ms"><span class="tap-dot" aria-hidden="true"></span>點一下畫面，繼續</button>'}
    <div class="intro-card rise" style="--d:1100ms" ${t?"":"inert"}>
      ${t?`<div class="intro-ask">
              <p class="ask-hi caps" aria-hidden="true">Welcome back</p>
              <p class="ask-q">歡迎回來，${N(t.name)}。</p>
              <a class="btn ask-go" href="#/home">繼續 <span class="arrow" aria-hidden="true">→</span></a>
              <button class="btn quiet ask-alt" type="button" data-rename>換個稱呼</button>
            </div>`:""}
      <form class="intro-ask" ${t?"hidden":""} novalidate>
        <p class="ask-hi caps" aria-hidden="true">Welcome</p>
        <label class="ask-q" for="guest-name">我們該怎麼稱呼你？</label>
        <p class="ask-note" id="name-note">寫下稱呼就能進場，<br>它會出現在你的留言與排行榜上。</p>
        <div class="ask-field">
          <input id="guest-name" name="name" type="text" autocomplete="nickname" enterkeyhint="go" maxlength="20"
            placeholder="例如：新郎的摯友 杰倫" aria-describedby="name-note" />
        </div>
        <button class="btn ask-go" type="submit">進場 <span class="arrow" aria-hidden="true">→</span></button>
      </form>
    </div>
  </main>`);e.append(s),oe(s),et(s);const a=[...s.querySelectorAll(".shot")];Jt.slice(1).forEach(y=>re(y));let o=0;const c=C()?0:window.setInterval(()=>{const y=a[o];o=(o+1)%a.length;const L=a[o];a.forEach(P=>P.classList.remove("top")),y.classList.add("under"),L.classList.remove("now","under"),L.offsetWidth,L.classList.add("now","top"),setTimeout(()=>y.classList.remove("now","under"),1600)},je),p=s.querySelector(".intro-card"),h=s.querySelector(".intro-tap"),l=()=>{if(!s.classList.contains("cover"))return;const y=getComputedStyle(p),L=y.position==="absolute"||!h?0:p.offsetHeight+parseFloat(y.marginTop)+parseFloat(y.marginBottom)-h.offsetHeight-28;s.style.setProperty("--lift",`${Math.max(0,Math.round(L))}px`)};t||(l(),document.fonts?.ready.then(l),s.addEventListener("click",()=>{s.classList.contains("cover")&&(s.classList.replace("cover","asking"),p.inert=!1)}));const f=s.querySelector("form"),m=f.querySelector("input"),$=f.querySelector(".ask-go");m.addEventListener("focus",()=>s.classList.add("typing")),m.addEventListener("blur",()=>setTimeout(()=>s.classList.remove("typing"),120)),s.querySelector("[data-rename]")?.addEventListener("click",()=>{s.querySelector(".intro-ask:not(form)")?.remove(),f.hidden=!1,m.value=t?.name??"",m.focus()}),f.addEventListener("submit",async y=>{y.preventDefault();const L=m.value.trim().replace(/\s+/g," ").slice(0,20);if(!L){m.focus(),f.querySelector(".ask-field").animate([{transform:"translateX(0)"},{transform:"translateX(-6px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:360,easing:"cubic-bezier(0.22, 1, 0.36, 1)"});return}$.disabled=!0,xe(L),m.blur(),s.classList.add("leaving"),setTimeout(()=>location.hash="#/home",C()?0:420)});const g=()=>{et(s),l()};return addEventListener("resize",g),()=>{clearInterval(c),removeEventListener("resize",g)}}function bt(e){const t=(s,a)=>`<a href="#/${s}" ${e===s?'aria-current="page"':""}>${a}</a>`;return`<header class="bar">
    <a class="mark" href="#/home" aria-label="回到首頁">Linda &amp; Neil</a>
    <nav aria-label="主選單">${t("album","相冊")}${t("notes","留言板")}${t("quiz","遊戲")}</nav>
  </header>`}function Be(e){if(!("IntersectionObserver"in window))return()=>{};e.classList.add("js-reveal");const t=new IntersectionObserver(a=>{for(const o of a)o.isIntersecting&&(o.target.classList.add("in"),t.unobserve(o.target))},{rootMargin:"0px 0px -8% 0px"}),s=()=>e.querySelectorAll("[data-reveal]:not(.in)").forEach(a=>t.observe(a));return s(),Object.assign(()=>t.disconnect(),{watch:s})}function pe(e){const t=n.guest,s=M(`<div class="screen home screen-enter">
    ${bt("home")}
    <main>
      <section class="hello">
        <div class="hello-grid">
          <div class="hello-photo rise">${V(J.get("3605"),{sizes:"62vw",eager:!0})}</div>
          <div class="hello-vert rise" style="--i:1" aria-hidden="true"><span class="caps vert">with you</span></div>
        </div>
        <h1 class="hello-h rise" style="--i:2">${N(t.name)}，歡迎你來。</h1>
        <p class="hello-count rise" style="--i:3" data-stat-guests></p>
        <nav class="quick" aria-label="三個地方">
          <a class="quick-btn q-album rise" style="--i:4" href="#/album">
            <span class="q-zh">相冊</span><span class="q-sub">翻翻我們的婚紗照</span><span class="q-arrow" aria-hidden="true">→</span>
          </a>
          <a class="quick-btn q-notes rise" style="--i:5" href="#/notes">
            <span class="q-zh">留言板</span><span class="q-sub">留一句話給我們</span><span class="q-arrow" aria-hidden="true">→</span>
          </a>
          <a class="quick-btn q-quiz rise" style="--i:6" href="#/quiz">
            <span class="q-zh">遊戲</span><span class="q-sub" data-quiz-quick>你有多懂我們？</span><span class="q-arrow" aria-hidden="true">→</span>
          </a>
        </nav>
        <button class="scroll-cue rise" style="--i:7" type="button" data-scroll>往下滑，看更多<span class="cue-arrow" aria-hidden="true">↓</span></button>
      </section>

      <a class="door door-album" href="#/album" data-first-door>
        <div class="door-bg">${V(J.get("3627"),{sizes:"100vw"})}</div>
        <div class="door-scrim" aria-hidden="true"></div>
        <p class="door-script script" data-reveal aria-hidden="true">our</p>
        <h2 class="door-display display" data-fit-box aria-label="相冊"><span data-fit>Album</span></h2>
        <div class="door-foot" data-reveal>
          <p class="door-line" data-album-meta>我們的婚紗照，一頁一頁翻。</p>
          <span class="btn door-btn light">翻開相冊 <span class="arrow" aria-hidden="true">→</span></span>
        </div>
      </a>

      <a class="door door-notes" href="#/notes">
        <div class="door-blur" style="background-image:url(${le("3686",640)})" aria-hidden="true"></div>
        <div class="door-inset" data-reveal>${V(J.get("3686"),{sizes:"60vw"})}</div>
        <div class="door-notes-copy">
          <h2 class="door-zh" data-reveal>留言板</h2>
          <p class="door-line" data-notes-meta data-reveal></p>
          <span class="btn door-btn light" data-reveal>我要留言 <span class="arrow" aria-hidden="true">→</span></span>
        </div>
      </a>

      <a class="door door-quiz" href="#/quiz">
        <div class="door-quiz-photo" data-reveal>${V(J.get("3646"),{sizes:"70vw"})}</div>
        <h2 class="door-zh" data-reveal>考考你</h2>
        <p class="door-sub" data-quiz-sub data-reveal></p>
        <span class="btn door-btn light" data-reveal><span data-quiz-meta></span> <span class="arrow" aria-hidden="true">→</span></span>
      </a>
    </main>

    <footer class="home-foot">
      <p class="caps meta-row foot-years"><span>2011</span><i aria-hidden="true"></i><span>2026</span></p>
      <p class="foot-script script" aria-hidden="true">Thank you</p>
      <p class="foot-display display" data-fit-box><span data-fit>Our story</span></p>
      <div class="foot-row">
        <p>${T.groom} × ${T.bride}<br>${T.date}</p>
        <a class="btn quiet" href="#/">換個稱呼</a>
      </div>
    </footer>
  </div>`);e.append(s),oe(s),et(s);const a=Be(s);s.querySelector("[data-scroll]").addEventListener("click",()=>{const $=s.querySelector("[data-first-door]").getBoundingClientRect().top+scrollY-(s.querySelector(".bar")?.clientHeight??0);scrollTo({top:$,behavior:C()?"auto":"smooth"})});const o=s.querySelector(".scroll-cue"),c=()=>o.classList.toggle("gone",scrollY>80);addEventListener("scroll",c,{passive:!0});const p=m=>s.querySelector(m),h=()=>{const m=n.stats,$=n.booted;p("[data-stat-guests]").textContent=$?m.guests>1?`已經有 ${Q(m.guests)} 位賓客進場`:"":"載入中…";const g=n.myLikes.size;p("[data-album-meta]").textContent=g?`我們的婚紗照，你已經按了 ${g} 顆愛心。`:"我們的婚紗照，一頁一頁翻。",p("[data-notes-meta]").textContent=$?m.notes?`已經有 ${Q(m.notes)} 則留言`:"還沒有人留言，你可以當第一個。":"載入中…";const y=n.result,L=X.get(),P=n.quiz.length;p("[data-quiz-sub]").textContent=y?`你答對了 ${y.score} 題，得到 ${y.pct} 分。`:L&&L.answers.length?`你寫到第 ${L.answers.length} 題，回來把它寫完吧。`:`${P} 題選擇題，都是關於我們兩個人的事。`,p("[data-quiz-meta]").textContent=y?"看排行榜":L?.answers.length?"繼續作答":"開始作答",p("[data-quiz-quick]").textContent=y?`你得到 ${y.pct} 分`:"你有多懂我們？"};h();const l=[R("stats",h),R("notes",h),R("likes",h),R("result",h),R("config",h)],f=()=>et(s);return addEventListener("resize",f),()=>{l.forEach(m=>m()),a(),removeEventListener("resize",f),removeEventListener("scroll",c)}}const _=qe(),A=_.length,St={studio:{script:"with you",display:"Smile"},meadow:{script:"Love",display:"Meadow"},seaside:{script:"Happy",display:"Seaside"}},_t=["♡ we are married ♡","| a good mood |","| you &amp; me |","stay with you","together for life","music | faith | life","beautiful","soul mate"],lt=e=>_t[e%_t.length],Kt=e=>lt(e).replace(/[|♡]/g,"").trim(),At=e=>!e||e.kind==="cover"?Le[0]:e.ch;function H(e,t="",s="(min-width: 700px) 30vw, 80vw"){return`<figure class="pf ${t}" data-photo="${e.id}">
    ${V(e,{sizes:s,alt:"",lazy:!1})}
    <figcaption class="pf-like">${Oe(e.id)}</figcaption>
  </figure>`}const xt=e=>`style="--n:${e.length}"`;function Ue(e){const t=_[e];if(!t)return'<div class="page page-none"></div>';const s=At(t),a=`class="page page-${t.kind}" data-ch="${s.key}"`;switch(t.kind){case"cover":return`<article ${a}>
        ${H(J.get("3654"),"bg","(min-width: 700px) 40vw, 100vw")}
        <div class="pg-scrim"></div>
        <p class="pg-top caps meta-row"><span>${T.brideEn} &amp; ${T.groomEn}</span><span>${T.date}</span></p>
        <div class="pg-title">
          <p class="pg-script script">in the</p>
          <h2 class="pg-display display" ${xt("Light")}>Light</h2>
          <p class="pg-sub">看到喜歡的照片，記得按角落的 ♡</p>
        </div>
      </article>`;case"opener":{const o=St[s.key];return`<article ${a}>
        ${H(t.photos[0],"bg","(min-width: 700px) 40vw, 100vw")}
        <div class="pg-scrim"></div>
        <p class="pg-top caps meta-row"><span>${T.brideEn} &amp; ${T.groomEn}</span><span>${T.date}</span></p>
        <div class="pg-title">
          <p class="pg-script script">${o.script}</p>
          <h2 class="pg-display display" ${xt(o.display)}>${o.display}</h2>
          <p class="pg-sub">${s.zh}</p>
        </div>
      </article>`}case"trio":{const[o,c,p]=t.photos;return`<article ${a}>
        <div class="trio${t.n%2?" flip":""}">
          ${H(o,"t-a")}
          <div class="t-panel"><span class="caps vert">${Kt(t.n)}</span></div>
          ${H(c,"t-b","(min-width: 700px) 15vw, 50vw")}
          ${H(p,"t-c","(min-width: 700px) 15vw, 50vw")}
        </div>
      </article>`}case"split":{const[o,c]=t.photos;return`<article ${a}>
        <div class="split-block"></div>
        ${H(o,"s-p")}
        <p class="s-caps caps">${lt(t.n)}</p>
        ${H(c,"s-l","(min-width: 700px) 40vw, 100vw")}
      </article>`}case"full":return`<article ${a}>
        ${H(t.photos[0],"bg","(min-width: 700px) 40vw, 100vw")}
        <div class="pg-scrim low"></div>
        <p class="pg-foot caps">${lt(t.n)}</p>
      </article>`;case"caption":return`<article ${a}>
        ${H(t.photos[0],"c-photo","(min-width: 700px) 40vw, 100vw")}
        <p class="c-caps caps">${lt(t.n)}</p>
      </article>`;case"inset":{const[o,c]=t.photos;return`<article ${a}>
        <div class="i-blur" style="background-image:url(${le(o.id,640)})"></div>
        ${H(o,"i-a framed")}
        ${H(c,"i-b framed")}
        <p class="i-foot caps meta-row"><span>${Kt(t.n)}</span><span>2026</span></p>
      </article>`}case"lands":return`<article ${a}>
        <div class="lands">${t.photos.map(o=>H(o,"l-x","(min-width: 700px) 35vw, 85vw")).join("")}</div>
        <p class="l-caps">${s.zh}</p>
      </article>`;case"land":return`<article ${a}>
        <p class="pg-top caps meta-row"><span>${s.zh}</span><span>${lt(t.n)}</span></p>
        ${H(t.photos[0],"ld","(min-width: 700px) 35vw, 90vw")}
        <h2 class="pg-display display ld-word" ${xt(St[s.key].display)}>${St[s.key].display}</h2>
      </article>`;case"end":return`<article ${a}>
        ${H(t.photos[0],"bg","(min-width: 700px) 40vw, 100vw")}
        <div class="pg-scrim end"></div>
        <div class="end-copy">
          <p class="end-zh">謝謝你翻到最後。</p>
          <p class="end-note">也歡迎到留言板，留一句話給我們。</p>
          <div class="end-actions">
            <a class="btn light" href="#/notes">到留言板留言 <span class="arrow" aria-hidden="true">→</span></a>
            <button class="btn quiet" type="button" data-goto="0">回到第一頁</button>
          </div>
        </div>
      </article>`}}const gt=new Map;function G(e){let t=gt.get(e);return t?t.isConnected||He(t):(t=document.adoptNode(M(Ue(e))),t.querySelectorAll(".ph img").forEach(s=>{const a=()=>s.classList.add("in");s.complete&&s.naturalWidth?a():(s.addEventListener("load",a,{once:!0}),s.addEventListener("error",a,{once:!0}))}),gt.set(e,t)),t}function Ge(e){for(const[t,s]of gt)Math.abs(t-e)>8&&!s.isConnected&&gt.delete(t)}function Qe(e,t){const s=M(`<div class="screen album">
    ${bt("album")}
    <div class="album-head">
      <p class="album-ch" aria-live="polite" data-zh></p>
      <p class="album-n" data-n></p>
    </div>
    <div class="book" role="region" aria-roledescription="相冊" aria-label="婚紗照相冊。點畫面右邊翻下一頁，點左邊回上一頁，也可以左右滑動。">
      <div class="stage"></div>
    </div>
    <div class="album-foot">
      <div class="scrub">
        <output class="scrub-tip" aria-hidden="true" hidden></output>
        <input class="scrub-range" type="range" min="1" max="${A}" step="1" value="1" aria-label="拖曳圓點，快速翻到第幾頁">
      </div>
    </div>
  </div>`);e.append(s);const a=s.querySelector(".book"),o=s.querySelector(".stage"),c=s.querySelector(".scrub-range"),p=s.querySelector(".scrub-tip");let h=!1,l=0,f=[];const m=()=>h?Math.max(0,2*l-1):l,$=i=>l=h?Math.ceil(i/2):i,g=()=>h?Math.ceil((A-1)/2):A-1;function y(){const i=a.getBoundingClientRect(),r=m(),u=i.width>=700&&i.width/i.height>1.15,q=10,S=i.width-q*2,I=i.height-q*2;let j,B;u?(B=I,j=Math.min(S/2,B*.5625)):(j=S,B=I),o.style.width=`${u?j*2:j}px`,o.style.height=`${B}px`,(u!==h||!f.length)&&(h=u,s.classList.toggle("is-wide",h),$(r),L())}function L(){o.replaceChildren(),f=h?[G(2*l-1),G(2*l)].map((i,r)=>P(i,r?"right":"left")):[P(G(l),"single")],o.append(...f),w(),b()}function P(i,r){const u=M(`<div class="slot slot-${r}"><div class="shade"></div></div>`);return u.prepend(i),u}function d(i,r){const u=f[i],q=G(r),S=u.firstElementChild;S!==q&&S.replaceWith(q)}function v(){return _[h?2*l<A?2*l:2*l-1:l]}function w(){const i=v();s.querySelector("[data-zh]").textContent=i.kind==="cover"?"相冊":i.kind==="end"?"最後一頁":At(i).zh;const r=m()+1,u=h?Math.min(A,2*l+1):r;s.querySelector("[data-n]").textContent=r===u?`第 ${r} 頁，共 ${A} 頁`:`第 ${r}–${u} 頁，共 ${A} 頁`,ut||ve(r);const q="photos"in i?i.photos[0]:void 0,S=i.kind==="opener"?i.ch.key:q?.id??i.kind;history.replaceState(null,"",`#/album/${S}`)}function b(){const i=m();for(let r=i-2;r<=i+(h?5:3);r++){const u=_[r];u&&("photos"in u&&u.photos.forEach(q=>re(q.id)),G(r))}Ge(i)}let k=null,x=!1,O=0,E=-1;const D=M('<div class="page page-back"></div>');function at(i){if(x||k||i===1&&l>=g()||i===-1&&l<=0)return null;let r,u,q;h?i===1?(r=2*l,u=2*l+1,d(1,2*l+2),q=f[1]):(r=2*l-2,u=2*l-1,d(0,2*l-3),q=f[0]):(r=i===1?l:l-1,u=-1,i===1&&d(0,l+1),q=f[0]);const S=M(`<div class="leaf ${h?"leaf-wide":""}">
      <div class="face front"></div><div class="face back"></div>
    </div>`);S.children[0].append(G(r),M('<div class="sheen"></div>')),S.children[1].append(u>=0?G(u):D,M('<div class="sheen"></div>')),o.append(S);const I={dir:i,leaf:S,under:q,angle:i===1?0:-180};return nt(I,I.angle),I}function nt(i,r){i.angle=r,i.leaf.style.transform=`rotateY(${r}deg)`;const u=-r/180,q=Math.sin(u*Math.PI);i.leaf.children[0].lastElementChild.style.opacity=String(u<.5?u*.9:0),i.leaf.children[1].lastElementChild.style.opacity=String(u>=.5?(1-u)*.9:0),i.leaf.style.setProperty("--lift",String(q)),i.under.querySelector(".shade").style.opacity=String(i.dir===1?(1-u)*.55*q:u*.55*q)}function Rt(i,r,u=0){x=!0;const q=r?i.dir===1?-180:0:i.dir===1?0:-180,S=i.angle,I=Math.abs(q-S),j=C()?1:Math.max(200,Math.min(520,I/180*520-Math.abs(u)*120)),B=performance.now(),ye=Lt=>1-Math.pow(1-Lt,3);let qt=!1;const Yt=()=>{qt||(qt=!0,nt(i,q),me(i,r))},Bt=Lt=>{if(qt)return;const Ut=Math.min(1,(Lt-B)/j);nt(i,S+(q-S)*ye(Ut)),Ut<1?requestAnimationFrame(Bt):Yt()};requestAnimationFrame(Bt),setTimeout(Yt,j+250)}function me(i,r){if(r&&(l+=i.dir),h?(d(0,2*l-1),d(1,2*l)):d(0,l),i.leaf.remove(),f.forEach(u=>u.querySelector(".shade").style.opacity="0"),k=null,x=!1,r&&(vt(6),w(),b()),E>=0){const u=E;E=-1,O=0,yt(u)}else if(O){const u=O;O=0,it(u)}}function it(i){if(x||k){O=i;return}const r=at(i);r&&Rt(r,!0)}function yt(i){const r=Math.max(0,Math.min(A-1,Math.round(i)));if(x||k){E=r;return}O=0;const u=l;if($(r),l===u){w();return}o.animate([{opacity:0},{opacity:1}],{duration:C()?1:360,easing:"ease"}),L()}let ut=!1;function ge(i){const r=_[i],u=r?r.kind==="cover"?"封面":r.kind==="end"?"最後一頁":At(r).zh:"";return`第 ${i+1} 頁　${u}`}function ve(i){c.value=String(i),c.style.setProperty("--p",String(A>1?(i-1)/(A-1):0))}function be(){const i=Number(c.value);c.style.setProperty("--p",String(A>1?(i-1)/(A-1):0)),p.textContent=ge(i-1),p.style.setProperty("--p",String(A>1?(i-1)/(A-1):0)),p.hidden=!1}function pt(){ut&&(ut=!1,p.hidden=!0,yt(Number(c.value)-1))}c.addEventListener("input",()=>{ut=!0,be()}),c.addEventListener("change",pt),c.addEventListener("pointerup",()=>setTimeout(pt,0)),c.addEventListener("touchend",()=>setTimeout(pt,0)),c.addEventListener("blur",pt);let W=null,ot=!1,wt=0,$t=0,U=0;a.addEventListener("pointerdown",i=>{i.target.closest("button, a, .coach")||(W={x:i.clientX,y:i.clientY,id:i.pointerId},ot=!1,wt=i.clientX,$t=performance.now(),U=0)}),a.addEventListener("pointermove",i=>{if(!W||i.pointerId!==W.id)return;const r=i.clientX-W.x,u=i.clientY-W.y;if(!ot){if(Math.abs(r)<8||Math.abs(r)<Math.abs(u)||x||k)return;if(k=at(r<0?1:-1),!k){W=null;return}ot=!0,a.setPointerCapture(i.pointerId)}const q=performance.now();U=(i.clientX-wt)/Math.max(1,q-$t),wt=i.clientX,$t=q;const S=o.clientWidth/(h?2:1),I=Math.max(-1,Math.min(1,r/S));k.dir===1?nt(k,Math.max(-180,Math.min(0,I*180))):nt(k,Math.max(-180,Math.min(0,-180+I*180)))});const Dt=i=>{if(!W||i.pointerId!==W.id)return;const r=W;if(W=null,ot&&k){const S=k,I=-S.angle/180,j=S.dir===1?U<-.35:U>.35,B=S.dir===1?U>.35:U<-.35;ot=!1,Rt(S,!B&&(j||(S.dir===1?I>.4:I<.6)),U);return}if(i.type==="pointercancel")return;const u=i.clientX-r.x;if(Math.hypot(u,i.clientY-r.y)>10){Math.abs(u)>30&&(x||k)&&it(u<0?1:-1);return}const q=a.getBoundingClientRect();it((i.clientX-q.left)/q.width<.5?-1:1)};a.addEventListener("pointerup",Dt),a.addEventListener("pointercancel",Dt),s.addEventListener("click",i=>{const r=i.target;r.closest("[data-goto]")&&yt(Number(r.closest("[data-goto]").dataset.goto))});const Ft=i=>{document.activeElement!==c&&(i.key==="ArrowRight"?it(1):i.key==="ArrowLeft"&&it(-1))};addEventListener("keydown",Ft);const kt=(()=>{if(!t)return 0;const i=_.findIndex(r=>"photos"in r&&r.photos.some(u=>u.id===t)||r.kind==="opener"&&r.ch.key===t||r.kind===t);return Math.max(0,i)})();l=kt,h=!1,f=[];const Wt=new ResizeObserver(()=>{!x&&!k&&y()});y(),kt&&($(kt),L()),Wt.observe(a);const Xt="nl:album-coach";let jt=!1;try{jt=localStorage.getItem(Xt)==="1"}catch{}if(!jt){const i=M(`<div class="coach" role="dialog" aria-modal="true" aria-label="相冊怎麼看">
      <div class="coach-sides">
        <p class="coach-side coach-l"><span class="coach-arrow" aria-hidden="true">←</span>點左邊<br>回上一頁</p>
        <p class="coach-side coach-r"><span class="coach-arrow" aria-hidden="true">→</span>點右邊<br>翻下一頁</p>
      </div>
      <div class="coach-mid">
        <p class="coach-also">也可以用手指左右滑動翻頁</p>
        <button class="btn light coach-ok" type="button">知道了，開始翻</button>
      </div>
      <p class="coach-scrub">拖曳下面的圓點，<br>可以快速跳到想看的頁<span class="coach-down" aria-hidden="true">↓</span></p>
    </div>`);a.append(i),s.classList.add("coaching");const r=()=>{if(!i.classList.contains("bye")){try{localStorage.setItem(Xt,"1")}catch{}s.classList.remove("coaching"),i.classList.add("bye"),setTimeout(()=>i.remove(),C()?0:320)}};i.addEventListener("click",r),c.addEventListener("pointerdown",r,{once:!0}),setTimeout(()=>i.querySelector(".coach-ok")?.focus({preventScroll:!0}),60)}return()=>{Wt.disconnect(),removeEventListener("keydown",Ft)}}function he(e,t={}){const s=document.activeElement,a=M(`<div class="sheet ${t.cls??""}" role="dialog" aria-modal="true" aria-label="${t.label??""}">
    <div class="sheet-scrim" data-close></div>
    <div class="sheet-paper">
      <div class="sheet-grip" aria-hidden="true"></div>
      <button class="sheet-x" type="button" data-close aria-label="關閉">關閉</button>
      <div class="sheet-body">${e}</div>
    </div>
  </div>`);document.body.append(a),document.documentElement.style.overflow="hidden";const o=a.querySelector(".sheet-paper");requestAnimationFrame(()=>a.classList.add("open"));let c=!1;const p=()=>{c||(c=!0,a.classList.remove("open"),a.classList.add("closing"),document.documentElement.style.overflow="",removeEventListener("keydown",l),setTimeout(()=>a.remove(),C()?0:320),s?.focus?.(),t.onClose?.())},h=Ie(p);a.close=()=>{h(),p()};const l=g=>g.key==="Escape"&&a.close();addEventListener("keydown",l),a.addEventListener("click",g=>{g.target.closest("[data-close]")&&a.close()});let f=-1;const m=a.querySelector(".sheet-grip");m.addEventListener("pointerdown",g=>{f=g.clientY,m.setPointerCapture(g.pointerId),o.style.transition="none"}),m.addEventListener("pointermove",g=>{f<0||(o.style.transform=`translateY(${Math.max(0,g.clientY-f)}px)`)});const $=g=>{if(f<0)return;const y=g.clientY-f;f=-1,o.style.transition="",o.style.transform="",y>90&&a.close()};return m.addEventListener("pointerup",$),m.addEventListener("pointercancel",$),setTimeout(()=>a.querySelector("[autofocus], .sheet-body button, .sheet-body textarea")?.focus({preventScroll:!0}),60),a}const Zt=["warm","white","blue","warm","white","slate","warm","white"],te=[78,88,72,94,82,68],zt="nl:draft",fe="nl:quiz-invite";function Ve(e){let t=2166136261;for(let s=0;s<e.length;s++)t=Math.imul(t^e.charCodeAt(s),16777619);return t>>>0}function Je(e,t){const s=Ve(e.id),a=e.private&&!e.mine,o=[...e.text].length,c=a?"secret":o<=14?"xl":o<=44?"l":"m",p=e.private?"private":Zt[s%Zt.length],h=te[(s>>4)%te.length],l=(s>>8)%2?"r":"l";return M(`<li class="note n-${p} n-${c} n-${l}" data-id="${e.id}" style="--w:${h}%">
    ${a?'<p class="note-seal" aria-hidden="true"></p><p class="note-text">留了一則悄悄話給新人</p>':`${e.private?'<p class="note-tag">悄悄話・內容只有你和新人看得到</p>':""}<p class="note-text">${N(e.text)}</p>`}
    <p class="note-by"><span class="note-name">${N(e.name)}</span><time datetime="${new Date(e.ts).toISOString()}" data-ts="${e.ts}">${e.mine?"你・":""}${ce(e.ts,t)}</time></p>
  </li>`)}function _e(e){const t=M(`<div class="screen notes-screen screen-enter">
    ${bt("notes")}
    <main class="notes">
      <header class="notes-hi">
        <p class="notes-meta rise" data-note-count></p>
        <p class="notes-script script write" style="--d:300ms" aria-hidden="true">love</p>
        <p class="notes-display display" data-fit-box aria-hidden="true"><span class="mask"><span data-fit>Notes</span></span></p>
        <h1 class="notes-h rise" style="--i:1">留言板</h1>
        <p class="rise" style="--i:2">留一句祝福、一段回憶，或任何想對我們說的話。可以讓大家都看到，也可以只給我們兩個人看。</p>
      </header>
      <ol class="wall" data-wall aria-label="大家的留言"></ol>
      <p class="wall-loading" role="status">載入中…</p>
      <p class="wall-empty" hidden>還沒有人留言。<br>你可以當第一個。</p>
    </main>
    <div class="notes-cta">
      <button class="btn" type="button" data-write>我要留言 <span class="arrow" aria-hidden="true">→</span></button>
    </div>
  </div>`);e.append(t),et(t);const s=t.querySelector("[data-wall]"),a=t.querySelector(".wall-empty"),o=t.querySelector(".wall-loading"),c=t.querySelector("[data-note-count]"),p=t.querySelector("[data-write]");let h=!0;const l=()=>{const $=Date.now(),g=n.notes,y=new Map([...s.children].map(v=>[v.dataset.id,v])),L=new Set(g.map(v=>v.id));for(const[v,w]of y)L.has(v)||w.remove();let P=null;g.forEach((v,w)=>{let b=y.get(v.id);b||(b=Je(v,$),h?(b.classList.add("rise"),b.style.setProperty("--i",String(Math.min(w,8)+2))):b.classList.add("arrive"),P?P.after(b):s.prepend(b)),P=b}),h=!1,o.hidden=n.booted;const d=Math.max(n.stats.notes,g.length);c.textContent=n.booted?d?`已經有 ${Q(d)} 則留言`:"":"載入中…",a.hidden=g.length>0||!n.booted,p.disabled=!n.config.notesOpen,p.innerHTML=n.config.notesOpen?'我要留言 <span class="arrow" aria-hidden="true">→</span>':"留言板已經關閉了"};l();const f=window.setInterval(()=>{const $=Date.now();s.querySelectorAll("time[data-ts]").forEach(g=>{const y=g.textContent.startsWith("你・")?"你・":"";g.textContent=y+ce(Number(g.dataset.ts),$)})},6e4);p.addEventListener("click",ee),location.hash.endsWith("/write")&&setTimeout(ee,300);const m=[R("notes",l),R("stats",l),R("config",l)];return()=>{m.forEach($=>$()),clearInterval(f)}}function ee(){const e=n.guest.name;let t="";try{t=localStorage.getItem(zt)??""}catch{}const s=he(`<h2 class="sheet-title">寫下留言</h2>
    <form class="compose" novalidate>
      <div class="slip">
        <label class="sr" for="note-text">想對我們說的話</label>
        <textarea id="note-text" maxlength="300" rows="6" placeholder="想對我們說的話…" aria-describedby="note-len"></textarea>
        <p class="slip-by">${N(e)}</p>
      </div>
      <p class="slip-len" id="note-len">0 / 300 字</p>
      <fieldset class="who">
        <legend>誰看得到這則留言</legend>
        <label><input type="radio" name="who" value="public" checked><span>公開留言</span></label>
        <label><input type="radio" name="who" value="private"><span>悄悄話<small>只給新人看</small></span></label>
      </fieldset>
      <p class="who-note" data-who-note>會出現在留言板上，大家都看得到，署名「${N(e)}」。</p>
      <button class="btn send" type="submit" disabled>送出留言 <span class="arrow" aria-hidden="true">→</span></button>
    </form>`,{cls:"sheet-compose",label:"寫下留言"}),a=s.querySelector("form"),o=a.querySelector("textarea"),c=a.querySelector(".slip-len"),p=a.querySelector(".send"),h=a.querySelector("[data-who-note]");o.value=t;const l=()=>{c.textContent=`${[...o.value].length} / 300 字`,p.disabled=!o.value.trim();try{localStorage.setItem(zt,o.value)}catch{}};l(),o.addEventListener("input",l),a.addEventListener("change",()=>{const f=a.elements.namedItem("who").value==="private";a.classList.toggle("is-private",f),h.textContent=f?`留言板上大家只會看到「${e} 留了一則悄悄話給新人」，內容只有昇翰和優看得到（你自己也看得到）。`:`會出現在留言板上，大家都看得到，署名「${e}」。`}),setTimeout(()=>o.focus(),380),a.addEventListener("submit",async f=>{f.preventDefault();const m=o.value.trim();if(!m)return;const $=a.elements.namedItem("who").value==="private";p.disabled=!0,p.textContent="送出中…";try{await Me(m,$);try{localStorage.removeItem(zt)}catch{}vt(12);const g=a.querySelector(".slip");C()||await g.animate([{transform:"none",opacity:1},{transform:"translateY(-40vh) scale(0.9)",opacity:0}],{duration:600,easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)",fill:"forwards"}).finished,s.close(),window.scrollTo({top:0,behavior:C()?"auto":"smooth"}),Ke()?setTimeout(()=>Ze($),C()?400:1e3):Mt($?"悄悄話送出了，內容只有新人看得到。":"留言送出了，謝謝你。")}catch{p.disabled=!1,p.innerHTML='再送一次 <span class="arrow" aria-hidden="true">→</span>',Mt("沒送出去，連線不太穩。內容還在，再按一次試試看。")}})}function Ke(){if(n.result||!n.config.quizOpen||!n.quiz.length)return!1;try{return localStorage.getItem(fe)!=="1"}catch{return!1}}function Ze(e){try{localStorage.setItem(fe,"1")}catch{}const t=n.quiz.length,s=X.get()?.answers.length??0,a=s>0&&s<t,o=he(`<div class="invite">
      <p class="invite-script script" aria-hidden="true">let's play</p>
      <h2 class="sheet-title">${e?"悄悄話送出了":"謝謝你的留言"}</h2>
      ${e?'<p class="invite-sub">內容只有新人看得到。</p>':""}
      <p class="invite-lead">${a?`你的小遊戲「你有多懂我們？」還沒寫完，第 ${s+1} 題在等你。`:`我們還準備了一個小遊戲「你有多懂我們？」，${t} 題選擇題，都是關於我們兩個人的事。來玩玩看吧！`}</p>
      <button class="btn" type="button" data-play>${a?"繼續作答":"去玩遊戲"} <span class="arrow" aria-hidden="true">→</span></button>
      <button class="btn quiet" type="button" data-close>先不用，看看大家的留言</button>
    </div>`,{cls:"sheet-invite",label:"邀請你玩小遊戲"});o.querySelector("[data-play]").addEventListener("click",()=>{let c=!1;const p=()=>{c||(c=!0,removeEventListener("popstate",p),location.hash="#/quiz")};addEventListener("popstate",p,{once:!0}),setTimeout(p,600),o.close()})}const ts=["答對了。","沒錯，就是這個。","你很懂。","對！"],es=["差一點。","不是這個喔。","猜錯了，沒關係。","嗯，不是這個。"];function ss(e){return e>=100?"全對。你可能比我們還懂我們。":e>=80?"你一定是一路看著我們走過來的人。":e>=60?"已經很懂我們了，剩下的，今天補上。":e>=40?"一半一半，剛剛好。剩下的故事，等一下敬酒的時候問我們。":"沒關係。答錯的每一題，都是今天認識我們的理由。謝謝你來。"}function as(e){const t=M(`<div class="screen quiz-screen screen-enter">${bt("quiz")}<main class="quiz"></main></div>`);e.append(t);const s=t.querySelector("main");let a="intro",o=0;const c=()=>{if(n.result&&(a="result"),a==="result"&&n.result)return $(n.result);const d=X.get();if(a==="q"&&d)return h(Math.min(d.answers.length,n.quiz.length-1));p()};function p(){a="intro";const d=X.get(),v=n.quiz.length,w=n.config.quizOpen;s.className="quiz quiz-intro",s.innerHTML=`
      <p class="quiz-meta rise">共 ${v} 題</p>
      <p class="quiz-script script write" style="--d:300ms" aria-hidden="true">how well</p>
      <p class="quiz-display display" data-fit-box aria-hidden="true"><span class="mask"><span data-fit>Do you know us</span></span></p>
      <h1 class="quiz-title rise" style="--i:1">你有多懂我們？</h1>
      <p class="quiz-lead rise" style="--i:2">${v} 題選擇題，都是關於我們兩個人的事。</p>
      <ul class="quiz-rules rise" style="--i:3">
        <li>每個人只有一次機會，交卷之後就不能重來。</li>
        <li>中途離開沒關係，回來可以接著寫。</li>
        <li>答對最多的人，沒有獎品，但你擁有可以炫耀一整天的權力。</li>
        <li class="quiz-secret">這只是個小遊戲，玩得開心最重要。答案請放在心裡，別悄悄告訴同桌的朋友喔。</li>
      </ul>
      <div class="quiz-go rise" style="--i:4">
        ${n.booted?w?`<button class="btn" type="button" data-start>${d?.answers.length?`接著寫第 ${d.answers.length+1} 題`:"開始作答"} <span class="arrow" aria-hidden="true">→</span></button>`:'<p class="quiz-closed">遊戲現在沒有開放作答，等一下再來看看。</p>':'<button class="btn" type="button" disabled>載入中…</button>'}
      </div>`,et(s),s.querySelector("[data-start]")?.addEventListener("click",()=>{X.get()||X.set({answers:[],started:Date.now()}),a="q",c()})}function h(d){o=d;const v=n.quiz[d],w=n.quiz.length;s.className="quiz quiz-q",s.innerHTML=`
      <div class="q-progress" aria-hidden="true"><span>第 ${d+1} 題</span><span>共 ${w} 題</span></div>
      <div class="q-bar" aria-hidden="true"><i style="transform:scaleX(${d/w})"></i></div>
      <h1 class="q-text rise"><span class="sr">第 ${d+1} 題，共 ${w} 題：</span>${N(v.q)}</h1>
      <ol class="q-options">
        ${v.options.map((b,k)=>`<li class="rise" style="--i:${k+1}"><button class="opt" type="button" data-k="${k}"><span class="opt-k latin">${"ABCDEF"[k]}</span><span class="opt-t">${N(b)}</span></button></li>`).join("")}
      </ol>
      <div class="q-reveal" hidden>
        <p class="q-verdict" role="status"></p>
        ${v.note?`<p class="q-note">${N(v.note)}</p>`:""}
        <button class="btn" type="button" data-next></button>
        ${d===w-1?'<p class="q-last">交卷之後就不能再作答囉。</p>':""}
      </div>`,requestAnimationFrame(()=>s.querySelector(".q-bar i").style.transform=`scaleX(${(d+.5)/w})`),s.querySelectorAll(".opt").forEach(b=>b.addEventListener("click",()=>l(Number(b.dataset.k)))),window.scrollTo({top:0})}function l(d){const v=n.quiz[o],w=X.get()??{answers:[],started:Date.now()};w.answers=w.answers.slice(0,o),w.answers[o]=d,X.set(w);const b=d===v.answer;vt(b?12:[8,60,8]),s.querySelectorAll(".opt").forEach(E=>{const D=Number(E.dataset.k);E.disabled=!0,D===v.answer&&E.classList.add("right"),D===d&&E.classList.add("picked",b?"is-right":"is-wrong"),D!==v.answer&&D!==d&&E.classList.add("dim")});const k=s.querySelector(".q-reveal"),x=o===n.quiz.length-1;k.querySelector(".q-verdict").textContent=(b?ts:es)[o%4],k.classList.toggle("is-right",b);const O=k.querySelector("[data-next]");O.innerHTML=x?'交卷，看結果 <span class="arrow" aria-hidden="true">→</span>':'下一題 <span class="arrow" aria-hidden="true">→</span>',k.hidden=!1,k.classList.add("rise"),s.querySelector(".q-bar i").style.transform=`scaleX(${(o+1)/n.quiz.length})`,O.addEventListener("click",()=>x?m():f()),setTimeout(()=>k.scrollIntoView({behavior:C()?"auto":"smooth",block:"nearest"}),120)}function f(){if(C())return h(o+1);s.animate([{opacity:1,transform:"none"},{opacity:0,transform:"translateX(-24px)"}],{duration:200,easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"}).onfinish=()=>h(o+1)}async function m(){const d=X.get(),v=s.querySelector("[data-next]");v.disabled=!0,v.textContent="改考卷中…";const w=n.quiz.map((b,k)=>d.answers[k]??-1);try{const b=await Te(w,Date.now()-d.started);a="result",$(b,!0)}catch(b){v.disabled=!1,v.innerHTML='再交一次 <span class="arrow" aria-hidden="true">→</span>',Mt(b instanceof Error&&b.message?b.message:"沒交出去，連線不太穩，再按一次試試看。")}}function $(d,v=!1){s.className="quiz quiz-result";const w=n.config.boardSize,b=d.players>1?Math.round((d.players-d.rank)/(d.players-1)*100):0,k=d.rank<=w&&d.pct>=n.config.boardMinPct?`你在排行榜上，第 ${d.rank} 名。`:b>=50?`你贏過了 ${b}% 的賓客。`:"";if(s.innerHTML=`
      <p class="r-meta rise">你的分數</p>
      <p class="r-pct latin" aria-label="${d.pct} 分"><span class="mask"><span><span data-pct>${v&&!C()?0:d.pct}</span><span class="r-unit">分</span></span></span></p>
      <p class="r-line rise" style="--i:1">答對 ${d.score} 題，共 ${d.total} 題。${k}</p>
      <p class="r-msg rise" style="--i:2">${ss(d.pct)}</p>

      <section class="board-wrap rise" style="--i:3" aria-labelledby="board-h">
        <h2 id="board-h" class="board-h">排行榜 <span>前 ${w} 名</span></h2>
        <ol class="board" data-board></ol>
        <p class="board-note">前 ${w} 名沒有獎品，但你擁有可以炫耀一整天的權力。</p>
      </section>

      <details class="review rise" style="--i:4">
        <summary>看看每一題的答案</summary>
        <p class="review-secret">看完答案，也請幫我們保密，讓還沒玩的朋友也能好好猜一猜。</p>
        <ol class="review-list">
          ${n.quiz.map((x,O)=>{const E=d.answers[O],D=E===x.answer;return`<li class="${D?"ok":"no"}">
                <p class="rv-q">${N(x.q)}</p>
                <p class="rv-a">${D?"你答對了：":`你選了「${N(x.options[E]??"沒有作答")}」，答案是：`}<strong>${N(x.options[x.answer])}</strong></p>
                ${x.note?`<p class="rv-note">${N(x.note)}</p>`:""}
              </li>`}).join("")}
        </ol>
      </details>

      <div class="r-next rise" style="--i:5">
        <a class="btn" href="#/notes">到留言板留言給我們 <span class="arrow" aria-hidden="true">→</span></a>
        <a class="btn quiet" href="#/album">翻翻相冊</a>
      </div>`,g(),v&&!C()){const x=s.querySelector("[data-pct]"),O=performance.now(),E=D=>{const at=Math.min(1,(D-O)/1400);x.textContent=String(Math.round(d.pct*(1-Math.pow(1-at,3)))),at<1&&requestAnimationFrame(E)};requestAnimationFrame(E),window.scrollTo({top:0})}}function g(){const d=s.querySelector("[data-board]");if(!d)return;const v=n.board;if(!n.booted){d.innerHTML='<li class="b-empty">載入中…</li>';return}d.innerHTML=v.length?v.map((w,b)=>`<li class="${w.mine?"mine":""}">
              <span class="b-rank latin">${b+1}</span>
              <span class="b-name">${N(w.name)}${w.mine?"<em>（你）</em>":""}</span>
              <span class="b-pct">${w.pct} 分</span>
            </li>`).join(""):'<li class="b-empty">排行榜正在等第一個交卷的人。</li>'}c();const y=()=>`${n.booted}/${n.config.quizOpen}/${n.quiz.length}`;let L=y();const P=[R("board",g),R("result",()=>a!=="q"&&c()),R("config",()=>{const d=y();d!==L&&a==="intro"&&c(),L=d})];return()=>P.forEach(d=>d())}const ns={"":Ye,home:pe,album:Qe,notes:_e,quiz:as},se=document.getElementById("app");let ae,Et="";function ne(){Ae();const[,e="",t]=location.hash.replace(/^#/,"").split("/"),s=n.guest?e:"";!n.guest&&e&&history.replaceState(null,"","#/");const a=ns[s]??pe,o=`${s}/${t??""}`;if(o===Et)return;const c=Et.split("/")[0]===s;Et=o,!(c&&s==="album")&&(ae?.(),se.replaceChildren(),document.body.dataset.view=s||"intro",window.scrollTo(0,0),ae=a(se,t))}if(new URLSearchParams(location.search).has("reset")){Ce();const e=new URL(location.href);e.searchParams.delete("reset"),location.replace(`${e.pathname}${e.search}#/`)}else is();function is(){We(),n.guest&&Ht(),ze(),window.addEventListener("hashchange",ne),ne()}
