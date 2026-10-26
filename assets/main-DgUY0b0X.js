import{D as ae,d as ge,f as ve,u as be,h as vt,r as N,g as M,i as Q,$ as Bt,S as E,p as J,c as V,e as A,j as ne,k as ie,s as oe,l as ye,C as we,b as re,t as Mt}from"./photos-6plI7D-q.js";const x={get(t,e){try{const s=localStorage.getItem(t);return s?JSON.parse(s):e}catch{return e}},set(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}},n={api:null,guest:x.get("nl:guest",null),config:ge,quiz:ae,likes:{},myLikes:new Set(x.get("nl:likes",[])),notes:[],board:[],result:x.get("nl:result",null),stats:{guests:0,notes:0,players:0,likes:0},booted:!1,online:!0,since:0},rt=new Map;function P(t,e){return rt.has(t)||rt.set(t,new Set),rt.get(t).add(e),()=>rt.get(t).delete(e)}function D(...t){for(const e of t)rt.get(e)?.forEach(s=>s())}let $e=null;const st=()=>$e??($e=ve().then(t=>n.api=t));function Z(t){n.online!==t&&(n.online=t,D("net"))}function ke(t){const e={gid:n.guest?.gid??be(),name:t};n.guest=e,x.set("nl:guest",e),D("guest");const s=async a=>{try{await(await st()).join(t,e.gid),Tt=null,Nt()}catch{a>0&&setTimeout(()=>s(a-1),4e3)}};return s(5),e}let Tt=null;function Nt(){return n.guest?Tt??(Tt=(async()=>{try{const t=await st();let e=await t.boot(n.guest.gid);if(e.known===!1){const s=await t.join(n.guest.name,n.guest.gid);n.guest=s,x.set("nl:guest",s),tt=new Set,x.set("nl:likes-sent",[]),e=await t.boot(s.gid),n.result=null,x.set("nl:result",null)}if(n.config=e.config,n.quiz=e.quiz.length?e.quiz:ae,tt=new Set(e.myLikes),W||(n.myLikes=new Set(e.myLikes)),n.likes=e.likes,Ot(),n.notes=Pt(e.notes),n.board=e.board,n.result=e.result,x.set("nl:result",e.result),!e.result){const s=Y.get();s&&s.answers.length>=n.quiz.length&&localStorage.removeItem(`nl:quiz:${n.guest.gid}`)}n.stats=e.stats,n.since=e.now,n.booted=!0,Z(!0),D("likes","notes","board","stats","result","config"),W&&dt()}catch{Z(!1),setTimeout(()=>(Tt=null,Nt()),6e3)}})()):Promise.resolve()}let ht=0,ft=!1;function qe(){if(ft)return;ft=!0;const t=async()=>{if(ht=0,!ft)return;if(document.visibilityState==="visible"&&n.booted&&n.guest)try{const a=await(await st()).poll(n.guest.gid,n.since);!W&&!mt&&(n.likes=a.likes,Ot(),D("likes"));const o=new Set(n.notes.map(l=>l.id)),d=a.notes.filter(l=>!o.has(l.id)),h=new Set(a.hidden),p=n.notes.length;n.notes=Pt([...n.notes.filter(l=>!h.has(l.id)),...d]),(d.length||n.notes.length!==p)&&D("notes"),n.board=a.board,n.stats=a.stats,n.config=a.config,n.since=Math.max(n.since,a.now-6e4),Z(!0),D("board","stats","config")}catch{Z(!1)}const e=n.api?.kind==="local"?4e3:2e4+Math.random()*8e3;ht=window.setTimeout(t,e)};t(),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&ft&&ht&&(clearTimeout(ht),t())})}let W=x.get("nl:likes-dirty",!1),mt=!1,tt=new Set(x.get("nl:likes-sent",[])),ct=0;function Ot(){for(const t of new Set([...n.myLikes,...tt])){const e=(n.myLikes.has(t)?1:0)-(tt.has(t)?1:0);e&&(n.likes[t]=Math.max(0,(n.likes[t]??0)+e))}}function Ht(t){return n.myLikes.has(t)}function le(t){return n.likes[t]??0}function Se(t,e){const s=n.myLikes.has(t),a=!s;return a===s||(a?n.myLikes.add(t):n.myLikes.delete(t),n.likes[t]=Math.max(0,(n.likes[t]??0)+(a?1:-1)),x.set("nl:likes",[...n.myLikes]),W=!0,x.set("nl:likes-dirty",!0),D("likes"),clearTimeout(ct),ct=window.setTimeout(dt,900)),a}async function dt(){if(!n.guest||mt)return;mt=!0;const t=new Set(n.myLikes);W=!1;try{const s=await(await st()).setLikes(n.guest.gid,[...t]);tt=t,x.set("nl:likes-sent",[...tt]),n.likes=s.likes,Ot(),x.set("nl:likes-dirty",W),Z(!0),D("likes")}catch{W=!0,Z(!1),ct=window.setTimeout(dt,8e3)}finally{mt=!1,W&&(clearTimeout(ct),ct=window.setTimeout(dt,900))}}window.addEventListener("pagehide",()=>{W&&dt()});function Pt(t){return[...t].sort((e,s)=>s.ts-e.ts)}async function Le(t,e){const a=await(await st()).postNote(n.guest.gid,n.guest.name,t,e);return n.notes=Pt([a,...n.notes.filter(o=>o.id!==a.id)]),n.stats.notes++,D("notes","stats"),a}const Y={get:()=>x.get(`nl:quiz:${n.guest?.gid}`,null),set:t=>x.set(`nl:quiz:${n.guest?.gid}`,t)};async function xe(t,e){const s=await st(),a=await s.submitQuiz(n.guest.gid,n.guest.name,t,e);return n.result=a,x.set("nl:result",a),D("result"),s.poll(n.guest.gid,n.since).then(o=>{n.board=o.board,n.stats=o.stats,D("board","stats")},()=>{}),a}function ze(){for(const t of Object.keys(localStorage))t.startsWith("nl:")&&localStorage.removeItem(t)}const K=[];let Ct=0;function Ee(t){history.pushState({overlay:!0},"");const e={close:t,done:!1};return K.push(e),()=>{if(e.done)return;e.done=!0;const s=K.indexOf(e);s>=0&&K.splice(s,1),Ct++,history.back()}}addEventListener("popstate",()=>{if(Ct){Ct--;return}const t=K.pop();t&&!t.done&&(t.done=!0,t.close())});function Me(){for(;K.length;){const t=K.pop();t.done||(t.done=!0,t.close())}}const ce=t=>n.booted?Q(le(t)):"";function Te(t){t.querySelectorAll("[data-like]").forEach(e=>{const s=Ht(e.dataset.like);e.classList.toggle("on",s),e.setAttribute("aria-pressed",String(s))}),t.querySelectorAll("[data-count]").forEach(e=>e.textContent=ce(e.dataset.count))}const Ce="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",It=(t="")=>`<svg class="${t}" viewBox="0 0 24 24" aria-hidden="true"><path d="${Ce}"/></svg>`;function Ie(t){const e=Ht(t);return`<button class="like ${e?"on":""}" data-like="${t}" aria-pressed="${e}" aria-label="喜歡這張照片">
    <span class="like-icon">${It("o")}${It("f")}</span>
    <span class="like-n" data-count="${t}">${ce(t)}</span>
  </button>`}let Ae=null;const Ne=()=>Ae??(Ae=document.body.appendChild(M('<div class="heart-layer" aria-hidden="true"></div>'))),Ut=["var(--heart)","var(--heart)","#f07b8c","#f6b3bd","#ffffff","#c92f4a"];function Oe(t,e,s=22){if(N())return;const a=Ne();for(let o=0;o<s;o++){const d=M(`<span class="burst">${It()}</span>`),h=10+Math.random()*22;d.style.cssText=`left:${t}px;top:${e}px;width:${h}px;height:${h}px;color:${Ut[o%Ut.length]}`,a.appendChild(d);const p=-Math.PI/2+(Math.random()-.5)*Math.PI*1.25,l=50+Math.random()*150,g=Math.cos(p)*l,f=Math.sin(p)*l-40-Math.random()*80,m=(Math.random()-.5)*70,b=850+Math.random()*650;d.animate([{transform:"translate(-50%,-50%) scale(0.2) rotate(0deg)",opacity:0},{transform:`translate(calc(-50% + ${g*.35}px), calc(-50% + ${f*.35}px)) scale(1.15) rotate(${m*.5}deg)`,opacity:1,offset:.22},{transform:`translate(calc(-50% + ${g}px), calc(-50% + ${f}px)) scale(0.85) rotate(${m}deg)`,opacity:0}],{duration:b,delay:Math.random()*120,easing:"cubic-bezier(0.22, 1, 0.36, 1)",fill:"both"}).onfinish=()=>d.remove()}}function He(t,e,s){const a=Se(t);if(a){vt(10);const o=e??document.querySelector(`[data-like="${t}"]`);if(o){const d=o.querySelector(".like-icon").getBoundingClientRect();Oe(d.left+d.width/2,d.top+d.height/2)}}return a}function Pe(){document.addEventListener("click",e=>{const s=e.target.closest("[data-like]");s&&(e.stopPropagation(),He(s.dataset.like,s))});let t={};P("likes",()=>{for(const e of Bt("[data-like]")){const s=e.dataset.like,a=Ht(s);e.classList.contains("on")!==a&&(e.classList.toggle("on",a),e.setAttribute("aria-pressed",String(a)),a&&e.querySelector(".f")?.animate([{transform:"scale(0.4)"},{transform:"scale(1.25)"},{transform:"scale(1)"}],{duration:420,easing:"cubic-bezier(0.22, 1, 0.36, 1)"}))}for(const e of Bt("[data-count]")){const s=e.dataset.count,a=le(s);n.booted&&(e.textContent===""?e.textContent=Q(a):e.textContent!==Q(a)&&Re(e,a,(t[s]??a)<a),t[s]=a)}})}function Re(t,e,s=!0){const a=Q(e);if(N()||!t.isConnected){t.textContent=a;return}t.animate([{transform:"translateY(0)",opacity:1},{transform:`translateY(${s?-60:60}%)`,opacity:0}],{duration:160,easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"}).onfinish=()=>{t.textContent=a,t.animate([{transform:`translateY(${s?60:-60}%)`,opacity:0},{transform:"translateY(0)",opacity:1}],{duration:260,easing:"cubic-bezier(0.22, 1, 0.36, 1)"})}}function et(t){Gt(t),document.fonts?.ready.then(()=>Gt(t))}function Gt(t){t.querySelectorAll("[data-fit]").forEach(e=>{const s=e.closest("[data-fit-box]")??e.parentElement.closest("h1, h2, p, div, a"),a=Number(e.dataset.fit)||1/0;e.style.fontSize="100px",e.style.whiteSpace="nowrap",e.style.display="inline-block";const o=e.getBoundingClientRect().width,d=getComputedStyle(s),h=s.clientWidth-parseFloat(d.paddingLeft)-parseFloat(d.paddingRight);o&&h>0&&(e.style.fontSize=`${Math.min(a,Math.floor(100*h/o*.99*10)/10)}px`),e.style.display=""})}const Qt=["3650","3531","3673","3736","3789"],De=3600;function Fe(t){const e=n.guest,s=M(`<main class="screen intro">
    <div class="intro-photo" aria-hidden="true">
      ${Qt.map((f,m)=>J(V.get(f),{eager:m===0,pos:!1,sizes:"100vw",cls:`shot${m===0?" now":""}`})).join("")}
    </div>
    <div class="intro-scrim" aria-hidden="true"></div>
    <header class="intro-head meta-row caps rise" style="--d:200ms">
      <span>${E.brideEn} &amp; ${E.groomEn}</span><span>10 . 31</span>
    </header>
    <div class="intro-title">
      <p class="intro-just script write" style="--d:700ms" aria-hidden="true">just</p>
      <h1 class="intro-name" data-fit-box>
        <span class="mask"><span class="display" data-fit style="--d:250ms">Married</span></span>
        <span class="sr">${E.groom}與${E.bride}的婚禮</span>
      </h1>
      <p class="intro-line rise" style="--d:900ms">${E.groom} × ${E.bride}　·　${E.date}</p>
    </div>
    <div class="intro-card">
      ${e?`<div class="intro-ask rise" style="--d:1100ms">
              <p class="ask-q">歡迎回來，${A(e.name)}。</p>
              <div class="ask-row">
                <a class="btn" href="#/home">繼續 <span class="arrow" aria-hidden="true">→</span></a>
                <button class="btn quiet" type="button" data-rename>換個稱呼</button>
              </div>
            </div>`:""}
      <form class="intro-ask rise" style="--d:1100ms" ${e?"hidden":""} novalidate>
        <label class="ask-q" for="guest-name">我們該怎麼稱呼你？</label>
        <div class="ask-field">
          <input id="guest-name" name="name" type="text" autocomplete="nickname" enterkeyhint="go" maxlength="20"
            placeholder="例如：新郎的摯友 杰倫" aria-describedby="name-note" />
          <button class="btn ask-go" type="submit">進場</button>
        </div>
        <p class="ask-note" id="name-note">這個稱呼會出現在你的留言與排行榜上。</p>
      </form>
    </div>
  </main>`);t.append(s),ne(s),et(s);const a=[...s.querySelectorAll(".shot")];Qt.slice(1).forEach(f=>ie(f));let o=0;const d=N()?0:window.setInterval(()=>{const f=a[o];o=(o+1)%a.length;const m=a[o];a.forEach(b=>b.classList.remove("top")),f.classList.add("under"),m.classList.remove("now","under"),m.offsetWidth,m.classList.add("now","top"),setTimeout(()=>f.classList.remove("now","under"),1600)},De),h=s.querySelector("form"),p=h.querySelector("input"),l=h.querySelector(".ask-go");p.addEventListener("focus",()=>s.classList.add("typing")),p.addEventListener("blur",()=>setTimeout(()=>s.classList.remove("typing"),120)),s.querySelector("[data-rename]")?.addEventListener("click",()=>{s.querySelector(".intro-ask:not(form)")?.remove(),h.hidden=!1,p.value=e?.name??"",p.focus()}),h.addEventListener("submit",async f=>{f.preventDefault();const m=p.value.trim().replace(/\s+/g," ").slice(0,20);if(!m){p.focus(),h.querySelector(".ask-field").animate([{transform:"translateX(0)"},{transform:"translateX(-6px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:360,easing:"cubic-bezier(0.22, 1, 0.36, 1)"});return}l.disabled=!0,ke(m),p.blur(),s.classList.add("leaving"),setTimeout(()=>location.hash="#/home",N()?0:420)});const g=()=>et(s);return addEventListener("resize",g),()=>{clearInterval(d),removeEventListener("resize",g)}}function bt(t){const e=(s,a)=>`<a href="#/${s}" ${t===s?'aria-current="page"':""}>${a}</a>`;return`<header class="bar">
    <a class="mark" href="#/home" aria-label="回到首頁">Linda &amp; Neil</a>
    <nav aria-label="主選單">${e("album","相冊")}${e("notes","留言板")}${e("quiz","遊戲")}</nav>
  </header>`}function Xe(t){if(!("IntersectionObserver"in window))return()=>{};t.classList.add("js-reveal");const e=new IntersectionObserver(a=>{for(const o of a)o.isIntersecting&&(o.target.classList.add("in"),e.unobserve(o.target))},{rootMargin:"0px 0px -8% 0px"}),s=()=>t.querySelectorAll("[data-reveal]:not(.in)").forEach(a=>e.observe(a));return s(),Object.assign(()=>e.disconnect(),{watch:s})}function de(t){const e=n.guest,s=M(`<div class="screen home screen-enter">
    ${bt("home")}
    <main>
      <section class="hello">
        <div class="hello-grid">
          <div class="hello-photo rise">${J(V.get("3605"),{sizes:"62vw",eager:!0})}</div>
          <div class="hello-vert rise" style="--i:1" aria-hidden="true"><span class="caps vert">with you</span></div>
        </div>
        <h1 class="hello-h rise" style="--i:2">${A(e.name)}，歡迎你來。</h1>
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
        <div class="door-bg">${J(V.get("3627"),{sizes:"100vw"})}</div>
        <div class="door-scrim" aria-hidden="true"></div>
        <p class="door-script script" data-reveal aria-hidden="true">our</p>
        <h2 class="door-display display" data-fit-box aria-label="相冊"><span data-fit>Album</span></h2>
        <div class="door-foot" data-reveal>
          <p class="door-line" data-album-meta>我們的婚紗照，一頁一頁翻。</p>
          <span class="btn door-btn light">翻開相冊 <span class="arrow" aria-hidden="true">→</span></span>
        </div>
      </a>

      <a class="door door-notes" href="#/notes">
        <div class="door-blur" style="background-image:url(${oe("3686",640)})" aria-hidden="true"></div>
        <div class="door-inset" data-reveal>${J(V.get("3686"),{sizes:"60vw"})}</div>
        <div class="door-notes-copy">
          <h2 class="door-zh" data-reveal>留言板</h2>
          <p class="door-line" data-notes-meta data-reveal></p>
          <span class="btn door-btn light" data-reveal>我要留言 <span class="arrow" aria-hidden="true">→</span></span>
        </div>
      </a>

      <a class="door door-quiz" href="#/quiz">
        <div class="door-quiz-photo" data-reveal>${J(V.get("3646"),{sizes:"70vw"})}</div>
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
        <p>${E.groom} × ${E.bride}<br>${E.date}</p>
        <a class="btn quiet" href="#/">換個稱呼</a>
      </div>
    </footer>
  </div>`);t.append(s),ne(s),et(s);const a=Xe(s);s.querySelector("[data-scroll]").addEventListener("click",()=>{const m=s.querySelector("[data-first-door]").getBoundingClientRect().top+scrollY-(s.querySelector(".bar")?.clientHeight??0);scrollTo({top:m,behavior:N()?"auto":"smooth"})});const o=s.querySelector(".scroll-cue"),d=()=>o.classList.toggle("gone",scrollY>80);addEventListener("scroll",d,{passive:!0});const h=f=>s.querySelector(f),p=()=>{const f=n.stats,m=n.booted;h("[data-stat-guests]").textContent=m?f.guests>1?`已經有 ${Q(f.guests)} 位賓客進場`:"":"載入中…";const b=n.myLikes.size;h("[data-album-meta]").textContent=b?`我們的婚紗照，你已經按了 ${b} 顆愛心。`:"我們的婚紗照，一頁一頁翻。",h("[data-notes-meta]").textContent=m?f.notes?`已經有 ${Q(f.notes)} 則留言`:"還沒有人留言，你可以當第一個。":"載入中…";const L=n.result,O=Y.get(),F=n.quiz.length;h("[data-quiz-sub]").textContent=L?`你答對了 ${L.score} 題，得到 ${L.pct} 分。`:O&&O.answers.length?`你寫到第 ${O.answers.length} 題，回來把它寫完吧。`:`${F} 題選擇題，都是關於我們兩個人的事。`,h("[data-quiz-meta]").textContent=L?"看排行榜":O?.answers.length?"繼續作答":"開始作答",h("[data-quiz-quick]").textContent=L?`你得到 ${L.pct} 分`:"你有多懂我們？"};p();const l=[P("stats",p),P("notes",p),P("likes",p),P("result",p),P("config",p)],g=()=>et(s);return addEventListener("resize",g),()=>{l.forEach(f=>f()),a(),removeEventListener("resize",g),removeEventListener("scroll",d)}}const _=ye(),C=_.length,Lt={studio:{script:"with you",display:"Smile"},meadow:{script:"Love",display:"Meadow"},seaside:{script:"Happy",display:"Seaside"}},Jt=["♡ we are married ♡","| a good mood |","| you &amp; me |","stay with you","together for life","music | faith | life","beautiful","soul mate"],lt=t=>Jt[t%Jt.length],Vt=t=>lt(t).replace(/[|♡]/g,"").trim(),At=t=>!t||t.kind==="cover"?we[0]:t.ch;function I(t,e="",s="(min-width: 700px) 30vw, 80vw"){return`<figure class="pf ${e}" data-photo="${t.id}">
    ${J(t,{sizes:s,alt:"",lazy:!1})}
    <figcaption class="pf-like">${Ie(t.id)}</figcaption>
  </figure>`}const xt=t=>`style="--n:${t.length}"`;function je(t){const e=_[t];if(!e)return'<div class="page page-none"></div>';const s=At(e),a=`class="page page-${e.kind}" data-ch="${s.key}"`;switch(e.kind){case"cover":return`<article ${a}>
        ${I(V.get("3654"),"bg","(min-width: 700px) 40vw, 100vw")}
        <div class="pg-scrim"></div>
        <p class="pg-top caps meta-row"><span>${E.brideEn} &amp; ${E.groomEn}</span><span>${E.date}</span></p>
        <div class="pg-title">
          <p class="pg-script script">in the</p>
          <h2 class="pg-display display" ${xt("Light")}>Light</h2>
          <p class="pg-sub">看到喜歡的照片，記得按角落的 ♡</p>
        </div>
      </article>`;case"opener":{const o=Lt[s.key];return`<article ${a}>
        ${I(e.photos[0],"bg","(min-width: 700px) 40vw, 100vw")}
        <div class="pg-scrim"></div>
        <p class="pg-top caps meta-row"><span>${E.brideEn} &amp; ${E.groomEn}</span><span>${E.date}</span></p>
        <div class="pg-title">
          <p class="pg-script script">${o.script}</p>
          <h2 class="pg-display display" ${xt(o.display)}>${o.display}</h2>
          <p class="pg-sub">${s.zh}</p>
        </div>
      </article>`}case"trio":{const[o,d,h]=e.photos;return`<article ${a}>
        <div class="trio${e.n%2?" flip":""}">
          ${I(o,"t-a")}
          <div class="t-panel"><span class="caps vert">${Vt(e.n)}</span></div>
          ${I(d,"t-b","(min-width: 700px) 15vw, 50vw")}
          ${I(h,"t-c","(min-width: 700px) 15vw, 50vw")}
        </div>
      </article>`}case"split":{const[o,d]=e.photos;return`<article ${a}>
        <div class="split-block"></div>
        ${I(o,"s-p")}
        <p class="s-caps caps">${lt(e.n)}</p>
        ${I(d,"s-l","(min-width: 700px) 40vw, 100vw")}
      </article>`}case"full":return`<article ${a}>
        ${I(e.photos[0],"bg","(min-width: 700px) 40vw, 100vw")}
        <div class="pg-scrim low"></div>
        <p class="pg-foot caps">${lt(e.n)}</p>
      </article>`;case"caption":return`<article ${a}>
        ${I(e.photos[0],"c-photo","(min-width: 700px) 40vw, 100vw")}
        <p class="c-caps caps">${lt(e.n)}</p>
      </article>`;case"inset":{const[o,d]=e.photos;return`<article ${a}>
        <div class="i-blur" style="background-image:url(${oe(o.id,640)})"></div>
        ${I(o,"i-a framed")}
        ${I(d,"i-b framed")}
        <p class="i-foot caps meta-row"><span>${Vt(e.n)}</span><span>2026</span></p>
      </article>`}case"lands":return`<article ${a}>
        <div class="lands">${e.photos.map(o=>I(o,"l-x","(min-width: 700px) 35vw, 85vw")).join("")}</div>
        <p class="l-caps">${s.zh}</p>
      </article>`;case"land":return`<article ${a}>
        <p class="pg-top caps meta-row"><span>${s.zh}</span><span>${lt(e.n)}</span></p>
        ${I(e.photos[0],"ld","(min-width: 700px) 35vw, 90vw")}
        <h2 class="pg-display display ld-word" ${xt(Lt[s.key].display)}>${Lt[s.key].display}</h2>
      </article>`;case"end":return`<article ${a}>
        ${I(e.photos[0],"bg","(min-width: 700px) 40vw, 100vw")}
        <div class="pg-scrim end"></div>
        <div class="end-copy">
          <p class="end-zh">謝謝你翻到最後。</p>
          <p class="end-note">也歡迎到留言板，留一句話給我們。</p>
          <div class="end-actions">
            <a class="btn light" href="#/notes">到留言板留言 <span class="arrow" aria-hidden="true">→</span></a>
            <button class="btn quiet" type="button" data-goto="0">回到第一頁</button>
          </div>
        </div>
      </article>`}}const gt=new Map;function G(t){let e=gt.get(t);return e?e.isConnected||Te(e):(e=document.adoptNode(M(je(t))),e.querySelectorAll(".ph img").forEach(s=>{const a=()=>s.classList.add("in");s.complete&&s.naturalWidth?a():(s.addEventListener("load",a,{once:!0}),s.addEventListener("error",a,{once:!0}))}),gt.set(t,e)),e}function Ye(t){for(const[e,s]of gt)Math.abs(e-t)>8&&!s.isConnected&&gt.delete(e)}function We(t,e){const s=M(`<div class="screen album">
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
        <input class="scrub-range" type="range" min="1" max="${C}" step="1" value="1" aria-label="拖曳圓點，快速翻到第幾頁">
      </div>
    </div>
  </div>`);t.append(s);const a=s.querySelector(".book"),o=s.querySelector(".stage"),d=s.querySelector(".scrub-range"),h=s.querySelector(".scrub-tip");let p=!1,l=0,g=[];const f=()=>p?Math.max(0,2*l-1):l,m=i=>l=p?Math.ceil(i/2):i,b=()=>p?Math.ceil((C-1)/2):C-1;function L(){const i=a.getBoundingClientRect(),r=f(),u=i.width>=700&&i.width/i.height>1.15,k=10,q=i.width-k*2,T=i.height-k*2;let j,B;u?(B=T,j=Math.min(q/2,B*.5625)):(j=q,B=T),o.style.width=`${u?j*2:j}px`,o.style.height=`${B}px`,(u!==p||!g.length)&&(p=u,s.classList.toggle("is-wide",p),m(r),O())}function O(){o.replaceChildren(),g=p?[G(2*l-1),G(2*l)].map((i,r)=>F(i,r?"right":"left")):[F(G(l),"single")],o.append(...g),w(),y()}function F(i,r){const u=M(`<div class="slot slot-${r}"><div class="shade"></div></div>`);return u.prepend(i),u}function c(i,r){const u=g[i],k=G(r),q=u.firstElementChild;q!==k&&q.replaceWith(k)}function v(){return _[p?2*l<C?2*l:2*l-1:l]}function w(){const i=v();s.querySelector("[data-zh]").textContent=i.kind==="cover"?"相冊":i.kind==="end"?"最後一頁":At(i).zh;const r=f()+1,u=p?Math.min(C,2*l+1):r;s.querySelector("[data-n]").textContent=r===u?`第 ${r} 頁，共 ${C} 頁`:`第 ${r}–${u} 頁，共 ${C} 頁`,ut||he(r);const k="photos"in i?i.photos[0]:void 0,q=i.kind==="opener"?i.ch.key:k?.id??i.kind;history.replaceState(null,"",`#/album/${q}`)}function y(){const i=f();for(let r=i-2;r<=i+(p?5:3);r++){const u=_[r];u&&("photos"in u&&u.photos.forEach(k=>ie(k.id)),G(r))}Ye(i)}let $=null,S=!1,H=0,z=-1;const R=M('<div class="page page-back"></div>');function at(i){if(S||$||i===1&&l>=b()||i===-1&&l<=0)return null;let r,u,k;p?i===1?(r=2*l,u=2*l+1,c(1,2*l+2),k=g[1]):(r=2*l-2,u=2*l-1,c(0,2*l-3),k=g[0]):(r=i===1?l:l-1,u=-1,i===1&&c(0,l+1),k=g[0]);const q=M(`<div class="leaf ${p?"leaf-wide":""}">
      <div class="face front"></div><div class="face back"></div>
    </div>`);q.children[0].append(G(r),M('<div class="sheen"></div>')),q.children[1].append(u>=0?G(u):R,M('<div class="sheen"></div>')),o.append(q);const T={dir:i,leaf:q,under:k,angle:i===1?0:-180};return nt(T,T.angle),T}function nt(i,r){i.angle=r,i.leaf.style.transform=`rotateY(${r}deg)`;const u=-r/180,k=Math.sin(u*Math.PI);i.leaf.children[0].lastElementChild.style.opacity=String(u<.5?u*.9:0),i.leaf.children[1].lastElementChild.style.opacity=String(u>=.5?(1-u)*.9:0),i.leaf.style.setProperty("--lift",String(k)),i.under.querySelector(".shade").style.opacity=String(i.dir===1?(1-u)*.55*k:u*.55*k)}function Rt(i,r,u=0){S=!0;const k=r?i.dir===1?-180:0:i.dir===1?0:-180,q=i.angle,T=Math.abs(k-q),j=N()?1:Math.max(200,Math.min(520,T/180*520-Math.abs(u)*120)),B=performance.now(),me=St=>1-Math.pow(1-St,3);let qt=!1;const jt=()=>{qt||(qt=!0,nt(i,k),ue(i,r))},Yt=St=>{if(qt)return;const Wt=Math.min(1,(St-B)/j);nt(i,q+(k-q)*me(Wt)),Wt<1?requestAnimationFrame(Yt):jt()};requestAnimationFrame(Yt),setTimeout(jt,j+250)}function ue(i,r){if(r&&(l+=i.dir),p?(c(0,2*l-1),c(1,2*l)):c(0,l),i.leaf.remove(),g.forEach(u=>u.querySelector(".shade").style.opacity="0"),$=null,S=!1,r&&(vt(6),w(),y()),z>=0){const u=z;z=-1,H=0,yt(u)}else if(H){const u=H;H=0,it(u)}}function it(i){if(S||$){H=i;return}const r=at(i);r&&Rt(r,!0)}function yt(i){const r=Math.max(0,Math.min(C-1,Math.round(i)));if(S||$){z=r;return}H=0;const u=l;if(m(r),l===u){w();return}o.animate([{opacity:0},{opacity:1}],{duration:N()?1:360,easing:"ease"}),O()}let ut=!1;function pe(i){const r=_[i],u=r?r.kind==="cover"?"封面":r.kind==="end"?"最後一頁":At(r).zh:"";return`第 ${i+1} 頁　${u}`}function he(i){d.value=String(i),d.style.setProperty("--p",String(C>1?(i-1)/(C-1):0))}function fe(){const i=Number(d.value);d.style.setProperty("--p",String(C>1?(i-1)/(C-1):0)),h.textContent=pe(i-1),h.style.setProperty("--p",String(C>1?(i-1)/(C-1):0)),h.hidden=!1}function pt(){ut&&(ut=!1,h.hidden=!0,yt(Number(d.value)-1))}d.addEventListener("input",()=>{ut=!0,fe()}),d.addEventListener("change",pt),d.addEventListener("pointerup",()=>setTimeout(pt,0)),d.addEventListener("touchend",()=>setTimeout(pt,0)),d.addEventListener("blur",pt);let X=null,ot=!1,wt=0,$t=0,U=0;a.addEventListener("pointerdown",i=>{i.target.closest("button, a")||(X={x:i.clientX,y:i.clientY,id:i.pointerId},ot=!1,wt=i.clientX,$t=performance.now(),U=0)}),a.addEventListener("pointermove",i=>{if(!X||i.pointerId!==X.id)return;const r=i.clientX-X.x,u=i.clientY-X.y;if(!ot){if(Math.abs(r)<8||Math.abs(r)<Math.abs(u)||S||$)return;if($=at(r<0?1:-1),!$){X=null;return}ot=!0,a.setPointerCapture(i.pointerId)}const k=performance.now();U=(i.clientX-wt)/Math.max(1,k-$t),wt=i.clientX,$t=k;const q=o.clientWidth/(p?2:1),T=Math.max(-1,Math.min(1,r/q));$.dir===1?nt($,Math.max(-180,Math.min(0,T*180))):nt($,Math.max(-180,Math.min(0,-180+T*180)))});const Dt=i=>{if(!X||i.pointerId!==X.id)return;const r=X;if(X=null,ot&&$){const q=$,T=-q.angle/180,j=q.dir===1?U<-.35:U>.35,B=q.dir===1?U>.35:U<-.35;ot=!1,Rt(q,!B&&(j||(q.dir===1?T>.4:T<.6)),U);return}if(i.type==="pointercancel")return;const u=i.clientX-r.x;if(Math.hypot(u,i.clientY-r.y)>10){Math.abs(u)>30&&(S||$)&&it(u<0?1:-1);return}const k=a.getBoundingClientRect();it((i.clientX-k.left)/k.width<.5?-1:1)};a.addEventListener("pointerup",Dt),a.addEventListener("pointercancel",Dt),s.addEventListener("click",i=>{const r=i.target;r.closest("[data-goto]")&&yt(Number(r.closest("[data-goto]").dataset.goto))});const Ft=i=>{document.activeElement!==d&&(i.key==="ArrowRight"?it(1):i.key==="ArrowLeft"&&it(-1))};addEventListener("keydown",Ft);const kt=(()=>{if(!e)return 0;const i=_.findIndex(r=>"photos"in r&&r.photos.some(u=>u.id===e)||r.kind==="opener"&&r.ch.key===e||r.kind===e);return Math.max(0,i)})();l=kt,p=!1,g=[];const Xt=new ResizeObserver(()=>{!S&&!$&&L()});return L(),kt&&(m(kt),O()),Xt.observe(a),()=>{Xt.disconnect(),removeEventListener("keydown",Ft)}}function Be(t,e={}){const s=document.activeElement,a=M(`<div class="sheet ${e.cls??""}" role="dialog" aria-modal="true" aria-label="${e.label??""}">
    <div class="sheet-scrim" data-close></div>
    <div class="sheet-paper">
      <div class="sheet-grip" aria-hidden="true"></div>
      <button class="sheet-x" type="button" data-close aria-label="關閉">關閉</button>
      <div class="sheet-body">${t}</div>
    </div>
  </div>`);document.body.append(a),document.documentElement.style.overflow="hidden";const o=a.querySelector(".sheet-paper");requestAnimationFrame(()=>a.classList.add("open"));let d=!1;const h=()=>{d||(d=!0,a.classList.remove("open"),a.classList.add("closing"),document.documentElement.style.overflow="",removeEventListener("keydown",l),setTimeout(()=>a.remove(),N()?0:320),s?.focus?.(),e.onClose?.())},p=Ee(h);a.close=()=>{p(),h()};const l=b=>b.key==="Escape"&&a.close();addEventListener("keydown",l),a.addEventListener("click",b=>{b.target.closest("[data-close]")&&a.close()});let g=-1;const f=a.querySelector(".sheet-grip");f.addEventListener("pointerdown",b=>{g=b.clientY,f.setPointerCapture(b.pointerId),o.style.transition="none"}),f.addEventListener("pointermove",b=>{g<0||(o.style.transform=`translateY(${Math.max(0,b.clientY-g)}px)`)});const m=b=>{if(g<0)return;const L=b.clientY-g;g=-1,o.style.transition="",o.style.transform="",L>90&&a.close()};return f.addEventListener("pointerup",m),f.addEventListener("pointercancel",m),setTimeout(()=>a.querySelector("[autofocus], .sheet-body button, .sheet-body textarea")?.focus({preventScroll:!0}),60),a}const _t=["warm","white","blue","warm","white","slate","warm","white"],Kt=[78,88,72,94,82,68],zt="nl:draft";function Ue(t){let e=2166136261;for(let s=0;s<t.length;s++)e=Math.imul(e^t.charCodeAt(s),16777619);return e>>>0}function Ge(t,e){const s=Ue(t.id),a=t.private&&!t.mine,o=[...t.text].length,d=a?"secret":o<=14?"xl":o<=44?"l":"m",h=t.private?"private":_t[s%_t.length],p=Kt[(s>>4)%Kt.length],l=(s>>8)%2?"r":"l";return M(`<li class="note n-${h} n-${d} n-${l}" data-id="${t.id}" style="--w:${p}%">
    ${a?'<p class="note-seal" aria-hidden="true"></p><p class="note-text">留了一則悄悄話給新人</p>':`${t.private?'<p class="note-tag">悄悄話・內容只有你和新人看得到</p>':""}<p class="note-text">${A(t.text)}</p>`}
    <p class="note-by"><span class="note-name">${A(t.name)}</span><time datetime="${new Date(t.ts).toISOString()}" data-ts="${t.ts}">${t.mine?"你・":""}${re(t.ts,e)}</time></p>
  </li>`)}function Qe(t){const e=M(`<div class="screen notes-screen screen-enter">
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
  </div>`);t.append(e),et(e);const s=e.querySelector("[data-wall]"),a=e.querySelector(".wall-empty"),o=e.querySelector(".wall-loading"),d=e.querySelector("[data-note-count]"),h=e.querySelector("[data-write]");let p=!0;const l=()=>{const m=Date.now(),b=n.notes,L=new Map([...s.children].map(v=>[v.dataset.id,v])),O=new Set(b.map(v=>v.id));for(const[v,w]of L)O.has(v)||w.remove();let F=null;b.forEach((v,w)=>{let y=L.get(v.id);y||(y=Ge(v,m),p?(y.classList.add("rise"),y.style.setProperty("--i",String(Math.min(w,8)+2))):y.classList.add("arrive"),F?F.after(y):s.prepend(y)),F=y}),p=!1,o.hidden=n.booted;const c=Math.max(n.stats.notes,b.length);d.textContent=n.booted?c?`已經有 ${Q(c)} 則留言`:"":"載入中…",a.hidden=b.length>0||!n.booted,h.disabled=!n.config.notesOpen,h.innerHTML=n.config.notesOpen?'我要留言 <span class="arrow" aria-hidden="true">→</span>':"留言板已經關閉了"};l();const g=window.setInterval(()=>{const m=Date.now();s.querySelectorAll("time[data-ts]").forEach(b=>{const L=b.textContent.startsWith("你・")?"你・":"";b.textContent=L+re(Number(b.dataset.ts),m)})},6e4);h.addEventListener("click",Zt),location.hash.endsWith("/write")&&setTimeout(Zt,300);const f=[P("notes",l),P("stats",l),P("config",l)];return()=>{f.forEach(m=>m()),clearInterval(g)}}function Zt(){const t=n.guest.name;let e="";try{e=localStorage.getItem(zt)??""}catch{}const s=Be(`<h2 class="sheet-title">寫下留言</h2>
    <form class="compose" novalidate>
      <div class="slip">
        <label class="sr" for="note-text">想對我們說的話</label>
        <textarea id="note-text" maxlength="300" rows="6" placeholder="想對我們說的話…" aria-describedby="note-len"></textarea>
        <p class="slip-by">${A(t)}</p>
      </div>
      <p class="slip-len" id="note-len">0 / 300 字</p>
      <fieldset class="who">
        <legend>誰看得到這則留言</legend>
        <label><input type="radio" name="who" value="public" checked><span>公開留言</span></label>
        <label><input type="radio" name="who" value="private"><span>悄悄話<small>只給新人看</small></span></label>
      </fieldset>
      <p class="who-note" data-who-note>會出現在留言板上，大家都看得到，署名「${A(t)}」。</p>
      <button class="btn send" type="submit" disabled>送出留言 <span class="arrow" aria-hidden="true">→</span></button>
    </form>`,{cls:"sheet-compose",label:"寫下留言"}),a=s.querySelector("form"),o=a.querySelector("textarea"),d=a.querySelector(".slip-len"),h=a.querySelector(".send"),p=a.querySelector("[data-who-note]");o.value=e;const l=()=>{d.textContent=`${[...o.value].length} / 300 字`,h.disabled=!o.value.trim();try{localStorage.setItem(zt,o.value)}catch{}};l(),o.addEventListener("input",l),a.addEventListener("change",()=>{const g=a.elements.namedItem("who").value==="private";a.classList.toggle("is-private",g),p.textContent=g?`留言板上大家只會看到「${t} 留了一則悄悄話給新人」，內容只有昇翰和優看得到（你自己也看得到）。`:`會出現在留言板上，大家都看得到，署名「${t}」。`}),setTimeout(()=>o.focus(),380),a.addEventListener("submit",async g=>{g.preventDefault();const f=o.value.trim();if(!f)return;const m=a.elements.namedItem("who").value==="private";h.disabled=!0,h.textContent="送出中…";try{await Le(f,m);try{localStorage.removeItem(zt)}catch{}vt(12);const b=a.querySelector(".slip");N()||await b.animate([{transform:"none",opacity:1},{transform:"translateY(-40vh) scale(0.9)",opacity:0}],{duration:600,easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)",fill:"forwards"}).finished,s.close(),Mt(m?"悄悄話送出了，內容只有新人看得到。":"留言送出了，謝謝你。"),window.scrollTo({top:0,behavior:N()?"auto":"smooth"})}catch{h.disabled=!1,h.innerHTML='再送一次 <span class="arrow" aria-hidden="true">→</span>',Mt("沒送出去，連線不太穩。內容還在，再按一次試試看。")}})}const Je=["答對了。","沒錯，就是這個。","你很懂。","對！"],Ve=["差一點。","不是這個喔。","猜錯了，沒關係。","嗯，不是這個。"];function _e(t){return t>=100?"全對。你可能比我們還懂我們。":t>=80?"你一定是一路看著我們走過來的人。":t>=60?"已經很懂我們了，剩下的，今天補上。":t>=40?"一半一半，剛剛好。剩下的故事，等一下敬酒的時候問我們。":"沒關係。答錯的每一題，都是今天認識我們的理由。謝謝你來。"}function Ke(t){const e=M(`<div class="screen quiz-screen screen-enter">${bt("quiz")}<main class="quiz"></main></div>`);t.append(e);const s=e.querySelector("main");let a="intro",o=0;const d=()=>{if(n.result&&(a="result"),a==="result"&&n.result)return m(n.result);const c=Y.get();if(a==="q"&&c)return p(Math.min(c.answers.length,n.quiz.length-1));h()};function h(){a="intro";const c=Y.get(),v=n.quiz.length,w=n.config.quizOpen;s.className="quiz quiz-intro",s.innerHTML=`
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
        ${n.booted?w?`<button class="btn" type="button" data-start>${c?.answers.length?`接著寫第 ${c.answers.length+1} 題`:"開始作答"} <span class="arrow" aria-hidden="true">→</span></button>`:'<p class="quiz-closed">遊戲現在沒有開放作答，等一下再來看看。</p>':'<button class="btn" type="button" disabled>載入中…</button>'}
      </div>`,et(s),s.querySelector("[data-start]")?.addEventListener("click",()=>{Y.get()||Y.set({answers:[],started:Date.now()}),a="q",d()})}function p(c){o=c;const v=n.quiz[c],w=n.quiz.length;s.className="quiz quiz-q",s.innerHTML=`
      <div class="q-progress" aria-hidden="true"><span>第 ${c+1} 題</span><span>共 ${w} 題</span></div>
      <div class="q-bar" aria-hidden="true"><i style="transform:scaleX(${c/w})"></i></div>
      <h1 class="q-text rise"><span class="sr">第 ${c+1} 題，共 ${w} 題：</span>${A(v.q)}</h1>
      <ol class="q-options">
        ${v.options.map((y,$)=>`<li class="rise" style="--i:${$+1}"><button class="opt" type="button" data-k="${$}"><span class="opt-k latin">${"ABCDEF"[$]}</span><span class="opt-t">${A(y)}</span></button></li>`).join("")}
      </ol>
      <div class="q-reveal" hidden>
        <p class="q-verdict" role="status"></p>
        ${v.note?`<p class="q-note">${A(v.note)}</p>`:""}
        <button class="btn" type="button" data-next></button>
        ${c===w-1?'<p class="q-last">交卷之後就不能再作答囉。</p>':""}
      </div>`,requestAnimationFrame(()=>s.querySelector(".q-bar i").style.transform=`scaleX(${(c+.5)/w})`),s.querySelectorAll(".opt").forEach(y=>y.addEventListener("click",()=>l(Number(y.dataset.k)))),window.scrollTo({top:0})}function l(c){const v=n.quiz[o],w=Y.get()??{answers:[],started:Date.now()};w.answers=w.answers.slice(0,o),w.answers[o]=c,Y.set(w);const y=c===v.answer;vt(y?12:[8,60,8]),s.querySelectorAll(".opt").forEach(z=>{const R=Number(z.dataset.k);z.disabled=!0,R===v.answer&&z.classList.add("right"),R===c&&z.classList.add("picked",y?"is-right":"is-wrong"),R!==v.answer&&R!==c&&z.classList.add("dim")});const $=s.querySelector(".q-reveal"),S=o===n.quiz.length-1;$.querySelector(".q-verdict").textContent=(y?Je:Ve)[o%4],$.classList.toggle("is-right",y);const H=$.querySelector("[data-next]");H.innerHTML=S?'交卷，看結果 <span class="arrow" aria-hidden="true">→</span>':'下一題 <span class="arrow" aria-hidden="true">→</span>',$.hidden=!1,$.classList.add("rise"),s.querySelector(".q-bar i").style.transform=`scaleX(${(o+1)/n.quiz.length})`,H.addEventListener("click",()=>S?f():g()),setTimeout(()=>$.scrollIntoView({behavior:N()?"auto":"smooth",block:"nearest"}),120)}function g(){if(N())return p(o+1);s.animate([{opacity:1,transform:"none"},{opacity:0,transform:"translateX(-24px)"}],{duration:200,easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"}).onfinish=()=>p(o+1)}async function f(){const c=Y.get(),v=s.querySelector("[data-next]");v.disabled=!0,v.textContent="改考卷中…";const w=n.quiz.map((y,$)=>c.answers[$]??-1);try{const y=await xe(w,Date.now()-c.started);a="result",m(y,!0)}catch(y){v.disabled=!1,v.innerHTML='再交一次 <span class="arrow" aria-hidden="true">→</span>',Mt(y instanceof Error&&y.message?y.message:"沒交出去，連線不太穩，再按一次試試看。")}}function m(c,v=!1){s.className="quiz quiz-result";const w=n.config.boardSize,y=c.players>1?Math.round((c.players-c.rank)/(c.players-1)*100):0,$=c.rank<=w&&c.pct>=n.config.boardMinPct?`你在排行榜上，第 ${c.rank} 名。`:y>=50?`你贏過了 ${y}% 的賓客。`:"";if(s.innerHTML=`
      <p class="r-meta rise">你的分數</p>
      <p class="r-pct latin" aria-label="${c.pct} 分"><span class="mask"><span><span data-pct>${v&&!N()?0:c.pct}</span><span class="r-unit">分</span></span></span></p>
      <p class="r-line rise" style="--i:1">答對 ${c.score} 題，共 ${c.total} 題。${$}</p>
      <p class="r-msg rise" style="--i:2">${_e(c.pct)}</p>

      <section class="board-wrap rise" style="--i:3" aria-labelledby="board-h">
        <h2 id="board-h" class="board-h">排行榜 <span>前 ${w} 名</span></h2>
        <ol class="board" data-board></ol>
        <p class="board-note">前 ${w} 名沒有獎品，但你擁有可以炫耀一整天的權力。</p>
      </section>

      <details class="review rise" style="--i:4">
        <summary>看看每一題的答案</summary>
        <p class="review-secret">看完答案，也請幫我們保密，讓還沒玩的朋友也能好好猜一猜。</p>
        <ol class="review-list">
          ${n.quiz.map((S,H)=>{const z=c.answers[H],R=z===S.answer;return`<li class="${R?"ok":"no"}">
                <p class="rv-q">${A(S.q)}</p>
                <p class="rv-a">${R?"你答對了：":`你選了「${A(S.options[z]??"沒有作答")}」，答案是：`}<strong>${A(S.options[S.answer])}</strong></p>
                ${S.note?`<p class="rv-note">${A(S.note)}</p>`:""}
              </li>`}).join("")}
        </ol>
      </details>

      <div class="r-next rise" style="--i:5">
        <a class="btn" href="#/notes">到留言板留言給我們 <span class="arrow" aria-hidden="true">→</span></a>
        <a class="btn quiet" href="#/album">翻翻相冊</a>
      </div>`,b(),v&&!N()){const S=s.querySelector("[data-pct]"),H=performance.now(),z=R=>{const at=Math.min(1,(R-H)/1400);S.textContent=String(Math.round(c.pct*(1-Math.pow(1-at,3)))),at<1&&requestAnimationFrame(z)};requestAnimationFrame(z),window.scrollTo({top:0})}}function b(){const c=s.querySelector("[data-board]");if(!c)return;const v=n.board;if(!n.booted){c.innerHTML='<li class="b-empty">載入中…</li>';return}c.innerHTML=v.length?v.map((w,y)=>`<li class="${w.mine?"mine":""}">
              <span class="b-rank latin">${y+1}</span>
              <span class="b-name">${A(w.name)}${w.mine?"<em>（你）</em>":""}</span>
              <span class="b-pct">${w.pct} 分</span>
            </li>`).join(""):'<li class="b-empty">排行榜正在等第一個交卷的人。</li>'}d();const L=()=>`${n.booted}/${n.config.quizOpen}/${n.quiz.length}`;let O=L();const F=[P("board",b),P("result",()=>a!=="q"&&d()),P("config",()=>{const c=L();c!==O&&a==="intro"&&d(),O=c})];return()=>F.forEach(c=>c())}const Ze={"":Fe,home:de,album:We,notes:Qe,quiz:Ke},te=document.getElementById("app");let ee,Et="";function se(){Me();const[,t="",e]=location.hash.replace(/^#/,"").split("/"),s=n.guest?t:"";!n.guest&&t&&history.replaceState(null,"","#/");const a=Ze[s]??de,o=`${s}/${e??""}`;if(o===Et)return;const d=Et.split("/")[0]===s;Et=o,!(d&&s==="album")&&(ee?.(),te.replaceChildren(),document.body.dataset.view=s||"intro",window.scrollTo(0,0),ee=a(te,e))}if(new URLSearchParams(location.search).has("reset")){ze();const t=new URL(location.href);t.searchParams.delete("reset"),location.replace(`${t.pathname}${t.search}#/`)}else ts();function ts(){Pe(),n.guest&&Nt(),qe(),window.addEventListener("hashchange",se),se()}
