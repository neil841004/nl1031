import{D as Jt,d as de,f as pe,u as ue,h as ft,r as H,g as I,i as K,$ as Dt,S as T,p as V,c as _,e as M,j as Kt,k as Zt,s as te,l as he,C as ee,P as fe,b as se,t as St}from"./photos-BwNsoFNE.js";const z={get(t,e){try{const s=localStorage.getItem(t);return s?JSON.parse(s):e}catch{return e}},set(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}},n={api:null,guest:z.get("nl:guest",null),config:de,quiz:Jt,likes:{},myLikes:new Set(z.get("nl:likes",[])),notes:[],board:[],result:z.get("nl:result",null),stats:{guests:0,notes:0,players:0,likes:0},booted:!1,online:!0,since:0},it=new Map;function P(t,e){return it.has(t)||it.set(t,new Set),it.get(t).add(e),()=>it.get(t).delete(e)}function R(...t){for(const e of t)it.get(e)?.forEach(s=>s())}let me=null;const st=()=>me??(me=pe().then(t=>n.api=t));function Z(t){n.online!==t&&(n.online=t,R("net"))}function ge(t){const e={gid:n.guest?.gid??ue(),name:t};n.guest=e,z.set("nl:guest",e),R("guest");const s=async a=>{try{await(await st()).join(t,e.gid),xt=null,Et()}catch{a>0&&setTimeout(()=>s(a-1),4e3)}};return s(5),e}let xt=null;function Et(){return n.guest?xt??(xt=(async()=>{try{const t=await st();let e=await t.boot(n.guest.gid);if(e.known===!1){const s=await t.join(n.guest.name,n.guest.gid);n.guest=s,z.set("nl:guest",s),tt=new Set,z.set("nl:likes-sent",[]),e=await t.boot(s.gid),n.result=null,z.set("nl:result",null)}if(n.config=e.config,n.quiz=e.quiz.length?e.quiz:Jt,tt=new Set(e.myLikes),j||(n.myLikes=new Set(e.myLikes)),n.likes=e.likes,Mt(),n.notes=Ct(e.notes),n.board=e.board,n.result=e.result,z.set("nl:result",e.result),!e.result){const s=X.get();s&&s.answers.length>=n.quiz.length&&localStorage.removeItem(`nl:quiz:${n.guest.gid}`)}n.stats=e.stats,n.since=e.now,n.booted=!0,Z(!0),R("likes","notes","board","stats","result","config"),j&&lt()}catch{Z(!1),setTimeout(()=>(xt=null,Et()),6e3)}})()):Promise.resolve()}let ct=0,dt=!1;function ve(){if(dt)return;dt=!0;const t=async()=>{if(ct=0,!dt)return;if(document.visibilityState==="visible"&&n.booted&&n.guest)try{const a=await(await st()).poll(n.guest.gid,n.since);!j&&!ut&&(n.likes=a.likes,Mt(),R("likes"));const o=new Set(n.notes.map(k=>k.id)),l=a.notes.filter(k=>!o.has(k.id)),r=new Set(a.hidden),h=n.notes.length;n.notes=Ct([...n.notes.filter(k=>!r.has(k.id)),...l]),(l.length||n.notes.length!==h)&&R("notes"),n.board=a.board,n.stats=a.stats,n.config=a.config,n.since=Math.max(n.since,a.now-6e4),Z(!0),R("board","stats","config")}catch{Z(!1)}const e=n.api?.kind==="local"?4e3:2e4+Math.random()*8e3;ct=window.setTimeout(t,e)};t(),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&dt&&ct&&(clearTimeout(ct),t())})}let j=z.get("nl:likes-dirty",!1),ut=!1,tt=new Set(z.get("nl:likes-sent",[])),rt=0;function Mt(){for(const t of new Set([...n.myLikes,...tt])){const e=(n.myLikes.has(t)?1:0)-(tt.has(t)?1:0);e&&(n.likes[t]=Math.max(0,(n.likes[t]??0)+e))}}function Tt(t){return n.myLikes.has(t)}function ae(t){return n.likes[t]??0}function be(t,e){const s=n.myLikes.has(t),a=!s;return a===s||(a?n.myLikes.add(t):n.myLikes.delete(t),n.likes[t]=Math.max(0,(n.likes[t]??0)+(a?1:-1)),z.set("nl:likes",[...n.myLikes]),j=!0,z.set("nl:likes-dirty",!0),R("likes"),clearTimeout(rt),rt=window.setTimeout(lt,900)),a}async function lt(){if(!n.guest||ut)return;ut=!0;const t=new Set(n.myLikes);j=!1;try{const s=await(await st()).setLikes(n.guest.gid,[...t]);tt=t,z.set("nl:likes-sent",[...tt]),n.likes=s.likes,Mt(),z.set("nl:likes-dirty",j),Z(!0),R("likes")}catch{j=!0,Z(!1),rt=window.setTimeout(lt,8e3)}finally{ut=!1,j&&(clearTimeout(rt),rt=window.setTimeout(lt,900))}}window.addEventListener("pagehide",()=>{j&&lt()});function Ct(t){return[...t].sort((e,s)=>s.ts-e.ts)}async function ye(t,e){const a=await(await st()).postNote(n.guest.gid,n.guest.name,t,e);return n.notes=Ct([a,...n.notes.filter(o=>o.id!==a.id)]),e||n.stats.notes++,R("notes","stats"),a}const X={get:()=>z.get(`nl:quiz:${n.guest?.gid}`,null),set:t=>z.set(`nl:quiz:${n.guest?.gid}`,t)};async function we(t,e){const s=await st(),a=await s.submitQuiz(n.guest.gid,n.guest.name,t,e);return n.result=a,z.set("nl:result",a),R("result"),s.poll(n.guest.gid,n.since).then(o=>{n.board=o.board,n.stats=o.stats,R("board","stats")},()=>{}),a}function $e(){for(const t of Object.keys(localStorage))t.startsWith("nl:")&&localStorage.removeItem(t)}const J=[];let Lt=0;function ke(t){history.pushState({overlay:!0},"");const e={close:t,done:!1};return J.push(e),()=>{if(e.done)return;e.done=!0;const s=J.indexOf(e);s>=0&&J.splice(s,1),Lt++,history.back()}}addEventListener("popstate",()=>{if(Lt){Lt--;return}const t=J.pop();t&&!t.done&&(t.done=!0,t.close())});function qe(){for(;J.length;){const t=J.pop();t.done||(t.done=!0,t.close())}}const Se="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",zt=(t="")=>`<svg class="${t}" viewBox="0 0 24 24" aria-hidden="true"><path d="${Se}"/></svg>`;function xe(t){const e=Tt(t);return`<button class="like ${e?"on":""}" data-like="${t}" aria-pressed="${e}" aria-label="喜歡這張照片">
    <span class="like-icon">${zt("o")}${zt("f")}</span>
    <span class="like-n" data-count="${t}">${K(ae(t))}</span>
  </button>`}let Le=null;const ze=()=>Le??(Le=document.body.appendChild(I('<div class="heart-layer" aria-hidden="true"></div>'))),Xt=["var(--heart)","var(--heart)","#f07b8c","#f6b3bd","#ffffff","#c92f4a"];function Ee(t,e,s=22){if(H())return;const a=ze();for(let o=0;o<s;o++){const l=I(`<span class="burst">${zt()}</span>`),r=10+Math.random()*22;l.style.cssText=`left:${t}px;top:${e}px;width:${r}px;height:${r}px;color:${Xt[o%Xt.length]}`,a.appendChild(l);const h=-Math.PI/2+(Math.random()-.5)*Math.PI*1.25,k=50+Math.random()*150,$=Math.cos(h)*k,f=Math.sin(h)*k-40-Math.random()*80,g=(Math.random()-.5)*70,b=850+Math.random()*650;l.animate([{transform:"translate(-50%,-50%) scale(0.2) rotate(0deg)",opacity:0},{transform:`translate(calc(-50% + ${$*.35}px), calc(-50% + ${f*.35}px)) scale(1.15) rotate(${g*.5}deg)`,opacity:1,offset:.22},{transform:`translate(calc(-50% + ${$}px), calc(-50% + ${f}px)) scale(0.85) rotate(${g}deg)`,opacity:0}],{duration:b,delay:Math.random()*120,easing:"cubic-bezier(0.22, 1, 0.36, 1)",fill:"both"}).onfinish=()=>l.remove()}}function Me(t,e,s){const a=be(t);if(a){ft(10);const o=e??document.querySelector(`[data-like="${t}"]`);if(o){const l=o.querySelector(".like-icon").getBoundingClientRect();Ee(l.left+l.width/2,l.top+l.height/2)}}return a}function Te(){document.addEventListener("click",e=>{const s=e.target.closest("[data-like]");s&&(e.stopPropagation(),Me(s.dataset.like,s))});let t={};P("likes",()=>{for(const e of Dt("[data-like]")){const s=e.dataset.like,a=Tt(s);e.classList.contains("on")!==a&&(e.classList.toggle("on",a),e.setAttribute("aria-pressed",String(a)),a&&e.querySelector(".f")?.animate([{transform:"scale(0.4)"},{transform:"scale(1.25)"},{transform:"scale(1)"}],{duration:420,easing:"cubic-bezier(0.22, 1, 0.36, 1)"}))}for(const e of Dt("[data-count]")){const s=e.dataset.count,a=ae(s);e.textContent!==K(a)&&Ce(e,a,(t[s]??a)<a),t[s]=a}})}function Ce(t,e,s=!0){const a=K(e);if(H()||!t.isConnected){t.textContent=a;return}t.animate([{transform:"translateY(0)",opacity:1},{transform:`translateY(${s?-60:60}%)`,opacity:0}],{duration:160,easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"}).onfinish=()=>{t.textContent=a,t.animate([{transform:`translateY(${s?60:-60}%)`,opacity:0},{transform:"translateY(0)",opacity:1}],{duration:260,easing:"cubic-bezier(0.22, 1, 0.36, 1)"})}}function et(t){jt(t),document.fonts?.ready.then(()=>jt(t))}function jt(t){t.querySelectorAll("[data-fit]").forEach(e=>{const s=e.closest("[data-fit-box]")??e.parentElement.closest("h1, h2, p, div, a"),a=Number(e.dataset.fit)||1/0;e.style.fontSize="100px",e.style.whiteSpace="nowrap",e.style.display="inline-block";const o=e.getBoundingClientRect().width,l=getComputedStyle(s),r=s.clientWidth-parseFloat(l.paddingLeft)-parseFloat(l.paddingRight);o&&r>0&&(e.style.fontSize=`${Math.min(a,Math.floor(100*r/o*.99*10)/10)}px`),e.style.display=""})}const Ft=["3650","3531","3673","3736","3789"],Ie=3600;function Ae(t){const e=n.guest,s=I(`<main class="screen intro">
    <div class="intro-photo" aria-hidden="true">
      ${Ft.map((f,g)=>V(_.get(f),{eager:g===0,pos:!1,sizes:"100vw",cls:`shot${g===0?" now":""}`})).join("")}
    </div>
    <div class="intro-scrim" aria-hidden="true"></div>
    <header class="intro-head meta-row caps rise" style="--d:200ms">
      <span>${T.brideEn} &amp; ${T.groomEn}</span><span>10 . 31</span><span>continue...</span>
    </header>
    <div class="intro-title">
      <p class="intro-just script write" style="--d:700ms" aria-hidden="true">just</p>
      <h1 class="intro-name" data-fit-box>
        <span class="mask"><span class="display" data-fit style="--d:250ms">Married</span></span>
        <span class="sr">${T.groom}與${T.bride}的婚禮</span>
      </h1>
      <p class="intro-line rise" style="--d:900ms">${T.groom} × ${T.bride}　·　${T.date}</p>
    </div>
    <div class="intro-card">
      ${e?`<div class="intro-ask rise" style="--d:1100ms">
              <p class="ask-q">歡迎回來，${M(e.name)}。</p>
              <div class="ask-row">
                <a class="btn" href="#/home">繼續 <span class="arrow" aria-hidden="true">→</span></a>
                <button class="btn quiet" type="button" data-rename>換個稱呼</button>
              </div>
            </div>`:""}
      <form class="intro-ask rise" style="--d:1100ms" ${e?"hidden":""} novalidate>
        <label class="ask-q" for="guest-name">我們該怎麼稱呼你？</label>
        <div class="ask-field">
          <input id="guest-name" name="name" type="text" autocomplete="nickname" enterkeyhint="go" maxlength="20"
            placeholder="例如：阿哲、王伯伯、大安圖傳 103" aria-describedby="name-note" />
          <button class="btn ask-go" type="submit">進場</button>
        </div>
        <p class="ask-note" id="name-note">這個稱呼會出現在你的留言與排行榜上。</p>
      </form>
    </div>
  </main>`);t.append(s),Kt(s),et(s);const a=[...s.querySelectorAll(".shot")];Ft.slice(1).forEach(f=>Zt(f));let o=0;const l=H()?0:window.setInterval(()=>{const f=a[o];o=(o+1)%a.length;const g=a[o];a.forEach(b=>b.classList.remove("top")),f.classList.add("under"),g.classList.remove("now","under"),g.offsetWidth,g.classList.add("now","top"),setTimeout(()=>f.classList.remove("now","under"),1600)},Ie),r=s.querySelector("form"),h=r.querySelector("input"),k=r.querySelector(".ask-go");h.addEventListener("focus",()=>s.classList.add("typing")),h.addEventListener("blur",()=>setTimeout(()=>s.classList.remove("typing"),120)),s.querySelector("[data-rename]")?.addEventListener("click",()=>{s.querySelector(".intro-ask:not(form)")?.remove(),r.hidden=!1,h.value=e?.name??"",h.focus()}),r.addEventListener("submit",async f=>{f.preventDefault();const g=h.value.trim().replace(/\s+/g," ").slice(0,20);if(!g){h.focus(),r.querySelector(".ask-field").animate([{transform:"translateX(0)"},{transform:"translateX(-6px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:360,easing:"cubic-bezier(0.22, 1, 0.36, 1)"});return}k.disabled=!0,ge(g),h.blur(),s.classList.add("leaving"),setTimeout(()=>location.hash="#/home",H()?0:420)});const $=()=>et(s);return addEventListener("resize",$),()=>{clearInterval(l),removeEventListener("resize",$)}}function mt(t){const e=(s,a)=>`<a href="#/${s}" ${t===s?'aria-current="page"':""}>${a}</a>`;return`<header class="bar">
    <a class="mark" href="#/home" aria-label="回到首頁">Linda &amp; Neil</a>
    <nav aria-label="主選單">${e("album","相冊")}${e("notes","留言板")}${e("quiz","遊戲")}</nav>
  </header>`}function Oe(t){if(!("IntersectionObserver"in window))return()=>{};t.classList.add("js-reveal");const e=new IntersectionObserver(a=>{for(const o of a)o.isIntersecting&&(o.target.classList.add("in"),e.unobserve(o.target))},{rootMargin:"0px 0px -8% 0px"}),s=()=>t.querySelectorAll("[data-reveal]:not(.in)").forEach(a=>e.observe(a));return s(),Object.assign(()=>e.disconnect(),{watch:s})}function ne(t){const e=n.guest,s=I(`<div class="screen home screen-enter">
    ${mt("home")}
    <main>
      <section class="hello">
        <div class="hello-grid">
          <div class="hello-photo rise">${V(_.get("3605"),{sizes:"62vw",eager:!0})}</div>
          <div class="hello-vert rise" style="--i:1" aria-hidden="true"><span class="caps vert">with you</span></div>
        </div>
        <h1 class="hello-h rise" style="--i:2">${M(e.name)}，歡迎你來。</h1>
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
        <div class="door-bg">${V(_.get("3627"),{sizes:"100vw"})}</div>
        <div class="door-scrim" aria-hidden="true"></div>
        <p class="door-script script" data-reveal aria-hidden="true">our</p>
        <h2 class="door-display display" data-fit-box aria-label="相冊"><span data-fit>Album</span></h2>
        <div class="door-foot" data-reveal>
          <p class="door-line" data-album-meta>我們的婚紗照，一頁一頁翻。</p>
          <span class="btn door-btn light">翻開相冊 <span class="arrow" aria-hidden="true">→</span></span>
        </div>
      </a>

      <a class="door door-notes" href="#/notes">
        <div class="door-blur" style="background-image:url(${te("3686",640)})" aria-hidden="true"></div>
        <div class="door-inset" data-reveal>${V(_.get("3686"),{sizes:"60vw"})}</div>
        <div class="door-notes-copy">
          <h2 class="door-zh" data-reveal>留言板</h2>
          <blockquote class="door-quote" data-latest-note data-reveal></blockquote>
          <p class="door-line" data-notes-meta data-reveal></p>
          <span class="btn door-btn light" data-reveal>我要留言 <span class="arrow" aria-hidden="true">→</span></span>
        </div>
      </a>

      <a class="door door-quiz" href="#/quiz">
        <div class="door-quiz-photo" data-reveal>${V(_.get("3646"),{sizes:"70vw"})}</div>
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
  </div>`);t.append(s),Kt(s),et(s);const a=Oe(s);s.querySelector("[data-scroll]").addEventListener("click",()=>{const g=s.querySelector("[data-first-door]").getBoundingClientRect().top+scrollY-(s.querySelector(".bar")?.clientHeight??0);scrollTo({top:g,behavior:H()?"auto":"smooth"})});const o=s.querySelector(".scroll-cue"),l=()=>o.classList.toggle("gone",scrollY>80);addEventListener("scroll",l,{passive:!0});const r=f=>s.querySelector(f),h=()=>{const f=n.stats;r("[data-stat-guests]").textContent=f.guests>1?`已經有 ${K(f.guests)} 位賓客進場`:"";const g=n.myLikes.size;r("[data-album-meta]").textContent=g?`我們的婚紗照，你已經按了 ${g} 顆愛心。`:"我們的婚紗照，一頁一頁翻。";const b=n.notes.find(m=>!m.private);r("[data-latest-note]").innerHTML=b?`<p>「${M(b.text.length>40?b.text.slice(0,40)+"…":b.text)}」</p><cite>— ${M(b.name)}</cite>`:"<p>還沒有人留言。你可以當第一個。</p>",r("[data-notes-meta]").textContent=f.notes?`已經有 ${K(f.notes)} 則留言`:"";const E=n.result,x=X.get(),d=n.quiz.length;r("[data-quiz-sub]").textContent=E?`你答對了 ${E.score} 題，得到 ${E.pct} 分。`:x&&x.answers.length?`你寫到第 ${x.answers.length} 題，回來把它寫完吧。`:`${d} 題選擇題，都是關於我們兩個人的事。`,r("[data-quiz-meta]").textContent=E?"看排行榜":x?.answers.length?"繼續作答":"開始作答",r("[data-quiz-quick]").textContent=E?`你得到 ${E.pct} 分`:"你有多懂我們？"};h();const k=[P("stats",h),P("notes",h),P("likes",h),P("result",h),P("config",h)],$=()=>et(s);return addEventListener("resize",$),()=>{k.forEach(f=>f()),a(),removeEventListener("resize",$),removeEventListener("scroll",l)}}function ie(t,e={}){const s=document.activeElement,a=I(`<div class="sheet ${e.cls??""}" role="dialog" aria-modal="true" aria-label="${e.label??""}">
    <div class="sheet-scrim" data-close></div>
    <div class="sheet-paper">
      <div class="sheet-grip" aria-hidden="true"></div>
      <button class="sheet-x" type="button" data-close aria-label="關閉">關閉</button>
      <div class="sheet-body">${t}</div>
    </div>
  </div>`);document.body.append(a),document.documentElement.style.overflow="hidden";const o=a.querySelector(".sheet-paper");requestAnimationFrame(()=>a.classList.add("open"));let l=!1;const r=()=>{l||(l=!0,a.classList.remove("open"),a.classList.add("closing"),document.documentElement.style.overflow="",removeEventListener("keydown",k),setTimeout(()=>a.remove(),H()?0:320),s?.focus?.(),e.onClose?.())},h=ke(r);a.close=()=>{h(),r()};const k=b=>b.key==="Escape"&&a.close();addEventListener("keydown",k),a.addEventListener("click",b=>{b.target.closest("[data-close]")&&a.close()});let $=-1;const f=a.querySelector(".sheet-grip");f.addEventListener("pointerdown",b=>{$=b.clientY,f.setPointerCapture(b.pointerId),o.style.transition="none"}),f.addEventListener("pointermove",b=>{$<0||(o.style.transform=`translateY(${Math.max(0,b.clientY-$)}px)`)});const g=b=>{if($<0)return;const E=b.clientY-$;$=-1,o.style.transition="",o.style.transform="",E>90&&a.close()};return f.addEventListener("pointerup",g),f.addEventListener("pointercancel",g),setTimeout(()=>a.querySelector("[autofocus], .sheet-body button, .sheet-body textarea")?.focus({preventScroll:!0}),60),a}const Q=he(),W=Q.length,$t={studio:{script:"with you",display:"Smile"},meadow:{script:"Love",display:"Meadow"},seaside:{script:"Happy",display:"Seaside"}},Yt=["♡ we are married ♡","| a good mood |","| you &amp; me |","stay with you","together for life","music | faith | life","beautiful","soul mate"],ot=t=>Yt[t%Yt.length],Wt=t=>ot(t).replace(/[|♡]/g,"").trim(),oe=t=>!t||t.kind==="cover"?ee[0]:t.ch;function O(t,e="",s="(min-width: 700px) 30vw, 80vw"){return`<figure class="pf ${e}" data-photo="${t.id}">
    ${V(t,{sizes:s,alt:"",lazy:!1})}
    <figcaption class="pf-like">${xe(t.id)}</figcaption>
  </figure>`}const pt=t=>`style="--n:${t.length}"`;function He(t){const e=Q[t];if(!e)return'<div class="page page-none"></div>';const s=oe(e),a=`class="page page-${e.kind}" data-ch="${s.key}"`;switch(e.kind){case"cover":return`<article ${a}>
        ${O(_.get("3654"),"bg","(min-width: 700px) 40vw, 100vw")}
        <div class="pg-scrim"></div>
        <p class="pg-top caps meta-row"><span>${T.brideEn} &amp; ${T.groomEn}</span><span>${T.date}</span></p>
        <div class="pg-title">
          <p class="pg-script script">in the</p>
          <h2 class="pg-display display" ${pt("Light")}>Light</h2>
          <p class="pg-sub">婚紗相冊　·　點畫面右邊翻下一頁</p>
        </div>
      </article>`;case"opener":{const o=$t[s.key];return`<article ${a}>
        ${O(e.photos[0],"bg","(min-width: 700px) 40vw, 100vw")}
        <div class="pg-scrim"></div>
        <p class="pg-top caps meta-row"><span>${T.brideEn} &amp; ${T.groomEn}</span><span>${T.date}</span></p>
        <div class="pg-title">
          <p class="pg-script script">${o.script}</p>
          <h2 class="pg-display display" ${pt(o.display)}>${o.display}</h2>
          <p class="pg-sub">${s.zh}</p>
        </div>
      </article>`}case"trio":{const[o,l,r]=e.photos;return`<article ${a}>
        <div class="trio${e.n%2?" flip":""}">
          ${O(o,"t-a")}
          <div class="t-panel"><span class="caps vert">${Wt(e.n)}</span></div>
          ${O(l,"t-b","(min-width: 700px) 15vw, 50vw")}
          ${O(r,"t-c","(min-width: 700px) 15vw, 50vw")}
        </div>
      </article>`}case"split":{const[o,l]=e.photos;return`<article ${a}>
        <div class="split-block"></div>
        ${O(o,"s-p")}
        <p class="s-caps caps">${ot(e.n)}</p>
        ${O(l,"s-l","(min-width: 700px) 40vw, 100vw")}
      </article>`}case"full":return`<article ${a}>
        ${O(e.photos[0],"bg","(min-width: 700px) 40vw, 100vw")}
        <div class="pg-scrim low"></div>
        <p class="pg-foot caps">${ot(e.n)}</p>
      </article>`;case"caption":return`<article ${a}>
        ${O(e.photos[0],"c-photo","(min-width: 700px) 40vw, 100vw")}
        <p class="c-caps caps">${ot(e.n)}</p>
      </article>`;case"inset":{const[o,l]=e.photos;return`<article ${a}>
        <div class="i-blur" style="background-image:url(${te(o.id,640)})"></div>
        ${O(o,"i-a framed")}
        ${O(l,"i-b framed")}
        <p class="i-foot caps meta-row"><span>${Wt(e.n)}</span><span>2026</span></p>
      </article>`}case"lands":return`<article ${a}>
        <div class="lands">${e.photos.map(o=>O(o,"l-x","(min-width: 700px) 35vw, 85vw")).join("")}</div>
        <p class="l-caps">${s.zh}</p>
      </article>`;case"land":return`<article ${a}>
        <p class="pg-top caps meta-row"><span>${s.zh}</span><span>${ot(e.n)}</span></p>
        ${O(e.photos[0],"ld","(min-width: 700px) 35vw, 90vw")}
        <h2 class="pg-display display ld-word" ${pt($t[s.key].display)}>${$t[s.key].display}</h2>
      </article>`;case"end":return`<article ${a}>
        ${O(e.photos[0],"bg","(min-width: 700px) 40vw, 100vw")}
        <div class="pg-scrim end"></div>
        <div class="end-copy">
          <p class="end-zh">謝謝你，<br>把我們的相冊翻到最後。</p>
          <p class="end-note">也歡迎到留言板，留一句話給我們。</p>
          <div class="end-actions">
            <a class="btn light" href="#/notes">到留言板留言 <span class="arrow" aria-hidden="true">→</span></a>
            <button class="btn quiet" type="button" data-goto="0">回到第一頁</button>
          </div>
        </div>
        <div class="pg-title">
          <p class="pg-script script">forever</p>
          <h2 class="pg-display display" ${pt("Soul mate")}>Soul mate</h2>
        </div>
      </article>`}}const ht=new Map;function G(t){let e=ht.get(t);return e||(e=document.adoptNode(I(He(t))),e.querySelectorAll(".ph img").forEach(s=>{const a=()=>s.classList.add("in");s.complete&&s.naturalWidth?a():(s.addEventListener("load",a,{once:!0}),s.addEventListener("error",a,{once:!0}))}),ht.set(t,e)),e}function Ne(t){for(const[e,s]of ht)Math.abs(e-t)>8&&!s.isConnected&&ht.delete(e)}function Pe(t,e){const s=I(`<div class="screen album">
    ${mt("album")}
    <div class="album-head">
      <p class="album-ch" aria-live="polite" data-zh></p>
      <p class="album-n" data-n></p>
    </div>
    <div class="book" role="region" aria-roledescription="相冊" aria-label="婚紗照相冊。點畫面右邊翻下一頁，點左邊回上一頁，也可以左右滑動。">
      <div class="stage"></div>
    </div>
    <div class="album-foot">
      <div class="album-progress" aria-hidden="true"><i></i></div>
      <div class="album-tools">
        <button class="tool" type="button" data-prev><span aria-hidden="true">←</span> 上一頁</button>
        <button class="tool tool-toc" type="button" data-toc>目錄</button>
        <button class="tool" type="button" data-next>下一頁 <span aria-hidden="true">→</span></button>
      </div>
    </div>
  </div>`);t.append(s);const a=s.querySelector(".book"),o=s.querySelector(".stage");let l=!1,r=0,h=[];const k=()=>l?Math.max(0,2*r-1):r,$=i=>r=l?Math.ceil(i/2):i,f=()=>l?Math.ceil((W-1)/2):W-1;function g(){const i=a.getBoundingClientRect(),c=k(),p=i.width>=700&&i.width/i.height>1.15,v=10,y=i.width-v*2,S=i.height-v*2;let N,Y;p?(Y=S,N=Math.min(y/2,Y*.5625)):(N=y,Y=S),o.style.width=`${p?N*2:N}px`,o.style.height=`${Y}px`,(p!==l||!h.length)&&(l=p,s.classList.toggle("is-wide",l),$(c),b())}function b(){o.replaceChildren(),h=l?[G(2*r-1),G(2*r)].map((i,c)=>E(i,c?"right":"left")):[E(G(r),"single")],o.append(...h),m(),w()}function E(i,c){const p=I(`<div class="slot slot-${c}"><div class="shade"></div></div>`);return p.prepend(i),p}function x(i,c){const p=h[i],v=G(c),y=p.firstElementChild;y!==v&&y.replaceWith(v)}function d(){return Q[l?2*r<W?2*r:2*r-1:r]}function m(){const i=d();s.querySelector("[data-zh]").textContent=i.kind==="cover"?"相冊":i.kind==="end"?"最後一頁":oe(i).zh;const c=k()+1,p=l?Math.min(W,2*r+1):c;s.querySelector("[data-n]").textContent=c===p?`第 ${c} 頁，共 ${W} 頁`:`第 ${c}–${p} 頁，共 ${W} 頁`;const v=(l?2*r:r)/(W-1);s.querySelector(".album-progress i").style.transform=`scaleX(${Math.min(1,v)})`,s.querySelector("[data-prev]").disabled=r<=0,s.querySelector("[data-next]").disabled=r>=f();const y="photos"in i?i.photos[0]:void 0,S=i.kind==="opener"?i.ch.key:y?.id??i.kind;history.replaceState(null,"",`#/album/${S}`)}function w(){const i=k();for(let c=i-2;c<=i+(l?5:3);c++){const p=Q[c];p&&("photos"in p&&p.photos.forEach(v=>Zt(v.id)),G(c))}Ne(i)}let u=null,q=!1,L=0;const F=I('<div class="page page-back"></div>');function A(i){if(q||u||i===1&&r>=f()||i===-1&&r<=0)return null;let c,p,v;l?i===1?(c=2*r,p=2*r+1,x(1,2*r+2),v=h[1]):(c=2*r-2,p=2*r-1,x(0,2*r-3),v=h[0]):(c=i===1?r:r-1,p=-1,i===1&&x(0,r+1),v=h[0]);const y=I(`<div class="leaf ${l?"leaf-wide":""}">
      <div class="face front"></div><div class="face back"></div>
    </div>`);y.children[0].append(G(c),I('<div class="sheen"></div>')),y.children[1].append(p>=0?G(p):F,I('<div class="sheen"></div>')),o.append(y);const S={dir:i,leaf:y,under:v,angle:i===1?0:-180};return C(S,S.angle),S}function C(i,c){i.angle=c,i.leaf.style.transform=`rotateY(${c}deg)`;const p=-c/180,v=Math.sin(p*Math.PI);i.leaf.children[0].lastElementChild.style.opacity=String(p<.5?p*.9:0),i.leaf.children[1].lastElementChild.style.opacity=String(p>=.5?(1-p)*.9:0),i.leaf.style.setProperty("--lift",String(v)),i.under.querySelector(".shade").style.opacity=String(i.dir===1?(1-p)*.55*v:p*.55*v)}function at(i,c,p=0){q=!0;const v=c?i.dir===1?-180:0:i.dir===1?0:-180,y=i.angle,S=Math.abs(v-y),N=H()?1:Math.max(200,Math.min(520,S/180*520-Math.abs(p)*120)),Y=performance.now(),ce=wt=>1-Math.pow(1-wt,3);let yt=!1;const Nt=()=>{yt||(yt=!0,C(i,v),re(i,c))},Pt=wt=>{if(yt)return;const Rt=Math.min(1,(wt-Y)/N);C(i,y+(v-y)*ce(Rt)),Rt<1?requestAnimationFrame(Pt):Nt()};requestAnimationFrame(Pt),setTimeout(Nt,N+250)}function re(i,c){if(c&&(r+=i.dir),l?(x(0,2*r-1),x(1,2*r)):x(0,r),i.leaf.remove(),h.forEach(p=>p.querySelector(".shade").style.opacity="0"),u=null,q=!1,c&&(ft(6),m(),w()),L){const p=L;L=0,B(p)}}function B(i){if(q||u){L=i;return}const c=A(i);c&&at(c,!0)}function It(i){q||u||($(Math.max(0,Math.min(W-1,i))),o.animate([{opacity:0},{opacity:1}],{duration:H()?1:420,easing:"ease"}),b())}let D=null,nt=!1,gt=0,vt=0,U=0;a.addEventListener("pointerdown",i=>{i.target.closest("button, a")||(D={x:i.clientX,y:i.clientY,id:i.pointerId},nt=!1,gt=i.clientX,vt=performance.now(),U=0)}),a.addEventListener("pointermove",i=>{if(!D||i.pointerId!==D.id)return;const c=i.clientX-D.x,p=i.clientY-D.y;if(!nt){if(Math.abs(c)<8||Math.abs(c)<Math.abs(p)||q||u)return;if(u=A(c<0?1:-1),!u){D=null;return}nt=!0,a.setPointerCapture(i.pointerId)}const v=performance.now();U=(i.clientX-gt)/Math.max(1,v-vt),gt=i.clientX,vt=v;const y=o.clientWidth/(l?2:1),S=Math.max(-1,Math.min(1,c/y));u.dir===1?C(u,Math.max(-180,Math.min(0,S*180))):C(u,Math.max(-180,Math.min(0,-180+S*180)))});const At=i=>{if(!D||i.pointerId!==D.id)return;const c=D;if(D=null,nt&&u){const y=u,S=-y.angle/180,N=y.dir===1?U<-.35:U>.35,Y=y.dir===1?U>.35:U<-.35;nt=!1,at(y,!Y&&(N||(y.dir===1?S>.4:S<.6)),U);return}if(i.type==="pointercancel")return;const p=i.clientX-c.x;if(Math.hypot(p,i.clientY-c.y)>10){Math.abs(p)>30&&(q||u)&&B(p<0?1:-1);return}const v=a.getBoundingClientRect();B((i.clientX-v.left)/v.width<.5?-1:1)};a.addEventListener("pointerup",At),a.addEventListener("pointercancel",At),s.addEventListener("click",i=>{const c=i.target;c.closest("[data-next]")?B(1):c.closest("[data-prev]")?B(-1):c.closest("[data-toc]")?le():c.closest("[data-goto]")&&It(Number(c.closest("[data-goto]").dataset.goto))});const Ot=i=>{document.querySelector(".sheet")||(i.key==="ArrowRight"?B(1):i.key==="ArrowLeft"&&B(-1))};addEventListener("keydown",Ot);function le(){const i=ee.map(v=>{const y=Q.findIndex(N=>N.kind==="opener"&&N.ch.key===v.key),S=Q[y].photos[0];return`<li><button type="button" class="toc-row" data-goto="${y}">
        <span class="toc-photo">${V(S,{sizes:"120px"})}</span>
        <span class="toc-name"><span class="toc-zh">${v.zh}</span></span>
        <span class="toc-n">第 ${y+1} 頁</span>
      </button></li>`}).join(""),c=fe.filter(v=>Tt(v.id)),p=ie(`<h2 class="sheet-title">目錄</h2>
      <ol class="toc">${i}</ol>
      ${c.length?`<p class="toc-liked">你按過愛心的照片有 ${c.length} 張。</p>`:""}`);p.addEventListener("click",v=>{const y=v.target.closest("[data-goto]");y&&(p.close(),setTimeout(()=>It(Number(y.dataset.goto)),60))})}const bt=(()=>{if(!e)return 0;const i=Q.findIndex(c=>"photos"in c&&c.photos.some(p=>p.id===e)||c.kind==="opener"&&c.ch.key===e||c.kind===e);return Math.max(0,i)})();r=bt,l=!1,h=[];const Ht=new ResizeObserver(()=>{!q&&!u&&g()});return g(),bt&&($(bt),b()),Ht.observe(a),()=>{Ht.disconnect(),removeEventListener("keydown",Ot)}}const Bt=["warm","white","blue","warm","white","slate","warm","white"],Ut=[78,88,72,94,82,68],kt="nl:draft";function Re(t){let e=2166136261;for(let s=0;s<t.length;s++)e=Math.imul(e^t.charCodeAt(s),16777619);return e>>>0}function De(t,e){const s=Re(t.id),a=[...t.text].length,o=a<=14?"xl":a<=44?"l":"m",l=t.private?"private":Bt[s%Bt.length],r=Ut[(s>>4)%Ut.length],h=(s>>8)%2?"r":"l";return I(`<li class="note n-${l} n-${o} n-${h}" data-id="${t.id}" style="--w:${r}%">
    ${t.private?'<p class="note-tag">只給新人看</p>':""}
    <p class="note-text">${M(t.text)}</p>
    <p class="note-by"><span class="note-name">${M(t.name)}</span><time datetime="${new Date(t.ts).toISOString()}" data-ts="${t.ts}">${t.mine?"你・":""}${se(t.ts,e)}</time></p>
  </li>`)}function Xe(t){const e=I(`<div class="screen notes-screen screen-enter">
    ${mt("notes")}
    <main class="notes">
      <header class="notes-hi">
        <p class="notes-meta rise" data-note-count></p>
        <p class="notes-script script write" style="--d:300ms" aria-hidden="true">love</p>
        <p class="notes-display display" data-fit-box aria-hidden="true"><span class="mask"><span data-fit>Notes</span></span></p>
        <h1 class="notes-h rise" style="--i:1">留言板</h1>
        <p class="rise" style="--i:2">留一句祝福、一段回憶，或任何想對我們說的話。可以讓大家都看到，也可以只給我們兩個人看。</p>
      </header>
      <ol class="wall" data-wall aria-label="大家的留言"></ol>
      <p class="wall-empty" hidden>還沒有人留言。<br>你可以當第一個。</p>
    </main>
    <div class="notes-cta">
      <button class="btn" type="button" data-write>我要留言 <span class="arrow" aria-hidden="true">→</span></button>
    </div>
  </div>`);t.append(e),et(e);const s=e.querySelector("[data-wall]"),a=e.querySelector(".wall-empty"),o=e.querySelector("[data-note-count]"),l=e.querySelector("[data-write]");let r=!0;const h=()=>{const f=Date.now(),g=n.notes,b=new Map([...s.children].map(m=>[m.dataset.id,m])),E=new Set(g.map(m=>m.id));for(const[m,w]of b)E.has(m)||w.remove();let x=null;g.forEach((m,w)=>{let u=b.get(m.id);u||(u=De(m,f),r?(u.classList.add("rise"),u.style.setProperty("--i",String(Math.min(w,8)+2))):u.classList.add("arrive"),x?x.after(u):s.prepend(u)),x=u}),r=!1;const d=g.filter(m=>!m.private).length;o.textContent=n.stats.notes||d?`已經有 ${K(Math.max(n.stats.notes,d))} 則留言`:"",a.hidden=g.length>0||!n.booted,l.disabled=!n.config.notesOpen,l.innerHTML=n.config.notesOpen?'我要留言 <span class="arrow" aria-hidden="true">→</span>':"留言板已經關閉了"};h();const k=window.setInterval(()=>{const f=Date.now();s.querySelectorAll("time[data-ts]").forEach(g=>{const b=g.textContent.startsWith("你・")?"你・":"";g.textContent=b+se(Number(g.dataset.ts),f)})},6e4);l.addEventListener("click",Gt),location.hash.endsWith("/write")&&setTimeout(Gt,300);const $=[P("notes",h),P("stats",h),P("config",h)];return()=>{$.forEach(f=>f()),clearInterval(k)}}function Gt(){const t=n.guest.name;let e="";try{e=localStorage.getItem(kt)??""}catch{}const s=ie(`<h2 class="sheet-title">寫下留言</h2>
    <form class="compose" novalidate>
      <div class="slip">
        <label class="sr" for="note-text">想對我們說的話</label>
        <textarea id="note-text" maxlength="300" rows="6" placeholder="想對我們說的話…" aria-describedby="note-len"></textarea>
        <p class="slip-by">${M(t)}</p>
      </div>
      <p class="slip-len" id="note-len">0 / 300 字</p>
      <fieldset class="who">
        <legend>誰看得到這則留言</legend>
        <label><input type="radio" name="who" value="public" checked><span>大家都看得到</span></label>
        <label><input type="radio" name="who" value="private"><span>只給新人看</span></label>
      </fieldset>
      <p class="who-note" data-who-note>會出現在留言板上，署名「${M(t)}」。</p>
      <button class="btn send" type="submit" disabled>送出留言 <span class="arrow" aria-hidden="true">→</span></button>
    </form>`,{cls:"sheet-compose",label:"寫下留言"}),a=s.querySelector("form"),o=a.querySelector("textarea"),l=a.querySelector(".slip-len"),r=a.querySelector(".send"),h=a.querySelector("[data-who-note]");o.value=e;const k=()=>{l.textContent=`${[...o.value].length} / 300 字`,r.disabled=!o.value.trim();try{localStorage.setItem(kt,o.value)}catch{}};k(),o.addEventListener("input",k),a.addEventListener("change",()=>{const $=a.elements.namedItem("who").value==="private";a.classList.toggle("is-private",$),h.textContent=$?"不會出現在留言板上，只有昇翰和優看得到。你自己也還看得到它。":`會出現在留言板上，署名「${t}」。`}),setTimeout(()=>o.focus(),380),a.addEventListener("submit",async $=>{$.preventDefault();const f=o.value.trim();if(!f)return;const g=a.elements.namedItem("who").value==="private";r.disabled=!0,r.textContent="送出中…";try{await ye(f,g);try{localStorage.removeItem(kt)}catch{}ft(12);const b=a.querySelector(".slip");H()||await b.animate([{transform:"none",opacity:1},{transform:"translateY(-40vh) scale(0.9)",opacity:0}],{duration:600,easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)",fill:"forwards"}).finished,s.close(),St(g?"留言送出了，只有新人看得到。":"留言送出了，謝謝你。"),window.scrollTo({top:0,behavior:H()?"auto":"smooth"})}catch{r.disabled=!1,r.innerHTML='再送一次 <span class="arrow" aria-hidden="true">→</span>',St("沒送出去，連線不太穩。內容還在，再按一次試試看。")}})}const je=["答對了。","沒錯，就是這個。","你很懂。","對！"],Fe=["差一點。","不是這個喔。","猜錯了，沒關係。","嗯，不是這個。"];function Ye(t){return t>=100?"全對。你可能比我們還懂我們。":t>=80?"你一定是一路看著我們走過來的人。":t>=60?"已經很懂我們了，剩下的，今天補上。":t>=40?"一半一半，剛剛好。剩下的故事，等一下敬酒的時候問我們。":"沒關係。答錯的每一題，都是今天認識我們的理由。謝謝你來。"}function We(t){const e=I(`<div class="screen quiz-screen screen-enter">${mt("quiz")}<main class="quiz"></main></div>`);t.append(e);const s=e.querySelector("main");let a="intro",o=0;const l=()=>{if(n.result&&(a="result"),a==="result"&&n.result)return g(n.result);const d=X.get();if(a==="q"&&d)return h(Math.min(d.answers.length,n.quiz.length-1));r()};function r(){a="intro";const d=X.get(),m=n.quiz.length,w=n.config.quizOpen;s.className="quiz quiz-intro",s.innerHTML=`
      <p class="quiz-meta rise">共 ${m} 題</p>
      <p class="quiz-script script write" style="--d:300ms" aria-hidden="true">how well</p>
      <p class="quiz-display display" data-fit-box aria-hidden="true"><span class="mask"><span data-fit>Do you know us</span></span></p>
      <h1 class="quiz-title rise" style="--i:1">你有多懂我們？</h1>
      <p class="quiz-lead rise" style="--i:2">${m} 題選擇題，都是關於我們兩個人的事。</p>
      <ul class="quiz-rules rise" style="--i:3">
        <li>每個人只有一次機會，交卷之後就不能重來。</li>
        <li>中途離開沒關係，回來可以接著寫。</li>
        <li>答對最多的人，沒有獎品，但你擁有可以炫耀一整天的權力。</li>
        <li class="quiz-secret">這只是個小遊戲，玩得開心最重要。答案請放在心裡，別悄悄告訴同桌的朋友喔。</li>
      </ul>
      <div class="quiz-go rise" style="--i:4">
        ${w?`<button class="btn" type="button" data-start>${d?.answers.length?`接著寫第 ${d.answers.length+1} 題`:"開始作答"} <span class="arrow" aria-hidden="true">→</span></button>`:'<p class="quiz-closed">遊戲現在沒有開放作答，等一下再來看看。</p>'}
      </div>`,et(s),s.querySelector("[data-start]")?.addEventListener("click",()=>{X.get()||X.set({answers:[],started:Date.now()}),a="q",l()})}function h(d){o=d;const m=n.quiz[d],w=n.quiz.length;s.className="quiz quiz-q",s.innerHTML=`
      <div class="q-progress" aria-hidden="true"><span>第 ${d+1} 題</span><span>共 ${w} 題</span></div>
      <div class="q-bar" aria-hidden="true"><i style="transform:scaleX(${d/w})"></i></div>
      <h1 class="q-text rise"><span class="sr">第 ${d+1} 題，共 ${w} 題：</span>${M(m.q)}</h1>
      <ol class="q-options">
        ${m.options.map((u,q)=>`<li class="rise" style="--i:${q+1}"><button class="opt" type="button" data-k="${q}"><span class="opt-k latin">${"ABCDEF"[q]}</span><span class="opt-t">${M(u)}</span></button></li>`).join("")}
      </ol>
      <div class="q-reveal" hidden>
        <p class="q-verdict" role="status"></p>
        ${m.note?`<p class="q-note">${M(m.note)}</p>`:""}
        <button class="btn" type="button" data-next></button>
        ${d===w-1?'<p class="q-last">交卷之後就不能再作答囉。</p>':""}
      </div>`,requestAnimationFrame(()=>s.querySelector(".q-bar i").style.transform=`scaleX(${(d+.5)/w})`),s.querySelectorAll(".opt").forEach(u=>u.addEventListener("click",()=>k(Number(u.dataset.k)))),window.scrollTo({top:0})}function k(d){const m=n.quiz[o],w=X.get()??{answers:[],started:Date.now()};w.answers=w.answers.slice(0,o),w.answers[o]=d,X.set(w);const u=d===m.answer;ft(u?12:[8,60,8]),s.querySelectorAll(".opt").forEach(A=>{const C=Number(A.dataset.k);A.disabled=!0,C===m.answer&&A.classList.add("right"),C===d&&A.classList.add("picked",u?"is-right":"is-wrong"),C!==m.answer&&C!==d&&A.classList.add("dim")});const q=s.querySelector(".q-reveal"),L=o===n.quiz.length-1;q.querySelector(".q-verdict").textContent=(u?je:Fe)[o%4],q.classList.toggle("is-right",u);const F=q.querySelector("[data-next]");F.innerHTML=L?'交卷，看結果 <span class="arrow" aria-hidden="true">→</span>':'下一題 <span class="arrow" aria-hidden="true">→</span>',q.hidden=!1,q.classList.add("rise"),s.querySelector(".q-bar i").style.transform=`scaleX(${(o+1)/n.quiz.length})`,F.addEventListener("click",()=>L?f():$()),setTimeout(()=>q.scrollIntoView({behavior:H()?"auto":"smooth",block:"nearest"}),120)}function $(){if(H())return h(o+1);s.animate([{opacity:1,transform:"none"},{opacity:0,transform:"translateX(-24px)"}],{duration:200,easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"}).onfinish=()=>h(o+1)}async function f(){const d=X.get(),m=s.querySelector("[data-next]");m.disabled=!0,m.textContent="改考卷中…";const w=n.quiz.map((u,q)=>d.answers[q]??-1);try{const u=await we(w,Date.now()-d.started);a="result",g(u,!0)}catch(u){m.disabled=!1,m.innerHTML='再交一次 <span class="arrow" aria-hidden="true">→</span>',St(u instanceof Error&&u.message?u.message:"沒交出去，連線不太穩，再按一次試試看。")}}function g(d,m=!1){s.className="quiz quiz-result";const w=n.config.boardSize,u=d.players>1?Math.round((d.players-d.rank)/(d.players-1)*100):0,q=d.rank<=w&&d.pct>=n.config.boardMinPct?`你在排行榜上，第 ${d.rank} 名。`:u>=50?`你贏過了 ${u}% 的賓客。`:"";if(s.innerHTML=`
      <p class="r-meta rise">你的分數</p>
      <p class="r-pct latin" aria-label="${d.pct} 分"><span class="mask"><span><span data-pct>${m&&!H()?0:d.pct}</span><span class="r-unit">分</span></span></span></p>
      <p class="r-line rise" style="--i:1">答對 ${d.score} 題，共 ${d.total} 題。${q}</p>
      <p class="r-msg rise" style="--i:2">${Ye(d.pct)}</p>

      <section class="board-wrap rise" style="--i:3" aria-labelledby="board-h">
        <h2 id="board-h" class="board-h">排行榜 <span>前 ${w} 名</span></h2>
        <ol class="board" data-board></ol>
        <p class="board-note">前 ${w} 名沒有獎品，但你擁有可以炫耀一整天的權力。</p>
      </section>

      <details class="review rise" style="--i:4">
        <summary>看看每一題的答案</summary>
        <p class="review-secret">看完答案，也請幫我們保密，讓還沒玩的朋友也能好好猜一猜。</p>
        <ol class="review-list">
          ${n.quiz.map((L,F)=>{const A=d.answers[F],C=A===L.answer;return`<li class="${C?"ok":"no"}">
                <p class="rv-q">${M(L.q)}</p>
                <p class="rv-a">${C?"你答對了：":`你選了「${M(L.options[A]??"沒有作答")}」，答案是：`}<strong>${M(L.options[L.answer])}</strong></p>
                ${L.note?`<p class="rv-note">${M(L.note)}</p>`:""}
              </li>`}).join("")}
        </ol>
      </details>

      <div class="r-next rise" style="--i:5">
        <a class="btn" href="#/notes">到留言板留言給我們 <span class="arrow" aria-hidden="true">→</span></a>
        <a class="btn quiet" href="#/album">翻翻相冊</a>
      </div>`,b(),m&&!H()){const L=s.querySelector("[data-pct]"),F=performance.now(),A=C=>{const at=Math.min(1,(C-F)/1400);L.textContent=String(Math.round(d.pct*(1-Math.pow(1-at,3)))),at<1&&requestAnimationFrame(A)};requestAnimationFrame(A),window.scrollTo({top:0})}}function b(){const d=s.querySelector("[data-board]");if(!d)return;const m=n.board;d.innerHTML=m.length?m.map((w,u)=>`<li class="${w.mine?"mine":""}">
              <span class="b-rank latin">${u+1}</span>
              <span class="b-name">${M(w.name)}${w.mine?"<em>（你）</em>":""}</span>
              <span class="b-pct">${w.pct} 分</span>
            </li>`).join(""):'<li class="b-empty">排行榜正在等第一個交卷的人。</li>'}l();let E=`${n.config.quizOpen}/${n.quiz.length}`;const x=[P("board",b),P("result",()=>a!=="q"&&l()),P("config",()=>{const d=`${n.config.quizOpen}/${n.quiz.length}`;d!==E&&a==="intro"&&l(),E=d})];return()=>x.forEach(d=>d())}const Be={"":Ae,home:ne,album:Pe,notes:Xe,quiz:We},Qt=document.getElementById("app");let Vt,qt="";function _t(){qe();const[,t="",e]=location.hash.replace(/^#/,"").split("/"),s=n.guest?t:"";!n.guest&&t&&history.replaceState(null,"","#/");const a=Be[s]??ne,o=`${s}/${e??""}`;if(o===qt)return;const l=qt.split("/")[0]===s;qt=o,!(l&&s==="album")&&(Vt?.(),Qt.replaceChildren(),document.body.dataset.view=s||"intro",window.scrollTo(0,0),Vt=a(Qt,e))}if(new URLSearchParams(location.search).has("reset")){$e();const t=new URL(location.href);t.searchParams.delete("reset"),location.replace(`${t.pathname}${t.search}#/`)}else Ue();function Ue(){Te(),n.guest&&Et(),ve(),window.addEventListener("hashchange",_t),_t()}
