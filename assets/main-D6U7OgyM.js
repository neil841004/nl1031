import{D as te,d as he,f as me,h as lt,r as X,g as T,i as Z,$ as jt,S as N,p as tt,c as Tt,e as O,j as Ct,k as Lt,t as ht,P as R,s as $t,l as ye,m as ge,n as ve,C as St,o as mt,b as ee}from"./photos-C84wT6Q6.js";const H={get(e,t){try{const s=localStorage.getItem(e);return s?JSON.parse(s):t}catch{return t}},set(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}},a={api:null,guest:H.get("nl:guest",null),config:he,quiz:te,likes:{},myLikes:new Set(H.get("nl:likes",[])),notes:[],board:[],result:H.get("nl:result",null),stats:{guests:0,notes:0,players:0,likes:0},booted:!1,online:!0,since:0},at=new Map;function F(e,t){return at.has(e)||at.set(e,new Set),at.get(e).add(t),()=>at.get(e).delete(t)}function j(...e){for(const t of e)at.get(t)?.forEach(s=>s())}let be=null;const st=()=>be??(be=me().then(e=>a.api=e));function et(e){a.online!==e&&(a.online=e,j("net"))}async function we(e){const s=await(await st()).join(e,a.guest?.gid);return a.guest=s,H.set("nl:guest",s),j("guest"),It(),s}let Wt=null;function It(){return a.guest?Wt??(Wt=(async()=>{try{const e=await st();let t=await e.boot(a.guest.gid);if(t.known===!1){const s=await e.join(a.guest.name);a.guest=s,H.set("nl:guest",s),H.set("nl:likes-sent",[]),t=await e.boot(s.gid),a.result=null,H.set("nl:result",null)}a.config=t.config,a.quiz=t.quiz.length?t.quiz:te,it=new Set(t.myLikes),B||(a.myLikes=new Set(t.myLikes)),a.likes=t.likes,At(),a.notes=Ht(t.notes),a.board=t.board,a.result=t.result??a.result,t.result&&H.set("nl:result",t.result),a.stats=t.stats,a.since=t.now,a.booted=!0,et(!0),j("likes","notes","board","stats","result","config"),B&&rt()}catch{et(!1),setTimeout(()=>(Wt=null,It()),6e3)}})()):Promise.resolve()}let dt=0,ut=!1;function $e(){if(ut)return;ut=!0;const e=async()=>{if(dt=0,!ut)return;if(document.visibilityState==="visible"&&a.booted&&a.guest)try{const n=await(await st()).poll(a.guest.gid,a.since);!B&&!ft&&(a.likes=n.likes,At(),j("likes"));const o=new Set(a.notes.map(v=>v.id)),c=n.notes.filter(v=>!o.has(v.id)),r=new Set(n.hidden),h=a.notes.length;a.notes=Ht([...a.notes.filter(v=>!r.has(v.id)),...c]),(c.length||a.notes.length!==h)&&j("notes"),a.board=n.board,a.stats=n.stats,a.config=n.config,a.since=Math.max(a.since,n.now-6e4),et(!0),j("board","stats","config")}catch{et(!1)}const t=a.api?.kind==="local"?4e3:2e4+Math.random()*8e3;dt=window.setTimeout(e,t)};e(),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&ut&&dt&&(clearTimeout(dt),e())})}let B=H.get("nl:likes-dirty",!1),ft=!1,it=new Set(H.get("nl:likes-sent",[])),ot=0;function At(){for(const e of new Set([...a.myLikes,...it])){const t=(a.myLikes.has(e)?1:0)-(it.has(e)?1:0);t&&(a.likes[e]=Math.max(0,(a.likes[e]??0)+t))}}function Xt(e){return a.myLikes.has(e)}function se(e){return a.likes[e]??0}function ke(e,t){const s=a.myLikes.has(e),n=t??!s;return n===s||(n?a.myLikes.add(e):a.myLikes.delete(e),a.likes[e]=Math.max(0,(a.likes[e]??0)+(n?1:-1)),H.set("nl:likes",[...a.myLikes]),B=!0,H.set("nl:likes-dirty",!0),j("likes"),clearTimeout(ot),ot=window.setTimeout(rt,900)),n}async function rt(){if(!a.guest||ft)return;ft=!0;const e=new Set(a.myLikes);B=!1;try{const s=await(await st()).setLikes(a.guest.gid,[...e]);it=e,H.set("nl:likes-sent",[...it]),a.likes=s.likes,At(),H.set("nl:likes-dirty",B),et(!0),j("likes")}catch{B=!0,et(!1),ot=window.setTimeout(rt,8e3)}finally{ft=!1,B&&(clearTimeout(ot),ot=window.setTimeout(rt,900))}}window.addEventListener("pagehide",()=>{B&&rt()});function Ht(e){return[...e].sort((t,s)=>s.ts-t.ts)}async function xe(e,t){const n=await(await st()).postNote(a.guest.gid,a.guest.name,e,t);return a.notes=Ht([n,...a.notes.filter(o=>o.id!==n.id)]),t||a.stats.notes++,j("notes","stats"),n}const G={get:()=>H.get(`nl:quiz:${a.guest?.gid}`,null),set:e=>H.set(`nl:quiz:${a.guest?.gid}`,e)};async function qe(e,t){const s=await st(),n=await s.submitQuiz(a.guest.gid,a.guest.name,e,t);return a.result=n,H.set("nl:result",n),j("result"),s.poll(a.guest.gid,a.since).then(o=>{a.board=o.board,a.stats=o.stats,j("board","stats")},()=>{}),n}const J=[];let zt=0;function ne(e){history.pushState({overlay:!0},"");const t={close:e,done:!1};return J.push(t),()=>{if(t.done)return;t.done=!0;const s=J.indexOf(t);s>=0&&J.splice(s,1),zt++,history.back()}}addEventListener("popstate",()=>{if(zt){zt--;return}const e=J.pop();e&&!e.done&&(e.done=!0,e.close())});function Le(){for(;J.length;){const e=J.pop();e.done||(e.done=!0,e.close())}}const Se="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",yt=(e="")=>`<svg class="${e}" viewBox="0 0 24 24" aria-hidden="true"><path d="${Se}"/></svg>`;function ae(e){const t=Xt(e);return`<button class="like ${t?"on":""}" data-like="${e}" aria-pressed="${t}" aria-label="喜歡這張照片">
    <span class="like-icon">${yt("o")}${yt("f")}</span>
    <span class="like-n" data-count="${e}">${Z(se(e))}</span>
  </button>`}let ze=null;const oe=()=>ze??(ze=document.body.appendChild(T('<div class="heart-layer" aria-hidden="true"></div>'))),Bt=["var(--heart)","var(--heart)","#f07b8c","#f6b3bd","#ffffff","#c92f4a"];function ie(e,t,s=22){if(X())return;const n=oe();for(let o=0;o<s;o++){const c=T(`<span class="burst">${yt()}</span>`),r=10+Math.random()*22;c.style.cssText=`left:${e}px;top:${t}px;width:${r}px;height:${r}px;color:${Bt[o%Bt.length]}`,n.appendChild(c);const h=-Math.PI/2+(Math.random()-.5)*Math.PI*1.25,v=50+Math.random()*150,x=Math.cos(h)*v,g=Math.sin(h)*v-40-Math.random()*80,m=(Math.random()-.5)*70,$=850+Math.random()*650;c.animate([{transform:"translate(-50%,-50%) scale(0.2) rotate(0deg)",opacity:0},{transform:`translate(calc(-50% + ${x*.35}px), calc(-50% + ${g*.35}px)) scale(1.15) rotate(${m*.5}deg)`,opacity:1,offset:.22},{transform:`translate(calc(-50% + ${x}px), calc(-50% + ${g}px)) scale(0.85) rotate(${m}deg)`,opacity:0}],{duration:$,delay:Math.random()*120,easing:"cubic-bezier(0.22, 1, 0.36, 1)",fill:"both"}).onfinish=()=>c.remove()}}function re(e,t,s){const n=e.getBoundingClientRect(),o=t??n.left+n.width/2,c=s??n.top+n.height/2,r=T(`<span class="big-heart">${yt()}</span>`);if(r.style.cssText=`left:${o}px;top:${c}px`,oe().appendChild(r),X()){r.animate([{opacity:1},{opacity:0}],{duration:600}).onfinish=()=>r.remove();return}r.animate([{transform:"translate(-50%,-50%) scale(0)",opacity:0},{transform:"translate(-50%,-50%) scale(1.18)",opacity:1,offset:.25},{transform:"translate(-50%,-50%) scale(0.96)",opacity:1,offset:.4},{transform:"translate(-50%,-50%) scale(1)",opacity:1,offset:.7},{transform:"translate(-50%,-62%) scale(0.9)",opacity:0}],{duration:1e3,easing:"cubic-bezier(0.22, 1, 0.36, 1)"}).onfinish=()=>r.remove(),ie(o,c,16)}function Nt(e,t,s){const n=ke(e,s);if(n){lt(10);const o=t??document.querySelector(`[data-like="${e}"]`);if(o){const c=o.querySelector(".like-icon").getBoundingClientRect();ie(c.left+c.width/2,c.top+c.height/2)}}return n}function Ee(){document.addEventListener("click",t=>{const s=t.target.closest("[data-like]");s&&(t.stopPropagation(),Nt(s.dataset.like,s))});let e={};F("likes",()=>{for(const t of jt("[data-like]")){const s=t.dataset.like,n=Xt(s);t.classList.contains("on")!==n&&(t.classList.toggle("on",n),t.setAttribute("aria-pressed",String(n)),n&&t.querySelector(".f")?.animate([{transform:"scale(0.4)"},{transform:"scale(1.25)"},{transform:"scale(1)"}],{duration:420,easing:"cubic-bezier(0.22, 1, 0.36, 1)"}))}for(const t of jt("[data-count]")){const s=t.dataset.count,n=se(s);t.textContent!==Z(n)&&Me(t,n,(e[s]??n)<n),e[s]=n}})}function Me(e,t,s=!0){const n=Z(t);if(X()||!e.isConnected){e.textContent=n;return}e.animate([{transform:"translateY(0)",opacity:1},{transform:`translateY(${s?-60:60}%)`,opacity:0}],{duration:160,easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"}).onfinish=()=>{e.textContent=n,e.animate([{transform:`translateY(${s?60:-60}%)`,opacity:0},{transform:"translateY(0)",opacity:1}],{duration:260,easing:"cubic-bezier(0.22, 1, 0.36, 1)"})}}function gt(e){Qt(e),document.fonts?.ready.then(()=>Qt(e))}function Qt(e){e.querySelectorAll("[data-fit]").forEach(t=>{const s=t.closest("[data-fit-box]")??t.parentElement.closest("h1, h2, p, div, a"),n=Number(t.dataset.fit)||1/0;t.style.fontSize="100px",t.style.whiteSpace="nowrap",t.style.display="inline-block";const o=t.getBoundingClientRect().width,c=getComputedStyle(s),r=s.clientWidth-parseFloat(c.paddingLeft)-parseFloat(c.paddingRight);o&&r>0&&(t.style.fontSize=`${Math.min(n,Math.floor(100*r/o*.99*10)/10)}px`),t.style.display=""})}const Gt=["3531","3628","3673","3736","3789"],Te=3200;function Ce(e){const t=a.guest,s=T(`<main class="screen intro">
    <div class="intro-photo" aria-hidden="true">
      ${Gt.map((g,m)=>tt(Tt.get(g),{eager:m===0,pos:!1,sizes:"(min-width: 900px) 47vw, 100vw",cls:`shot${m===0?" now":""}`})).join("")}
    </div>
    <div class="intro-copy">
      <h1 class="intro-name">
        <span class="mask"><span class="latin" data-fit>${N.groomEn} &amp; ${N.brideEn}</span></span>
        <span class="sr">${N.groom}與${N.bride}的婚禮</span>
      </h1>
      <p class="intro-line rise" style="--d:500ms">${N.groom} × ${N.bride}　${N.date}<br>${N.venue}</p>
      ${t?`<div class="intro-ask rise" style="--d:900ms">
              <p class="ask-q">歡迎回來，${O(t.name)}。</p>
              <div class="ask-row">
                <a class="btn" href="#/home">繼續 <span class="arrow" aria-hidden="true">→</span></a>
                <button class="btn quiet" type="button" data-rename>換個稱呼</button>
              </div>
            </div>`:""}
      <form class="intro-ask rise" style="--d:900ms" ${t?"hidden":""} novalidate>
        <label class="ask-q" for="guest-name">我們該怎麼稱呼你？</label>
        <div class="ask-field">
          <input id="guest-name" name="name" type="text" autocomplete="nickname" enterkeyhint="go" maxlength="20"
            placeholder="例如：阿哲、王伯伯、大安圖傳 103" aria-describedby="name-note" />
        </div>
        <p class="ask-note" id="name-note">這個稱呼會出現在你的紙條與排行榜上。</p>
        <button class="btn ask-go" type="submit">進場 <span class="arrow" aria-hidden="true">→</span></button>
      </form>
    </div>
  </main>`);e.append(s),Ct(s),gt(s);const n=[...s.querySelectorAll(".shot")];Gt.slice(1).forEach(g=>Lt(g));let o=0;const c=X()?0:window.setInterval(()=>{const g=n[o];o=(o+1)%n.length;const m=n[o];n.forEach($=>$.classList.remove("top")),g.classList.add("under"),m.classList.remove("now","under"),m.offsetWidth,m.classList.add("now","top"),setTimeout(()=>g.classList.remove("now","under"),1600)},Te),r=s.querySelector("form"),h=r.querySelector("input"),v=r.querySelector(".ask-go");h.addEventListener("focus",()=>s.classList.add("typing")),h.addEventListener("blur",()=>setTimeout(()=>s.classList.remove("typing"),120)),s.querySelector("[data-rename]")?.addEventListener("click",()=>{s.querySelector(".intro-ask:not(form)")?.remove(),r.hidden=!1,h.value=t?.name??"",h.focus()}),r.addEventListener("submit",async g=>{g.preventDefault();const m=h.value.trim().replace(/\s+/g," ").slice(0,20);if(!m){h.focus(),r.querySelector(".ask-field").animate([{transform:"translateX(0)"},{transform:"translateX(-6px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:360,easing:"cubic-bezier(0.22, 1, 0.36, 1)"});return}v.disabled=!0,v.innerHTML="進場中…";try{await we(m),h.blur(),s.classList.add("leaving"),setTimeout(()=>location.hash="#/home",X()?0:420)}catch{ht("連線不太穩，再按一次試試看"),v.disabled=!1,v.innerHTML='進場 <span class="arrow" aria-hidden="true">→</span>'}});const x=()=>gt(s);return addEventListener("resize",x),()=>{clearInterval(c),removeEventListener("resize",x)}}function vt(e){const t=(s,n)=>`<a href="#/${s}" ${e===s?'aria-current="page"':""}>${n}</a>`;return`<header class="bar">
    <a class="mark" href="#/home" aria-label="回到首頁">N&amp;L</a>
    <nav aria-label="主選單">${t("album","相冊")}${t("notes","紙條")}${t("quiz","遊戲")}</nav>
  </header>`}function Ie(e){if(!("IntersectionObserver"in window))return()=>{};e.classList.add("js-reveal");const t=new IntersectionObserver(n=>{for(const o of n)o.isIntersecting&&(o.target.classList.add("in"),t.unobserve(o.target))},{rootMargin:"0px 0px -8% 0px"}),s=()=>e.querySelectorAll("[data-reveal]:not(.in)").forEach(n=>t.observe(n));return s(),Object.assign(()=>t.disconnect(),{watch:s})}function le(e){const t=a.guest,s=T(`<div class="screen home screen-enter">
    ${vt("home")}
    <main>
      <header class="home-hi">
        <h1 class="rise">${O(t.name)}，歡迎你來。</h1>
        <p class="rise" style="--i:1">這裡有我們的婚紗照、可以傳給我們的紙條，和一份關於我們兩個人的小考。</p>
        <p class="home-count rise" style="--i:2" data-stat-guests></p>
      </header>

      <a class="door door-album" href="#/album">
        <div class="door-photo rise" style="--i:3">${tt(Tt.get("3783"),{sizes:"100vw",eager:!0})}</div>
        <h2 class="door-word"><span class="mask"><span style="--d:380ms">相冊</span></span></h2>
        <p class="door-meta rise" style="--i:4"><span class="latin">Album</span><span data-album-meta></span></p>
      </a>

      <a class="door door-notes" href="#/notes">
        <h2 class="door-word" data-reveal><span>傳紙條</span></h2>
        <blockquote class="door-quote" data-latest-note data-reveal style="--i:1"></blockquote>
        <p class="door-meta" data-reveal style="--i:2"><span class="latin">Notes</span><span data-notes-meta></span></p>
      </a>

      <a class="door door-quiz" href="#/quiz">
        <h2 class="door-word" data-reveal><span>考考你</span></h2>
        <p class="door-sub" data-quiz-sub data-reveal style="--i:1"></p>
        <p class="door-meta" data-reveal style="--i:2"><span class="latin">Quiz</span><span data-quiz-meta></span></p>
      </a>
    </main>

    <footer class="home-foot">
      <p class="foot-name" data-fit-box data-reveal><span class="latin" data-fit>${N.groomEn} &amp; ${N.brideEn}</span></p>
      <div class="foot-row">
        <p>${N.groom} × ${N.bride}<br>${N.date}　${N.venue}</p>
        <a class="btn quiet" href="#/">換個稱呼</a>
      </div>
    </footer>
  </div>`);e.append(s),Ct(s),gt(s);const n=Ie(s),o=v=>s.querySelector(v),c=()=>{const v=a.stats;o("[data-stat-guests]").textContent=v.guests>1?`已經有 ${Z(v.guests)} 位賓客進場。`:"";const x=a.myLikes.size;o("[data-album-meta]").textContent=`${R.length} 張婚紗照${x?`，你按了 ${x} 顆愛心`:""}`;const g=a.notes.find(L=>!L.private);o("[data-latest-note]").innerHTML=g?`<p>${O(g.text.length>46?g.text.slice(0,46)+"…":g.text)}</p><cite>${O(g.name)}</cite>`:"<p>還沒有人傳紙條。你可以當第一個。</p>",o("[data-notes-meta]").textContent=v.notes?`${Z(v.notes)} 張紙條`:"寫一張給我們";const m=a.result,$=G.get(),P=a.quiz.length;o("[data-quiz-sub]").textContent=m?`你答對了 ${m.score} 題，答對率 ${m.pct}%。`:$&&$.answers.length?`你寫到第 ${$.answers.length} 題，回來把它寫完吧。`:`${P} 題選擇題，沒有時間限制，每個人只有一次機會。`,o("[data-quiz-meta]").textContent=m?"看排行榜":$?.answers.length?"繼續作答":"開始作答"};c();const r=[F("stats",c),F("notes",c),F("likes",c),F("result",c),F("config",c)],h=()=>gt(s);return addEventListener("resize",h),()=>{r.forEach(v=>v()),n(),removeEventListener("resize",h)}}let kt=null,Kt=!1;function Ae(e){if(kt)return;let t=R.findIndex(p=>p.id===e);if(t<0)return;const s=document.activeElement,n=T(`<div class="lightbox" role="dialog" aria-modal="true" aria-label="照片">
    <div class="lb-top">
      <p class="lb-n" aria-live="polite"></p>
      <button class="lb-x" type="button" aria-label="關閉">關閉</button>
    </div>
    <div class="lb-track"></div>
    <div class="lb-foot">
      <div class="lb-like"></div>
      <p class="lb-hint" hidden>把手機轉橫，看得更清楚</p>
    </div>
  </div>`);kt=n,document.body.append(n),document.documentElement.style.overflow="hidden";const o=n.querySelector(".lb-track");requestAnimationFrame(()=>n.classList.add("open"));const c=p=>{const w=R[p];return w?T(`<div class="lb-slide" data-id="${w.id}">
      <img src="${$t(w.id,1280)}" srcset="${ge(w.id)}" sizes="100vw" alt="" style="aspect-ratio:${w.w}/${w.h};background:${w.color} url(${w.lqip}) center/cover" decoding="async">
    </div>`):T('<div class="lb-slide"></div>')};let r=[];const h=()=>{r=[c(t-1),c(t),c(t+1)],o.replaceChildren(...r),r.forEach((q,I)=>q.style.transform=`translateX(${(I-1)*100}%)`);const p=R[t];n.querySelector(".lb-n").textContent=`${t+1} / ${R.length}`,n.querySelector(".lb-like").innerHTML=ae(p.id);const w=!Kt&&ye(p)&&innerHeight>innerWidth;n.querySelector(".lb-hint").hidden=!w,w&&(Kt=!0),[t-1,t+1].forEach(q=>R[q]&&(new Image().src=$t(R[q].id,1280))),l={s:1,x:0,y:0}};h();const v=()=>{n.classList.remove("open"),n.classList.add("closing"),document.documentElement.style.overflow="",removeEventListener("keydown",P),setTimeout(()=>n.remove(),X()?0:300),kt=null,s?.focus?.()},x=ne(v),g=()=>{x(),v()},m=p=>{const w=t+p;if(!R[w])return $(0);$(-p*100,()=>{t=w,h()})};function $(p,w){o.style.transition=X()?"none":"transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",o.style.transform=`translateX(${p}%)`;const q=()=>{o.style.transition="none",o.style.transform="translateX(0)",w?.()};X()?q():setTimeout(q,330)}const P=p=>{p.key==="Escape"?g():p.key==="ArrowRight"?m(1):p.key==="ArrowLeft"&&m(-1)};addEventListener("keydown",P),n.querySelector(".lb-x").addEventListener("click",g),setTimeout(()=>n.querySelector(".lb-x").focus({preventScroll:!0}),50);const L=new Map;let l={s:1,x:0,y:0},u=null,k=0,y=0;const z=()=>r[1]?.querySelector("img"),M=()=>{const p=z();p&&(p.style.transform=`translate(${l.x}px, ${l.y}px) scale(${l.s})`)};o.addEventListener("pointerdown",p=>{if(o.setPointerCapture(p.pointerId),L.set(p.pointerId,{x:p.clientX,y:p.clientY}),L.size===2){const[w,q]=[...L.values()];u={kind:"pinch",x0:0,y0:0,d0:Math.hypot(w.x-q.x,w.y-q.y),s0:l.s,t:performance.now()},o.style.transform="translateX(0)",z()&&(z().src=$t(R[t].id,2048))}else u={kind:l.s>1?"pan":"pending",x0:p.clientX,y0:p.clientY,zx:l.x,zy:l.y,t:performance.now()}}),o.addEventListener("pointermove",p=>{if(!L.has(p.pointerId)||!u)return;if(L.set(p.pointerId,{x:p.clientX,y:p.clientY}),u.kind==="pinch"&&L.size===2){const[I,A]=[...L.values()];l.s=Math.max(1,Math.min(4,u.s0*Math.hypot(I.x-A.x,I.y-A.y)/u.d0)),l.s===1&&(l.x=l.y=0),M();return}const w=p.clientX-u.x0,q=p.clientY-u.y0;if(u.kind==="pan"){l.x=u.zx+w,l.y=u.zy+q,M();return}if(u.kind==="pending"&&Math.hypot(w,q)>8&&(u.kind=Math.abs(w)>Math.abs(q)?"swipe":"down"),u.kind==="swipe"&&(o.style.transform=`translateX(${w}px)`),u.kind==="down"){const I=Math.max(0,q);o.style.transform=`translateY(${I}px) scale(${1-Math.min(.15,I/2e3)})`,n.style.setProperty("--fade",String(Math.max(.3,1-I/400)))}});const Y=p=>{if(!L.has(p.pointerId))return;const w=L.get(p.pointerId);if(L.delete(p.pointerId),!u)return;const q=u.kind;if(q==="pinch"){if(L.size===0)u=null;else{const[D]=[...L.values()];u={kind:l.s>1?"pan":"pending",x0:D.x,y0:D.y,zx:l.x,zy:l.y,t:performance.now()}}return}const I=w.x-u.x0,A=w.y-u.y0,Q=performance.now()-u.t;if(u=null,q==="swipe"){const D=o.clientWidth;I<-D*.2||I<-40&&Q<250?m(1):I>D*.2||I>40&&Q<250?m(-1):(o.style.transition="transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",o.style.transform="translateX(0)");return}if(q==="down"){A>110?g():(o.style.transition="transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",o.style.transform="",n.style.setProperty("--fade","1"));return}if(q==="pan"||Math.hypot(I,A)>10)return;const U=performance.now();if(U-k<300){if(clearTimeout(y),k=0,l.s>1){l={s:1,x:0,y:0},M();return}const D=R[t].id;Nt(D,n.querySelector("[data-like]"),!0),re(o,p.clientX,p.clientY),lt(10);return}k=U,y=window.setTimeout(()=>n.classList.toggle("bare"),300)};o.addEventListener("pointerup",Y),o.addEventListener("pointercancel",Y),o.addEventListener("transitionend",()=>o.style.transition="none")}function ce(e,t={}){const s=document.activeElement,n=T(`<div class="sheet ${t.cls??""}" role="dialog" aria-modal="true" aria-label="${t.label??""}">
    <div class="sheet-scrim" data-close></div>
    <div class="sheet-paper">
      <div class="sheet-grip" aria-hidden="true"></div>
      <button class="sheet-x" type="button" data-close aria-label="關閉">關閉</button>
      <div class="sheet-body">${e}</div>
    </div>
  </div>`);document.body.append(n),document.documentElement.style.overflow="hidden";const o=n.querySelector(".sheet-paper");requestAnimationFrame(()=>n.classList.add("open"));let c=!1;const r=()=>{c||(c=!0,n.classList.remove("open"),n.classList.add("closing"),document.documentElement.style.overflow="",removeEventListener("keydown",v),setTimeout(()=>n.remove(),X()?0:320),s?.focus?.(),t.onClose?.())},h=ne(r);n.close=()=>{h(),r()};const v=$=>$.key==="Escape"&&n.close();addEventListener("keydown",v),n.addEventListener("click",$=>{$.target.closest("[data-close]")&&n.close()});let x=-1;const g=n.querySelector(".sheet-grip");g.addEventListener("pointerdown",$=>{x=$.clientY,g.setPointerCapture($.pointerId),o.style.transition="none"}),g.addEventListener("pointermove",$=>{x<0||(o.style.transform=`translateY(${Math.max(0,$.clientY-x)}px)`)});const m=$=>{if(x<0)return;const P=$.clientY-x;x=-1,o.style.transition="",o.style.transform="",P>90&&n.close()};return g.addEventListener("pointerup",m),g.addEventListener("pointercancel",m),setTimeout(()=>n.querySelector("[autofocus], .sheet-body button, .sheet-body textarea")?.focus({preventScroll:!0}),60),n}const W=ve(),nt=W.length,Et={studio:"#191713",meadow:"#181a14",sea:"#13191b",golden:"#f2e8da",tide:"#dee7ec"},Mt=e=>e?e.kind==="cover"?"studio":e.kind==="end"?"tide":e.ch.key:"studio",Xe=new Map(R.map((e,t)=>[e.id,t+1]));function pt(e,t){return`<figure class="pf" data-photo="${e.id}">
    ${tt(e,{sizes:t,pos:!1,alt:""})}
    <figcaption class="pf-row">${ae(e.id)}</figcaption>
  </figure>`}function He(e){const t=W[e];if(!t)return'<div class="page page-none"></div>';const s=Mt(t),n=`class="page page-${t.kind}" data-ch="${s}" style="--pg:var(--${s});--pi:${Et[s]}"`;switch(t.kind){case"cover":{const o=Tt.get("3627");return`<article ${n}>
        <div class="cover-photo">${tt(o,{sizes:"(min-width: 700px) 40vw, 92vw",eager:!0})}</div>
        <div class="cover-copy">
          <h2 class="cover-title">在光裡</h2>
          <p class="cover-en latin">In the light</p>
          <p class="cover-note">${R.length} 張婚紗照，從早晨的白色攝影棚，走到傍晚的海裡。</p>
          <p class="cover-hint" aria-hidden="true"><span>往左滑，翻開</span><span class="cover-arrow">←</span></p>
        </div>
      </article>`}case"chapter":{const o=St.findIndex(c=>c.key===t.ch.key);return`<article ${n}>
        <div class="chap-copy">
          <h2 class="chap-zh">${t.ch.zh}</h2>
          <p class="chap-en latin">${mt(t.ch)}</p>
          <p class="chap-n">${["第一段光","第二段光","第三段光","第四段光","第五段光"][o]}　${t.ch.count} 張</p>
        </div>
        <div class="chap-photo">${tt(t.first,{sizes:"50vw"})}</div>
      </article>`}case"portrait":return`<article ${n}>${pt(t.photos[0],"(min-width: 700px) 45vw, 92vw")}</article>`;case"pair":return`<article ${n}>${pt(t.photos[0],"(min-width: 700px) 45vw, 92vw")}${pt(t.photos[1],"(min-width: 700px) 45vw, 92vw")}</article>`;case"land":return`<article ${n}>
        ${pt(t.photos[0],"(min-width: 700px) 45vw, 92vw")}
        <p class="land-ch"><span>${t.ch.zh}</span><span class="latin">${mt(t.ch)}</span></p>
      </article>`;case"end":return`<article ${n}>
        <div class="end-copy">
          <h2 class="end-title">從前後座，<br>到往後餘生。</h2>
          <p class="end-note">謝謝你把我們的相冊翻到最後。</p>
          <div class="end-actions">
            <a class="btn" href="#/notes">傳一張紙條給我們 <span class="arrow" aria-hidden="true">→</span></a>
            <button class="btn quiet" type="button" data-goto="0">回到第一頁</button>
          </div>
        </div>
        <p class="end-sign latin">${N.groomEn} &amp; ${N.brideEn}</p>
      </article>`}}function _(e){const t=T(He(e));return Ct(t),t.querySelectorAll("img.in").forEach(s=>s.style.transition="none"),t}function Ne(e,t){const s=T(`<div class="screen album">
    ${vt("album")}
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
  </div>`);e.append(s);const n=s.querySelector(".book"),o=s.querySelector(".stage");let c=!1,r=0,h=[];const v=()=>c?Math.max(0,2*r-1):r,x=i=>r=c?Math.ceil(i/2):i,g=()=>c?Math.ceil((nt-1)/2):nt-1;function m(){const i=n.getBoundingClientRect(),d=v(),f=i.width>=700&&i.width/i.height>1.15,b=10,S=i.width-b*2,E=i.height-b*2;let C,V;f?(V=E,C=Math.min(S/2,V*.72)):(C=S,V=E),o.style.width=`${f?C*2:C}px`,o.style.height=`${V}px`,(f!==c||!h.length)&&(c=f,s.classList.toggle("is-wide",c),x(d),$())}function $(){o.replaceChildren(),h=c?[_(2*r-1),_(2*r)].map((i,d)=>P(i,d?"right":"left")):[P(_(r),"single")],o.append(...h),u(),k()}function P(i,d){const f=T(`<div class="slot slot-${d}"><div class="shade"></div></div>`);return f.prepend(i),f}function L(i,d){h[i].firstElementChild.replaceWith(_(d))}function l(){return W[c?2*r<nt?2*r:2*r-1:r]}function u(){const i=l(),d=Mt(i),f=St.find(C=>C.key===d);s.style.setProperty("--pg",`var(--${d})`),s.style.setProperty("--pi",Et[d]),document.body.style.backgroundColor=`var(--${d})`,document.querySelector('meta[name="theme-color"]')?.setAttribute("content",getComputedStyle(document.documentElement).getPropertyValue(`--${d}`).trim()),s.querySelector("[data-zh]").textContent=i.kind==="cover"?"相冊":i.kind==="end"?"最後一頁":f.zh,s.querySelector("[data-en]").textContent=i.kind==="cover"?"In the light":i.kind==="end"?"The end":mt(f);const b=(c?[W[2*r-1],W[2*r]]:[i]).flatMap(C=>C&&"photos"in C?C.photos:[])[0];s.querySelector("[data-n]").textContent=b?`${Xe.get(b.id)} / ${R.length}`:"";const S=(c?2*r:r)/(nt-1);s.querySelector(".album-progress i").style.transform=`scaleX(${Math.min(1,S)})`,s.querySelector("[data-prev]").disabled=r<=0,s.querySelector("[data-next]").disabled=r>=g();const E=b?.id??(i.kind==="chapter"?i.ch.key:i.kind);history.replaceState(null,"",`#/album/${E}`)}function k(){const i=v();for(let d=i-2;d<=i+(c?5:3);d++){const f=W[d];f&&"photos"in f&&f.photos.forEach(b=>Lt(b.id)),f?.kind==="chapter"&&Lt(f.first.id)}}let y=null,z=!1;function M(i){if(z||i===1&&r>=g()||i===-1&&r<=0)return null;let d,f,b;c?i===1?(d=2*r,f=2*r+1,L(1,2*r+2),b=h[1]):(d=2*r-2,f=2*r-1,L(0,2*r-3),b=h[0]):(d=i===1?r:r-1,f=-1,i===1&&L(0,r+1),b=h[0]);const S=T(`<div class="leaf ${c?"leaf-wide":""}">
      <div class="face front"></div><div class="face back"></div>
    </div>`);S.children[0].append(_(d),T('<div class="sheen"></div>')),S.children[1].append(f>=0?_(f):T(`<div class="page page-back" style="--pg:var(--${Mt(W[d])})"></div>`),T('<div class="sheen"></div>')),o.append(S);const E={dir:i,leaf:S,under:b,angle:i===1?0:-180};return Y(E,E.angle),E}function Y(i,d){i.angle=d,i.leaf.style.transform=`rotateY(${d}deg)`;const f=-d/180,b=Math.sin(f*Math.PI);i.leaf.children[0].lastElementChild.style.opacity=String(f<.5?f*.9:0),i.leaf.children[1].lastElementChild.style.opacity=String(f>=.5?(1-f)*.9:0),i.leaf.style.setProperty("--lift",String(b)),i.under.querySelector(".shade").style.opacity=String(i.dir===1?(1-f)*.55*b+0:f*.55*b)}function p(i,d,f=0){z=!0;const b=d?i.dir===1?-180:0:i.dir===1?0:-180,S=i.angle,E=Math.abs(b-S),C=X()?1:Math.max(220,Math.min(620,E/180*620-Math.abs(f)*120)),V=performance.now(),fe=wt=>1-Math.pow(1-wt,3),Ft=wt=>{const Dt=Math.min(1,(wt-V)/C);if(Y(i,S+(b-S)*fe(Dt)),Dt<1)return requestAnimationFrame(Ft);w(i,d)};requestAnimationFrame(Ft)}function w(i,d){d&&(r+=i.dir),i.leaf.remove(),c?(L(0,2*r-1),L(1,2*r)):L(0,r),h.forEach(f=>f.querySelector(".shade").style.opacity="0"),y=null,z=!1,d&&(lt(6),u(),k())}function q(i){const d=M(i);d&&p(d,!0)}function I(i){z||(x(Math.max(0,Math.min(nt-1,i))),o.animate([{opacity:0},{opacity:1}],{duration:X()?1:420,easing:"ease"}),$())}let A=null,Q=!1,U=0,D=0,K=0,Ot=0,ct={t:0,id:""};n.addEventListener("pointerdown",i=>{z||i.target.closest("button, a")||(A={x:i.clientX,y:i.clientY,t:performance.now(),id:i.pointerId},Q=!1,U=i.clientX,D=A.t,K=0)}),n.addEventListener("pointermove",i=>{if(!A||i.pointerId!==A.id)return;const d=i.clientX-A.x,f=i.clientY-A.y;if(!Q){if(Math.abs(d)<8||Math.abs(d)<Math.abs(f))return;if(y=M(d<0?1:-1),!y){A=null;return}Q=!0,n.setPointerCapture(i.pointerId)}const b=performance.now();K=(i.clientX-U)/Math.max(1,b-D),U=i.clientX,D=b;const S=o.clientWidth/(c?2:1),E=Math.max(-1,Math.min(1,d/S));y.dir===1?Y(y,Math.max(-180,Math.min(0,E*180))):Y(y,Math.max(-180,Math.min(0,-180+E*180)))});const Pt=i=>{if(!A||i.pointerId!==A.id)return;const d=A;if(A=null,Q&&y){const f=y,b=-f.angle/180,S=f.dir===1?K<-.35:K>.35,E=f.dir===1?K>.35:K<-.35;p(f,!E&&(S||(f.dir===1?b>.4:b<.6)),K),Q=!1;return}i.type!=="pointercancel"&&(Math.hypot(i.clientX-d.x,i.clientY-d.y)>10||ue(i))};n.addEventListener("pointerup",Pt),n.addEventListener("pointercancel",Pt);function ue(i){const d=i.target,f=d.closest(".pf");if(f&&d.closest(".ph")){const E=f.dataset.photo,C=performance.now();if(C-ct.t<300&&ct.id===E){clearTimeout(Ot),ct={t:0,id:""},Nt(E,f.querySelector("[data-like]"),!0),re(f.querySelector(".ph"),i.clientX,i.clientY);return}ct={t:C,id:E},Ot=window.setTimeout(()=>Ae(E),300);return}const b=n.getBoundingClientRect(),S=(i.clientX-b.left)/b.width;S>.62?q(1):S<.38&&q(-1)}s.addEventListener("click",i=>{const d=i.target;d.closest("[data-next]")?q(1):d.closest("[data-prev]")?q(-1):d.closest("[data-toc]")?pe():d.closest("[data-goto]")&&I(Number(d.closest("[data-goto]").dataset.goto))});const Yt=i=>{document.querySelector(".lightbox, .sheet")||(i.key==="ArrowRight"?q(1):i.key==="ArrowLeft"&&q(-1))};addEventListener("keydown",Yt);function pe(){const i=St.map(b=>{const S=W.findIndex(C=>C.kind==="chapter"&&C.ch.key===b.key),E=W[S].first;return`<li><button type="button" class="toc-row" data-goto="${S}" style="--pg:var(--${b.key});--pi:${Et[b.key]}">
        <span class="toc-photo">${tt(E,{sizes:"120px"})}</span>
        <span class="toc-name"><span class="toc-zh">${b.zh}</span><span class="latin">${mt(b)}</span></span>
        <span class="toc-n">${b.count} 張</span>
      </button></li>`}).join(""),d=R.filter(b=>Xt(b.id)),f=ce(`<h2 class="sheet-title">目錄</h2>
      <ol class="toc">${i}</ol>
      ${d.length?`<p class="toc-liked">你按過愛心的有 ${d.length} 張。</p>`:""}`);f.addEventListener("click",b=>{const S=b.target.closest("[data-goto]");S&&(f.close(),setTimeout(()=>I(Number(S.dataset.goto)),60))})}const bt=(()=>{if(!t)return 0;const i=W.findIndex(d=>"photos"in d&&d.photos.some(f=>f.id===t)||d.kind==="chapter"&&d.ch.key===t||d.kind===t);return Math.max(0,i)})();r=bt,c=!1,h=[];const Rt=new ResizeObserver(()=>{z||m()});return m(),bt&&(x(bt),$()),Rt.observe(n),()=>{Rt.disconnect(),removeEventListener("keydown",Yt),document.body.style.backgroundColor="",document.querySelector('meta[name="theme-color"]')?.setAttribute("content","#EBE8E2")}}const Ut=["paper","studio","meadow","sea","paper","golden","meadow","tide","sea"],Vt=[78,88,72,94,82,68],xt="nl:draft";function Oe(e){let t=2166136261;for(let s=0;s<e.length;s++)t=Math.imul(t^e.charCodeAt(s),16777619);return t>>>0}function Pe(e,t){const s=Oe(e.id),n=[...e.text].length,o=n<=14?"xl":n<=44?"l":"m",c=e.private?"private":Ut[s%Ut.length],r=Vt[(s>>4)%Vt.length],h=(s>>8)%2?"r":"l",v=((s>>12)%100/100-.5)*2.4;return T(`<li class="note n-${c} n-${o} n-${h}" data-id="${e.id}" style="--w:${r}%;--r:${v.toFixed(2)}deg">
    ${e.private?'<p class="note-tag">只給新人看・只有你和新人看得到</p>':""}
    <p class="note-text">${O(e.text)}</p>
    <p class="note-by"><span class="note-name">${O(e.name)}</span><time datetime="${new Date(e.ts).toISOString()}" data-ts="${e.ts}">${e.mine?"你・":""}${ee(e.ts,t)}</time></p>
  </li>`)}function Ye(e){const t=T(`<div class="screen notes-screen screen-enter">
    ${vt("notes")}
    <main class="notes">
      <header class="notes-hi">
        <h1 class="rise">傳紙條給我們</h1>
        <p class="rise" style="--i:1">高中那幾年，我們坐前後座，紙條都是從後面遞過來的。今天換你，寫一張給我們。</p>
        <p class="notes-count rise" style="--i:2" data-note-count></p>
      </header>
      <ol class="wall" data-wall aria-label="大家的紙條"></ol>
      <p class="wall-empty" hidden>還沒有人傳紙條。<br>你可以當第一個。</p>
    </main>
    <div class="notes-cta">
      <button class="btn" type="button" data-write>寫一張紙條 <span class="arrow" aria-hidden="true">→</span></button>
    </div>
  </div>`);e.append(t);const s=t.querySelector("[data-wall]"),n=t.querySelector(".wall-empty"),o=t.querySelector("[data-note-count]"),c=t.querySelector("[data-write]");let r=!0;const h=()=>{const g=Date.now(),m=a.notes,$=new Map([...s.children].map(u=>[u.dataset.id,u])),P=new Set(m.map(u=>u.id));for(const[u,k]of $)P.has(u)||k.remove();let L=null;m.forEach((u,k)=>{let y=$.get(u.id);y||(y=Pe(u,g),r?(y.classList.add("rise"),y.style.setProperty("--i",String(Math.min(k,8)+2))):y.classList.add("arrive"),L?L.after(y):s.prepend(y)),L=y}),r=!1;const l=m.filter(u=>!u.private).length;o.textContent=a.stats.notes||l?`已經有 ${Z(Math.max(a.stats.notes,l))} 張紙條。`:"",n.hidden=m.length>0||!a.booted,c.disabled=!a.config.notesOpen,c.innerHTML=a.config.notesOpen?'寫一張紙條 <span class="arrow" aria-hidden="true">→</span>':"紙條已經收起來了"};h();const v=window.setInterval(()=>{const g=Date.now();s.querySelectorAll("time[data-ts]").forEach(m=>{const $=m.textContent.startsWith("你・")?"你・":"";m.textContent=$+ee(Number(m.dataset.ts),g)})},6e4);c.addEventListener("click",_t),location.hash.endsWith("/write")&&setTimeout(_t,300);const x=[F("notes",h),F("stats",h),F("config",h)];return()=>{x.forEach(g=>g()),clearInterval(v)}}function _t(){const e=a.guest.name;let t="";try{t=localStorage.getItem(xt)??""}catch{}const s=ce(`<h2 class="sheet-title">寫一張紙條</h2>
    <form class="compose" novalidate>
      <div class="slip">
        <label class="sr" for="note-text">想對我們說的話</label>
        <textarea id="note-text" maxlength="300" rows="6" placeholder="想對我們說的話…" aria-describedby="note-len"></textarea>
        <p class="slip-by">${O(e)}</p>
      </div>
      <p class="slip-len" id="note-len">0 / 300 字</p>
      <fieldset class="who">
        <legend>誰看得到這張紙條</legend>
        <label><input type="radio" name="who" value="public" checked><span>大家都看得到</span></label>
        <label><input type="radio" name="who" value="private"><span>只給新人看</span></label>
      </fieldset>
      <p class="who-note" data-who-note>會出現在留言板上，署名「${O(e)}」。</p>
      <button class="btn send" type="submit" disabled>傳出去 <span class="arrow" aria-hidden="true">→</span></button>
    </form>`,{cls:"sheet-compose",label:"寫一張紙條"}),n=s.querySelector("form"),o=n.querySelector("textarea"),c=n.querySelector(".slip-len"),r=n.querySelector(".send"),h=n.querySelector("[data-who-note]");o.value=t;const v=()=>{c.textContent=`${[...o.value].length} / 300 字`,r.disabled=!o.value.trim();try{localStorage.setItem(xt,o.value)}catch{}};v(),o.addEventListener("input",v),n.addEventListener("change",()=>{const x=n.elements.namedItem("who").value==="private";n.classList.toggle("is-private",x),h.textContent=x?"不會出現在留言板上，只有昇翰和優看得到。你自己也還看得到它。":`會出現在留言板上，署名「${e}」。`}),setTimeout(()=>o.focus(),380),n.addEventListener("submit",async x=>{x.preventDefault();const g=o.value.trim();if(!g)return;const m=n.elements.namedItem("who").value==="private";r.disabled=!0,r.textContent="傳送中…";try{await xe(g,m);try{localStorage.removeItem(xt)}catch{}lt(12);const $=n.querySelector(".slip");X()||await $.animate([{transform:"none",opacity:1},{transform:"perspective(800px) rotateX(70deg) scaleY(0.55)",opacity:1,offset:.45},{transform:"perspective(800px) rotateX(80deg) scaleY(0.3) translateY(-60vh) rotate(-6deg)",opacity:0}],{duration:720,easing:"cubic-bezier(0.76, 0, 0.24, 1)",fill:"forwards"}).finished,s.close(),ht(m?"紙條交給新人了，只有他們看得到。":"紙條傳出去了，謝謝你。"),window.scrollTo({top:0,behavior:X()?"auto":"smooth"})}catch{r.disabled=!1,r.innerHTML='再傳一次 <span class="arrow" aria-hidden="true">→</span>',ht("沒傳出去，連線不太穩。內容還在，再按一次試試看。")}})}const Re=["答對了。","沒錯，就是這個。","你很懂。","對！"],Fe=["差一點。","不是這個喔。","猜錯了，沒關係。","嗯，不是這個。"];function De(e){return e>=100?"全對。你可能比我們還懂我們。":e>=80?"你一定是一路看著我們走過來的人。":e>=60?"已經很懂我們了，剩下的，今天補上。":e>=40?"一半一半，剛剛好。剩下的故事，等一下敬酒的時候問我們。":"沒關係。答錯的每一題，都是今天認識我們的理由。謝謝你來。"}function je(e){const t=T(`<div class="screen quiz-screen screen-enter">${vt("quiz")}<main class="quiz"></main></div>`);e.append(t);const s=t.querySelector("main");let n="intro",o=0;const c=()=>{if(a.result&&(n="result"),n==="result"&&a.result)return m(a.result);const l=G.get();if(n==="q"&&l)return h(Math.min(l.answers.length,a.quiz.length-1));r()};function r(){n="intro";const l=G.get(),u=a.quiz.length,k=a.config.quizOpen;s.className="quiz quiz-intro",s.innerHTML=`
      <h1 class="quiz-title"><span class="mask"><span>你有多懂</span></span><span class="mask"><span style="--i:1">我們？</span></span></h1>
      <p class="quiz-lead rise" style="--i:2">${u} 題選擇題，都是關於我們兩個人的事。沒有時間限制，慢慢想。</p>
      <ul class="quiz-rules rise" style="--i:3">
        <li>每個人只有一次機會，交卷之後就不能重來。</li>
        <li>中途離開沒關係，回來可以接著寫。</li>
        <li>答對最多的人，沒有獎品。真的沒有。只有我們的感謝，和一整晚可以炫耀的權利。</li>
      </ul>
      <div class="quiz-go rise" style="--i:4">
        ${k?`<button class="btn" type="button" data-start>${l?.answers.length?`接著寫第 ${l.answers.length+1} 題`:"開始作答"} <span class="arrow" aria-hidden="true">→</span></button>`:'<p class="quiz-closed">遊戲現在沒有開放作答，等一下再來看看。</p>'}
      </div>`,s.querySelector("[data-start]")?.addEventListener("click",()=>{G.get()||G.set({answers:[],started:Date.now()}),n="q",c()})}function h(l){o=l;const u=a.quiz[l],k=a.quiz.length;s.className="quiz quiz-q",s.innerHTML=`
      <div class="q-progress" aria-hidden="true"><span>第 ${l+1} 題</span><span>共 ${k} 題</span></div>
      <div class="q-bar" aria-hidden="true"><i style="transform:scaleX(${l/k})"></i></div>
      <h1 class="q-text rise"><span class="sr">第 ${l+1} 題，共 ${k} 題：</span>${O(u.q)}</h1>
      <ol class="q-options">
        ${u.options.map((y,z)=>`<li class="rise" style="--i:${z+1}"><button class="opt" type="button" data-k="${z}"><span>${O(y)}</span></button></li>`).join("")}
      </ol>
      <div class="q-reveal" hidden>
        <p class="q-verdict" role="status"></p>
        ${u.note?`<p class="q-note">${O(u.note)}</p>`:""}
        <button class="btn" type="button" data-next></button>
        ${l===k-1?'<p class="q-last">交卷之後就不能再作答囉。</p>':""}
      </div>`,requestAnimationFrame(()=>s.querySelector(".q-bar i").style.transform=`scaleX(${(l+.5)/k})`),s.querySelectorAll(".opt").forEach(y=>y.addEventListener("click",()=>v(Number(y.dataset.k)))),window.scrollTo({top:0})}function v(l){const u=a.quiz[o],k=G.get()??{answers:[],started:Date.now()};k.answers=k.answers.slice(0,o),k.answers[o]=l,G.set(k);const y=l===u.answer;lt(y?12:[8,60,8]),s.querySelectorAll(".opt").forEach(p=>{const w=Number(p.dataset.k);p.disabled=!0,w===u.answer&&p.classList.add("right"),w===l&&p.classList.add("picked",y?"is-right":"is-wrong"),w!==u.answer&&w!==l&&p.classList.add("dim")});const z=s.querySelector(".q-reveal"),M=o===a.quiz.length-1;z.querySelector(".q-verdict").textContent=(y?Re:Fe)[o%4],z.classList.toggle("is-right",y);const Y=z.querySelector("[data-next]");Y.innerHTML=M?'交卷，看結果 <span class="arrow" aria-hidden="true">→</span>':'下一題 <span class="arrow" aria-hidden="true">→</span>',z.hidden=!1,z.classList.add("rise"),s.querySelector(".q-bar i").style.transform=`scaleX(${(o+1)/a.quiz.length})`,Y.addEventListener("click",()=>M?g():x()),setTimeout(()=>z.scrollIntoView({behavior:X()?"auto":"smooth",block:"nearest"}),120)}function x(){if(X())return h(o+1);s.animate([{opacity:1,transform:"none"},{opacity:0,transform:"translateX(-24px)"}],{duration:200,easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"}).onfinish=()=>h(o+1)}async function g(){const l=G.get(),u=s.querySelector("[data-next]");u.disabled=!0,u.textContent="改考卷中…";const k=a.quiz.map((y,z)=>l.answers[z]??-1);try{const y=await qe(k,Date.now()-l.started);n="result",m(y,!0)}catch(y){u.disabled=!1,u.innerHTML='再交一次 <span class="arrow" aria-hidden="true">→</span>',ht(y instanceof Error&&y.message?y.message:"沒交出去，連線不太穩，再按一次試試看。")}}function m(l,u=!1){s.className="quiz quiz-result";const k=a.config.boardSize,y=l.players>1?Math.round((l.players-l.rank)/(l.players-1)*100):0,z=l.rank<=k&&l.pct>=a.config.boardMinPct?`你在排行榜上，第 ${l.rank} 名。`:y>=50?`你贏過了 ${y}% 的賓客。`:"";if(s.innerHTML=`
      <p class="r-label rise">你的答對率</p>
      <p class="r-pct latin" aria-label="答對率 ${l.pct}%"><span class="mask"><span><span data-pct>${u&&!X()?0:l.pct}</span><span class="r-unit">%</span></span></span></p>
      <p class="r-line rise" style="--i:1">答對 ${l.score} 題，共 ${l.total} 題。${z}</p>
      <p class="r-msg rise" style="--i:2">${De(l.pct)}</p>

      <section class="board-wrap rise" style="--i:3" aria-labelledby="board-h">
        <h2 id="board-h" class="board-h">排行榜</h2>
        <ol class="board" data-board></ol>
        <p class="board-note">前 ${k} 名沒有獎品。真的沒有。只有我們的感謝，和一整晚可以拿出來說嘴的權利。</p>
      </section>

      <details class="review rise" style="--i:4">
        <summary>看看每一題的答案</summary>
        <ol class="review-list">
          ${a.quiz.map((M,Y)=>{const p=l.answers[Y],w=p===M.answer;return`<li class="${w?"ok":"no"}">
                <p class="rv-q">${O(M.q)}</p>
                <p class="rv-a">${w?"你答對了：":`你選了「${O(M.options[p]??"沒有作答")}」，答案是：`}<strong>${O(M.options[M.answer])}</strong></p>
                ${M.note?`<p class="rv-note">${O(M.note)}</p>`:""}
              </li>`}).join("")}
        </ol>
      </details>

      <div class="r-next rise" style="--i:5">
        <a class="btn" href="#/notes">去傳一張紙條給我們 <span class="arrow" aria-hidden="true">→</span></a>
        <a class="btn quiet" href="#/album">翻翻相冊</a>
      </div>`,$(),u&&!X()){const M=s.querySelector("[data-pct]"),Y=performance.now(),p=w=>{const q=Math.min(1,(w-Y)/1400);M.textContent=String(Math.round(l.pct*(1-Math.pow(1-q,3)))),q<1&&requestAnimationFrame(p)};requestAnimationFrame(p),window.scrollTo({top:0})}}function $(){const l=s.querySelector("[data-board]");if(!l)return;const u=a.board;l.innerHTML=u.length?u.map((k,y)=>`<li class="${k.mine?"mine":""}">
              <span class="b-rank latin">${y+1}</span>
              <span class="b-name">${O(k.name)}${k.mine?"<em>（你）</em>":""}</span>
              <span class="b-pct">${k.pct}%</span>
            </li>`).join(""):'<li class="b-empty">排行榜正在等第一個交卷的人。</li>'}c();let P=`${a.config.quizOpen}/${a.quiz.length}`;const L=[F("board",$),F("result",()=>n!=="q"&&c()),F("config",()=>{const l=`${a.config.quizOpen}/${a.quiz.length}`;l!==P&&n==="intro"&&c(),P=l})];return()=>L.forEach(l=>l())}const We={"":Ce,home:le,album:Ne,notes:Ye,quiz:je},Jt=document.getElementById("app");let Zt,qt="";function de(){Le();const[,e="",t]=location.hash.replace(/^#/,"").split("/"),s=a.guest?e:"";!a.guest&&e&&history.replaceState(null,"","#/");const n=We[s]??le,o=`${s}/${t??""}`;if(o===qt)return;const c=qt.split("/")[0]===s;qt=o,!(c&&s==="album")&&(Zt?.(),Jt.replaceChildren(),document.body.dataset.view=s||"intro",window.scrollTo(0,0),Zt=n(Jt,t))}Ee();a.guest&&It();$e();window.addEventListener("hashchange",de);de();
