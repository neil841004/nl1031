// 三個風格示範共用的一點點互動：按愛心冒愛心、選擇題揭曉答案。
function demo({ colors }) {
  const HEART = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
  const burst = (x, y) => {
    for (let i = 0; i < 20; i++) {
      const h = document.createElement("span");
      h.className = "burst";
      const s = 10 + Math.random() * 20;
      h.style.cssText = `left:${x - s / 2}px;top:${y - s / 2}px;width:${s}px;height:${s}px`;
      h.innerHTML = `<svg viewBox="0 0 24 24"><path fill="${colors[i % colors.length]}" d="${HEART}"/></svg>`;
      document.body.append(h);
      const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.2;
      const d = 60 + Math.random() * 140;
      h.animate(
        [
          { transform: "scale(.2)", opacity: 0 },
          { transform: `translate(${Math.cos(a) * d * 0.4}px,${Math.sin(a) * d * 0.4}px) scale(1.1)`, opacity: 1, offset: 0.25 },
          { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d - 60}px) scale(.8) rotate(${(Math.random() - 0.5) * 60}deg)`, opacity: 0 },
        ],
        { duration: 900 + Math.random() * 600, easing: "cubic-bezier(.22,1,.36,1)" },
      ).onfinish = () => h.remove();
    }
  };
  document.querySelectorAll("[data-like]").forEach((b) =>
    b.addEventListener("click", () => {
      const n = b.querySelector("span");
      const on = b.classList.toggle("on");
      n.textContent = Number(n.textContent) + (on ? 1 : -1);
      if (on) {
        const r = b.querySelector("svg").getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + r.height / 2);
      }
    }),
  );
  const opts = [...document.querySelectorAll(".opt")];
  opts.forEach((o) =>
    o.addEventListener("click", () => {
      if (opts.some((x) => x.classList.contains("right") || x.classList.contains("wrong"))) {
        opts.forEach((x) => x.classList.remove("right", "wrong"));
        return;
      }
      opts.forEach((x) => x.hasAttribute("data-right") && x.classList.add("right"));
      if (!o.hasAttribute("data-right")) o.classList.add("wrong");
    }),
  );
}
