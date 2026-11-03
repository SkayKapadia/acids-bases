/* =====================================================================
   Acids & Bases – interactive study guide (app logic)
   ===================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------ */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Chemistry notation: H2SO4 -> H₂SO₄, ^2- -> ²⁻, -> →, <=> ⇌
  function chem(s) {
    let t = s.replace(/<=>/g, "⇌").replace(/->/g, "→");
    t = t.replace(/([A-Za-z\)\]])(\d+)/g, "$1<sub>$2</sub>");
    t = t.replace(/\^(\d*)([+-])/g, (m, n, c) => "<sup>" + n + (c === "-" ? "−" : "+") + "</sup>");
    return '<span class="chem">' + t + "</span>";
  }
  const fmt = (html) => String(html).replace(/\$([^$]+)\$/g, (m, s) => chem(s));
  // Plain-text formulas in textbook questions (NH3, Ba(OH)2) -> subscripts
  const autoChem = (s) => String(s).replace(/(?<![\w])(?:(?:[A-Z][a-z]?|\((?:[A-Z][a-z]?\d*)+\))\d*)+/g, (m) => (/\d/.test(m) ? m.replace(/([A-Za-z\)])(\d+)/g, "$1<sub>$2</sub>") : m));

  // Chemistry inside SVG <text>: returns tspans
  function svgChem(s, fs = 16) {
    s = s.replace(/<=>/g, "⇌").replace(/->/g, "→");
    const segs = [];
    const re = /\^(\d*)([+-])|([A-Za-z\)\]])(\d+)/g;
    let last = 0, m;
    while ((m = re.exec(s))) {
      if (m[1] !== undefined || m[2] !== undefined) {
        segs.push(["n", s.slice(last, m.index)]);
        segs.push(["sup", (m[1] || "") + (m[2] === "-" ? "−" : "+")]);
      } else {
        segs.push(["n", s.slice(last, m.index) + m[3]]);
        segs.push(["sub", m[4]]);
      }
      last = re.lastIndex;
    }
    segs.push(["n", s.slice(last)]);
    let cur = 0, out = "";
    for (const [k, txt] of segs) {
      if (!txt) continue;
      const target = k === "sub" ? fs * 0.3 : k === "sup" ? -fs * 0.42 : 0;
      const dy = target - cur; cur = target;
      out += `<tspan dy="${dy.toFixed(1)}"${k !== "n" ? ' font-size="' + (fs * 0.7).toFixed(1) + '"' : ""}>${esc(txt)}</tspan>`;
    }
    return out;
  }

  /* ------------------------------------------------------------------
     Saved progress (browser only – per student device)
     ------------------------------------------------------------------ */
  const KEY = "acids-bases-ch11-v1";
  const S = (() => {
    let d = null;
    try { d = JSON.parse(localStorage.getItem(KEY)); } catch (e) { d = null; }
    return Object.assign({ name: "", done: {}, current: "L0", final: null, theme: "" }, d || {});
  })();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const TEACHER = /[?&]teacher=1/.test(location.search);

  const LESSONS = window.LESSONS;
  const ORDER = ["L0"].concat(LESSONS.map((l) => l.id));
  const lessonById = (id) => LESSONS.find((l) => l.id === id);
  const isDone = (id) => !!S.done[id];
  const isUnlocked = (id) => {
    if (TEACHER) return true;
    const i = ORDER.indexOf(id);
    return i <= 0 || isDone(ORDER[i - 1]);
  };
  const allLessonsDone = () => TEACHER || LESSONS.every((l) => isDone(l.id));
  const studentName = () => (S.name ? S.name.split(" ")[0] : "");

  /* ------------------------------------------------------------------
     Small UI bits
     ------------------------------------------------------------------ */
  function toast(msg) {
    const t = h(`<div class="toast" role="status">${msg}</div>`);
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2400);
  }
  function confetti() {
    const box = h('<div class="confetti" aria-hidden="true"></div>');
    const colours = ["#e5484d", "#2b7de9", "#1f9d6b", "#f5b400", "#8b4fd0", "#ff6fb1"];
    for (let i = 0; i < 90; i++) {
      const p = document.createElement("i");
      p.style.left = Math.random() * 100 + "vw";
      p.style.background = pick(colours);
      p.style.animationDelay = Math.random() * 0.8 + "s";
      p.style.animationDuration = 2 + Math.random() * 1.6 + "s";
      box.appendChild(p);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 4200);
  }
  function updateProgress() {
    const total = LESSONS.length + 1;
    const n = LESSONS.filter((l) => isDone(l.id)).length + (S.final ? 1 : 0);
    const pct = Math.round((n / total) * 100);
    const c = 2 * Math.PI * 15;
    $("#ringFill").setAttribute("stroke-dasharray", `${(c * pct) / 100} ${c}`);
    $("#ringText").textContent = pct + "%";
    $("#progressLabel").textContent = `${n} of ${total} complete`;
    const ft = $('[data-tab="final"] .lock');
    if (ft) ft.textContent = allLessonsDone() ? "" : "🔒";
  }

  /* ------------------------------------------------------------------
     Tabs
     ------------------------------------------------------------------ */
  function showTab(name) {
    $$(".tab").forEach((b) => b.setAttribute("aria-selected", b.dataset.tab === name ? "true" : "false"));
    $$(".view").forEach((v) => (v.hidden = v.id !== "view-" + name));
    if (name === "final") renderFinal();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ------------------------------------------------------------------
     LEARN: journey sidebar + lesson pages
     ------------------------------------------------------------------ */
  function renderJourney() {
    const nav = $("#journey");
    let html = "<h3>Your learning journey</h3>";
    ORDER.forEach((id, i) => {
      const L = id === "L0" ? { code: "Start", title: "Welcome & overview" } : lessonById(id);
      const done = isDone(id), unlocked = isUnlocked(id);
      const score = done && S.done[id].total ? `${S.done[id].best}/${S.done[id].total} on checkpoint` : "";
      html += `<button class="step ${done ? "done" : ""}" data-go="${id}" ${unlocked ? "" : "disabled"} aria-current="${S.current === id}">
        <span class="step-dot">${done ? "✓" : unlocked ? (i || "★") : "🔒"}</span>
        <span class="step-text"><span class="step-code">${L.code}</span><span class="step-title">${fmt(L.title)}</span>${score ? `<span class="step-score">${score}</span>` : ""}</span>
      </button>`;
    });
    const fu = allLessonsDone();
    html += `<button class="step ${S.final ? "done" : ""}" data-final="1" ${fu ? "" : "disabled"}>
      <span class="step-dot">${S.final ? "✓" : fu ? "🏁" : "🔒"}</span>
      <span class="step-text"><span class="step-code">Finish</span><span class="step-title">Final chapter test</span>${S.final ? `<span class="step-score">Best: ${S.final.best}%</span>` : ""}</span></button>`;
    nav.innerHTML = html;
    $$("[data-go]", nav).forEach((b) => b.addEventListener("click", () => goLesson(b.dataset.go)));
    const f = $("[data-final]", nav);
    if (f) f.addEventListener("click", () => showTab("final"));
  }

  function goLesson(id) {
    if (!isUnlocked(id)) return;
    S.current = id; save();
    renderJourney();
    renderLesson();
    showTab("learn");
  }

  function renderLesson() {
    const box = $("#lesson");
    if (S.current === "L0" || !lessonById(S.current)) return renderWelcome(box);
    const L = lessonById(S.current);
    const idx = LESSONS.indexOf(L);
    box.innerHTML = `
      <div class="lesson-head">
        <svg class="bubbles" width="220" height="220" viewBox="0 0 220 220" aria-hidden="true"><circle cx="150" cy="70" r="60" fill="#fff"/><circle cx="60" cy="150" r="30" fill="#fff"/><circle cx="170" cy="170" r="18" fill="#fff"/></svg>
        <span class="chip">${L.code} · Part ${idx + 1} of ${LESSONS.length}</span>
        <h1>${fmt(L.title)}</h1>
        <p>${fmt(L.blurb)}</p>
      </div>
      <div class="card"><div class="box-label" style="color:var(--primary)">📋 By the end of this part you can…</div><ul class="goals">${L.goals.map((g) => `<li>${fmt(g)}</li>`).join("")}</ul></div>
      ${fmt(L.html)}
      <div class="card quiz" id="quizCard">
        <div class="box-label" style="color:var(--primary)">✅ Checkpoint quiz · ${L.code}</div>
        <h2>Ready to test yourself?</h2>
        <p>${L.quiz.length} quick questions on this part. You'll get instant feedback and an explanation for each one. Finishing the quiz unlocks the next part.</p>
        <button class="btn" id="startQuiz">Start the checkpoint quiz →</button>
      </div>`;
    hydrate(box);
    $("#startQuiz").addEventListener("click", () => {
      runQuiz($("#quizCard"), L.quiz.map((q) => Object.assign({ tag: L.id }, q)), { mode: "lesson", lesson: L });
    });
    window.scrollTo({ top: 0 });
  }

  function renderWelcome(box) {
    const nm = studentName();
    box.innerHTML = `
      <div class="card">
        <div class="hero">
          <div>
            <span class="chip">Chapter 11 · Acids and bases</span>
            <h1 style="margin-top:10px">${nm ? `Welcome back, ${esc(nm)}! 👋` : "Let's master acids and bases 🧪"}</h1>
            <p>This guide walks you through the whole chapter <b>step by step</b> – exactly in the order of your textbook. Each part ends with a short checkpoint quiz, and when you've finished every part you'll unlock the <b>final chapter test</b>.</p>
            <div class="name-field">
              <input id="nameInput" type="text" placeholder="Your first name (optional)" value="${esc(S.name)}" aria-label="Your first name" maxlength="30">
              <button class="btn" id="beginBtn">${isDone("L0") ? "Continue learning →" : "Let's begin →"}</button>
            </div>
            <p class="muted" style="font-size:.9rem">Your progress is saved on this device automatically.</p>
          </div>
          <div data-widget="conceptMap"></div>
        </div>
        <div class="how">
          <div class="tile"><span>📖</span><h4>Learn</h4>Short explanations, visuals and step-by-step worked examples.</div>
          <div class="tile"><span>🧩</span><h4>Interact</h4>Sliders, simulators and mini-games to make ideas click.</div>
          <div class="tile"><span>✅</span><h4>Check</h4>A checkpoint quiz after every part unlocks the next one.</div>
          <div class="tile"><span>💬</span><h4>Ask</h4>Stuck? Type a question from the chapter into the chat helper.</div>
        </div>
      </div>
      <div class="card">
        <h2>What's in this chapter</h2>
        <div class="table-wrap"><table class="t">
          <tr><th>Section</th><th>Topic</th><th>Parts</th></tr>
          <tr><td>11A</td><td>Introduction to acids and bases</td><td>2</td></tr>
          <tr><td>11B</td><td>Strong and weak acids and bases</td><td>1</td></tr>
          <tr><td>11C</td><td>Calculating pH</td><td>3</td></tr>
          <tr><td>11D</td><td>Carbon dioxide as a weak acid</td><td>1</td></tr>
          <tr><td>11E</td><td>Neutralisation reactions</td><td>2</td></tr>
        </table></div>
      </div>`;
    hydrate(box);
    $("#beginBtn").addEventListener("click", () => {
      S.name = $("#nameInput").value.trim();
      if (!isDone("L0")) S.done.L0 = { intro: true };
      save(); updateProgress();
      const next = ORDER.find((id) => id !== "L0" && !isDone(id)) || "L1";
      goLesson(next);
    });
  }

  /* hydrate: fill placeholders for widgets, worked examples and check-ins */
  function hydrate(root) {
    $$("[data-wx]", root).forEach((el) => renderWX(el, window.WX[el.dataset.wx]));
    $$("[data-checkin]", root).forEach((el) => renderCheckin(el, el.dataset.checkin));
    $$("[data-widget]", root).forEach((el) => {
      const fn = WIDGETS[el.dataset.widget];
      if (fn) { el.classList.add("widget"); try { fn(el); } catch (e) { console.error(el.dataset.widget, e); } }
    });
    $$("[data-venn]", root).forEach((el) => WIDGETS.venn(el));
  }

  function renderWX(el, wx) {
    if (!wx) return;
    el.classList.add("wx");
    el.innerHTML = `<div class="wx-head">📝 ${wx.title}</div>
      <div class="wx-body"><p>${fmt(wx.problem)}</p>
      ${wx.steps.map((s, i) => `<div class="wx-step" ${i ? "hidden" : ""}><div class="wx-n">Step ${i + 1}</div><div>${fmt(s[0])}</div><div class="wx-work">${fmt(s[1])}</div></div>`).join("")}
      <div class="wx-controls"><button class="btn small" data-a="next">Show next step ▸</button><button class="btn small ghost" data-a="all">Show all</button></div></div>`;
    const steps = $$(".wx-step", el);
    const next = $('[data-a="next"]', el);
    const upd = () => { const left = steps.filter((s) => s.hidden).length; next.disabled = !left; next.textContent = left ? `Show next step ▸ (${left} left)` : "All steps shown ✓"; };
    next.addEventListener("click", () => { const s = steps.find((x) => x.hidden); if (s) s.hidden = false; upd(); });
    $('[data-a="all"]', el).addEventListener("click", () => { steps.forEach((s) => (s.hidden = false)); upd(); });
    upd();
  }

  function renderCheckin(el, id) {
    const set = window.QA.find((s) => s.id === id);
    if (!set) return;
    el.classList.add("checkin");
    const isSection = /-Q$/.test(id);
    el.innerHTML = `<div class="checkin-head" style="${isSection ? "background:#0b6bb8" : ""}"><span>${isSection ? "📚" : "✋"} ${set.title}</span><span style="font-size:.8rem;opacity:.85">Try first, then reveal</span></div>
      <div class="checkin-body">${set.items.map((it) => `
        <div class="qa-item"><div class="qa-q"><span class="qa-num">${it.n}</span><div>${autoChem(fmt(esc(it.q)))}</div></div>
        <div class="reveal"><button class="btn small ghost">Show answer</button></div>
        <div class="qa-ans" hidden>${fmt(it.a)}</div></div>`).join("")}</div>`;
    $$(".qa-item", el).forEach((item) => {
      const b = $("button", item), a = $(".qa-ans", item);
      b.addEventListener("click", () => { a.hidden = !a.hidden; b.textContent = a.hidden ? "Show answer" : "Hide answer"; if (!a.hidden) hydrate(a); });
    });
  }

  /* ------------------------------------------------------------------
     QUIZ ENGINE (lesson checkpoints + final test)
     ------------------------------------------------------------------ */
  function prepQuestion(q) {
    if (q.t !== "mc") return Object.assign({}, q);
    const order = shuffle(q.o.map((_, i) => i));
    return Object.assign({}, q, { o: order.map((i) => q.o[i]), a: order.indexOf(q.a) });
  }
  function parseNum(s) {
    s = String(s).trim().replace(/,/g, "").replace(/−/g, "-").replace(/×/g, "x");
    const sci = s.match(/^(-?\d*\.?\d+)\s*(?:x|\*)\s*10\s*\^?\s*(-?\d+)/i);
    if (sci) return parseFloat(sci[1]) * Math.pow(10, parseInt(sci[2], 10));
    const v = parseFloat(s);
    return isNaN(v) ? null : v;
  }
  function checkNum(q, val) {
    const v = parseNum(val);
    if (v === null) return false;
    return Math.abs(v - q.a) <= (q.tol || 0) + 1e-9;
  }

  function runQuiz(container, questions, opts) {
    const qs = questions.map(prepQuestion);
    const answers = [];
    let i = 0;
    const lesson = opts.mode === "lesson";

    function show() {
      const q = qs[i];
      container.innerHTML = `
        <div class="box-label" style="color:var(--primary)">${lesson ? "✅ Checkpoint quiz · " + opts.lesson.code : "🏁 Final chapter test"}</div>
        <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--ink-3);font-size:.9rem"><span>Question ${i + 1} of ${qs.length}</span><span>${lesson ? answers.filter((a) => a.ok).length + " correct so far" : ""}</span></div>
        <div class="quiz-progress"><span style="width:${(i / qs.length) * 100}%"></span></div>
        <h3 style="font-weight:600">${fmt(q.q)}</h3>
        <div id="qArea"></div>
        <div id="qFeedback"></div>
        <div class="controls" style="margin-top:14px" id="qNav"></div>`;
      const area = $("#qArea", container), nav = $("#qNav", container), fb = $("#qFeedback", container);
      let chosen = null;

      const finishQ = (ok, given) => {
        answers[i] = { q, ok, given };
        if (lesson) {
          fb.innerHTML = `<div class="why"><b style="color:${ok ? "var(--good)" : "var(--warn)"}">${ok ? pick(["✅ Correct!", "✅ Spot on!", "✅ Nailed it!", "✅ Yes!"]) : "💡 Not quite – here's the key idea:"}</b><br>${fmt(q.why)}${!ok && q.t === "num" ? `<br><b>Answer:</b> ${q.a}${q.unit ? " " + q.unit : ""}` : ""}</div>`;
        }
        nav.innerHTML = `<button class="btn" id="qNext">${i + 1 < qs.length ? "Next question →" : "See my results →"}</button>`;
        $("#qNext", container).addEventListener("click", () => { i++; i < qs.length ? show() : results(); });
        $("#qNext", container).focus();
      };

      if (q.t === "mc") {
        area.innerHTML = q.o.map((o, k) => `<button class="opt" data-k="${k}"><b>${"ABCD"[k]}.</b> ${fmt(o)}</button>`).join("");
        $$(".opt", area).forEach((b) => b.addEventListener("click", () => {
          const k = +b.dataset.k;
          if (lesson) {
            $$(".opt", area).forEach((x) => (x.disabled = true));
            b.classList.add(k === q.a ? "correct" : "wrong");
            $$(".opt", area)[q.a].classList.add("correct");
            finishQ(k === q.a, k);
          } else {
            chosen = k;
            $$(".opt", area).forEach((x) => x.classList.toggle("correct", x === b));
            finishQ(k === q.a, k);
          }
        }));
      } else {
        area.innerHTML = `<div class="field"><input type="text" inputmode="decimal" id="numIn" placeholder="Type your answer" aria-label="Your answer" style="max-width:220px">${q.unit ? `<span class="muted">${q.unit}</span>` : ""}<button class="btn" id="numCheck">${lesson ? "Check" : "Save answer"}</button></div>
          <p class="muted" style="font-size:.85rem;margin-top:6px">Use a calculator. Round sensibly (e.g. 2 decimal places for pH).</p>`;
        const inp = $("#numIn", area);
        const go = () => {
          if (!inp.value.trim()) { inp.focus(); return; }
          const ok = checkNum(q, inp.value);
          if (lesson) { inp.disabled = true; $("#numCheck", area).disabled = true; inp.style.borderColor = ok ? "var(--good)" : "var(--warn)"; }
          finishQ(ok, inp.value);
        };
        $("#numCheck", area).addEventListener("click", go);
        inp.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
        inp.focus();
      }
    }

    function results() {
      const score = answers.filter((a) => a.ok).length;
      opts.onDone ? opts.onDone(answers, score) : lessonResults(container, answers, score, opts.lesson, () => runQuiz(container, questions, opts));
    }
    show();
    container.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function encouragement(pct) {
    if (pct >= 85) return ["🏆", "Outstanding", "You really know this. Keep that confidence for the test!"];
    if (pct >= 65) return ["🚀", "Great work", "You've got the big ideas. A quick look at the explanations below will lock in the rest."];
    if (pct >= 45) return ["🌱", "Good progress", "You're building solid foundations. Re-read the tricky bits below and try again – you'll see your score jump."];
    return ["💪", "Great effort", "Every attempt builds your brain – this is exactly how learning works. Read through the explanations, revisit the worked examples, then have another go."];
  }

  function lessonResults(container, answers, score, L, retry) {
    const total = answers.length, pct = Math.round((score / total) * 100);
    const prev = S.done[L.id];
    const firstTime = !prev;
    S.done[L.id] = { score, total, best: Math.max(score, prev ? prev.best || 0 : 0) };
    save(); renderJourney(); updateProgress();
    const [ico, title, msg] = encouragement(pct);
    const stars = pct >= 85 ? 3 : pct >= 60 ? 2 : 1;
    const nextIdx = ORDER.indexOf(L.id) + 1;
    const nextId = ORDER[nextIdx];
    const missed = answers.filter((a) => !a.ok);
    container.innerHTML = `
      <div class="result-hero">
        <div style="font-size:3rem">${ico}</div>
        <div class="stars" aria-label="${stars} stars">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
        <div class="big">${score} / ${total}</div>
        <h2>${title}${studentName() ? ", " + esc(studentName()) : ""}!</h2>
        <p>${msg}</p>
      </div>
      ${missed.length ? `<h3>Let's review ${missed.length === 1 ? "this one" : "these " + missed.length}</h3>${missed.map((a) => `<div class="review-item"><b>${fmt(a.q.q)}</b><div class="why">✔ ${a.q.t === "mc" ? fmt(a.q.o[a.q.a]) : a.q.a + (a.q.unit ? " " + a.q.unit : "")}<br>${fmt(a.q.why)}</div></div>`).join("")}` : `<p style="text-align:center"><b>Perfect score – nothing to review! 🎉</b></p>`}
      <div class="controls" style="justify-content:center;margin-top:16px">
        <button class="btn ${pct < 50 ? "" : "ghost"}" id="retry">↻ Try the quiz again</button>
        ${nextId ? `<button class="btn ${pct < 50 ? "ghost" : "good"}" id="nextLesson">Continue to ${lessonById(nextId).code} →</button>` : `<button class="btn good" id="toFinal">Go to the final test 🏁</button>`}
      </div>`;
    if (pct >= 85) confetti();
    if (firstTime) toast(nextId ? "🔓 Next part unlocked!" : "🔓 Final test unlocked!");
    $("#retry", container).addEventListener("click", retry);
    const n = $("#nextLesson", container);
    if (n) n.addEventListener("click", () => goLesson(nextId));
    const f = $("#toFinal", container);
    if (f) f.addEventListener("click", () => showTab("final"));
  }

  /* ------------------------------------------------------------------
     FINAL TEST
     ------------------------------------------------------------------ */
  function buildFinal() {
    const qs = [];
    LESSONS.forEach((L) => {
      const extras = shuffle(window.FINAL_EXTRA.filter((q) => q.tag === L.id));
      const quiz = shuffle(L.quiz.map((q) => Object.assign({ tag: L.id }, q)));
      const want = L.id === "L5" ? 5 : 3;
      const take = extras.slice(0, L.id === "L5" ? 4 : 2);
      qs.push(...take, ...quiz.slice(0, want - take.length));
    });
    return qs;
  }

  function renderFinal() {
    const box = $("#finalBox");
    if (!allLessonsDone()) {
      const left = LESSONS.filter((l) => !isDone(l.id));
      box.innerHTML = `<div class="card final-locked"><div class="big-ico">🔒</div><h2>The final test unlocks when you finish learning</h2>
        <p>Complete every part's checkpoint quiz first. You have <b>${left.length}</b> part${left.length === 1 ? "" : "s"} to go – you've got this!</p>
        <div class="controls" style="justify-content:center">${left.slice(0, 3).map((l) => `<span class="chip">${l.code}: ${fmt(l.title)}</span>`).join(" ")}</div>
        <button class="btn" id="backLearn" style="margin-top:14px">Back to learning →</button></div>`;
      $("#backLearn").addEventListener("click", () => { goLesson(ORDER.find((id) => !isDone(id) && isUnlocked(id)) || "L1"); });
      return;
    }
    box.innerHTML = `<div class="card quiz" id="finalCard">
      <div class="box-label" style="color:var(--primary)">🏁 Final chapter test · Chapter 11</div>
      <h2>${studentName() ? esc(studentName()) + ", you" : "You"}'ve finished every part – time to show what you know!</h2>
      <p>This test mixes questions from <b>all of Chapter 11</b> (11A–11E), including the textbook's own questions. It's like a practice school test:</p>
      <ul><li>About 29 questions – multiple choice and calculations</li><li>No feedback until the end (just like a real test)</li><li>Have a calculator ready 🧮</li><li>You'll get a full breakdown by topic, plus explanations for every question</li></ul>
      ${S.final ? `<p class="chip">Your best so far: ${S.final.best}%</p>` : ""}
      <div class="controls"><button class="btn" id="startFinal">Start the final test →</button></div></div>`;
    $("#startFinal").addEventListener("click", () => {
      const card = $("#finalCard");
      runQuiz(card, buildFinal(), { mode: "final", onDone: (answers, score) => finalResults(card, answers, score) });
    });
  }

  function finalResults(card, answers, score) {
    const total = answers.length, pct = Math.round((score / total) * 100);
    S.final = { last: pct, best: Math.max(pct, S.final ? S.final.best : 0), date: new Date().toISOString().slice(0, 10) };
    save(); updateProgress(); renderJourney();
    const label = pct >= 85 ? ["🏆", "Exam ready!", "Brilliant work – you have a strong command of acids and bases. Keep it fresh with a quick review before your test."]
      : pct >= 65 ? ["🚀", "Nearly there!", "You understand most of this chapter. Polish the topics below and you'll be in great shape."]
      : pct >= 45 ? ["🌱", "Building strong foundations!", "You've learned a lot already. Focus on the topics marked below – a little targeted practice goes a long way."]
      : ["💪", "Great start – keep going!", "Tests like this show us exactly what to practise next. Revisit the topics below, then try again – your score will grow."];
    const byTag = {};
    answers.forEach((a) => { const t = a.q.tag; byTag[t] = byTag[t] || { c: 0, n: 0 }; byTag[t].n++; if (a.ok) byTag[t].c++; });
    const rows = LESSONS.map((L) => ({ L, ...byTag[L.id] })).filter((r) => r.n);
    const strong = rows.filter((r) => r.c / r.n >= 0.75);
    const polish = rows.filter((r) => r.c / r.n < 0.75);
    card.innerHTML = `
      <div class="result-hero"><div style="font-size:3.2rem">${label[0]}</div>
        <div class="big">${pct}%</div><p class="muted" style="margin:0">${score} of ${total} correct${S.final.best > pct ? ` · best ${S.final.best}%` : ""}</p>
        <h2 style="margin-top:8px">${label[1]}${studentName() ? " Well done, " + esc(studentName()) + "." : ""}</h2><p>${label[2]}</p></div>
      ${strong.length ? `<div class="tile" style="background:var(--good-soft)"><b>🌟 Your strongest topics:</b> ${strong.map((r) => fmt(r.L.title)).join(" · ")}</div>` : ""}
      ${polish.length ? `<div class="tile" style="background:var(--warn-soft);margin-top:10px"><b>🎯 Topics to polish next:</b> ${polish.map((r) => fmt(r.L.title)).join(" · ")}</div>` : ""}
      <h3 style="margin-top:18px">Topic breakdown</h3>
      <div class="topic-bars">${rows.map((r) => `<div class="topic-bar"><span>${r.L.code}</span><div class="track"><div class="fill" style="width:${(r.c / r.n) * 100}%;background:${r.c / r.n >= 0.75 ? "var(--good)" : r.c / r.n >= 0.5 ? "var(--primary-2)" : "var(--warn)"}"></div></div><span><b>${r.c}/${r.n}</b></span></div>`).join("")}</div>
      <div class="controls" style="justify-content:center"><button class="btn" id="again">↻ Take a new test</button><button class="btn ghost" id="showReview">📖 Review every question</button></div>
      <div id="reviewBox" hidden></div>`;
    confetti();
    $("#again", card).addEventListener("click", () => renderFinal());
    $("#showReview", card).addEventListener("click", () => {
      const rb = $("#reviewBox", card); rb.hidden = !rb.hidden;
      rb.innerHTML = `<h3 style="margin-top:16px">Question review</h3>` + answers.map((a, k) => {
        const yours = a.q.t === "mc" ? fmt(a.q.o[a.given]) : esc(a.given);
        const right = a.q.t === "mc" ? fmt(a.q.o[a.q.a]) : a.q.a + (a.q.unit ? " " + a.q.unit : "");
        return `<div class="review-item"><b>${k + 1}. ${fmt(a.q.q)}</b><br>
          <span style="color:${a.ok ? "var(--good)" : "var(--warn)"};font-weight:700">${a.ok ? "✅ You answered: " : "💡 You answered: "}</span>${yours}
          ${a.ok ? "" : `<br><b>Correct answer:</b> ${right}`}
          <div class="why">${fmt(a.q.why)} <button class="btn small ghost" data-revisit="${a.q.tag}" style="margin-left:6px">Revisit ${lessonById(a.q.tag).code}</button></div></div>`;
      }).join("");
      $$("[data-revisit]", rb).forEach((b) => b.addEventListener("click", () => goLesson(b.dataset.revisit)));
    });
    card.scrollIntoView({ behavior: "smooth" });
  }

  /* ------------------------------------------------------------------
     Q&A tab + Glossary tab
     ------------------------------------------------------------------ */
  function renderQA() {
    const sections = ["All", "11A", "11B", "11C", "11D", "11E", "Review"];
    let filter = "All", term = "";
    const view = $("#view-qa");
    view.innerHTML = `<div class="card"><h2>📚 Questions & Answers</h2><p>Every question from the chapter – check-ins, section questions and the chapter review – with fully worked answers. Try each one yourself <b>before</b> revealing the answer.</p>
      <div class="toolbar"><input class="search" id="qaSearch" type="search" placeholder="Search questions… e.g. pH, conjugate, H2SO4" aria-label="Search questions">
      <div class="filter-chips">${sections.map((s) => `<button data-f="${s}" aria-pressed="${s === "All"}">${s}</button>`).join("")}</div>
      <button class="btn small ghost" id="qaExpand">Show all answers</button></div></div><div id="qaList"></div>`;
    const list = $("#qaList", view);
    const norm = (s) => s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[₀-₉]/g, (c) => String(c.charCodeAt(0) - 8320));
    const draw = () => {
      const t = norm(term.trim());
      list.innerHTML = window.QA.filter((s) => filter === "All" || s.section === filter).map((set) => {
        const items = set.items.filter((it) => !t || norm(it.q + " " + it.a).includes(t));
        if (!items.length) return "";
        return `<div class="card qa-group" data-set="${set.id}"><h3>${set.title}</h3>${items.map((it) => `<div class="qa-item"><div class="qa-q"><span class="qa-num">${it.n}</span><div>${autoChem(fmt(esc(it.q)))}</div></div><div class="reveal"><button class="btn small ghost">Show answer</button></div><div class="qa-ans" hidden>${fmt(it.a)}</div></div>`).join("")}</div>`;
      }).join("") || `<div class="card"><p>No questions match "<b>${esc(term)}</b>". Try another word, or ask the chat helper 💬.</p></div>`;
      $$(".qa-item", list).forEach((item) => {
        const b = $("button", item), a = $(".qa-ans", item);
        b.addEventListener("click", () => { a.hidden = !a.hidden; b.textContent = a.hidden ? "Show answer" : "Hide answer"; if (!a.hidden) hydrate(a); });
      });
    };
    $("#qaSearch", view).addEventListener("input", (e) => { term = e.target.value; draw(); });
    $$("[data-f]", view).forEach((b) => b.addEventListener("click", () => { filter = b.dataset.f; $$("[data-f]", view).forEach((x) => x.setAttribute("aria-pressed", x === b)); draw(); }));
    $("#qaExpand", view).addEventListener("click", (e) => {
      const open = e.target.textContent.startsWith("Show");
      $$(".qa-item", list).forEach((item) => { $(".qa-ans", item).hidden = !open; $("button", item).textContent = open ? "Hide answer" : "Show answer"; if (open) hydrate($(".qa-ans", item)); });
      e.target.textContent = open ? "Hide all answers" : "Show all answers";
    });
    draw();
  }

  function renderGlossary() {
    const view = $("#view-glossary");
    view.innerHTML = `<div class="card"><h2>📖 Glossary</h2><p>All the key terms from Chapter 11. Know these definitions well – they're often worth easy marks!</p>
      <div class="toolbar"><input class="search" id="gSearch" type="search" placeholder="Search terms…" aria-label="Search glossary"></div></div><div class="gloss" id="gList"></div>`;
    const draw = (t = "") => {
      t = t.toLowerCase();
      $("#gList").innerHTML = window.GLOSSARY.filter((g) => !t || (g[0] + g[2]).toLowerCase().includes(t))
        .map((g) => `<div class="tile"><b>${g[0]}</b><div>${g[2]}</div><small>Section ${g[1]}</small></div>`).join("");
    };
    $("#gSearch").addEventListener("input", (e) => draw(e.target.value));
    draw();
  }

  /* ------------------------------------------------------------------
     CHAT HELPER – answers questions from the chapter only.
     Matches the student's question against the chapter's questions,
     glossary and key concepts. Also solves simple strong acid/base
     pH questions step by step.
     ------------------------------------------------------------------ */
  const CONCEPTS = [
    ["what is an acid brønsted lowry acid define acid proton donor", "What is an acid?", "A <b>Brønsted–Lowry acid</b> is a <b>proton (H<sup>+</sup>) donor</b>. In water at 25 °C an acid has a pH less than 7. e.g. $HCl + H2O -> Cl^- + H3O^+$", "11A"],
    ["what is a base brønsted lowry base define base proton acceptor alkaline", "What is a base?", "A <b>Brønsted–Lowry base</b> is a <b>proton (H<sup>+</sup>) acceptor</b>. In water at 25 °C it has a pH between 8 and 14. e.g. NH<sub>3</sub> accepts H<sup>+</sup> to form NH<sub>4</sub><sup>+</sup>. A water-soluble base is called <b>alkaline</b>.", "11A"],
    ["who brønsted lowry scientists 1923 theory johannes thomas", "Who were Brønsted and Lowry?", "Johannes Brønsted and Thomas Lowry independently developed the idea (in 1923) that acids are proton donors and bases are proton acceptors – acid–base reactions involve the <b>transfer of protons (H<sup>+</sup>)</b>.", "11A"],
    ["conjugate acid base pair pairs what how find identify", "What is a conjugate acid–base pair?", "A reactant–product pair that differs by <b>one H<sup>+</sup> ion</b>. Acid − H<sup>+</sup> → conjugate base; base + H<sup>+</sup> → conjugate acid. e.g. in $HNO3 + H2O -> NO3^- + H3O^+$ the pairs are $HNO3/NO3^-$ and $H3O^+/H2O$. Write the acid first.", "11A"],
    ["amphiprotic meaning define water hco3 example", "What does amphiprotic mean?", "An <b>amphiprotic</b> substance can either <b>donate or accept</b> a proton. Water is the best example: with NH<sub>3</sub> it acts as an acid ($H2O + NH3 <=> OH^- + NH4^+$); with HCl it acts as a base ($H2O + HCl <=> H3O^+ + Cl^-$). HCO<sub>3</sub><sup>−</sup>, H<sub>2</sub>PO<sub>4</sub><sup>−</sup> and HPO<sub>4</sub><sup>2−</sup> are also amphiprotic.", "11A"],
    ["polyprotic monoprotic diprotic triprotic meaning define difference", "What are monoprotic, diprotic and triprotic acids?", "<b>Polyprotic</b> substances can donate (or accept) more than one H<sup>+</sup>.<br><b>Monoprotic</b> – one H<sup>+</sup> (HCl, CH<sub>3</sub>COOH)<br><b>Diprotic</b> – two H<sup>+</sup>, in two steps (H<sub>2</sub>SO<sub>4</sub>)<br><b>Triprotic</b> – three H<sup>+</sup>, in three steps (H<sub>3</sub>PO<sub>4</sub>). PO<sub>4</sub><sup>3−</sup> is a polyprotic base (accepts up to three H<sup>+</sup>).", "11A"],
    ["charge change lose gain h+ ion skills determining correct charge", "How does the charge change when H⁺ is lost or gained?", "Each time a substance <b>loses</b> an H<sup>+</sup>, its charge <b>decreases by 1</b> (H<sub>2</sub>O → OH<sup>−</sup>; HPO<sub>4</sub><sup>2−</sup> → PO<sub>4</sub><sup>3−</sup>). Each time it <b>gains</b> an H<sup>+</sup>, its charge <b>increases by 1</b> (H<sub>2</sub>O → H<sub>3</sub>O<sup>+</sup>; HPO<sub>4</sub><sup>2−</sup> → H<sub>2</sub>PO<sub>4</sub><sup>−</sup>).", "11A"],
    ["strong weak acid difference ionise ionisation completely partially", "What is the difference between strong and weak acids?", "<b>Strong</b> acids ionise <b>completely</b> – every molecule donates its H<sup>+</sup>; only products remain; use →.<br><b>Weak</b> acids ionise <b>partially</b> – reactants and products are both present; use ⇌.<br>Strong acids: HCl, HBr, HI, HNO<sub>3</sub>, HClO<sub>4</sub>, H<sub>2</sub>SO<sub>4</sub>. Weak acids: CH<sub>3</sub>COOH, HCOOH, H<sub>2</sub>CO<sub>3</sub>, H<sub>3</sub>PO<sub>4</sub>.", "11B"],
    ["strong weak base examples list naoh koh nh3 ammonia", "What are strong and weak bases?", "<b>Strong bases</b> fully ionise – every base particle accepts an H<sup>+</sup>: NaOH, KOH, Ca(OH)<sub>2</sub>, Ba(OH)<sub>2</sub>.<br><b>Weak bases</b> partially ionise: ammonia NH<sub>3</sub>, sodium bicarbonate NaHCO<sub>3</sub>. e.g. $NH3(aq) + H2O(l) <=> NH4^+(aq) + OH^-(aq)$", "11B"],
    ["concentrated dilute difference concentration c n v formula", "What is the difference between concentrated and dilute?", "<b>Concentrated</b> = lots of solute in a given volume; <b>dilute</b> = a small amount of solute in a given volume. Concentration c = n ÷ V (mol L<sup>−1</sup> or M). e.g. 1 mol HCl in 250 mL → 4.0 M (concentrated); 0.1 mol in 250 mL → 0.4 M (dilute).", "11B"],
    ["strength versus concentration strong concentrated confuse ratio many none few", "How do I tell strength from concentration?", "<b>Strength</b> = how much it ionises → ratio <i>ions : reactant molecules</i>. many : none = strong; few : many = weak.<br><b>Concentration</b> = ratio <i>solute : water</i>. many : few = concentrated; few : many = dilute.<br>A strong acid can be dilute, and a weak acid can be concentrated.", "11B"],
    ["arrow reversible full equilibrium when use", "When do I use → or ⇌?", "Use a <b>full arrow →</b> for <b>strong</b> acids/bases (only products present). Use <b>reversible arrows ⇌</b> for <b>weak</b> acids/bases (reactants and products present).", "11B"],
    ["magic acid superacid fluoroantimonic teflon", "What is magic acid?", "A superacid: a 1 : 1 mixture of fluorosulfuric acid (HSO<sub>3</sub>F) and antimony pentafluoride (SbF<sub>5</sub>), with a pH around −23 – about 100 billion times stronger than 100% sulfuric acid (pH ≈ −12). Fluoroantimonic acid is even stronger (≈ −28). Superacids are stored in Teflon containers.", "11B"],
    ["ph scale range 0 14 neutral 7 acidic alkaline", "What is the pH scale?", "The pH scale measures how acidic or basic a water solution is. It usually runs from <b>0 (highly acidic)</b> to <b>7 (neutral)</b> to <b>14 (highly alkaline)</b> at 25 °C. Each 1 pH unit is a 10× change in [H<sub>3</sub>O<sup>+</sup>].", "11C"],
    ["what is ph define formula log calculate potential hydrogen", "What is pH and how is it calculated?", "pH ('potential of hydrogen') measures hydronium ion concentration: <b>pH = −log<sub>10</sub>[H<sub>3</sub>O<sup>+</sup>]</b>. It has no units. Use log<sub>10</sub>, not ln, on your calculator. Reverse: [H<sub>3</sub>O<sup>+</sup>] = 10<sup>−pH</sup>.", "11C"],
    ["poh what is define formula ph poh 14", "What is pOH?", "pOH measures hydroxide ion concentration: <b>pOH = −log<sub>10</sub>[OH<sup>−</sup>]</b>. At 25 °C, <b>pH + pOH = 14</b>, so for bases: find [OH<sup>−</sup>] → pOH → pH = 14 − pOH.", "11C"],
    ["kw ionic product water self ionisation 10 14 constant", "What is K<sub>w</sub>?", "The <b>ionic product of water</b>: water self-ionises ($H2O + H2O <=> H3O^+ + OH^-$), and <b>K<sub>w</sub> = [H<sub>3</sub>O<sup>+</sup>][OH<sup>−</sup>] = 1.00 × 10<sup>−14</sup> M<sup>2</sup> at 25 °C</b>. Use it to find one ion concentration from the other: [OH<sup>−</sup>] = 10<sup>−14</sup> ÷ [H<sub>3</sub>O<sup>+</sup>].", "11C"],
    ["neutral acidic basic solution h3o oh concentration 10 7 compare", "How do [H₃O⁺] and [OH⁻] compare in acidic, neutral and basic solutions?", "Neutral: [H<sub>3</sub>O<sup>+</sup>] = [OH<sup>−</sup>] = 10<sup>−7</sup> M.<br>Acidic: [H<sub>3</sub>O<sup>+</sup>] &gt; 10<sup>−7</sup> M &gt; [OH<sup>−</sup>].<br>Basic: [H<sub>3</sub>O<sup>+</sup>] &lt; 10<sup>−7</sup> M &lt; [OH<sup>−</sup>].<br>The product is always 10<sup>−14</sup> M<sup>2</sup> at 25 °C.", "11C"],
    ["how calculate ph strong base steps method", "How do I calculate the pH of a strong base?", "1. [OH<sup>−</sup>] = [base] × number of OH<sup>−</sup> (e.g. ×2 for Ba(OH)<sub>2</sub>).<br>2. pOH = −log[OH<sup>−</sup>].<br>3. pH = 14 − pOH.<br>(Or: [H<sub>3</sub>O<sup>+</sup>] = 10<sup>−14</sup> ÷ [OH<sup>−</sup>], then pH = −log[H<sub>3</sub>O<sup>+</sup>].)", "11C"],
    ["how calculate ph strong acid steps method diprotic polyprotic", "How do I calculate the pH of a strong acid?", "1. Strong acid → [H<sub>3</sub>O<sup>+</sup>] = [acid] × number of H<sup>+</sup> donated (×2 for H<sub>2</sub>SO<sub>4</sub>).<br>2. pH = −log<sub>10</sub>[H<sub>3</sub>O<sup>+</sup>].<br>This only works for strong acids/bases, because they fully ionise.", "11C"],
    ["dilution dilute c1v1 c2v2 formula water added ph after", "How do I calculate pH after a dilution?", "Use <b>c<sub>1</sub>V<sub>1</sub> = c<sub>2</sub>V<sub>2</sub></b> (same units both sides). If you're given pH, first find c<sub>1</sub> = 10<sup>−pH</sup>. V<sub>2</sub> is the <b>total</b> final volume (original + water added). Then pH = −log c<sub>2</sub>. A 10× dilution of a strong acid raises the pH by 1.", "11C"],
    ["index laws indices multiply divide power zero", "What index laws do I need?", "Rule 1 – multiplying: add powers (10<sup>−8</sup> × 10<sup>−6</sup> = 10<sup>−14</sup>).<br>Rule 2 – dividing: subtract powers (10<sup>−14</sup> ÷ 10<sup>−6</sup> = 10<sup>−8</sup>).<br>Rule 3 – power of 0: 10<sup>0</sup> = 1 (so pH 0 means [H<sub>3</sub>O<sup>+</sup>] = 1 M).", "11C"],
    ["corrosive hazchem dangerous ph lower 2 higher 12 chemical burn", "What does corrosive mean?", "Corrosive substances cause irreversible damage to a surface they touch (on skin, a chemical burn). Highly corrosive chemicals have a pH <b>lower than 2 or higher than 12</b> – e.g. sulfuric acid in car batteries (pH ≈ 0.5). Hazchem signs warn of dangerous chemicals.", "11C"],
    ["indicator what is how work colour weak acid", "What is an indicator and how does it work?", "An <b>indicator</b> changes colour in the presence of an acid or base. Most are <b>weak acids or bases</b> whose conjugate is a different colour – e.g. phenolphthalein is colourless as an acid and its conjugate base is pink.", "11C"],
    ["phenolphthalein colour pink colourless range 8.3 10", "What colour is phenolphthalein?", "Phenolphthalein (C<sub>20</sub>H<sub>14</sub>O<sub>4</sub>) is <b>colourless</b> in acidic/neutral solutions and <b>pink</b> in basic solutions. Its range is pH 8.3–10.0 (colourless → pink).", "11C"],
    ["commercial indicators table range methyl orange red bromothymol blue thymol bromophenol phenol red", "What are the commercial indicator ranges?", "Thymol blue (1st) 1.2–2.8 red→yellow · Methyl orange 3.1–4.4 red→yellow · Bromophenol blue 3.0–4.6 yellow→blue · Methyl red 4.4–6.2 red→yellow · Bromothymol blue 6.0–7.6 yellow→blue · Phenol red 6.8–8.4 yellow→red · Thymol blue (2nd) 8.0–9.6 yellow→blue · Phenolphthalein 8.3–10.0 colourless→pink. Below the range = first colour; above = second colour.", "11C"],
    ["natural indicators litmus turmeric beetroot red cabbage china rose hydrangea lichen", "What are natural indicators?", "<b>Natural indicators</b> occur in nature and change colour in acids/bases:<br>Litmus – red in acid, blue in base (from lichens)<br>Turmeric – yellow in acid, deep red in base<br>Beetroot juice – purple in acid, yellow in base<br>Red cabbage – pink/red in acid, green/yellow in base<br>China rose – magenta in acid, green in base<br>Hydrangeas: basic soil → pink flowers, acidic soil → blue.", "11C"],
    ["ph meter digital calibrate calibration calibrated systematic error", "What is a pH meter and why is it calibrated?", "A digital pH meter gives a quick, accurate, portable <b>quantitative</b> reading. It must be <b>calibrated</b> by measuring solutions of known pH (e.g. pH 7) to minimise <b>systematic errors</b> – readings that differ from the true value in the same direction every time.", "11C"],
    ["accuracy precision difference indicators meter", "What is the difference between accuracy and precision?", "<b>Accuracy</b> – how close a measurement is to the <b>true value</b> (linked to calibrated pH meters).<br><b>Precision</b> – how close repeated measurements are to <b>each other</b>. Indicators can be precise (same colour every time) but not accurate.", "11C"],
    ["qualitative quantitative indicator vs ph meter compare", "How do indicators compare with pH meters?", "Indicators (natural and commercial) are <b>qualitative</b> – a colour giving a pH <i>range</i>; they can be accurate but are less precise. A pH meter is <b>quantitative</b> – a single number – and more precise.", "11C"],
    ["carbon dioxide weak acid carbonic acid water forms equation co2 h2co3", "How does CO₂ form an acid?", "CO<sub>2</sub> dissolves in water to form carbonic acid, a weak diprotic acid: $H2O(l) + CO2(g) <=> H2CO3(aq)$, then $H2CO3 + H2O <=> HCO3^- + H3O^+$ and $HCO3^- + H2O <=> CO3^2- + H3O^+$. The H<sub>3</sub>O<sup>+</sup> lowers the pH.", "11D"],
    ["ocean acidification ph 8.2 decrease co2 absorbed 25 percent carbon sink", "Why is the ocean becoming more acidic?", "The ocean absorbs about <b>25%</b> of the CO<sub>2</sub> released by burning fossil fuels (it's a carbon sink). Dissolved CO<sub>2</sub> forms carbonic acid, releasing H<sub>3</sub>O<sup>+</sup>. Ocean pH is naturally about <b>8.2</b> and has dropped by about 0.1 – roughly a 30% increase in acidity, because pH is logarithmic.", "11D"],
    ["shells coral shellfish carbonate aragonite calcium dissolve impact marine", "How does ocean acidity affect shells?", "Extra H<sup>+</sup> ions react with carbonate ions and calcium carbonate: $H^+(aq) + CaCO3(s) <=> HCO3^-(aq) + Ca^2+(aq)$. Less carbonate (and aragonite) is available, so coral and shellfish can't fully form shells and skeletons; shells can start to dissolve. At pH 7.8, carbonate concentration is predicted to drop by 50%.", "11D"],
    ["acid rain natural rain ph 5.6 below 5 cause fossil fuels no2 so2", "What is acid rain?", "Natural rain is slightly acidic (≈ pH <b>5.6</b>) because it dissolves CO<sub>2</sub>. <b>Acid rain</b> has a pH <b>below 5</b>. Burning fossil fuels releases acidic gases (NO<sub>2</sub>, SO<sub>2</sub>, CO<sub>2</sub>) which react with water to form acids, e.g. $3NO2(g) + H2O(l) -> 2HNO3(aq) + NO(g)$. Acid rain pollutes water and soil and destroys plants.", "11D"],
    ["photosynthesis equation plants glucose oxygen light", "What is the photosynthesis equation?", "$6CO2(g) + 6H2O(l) -> C6H12O6(aq) + 6O2(g)$ (in light). Plants remove CO<sub>2</sub> from the atmosphere to make glucose.", "11D"],
    ["greenhouse gas co2 global warming fossil fuels combustion", "Why is CO₂ a greenhouse gas?", "CO<sub>2</sub> traps heat close to Earth's surface, contributing to climate change. It is a by-product of complete combustion of fossil fuels; burning coal, gas and oil and clearing forests are the main reasons CO<sub>2</sub> levels keep rising.", "11D"],
    ["carbon cycle sources respiration decay fossil fuels", "What is in the carbon cycle?", "CO<sub>2</sub> enters the atmosphere from burning fuels, animal respiration and cellular respiration; plants remove it by photosynthesis; the ocean absorbs it (carbon sink); waste and organic decay and ocean sediments form fossil fuels, which are burned again.", "11D"],
    ["socioeconomic implications food security tourism fishing coral reefs", "What are the wider effects of ocean acidity?", "Food security (fewer oysters and mussels), loss of shoreline protection from coral reefs, less tourism (e.g. the Great Barrier Reef), and possible limits on the fishing industry. Algae and seagrasses may benefit from extra CO<sub>2</sub>.", "11D"],
    ["neutralisation reaction what define salt water h+ oh-", "What is a neutralisation reaction?", "An acid reacting with a base to produce <b>water and a salt</b>: $H^+(aq) + OH^-(aq) -> H2O(l)$. In the salt, the <b>cation comes from the base</b> and the <b>anion from the acid</b>: HA + BOH → BA + H<sub>2</sub>O.", "11E"],
    ["acid metal reaction products salt hydrogen gas pop test magnesium", "What happens when an acid reacts with a metal?", "<b>Acid + metal → salt + hydrogen gas.</b> e.g. $2HCl(aq) + Mg(s) -> MgCl2(aq) + H2(g)$. Bubbles form, it warms up, the metal disappears, and the gas gives a loud pop with a lit match.", "11E"],
    ["acid metal carbonate reaction products salt water carbon dioxide baking cake", "What happens when an acid reacts with a metal carbonate?", "<b>Acid + metal carbonate → salt + water + carbon dioxide.</b> e.g. $2HNO3(aq) + BaCO3(s) -> Ba(NO3)2(aq) + H2O(l) + CO2(g)$. In baking, tartaric acid + sodium hydrogen carbonate make CO<sub>2</sub> so cakes rise.", "11E"],
    ["acid metal hydroxide reaction products salt water no bubbles", "What happens when an acid reacts with a metal hydroxide?", "<b>Acid + metal hydroxide → salt + water</b> (a true neutralisation; no gas, so no bubbling). e.g. $H2SO4(aq) + 2KOH(s) -> 2H2O(l) + K2SO4(aq)$", "11E"],
    ["spectator ion what define ionic equation write how", "What is a spectator ion and how do I write an ionic equation?", "A <b>spectator ion</b> doesn't take part in the reaction – it's the same, in the same state, on both sides. To write an ionic equation: 1) split (aq) ionic compounds into ions ((s), (l), (g) stay together); 2) cross out spectator ions; 3) rewrite and check atoms AND charges balance (simplify coefficients if possible).", "11E"],
    ["antacid heartburn stomach acid hcl oesophagus pepsin ingredients", "How do antacids work?", "Stomach acid (HCl) helps digest proteins, kills bacteria and suits the enzyme pepsin. Heartburn is when acid rises into the oesophagus. <b>Antacids</b> contain bases – Mg(OH)<sub>2</sub>, Al(OH)<sub>3</sub>, NaHCO<sub>3</sub> or CaCO<sub>3</sub> – that neutralise the acid, e.g. $2HCl(aq) + Mg(OH)2(s) -> MgCl2(aq) + 2H2O(l)$", "11E"],
    ["sherbet wizz fizz fizzing citric acid sodium hydrogen carbonate", "Why does sherbet fizz?", "Sherbet contains citric acid and sodium hydrogen carbonate. On your tongue they react (acid + carbonate) to produce <b>carbon dioxide</b> bubbles – the fizz.", "11E"],
    ["ionic compound formula crossover valency charges periodic table group salt", "How do I write the formula of an ionic salt?", "The formula must have <b>no overall charge</b>. Use the <b>crossover method</b>: swap the charge numbers to become subscripts, then simplify (e.g. Al<sup>3+</sup> + SO<sub>4</sub><sup>2−</sup> → Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>). Charges from the periodic table: group 1 +1, group 2 +2, group 13 +3, group 15 −3, group 16 −2, group 17 −1.", "11E"],
    ["stomach acid bile body digestion ph 1 2 alkaline", "What acids and bases are in the body?", "Stomach acid (hydrochloric acid) has a pH between 1 and 2. Bile, made by the liver and stored in the gall bladder, is alkaline and neutralises the acidic food as it moves into the intestines. A mucous lining protects the stomach.", "11A"]
  ];

  const STOP = new Set("a an the of to in on for and or is are be what which why how do does did i me my you your it its this that these those with as at by from can will would should could explain write give show describe define definition meaning mean question questions please tell about".split(" "));
  function normText(s) {
    return String(s).replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ")
      .replace(/[₀-₉]/g, (c) => String(c.charCodeAt(0) - 8320))
      .replace(/[⁰¹²³⁴-⁹]/g, (c) => ({ "⁰": "0", "¹": "1", "²": "2", "³": "3" }[c] || String(c.charCodeAt(0) - 8304)))
      .replace(/[⁺]/g, "+").replace(/[⁻−]/g, "-").replace(/ø/gi, "o").toLowerCase()
      .replace(/\$/g, " ").replace(/[()\[\]]/g, "");
  }
  function tokens(s) {
    return normText(s).split(/[^a-z0-9.+\-]+/).map((t) => t.replace(/^[.\-+]+|[.\-]+$/g, ""))
      .filter((t) => t && !STOP.has(t)).map((t) => (t.length > 4 && /[a-z]s$/.test(t) && !/ss$/.test(t) ? t.slice(0, -1) : t));
  }

  let KB = null, IDF = null;
  function buildKB() {
    KB = [];
    window.QA.forEach((set) => set.items.forEach((it) => KB.push({ q: it.q, a: it.a, src: `${set.title} · Q${it.n}`, set: set.id, n: it.n, sec: set.section, weight: 1 })));
    window.GLOSSARY.forEach((g) => KB.push({ q: `What is ${g[0].replace(/<[^>]+>/g, "")}? define ${g[0].replace(/<[^>]+>/g, "")} meaning`, a: `<b>${g[0]}</b> – ${g[2]}`, src: `Glossary · ${g[1]}`, sec: g[1], weight: 1.05 }));
    CONCEPTS.forEach((c) => KB.push({ q: c[1] + " " + c[0], title: c[1], a: c[2], src: `Key idea · ${c[3]}`, sec: c[3], weight: 1.2 }));
    Object.entries(window.WX).forEach(([id, w]) => KB.push({ q: w.title + " " + w.problem, title: w.title.replace(/<[^>]+>/g, ""), a: fmt(w.problem) + "<ol>" + w.steps.map((s) => `<li>${fmt(s[0])}<br><b>${fmt(s[1])}</b></li>`).join("") + "</ol>", src: "Worked example " + id, sec: id.slice(0, 3), weight: 0.95 }));
    const df = {};
    KB.forEach((e) => { e.tq = new Set(tokens(e.q)); e.ta = new Set(tokens(e.a)); new Set([...e.tq, ...e.ta]).forEach((t) => (df[t] = (df[t] || 0) + 1)); });
    IDF = (t) => Math.log(1 + KB.length / (1 + (df[t] || 0)));
  }
  function search(query) {
    if (!KB) buildKB();
    const qt = [...new Set(tokens(query))];
    if (!qt.length) return [];
    const qw = qt.reduce((s, t) => s + IDF(t), 0);
    return KB.map((e) => {
      let hitQ = 0, hitA = 0;
      qt.forEach((t) => { if (e.tq.has(t)) hitQ += IDF(t); else if (e.ta.has(t)) hitA += IDF(t) * 0.35; });
      const cover = (hitQ + hitA) / qw;
      let eq = 0, ew = 0; e.tq.forEach((t) => { ew += IDF(t); if (qt.includes(t)) eq += IDF(t); });
      const back = ew ? eq / ew : 0;
      return { e, score: (0.7 * cover + 0.3 * back) * e.weight };
    }).sort((a, b) => b.score - a.score);
  }

  // Direct reference, e.g. "11C question 9", "11A set 1 q 3"
  function directRef(text) {
    const m = normText(text).match(/\b11\s*([a-e])\b(?:.*?set\s*([123]))?.*?\bq(?:uestion)?\.?\s*#?\s*(\d+\s*[a-f]?)\b/);
    if (!m) return null;
    const sec = "11" + m[1].toUpperCase(), id = m[2] ? `${sec}-S${m[2]}` : `${sec}-Q`;
    const set = window.QA.find((s) => s.id === id);
    if (!set) return null;
    const n = m[3].replace(/\s/g, "");
    const exact = set.items.find((it) => it.n.toLowerCase() === n);
    if (exact) return [{ q: exact.q, a: exact.a, src: `${set.title} · Q${exact.n}` }];
    const parts = set.items.filter((it) => it.n.replace(/[a-f]/, "") === n);
    return parts.length ? parts.map((it) => ({ q: it.q, a: it.a, src: `${set.title} · Q${it.n}` })) : null;
  }

  // pH calculator for strong acids/bases named in the chapter
  const STRONG = [
    [/\bhcl\b|hydrochloric/, "HCl", "acid", 1], [/\bhbr\b|hydrobromic/, "HBr", "acid", 1], [/\bhi\b|hydroiodic/, "HI", "acid", 1],
    [/\bhno3\b|nitric/, "HNO3", "acid", 1], [/\bhclo4\b|perchloric/, "HClO4", "acid", 1], [/\bh2so4\b|sulfuric|sulphuric/, "H2SO4", "acid", 2],
    [/\bnaoh\b|sodium hydroxide/, "NaOH", "base", 1], [/\bkoh\b|potassium hydroxide/, "KOH", "base", 1], [/\blioh\b|lithium hydroxide/, "LiOH", "base", 1],
    [/\bbaoh2\b|barium hydroxide/, "Ba(OH)2", "base", 2], [/\bcaoh2\b|calcium hydroxide/, "Ca(OH)2", "base", 2], [/\bmgoh2\b|magnesium hydroxide/, "Mg(OH)2", "base", 2]
  ];
  function phCalc(text) {
    const n = normText(text);
    if (!/\bp\s?o?h\b|\bph\b|\bpoh\b|concentration of (h3o|oh|hydronium|hydroxide)|\[h3o|\[oh/.test(n)) return null;
    if (/dilut|ml of water|added to|\bg of\b|grams?\b/.test(n)) return null; // leave multi-step questions to the Q&A bank
    const sub = STRONG.find((s) => s[0].test(n));
    if (!sub) return null;
    const rest = n.replace(sub[0], " ").replace(/\b[a-z]+\d[a-z0-9]*\b/g, " ");
    let c = null, m;
    if ((m = rest.match(/(\d*\.?\d+)\s*(?:x|×|\*)\s*10\s*\^?\s*(-\s*\d+)/))) c = parseFloat(m[1]) * Math.pow(10, parseInt(m[2].replace(/\s/g, ""), 10));
    else if ((m = rest.match(/(\d*\.?\d+)e(-?\d+)/))) c = parseFloat(m[1]) * Math.pow(10, parseInt(m[2], 10));
    else if ((m = rest.match(/\b10\s*\^\s*(-\s*\d+)/))) c = Math.pow(10, parseInt(m[1].replace(/\s/g, ""), 10));
    else if ((m = rest.match(/(\d*\.\d+|\d+)\s*(?:m\b|mol)/))) c = parseFloat(m[1]);
    else if ((m = rest.match(/(\d*\.\d+)/))) c = parseFloat(m[1]);
    if (!c || c <= 0 || c > 20) return null;
    const [, f, kind, k] = sub;
    const sci = (x) => { if (x >= 0.001 && x < 1000) return +x.toPrecision(3) + ""; const e = Math.floor(Math.log10(x)); return `${+(x / Math.pow(10, e)).toPrecision(3)} × 10<sup>${e}</sup>`; };
    const r2 = (x) => (Math.round(x * 100) / 100).toFixed(2);
    let html = `<b>Step 1:</b> ${chem(f)} is a <b>strong ${kind}</b>${k > 1 ? ` and ${kind === "acid" ? "diprotic" : "has two OH<sup>−</sup> ions"}` : ""}, so it fully ionises.<br>`;
    if (kind === "acid") {
      const h3o = c * k, ph = -Math.log10(h3o);
      html += `<b>Step 2:</b> [H<sub>3</sub>O<sup>+</sup>] = ${k > 1 ? k + " × " : ""}${sci(c)} = <b>${sci(h3o)} M</b><br><b>Step 3:</b> pH = −log<sub>10</sub>(${sci(h3o)}) = <b>${r2(ph)}</b><br><span class="muted">[OH<sup>−</sup>] = 10<sup>−14</sup> ÷ [H<sub>3</sub>O<sup>+</sup>] = ${sci(1e-14 / h3o)} M · pOH = ${r2(14 - ph)}</span>`;
    } else {
      const oh = c * k, poh = -Math.log10(oh);
      html += `<b>Step 2:</b> [OH<sup>−</sup>] = ${k > 1 ? k + " × " : ""}${sci(c)} = <b>${sci(oh)} M</b><br><b>Step 3:</b> pOH = −log<sub>10</sub>(${sci(oh)}) = ${r2(poh)}<br><b>Step 4:</b> pH = 14 − pOH = <b>${r2(14 - poh)}</b><br><span class="muted">[H<sub>3</sub>O<sup>+</sup>] = 10<sup>−14</sup> ÷ [OH<sup>−</sup>] = ${sci(1e-14 / oh)} M</span>`;
    }
    return html;
  }

  function botReply(text) {
    const t = text.trim();
    if (!t) return null;
    if (/^(hi|hello|hey|g'?day|good (morning|afternoon|evening))\b/i.test(t)) return { a: `Hi${studentName() ? " " + esc(studentName()) : ""}! 👋 Ask me any question from Chapter 11 – a definition, an equation, or a pH calculation.`, src: "" };
    if (/^(thanks|thank you|ty|cheers)/i.test(t)) return { a: "You're welcome! Keep going – you're doing great. 💪", src: "" };
    const direct = directRef(t);
    if (direct) return { a: direct.map((d) => `<i>${autoChem(esc(d.q))}</i><br>${fmt(d.a)}`).join("<hr style='border:0;border-top:1px solid var(--line)'>"), src: direct[0].src };
    const res = search(t);
    const best = res[0];
    const calc = phCalc(t);
    if (calc && !(best && best.score >= 0.8)) return { a: calc, src: "Calculated using the steps from 11C", sugg: res.slice(0, 2).filter((r) => r.score >= 0.4) };
    if (best && best.score >= 0.55) return { a: fmt(best.e.a), src: best.e.src, sugg: res.slice(1, 3).filter((r) => r.score >= 0.4) };
    if (best && best.score >= 0.33) return { a: fmt(best.e.a), src: best.e.src + " (closest match)", sugg: res.slice(1, 4).filter((r) => r.score >= 0.25) };
    return {
      a: "Hmm, I couldn't find that in Chapter 11. I can only answer questions from this chapter – try using key words like <i>conjugate pair</i>, <i>pH</i>, <i>strong acid</i>, <i>indicator</i> or <i>neutralisation</i>, or ask for a question number (e.g. “11C question 9”).",
      src: "", sugg: res.slice(0, 3).filter((r) => r.score > 0.12)
    };
  }

  function setupChat() {
    const panel = $("#chatPanel"), log = $("#chatLog"), form = $("#chatForm"), input = $("#chatInput");
    const add = (cls, html) => { const m = h(`<div class="msg ${cls}">${html}</div>`); log.appendChild(m); log.scrollTop = log.scrollHeight; return m; };
    const answer = (q) => {
      add("me", esc(q));
      const r = botReply(q);
      if (!r) return;
      const m = add("bot", r.a + (r.src ? `<span class="src">📘 ${r.src}</span>` : ""));
      hydrate(m);
      if (r.sugg && r.sugg.length) {
        const box = h(`<div class="sugg"><small class="muted"><b>Related:</b></small></div>`);
        r.sugg.forEach((s) => { const b = h(`<button>${autoChem(esc((s.e.title || s.e.q).slice(0, 110)))}</button>`); b.addEventListener("click", () => answer((s.e.title || s.e.q).slice(0, 200))); box.appendChild(b); });
        m.appendChild(box);
      }
      log.scrollTop = log.scrollHeight;
    };
    const greet = () => {
      const m = add("bot", `Hi${studentName() ? " " + esc(studentName()) : ""}! I'm your <b>Chapter 11 helper</b> 🧪<br>Type any question from the chapter and I'll show you the answer. Try one of these:`);
      const box = h('<div class="sugg"></div>');
      ["What is a conjugate acid–base pair?", "Calculate the pH of 0.025 M H2SO4", "Difference between strong and concentrated acids", "11C question 9", "How do antacids work?"].forEach((s) => {
        const b = h(`<button>${esc(s)}</button>`); b.addEventListener("click", () => answer(s)); box.appendChild(b);
      });
      m.appendChild(box);
    };
    $("#chatFab").addEventListener("click", () => {
      panel.hidden = !panel.hidden;
      $("#chatFab").setAttribute("aria-expanded", !panel.hidden);
      if (!panel.hidden) { if (!log.children.length) greet(); input.focus(); }
    });
    $("#chatClose").addEventListener("click", () => { panel.hidden = true; $("#chatFab").setAttribute("aria-expanded", "false"); });
    form.addEventListener("submit", (e) => { e.preventDefault(); const q = input.value; input.value = ""; if (q.trim()) answer(q); });
  }

  /* ------------------------------------------------------------------
     Reaction generator (used by the equation builder)
     ------------------------------------------------------------------ */
  const ACIDS = {
    HCl: { name: "hydrochloric acid", an: "Cl", ac: 1, salt: "chloride" },
    HNO3: { name: "nitric acid", an: "NO3", ac: 1, salt: "nitrate" },
    H2SO4: { name: "sulfuric acid", an: "SO4", ac: 2, salt: "sulfate" }
  };
  const REACTANTS = {
    Mg: { kind: "metal", m: "Mg", c: 2, name: "magnesium" },
    Zn: { kind: "metal", m: "Zn", c: 2, name: "zinc" },
    Al: { kind: "metal", m: "Al", c: 3, name: "aluminium" },
    CaCO3: { kind: "carbonate", m: "Ca", c: 2, a: 1, b: 1, f: "CaCO3", name: "calcium carbonate" },
    MgCO3: { kind: "carbonate", m: "Mg", c: 2, a: 1, b: 1, f: "MgCO3", name: "magnesium carbonate" },
    CuCO3: { kind: "carbonate", m: "Cu", c: 2, a: 1, b: 1, f: "CuCO3", name: "copper(II) carbonate", mname: "copper(II)" },
    K2CO3: { kind: "carbonate", m: "K", c: 1, a: 2, b: 1, f: "K2CO3", name: "potassium carbonate" },
    NaOH: { kind: "hydroxide", m: "Na", c: 1, f: "NaOH", st: "aq", name: "sodium hydroxide" },
    KOH: { kind: "hydroxide", m: "K", c: 1, f: "KOH", st: "aq", name: "potassium hydroxide" },
    "Mg(OH)2": { kind: "hydroxide", m: "Mg", c: 2, f: "Mg(OH)2", st: "s", name: "magnesium hydroxide" },
    "Al(OH)3": { kind: "hydroxide", m: "Al", c: 3, f: "Al(OH)3", st: "s", name: "aluminium hydroxide" }
  };
  const METAL_NAMES = { Mg: "magnesium", Zn: "zinc", Al: "aluminium", Ca: "calcium", Cu: "copper(II)", K: "potassium", Na: "sodium", Ba: "barium" };
  const ionStr = (sym, q, neg) => `${sym}^${q > 1 ? q : ""}${neg ? "-" : "+"}`;
  const co = (n, s) => (n === 1 ? "" : n) + s;
  function saltFormula(m, c, an, ac) {
    const g = gcd(c, ac), x = ac / g, y = c / g;
    const poly = an.length > 2 || /\d/.test(an);
    return { f: m + (x > 1 ? x : "") + (y > 1 ? (poly ? `(${an})${y}` : an + y) : an), x, y };
  }
  function buildReaction(acidKey, rKey) {
    const A = ACIDS[acidKey], R = REACTANTS[rKey];
    const salt = saltFormula(R.m, R.c, A.an, A.ac);
    let s = 1, coef;
    for (s = 1; s <= 6; s++) {
      const metalAtoms = s * salt.x, acid = s * salt.y, H = acid * A.ac;
      if (R.kind === "metal" && H % 2 === 0) { coef = { r: metalAtoms, acid, salt: s, h2: H / 2 }; break; }
      if (R.kind === "carbonate" && metalAtoms % R.a === 0) { const r = metalAtoms / R.a; coef = { r, acid, salt: s, w: r * R.b, co2: r * R.b }; break; }
      if (R.kind === "hydroxide") { coef = { r: metalAtoms, acid, salt: s, w: metalAtoms * R.c }; break; }
    }
    const g = Object.values(coef).reduce((a, b) => gcd(a, b));
    Object.keys(coef).forEach((k) => (coef[k] /= g));
    const rf = R.kind === "metal" ? R.m : R.f, rs = R.kind === "metal" ? "s" : R.st || "s";
    const saltName = `${R.mname || METAL_NAMES[R.m]} ${A.salt}`;
    let full = `${co(coef.r, rf)}(${rs}) + ${co(coef.acid, acidKey)}(aq) -> ${co(coef.salt, salt.f)}(aq)`;
    if (R.kind === "metal") full += ` + ${co(coef.h2, "H2")}(g)`;
    else if (R.kind === "carbonate") full += ` + ${co(coef.w, "H2O")}(l) + ${co(coef.co2, "CO2")}(g)`;
    else full += ` + ${co(coef.w, "H2O")}(l)`;
    // ionic
    const hPlus = coef.acid * A.ac, cat = coef.salt * salt.x;
    let ionic, spect = [ionStr(A.an, A.ac, true)];
    if (R.kind === "hydroxide" && rs === "aq") { ionic = "H^+(aq) + OH^-(aq) -> H2O(l)"; spect.push(ionStr(R.m, R.c, false)); }
    else {
      let parts = R.kind === "metal" ? [coef.r, hPlus, cat, coef.h2] : R.kind === "carbonate" ? [coef.r, hPlus, cat, coef.w, coef.co2] : [coef.r, hPlus, cat, coef.w];
      const gg = parts.reduce((a, b) => gcd(a, b)); parts = parts.map((p) => p / gg);
      ionic = `${co(parts[0], rf)}(${rs}) + ${co(parts[1], "H^+")}(aq) -> ${co(parts[2], ionStr(R.m, R.c, false))}(aq)`;
      if (R.kind === "metal") ionic += ` + ${co(parts[3], "H2")}(g)`;
      else if (R.kind === "carbonate") ionic += ` + ${co(parts[3], "H2O")}(l) + ${co(parts[4], "CO2")}(g)`;
      else ionic += ` + ${co(parts[3], "H2O")}(l)`;
    }
    const pattern = R.kind === "metal" ? "acid + metal → salt + hydrogen gas" : R.kind === "carbonate" ? "acid + metal carbonate → salt + water + carbon dioxide" : "acid + metal hydroxide → salt + water";
    const obs = R.kind === "metal" ? "🫧 Bubbles of hydrogen – 'pop' test with a lit match" : R.kind === "carbonate" ? "🫧 Bubbles of carbon dioxide (fizzing)" : "No bubbling – no gas is produced";
    return { full, ionic, spect, saltName, saltF: salt.f, pattern, obs };
  }
  window.__buildReaction = buildReaction; // handy for checking in the console

  /* ------------------------------------------------------------------
     WIDGETS (interactive visuals)
     ------------------------------------------------------------------ */
  const PH_COLOURS = ["#f5d000", "#c9d63a", "#9cd16a", "#6fcf8f", "#4dc6c4", "#3fb0e0", "#4a8fe0", "#5a6fd8", "#7a5fd0", "#965ad0", "#b056c6", "#c64fb0", "#d94b95", "#e8507a", "#f26464"];
  const phColour = (p) => PH_COLOURS[Math.max(0, Math.min(14, Math.round(p)))];

  const WIDGETS = {
    /* ---------- Welcome: concept map ---------- */
    conceptMap(el) {
      el.classList.remove("widget");
      const nodes = [["L1", 160, 50, "11A", "Intro to acids & bases"], ["L3", 70, 175, "11B", "Strong & weak"], ["L7", 120, 300, "11D", "CO₂ as a weak acid"], ["L4", 280, 225, "11C", "Calculating pH"], ["L8", 300, 85, "11E", "Neutralisation"]];
      const edges = [["L1", "L3", "complete vs partial ionisation"], ["L1", "L4", "low pH acid · high pH base"], ["L3", "L4", ""], ["L3", "L7", "CO₂ & ocean acidity"], ["L4", "L7", ""], ["L1", "L8", "acid + metal / carbonate / hydroxide"], ["L4", "L8", "neutral pH = 7"]];
      const pos = Object.fromEntries(nodes.map((n) => [n[0], n]));
      el.innerHTML = `<svg viewBox="0 0 380 350" role="img" aria-label="Concept map of chapter 11">
        <defs><marker id="cmArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0L10,5L0,10z" fill="var(--primary)"/></marker></defs>
        ${edges.map(([a, b, l]) => { const A = pos[a], B = pos[b]; const mx = (A[1] + B[1]) / 2, my = (A[2] + B[2]) / 2; const dx = B[1] - A[1], dy = B[2] - A[2], d = Math.hypot(dx, dy); const sx = A[1] + (dx / d) * 42, sy = A[2] + (dy / d) * 30, ex = B[1] - (dx / d) * 46, ey = B[2] - (dy / d) * 32; return `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="var(--primary)" stroke-width="3" opacity=".55" marker-end="url(#cmArrow)"/>${l ? `<text x="${mx}" y="${my - 4}" font-size="9.5" text-anchor="middle" class="svg-ink2">${l}</text>` : ""}`; }).join("")}
        ${nodes.map(([id, x, y, c, t]) => `<g class="cm-node" data-go="${id}" style="cursor:pointer"><rect x="${x - 62}" y="${y - 28}" width="124" height="56" rx="16" fill="var(--fill)"/><text x="${x}" y="${y - 6}" text-anchor="middle" fill="#fff" font-weight="800" font-size="14">${c}</text><text x="${x}" y="${y + 13}" text-anchor="middle" fill="#fff" font-size="11">${t}</text></g>`).join("")}
      </svg><p class="muted" style="text-align:center;font-size:.85rem;margin:0">Chapter map – tap a topic once it's unlocked</p>`;
      $$(".cm-node", el).forEach((g) => g.addEventListener("click", () => { const id = g.dataset.go; if (isUnlocked(id)) goLesson(id); else toast("🔒 Finish the earlier parts first!"); }));
    },

    /* ---------- 11A ---------- */
    bodyMap(el) {
      el.innerHTML = `<div class="widget-title">Acids and bases along your digestive system</div>
      <svg viewBox="0 0 560 170" role="img" aria-label="Stomach pH 1 to 2, then bile which is alkaline">
        <path d="M30 85 H530" stroke="var(--ink-3)" stroke-width="10" stroke-linecap="round" opacity=".25"/>
        <g><circle cx="120" cy="85" r="52" fill="var(--acid-soft)" stroke="var(--acid)" stroke-width="3"/><text x="120" y="78" text-anchor="middle" font-weight="800" class="svg-ink">Stomach</text><text x="120" y="98" text-anchor="middle" font-size="13" fill="var(--acid)" font-weight="700">pH 1–2 · acidic</text></g>
        <g><circle cx="290" cy="85" r="52" fill="var(--base-soft)" stroke="var(--base)" stroke-width="3"/><text x="290" y="72" text-anchor="middle" font-weight="800" class="svg-ink">Gall bladder</text><text x="290" y="92" text-anchor="middle" font-size="13" fill="var(--base)" font-weight="700">releases bile</text><text x="290" y="108" text-anchor="middle" font-size="13" fill="var(--base)" font-weight="700">alkaline (basic)</text></g>
        <g><circle cx="460" cy="85" r="52" fill="var(--good-soft)" stroke="var(--good)" stroke-width="3"/><text x="460" y="78" text-anchor="middle" font-weight="800" class="svg-ink">Intestines</text><text x="460" y="98" text-anchor="middle" font-size="13" fill="var(--good)" font-weight="700">acid neutralised</text></g>
        <text x="205" y="30" text-anchor="middle" font-size="12" class="svg-ink2">food moves on →</text><text x="375" y="30" text-anchor="middle" font-size="12" class="svg-ink2">bile mixes in →</text>
      </svg>`;
    },

    protonTransfer(el) {
      el.innerHTML = `<div class="widget-title">Watch the proton (H<sup>+</sup>) transfer</div>
      <svg viewBox="0 0 520 200" role="img" aria-label="HCl donates a proton to NH3">
        <g><circle cx="120" cy="95" r="36" fill="#4cbb5e"/><text x="120" y="101" text-anchor="middle" fill="#fff" font-weight="800">Cl</text></g>
        <text id="clCharge" x="150" y="62" font-size="22" font-weight="800" fill="var(--acid)" opacity="0">−</text>
        <g><circle cx="380" cy="95" r="32" fill="#3b6fd8"/><text x="380" y="101" text-anchor="middle" fill="#fff" font-weight="800">N</text>
          <circle cx="380" cy="48" r="15" fill="#eee" stroke="#999"/><circle cx="342" cy="122" r="15" fill="#eee" stroke="#999"/><circle cx="418" cy="122" r="15" fill="#eee" stroke="#999"/>
          <text x="380" y="53" text-anchor="middle" font-size="12" font-weight="700" fill="#333">H</text><text x="342" y="127" text-anchor="middle" font-size="12" font-weight="700" fill="#333">H</text><text x="418" y="127" text-anchor="middle" font-size="12" font-weight="700" fill="#333">H</text></g>
        <text id="nCharge" x="430" y="58" font-size="22" font-weight="800" fill="var(--base)" opacity="0">+</text>
        <g id="proton" style="transition:transform 1.4s cubic-bezier(.5,0,.3,1)"><circle cx="168" cy="95" r="16" fill="#ffd34d" stroke="#d9a400" stroke-width="2"/><text x="168" y="100" text-anchor="middle" font-size="12" font-weight="800" fill="#333">H⁺</text></g>
        <text id="lblL" x="120" y="175" text-anchor="middle" font-weight="800" fill="var(--acid)">HCl – acid (donor)</text>
        <text id="lblR" x="380" y="175" text-anchor="middle" font-weight="800" fill="var(--base)">NH₃ – base (acceptor)</text>
      </svg>
      <div class="controls" style="justify-content:center"><button class="btn" data-a="go">Transfer the proton ▶</button><button class="btn ghost" data-a="reset">Reset</button></div>
      <div class="eq" id="ptEq">${chem("HCl(g) + NH3(g) -> NH4Cl(s)")}</div>`;
      const p = $("#proton", el);
      $('[data-a="go"]', el).addEventListener("click", () => {
        p.style.transform = "translate(166px,-28px)";
        setTimeout(() => { $("#clCharge", el).setAttribute("opacity", 1); $("#nCharge", el).setAttribute("opacity", 1); $("#lblL", el).textContent = "Cl⁻ – lost H⁺"; $("#lblR", el).textContent = "NH₄⁺ – gained H⁺"; }, 1400);
      });
      $('[data-a="reset"]', el).addEventListener("click", () => {
        p.style.transform = ""; $("#clCharge", el).setAttribute("opacity", 0); $("#nCharge", el).setAttribute("opacity", 0);
        $("#lblL", el).textContent = "HCl – acid (donor)"; $("#lblR", el).textContent = "NH₃ – base (acceptor)";
      });
    },

    conjugateDiagram(el) {
      const X = [70, 200, 340, 470];
      el.innerHTML = `<div class="widget-title">Conjugate pairs at a glance</div>
      <svg viewBox="0 0 540 175" role="img" aria-label="HNO3 plus H2O gives NO3 minus plus H3O plus">
        <path d="M${X[0]} 92 V52 H${X[2]} V82" fill="none" stroke="var(--ink-2)" stroke-width="2"/><polygon points="${X[2] - 5},78 ${X[2] + 5},78 ${X[2]},88" fill="var(--ink-2)"/>
        <text x="${(X[0] + X[2]) / 2}" y="46" text-anchor="middle" font-weight="800" class="svg-ink">−H⁺</text>
        <path d="M${X[1]} 82 V24 H${X[3]} V82" fill="none" stroke="#d6337a" stroke-width="2"/><polygon points="${X[3] - 5},78 ${X[3] + 5},78 ${X[3]},88" fill="#d6337a"/>
        <text x="${(X[1] + X[3]) / 2 + 40}" y="18" text-anchor="middle" font-weight="800" fill="#d6337a">+H⁺</text>
        <text y="112" font-size="19" class="svg-ink"><tspan x="${X[0] - 30}" fill="#c0399b">${svgChem("HNO3", 19)}</tspan></text>
        <text x="${(X[0] + X[1]) / 2 + 5}" y="112" font-size="19" class="svg-ink">+</text>
        <text y="112" font-size="19"><tspan x="${X[1] - 22}" fill="#d6337a">${svgChem("H2O", 19)}</tspan></text>
        <text x="${(X[1] + X[2]) / 2 - 8}" y="112" font-size="19" class="svg-ink">→</text>
        <text y="112" font-size="19"><tspan x="${X[2] - 22}" fill="#c99a00">${svgChem("NO3^-", 19)}</tspan></text>
        <text x="${(X[2] + X[3]) / 2}" y="112" font-size="19" class="svg-ink">+</text>
        <text y="112" font-size="19"><tspan x="${X[3] - 24}" fill="#e5484d">${svgChem("H3O^+", 19)}</tspan></text>
        <text x="${X[0]}" y="142" text-anchor="middle" fill="#c99a00" font-weight="700">acid</text>
        <text x="${X[1]}" y="142" text-anchor="middle" fill="#d6337a" font-weight="700">base</text>
        <text x="${X[2]}" y="142" text-anchor="middle" fill="#c99a00" font-weight="700">conjugate</text><text x="${X[2]}" y="160" text-anchor="middle" fill="#c99a00" font-weight="700">base</text>
        <text x="${X[3]}" y="142" text-anchor="middle" fill="#d6337a" font-weight="700">conjugate</text><text x="${X[3]}" y="160" text-anchor="middle" fill="#d6337a" font-weight="700">acid</text>
      </svg>`;
    },

    protonLadder(el) {
      const FAM = {
        "Phosphoric acid": ["H3PO4", "H2PO4^-", "HPO4^2-", "PO4^3-"],
        "Sulfuric acid": ["H2SO4", "HSO4^-", "SO4^2-"],
        "Carbonic acid": ["H2CO3", "HCO3^-", "CO3^2-"],
        "Water": ["H3O^+", "H2O", "OH^-"],
        "Ammonia": ["NH4^+", "NH3"],
        "Nitric acid": ["HNO3", "NO3^-"]
      };
      let fam = "Sulfuric acid", i = 0;
      el.innerHTML = `<div class="widget-title">Proton ladder – make conjugate pairs</div>
        <p style="margin:0 0 8px">Pick a substance, then remove or add an H<sup>+</sup>. Watch the formula and the charge change.</p>
        <div class="controls"><select class="field" id="famSel" aria-label="Choose substance">${Object.keys(FAM).map((f) => `<option ${f === fam ? "selected" : ""}>${f}</option>`).join("")}</select></div>
        <div id="ladder" style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:12px 0"></div>
        <div class="controls" style="justify-content:center"><button class="btn acid-b" data-a="lose">− H⁺ (act as acid)</button><button class="btn base-b" data-a="gain">+ H⁺ (act as base)</button></div>
        <div class="feedback ok" id="ladMsg" style="text-align:center"></div>`;
      const sel = $("#famSel", el);
      sel.style.cssText = "border:2px solid var(--line);border-radius:10px;padding:8px;background:var(--surface);color:var(--ink)";
      const draw = (msg) => {
        const list = FAM[fam];
        $("#ladder", el).innerHTML = list.map((s, k) => `<div style="padding:10px 14px;border-radius:14px;font-size:1.25rem;font-weight:700;background:${k === i ? "var(--fill)" : "var(--surface)"};color:${k === i ? "#fff" : "var(--ink-2)"};border:2px solid ${k === i ? "var(--primary)" : "var(--line)"};transition:all .25s">${chem(s)}</div>${k < list.length - 1 ? '<div style="align-self:center;color:var(--ink-3);font-weight:800">⇄</div>' : ""}`).join("");
        $('[data-a="lose"]', el).disabled = i >= list.length - 1;
        $('[data-a="gain"]', el).disabled = i <= 0;
        const can = (i < list.length - 1) && i > 0;
        $("#ladMsg", el).innerHTML = msg || (can ? `${chem(list[i])} can donate OR accept an H<sup>+</sup> – it is <b>amphiprotic</b>.` : i === 0 ? `${chem(list[i])} can only donate H<sup>+</sup> here.` : `${chem(list[i])} can only accept H<sup>+</sup> here.`);
      };
      sel.addEventListener("change", () => { fam = sel.value; i = 0; draw(); });
      $('[data-a="lose"]', el).addEventListener("click", () => { const l = FAM[fam]; i++; draw(`Lost H<sup>+</sup>: charge went down by 1. Conjugate pair: <b>${chem(l[i - 1] + "/" + l[i])}</b>`); });
      $('[data-a="gain"]', el).addEventListener("click", () => { const l = FAM[fam]; i--; draw(`Gained H<sup>+</sup>: charge went up by 1. Conjugate pair: <b>${chem(l[i] + "/" + l[i + 1])}</b>`); });
      draw();
    },

    amphiprotic(el) {
      el.innerHTML = `<div class="widget-title">Water changes role depending on its partner</div>
        <div class="controls" style="justify-content:center"><div class="seg"><button aria-pressed="true" data-p="nh3">Water + NH₃</button><button aria-pressed="false" data-p="hcl">Water + HCl</button></div></div>
        <div id="amOut" style="text-align:center"></div>`;
      const draw = (p) => {
        $$("[data-p]", el).forEach((b) => b.setAttribute("aria-pressed", b.dataset.p === p));
        $("#amOut", el).innerHTML = p === "nh3"
          ? `<div style="font-size:2.4rem">💧➡️🧪</div><p>NH<sub>3</sub> is a base, so water <b class="acid">donates</b> an H<sup>+</sup> – water acts as an <b class="acid">ACID</b>.</p><div class="eq">${chem("H2O(l) + NH3(aq) <=> OH^-(aq) + NH4^+(aq)")}</div>`
          : `<div style="font-size:2.4rem">🧪➡️💧</div><p>HCl is an acid, so water <b class="base">accepts</b> an H<sup>+</sup> – water acts as a <b class="base">BASE</b>.</p><div class="eq">${chem("H2O(l) + HCl(aq) <=> H3O^+(aq) + Cl^-(aq)")}</div>`;
      };
      $$("[data-p]", el).forEach((b) => b.addEventListener("click", () => draw(b.dataset.p)));
      draw("nh3");
    },

    triproticStairs(el) {
      const sp = ["H3PO4", "H2PO4^-", "HPO4^2-", "PO4^3-"];
      const eqs = ["H3PO4(aq) + H2O(l) <=> H2PO4^-(aq) + H3O^+(aq)", "H2PO4^-(aq) + H2O(l) <=> HPO4^2-(aq) + H3O^+(aq)", "HPO4^2-(aq) + H2O(l) <=> PO4^3-(aq) + H3O^+(aq)"];
      let k = 0;
      el.innerHTML = `<div class="widget-title">Phosphoric acid gives up its protons one step at a time</div>
        <svg viewBox="0 0 560 230" role="img" aria-label="Staircase of phosphoric acid ionisation steps"><g id="stairs"></g></svg>
        <div class="eq" id="stEq">Press the button to donate the first proton.</div>
        <div class="controls" style="justify-content:center"><button class="btn" data-a="next">Donate next H⁺ ▸</button><button class="btn ghost" data-a="reset">Reset</button></div>`;
      const draw = () => {
        let g = "";
        sp.forEach((s, i) => {
          const x = 20 + i * 135, y = 30 + i * 45, on = i <= k;
          g += `<rect x="${x}" y="${y}" width="125" height="${215 - y}" rx="10" fill="${on ? "var(--fill)" : "var(--surface)"}" stroke="var(--primary)" stroke-width="2" opacity="${on ? 1 : 0.6}"/>
                <text x="${x + 62}" y="${y + 30}" text-anchor="middle" font-size="18" font-weight="700" fill="${on ? "#fff" : "var(--ink-2)"}">${svgChem(sp[i], 18)}</text>`;
          if (i > 0) g += `<text x="${x + 62}" y="${y - 8}" text-anchor="middle" font-size="12" font-weight="800" fill="${i <= k ? "var(--acid)" : "var(--ink-3)"}">step ${i}: −H⁺</text>`;
        });
        $("#stairs", el).innerHTML = g;
        $('[data-a="next"]', el).disabled = k >= 3;
      };
      $('[data-a="next"]', el).addEventListener("click", () => { k++; $("#stEq", el).innerHTML = `<b>Step ${k}:</b> ${chem(eqs[k - 1])}` + (k === 3 ? "<br><small>PO₄³⁻ can accept up to three protons – a polyprotic base.</small>" : ""); draw(); });
      $('[data-a="reset"]', el).addEventListener("click", () => { k = 0; $("#stEq", el).textContent = "Press the button to donate the first proton."; draw(); });
      draw();
    },

    chargeGame(el) {
      const chains = [["H3PO4", "H2PO4^-", "HPO4^2-", "PO4^3-"], ["H2SO4", "HSO4^-", "SO4^2-"], ["H2CO3", "HCO3^-", "CO3^2-"], ["H3O^+", "H2O", "OH^-"], ["NH4^+", "NH3"], ["H2S", "HS^-"], ["HCN", "CN^-"], ["CH3COOH", "CH3COO^-"]];
      let right = 0, tries = 0;
      el.innerHTML = `<div class="widget-title">Charge challenge</div><div id="cgQ"></div><div id="cgO" class="controls"></div><div id="cgF"></div><p class="muted" id="cgS" style="margin:6px 0 0;font-size:.85rem"></p>`;
      const ask = () => {
        const c = pick(chains), i = Math.floor(Math.random() * c.length);
        const lose = i === 0 ? true : i === c.length - 1 ? false : Math.random() < 0.5;
        const ans = c[lose ? i + 1 : i - 1];
        const all = [...new Set([].concat(...chains))].filter((s) => s !== ans && s !== c[i]);
        const strip = (s) => s.replace(/\^.*$/, "");
        const near = all.filter((s) => strip(s).slice(-3) === strip(ans).slice(-3));
        const opts = shuffle([ans, ...shuffle(near.length >= 2 ? near : all).slice(0, 2)]);
        $("#cgQ", el).innerHTML = `<p style="font-size:1.1rem">${chem(c[i])} <b class="${lose ? "acid" : "base"}">${lose ? "loses" : "gains"}</b> one H<sup>+</sup>. What does it become?</p>`;
        $("#cgF", el).innerHTML = "";
        $("#cgO", el).innerHTML = opts.map((o) => `<button class="btn ghost" data-o="${o}">${chem(o)}</button>`).join("");
        $$("[data-o]", el).forEach((b) => b.addEventListener("click", () => {
          tries++; const ok = b.dataset.o === ans; if (ok) right++;
          $$("[data-o]", el).forEach((x) => (x.disabled = true));
          $("#cgF", el).innerHTML = `<div class="feedback ${ok ? "ok" : "no"}">${ok ? "✅ Correct!" : "💡 It becomes " + chem(ans) + "."} ${lose ? "Losing" : "Gaining"} H<sup>+</sup> makes the charge go ${lose ? "down" : "up"} by 1.</div><button class="btn small" style="margin-top:8px">Next ▸</button>`;
          $("#cgS", el).textContent = `Score: ${right} / ${tries}`;
          $("#cgF button", el).addEventListener("click", ask);
        }));
      };
      ask();
    },

    /* ---------- 11B ---------- */
    sorter(el) {
      const items = shuffle([["HCl", 0], ["HBr", 0], ["HI", 0], ["HNO3", 0], ["HClO4", 0], ["H2SO4", 0], ["CH3COOH", 1], ["HCOOH", 1], ["H2CO3", 1], ["H3PO4", 1], ["NaOH", 2], ["KOH", 2], ["Ca(OH)2", 2], ["Ba(OH)2", 2], ["NH3", 3], ["NaHCO3", 3]]);
      const bins = ["Strong acid", "Weak acid", "Strong base", "Weak base"];
      let i = 0, ok = 0;
      el.innerHTML = `<div class="widget-title">Quick sort: strong or weak?</div><div id="soQ" style="text-align:center"></div><div class="controls" style="justify-content:center" id="soB"></div><div id="soF" style="text-align:center"></div>`;
      const ask = () => {
        if (i >= items.length) { $("#soQ", el).innerHTML = `<p style="font-size:1.2rem">🎉 Done! You sorted <b>${ok}/${items.length}</b> correctly first time.</p>`; $("#soB", el).innerHTML = `<button class="btn ghost">Play again</button>`; $("#soB button", el).addEventListener("click", () => { i = 0; ok = 0; ask(); }); $("#soF", el).innerHTML = ""; return; }
        $("#soQ", el).innerHTML = `<p class="muted" style="margin:0">${i + 1} of ${items.length}</p><div style="font-size:2rem;font-weight:800;margin:6px 0">${chem(items[i][0])}</div>`;
        $("#soB", el).innerHTML = bins.map((b, k) => `<button class="btn ${k < 2 ? "acid-b" : "base-b"}" data-k="${k}" style="opacity:${k % 2 ? 0.75 : 1}">${b}</button>`).join("");
        $("#soF", el).innerHTML = "";
        $$("[data-k]", el).forEach((b) => b.addEventListener("click", () => {
          const good = +b.dataset.k === items[i][1]; if (good) ok++;
          $("#soF", el).innerHTML = `<div class="feedback ${good ? "ok" : "no"}">${good ? "✅ Yes!" : "💡 " + chem(items[i][0]) + " is a <b>" + bins[items[i][1]].toLowerCase() + "</b>."}</div>`;
          $$("[data-k]", el).forEach((x) => (x.disabled = true));
          i++; setTimeout(ask, good ? 700 : 1700);
        }));
      };
      ask();
    },

    beakerSim(el) {
      let strong = true, conc = true, seed = 1;
      el.innerHTML = `<div class="widget-title">Beaker simulator: strength × concentration</div>
        <div class="controls" style="justify-content:center"><div class="seg"><button data-s="1" aria-pressed="true">Strong</button><button data-s="0" aria-pressed="false">Weak</button></div>
        <div class="seg"><button data-c="1" aria-pressed="true">Concentrated</button><button data-c="0" aria-pressed="false">Dilute</button></div></div>
        <div style="display:grid;grid-template-columns:minmax(0,260px) 1fr;gap:16px;align-items:center" class="bs-grid">
          <svg viewBox="0 0 220 230" id="bsSvg" role="img" aria-label="Beaker particles"></svg>
          <div id="bsInfo"></div>
        </div>
        <div style="display:flex;gap:14px;justify-content:center;font-size:.85rem;margin-top:8px;flex-wrap:wrap"><span>⊕ positive ion</span><span>⊖ negative ion</span><span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#f08a3c;vertical-align:middle"></span> non-ionised acid molecule</span></div>`;
      if (window.matchMedia("(max-width:560px)").matches) $(".bs-grid", el).style.gridTemplateColumns = "1fr";
      const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
      const draw = () => {
        seed = (strong ? 7 : 3) + (conc ? 11 : 5);
        const nAcid = conc ? 14 : 5;
        const ionised = strong ? nAcid : (conc ? 2 : 1);
        const parts = [];
        for (let k = 0; k < ionised; k++) parts.push("+", "-");
        for (let k = 0; k < nAcid - ionised; k++) parts.push("m");
        const placed = [];
        const svgParts = parts.map((p) => {
          let x, y, tries = 0;
          do { x = 38 + rnd() * 144; y = 70 + rnd() * 130; tries++; } while (tries < 60 && placed.some(([a, b]) => Math.hypot(a - x, b - y) < 20));
          placed.push([x, y]);
          const dur = (2 + rnd() * 2).toFixed(1);
          return p === "m" ? `<circle cx="${x}" cy="${y}" r="8.5" fill="#f08a3c" stroke="#b85a14"><animate attributeName="cy" values="${y};${y - 3};${y}" dur="${dur}s" repeatCount="indefinite"/></circle>`
            : `<g><circle cx="${x}" cy="${y}" r="8.5" class="svg-surface" stroke="var(--ink-2)" stroke-width="1.5"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" font-size="13" font-weight="800" class="svg-ink">${p === "+" ? "+" : "−"}</text><animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="${dur}s" repeatCount="indefinite"/></g>`;
        });
        $("#bsSvg", el).innerHTML = `<path d="M25 40 V205 Q25 215 35 215 H185 Q195 215 195 205 V40" class="svg-water" opacity=".9"/><rect x="25" y="55" width="170" height="160" class="svg-water"/><path d="M18 34 Q25 34 25 42 V205 Q25 215 35 215 H185 Q195 215 195 205 V42 Q195 34 202 34" class="svg-glass" stroke-width="3"/>${svgParts.join("")}`;
        const ions = ionised * 2, mol = nAcid - ionised;
        $("#bsInfo", el).innerHTML = `<h3 style="margin:0 0 6px">${strong ? "Strong" : "Weak"} & ${conc ? "concentrated" : "dilute"}</h3>
          <p style="margin:0 0 6px"><b>Ions : reactant molecules</b> = ${ions} : ${mol} → <b>${strong ? "many : none" : "few : many"}</b> → ${strong ? "completely ionised (strong)" : "partially ionised (weak)"}</p>
          <p style="margin:0 0 6px"><b>Solute : water</b> → <b>${conc ? "many : few" : "few : many"}</b> → ${conc ? "concentrated" : "dilute"}</p>
          <div class="eq" style="font-size:.95rem">${strong ? chem("HNO3(aq) + H2O(l) -> NO3^-(aq) + H3O^+(aq)") : chem("H2CO3(aq) + H2O(l) <=> HCO3^-(aq) + H3O^+(aq)")}</div>
          <p class="muted" style="margin:0;font-size:.85rem">e.g. ${strong ? "nitric acid, HNO₃" : "carbonic acid, H₂CO₃"} – ${strong ? "only products present" : "reactants AND products present"}</p>`;
      };
      $$("[data-s]", el).forEach((b) => b.addEventListener("click", () => { strong = b.dataset.s === "1"; $$("[data-s]", el).forEach((x) => x.setAttribute("aria-pressed", x === b)); draw(); }));
      $$("[data-c]", el).forEach((b) => b.addEventListener("click", () => { conc = b.dataset.c === "1"; $$("[data-c]", el).forEach((x) => x.setAttribute("aria-pressed", x === b)); draw(); }));
      draw();
    },

    /* ---------- 11C ---------- */
    hazchem(el) {
      el.innerHTML = `<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;justify-content:center">
        <svg viewBox="0 0 160 160" width="140" role="img" aria-label="Corrosive hazard symbol"><rect x="30" y="30" width="100" height="100" transform="rotate(45 80 80)" fill="#fff" stroke="#e5262c" stroke-width="10"/>
          <rect x="44" y="96" width="34" height="8" fill="#111"/><path d="M52 62 l10 -6 l4 6 l-10 6z" fill="#111"/><circle cx="58" cy="78" r="3" fill="#111"/><circle cx="60" cy="88" r="2.5" fill="#111"/>
          <path d="M96 62 l-10 -6 l-4 6 l10 6z" fill="#111"/><circle cx="92" cy="78" r="3" fill="#111"/><path d="M84 96 h26 a5 5 0 0 1 0 10 h-26z" fill="#111"/><circle cx="92" cy="90" r="2.5" fill="#111"/></svg>
        <div style="max-width:320px"><b>Corrosive</b> warning sign (Hazchem). Seen on storage containers and vehicles carrying dangerous chemicals.</div></div>`;
      el.classList.remove("widget");
    },

    phSlider(el) {
      const EX = [[0, "1.0 M HCl"], [1, "Stomach acid"], [2, "Lemon juice"], [3, "Vinegar"], [6, "Saliva"], [7, "Deionised water"], [8, "Baking soda"], [9, "Soap"], [13, "Household bleach"], [14, "1.0 M NaOH"]];
      el.innerHTML = `<div class="widget-title">pH explorer</div>
        <svg viewBox="0 0 600 70" role="img" aria-label="pH colour scale"><defs><linearGradient id="phg">${PH_COLOURS.map((c, i) => `<stop offset="${(i / 14) * 100}%" stop-color="${c}"/>`).join("")}</linearGradient></defs>
          <rect x="10" y="12" width="580" height="26" rx="13" fill="url(#phg)"/>${[...Array(15)].map((_, i) => `<text x="${10 + i * (580 / 14)}" y="58" font-size="12" text-anchor="middle" class="svg-ink2">${i}</text>`).join("")}
          <g id="phMark"><polygon points="0,6 -8,-6 8,-6" fill="var(--ink)"/><circle r="10" cy="25" fill="none" stroke="var(--ink)" stroke-width="3"/></g>
          <text x="10" y="8" font-size="10" fill="var(--acid)" font-weight="700">ACIDIC</text><text x="300" y="8" font-size="10" text-anchor="middle" class="svg-ink2" font-weight="700">NEUTRAL</text><text x="590" y="8" font-size="10" text-anchor="end" fill="var(--base)" font-weight="700">ALKALINE</text></svg>
        <input type="range" min="0" max="14" step="0.1" value="7" id="phR" aria-label="pH value">
        <div class="readout"><div><small>pH</small><b id="o1"></b></div><div><small>pOH</small><b id="o2"></b></div><div><small>[H₃O⁺]</small><b id="o3"></b></div><div><small>[OH⁻]</small><b id="o4"></b></div></div>
        <div id="phNote" class="feedback" style="margin-top:10px"></div>
        <div style="margin-top:10px"><small class="muted"><b>Log bars</b> – each step is 10× more</small>
          <div style="display:grid;grid-template-columns:70px 1fr;gap:6px;align-items:center;margin-top:4px"><span style="font-size:.85rem">H₃O⁺</span><div style="background:var(--surface);border-radius:99px;height:14px"><div id="barH" style="height:100%;border-radius:99px;background:var(--acid);transition:width .2s"></div></div>
          <span style="font-size:.85rem">OH⁻</span><div style="background:var(--surface);border-radius:99px;height:14px"><div id="barO" style="height:100%;border-radius:99px;background:var(--base);transition:width .2s"></div></div></div></div>`;
      const r = $("#phR", el);
      const pw = (p) => {
        const x = Math.pow(10, -p), ex = Math.floor(Math.log10(x) + 1e-9), m = x / Math.pow(10, ex);
        return Math.abs(m - 1) < 0.005 ? `10<sup>${ex}</sup>` : `${m.toFixed(1)} × 10<sup>${ex}</sup>`;
      };
      const upd = () => {
        const p = +r.value, poh = +(14 - p).toFixed(1);
        $("#phMark", el).setAttribute("transform", `translate(${10 + p * (580 / 14)},12)`);
        $("#o1", el).textContent = p.toFixed(1); $("#o2", el).textContent = poh.toFixed(1);
        $("#o3", el).innerHTML = pw(+p.toFixed(1)) + " M"; $("#o4", el).innerHTML = pw(poh) + " M";
        $("#barH", el).style.width = ((14 - p) / 14) * 100 + "%"; $("#barO", el).style.width = (p / 14) * 100 + "%";
        const ex = EX.reduce((b, e) => (Math.abs(e[0] - p) < Math.abs(b[0] - p) ? e : b));
        const kind = p < 6.95 ? '<b class="acid">Acidic</b> – [H₃O⁺] > [OH⁻]' : p > 7.05 ? '<b class="base">Alkaline (basic)</b> – [OH⁻] > [H₃O⁺]' : "<b>Neutral</b> – [H₃O⁺] = [OH⁻] = 10<sup>−7</sup> M";
        const note = $("#phNote", el);
        note.className = "feedback " + (p < 2 || p > 12 ? "no" : "ok");
        note.innerHTML = `${kind}. Similar to: <b>${ex[1]}</b> (pH ${ex[0]}).${p < 2 || p > 12 ? " ⚠️ <b>Corrosive!</b>" : ""}`;
      };
      r.addEventListener("input", upd); upd();
    },

    flowChart(el) {
      const INFO = {
        acid: "<b>[acid]</b> – for a strong acid, [H₃O⁺] = [acid] × number of H⁺ donated (e.g. ×2 for H₂SO₄).",
        base: "<b>[base]</b> – for a strong base, [OH⁻] = [base] × number of OH⁻ (e.g. ×2 for Ba(OH)₂).",
        h3o: "<b>[H₃O⁺]</b> – from pH: [H₃O⁺] = 10⁻ᵖᴴ. From [OH⁻]: [H₃O⁺] = 10⁻¹⁴ ÷ [OH⁻].",
        oh: "<b>[OH⁻]</b> – from pOH: [OH⁻] = 10⁻ᵖᴼᴴ. From [H₃O⁺]: [OH⁻] = 10⁻¹⁴ ÷ [H₃O⁺].",
        ph: "<b>pH</b> = −log₁₀[H₃O⁺], or pH = 14 − pOH.",
        poh: "<b>pOH</b> = −log₁₀[OH⁻], or pOH = 14 − pH."
      };
      el.innerHTML = `<div class="widget-title">pH calculation flow chart</div>
      <svg viewBox="-60 0 680 300" role="img" aria-label="Flow chart linking acid, base, hydronium, hydroxide, pH and pOH">
        <defs><marker id="fa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="context-stroke"/></marker></defs>
        <g stroke-width="2.5" fill="none">
          <line x1="160" y1="88" x2="400" y2="88" stroke="#e5484d" marker-end="url(#fa)"/><line x1="400" y1="108" x2="160" y2="108" stroke="#1f9d6b" marker-end="url(#fa)"/>
          <line x1="110" y1="125" x2="110" y2="225" stroke="#1f9d6b" marker-end="url(#fa)"/><line x1="90" y1="225" x2="90" y2="125" stroke="#e5484d" marker-end="url(#fa)"/>
          <line x1="470" y1="225" x2="470" y2="125" stroke="#1f9d6b" marker-end="url(#fa)"/><line x1="450" y1="125" x2="450" y2="225" stroke="#e5484d" marker-end="url(#fa)"/>
          <line x1="150" y1="248" x2="410" y2="248" stroke="#1f9d6b" marker-end="url(#fa)"/><line x1="410" y1="268" x2="150" y2="268" stroke="#e5484d" marker-end="url(#fa)"/>
          <line x1="70" y1="40" x2="88" y2="70" stroke="var(--ink-3)"/><line x1="490" y1="40" x2="472" y2="70" stroke="var(--ink-3)"/></g>
        <g font-size="12" class="svg-ink2" text-anchor="middle"><text x="280" y="80">[OH⁻] = 10⁻¹⁴ ÷ [H₃O⁺]</text><text x="280" y="124">[H₃O⁺] = 10⁻¹⁴ ÷ [OH⁻]</text>
          <text x="140" y="180" text-anchor="start">pH = −log[H₃O⁺]</text><text x="60" y="180" text-anchor="end">[H₃O⁺] = 10⁻ᵖᴴ</text>
          <text x="420" y="180" text-anchor="end">[OH⁻] = 10⁻ᵖᴼᴴ</text><text x="500" y="180" text-anchor="start">pOH = −log[OH⁻]</text>
          <text x="280" y="242">pOH = 14 − pH</text><text x="280" y="288">pH = 14 − pOH</text></g>
        ${[["acid", 55, 28, "[acid]"], ["base", 505, 28, "[base]"], ["h3o", 100, 98, "[H₃O⁺]"], ["oh", 460, 98, "[OH⁻]"], ["ph", 100, 258, "pH"], ["poh", 460, 258, "pOH"]].map(([k, x, y, t]) => `<g class="fc-node" data-k="${k}" style="cursor:pointer"><rect x="${x - 45}" y="${y - 20}" width="90" height="40" rx="12" fill="var(--fill)"/><text x="${x}" y="${y + 6}" text-anchor="middle" fill="#fff" font-weight="800" font-size="16">${t}</text></g>`).join("")}
      </svg><div class="feedback ok" id="fcInfo">Tap a box. Start from what the question gives you, then follow the arrows to pH.</div>`;
      $$(".fc-node", el).forEach((g) => g.addEventListener("click", () => ($("#fcInfo", el).innerHTML = INFO[g.dataset.k])));
    },

    phPractice(el) {
      const SUB = [["HCl", "acid", 1], ["HNO3", "acid", 1], ["HBr", "acid", 1], ["H2SO4", "acid", 2], ["NaOH", "base", 1], ["KOH", "base", 1], ["Ba(OH)2", "base", 2], ["Ca(OH)2", "base", 2]];
      let cur, streak = 0;
      el.innerHTML = `<div class="widget-title">pH practice machine (unlimited questions)</div><div id="ppQ"></div>
        <div class="field"><input id="ppIn" inputmode="decimal" placeholder="pH (2 d.p.)" aria-label="Your pH answer" style="max-width:160px"><button class="btn" id="ppGo">Check</button><button class="btn ghost" id="ppShow">Show working</button><button class="btn ghost" id="ppNew">New question</button></div>
        <div id="ppF"></div><p class="muted" id="ppS" style="margin:6px 0 0;font-size:.85rem"></p>`;
      const sci = (m, e) => (e === 0 ? `${m}` : `${m} × 10<sup>${e}</sup>`);
      const make = () => {
        const s = pick(SUB), m = pick([1, 2, 2.5, 5]), e = -1 - Math.floor(Math.random() * 4);
        const c = m * Math.pow(10, e), k = s[2];
        const x = c * k;
        const ph = s[1] === "acid" ? -Math.log10(x) : 14 + Math.log10(x);
        cur = { s, c, k, x, ph, m, e };
        $("#ppQ", el).innerHTML = `<p style="font-size:1.1rem">Calculate the pH of <b>${sci(m, e)} M ${chem(s[0])}</b> at 25 °C.</p>`;
        $("#ppIn", el).value = ""; $("#ppF", el).innerHTML = "";
      };
      const working = () => {
        const { s, k, x, ph } = cur;
        const xs = +x.toPrecision(3);
        return s[1] === "acid"
          ? `${chem(s[0])} is a strong acid${k > 1 ? " (diprotic, ×2)" : ""}: [H₃O⁺] = ${xs} M → pH = −log(${xs}) = <b>${ph.toFixed(2)}</b>`
          : `${chem(s[0])} is a strong base${k > 1 ? " (two OH⁻, ×2)" : ""}: [OH⁻] = ${xs} M → pOH = −log(${xs}) = ${(14 - ph).toFixed(2)} → pH = 14 − ${(14 - ph).toFixed(2)} = <b>${ph.toFixed(2)}</b>`;
      };
      const check = () => {
        const v = parseNum($("#ppIn", el).value);
        if (v === null) return;
        const ok = Math.abs(v - cur.ph) <= 0.02;
        streak = ok ? streak + 1 : 0;
        $("#ppF", el).innerHTML = `<div class="feedback ${ok ? "ok" : "no"}">${ok ? "✅ Correct! " : "💡 Not quite. "}${working()}</div>`;
        $("#ppS", el).textContent = streak > 1 ? `🔥 Streak: ${streak} in a row!` : "";
      };
      $("#ppGo", el).addEventListener("click", check);
      $("#ppIn", el).addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
      $("#ppShow", el).addEventListener("click", () => ($("#ppF", el).innerHTML = `<div class="feedback no">${working()}</div>`));
      $("#ppNew", el).addEventListener("click", make);
      make();
    },

    dilution(el) {
      el.innerHTML = `<div class="widget-title">Dilution lab (strong monoprotic acid, e.g. HCl)</div>
        <div class="field"><label>c₁ <input id="dc" type="number" step="any" value="0.050" style="width:100px"> M</label><label>V₁ <input id="dv1" type="number" step="any" value="20" style="width:90px"> mL</label><label>V₂ (total) <input id="dv2" type="number" step="any" value="100" style="width:90px"> mL</label></div>
        <div style="display:flex;gap:20px;justify-content:center;align-items:flex-end;margin-top:10px" id="dlB"></div>
        <div class="readout" id="dlR"></div>`;
      const beaker = (vol, max, dots, label) => {
        const h2 = Math.max(12, (vol / max) * 120);
        let d = ""; let s = 3;
        for (let i = 0; i < dots; i++) { s = (s * 9301 + 49297) % 233280; const x = 22 + (s / 233280) * 76; s = (s * 9301 + 49297) % 233280; const y = 150 - (s / 233280) * (h2 - 8) - 4; d += `<circle cx="${x}" cy="${y}" r="3.5" fill="var(--acid)"/>`; }
        return `<div style="text-align:center"><svg viewBox="0 0 120 165" width="120"><rect x="15" y="${154 - h2}" width="90" height="${h2}" class="svg-water"/>${d}<path d="M12 22 V150 Q12 156 18 156 H102 Q108 156 108 150 V22" class="svg-glass" stroke-width="3"/></svg><div style="font-size:.85rem;font-weight:700">${label}</div></div>`;
      };
      const upd = () => {
        const c1 = +$("#dc", el).value, v1 = +$("#dv1", el).value, v2 = +$("#dv2", el).value;
        if (!(c1 > 0 && v1 > 0 && v2 >= v1)) { $("#dlR", el).innerHTML = `<div>Check your numbers: V₂ must be at least V₁.</div>`; return; }
        const c2 = (c1 * v1) / v2, max = Math.max(v2, 1);
        const n = Math.max(3, Math.min(40, Math.round(c1 * v1 * 8)));
        $("#dlB", el).innerHTML = beaker(v1, max, n, `Before: ${v1} mL`) + `<div style="font-size:1.6rem;padding-bottom:40px">➜ 💧</div>` + beaker(v2, max, n, `After: ${v2} mL`);
        $("#dlR", el).innerHTML = `<div><small>c₂ = c₁V₁ ÷ V₂</small><b>${+c2.toPrecision(3)} M</b></div><div><small>pH before</small><b>${(-Math.log10(c1)).toFixed(2)}</b></div><div><small>pH after</small><b>${(-Math.log10(c2)).toFixed(2)}</b></div><div><small>Water added</small><b>${+(v2 - v1).toFixed(1)} mL</b></div>`;
      };
      $$("input", el).forEach((i) => i.addEventListener("input", upd)); upd();
    },

    phenol(el) {
      let base = false;
      el.innerHTML = `<div class="widget-title">Phenolphthalein test</div>
        <div style="display:flex;gap:20px;align-items:center;justify-content:center;flex-wrap:wrap">
        <svg viewBox="0 0 140 170" width="130" role="img" aria-label="Flask with phenolphthalein"><path id="phFill" d="M40 95 L20 150 Q18 158 26 158 H114 Q122 158 120 150 L100 95 Z" fill="rgba(200,220,240,.35)" style="transition:fill .6s"/><path d="M55 20 V70 L18 150 Q14 162 28 162 H112 Q126 162 122 150 L85 70 V20" class="svg-glass" stroke-width="3"/><line x1="50" y1="20" x2="90" y2="20" class="svg-glass" stroke-width="3"/></svg>
        <div><p id="phTxt" style="max-width:280px">Phenolphthalein in an <b>acidic/neutral</b> solution: <b>colourless</b> (the acid form).</p>
        <div class="controls"><button class="btn base-b" data-a="b">Add base (OH⁻)</button><button class="btn acid-b" data-a="a">Add acid</button></div></div></div>`;
      const upd = () => {
        $("#phFill", el).setAttribute("fill", base ? "rgba(236,64,150,.85)" : "rgba(200,220,240,.35)");
        $("#phTxt", el).innerHTML = base ? "In a <b>basic</b> solution [H₃O⁺] is low, so more of the <b style='color:#e0408f'>pink</b> conjugate base ion forms." : "Phenolphthalein in an <b>acidic/neutral</b> solution: <b>colourless</b> (the acid form).";
      };
      $('[data-a="b"]', el).addEventListener("click", () => { base = true; upd(); });
      $('[data-a="a"]', el).addEventListener("click", () => { base = false; upd(); });
    },

    indicatorExplorer(el) {
      const C = { red: [229, 56, 59], yellow: [245, 200, 20], blue: [43, 111, 224], none: [235, 235, 240], pink: [240, 70, 160] };
      const IND = [["Thymol blue (1st change)", 1.2, 2.8, "red", "yellow"], ["Methyl orange", 3.1, 4.4, "red", "yellow"], ["Bromophenol blue", 3.0, 4.6, "yellow", "blue"], ["Methyl red", 4.4, 6.2, "red", "yellow"], ["Bromothymol blue", 6.0, 7.6, "yellow", "blue"], ["Phenol red", 6.8, 8.4, "yellow", "red"], ["Thymol blue (2nd change)", 8.0, 9.6, "yellow", "blue"], ["Phenolphthalein", 8.3, 10.0, "none", "pink"]];
      const mix = (a, b, t) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
      const colAt = (ind, p) => { const t = Math.max(0, Math.min(1, (p - ind[1]) / (ind[2] - ind[1]))); return mix(C[ind[3]], C[ind[4]], t); };
      const W = 560, x0 = 10, sx = (p) => x0 + (p / 14) * (W - 20);
      el.innerHTML = `<div class="widget-title">Commercial indicator explorer</div>
        <label style="font-weight:700">Solution pH: <span id="ieV">7.0</span></label><input type="range" min="0" max="14" step="0.1" value="7" id="ieR" aria-label="Solution pH">
        <div class="table-wrap"><table class="t" style="margin-top:6px"><tr><th>Indicator</th><th>pH range</th><th>Change</th><th>Colour now</th></tr>
        ${IND.map((d, i) => `<tr><td>${d[0]}</td><td>${d[1].toFixed(1)}–${d[2].toFixed(1)}</td><td>${d[3] === "none" ? "colourless" : d[3]} → ${d[4]}</td><td><span id="sw${i}" style="display:inline-block;width:46px;height:22px;border-radius:6px;border:1px solid var(--line);vertical-align:middle"></span> <small id="sl${i}"></small></td></tr>`).join("")}</table></div>
        <svg viewBox="0 0 ${W} ${IND.length * 18 + 30}" role="img" aria-label="Indicator colour ranges"><defs>${IND.map((d, i) => `<linearGradient id="ig${i}"><stop offset="0" stop-color="${mix(C[d[3]], C[d[3]], 0)}"/><stop offset="1" stop-color="${mix(C[d[4]], C[d[4]], 0)}"/></linearGradient>`).join("")}</defs>
        ${IND.map((d, i) => `<rect x="${sx(0)}" y="${i * 18 + 4}" width="${sx(d[1]) - sx(0)}" height="12" fill="${mix(C[d[3]], C[d[3]], 0)}"/><rect x="${sx(d[1])}" y="${i * 18 + 4}" width="${sx(d[2]) - sx(d[1])}" height="12" fill="url(#ig${i})"/><rect x="${sx(d[2])}" y="${i * 18 + 4}" width="${sx(14) - sx(d[2])}" height="12" fill="${mix(C[d[4]], C[d[4]], 0)}"/>`).join("")}
        ${[0, 2, 4, 6, 8, 10, 12, 14].map((p) => `<text x="${sx(p)}" y="${IND.length * 18 + 22}" font-size="11" text-anchor="middle" class="svg-ink2">${p}</text>`).join("")}
        <line id="ieLine" y1="0" y2="${IND.length * 18 + 8}" stroke="var(--ink)" stroke-width="2.5"/></svg>`;
      const r = $("#ieR", el);
      const upd = () => {
        const p = +r.value; $("#ieV", el).textContent = p.toFixed(1);
        $("#ieLine", el).setAttribute("x1", sx(p)); $("#ieLine", el).setAttribute("x2", sx(p));
        IND.forEach((d, i) => {
          $("#sw" + i, el).style.background = colAt(d, p);
          const name = p <= d[1] ? (d[3] === "none" ? "colourless" : d[3]) : p >= d[2] ? d[4] : "changing";
          $("#sl" + i, el).textContent = name;
        });
      };
      r.addEventListener("input", upd); upd();
    },

    naturalTable(el) {
      const ROWS = [["Litmus solution", "Purple", "#7b5fb0", "Red", "#e5383b", "Blue", "#3b78d8"], ["Turmeric solution", "Yellow", "#f5e04a", "Yellow", "#f5e04a", "Deep red", "#d61f26"], ["Beetroot juice", "Purple", "#7b5fb0", "Purple", "#7b5fb0", "Yellow", "#f5e04a"], ["Red cabbage juice", "Purple", "#7b5fb0", "Pink/Red", "#f08a7a", "Green/Yellow", "#d6d49a"], ["China rose solution", "Red", "#e5383b", "Magenta", "#e0189a", "Green", "#3fb35c"]];
      el.innerHTML = `<div class="widget-title">Natural indicators</div><div class="controls"><div class="seg"><button data-m="all" aria-pressed="true">Show all</button><button data-m="acid" aria-pressed="false">Test in acid</button><button data-m="base" aria-pressed="false">Test in base</button></div></div><div class="table-wrap" id="ntT"></div>`;
      const draw = (m) => {
        $$("[data-m]", el).forEach((b) => b.setAttribute("aria-pressed", b.dataset.m === m));
        const cell = (t, c, dim) => `<td style="background:${c};color:${["#f5e04a", "#d6d49a"].includes(c) ? "#333" : "#fff"};font-weight:700;opacity:${dim ? 0.25 : 1};transition:opacity .3s">${t}</td>`;
        $("#ntT", el).innerHTML = `<table class="t"><tr><th>Natural indicator</th><th>In nature</th><th>In acid</th><th>In base</th></tr>${ROWS.map((r) => `<tr><td>${r[0]}</td>${cell(r[1], r[2], m !== "all")}${cell(r[3], r[4], m === "base")}${cell(r[5], r[6], m === "acid")}</tr>`).join("")}</table>`;
      };
      $$("[data-m]", el).forEach((b) => b.addEventListener("click", () => draw(b.dataset.m)));
      draw("all");
    },

    targets(el) {
      const board = (title, pts, cx = 70, cy = 70) => `<div style="text-align:center"><svg viewBox="0 0 140 140" width="130">${[56, 40, 24, 9].map((r, i) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${i % 2 ? "var(--surface)" : "var(--primary-soft)"}" stroke="var(--primary)" stroke-width="1.5"/>`).join("")}${pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="var(--acid)" stroke="#fff" stroke-width="1.5"/>`).join("")}</svg><div style="font-size:.88rem;font-weight:700">${title}</div></div>`;
      el.innerHTML = `<div class="widget-title">Accuracy vs precision (the bullseye = true value)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px">
        ${board("Accurate & precise", [[68, 70], [72, 67], [70, 74], [73, 71]])}
        ${board("Precise, not accurate<br><small class='muted'>e.g. systematic error</small>", [[100, 38], [104, 41], [99, 44], [103, 36]])}
        ${board("Accurate on average, not precise", [[45, 60], [92, 82], [66, 104], [80, 40]])}
        ${board("Neither", [[30, 40], [104, 102], [40, 110], [112, 60]])}</div>`;
    },

    venn(el) {
      el.innerHTML = `<svg viewBox="0 0 520 250" role="img" aria-label="Venn diagram comparing natural and commercial indicators" style="max-width:520px;display:block;margin:6px auto">
        <circle cx="185" cy="125" r="115" fill="var(--good)" opacity=".15" stroke="var(--good)" stroke-width="2"/><circle cx="335" cy="125" r="115" fill="var(--base)" opacity=".15" stroke="var(--base)" stroke-width="2"/>
        <text x="110" y="35" text-anchor="middle" font-weight="800" fill="var(--good)">Natural</text><text x="410" y="35" text-anchor="middle" font-weight="800" fill="var(--base)">Commercial</text>
        <g font-size="11.5" class="svg-ink" text-anchor="middle"><text x="120" y="95">Found in nature</text><text x="120" y="113">(plants, lichens)</text><text x="120" y="135">litmus, turmeric,</text><text x="120" y="151">red cabbage…</text><text x="120" y="173">acid colour /</text><text x="120" y="189">base colour</text>
          <text x="260" y="85">Change colour</text><text x="260" y="101">in acid/base</text><text x="260" y="123">Qualitative –</text><text x="260" y="139">give a pH range</text><text x="260" y="161">Weak acids/bases;</text><text x="260" y="177">conjugate = new colour</text>
          <text x="400" y="95">Made for the lab</text><text x="400" y="117">Specific pH range</text><text x="400" y="133">for colour change</text><text x="400" y="155">(data booklet)</text><text x="400" y="177">chosen for reactions</text></g></svg>`;
    },

    /* ---------- 11D ---------- */
    carbonCycle(el) {
      el.innerHTML = `<div class="widget-title">The carbon cycle</div>
      <svg viewBox="0 0 600 300" role="img" aria-label="Carbon cycle diagram">
        <defs><marker id="cc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0L10,5L0,10z" fill="var(--ink-2)"/></marker></defs>
        <rect x="0" y="230" width="430" height="70" fill="#8a6a43" opacity=".25"/><path d="M430 200 Q520 190 600 210 V300 H430Z" fill="var(--base)" opacity=".25"/>
        <rect x="220" y="14" width="170" height="40" rx="20" fill="var(--surface)" stroke="var(--ink-3)"/><text x="305" y="39" text-anchor="middle" font-weight="800" class="svg-ink">CO₂ in atmosphere</text>
        <text x="60" y="170" font-size="34">🏭</text><text x="70" y="205" font-size="11" text-anchor="middle" class="svg-ink2">burning fuels</text>
        <text x="170" y="210" font-size="30">🐄</text><text x="185" y="228" font-size="11" text-anchor="middle" class="svg-ink2">animal respiration</text>
        <text x="300" y="200" font-size="40">🌳</text><text x="320" y="222" font-size="11" text-anchor="middle" class="svg-ink2">plants</text>
        <text x="525" y="180" font-size="30">🌊</text><text x="540" y="245" font-size="11" text-anchor="middle" class="svg-ink2">ocean (carbon sink)</text>
        <rect x="150" y="268" width="120" height="22" rx="4" fill="#222"/><text x="210" y="283" font-size="11" text-anchor="middle" fill="#fff">fossil fuels</text>
        <g stroke="var(--ink-2)" stroke-width="2" fill="none" marker-end="url(#cc)">
          <path d="M80 140 Q120 60 220 38"/><path d="M190 185 Q220 120 250 56"/><path d="M300 56 V160"/><path d="M345 165 Q380 110 350 56"/><path d="M390 40 Q520 50 540 150"/>
          <path d="M240 240 V266"/><path d="M520 250 Q400 290 272 282"/><path d="M150 282 Q80 280 75 215"/></g>
        <g font-size="11" font-weight="700" class="svg-ink"><text x="112" y="80">emissions</text><text x="306" y="110">photosynthesis</text><text x="380" y="100">cellular respiration</text><text x="455" y="80">absorbed (≈25%)</text><text x="246" y="258">waste & decay</text></g>
      </svg>`;
    },

    oceanTrend(el) {
      const X = (y) => 50 + ((y - 1940) / 70) * 470, Yc = (c) => 250 - ((c - 275) / 125) * 220, Yp = (p) => 250 - ((p - 8.03) / 0.35) * 220;
      el.innerHTML = `<div class="widget-title">CO₂ and pH in the North Pacific (trend)</div>
      <svg viewBox="0 0 600 290" role="img" aria-label="Rising carbon dioxide and falling sea water pH">
        <line x1="50" y1="250" x2="520" y2="250" stroke="var(--ink-3)"/><line x1="50" y1="30" x2="50" y2="250" stroke="var(--ink-3)"/><line x1="520" y1="30" x2="520" y2="250" stroke="var(--ink-3)"/>
        ${[1940, 1960, 1980, 2000].map((y) => `<text x="${X(y)}" y="268" font-size="11" text-anchor="middle" class="svg-ink2">${y}</text>`).join("")}
        ${[300, 350, 400].map((c) => `<text x="44" y="${Yc(c) + 4}" font-size="11" text-anchor="end" fill="var(--acid)">${c}</text>`).join("")}
        ${[8.08, 8.18, 8.28, 8.38].map((p) => `<text x="526" y="${Yp(p) + 4}" font-size="11" fill="var(--base)">${p}</text>`).join("")}
        <line x1="${X(1958)}" y1="${Yc(315)}" x2="${X(2008)}" y2="${Yc(385)}" stroke="var(--acid)" stroke-width="4"/>
        <line x1="${X(1989)}" y1="${Yc(328)}" x2="${X(2007)}" y2="${Yc(360)}" stroke="#2050a0" stroke-width="3" stroke-dasharray="6 4"/>
        <line x1="${X(1989)}" y1="${Yp(8.112)}" x2="${X(2007)}" y2="${Yp(8.083)}" stroke="var(--base)" stroke-width="4"/>
        <text x="${X(1962)}" y="${Yc(296)}" font-size="12" font-weight="700" fill="var(--acid)">Atmospheric CO₂ (ppm) ↑</text>
        <text x="${X(1975)}" y="${Yc(372)}" font-size="12" font-weight="700" fill="#2050a0">Sea water CO₂ ↑</text>
        <text x="${X(1984)}" y="${Yp(8.06) + 2}" font-size="12" font-weight="700" fill="var(--base)">Sea water pH ↓</text>
        <text x="285" y="286" font-size="12" text-anchor="middle" class="svg-ink2">Year</text>
      </svg><p class="muted" style="font-size:.85rem;margin:0">Trend lines redrawn from the textbook figure: as CO₂ rises, sea water pH falls.</p>`;
    },

    oceanSlider(el) {
      el.innerHTML = `<div class="widget-title">Why a 'small' pH drop matters</div>
        <label style="font-weight:700">Ocean pH: <span id="osV">8.2</span></label><input type="range" min="7.8" max="8.2" step="0.01" value="8.2" id="osR" aria-label="Ocean pH">
        <div style="display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:center;margin-top:8px">
          <svg viewBox="0 0 100 90" width="110" aria-hidden="true"><path id="shell" d="M50 85 L10 40 Q20 8 50 6 Q80 8 90 40 Z" fill="#f2d7b5" stroke="#b08458" stroke-width="2"/><g stroke="#b08458" stroke-width="1.5" id="ribs"><line x1="50" y1="85" x2="22" y2="22"/><line x1="50" y1="85" x2="38" y2="10"/><line x1="50" y1="85" x2="62" y2="10"/><line x1="50" y1="85" x2="78" y2="22"/></g></svg>
          <div id="osOut"></div></div>`;
      const r = $("#osR", el);
      const upd = () => {
        const p = +r.value, f = Math.pow(10, 8.2 - p);
        $("#osV", el).textContent = p.toFixed(2);
        $("#shell", el).setAttribute("opacity", (0.35 + 0.65 * (p - 7.8) / 0.4).toFixed(2));
        $("#osOut", el).innerHTML = `[H⁺] is <b>${f.toFixed(2)}×</b> what it was at pH 8.2 – that's <b>${Math.round((f - 1) * 100)}% more acidic</b>.` +
          (p <= 8.11 && p >= 8.09 ? "<br>This is about where the ocean is now (a drop of ~0.1 ≈ 30%)." : "") +
          (p <= 7.8 ? "<br>⚠️ Scientists predict that at pH 7.8, carbonate ion concentration would fall by <b>50%</b>." : "") +
          "<br><small class='muted'>Remember: the ocean is still basic (above 7) – it is becoming <i>less basic</i>, i.e. more acidic.</small>";
      };
      r.addEventListener("input", upd); upd();
    },

    shellChain(el) {
      const STEPS = [
        ["CO2(g) <=> CO2(aq)", "More CO₂ in the atmosphere → more CO₂ dissolves in the ocean."],
        ["CO2(aq) + H2O(l) <=> H2CO3(aq)", "Dissolved CO₂ reacts with water to form carbonic acid."],
        ["H2CO3(aq) + H2O(l) <=> HCO3^-(aq) + H3O^+(aq)", "Carbonic acid (weak, diprotic) ionises, releasing H₃O⁺ (H⁺) ions."],
        ["H^+(aq) + CO3^2-(aq) -> HCO3^-(aq)", "The extra H⁺ ions bond with free carbonate ions – fewer are left for building shells."],
        ["H^+(aq) + CaCO3(s) <=> HCO3^-(aq) + Ca^2+(aq)", "H⁺ can also react with the calcium carbonate in shells and coral, breaking them down."]
      ];
      let k = 0;
      el.innerHTML = `<div class="widget-title">How carbonic acid 'steals' carbonate from shells</div><div id="scList"></div><div class="controls" style="justify-content:center"><button class="btn" data-a="n">Next step ▸</button><button class="btn ghost" data-a="r">Restart</button></div>`;
      const draw = () => {
        $("#scList", el).innerHTML = STEPS.map((s, i) => `<div style="display:${i <= k ? "grid" : "none"};grid-template-columns:34px 1fr;gap:10px;align-items:start;padding:8px 0;border-bottom:1px dashed var(--line);animation:pop .35s ease"><span class="step-dot" style="width:30px;height:30px;background:${i === k ? "var(--fill)" : "var(--surface)"};color:${i === k ? "#fff" : "var(--ink-2)"}">${i + 1}</span><div><div style="font-weight:700">${chem(s[0])}</div><div class="muted" style="font-size:.92rem">${s[1]}</div></div></div>`).join("") + (k >= STEPS.length - 1 ? `<p style="margin-top:8px">🐚 Result: shells and skeletons can't fully form, or begin to dissolve.</p>` : "");
        $('[data-a="n"]', el).disabled = k >= STEPS.length - 1;
      };
      $('[data-a="n"]', el).addEventListener("click", () => { k++; draw(); });
      $('[data-a="r"]', el).addEventListener("click", () => { k = 0; draw(); });
      draw();
    },

    rainScale(el) {
      const sx = (p) => 20 + (p / 14) * 560;
      el.innerHTML = `<div class="widget-title">Natural rain vs acid rain</div>
      <svg viewBox="0 0 600 120" role="img" aria-label="pH scale with acid rain below 5 and natural rain at 5.6">
        <defs><linearGradient id="rg">${PH_COLOURS.map((c, i) => `<stop offset="${(i / 14) * 100}%" stop-color="${c}"/>`).join("")}</linearGradient></defs>
        <rect x="20" y="50" width="560" height="22" rx="11" fill="url(#rg)"/>
        <rect x="20" y="44" width="${sx(5) - 20}" height="34" rx="8" fill="none" stroke="var(--acid)" stroke-width="3" stroke-dasharray="6 4"/>
        <text x="${(20 + sx(5)) / 2}" y="36" text-anchor="middle" font-weight="800" fill="var(--acid)">ACID RAIN (pH &lt; 5)</text>
        ${[[5.6, "natural rain 5.6"], [7, "neutral 7"], [8.2, "ocean 8.2"]].map(([p, t], i) => `<line x1="${sx(p)}" y1="44" x2="${sx(p)}" y2="84" stroke="var(--ink)" stroke-width="2"/><text x="${sx(p)}" y="${i === 1 ? 20 : 100}" text-anchor="middle" font-size="12" font-weight="700" class="svg-ink">${t}</text>`).join("")}
        ${[0, 2, 4, 6, 8, 10, 12, 14].map((p) => `<text x="${sx(p)}" y="116" font-size="10" text-anchor="middle" class="svg-ink2">${p}</text>`).join("")}
      </svg>`;
    },

    /* ---------- 11E ---------- */
    neutralFlask(el) {
      el.innerHTML = `<div class="widget-title">Acid + base → salt + water</div>
      <svg viewBox="0 0 420 220" role="img" aria-label="Acid at pH 1 and base at pH 14 mix to make pH 7 salt and water">
        <g transform="rotate(-25 90 60)"><rect x="30" y="45" width="120" height="30" rx="15" fill="var(--surface)" stroke="var(--ink-2)" stroke-width="2"/><rect x="34" y="49" width="70" height="22" rx="11" fill="var(--acid)"/></g>
        <g transform="rotate(25 330 60)"><rect x="270" y="45" width="120" height="30" rx="15" fill="var(--surface)" stroke="var(--ink-2)" stroke-width="2"/><rect x="316" y="49" width="70" height="22" rx="11" fill="var(--base)"/></g>
        <text x="60" y="118" font-weight="800" fill="var(--acid)">Acid · pH 1</text><text x="290" y="118" font-weight="800" fill="var(--base)">Base · pH 14</text>
        <path id="nfFill" d="M185 160 L165 200 Q163 206 170 206 H250 Q257 206 255 200 L235 160 Z" fill="var(--surface-2)" style="transition:fill .8s"/>
        <path d="M195 95 V150 L162 202 Q158 210 170 210 H250 Q262 210 258 202 L225 150 V95" class="svg-glass" stroke-width="3"/>
        <text id="nfTxt" x="210" y="80" text-anchor="middle" font-weight="800" class="svg-ink">?</text>
      </svg><div class="controls" style="justify-content:center"><button class="btn" data-a="mix">Mix them ▶</button></div>`;
      $('[data-a="mix"]', el).addEventListener("click", () => { $("#nfFill", el).setAttribute("fill", "#5cc46a"); $("#nfTxt", el).textContent = "pH 7 · salt + water"; });
    },

    reactionCards(el) {
      el.classList.remove("widget");
      el.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin:12px 0">
        ${[["🔩", "acid + metal", "salt + hydrogen gas", "Bubbles of H₂ · loud 'pop' with a lit match", "var(--acid-soft)"], ["🧁", "acid + metal carbonate", "salt + water + carbon dioxide", "Fizzing – bubbles of CO₂", "var(--warn-soft)"], ["⚗️", "acid + metal hydroxide", "salt + water", "No bubbles – no gas made (neutralisation)", "var(--base-soft)"]]
          .map(([i, a, b, o, c]) => `<div class="tile" style="background:${c}"><div style="font-size:1.8rem">${i}</div><b>${a}</b><br>→ <b>${b}</b><p class="muted" style="margin:6px 0 0;font-size:.88rem">${o}</p></div>`).join("")}</div>`;
    },

    spectator(el) {
      const EX = [
        { t: "Sulfuric acid + aluminium", l: [["6H^+(aq)", 0], ["3SO4^2-(aq)", 1], ["2Al(s)", 0]], r: [["2Al^3+(aq)", 0], ["3SO4^2-(aq)", 1], ["3H2(g)", 0]], net: "6H^+(aq) + 2Al(s) -> 2Al^3+(aq) + 3H2(g)" },
        { t: "Hydrochloric acid + calcium carbonate", l: [["CaCO3(s)", 0], ["2H^+(aq)", 0], ["2Cl^-(aq)", 1]], r: [["Ca^2+(aq)", 0], ["2Cl^-(aq)", 1], ["H2O(l)", 0], ["CO2(g)", 0]], net: "CaCO3(s) + 2H^+(aq) -> Ca^2+(aq) + H2O(l) + CO2(g)" },
        { t: "Nitric acid + sodium hydroxide solution", l: [["H^+(aq)", 0], ["NO3^-(aq)", 1], ["Na^+(aq)", 1], ["OH^-(aq)", 0]], r: [["Na^+(aq)", 1], ["NO3^-(aq)", 1], ["H2O(l)", 0]], net: "H^+(aq) + OH^-(aq) -> H2O(l)" }
      ];
      let k = 0;
      el.innerHTML = `<div class="widget-title">Spot the spectator ions</div><p style="margin:0 0 6px">Tap every ion you think is a <b>spectator</b> (same, in the same state, on both sides), then check.</p><div id="spT" style="font-weight:700"></div><div id="spEq" class="eq" style="white-space:normal;line-height:2.4"></div><div class="controls" style="justify-content:center"><button class="btn" data-a="c">Check</button><button class="btn ghost" data-a="n">Next example ▸</button></div><div id="spF"></div>`;
      const chip = (s, i, side) => `<button class="sp-chip" data-i="${side}${i}" style="border:2px solid var(--line);background:var(--surface);color:var(--ink);border-radius:10px;padding:2px 8px;margin:2px;font-size:1rem">${chem(s[0])}</button>`;
      const draw = () => {
        const e = EX[k];
        $("#spT", el).textContent = e.t;
        $("#spEq", el).innerHTML = e.l.map((s, i) => chip(s, i, "l")).join(" + ") + " → " + e.r.map((s, i) => chip(s, i, "r")).join(" + ");
        $("#spF", el).innerHTML = "";
        $$(".sp-chip", el).forEach((b) => b.addEventListener("click", () => { b.dataset.on = b.dataset.on ? "" : "1"; b.style.borderColor = b.dataset.on ? "var(--primary)" : "var(--line)"; b.style.background = b.dataset.on ? "var(--primary-soft)" : "var(--surface)"; }));
      };
      $('[data-a="c"]', el).addEventListener("click", () => {
        const e = EX[k]; let ok = true;
        $$(".sp-chip", el).forEach((b) => {
          const side = b.dataset.i[0], i = +b.dataset.i.slice(1), spec = (side === "l" ? e.l : e.r)[i][1];
          if (!!b.dataset.on !== !!spec) ok = false;
          if (spec) { b.style.textDecoration = "line-through"; b.style.opacity = ".5"; }
        });
        $("#spF", el).innerHTML = `<div class="feedback ${ok ? "ok" : "no"}">${ok ? "✅ Perfect!" : "💡 The crossed-out ions are the spectators."} Net ionic equation:<div class="eq">${chem(e.net)}</div></div>`;
      });
      $('[data-a="n"]', el).addEventListener("click", () => { k = (k + 1) % EX.length; draw(); });
      draw();
    },

    equationBuilder(el) {
      el.innerHTML = `<div class="widget-title">Equation builder – pick an acid and what it reacts with</div>
        <div class="field"><select id="ebA" aria-label="Acid">${Object.entries(ACIDS).map(([k, v]) => `<option value="${k}">${v.name} (${k.replace(/(\d)/g, (d) => "₀₁₂₃₄₅₆₇₈₉"[d])})</option>`).join("")}</select>
        <span style="font-weight:800">+</span>
        <select id="ebR" aria-label="Reactant">${["metal", "carbonate", "hydroxide"].map((kind) => `<optgroup label="${kind === "metal" ? "Metals" : kind === "carbonate" ? "Metal carbonates" : "Metal hydroxides"}">${Object.entries(REACTANTS).filter(([, v]) => v.kind === kind).map(([k, v]) => `<option value="${k}">${v.name}</option>`).join("")}</optgroup>`).join("")}</select></div>
        <div id="ebOut" style="margin-top:10px"></div>`;
      const upd = () => {
        const r = buildReaction($("#ebA", el).value, $("#ebR", el).value);
        $("#ebOut", el).innerHTML = `<div class="tile"><b>Pattern:</b> ${r.pattern}<br><b>Salt formed:</b> ${r.saltName}, ${chem(r.saltF)}<br><b>You'd see:</b> ${r.obs}</div>
          <p style="margin:10px 0 0"><b>Full balanced equation</b></p><div class="eq">${chem(r.full)}</div>
          <p style="margin:0"><b>Ionic equation</b> <span class="muted">(spectator ions removed: ${r.spect.map((s) => chem(s)).join(", ")})</span></p><div class="eq">${chem(r.ionic)}</div>`;
      };
      $$("select", el).forEach((s) => { s.style.cssText = "border:2px solid var(--line);border-radius:10px;padding:8px;background:var(--surface);color:var(--ink);max-width:100%"; s.addEventListener("change", upd); });
      upd();
    },

    antacid(el) {
      const AN = { "Mg(OH)2": ["2HCl(aq) + Mg(OH)2(s) -> MgCl2(aq) + 2H2O(l)", false], "Al(OH)3": ["3HCl(aq) + Al(OH)3(s) -> AlCl3(aq) + 3H2O(l)", false], NaHCO3: ["HCl(aq) + NaHCO3(s) -> NaCl(aq) + H2O(l) + CO2(g)", true], CaCO3: ["2HCl(aq) + CaCO3(s) -> CaCl2(aq) + H2O(l) + CO2(g)", true] };
      el.innerHTML = `<div class="widget-title">Antacid lab – neutralise the stomach acid</div>
        <div class="controls">${Object.keys(AN).map((k) => `<button class="btn base-b small" data-k="${k}">${chem(k)}</button>`).join("")}</div>
        <div style="display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:center">
          <svg viewBox="0 0 120 140" width="110" aria-hidden="true"><path d="M30 20 Q10 60 30 100 Q60 135 95 105 Q115 80 95 55 Q80 40 70 20Z" id="stom" fill="var(--acid)" opacity=".75" style="transition:fill .8s"/><g id="fizz" opacity="0"><circle cx="50" cy="70" r="4" fill="#fff"/><circle cx="65" cy="60" r="3" fill="#fff"/><circle cx="75" cy="80" r="5" fill="#fff"/></g></svg>
          <div id="anOut"><b>Heartburn!</b> Too much HCl (pH 1–2) has risen into the oesophagus. Choose an antacid ingredient.</div></div>`;
      $$("[data-k]", el).forEach((b) => b.addEventListener("click", () => {
        const [eq, gas] = AN[b.dataset.k];
        $("#stom", el).setAttribute("fill", "#5cc46a"); $("#fizz", el).setAttribute("opacity", gas ? 1 : 0);
        $("#anOut", el).innerHTML = `<div class="eq" style="font-size:.95rem">${chem(eq)}</div>${gas ? "acid + metal carbonate → salt + water + <b>carbon dioxide</b> (fizz!)" : "acid + metal hydroxide → salt + water"}. The acid is neutralised – pain relieved. 😌`;
      }));
    },

    crossover(el) {
      const CAT = [["Na", 1, "sodium"], ["K", 1, "potassium"], ["Mg", 2, "magnesium"], ["Ca", 2, "calcium"], ["Ba", 2, "barium"], ["Zn", 2, "zinc"], ["Cu", 2, "copper(II)"], ["Al", 3, "aluminium"]];
      const AN = [["Cl", 1, "chloride"], ["NO3", 1, "nitrate"], ["CH3COO", 1, "ethanoate"], ["OH", 1, "hydroxide"], ["SO4", 2, "sulfate"], ["CO3", 2, "carbonate"], ["PO4", 3, "phosphate"]];
      el.innerHTML = `<div class="widget-title">Crossover method</div>
        <div class="field"><select id="coC" aria-label="Cation">${CAT.map((c, i) => `<option value="${i}">${c[2]} (${c[0]}${c[1] > 1 ? c[1] : ""}+)</option>`).join("")}</select><select id="coA" aria-label="Anion">${AN.map((a, i) => `<option value="${i}">${a[2]} (${a[0]}${a[1] > 1 ? a[1] : ""}−)</option>`).join("")}</select></div>
        <svg viewBox="0 0 320 130" id="coSvg" style="max-width:360px"></svg><div id="coOut" class="feedback ok" style="text-align:center"></div>`;
      $$("select", el).forEach((s) => (s.style.cssText = "border:2px solid var(--line);border-radius:10px;padding:8px;background:var(--surface);color:var(--ink)"));
      const upd = () => {
        const c = CAT[$("#coC", el).value], a = AN[$("#coA", el).value];
        const s = saltFormula(c[0], c[1], a[0], a[1]);
        $("#coSvg", el).innerHTML = `<circle cx="90" cy="30" r="18" fill="none" stroke="var(--acid)" stroke-width="2"/><text x="90" y="35" text-anchor="middle" font-weight="800" fill="var(--acid)">${c[1]}+</text>
          <circle cx="230" cy="30" r="18" fill="none" stroke="var(--acid)" stroke-width="2"/><text x="230" y="35" text-anchor="middle" font-weight="800" fill="var(--acid)">${a[1]}−</text>
          <text x="90" y="75" text-anchor="middle" font-size="20" font-weight="700" class="svg-ink">${svgChem(c[0], 20)}</text><text x="230" y="75" text-anchor="middle" font-size="20" font-weight="700" class="svg-ink">${svgChem(a[0], 20)}</text>
          <path d="M100 46 Q160 120 222 98" fill="none" stroke="var(--acid)" stroke-width="2" marker-end="url(#coA2)"/><path d="M220 46 Q160 120 98 98" fill="none" stroke="var(--acid)" stroke-width="2" marker-end="url(#coA2)"/>
          <defs><marker id="coA2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0L10,5L0,10z" fill="var(--acid)"/></marker></defs>
          <text x="80" y="112" font-size="13" class="svg-ink2">× ${a[1]}</text><text x="226" y="112" font-size="13" class="svg-ink2">× ${c[1]}</text>`;
        $("#coOut", el).innerHTML = `${c[2]} ${a[2]} = <b style="font-size:1.2rem">${chem(s.f)}</b> &nbsp;<span class="muted">(${s.x} × ${c[1]}+ = ${s.x * c[1]}+, ${s.y} × ${a[1]}− = ${s.y * a[1]}− ✓)</span>`;
      };
      $$("select", el).forEach((s) => s.addEventListener("change", upd)); upd();
    },

    periodicCharges(el) {
      const G = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
      const CH = { 1: "+1", 2: "+2", 13: "+3", 15: "−3", 16: "−2", 17: "−1" };
      const HT = (g) => (g === 1 || g === 18 ? 150 : g === 2 || g >= 13 ? 125 : 85);
      el.innerHTML = `<div class="widget-title">Ions and the periodic table</div><svg viewBox="0 0 560 190" role="img" aria-label="Charges of ions by periodic table group">
        ${G.map((g, i) => { const x = 10 + i * 30, h2 = HT(g), y = 175 - h2; const hi = CH[g]; return `<rect x="${x}" y="${y}" width="28" height="${h2}" fill="${hi ? "var(--primary-soft)" : "var(--surface)"}" stroke="var(--primary)" stroke-width="1.2"/><text x="${x + 14}" y="${y - 5}" font-size="11" text-anchor="middle" class="svg-ink2">${g}</text>${hi ? `<text x="${x + 14}" y="128" font-size="12" font-weight="800" text-anchor="middle" fill="var(--primary)">${hi}</text>` : ""}`; }).join("")}
      </svg><p class="muted" style="font-size:.85rem;margin:0;text-align:center">Groups 1, 2, 13 form positive ions; groups 15, 16, 17 form negative ions.</p>`;
    }
  };

  /* ------------------------------------------------------------------
     Theme + boot
     ------------------------------------------------------------------ */
  function applyTheme() {
    if (S.theme) document.documentElement.setAttribute("data-theme", S.theme);
    else document.documentElement.removeAttribute("data-theme");
    const dark = S.theme ? S.theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    $("#themeBtn").textContent = dark ? "☀️" : "🌙";
  }

  function boot() {
    applyTheme();
    $("#themeBtn").addEventListener("click", () => {
      const dark = S.theme ? S.theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
      S.theme = dark ? "light" : "dark"; save(); applyTheme();
    });
    $$(".tab").forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));
    try { window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme); } catch (e) {}
    if (!isUnlocked(S.current)) S.current = "L0";
    renderJourney(); renderLesson(); renderQA(); renderGlossary(); setupChat(); updateProgress();
    if (TEACHER) toast("👩‍🏫 Teacher preview: everything unlocked");
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
