import{a as N,e as f,b as O,c as L,s as M,D as T,t as b}from"./photos-6plI7D-q.js";const u=document.getElementById("admin"),z="nl:admin-pass";let v,E,m=sessionStorage.getItem(z)??"",d=null,c=location.hash.slice(1)||"quiz",i=[],q=!1;addEventListener("beforeunload",a=>{q&&a.preventDefault()});async function D(){if({admin:v,kind:E}=await N(),m||E==="local")return x();j()}function j(a=""){u.innerHTML=`<main class="a-login">
    <h1>後台</h1>
    <p>給昇翰和優用的。可以編輯遊戲題庫、看所有留言，和管理成績。</p>
    <form>
      <label for="pass">密碼</label>
      <input id="pass" type="password" autocomplete="current-password" aria-describedby="pass-note" required>
      <p id="pass-note" class="a-note">${a?f(a):"密碼在 Google 試算表「設定」分頁的 adminPass 那一列。"}</p>
      <button class="btn" type="submit">進入後台</button>
    </form>
  </main>`;const s=u.querySelector("form");s.addEventListener("submit",e=>{e.preventDefault(),m=s.querySelector("input").value.trim(),x()}),u.querySelector("input").focus()}async function x(){d||(u.innerHTML='<p class="a-loading">讀取中…</p>');try{d=await v.load(m),sessionStorage.setItem(z,m),q||(i=structuredClone(d.quiz)),h()}catch(a){sessionStorage.removeItem(z),d=null,j(a instanceof Error?a.message:"讀不到資料")}}function h(){const a=d,s=a.notes.filter(e=>e.private).length;u.innerHTML=`
    <header class="a-bar">
      <a class="mark" href="./">N&amp;L</a>
      <nav aria-label="後台選單">
        ${w("quiz",`題庫 <span>${i.length}</span>`)}
        ${w("notes",`留言 <span>${a.notes.length}</span>`)}
        ${w("results",`成績 <span>${a.results.length}</span>`)}
        ${w("settings","設定")}
      </nav>
      <p class="a-src">${E==="sheet"?"已連上 Google 試算表":"本機測試資料（尚未連上雲端）"}　<button type="button" class="a-link" data-reload>重新整理</button></p>
    </header>
    <main class="a-main" data-tab="${c}">
      ${c==="quiz"?A():c==="notes"?F(s):c==="results"?R():U()}
    </main>`,H()}const w=(a,s)=>`<a href="#${a}" data-tab-link="${a}" ${c===a?'aria-current="page"':""}>${s}</a>`;function A(){return`
    <div class="a-head">
      <div>
        <h1>題庫</h1>
        <p class="a-note">賓客看到的順序就是這裡的順序。每題 2 到 6 個選項，點選項左邊的圓圈設定正確答案。改完記得按「儲存題庫」。</p>
      </div>
      <div class="a-tools">
        <button class="btn quiet" type="button" data-export>匯出</button>
        <label class="btn quiet a-file">匯入<input type="file" accept="application/json" data-import hidden></label>
        <button class="btn quiet" type="button" data-reset-quiz>換回預設題庫</button>
      </div>
    </div>
    <ol class="qe-list">${i.map(P).join("")}</ol>
    <button class="a-add" type="button" data-add-q>＋ 新增一題</button>
    <div class="a-save">
      <p class="a-dirty" ${q?"":"hidden"}>有還沒儲存的修改</p>
      <button class="btn" type="button" data-save-quiz>儲存題庫</button>
    </div>`}function P(a,s){return`<li class="qe" data-i="${s}">
    <div class="qe-head">
      <h2>第 ${s+1} 題</h2>
      <div class="qe-move">
        <button type="button" data-up ${s===0?"disabled":""} aria-label="往上移">↑</button>
        <button type="button" data-down ${s===i.length-1?"disabled":""} aria-label="往下移">↓</button>
        <button type="button" data-del aria-label="刪除這一題">刪除</button>
      </div>
    </div>
    <label class="qe-field"><span>題目</span><textarea rows="2" data-f="q">${f(a.q)}</textarea></label>
    <fieldset class="qe-opts">
      <legend>選項</legend>
      ${a.options.map((e,n)=>`<div class="qe-opt ${a.answer===n?"is-answer":""}">
            <label class="qe-radio"><input type="radio" name="ans-${s}" value="${n}" ${a.answer===n?"checked":""}><span class="sr">設為正確答案</span></label>
            <input type="text" data-opt="${n}" value="${f(e)}" placeholder="選項 ${n+1}" aria-label="選項 ${n+1}">
            <button type="button" data-del-opt="${n}" ${a.options.length<=2?"disabled":""} aria-label="刪除選項 ${n+1}">移除</button>
          </div>`).join("")}
      ${a.options.length<6?'<button class="a-link" type="button" data-add-opt>＋ 新增選項</button>':""}
    </fieldset>
    <label class="qe-field"><span>作答後顯示的小故事（可以留空）</span><textarea rows="2" data-f="note">${f(a.note??"")}</textarea></label>
  </li>`}function S(){q=!0,u.querySelector(".a-dirty")?.removeAttribute("hidden")}function C(){for(let a=0;a<i.length;a++){const s=i[a];if(!s.q.trim())return`第 ${a+1} 題還沒有題目`;if(s.options.filter(n=>n.trim()).length<2)return`第 ${a+1} 題至少要兩個選項`;if(!(s.answer>=0&&s.answer<s.options.length)||!s.options[s.answer]?.trim())return`第 ${a+1} 題還沒選正確答案`}return i.length?null:"題庫是空的"}function I(a){const s=a.options.map((e,n)=>({o:e.trim(),k:n})).filter(e=>e.o);return{...a,q:a.q.trim(),note:a.note?.trim(),options:s.map(e=>e.o),answer:s.findIndex(e=>e.k===a.answer)}}let g="all",y="";function F(a){const s=d,e=s.notes.filter(t=>g==="private"?t.private:g==="public"?!t.private&&!t.hidden:g==="hidden"?t.hidden:!0).filter(t=>!y||t.text.includes(y)||t.name.includes(y)).sort((t,o)=>o.ts-t.ts),n=(t,o,r)=>`<button type="button" class="chip" data-filter="${t}" aria-pressed="${g===t}">${o} ${r}</button>`;return`
    <div class="a-head">
      <div>
        <h1>留言</h1>
        <p class="a-note">「悄悄話」在賓客的留言板上只顯示署名，內容只有你們在這裡看得到。不適合的留言按「隱藏」，賓客那邊會在半分鐘內消失。</p>
      </div>
      <div class="a-tools"><button class="btn quiet" type="button" data-csv>下載全部留言（CSV）</button></div>
    </div>
    <div class="a-filter">
      ${n("all","全部",s.notes.length)}
      ${n("private","悄悄話",a)}
      ${n("public","公開中",s.notes.filter(t=>!t.private&&!t.hidden).length)}
      ${n("hidden","已隱藏",s.notes.filter(t=>t.hidden).length)}
      <input type="search" placeholder="找內容或署名" value="${f(y)}" data-q aria-label="搜尋留言">
    </div>
    <ul class="an-list">
      ${e.length?e.map(t=>`<li class="an ${t.private?"is-private":""} ${t.hidden?"is-hidden":""}">
          <div class="an-meta"><strong>${f(t.name)}</strong><span>${O(t.ts)}</span>${t.private?'<span class="tag">悄悄話</span>':""}${t.hidden?'<span class="tag">已隱藏</span>':""}</div>
          <p class="an-text">${f(t.text)}</p>
          <button type="button" class="a-link" data-hide="${t.id}" data-hidden="${t.hidden}">${t.hidden?"取消隱藏":"隱藏"}</button>
        </li>`).join(""):'<li class="a-empty">沒有符合的留言。</li>'}
    </ul>`}function R(){const a=d;return`
    <div class="a-head">
      <div>
        <h1>成績</h1>
        <p class="a-note">依答對率排序，同分的先交卷的在前。排行榜只會顯示前 ${a.config.boardSize} 名${a.config.boardMinPct?`、答對率 ${a.config.boardMinPct}% 以上的人`:""}。按「讓他重玩」會刪掉那個人的成績。</p>
      </div>
    </div>
    ${a.results.length?`<table class="a-table">
      <thead><tr><th>名次</th><th>稱呼</th><th>答對</th><th>答對率</th><th>花了多久</th><th>交卷</th><th></th></tr></thead>
      <tbody>${a.results.map((s,e)=>`<tr class="${e<a.config.boardSize?"top":""}">
          <td>${e+1}</td><td>${f(s.name)}</td><td>${s.score} / ${s.total}</td><td>${s.pct}%</td>
          <td>${s.ms?`${Math.floor(s.ms/6e4)} 分 ${Math.round(s.ms%6e4/1e3)} 秒`:"—"}</td>
          <td>${O(s.ts)}</td>
          <td><button type="button" class="a-link" data-unplay="${f(s.gid)}" data-name="${f(s.name)}">讓他重玩</button></td>
        </tr>`).join("")}</tbody></table>`:'<p class="a-empty">還沒有人交卷。</p>'}`}function U(){const a=d,s=a.config,e=Object.entries(a.likes).sort((t,o)=>o[1]-t[1]).slice(0,12).filter(([t])=>L.has(t)),n=Object.values(a.likes).reduce((t,o)=>t+o,0);return`
    <div class="a-head"><div><h1>設定</h1></div></div>
    <form class="a-settings" data-settings>
      <label class="a-switch"><input type="checkbox" name="quizOpen" ${s.quizOpen?"checked":""}><span>開放遊戲作答</span></label>
      <label class="a-switch"><input type="checkbox" name="notesOpen" ${s.notesOpen?"checked":""}><span>開放留言板</span></label>
      <label class="a-num"><span>排行榜顯示前幾名</span><input type="number" name="boardSize" min="1" max="50" value="${s.boardSize}"></label>
      <label class="a-num"><span>答對率低於多少 % 不上排行榜</span><input type="number" name="boardMinPct" min="0" max="100" value="${s.boardMinPct}"></label>
      <button class="btn" type="submit">儲存設定</button>
    </form>

    <section class="a-stats">
      <h2>今天的數字</h2>
      <dl>
        <div><dt>進場的賓客</dt><dd>${a.guests.length}</dd></div>
        <div><dt>留言</dt><dd>${a.notes.length}</dd></div>
        <div><dt>交卷的人</dt><dd>${a.results.length}</dd></div>
        <div><dt>愛心</dt><dd>${n}</dd></div>
      </dl>
      <h2>大家最愛的照片</h2>
      ${e.length?`<ol class="a-top">${e.map(([t,o])=>`<li><img src="${M(t,640)}" alt="" loading="lazy" style="aspect-ratio:${L.get(t).w}/${L.get(t).h}"><span>${o} 顆愛心</span></li>`).join("")}</ol>`:'<p class="a-empty">還沒有人按愛心。</p>'}
    </section>`}function H(){u.querySelector("[data-reload]")?.addEventListener("click",()=>x()),u.querySelectorAll("[data-tab-link]").forEach(s=>s.addEventListener("click",e=>{e.preventDefault(),c=s.dataset.tabLink,history.replaceState(null,"",`#${c}`),h()}));const a=u.querySelector(".a-main");if(c==="quiz"&&(a.addEventListener("input",s=>{const e=s.target,n=e.closest(".qe");if(!n)return;const t=i[Number(n.dataset.i)];e.dataset.f==="q"?t.q=e.value:e.dataset.f==="note"?t.note=e.value:e.dataset.opt&&(t.options[Number(e.dataset.opt)]=e.value),S()}),a.addEventListener("change",s=>{const e=s.target,n=e.closest(".qe");!n||e.type!=="radio"||(i[Number(n.dataset.i)].answer=Number(e.value),n.querySelectorAll(".qe-opt").forEach((t,o)=>t.classList.toggle("is-answer",o===Number(e.value))),S())}),a.addEventListener("click",s=>{const e=s.target,n=e.closest(".qe"),t=n?Number(n.dataset.i):-1,o=()=>{S();const r=scrollY;h(),scrollTo(0,r)};if(e.closest("[data-up]")&&t>0)[i[t-1],i[t]]=[i[t],i[t-1]],o();else if(e.closest("[data-down]")&&t<i.length-1)[i[t+1],i[t]]=[i[t],i[t+1]],o();else if(e.closest("[data-del]"))confirm(`刪除第 ${t+1} 題「${i[t].q||"（沒有題目）"}」？`)&&(i.splice(t,1),o());else if(e.closest("[data-del-opt]")){const r=Number(e.closest("[data-del-opt]").dataset.delOpt),p=i[t];p.options.splice(r,1),p.answer===r?p.answer=-1:p.answer>r&&p.answer--,o()}else e.closest("[data-add-opt]")?(i[t].options.push(""),o(),u.querySelectorAll(`.qe[data-i="${t}"] [data-opt]`).item(i[t].options.length-1)?.focus()):e.closest("[data-add-q]")?(i.push({id:`q${Date.now().toString(36)}`,q:"",options:["","","",""],answer:-1,note:""}),o(),u.querySelectorAll(".qe:last-child textarea")[0]?.focus()):e.closest("[data-reset-quiz]")?confirm("把題庫換回預設的 12 題？目前的題目會被取代（按儲存之前都還可以重新整理放棄）。")&&(i=structuredClone(T),o()):e.closest("[data-export]")?k("題庫.json",JSON.stringify(i,null,2),"application/json"):e.closest("[data-save-quiz]")&&Q(e.closest("button"))}),a.querySelector("[data-import]")?.addEventListener("change",async s=>{const e=s.target.files?.[0];if(e)try{const n=JSON.parse(await e.text());if(!Array.isArray(n))throw 0;i=n.map((t,o)=>({id:String(t.id??`q${o+1}`),q:String(t.q??""),options:(t.options??[]).map(String),answer:Number(t.answer),note:String(t.note??"")})),S(),h(),b(`匯入了 ${i.length} 題，確認沒問題再按儲存。`)}catch{b("這個檔案看不懂，請用「匯出」下載的格式。")}})),c==="notes"){a.addEventListener("click",async e=>{const n=e.target,t=n.closest("[data-filter]");if(t){g=t.dataset.filter,h();return}const o=n.closest("[data-hide]");if(o){const r=o.dataset.hide,p=o.dataset.hidden!=="true";o.disabled=!0;try{await v.hideNote(m,r,p);const l=d.notes.find($=>$.id===r);l&&(l.hidden=p),b(p?"隱藏了。":"恢復顯示了。"),h()}catch(l){o.disabled=!1,b(l instanceof Error?l.message:"沒有成功")}}if(n.closest("[data-csv]")){const p=[["時間","署名","內容","悄悄話","隱藏"],...d.notes.sort((l,$)=>l.ts-$.ts).map(l=>[new Date(l.ts).toLocaleString("zh-TW"),l.name,l.text,l.private?"是":"",l.hidden?"是":""])].map(l=>l.map($=>`"${String($).replace(/"/g,'""')}"`).join(",")).join(`\r
`);k("留言.csv","\uFEFF"+p,"text/csv")}});const s=a.querySelector("[data-q]");s.addEventListener("input",()=>{y=s.value.trim();const e=s.selectionStart;h();const n=u.querySelector("[data-q]");n.focus(),n.setSelectionRange(e,e)})}c==="results"&&a.addEventListener("click",async s=>{const e=s.target.closest("[data-unplay]");if(e&&confirm(`刪除「${e.dataset.name}」的成績，讓他可以重新作答？`)){e.disabled=!0;try{await v.deleteResult(m,e.dataset.unplay),d.results=d.results.filter(n=>n.gid!==e.dataset.unplay),b("刪掉了。請他重新整理頁面就能再玩一次。"),h()}catch(n){e.disabled=!1,b(n instanceof Error?n.message:"沒有成功")}}}),c==="settings"&&a.querySelector("[data-settings]").addEventListener("submit",async s=>{s.preventDefault();const e=s.target,n=e.querySelector("button"),t=new FormData(e),o={quizOpen:t.has("quizOpen"),notesOpen:t.has("notesOpen"),boardSize:Number(t.get("boardSize"))||5,boardMinPct:Number(t.get("boardMinPct"))||0};n.disabled=!0;try{await v.saveConfig(m,o),d.config=o,b("設定存好了。賓客那邊半分鐘內會更新。")}catch(r){b(r instanceof Error?r.message:"沒有成功")}n.disabled=!1})}async function Q(a){i=i.map(I);const s=C();if(s){h(),b(s);return}a.disabled=!0,a.textContent="儲存中…";try{await v.saveQuiz(m,i),q=!1,d.quiz=structuredClone(i),b("題庫存好了。賓客重新打開遊戲就會看到新題目。"),h()}catch(e){b(e instanceof Error?e.message:"沒有成功"),a.disabled=!1,a.textContent="儲存題庫"}}function k(a,s,e){const n=document.createElement("a");n.href=URL.createObjectURL(new Blob([s],{type:e})),n.download=a,n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}addEventListener("hashchange",()=>{const a=location.hash.slice(1);a&&a!==c&&d&&(c=a,h())});D();
