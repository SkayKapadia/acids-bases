/* =====================================================================
   Lessons follow the chapter journey: 11A → 11B → 11C → 11D → 11E.
   Placeholders inside lesson html:
     <div data-widget="name"></div>   interactive visual (app.js)
     <div data-wx="id"></div>          worked example stepper (WX below)
     <div data-checkin="id"></div>     check-in questions from qa.js
   ===================================================================== */

/* ---------- Worked examples (step-by-step) ---------- */
window.WX = {
  "11A-1": { title: "Worked example 11A–1: Identifying acids and bases in a reaction",
    problem: "Use the Brønsted–Lowry definition to identify the acid and the base: <span class='eq'>$HF(aq) + NH3(aq) -> F^-(aq) + NH4^+(aq)$</span>",
    steps: [
      ["Identify the reactant–product pairs.", "Two pairs: $HF -> F^-$ and $NH3 -> NH4^+$"],
      ["Has the pair lost an H<sup>+</sup>? → acid. Has it gained an H<sup>+</sup>? → base.", "$HF -> F^-$ lost H<sup>+</sup>, so <span class='acid'>HF is the acid</span>.<br>$NH3 -> NH4^+$ gained H<sup>+</sup>, so <span class='base'>NH<sub>3</sub> is the base</span>."]
    ] },
  "11A-2": { title: "Worked example 11A–2: Writing equations for acid–base reactions",
    problem: "Show how the reaction between water and nitric acid (HNO<sub>3</sub>) is a Brønsted–Lowry acid–base reaction.",
    steps: [
      ["Write the formulas of the reactants.", "$HNO3 + H2O$"],
      ["Transfer the H<sup>+</sup> from the acid (donor) to the base (acceptor).", "<span class='acid'>HNO<sub>3</sub></span> (acid) → H<sup>+</sup> → <span class='base'>H<sub>2</sub>O</span> (base)"],
      ["Write the products. Don't forget the charges!", "$NO3^- + H3O^+$<br><small>Losing H<sup>+</sup> makes neutral HNO<sub>3</sub> negative; gaining H<sup>+</sup> makes neutral H<sub>2</sub>O positive.</small>"],
      ["Write the overall balanced equation with states.", "$HNO3(aq) + H2O(l) -> NO3^-(aq) + H3O^+(aq)$<br><small>Brønsted–Lowry theory needs a protonated solvent such as water.</small>"]
    ] },
  "11A-3": { title: "Worked example 11A–3: Writing equations for acid–base reactions",
    problem: "Show how hydrochloric acid (HCl) and sodium hydroxide (NaOH) react as a Brønsted–Lowry acid–base reaction.",
    steps: [
      ["Write the formulas of the reactants.", "$HCl + NaOH$"],
      ["Transfer the H<sup>+</sup> from the acid to the base.", "<span class='acid'>HCl</span> gives H<sup>+</sup> to the <span class='base'>OH<sup>−</sup></span> of NaOH → $Cl^- + Na^+ + H2O$"],
      ["Write the products, including charges.", "HCl loses H<sup>+</sup> → Cl<sup>−</sup>; OH<sup>−</sup> gains H<sup>+</sup> → H<sub>2</sub>O"],
      ["Write the overall balanced equation with states.", "$HCl(aq) + NaOH(aq) -> H2O(l) + NaCl(aq)$<br><small>Na<sup>+</sup> and Cl<sup>−</sup> are written together as the soluble salt NaCl.</small>"]
    ] },
  "11A-4": { title: "Worked example 11A–4: Identifying conjugate acid–base pairs",
    problem: "Find the conjugate acid–base pair for (a) sulfuric acid, H<sub>2</sub>SO<sub>4</sub> and (b) the carbonate ion, CO<sub>3</sub><sup>2−</sup>.",
    steps: [
      ["(a) Is H<sub>2</sub>SO<sub>4</sub> an acid or a base?", "<span class='acid'>Acid</span> – so it donates (loses) one H<sup>+</sup>"],
      ["(a) Remove one H<sup>+</sup> and lower the charge by 1.", "$H2SO4 -> HSO4^-$ &nbsp;→ pair: <b>$H2SO4/HSO4^-$</b>"],
      ["(b) Is CO<sub>3</sub><sup>2−</sup> an acid or a base?", "<span class='base'>Base</span> – so it accepts (gains) one H<sup>+</sup>"],
      ["(b) Add one H<sup>+</sup> and raise the charge by 1.", "$CO3^2- -> HCO3^-$ &nbsp;→ pair: <b>$HCO3^-/CO3^2-$</b>"]
    ] },
  "11A-5": { title: "Worked example 11A–5: Equations involving amphiprotic substances",
    problem: "Write equations to show that the hydrogen carbonate ion (HCO<sub>3</sub><sup>−</sup>) is amphiprotic when it reacts with water.",
    steps: [
      ["Equation 1 – HCO<sub>3</sub><sup>−</sup> as an <span class='acid'>acid</span> (loses H<sup>+</sup> to water).", "$HCO3^-(aq) + H2O(l) <=> CO3^2-(aq) + H3O^+(aq)$"],
      ["Equation 2 – HCO<sub>3</sub><sup>−</sup> as a <span class='base'>base</span> (gains H<sup>+</sup> from water).", "$HCO3^-(aq) + H2O(l) <=> H2CO3(aq) + OH^-(aq)$"]
    ] },
  "11A-6": { title: "Worked example 11A–6: Equations involving triprotic substances",
    problem: "Show that phosphoric acid, H<sub>3</sub>PO<sub>4</sub>(aq), is triprotic, and list the conjugate pairs.",
    steps: [
      ["Step 1 – H<sub>3</sub>PO<sub>4</sub> donates its first H<sup>+</sup> to water.", "$H3PO4(aq) + H2O(l) <=> H2PO4^-(aq) + H3O^+(aq)$"],
      ["Step 2 – the product H<sub>2</sub>PO<sub>4</sub><sup>−</sup> donates another H<sup>+</sup>.", "$H2PO4^-(aq) + H2O(l) <=> HPO4^2-(aq) + H3O^+(aq)$"],
      ["Step 3 – HPO<sub>4</sub><sup>2−</sup> donates the final H<sup>+</sup>.", "$HPO4^2-(aq) + H2O(l) <=> PO4^3-(aq) + H3O^+(aq)$"],
      ["List the conjugate pairs.", "$H3PO4/H2PO4^-$, $H3O^+/H2O$, $H2PO4^-/HPO4^2-$, $HPO4^2-/PO4^3-$<br><small>H<sub>2</sub>PO<sub>4</sub><sup>−</sup> and HPO<sub>4</sub><sup>2−</sup> are also amphiprotic.</small>"]
    ] },
  "11C-1": { title: "Worked example 11C–1: Ion concentrations in a strong acid",
    problem: "For 0.025 M H<sub>2</sub>SO<sub>4</sub> at 25 °C, calculate (a) [H<sub>3</sub>O<sup>+</sup>] and (b) [OH<sup>−</sup>].",
    steps: [
      ["Strong acid or strong base?", "H<sub>2</sub>SO<sub>4</sub> = strong acid"],
      ["If acid: [acid] = [H<sub>3</sub>O<sup>+</sup>] (only for strong acids/bases that fully ionise).", "[H<sub>3</sub>O<sup>+</sup>] starts from [H<sub>2</sub>SO<sub>4</sub>] = 0.025 M"],
      ["Monoprotic or polyprotic? Multiply by the number of H<sup>+</sup> donated.", "Diprotic: [H<sub>3</sub>O<sup>+</sup>] = 0.025 × 2 = <b>0.050 M</b>"],
      ["Use K<sub>w</sub> to find the other ion.", "[OH<sup>−</sup>] = 10<sup>−14</sup> ÷ 0.050 = <b>2.0 × 10<sup>−13</sup> M</b>"]
    ] },
  "11C-2": { title: "Worked example 11C–2: Ion concentrations in a strong base",
    problem: "For 0.1 M Ba(OH)<sub>2</sub> at 25 °C, calculate (a) [H<sub>3</sub>O<sup>+</sup>] and (b) [OH<sup>−</sup>].",
    steps: [
      ["Strong acid or strong base?", "Ba(OH)<sub>2</sub> = strong base"],
      ["How many OH<sup>−</sup> per formula?", "Two: [OH<sup>−</sup>] = 2 × 0.1 = <b>0.2 M</b>"],
      ["Use K<sub>w</sub> to find [H<sub>3</sub>O<sup>+</sup>].", "[H<sub>3</sub>O<sup>+</sup>] = 10<sup>−14</sup> ÷ 0.2 = <b>5 × 10<sup>−14</sup> M</b>"]
    ] },
  "11C-3": { title: "Worked example 11C–3: pH of a strong acid",
    problem: "Calculate the pH of 0.0001 M HCl.",
    steps: [
      ["Strong acid or base?", "HCl = strong acid"],
      ["[acid] = [H<sub>3</sub>O<sup>+</sup>]", "[H<sub>3</sub>O<sup>+</sup>] = 0.0001 M = 1 × 10<sup>−4</sup> M"],
      ["pH = −log<sub>10</sub>[H<sub>3</sub>O<sup>+</sup>]", "pH = −log(1 × 10<sup>−4</sup>) = <b>4</b>"]
    ] },
  "11C-4": { title: "Worked example 11C–4: pH of a base (using K<sub>w</sub>)",
    problem: "Calculate the pH of 0.0001 M NaOH.",
    steps: [
      ["Strong acid or base?", "NaOH = base"],
      ["[base] = [OH<sup>−</sup>]", "[OH<sup>−</sup>] = 1 × 10<sup>−4</sup> M"],
      ["Find [H<sub>3</sub>O<sup>+</sup>] with K<sub>w</sub>.", "[H<sub>3</sub>O<sup>+</sup>] = 10<sup>−14</sup> ÷ 10<sup>−4</sup> = 1 × 10<sup>−10</sup> M"],
      ["pH = −log<sub>10</sub>[H<sub>3</sub>O<sup>+</sup>]", "pH = <b>10</b>"]
    ] },
  "11C-5": { title: "Worked example 11C–5: pH of a base (using pOH)",
    problem: "Calculate the pH of 5.0 × 10<sup>−6</sup> M Ba(OH)<sub>2</sub> at 25 °C.",
    steps: [
      ["Find [OH<sup>−</sup>]. Ba(OH)<sub>2</sub> gives two OH<sup>−</sup>.", "[OH<sup>−</sup>] = 2 × 5.0 × 10<sup>−6</sup> = 1.0 × 10<sup>−5</sup> M"],
      ["pOH = −log<sub>10</sub>[OH<sup>−</sup>]", "pOH = 5"],
      ["pH + pOH = 14", "pH = 14 − 5 = <b>9</b>"]
    ] },
  "11C-6": { title: "Worked example 11C–6: Ion concentrations from pH",
    problem: "Ammonia solution has pH 9 at 25 °C. Find [H<sub>3</sub>O<sup>+</sup>] and [OH<sup>−</sup>].",
    steps: [
      ["[H<sub>3</sub>O<sup>+</sup>] = 10<sup>−pH</sup>", "[H<sub>3</sub>O<sup>+</sup>] = <b>10<sup>−9</sup> M</b>"],
      ["Use K<sub>w</sub>.", "[OH<sup>−</sup>] = 10<sup>−14</sup> ÷ 10<sup>−9</sup> = <b>10<sup>−5</sup> M</b>"]
    ] },
  "11C-7": { title: "Worked example 11C–7: pH after dilution (from concentration)",
    problem: "20.0 mL of 0.050 M HCl is diluted to 100.0 mL. What is the pH?",
    steps: [
      ["c<sub>1</sub>V<sub>1</sub> = c<sub>2</sub>V<sub>2</sub> (same units on both sides).", "c<sub>2</sub> = 0.050 × 20.0 ÷ 100.0 = 5 × 10<sup>−4</sup> M"],
      ["Acid: [acid] = [H<sub>3</sub>O<sup>+</sup>]", "[H<sub>3</sub>O<sup>+</sup>] = 5 × 10<sup>−4</sup> M"],
      ["pH = −log<sub>10</sub>[H<sub>3</sub>O<sup>+</sup>]", "pH = <b>3.3</b>"]
    ] },
  "11C-8": { title: "Worked example 11C–8: pH after dilution (from initial pH)",
    problem: "50.0 mL of nitric acid at pH 1.0 is added to 250.0 mL of water. What is the new pH?",
    steps: [
      ["Initial concentration: [H<sub>3</sub>O<sup>+</sup>] = 10<sup>−pH</sup>", "10<sup>−1.0</sup> = 0.10 M"],
      ["c<sub>1</sub>V<sub>1</sub> = c<sub>2</sub>V<sub>2</sub> – remember V<sub>2</sub> is the TOTAL volume.", "V<sub>2</sub> = 50.0 + 250.0 = 300.0 mL<br>c<sub>2</sub> = 0.10 × 50.0 ÷ 300.0 = 0.0167 M"],
      ["Acid: [acid] = [H<sub>3</sub>O<sup>+</sup>]", "[H<sub>3</sub>O<sup>+</sup>] = 0.0167 M"],
      ["Final pH", "pH = −log(0.0167) = <b>1.8</b>"]
    ] },
  "11E-1": { title: "Worked example 11E–1: Acid + metal",
    problem: "Write a balanced equation for aqueous sulfuric acid added to aluminium.",
    steps: [
      ["Write the reactants.", "$H2SO4 + Al$"],
      ["Products: acid + metal → salt + hydrogen gas. Build the salt from the metal cation and acid anion (balance charges).", "$Al^3+$ + $SO4^2-$ → $Al2(SO4)3$; plus $H2$"],
      ["Write reactants and products.", "$H2SO4 + Al -> Al2(SO4)3 + H2$"],
      ["Add states (check solubility of the salt).", "$H2SO4(aq) + Al(s) -> Al2(SO4)3(aq) + H2(g)$"],
      ["Balance.", "$3H2SO4(aq) + 2Al(s) -> Al2(SO4)3(aq) + 3H2(g)$"]
    ] },
  "11E-2": { title: "Worked example 11E–2: Acid + metal – ionic equation",
    problem: "Write a balanced ionic equation for sulfuric acid reacting with aluminium.",
    steps: [
      ["Split dissolved (aq) ionic compounds into ions. (s), (l), (g) stay together.", "$H^+(aq) + SO4^2-(aq) + Al(s) -> Al^3+(aq) + SO4^2-(aq) + H2(g)$"],
      ["Cross out ions that appear unchanged on both sides – the <b>spectator ions</b>.", "<s>SO<sub>4</sub><sup>2−</sup>(aq)</s> on both sides"],
      ["Rewrite and balance (atoms AND charges).", "$6H^+(aq) + 2Al(s) -> 2Al^3+(aq) + 3H2(g)$<br><small>Total charge is 6+ on each side.</small>"]
    ] },
  "11E-3": { title: "Worked example 11E–3: Acid + metal carbonate",
    problem: "Write a balanced equation for aqueous nitric acid reacting with solid barium carbonate.",
    steps: [
      ["Write the reactants.", "$HNO3 + BaCO3$"],
      ["acid + metal carbonate → salt + water + carbon dioxide", "Salt: $Ba^2+$ + $NO3^-$ → $Ba(NO3)2$; plus $H2O$ and $CO2$"],
      ["Write it out.", "$HNO3 + BaCO3 -> H2O + CO2 + Ba(NO3)2$"],
      ["Add states.", "$HNO3(aq) + BaCO3(s) -> H2O(l) + CO2(g) + Ba(NO3)2(aq)$"],
      ["Balance.", "$2HNO3(aq) + BaCO3(s) -> H2O(l) + CO2(g) + Ba(NO3)2(aq)$"]
    ] },
  "11E-4": { title: "Worked example 11E–4: Acid + metal carbonate – ionic equation",
    problem: "Write a balanced ionic equation for hydrochloric acid reacting with solid calcium carbonate.",
    steps: [
      ["Split (aq) ionic compounds into ions.", "$CaCO3(s) + H^+(aq) + Cl^-(aq) -> Ca^2+(aq) + Cl^-(aq) + H2O(l) + CO2(g)$"],
      ["Cross out the spectator ions.", "<s>Cl<sup>−</sup>(aq)</s> on both sides"],
      ["Rewrite and balance.", "$CaCO3(s) + 2H^+(aq) -> Ca^2+(aq) + H2O(l) + CO2(g)$"]
    ] },
  "11E-5": { title: "Worked example 11E–5: Acid + metal hydroxide",
    problem: "Write a balanced equation for aqueous sulfuric acid reacting with solid potassium hydroxide.",
    steps: [
      ["Write the reactants.", "$H2SO4 + KOH$"],
      ["acid + metal hydroxide → salt + water", "Salt: $K^+$ + $SO4^2-$ → $K2SO4$; plus $H2O$"],
      ["Write it out.", "$H2SO4 + KOH -> H2O + K2SO4$"],
      ["Add states.", "$H2SO4(aq) + KOH(s) -> H2O(l) + K2SO4(aq)$"],
      ["Balance.", "$H2SO4(aq) + 2KOH(s) -> 2H2O(l) + K2SO4(aq)$"]
    ] },
  "11E-6": { title: "Worked example 11E–6: Acid + metal hydroxide – ionic equation",
    problem: "Write a balanced ionic equation for sulfuric acid reacting with solid potassium hydroxide.",
    steps: [
      ["Split (aq) ionic compounds into ions.", "$2H^+(aq) + SO4^2-(aq) + 2KOH(s) -> 2H2O(l) + 2K^+(aq) + SO4^2-(aq)$"],
      ["Cross out spectator ions.", "<s>SO<sub>4</sub><sup>2−</sup>(aq)</s> on both sides"],
      ["Rewrite – and simplify: every coefficient is 2, so divide by 2.", "$H^+(aq) + KOH(s) -> H2O(l) + K^+(aq)$"]
    ] }
};

/* ---------- Lessons ---------- */
window.LESSONS = [
/* =============================== L1 =============================== */
{
  id: "L1", code: "11A · Part 1", section: "11A", title: "Brønsted–Lowry acids & bases",
  blurb: "Acids give away protons, bases take them. Learn to spot who donates, who accepts, and the pairs they form.",
  goals: ["Define 'acid' and 'base' (Brønsted–Lowry)", "Write equations for acid–base reactions with water", "Identify conjugate acid–base pairs"],
  html: `
  <div class="card engage">
    <div class="box-label">🧠 Engage · Acids, bases and your body</div>
    <p>Your digestive system uses <b>both</b> acids and bases. Stomach acid has a pH between 1 and 2 – very acidic, strong enough to damage teeth. Further along, bile from the liver (stored in the gall bladder) is <b>alkaline</b> (basic) and neutralises the acidic food as it passes into the intestines. The stomach is protected from its own acid by a special mucous lining.</p>
    <div data-widget="bodyMap"></div>
  </div>

  <div class="card explain">
    <div class="box-label">💡 Explain · What are acids and bases?</div>
    <p>Here are some common acids and bases. What do all the acids have in common?</p>
    <div class="two-col">
      <div class="tile acid-t"><h4 class="acid">Common acids</h4>Hydrochloric acid $HCl$<br>Nitric acid $HNO3$<br>Sulfuric acid $H2SO4$<br>Ethanoic acid $CH3COOH$</div>
      <div class="tile base-t"><h4 class="base">Common bases</h4>Sodium hydroxide $NaOH$<br>Potassium hydroxide $KOH$<br>Barium hydroxide $Ba(OH)2$<br>Ammonia $NH3$</div>
    </div>
    <p style="margin-top:12px">Every acid contains <b>hydrogen (H) atoms</b>. Several of the bases are soluble ionic compounds, which dissociate (break into ions) in water.</p>

    <h3>The Brønsted–Lowry theory</h3>
    <p>In 1923 two scientists, <b>Johannes Brønsted</b> and <b>Thomas Lowry</b>, independently described acid–base reactions as the <b>transfer of protons</b>. A hydrogen ion, H<sup>+</sup>, is just a proton (a hydrogen atom that has lost its only electron).</p>
    <div class="def"><b>Acid</b> – a proton (H<sup>+</sup>) <b>donor</b>. pH less than 7 in water at 25 °C.</div>
    <div class="def"><b>Base</b> – a proton (H<sup>+</sup>) <b>acceptor</b>. pH between 8 and 14 in water at 25 °C.</div>
    <p>So an acid must have an H atom that can ionise to form H<sup>+</sup>, and a base must be able to accept an H<sup>+</sup>.</p>
    <p>Example: hydrogen chloride gas reacts with ammonia to form ammonium chloride. HCl <span class="acid">donates</span> a proton; NH<sub>3</sub> <span class="base">accepts</span> it.</p>
    <div data-widget="protonTransfer"></div>
    <div data-wx="11A-1"></div>
    <div data-wx="11A-2"></div>
    <div data-wx="11A-3"></div>

    <h3>Conjugate acid–base pairs</h3>
    <p>In every Brønsted–Lowry equation, each reactant and the product it becomes differ by <b>exactly one H<sup>+</sup> ion</b>. These are called <b>conjugate acid–base pairs</b>.</p>
    <div data-widget="conjugateDiagram"></div>
    <p>Pair 1 is <b>$HNO3/NO3^-$</b> and pair 2 is <b>$H3O^+/H2O$</b>. By convention we write the acid (the one with the extra H<sup>+</sup>) first.</p>
    <div class="note"><b>Remember:</b> acid − H<sup>+</sup> → conjugate base &nbsp;&nbsp;|&nbsp;&nbsp; conjugate base + H<sup>+</sup> → acid</div>
    <div data-wx="11A-4"></div>
    <div data-widget="protonLadder"></div>
  </div>
  <div data-checkin="11A-S1"></div>
  `,
  quiz: [
    { t: "mc", q: "According to Brønsted and Lowry, an acid is a…", o: ["proton (H⁺) donor", "proton (H⁺) acceptor", "hydroxide (OH⁻) donor", "electron donor"], a: 0, why: "Acids donate H⁺ ions (protons); bases accept them." },
    { t: "mc", q: "In $HF(aq) + NH3(aq) -> F^-(aq) + NH4^+(aq)$, which species is the base?", o: ["HF", "NH₃", "F⁻", "NH₄⁺"], a: 1, why: "NH₃ gains an H⁺ to become NH₄⁺, so it is the proton acceptor (base)." },
    { t: "mc", q: "What is the conjugate base of $H2SO4$?", o: ["$SO4^2-$", "$H3SO4^+$", "$HSO4^-$", "$H2SO4^-$"], a: 2, why: "Remove ONE H⁺ and lower the charge by 1: H₂SO₄ → HSO₄⁻." },
    { t: "mc", q: "What is the conjugate acid of the carbonate ion $CO3^2-$?", o: ["$HCO3^-$", "$H2CO3$", "$CO2$", "$HCO3^2-$"], a: 0, why: "Add ONE H⁺ and raise the charge by 1: CO₃²⁻ → HCO₃⁻." },
    { t: "mc", q: "Nitric acid reacts with water. The products are…", o: ["$NO3^- + OH^-$", "$NO3^- + H3O^+$", "$HNO3^+ + OH^-$", "$NO2 + H2O2$"], a: 1, why: "HNO₃ donates H⁺ to H₂O: HNO₃ + H₂O → NO₃⁻ + H₃O⁺." },
    { t: "mc", q: "Which of these is a conjugate acid–base pair?", o: ["$H2SO4/SO4^2-$", "$HCl/NaOH$", "$H3O^+/H2O$", "$NH4^+/NH2^-$"], a: 2, why: "A conjugate pair differs by exactly ONE H⁺. H₃O⁺ and H₂O differ by one H⁺; the others differ by two or are unrelated." }
  ]
},
/* =============================== L2 =============================== */
{
  id: "L2", code: "11A · Part 2", section: "11A", title: "Amphiprotic & polyprotic substances",
  blurb: "Some substances can play both roles, and some can give away more than one proton.",
  goals: ["Define 'amphiprotic' and 'polyprotic'", "Write equations for amphiprotic and polyprotic substances", "Work out the correct charge after gaining or losing H⁺"],
  html: `
  <div class="card explain">
    <div class="box-label">💡 Explain · Amphiprotic substances</div>
    <p>Some substances can either <b>donate OR accept</b> a proton. They are called <b>amphiprotic</b>. Water is the classic example – it behaves as whichever is needed by what it reacts with.</p>
    <div class="two-col">
      <div class="tile acid-t"><h4>Water acting as an <span class="acid">acid</span></h4><span class="eq">$H2O(l) + NH3(aq) <=> OH^-(aq) + NH4^+(aq)$</span>Pair: $H2O/OH^-$</div>
      <div class="tile base-t"><h4>Water acting as a <span class="base">base</span></h4><span class="eq">$H2O(l) + HCl(aq) <=> H3O^+(aq) + Cl^-(aq)$</span>Pair: $H3O^+/H2O$</div>
    </div>
    <div data-widget="amphiprotic"></div>
    <div data-wx="11A-5"></div>

    <h3>Polyprotic substances</h3>
    <p><b>Polyprotic</b> substances can donate (or accept) <b>more than one</b> proton per molecule.</p>
    <div class="table-wrap"><table class="t">
      <tr><th>Type</th><th>Protons to donate</th><th>Example</th></tr>
      <tr><td><b>Monoprotic</b></td><td>1</td><td>$HCl$, ethanoic acid $CH3COOH$ (only the H in –COOH)</td></tr>
      <tr><td><b>Diprotic</b></td><td>2 (two steps)</td><td>sulfuric acid $H2SO4$</td></tr>
      <tr><td><b>Triprotic</b></td><td>3 (three steps)</td><td>phosphoric acid $H3PO4$</td></tr>
    </table></div>
    <p>Polyprotic acids give up their protons <b>one at a time</b> – one step per proton.</p>
    <div data-widget="triproticStairs"></div>
    <div data-wx="11A-6"></div>
    <h4>Polyprotic bases</h4>
    <p>Bases can be polyprotic too. The phosphate ion, $PO4^3-$ (the final product above), can accept up to <b>three</b> protons, making it a polyprotic base.</p>
  </div>
  <div data-checkin="11A-S2"></div>
  <div class="card skills">
    <div class="box-label">🛠 11A Skills · Getting the charge right</div>
    <p>Every time a substance <b>loses</b> an H<sup>+</sup>, its charge goes <b>down by 1</b>. Every time it <b>gains</b> an H<sup>+</sup>, its charge goes <b>up by 1</b>.</p>
    <div class="two-col">
      <div class="tile"><b>Losing H<sup>+</sup> (acid)</b><br>$H2O$ (0) → $OH^-$ (1−)<br>$HPO4^2-$ (2−) → $PO4^3-$ (3−)</div>
      <div class="tile"><b>Gaining H<sup>+</sup> (base)</b><br>$H2O$ (0) → $H3O^+$ (1+)<br>$HPO4^2-$ (2−) → $H2PO4^-$ (1−)</div>
    </div>
    <div data-widget="chargeGame"></div>
  </div>
  <div data-checkin="11A-Q"></div>
  `,
  quiz: [
    { t: "mc", q: "An amphiprotic substance is one that…", o: ["can donate or accept a proton", "has more than one proton to donate", "is always neutral", "only reacts with water"], a: 0, why: "Amphiprotic = can act as an acid (donate H⁺) or a base (accept H⁺)." },
    { t: "mc", q: "Which acid is triprotic?", o: ["$HCl$", "$H2SO4$", "$CH3COOH$", "$H3PO4$"], a: 3, why: "Phosphoric acid H₃PO₄ can donate three protons, in three steps." },
    { t: "mc", q: "In $HCO3^-(aq) + H2O(l) <=> CO3^2-(aq) + H3O^+(aq)$, the hydrogen carbonate ion is acting as…", o: ["an acid", "a base", "a spectator ion", "a salt"], a: 0, why: "HCO₃⁻ loses an H⁺ to become CO₃²⁻ – it is donating a proton." },
    { t: "mc", q: "When $HPO4^2-$ donates an H⁺ ion it becomes…", o: ["$H2PO4^-$", "$PO4^3-$", "$PO4^2-$", "$HPO4^-$"], a: 1, why: "Lose H⁺ → charge drops by 1: 2− becomes 3−, giving PO₄³⁻." },
    { t: "mc", q: "Ethanoic acid, $CH3COOH$, has four H atoms. It is…", o: ["monoprotic", "diprotic", "triprotic", "tetraprotic"], a: 0, why: "Only the H on the –COOH group is donated, so ethanoic acid is monoprotic." },
    { t: "mc", q: "Which substance is BOTH amphiprotic AND polyprotic?", o: ["$HCO3^-$", "$H2PO4^-$", "$H3PO4$", "$HCl$"], a: 1, why: "H₂PO₄⁻ can donate two H⁺ (polyprotic) and can also accept an H⁺ (amphiprotic)." }
  ]
},
/* =============================== L3 =============================== */
{
  id: "L3", code: "11B", section: "11B", title: "Strong vs weak, concentrated vs dilute",
  blurb: "'Strong' and 'concentrated' are NOT the same thing. This is one of the most-tested ideas in the chapter.",
  goals: ["Define strong, weak, concentrated and dilute", "Recall common strong and weak acids and bases", "Write equations using → or ⇌ correctly", "Read particle diagrams of beakers"],
  html: `
  <div class="card engage">
    <div class="box-label">🧠 Engage · Acid or magic?</div>
    <p>100% sulfuric acid has a pH of about −12. "Magic acid" – a 1 : 1 mixture of fluorosulfuric acid ($HSO3F$) and antimony pentafluoride ($SbF5$) – is about 100 billion times stronger (around pH −23)! It was named in the 1960s when researchers found it could dissolve paraffin wax. Fluoroantimonic acid is 100 000 times stronger again (about pH −28). These <b>superacids</b> are so corrosive they're stored in Teflon containers.</p>
  </div>

  <div class="card explain">
    <div class="box-label">💡 Explain · Strong versus weak</div>
    <p>The <b>strength</b> of an acid or base is about how likely it is to lose (acid) or gain (base) a proton.</p>
    <div class="table-wrap"><table class="t">
      <tr><th>Strong acids</th><th>Weak acids</th><th>Strong bases</th><th>Weak bases</th></tr>
      <tr><td>Hydrochloric $HCl$</td><td>Ethanoic $CH3COOH$</td><td>Sodium hydroxide $NaOH$</td><td>Ammonia $NH3$</td></tr>
      <tr><td>Hydrobromic $HBr$</td><td>Methanoic $HCOOH$</td><td>Potassium hydroxide $KOH$</td><td>Sodium bicarbonate $NaHCO3$</td></tr>
      <tr><td>Hydroiodic $HI$</td><td>Carbonic $H2CO3$</td><td>Calcium hydroxide $Ca(OH)2$</td><td></td></tr>
      <tr><td>Nitric $HNO3$</td><td>Phosphoric $H3PO4$</td><td>Barium hydroxide $Ba(OH)2$</td><td></td></tr>
      <tr><td>Perchloric $HClO4$</td><td></td><td></td><td></td></tr>
      <tr><td>Sulfuric $H2SO4$</td><td></td><td></td><td></td></tr>
    </table></div>
    <div data-widget="sorter"></div>

    <h3>Strong and weak acids</h3>
    <div class="two-col">
      <div class="tile acid-t"><h4>Strong acids</h4>✔ Fully (100%) ionise<br>✔ EVERY molecule donates its H<sup>+</sup><br>✔ Only <b>products</b> present at the end (plus excess water)<br>✔ Full arrow →<span class="eq">$HCl(aq) + H2O(l) -> H3O^+(aq) + Cl^-(aq)$</span></div>
      <div class="tile"><h4>Weak acids</h4>✔ Partially ionise<br>✔ NOT every molecule donates H<sup>+</sup><br>✔ <b>Reactants AND products</b> present<br>✔ Reversible arrows ⇌<span class="eq">$CH3COOH(aq) + H2O(l) <=> CH3COO^-(aq) + H3O^+(aq)$</span></div>
    </div>
    <h3>Strong and weak bases</h3>
    <div class="two-col">
      <div class="tile base-t"><h4>Strong bases</h4>✔ Fully ionise – every base particle accepts an H<sup>+</sup><br>✔ Only products present<span class="eq">$Ba(OH)2(aq) -> Ba^2+(aq) + 2OH^-(aq)$</span></div>
      <div class="tile"><h4>Weak bases</h4>✔ Partially ionise – not every particle accepts an H<sup>+</sup><br>✔ Reactants and products present<span class="eq">$NH3(aq) + H2O(l) <=> NH4^+(aq) + OH^-(aq)$</span></div>
    </div>
  </div>
  <div data-checkin="11B-S1"></div>

  <div class="card explain">
    <div class="box-label">💡 Explain · Concentrated versus dilute</div>
    <p>Concentration is a <b>different idea</b> from strength. A <b>concentrated</b> solution has lots of solute in a given volume; a <b>dilute</b> solution has only a little.</p>
    <span class="eq"><i>c</i> = <i>n</i> ÷ <i>V</i> &nbsp;&nbsp; <small>c = concentration (mol L<sup>−1</sup> or M), n = amount (mol), V = volume (L)</small></span>
    <div class="two-col">
      <div class="tile"><b>Dilute:</b> 0.1 mol HCl in 250 mL water<br><i>c</i> = 0.1 ÷ 0.25 = <b>0.4 M</b></div>
      <div class="tile"><b>Concentrated:</b> 1 mol HCl in 250 mL water<br><i>c</i> = 1 ÷ 0.25 = <b>4.0 M</b></div>
    </div>
    <p style="margin-top:12px">An acid or base can be <b>strong OR weak</b> AND <b>concentrated OR dilute</b> – any combination. Try it:</p>
    <div data-widget="beakerSim"></div>
  </div>

  <div class="card skills">
    <div class="box-label">🛠 11B Skills · Strength vs concentration</div>
    <p><b>Strength</b> = how much it ionises. Look at the ratio <i>number of ions : number of reactant molecules</i>.</p>
    <div class="two-col">
      <div class="tile"><b>many : none</b> → <b>strong</b> (all ions, no reactant molecules)</div>
      <div class="tile"><b>few : many</b> → <b>weak</b> (a few ions, lots of reactant molecules)</div>
    </div>
    <p style="margin-top:12px"><b>Concentration</b> = ratio of <i>solute : solvent</i> (acid/base : water).</p>
    <div class="two-col">
      <div class="tile"><b>many : few</b> → <b>concentrated</b></div>
      <div class="tile"><b>few : many</b> → <b>dilute</b></div>
    </div>
    <div class="note"><b>Exam tip:</b> if a diagram shows ONLY ions and no neutral molecules, it is a <b>strong</b> acid (whether concentrated or dilute). If neutral molecules are still there, it's <b>weak</b>.</div>
  </div>
  <div data-checkin="11B-Q"></div>
  `,
  quiz: [
    { t: "mc", q: "A strong acid is one that…", o: ["has a high concentration", "ionises completely in water", "has many hydrogen atoms", "has a pH of exactly 0"], a: 1, why: "Strength = extent of ionisation. Strong acids donate ALL their H⁺ (100% ionised)." },
    { t: "mc", q: "Which of these is a WEAK acid?", o: ["$HNO3$", "$HCl$", "$CH3COOH$", "$H2SO4$"], a: 2, why: "Ethanoic acid CH₃COOH only partially ionises. The others are strong acids." },
    { t: "mc", q: "Which of these is a WEAK base?", o: ["$NaOH$", "$NH3$", "$KOH$", "$Ba(OH)2$"], a: 1, why: "Ammonia is a weak base – only some NH₃ molecules accept an H⁺." },
    { t: "num", q: "0.1 mol of HCl is dissolved in 250 mL of water. What is the concentration in M?", a: 0.4, tol: 0.01, unit: "M", why: "c = n ÷ V = 0.1 ÷ 0.250 = 0.4 M (convert mL to L!)." },
    { t: "mc", q: "When writing an equation for a WEAK acid reacting with water, you should use…", o: ["a full arrow →", "reversible arrows ⇌", "an equals sign =", "no arrow"], a: 1, why: "⇌ shows that both reactants and products are present (partial ionisation)." },
    { t: "mc", q: "A beaker diagram shows LOTS of ions and NO neutral acid molecules. The acid is…", o: ["weak and dilute", "weak and concentrated", "strong and concentrated", "strong and dilute"], a: 2, why: "Only ions = completely ionised = strong. Lots of particles = concentrated." },
    { t: "mc", q: "Can an acid be both strong AND dilute?", o: ["Yes – strength and concentration are different ideas", "No – strong acids are always concentrated", "Only if it is a base", "Only sulfuric acid"], a: 0, why: "Strength = ionisation; concentration = amount per volume. A small amount of HCl in lots of water is strong but dilute." }
  ]
},
/* =============================== L4 =============================== */
{
  id: "L4", code: "11C · Part 1", section: "11C", title: "The pH scale & ionic product of water",
  blurb: "Meet K<sub>w</sub> – the rule that links [H₃O⁺] and [OH⁻] in every water solution.",
  goals: ["Use the pH scale to rank solutions", "Use K<sub>w</sub> = [H₃O⁺][OH⁻] = 10⁻¹⁴ M² at 25 °C", "Calculate ion concentrations in strong acids and bases"],
  html: `
  <div class="card engage">
    <div class="box-label">🧠 Engage · Beware – corrosive!</div>
    <p>Highly corrosive chemicals have a pH <b>lower than 2 or higher than 12</b>. 'Corrosive' means it causes irreversible damage to a surface – on skin, a 'chemical burn'. Sulfuric acid in car batteries has a pH of about 0.5 and can cause severe burns. Knowing the pH tells us how to safely handle and store a substance – that's why containers and trucks carry Hazchem signs.</p>
    <div data-widget="hazchem"></div>
  </div>

  <div class="card explain">
    <div class="box-label">💡 Explain · The pH scale</div>
    <p>The pH scale usually runs from <b>0 (highly acidic)</b> through <b>7 (neutral)</b> to <b>14 (highly alkaline/basic)</b> for water solutions at 25 °C. Drag the slider to explore.</p>
    <div data-widget="phSlider"></div>

    <h3>Ionic product of water, K<sub>w</sub></h3>
    <p>Water is amphiprotic, so it can react with <b>itself</b> – one water molecule acts as an acid and another as a base (self-ionisation):</p>
    <span class="eq">$H2O(l) + H2O(l) <=> H3O^+(aq) + OH^-(aq)$</span>
    <div class="note"><b>Note:</b> the reversible arrow shows water is a weak acid and a weak base – it only partially ionises.</div>
    <span class="eq"><i>K</i><sub>w</sub> = [H<sub>3</sub>O<sup>+</sup>][OH<sup>−</sup>] = 1.00 × 10<sup>−14</sup> M<sup>2</sup> at 25 °C</span>
    <p>Square brackets [ ] mean "molar concentration of". 25 °C is treated as standard room temperature. In ANY water solution at 25 °C, [H<sub>3</sub>O<sup>+</sup>] × [OH<sup>−</sup>] always equals 10<sup>−14</sup> – if one goes up, the other goes down.</p>
    <div class="table-wrap"><table class="t">
      <tr><th>Solution</th><th>[H<sub>3</sub>O<sup>+</sup>]</th><th></th><th>[OH<sup>−</sup>]</th><th>Check</th></tr>
      <tr><td><b>Neutral</b></td><td>10<sup>−7</sup> M</td><td>=</td><td>10<sup>−7</sup> M</td><td>10<sup>−7</sup> × 10<sup>−7</sup> = 10<sup>−14</sup></td></tr>
      <tr><td class="acid">Acidic</td><td>&gt; 10<sup>−7</sup> M (e.g. 10<sup>−1</sup>)</td><td>&gt;</td><td>&lt; 10<sup>−7</sup> M (e.g. 10<sup>−13</sup>)</td><td>10<sup>−1</sup> × 10<sup>−13</sup> = 10<sup>−14</sup></td></tr>
      <tr><td class="base">Basic</td><td>&lt; 10<sup>−7</sup> M (e.g. 10<sup>−12</sup>)</td><td>&lt;</td><td>&gt; 10<sup>−7</sup> M (e.g. 10<sup>−2</sup>)</td><td>10<sup>−12</sup> × 10<sup>−2</sup> = 10<sup>−14</sup></td></tr>
    </table></div>
    <h3>Ion concentrations in strong acids and bases</h3>
    <p>For <b>strong</b> acids/bases only (they fully ionise): [acid] = [H<sub>3</sub>O<sup>+</sup>] and [base] = [OH<sup>−</sup>]. If it's polyprotic, multiply by the number of H<sup>+</sup> donated (or OH<sup>−</sup> present).</p>
    <div data-wx="11C-1"></div>
    <div data-wx="11C-2"></div>
  </div>
  <div class="card skills">
    <div class="box-label">🛠 11C Skills · Index laws</div>
    <div class="two-col">
      <div class="tile"><b>Rule 1 – Multiplying:</b> add the powers<br>10<sup>−8</sup> × 10<sup>−6</sup> = 10<sup>−14</sup></div>
      <div class="tile"><b>Rule 2 – Dividing:</b> subtract the powers<br>10<sup>−14</sup> ÷ 10<sup>−6</sup> = 10<sup>−8</sup></div>
    </div>
    <div class="tile" style="margin-top:12px"><b>Rule 3 – Power of 0:</b> anything (not 0) to the power 0 is 1. So if pH = 0, [H<sub>3</sub>O<sup>+</sup>] = 10<sup>0</sup> = 1 M.</div>
    <p style="margin-top:12px">Practice is the key – write the formula out every time you use it.</p>
  </div>
  <div data-checkin="11C-S1"></div>
  `,
  quiz: [
    { t: "mc", q: "The ionic product of water, K<sub>w</sub>, at 25 °C is…", o: ["1.00 × 10⁻⁷ M²", "1.00 × 10⁻¹⁴ M²", "14 M²", "7 M²"], a: 1, why: "K_w = [H₃O⁺][OH⁻] = 1.00 × 10⁻¹⁴ M² at 25 °C." },
    { t: "mc", q: "In an ACIDIC solution at 25 °C…", o: ["[H₃O⁺] > 10⁻⁷ M", "[H₃O⁺] < 10⁻⁷ M", "[OH⁻] > 10⁻⁷ M", "[H₃O⁺] = [OH⁻]"], a: 0, why: "Acidic solutions have more H₃O⁺ than neutral water (10⁻⁷ M), so [OH⁻] must be less than 10⁻⁷ M." },
    { t: "num", q: "What is [H₃O⁺] in 0.025 M H₂SO₄ (a strong, diprotic acid)? Answer in M.", a: 0.05, tol: 0.001, unit: "M", why: "Diprotic: [H₃O⁺] = 2 × 0.025 = 0.050 M." },
    { t: "mc", q: "What is [OH⁻] in 0.1 M Ba(OH)₂?", o: ["0.05 M", "0.1 M", "0.2 M", "1 × 10⁻¹³ M"], a: 2, why: "Each Ba(OH)₂ gives two OH⁻: 2 × 0.1 = 0.2 M." },
    { t: "mc", q: "If [H₃O⁺] = 10⁻³ M, then [OH⁻] = …", o: ["10⁻³ M", "10⁻⁷ M", "10⁻¹¹ M", "10⁻¹⁷ M"], a: 2, why: "[OH⁻] = 10⁻¹⁴ ÷ 10⁻³ = 10⁻¹¹ M (subtract the powers)." },
    { t: "mc", q: "Highly corrosive substances have a pH…", o: ["between 6 and 8", "lower than 2 or higher than 12", "exactly 7", "between 4 and 10"], a: 1, why: "Very low or very high pH substances are corrosive." }
  ]
},
/* =============================== L5 =============================== */
{
  id: "L5", code: "11C · Part 2", section: "11C", title: "Calculating pH, pOH & dilutions",
  blurb: "The calculations you WILL be tested on. Master the flow chart and you can solve any of them.",
  goals: ["Calculate pH = −log₁₀[H₃O⁺] for strong acids and bases", "Use pOH and pH + pOH = 14", "Find [H₃O⁺] from pH", "Calculate pH after dilution (c₁V₁ = c₂V₂)"],
  html: `
  <div class="card explain">
    <div class="box-label">💡 Explain · Calculating pH</div>
    <p><b>pH</b> stands for 'potential of hydrogen'. It measures the hydronium ion concentration:</p>
    <span class="eq">pH = −log<sub>10</sub>[H<sub>3</sub>O<sup>+</sup>]</span>
    <div class="note"><b>Notes:</b> using log<sub>10</sub> keeps numbers manageable (no powers of 10). A change of <b>1 pH unit = 10× change</b> in [H<sub>3</sub>O<sup>+</sup>] – lemon juice (pH 3) has <b>100 times</b> the [H<sub>3</sub>O<sup>+</sup>] of tomatoes (pH 5). On your calculator use <b>log</b> (log<sub>10</sub>), NOT ln. pH has <b>no units</b>.</div>
    <div class="table-wrap"><table class="t">
      <tr><th>Solution</th><th>pH</th><th>[H<sub>3</sub>O<sup>+</sup>] (M)</th><th>pOH</th><th>[OH<sup>−</sup>] (M)</th></tr>
      <tr><td>1.0 M HCl</td><td>0</td><td>1</td><td>14</td><td>10<sup>−14</sup></td></tr>
      <tr><td>Stomach acid</td><td>1</td><td>10<sup>−1</sup></td><td>13</td><td>10<sup>−13</sup></td></tr>
      <tr><td>Lemon juice</td><td>2</td><td>10<sup>−2</sup></td><td>12</td><td>10<sup>−12</sup></td></tr>
      <tr><td>Vinegar</td><td>3</td><td>10<sup>−3</sup></td><td>11</td><td>10<sup>−11</sup></td></tr>
      <tr><td>Saliva</td><td>6</td><td>10<sup>−6</sup></td><td>8</td><td>10<sup>−8</sup></td></tr>
      <tr><td>Deionised water</td><td>7</td><td>10<sup>−7</sup></td><td>7</td><td>10<sup>−7</sup></td></tr>
      <tr><td>Baking soda</td><td>8</td><td>10<sup>−8</sup></td><td>6</td><td>10<sup>−6</sup></td></tr>
      <tr><td>Soap</td><td>9</td><td>10<sup>−9</sup></td><td>5</td><td>10<sup>−5</sup></td></tr>
      <tr><td>Household bleach</td><td>13</td><td>10<sup>−13</sup></td><td>1</td><td>10<sup>−1</sup></td></tr>
      <tr><td>1.0 M NaOH</td><td>14</td><td>10<sup>−14</sup></td><td>0</td><td>1</td></tr>
    </table></div>
    <div data-wx="11C-3"></div>
    <div data-wx="11C-4"></div>

    <h3>pH and pOH</h3>
    <p>For bases it's handy to use <b>pOH</b>, which measures hydroxide ions:</p>
    <span class="eq">pOH = −log<sub>10</sub>[OH<sup>−</sup>] &nbsp;&nbsp;&nbsp; [H<sub>3</sub>O<sup>+</sup>] × [OH<sup>−</sup>] = 10<sup>−14</sup> M<sup>2</sup> &nbsp;&nbsp;&nbsp; <b>pH + pOH = 14</b></span>
    <div data-wx="11C-5"></div>

    <h3>pH → concentration</h3>
    <p>If you know the pH, reverse it: <b>[H<sub>3</sub>O<sup>+</sup>] = 10<sup>−pH</sup></b> (and [OH<sup>−</sup>] = 10<sup>−pOH</sup>).</p>
    <p>Use this flow chart to plan any pH calculation – click a box to see what it means:</p>
    <div data-widget="flowChart"></div>
    <div data-wx="11C-6"></div>
    <div data-widget="phPractice"></div>
  </div>
  <div class="card explain">
    <div class="box-label">💡 Explain · Dilutions</div>
    <p>When water is added, the number of moles stays the same but the volume increases:</p>
    <span class="eq"><i>c</i><sub>1</sub><i>V</i><sub>1</sub> = <i>c</i><sub>2</sub><i>V</i><sub>2</sub></span>
    <p>c<sub>1</sub> = starting concentration, V<sub>1</sub> = starting volume, c<sub>2</sub> = final concentration, V<sub>2</sub> = final (total) volume.</p>
    <div class="note"><b>Note:</b> any units work (e.g. mL) as long as you use the <b>same units on both sides</b>.</div>
    <div data-widget="dilution"></div>
    <div data-wx="11C-7"></div>
    <div data-wx="11C-8"></div>
  </div>
  <div data-checkin="11C-S2"></div>
  `,
  quiz: [
    { t: "num", q: "Calculate the pH of 0.0001 M HCl.", a: 4, tol: 0.05, unit: "", why: "[H₃O⁺] = 1 × 10⁻⁴ M → pH = −log(10⁻⁴) = 4." },
    { t: "num", q: "Calculate the pH of 0.0001 M NaOH at 25 °C.", a: 10, tol: 0.05, unit: "", why: "[OH⁻] = 10⁻⁴ → pOH = 4 → pH = 14 − 4 = 10." },
    { t: "mc", q: "At 25 °C, pH + pOH equals…", o: ["7", "10⁻¹⁴", "14", "1"], a: 2, why: "pH + pOH = 14 at 25 °C." },
    { t: "mc", q: "A solution has pH 9. What is [H₃O⁺]?", o: ["9 M", "10⁻⁹ M", "10⁻⁵ M", "10⁹ M"], a: 1, why: "[H₃O⁺] = 10⁻ᵖᴴ = 10⁻⁹ M." },
    { t: "num", q: "20.0 mL of 0.050 M HCl is diluted to 100.0 mL. What is the pH? (1 decimal place)", a: 3.3, tol: 0.06, unit: "", why: "c₂ = 0.050 × 20.0 ÷ 100.0 = 5 × 10⁻⁴ M → pH = 3.3." },
    { t: "mc", q: "Lemon juice is pH 3 and tomatoes are pH 5. Lemon juice has how many times the [H₃O⁺]?", o: ["2 times", "10 times", "100 times", "1000 times"], a: 2, why: "2 pH units = 10 × 10 = 100 times." },
    { t: "num", q: "Calculate the pH of 5.0 × 10⁻⁶ M Ba(OH)₂ at 25 °C.", a: 9, tol: 0.05, unit: "", why: "[OH⁻] = 2 × 5.0 × 10⁻⁶ = 1.0 × 10⁻⁵ → pOH = 5 → pH = 9." }
  ]
},
/* =============================== L6 =============================== */
{
  id: "L6", code: "11C · Part 3", section: "11C", title: "Indicators, pH meters & accuracy",
  blurb: "How do we actually measure pH? Colour-changing indicators and digital pH meters.",
  goals: ["Explain what an indicator is and how it works", "Compare natural indicators, commercial indicators and pH meters", "Use an indicator table to predict colours", "Recall the difference between accuracy and precision"],
  html: `
  <div class="card explain">
    <div class="box-label">💡 Explain · Acid–base indicators</div>
    <p>An <b>indicator</b> changes colour in the presence of an acid or a base. Most indicators are themselves <b>weak acids or bases</b> whose conjugate is a different colour.</p>
    <p>Universal indicator paper contains a <b>mixture</b> of indicators – it gives a <i>qualitative</i> colour that you match to a scale to get an approximate pH number.</p>
    <h3>Phenolphthalein</h3>
    <p>Phenolphthalein ($C20H14O4$) is a water-soluble, polar organic compound and a <b>weak acid</b>. The acid form is <b>colourless</b> (pH 0–8); its conjugate base ion ($C20H13O4^-$) is <b>pink</b> (pH 8–14). In a basic solution [H<sub>3</sub>O<sup>+</sup>] is low, so more of the pink conjugate base forms.</p>
    <span class="eq">$C20H14O4 + OH^-(aq) <=> C20H13O4^- + H2O(l)$ &nbsp; colourless (acid) ⇌ pink (base)</span>
    <div data-widget="phenol"></div>
    <h3>Commercial indicators</h3>
    <p>Each commercial indicator changes colour over a <b>specific pH range</b>. You will have this table in your assessments and must choose suitable indicators.</p>
    <div data-widget="indicatorExplorer"></div>
    <h3>Natural indicators</h3>
    <p><b>Natural indicators</b> occur in nature. Hydrangea flowers change colour with the soil pH – gardeners make soil <b>basic for pink</b> flowers and <b>acidic for blue</b> flowers. Lichens contain <b>litmus</b> – red in acid, blue in base – which is used to make litmus paper.</p>
    <div data-widget="naturalTable"></div>
    <h3>Digital pH meters</h3>
    <p>pH meters give a quick, accurate, portable, <b>quantitative</b> reading (a number) – useful for testing water samples and soils in the field. They must be <b>calibrated</b> by measuring solutions of known pH (e.g. a pH 7 standard). This minimises <b>systematic errors</b> – readings that are off from the true value in the same direction every time.</p>
    <div class="two-col">
      <div class="tile"><b>Indicators (natural & commercial)</b><br>Qualitative – give a colour → a pH <i>range</i>. Can be accurate but less precise.</div>
      <div class="tile"><b>pH meter</b><br>Quantitative – gives a single number. More precise. Needs calibration for accuracy.</div>
    </div>
  </div>
  <div class="card skills">
    <div class="box-label">🛠 11C Skills · Accuracy versus precision</div>
    <p><b>Accuracy</b> – how close a measurement is to the <b>true value</b>. Instruments that aren't calibrated correctly give inaccurate results, so accuracy is closely linked to digital pH meters.</p>
    <p><b>Precision</b> – how close repeated measurements are to <b>each other</b>. Indicators can give precise results (same colour every time) that are <b>not</b> necessarily accurate.</p>
    <div data-widget="targets"></div>
  </div>
  <div data-checkin="11C-S3"></div>
  <div data-checkin="11C-Q"></div>
  `,
  quiz: [
    { t: "mc", q: "Phenolphthalein is added to a solution with pH 10. Its colour is…", o: ["colourless", "pink", "yellow", "blue"], a: 1, why: "Phenolphthalein is colourless → pink over pH 8.3–10.0." },
    { t: "mc", q: "Methyl orange changes red → yellow over pH 3.1–4.4. At pH 2 it is…", o: ["red", "yellow", "orange", "colourless"], a: 0, why: "pH 2 is below the range, so it shows the lower-pH colour: red." },
    { t: "mc", q: "Litmus in an acid turns…", o: ["blue", "purple", "red", "green"], a: 2, why: "Litmus is red in acid and blue in base." },
    { t: "mc", q: "Which gives a quantitative (single number) pH measurement?", o: ["universal indicator paper", "red cabbage juice", "a pH meter", "litmus paper"], a: 2, why: "Indicators give a colour (qualitative range); a pH meter gives a number." },
    { t: "mc", q: "Calibrating a pH meter helps to minimise…", o: ["systematic errors", "the pH", "the temperature", "precision"], a: 0, why: "Calibration with known standards corrects readings that are consistently off in one direction (systematic error)." },
    { t: "mc", q: "Precision describes…", o: ["how close a value is to the true value", "how close repeated measurements are to each other", "the number of decimal places on the meter", "the colour of an indicator"], a: 1, why: "Precision = closeness of measurements to each other. Accuracy = closeness to the true value." },
    { t: "mc", q: "Bromothymol blue changes yellow → blue over pH 6.0–7.6. At pH 9 it is…", o: ["yellow", "green", "blue", "red"], a: 2, why: "pH 9 is above the range, so it shows the higher-pH colour: blue." }
  ]
},
/* =============================== L7 =============================== */
{
  id: "L7", code: "11D", section: "11D", title: "Carbon dioxide as a weak acid",
  blurb: "How CO₂ makes rain slightly acidic, lowers ocean pH, and 'steals' carbonate from shells.",
  goals: ["Write the equation for CO₂ forming carbonic acid", "Explain why carbonic acid is a weak, diprotic acid", "Link rising CO₂ to falling ocean pH and shell damage", "Distinguish natural rain acidity from acid rain"],
  html: `
  <div class="card engage">
    <div class="box-label">🧠 Engage · The greenhouse gas that is acidifying the oceans</div>
    <p>CO<sub>2</sub> is the main greenhouse gas from human activity (burning fossil fuels) and can remain in the atmosphere for hundreds of years. Less well known: CO<sub>2</sub> forms an <b>acid</b> when dissolved in water. According to NASA, the oceans absorb about <b>25%</b> of the CO<sub>2</sub> produced from burning fossil fuels – making the oceans more acidic. The ocean is a huge <b>carbon sink</b>.</p>
  </div>
  <div class="card explain">
    <div class="box-label">💡 Explain · Sources of carbon dioxide</div>
    <p>CO<sub>2</sub> is a natural, essential part of ecosystems. Plants use it in <b>photosynthesis</b> to make glucose:</p>
    <span class="eq">$6CO2(g) + 6H2O(l) -> C6H12O6(aq) + 6O2(g)$ &nbsp;(light)</span>
    <div data-widget="carbonCycle"></div>
    <p>CO<sub>2</sub> is a <b>greenhouse gas</b> – it traps heat in the atmosphere. It is a by-product of complete combustion. Burning coal, gas and oil, plus clearing forests, are the main reasons CO<sub>2</sub> levels keep rising.</p>

    <h3>Carbon dioxide in the ocean</h3>
    <p>Most CO<sub>2</sub> stays in the atmosphere, but about 25% is absorbed by the ocean. Ocean water is naturally slightly basic, about <b>pH 8.2</b>. Measurements in the North Pacific show that as atmospheric CO<sub>2</sub> has risen, sea water pH has fallen.</p>
    <div data-widget="oceanTrend"></div>
    <p>Why? CO<sub>2</sub> reacts with water to form <b>carbonic acid</b>, a weak acid:</p>
    <span class="eq">$H2O(l) + CO2(g) <=> H2CO3(aq)$</span>
    <p>Carbonic acid is <b>weak and diprotic</b>, so it reacts further with water to produce hydronium ions:</p>
    <span class="eq">$H2CO3(aq) + H2O(l) <=> HCO3^-(aq) + H3O^+(aq)$<br>$HCO3^-(aq) + H2O(l) <=> CO3^2-(aq) + H3O^+(aq)$</span>
    <p>More H<sub>3</sub>O<sup>+</sup> means a lower pH. Surface ocean pH has dropped by about <b>0.1</b>. Because pH is <b>logarithmic</b>, this is about a <b>30% increase in acidity</b>.</p>
    <div data-widget="oceanSlider"></div>

    <h3>Impacts of ocean acidity</h3>
    <p>Lower pH reduces the concentration of <b>carbonate ions</b> ($CO3^2-$) and of <b>aragonite</b> (a source of calcium carbonate). Coral and shellfish combine carbonate ions with calcium ions to build their shells and skeletons. With less carbonate, they can't fully form shells; if the water is acidic enough, shells start to <b>dissolve</b>, leaving animals open to predators – and affecting animals further up the food chain.</p>
    <span class="eq">$H^+(aq) + CaCO3(s) <=> HCO3^-(aq) + Ca^2+(aq)$</span>
    <p>Scientists predict that if ocean pH drops to <b>7.8</b>, carbonate ion concentration would fall by <b>50%</b>. In short, carbonic acid from dissolved CO<sub>2</sub> <b>'steals'</b> the carbonate marine organisms need.</p>
    <div data-widget="shellChain"></div>

    <h3>Acid rain</h3>
    <p>Rain isn't perfectly neutral either – it dissolves atmospheric CO<sub>2</sub> and is naturally slightly acidic, about <b>pH 5.6</b>. To count as <b>acid rain</b>, the pH must be <b>below 5</b>. A main cause is burning fossil fuels, which releases acidic gases ($NO2$, $SO2$, $CO2$). These are carried by wind and react with water to form acids, e.g.</p>
    <span class="eq">$3NO2(g) + H2O(l) -> 2HNO3(aq) + NO(g)$</span>
    <p>Acid rain pollutes water and soil and destroys plants. Earth's water cycle is a closed system – water that is already slightly acidic evaporates, picks up more CO<sub>2</sub> and impurities, and can make acid rain more likely.</p>
    <div data-widget="rainScale"></div>
  </div>
  <div class="card skills">
    <div class="box-label">🛠 11D Skills · Other implications of ocean acidity</div>
    <p>Organisms exposed to lower pH for their whole lives would show bigger effects – mollusc shells could completely dissolve, reducing food for fish, birds and marine mammals. Not all bad news: algae and seagrasses may benefit from more CO<sub>2</sub> for photosynthesis.</p>
    <div class="two-col">
      <div class="tile">🦪 <b>Food security</b> – fewer oysters and mussels, costing fisheries and businesses billions.</div>
      <div class="tile">🪸 <b>Sheltering of land</b> – coral reefs protect shorelines from storms and cyclones.</div>
      <div class="tile">🤿 <b>Tourism</b> – snorkelling and diving, e.g. on the Great Barrier Reef, would decline.</div>
      <div class="tile">🎣 <b>Fishing industry</b> – possible new limits if species become endangered.</div>
    </div>
  </div>
  <div data-checkin="11D-Q"></div>
  `,
  quiz: [
    { t: "mc", q: "Which equation shows CO₂ forming an acid in water?", o: ["$H2O(l) + CO2(g) <=> H2CO3(aq)$", "$CO2(g) + O2(g) -> CO3(aq)$", "$CO2(g) + H2(g) -> HCOOH(aq)$", "$CO2(g) -> C(s) + O2(g)$"], a: 0, why: "CO₂ dissolves in water forming carbonic acid, H₂CO₃ (a weak acid)." },
    { t: "mc", q: "The natural pH of ocean water is about…", o: ["5.6", "7.0", "8.2", "10.5"], a: 2, why: "Ocean water is naturally slightly basic, around pH 8.2." },
    { t: "mc", q: "To be classed as ACID RAIN, rain must have a pH…", o: ["below 7", "below 5", "of exactly 5.6", "above 8"], a: 1, why: "Natural rain is about pH 5.6; acid rain is below pH 5." },
    { t: "mc", q: "Ocean pH has dropped by about 0.1. This is roughly…", o: ["a 1% increase in acidity", "a 10% increase in acidity", "a 30% increase in acidity", "no real change"], a: 2, why: "pH is logarithmic: 10^0.1 ≈ 1.26, about a 30% increase in [H⁺] (acidity)." },
    { t: "mc", q: "Extra H⁺ ions in the ocean reduce the concentration of…", o: ["carbonate ions, CO₃²⁻", "oxygen gas", "sodium ions", "water"], a: 0, why: "H⁺ reacts with carbonate (and CaCO₃) forming HCO₃⁻, leaving less carbonate for shells." },
    { t: "mc", q: "Aragonite is…", o: ["a greenhouse gas", "a source of calcium carbonate", "a type of acid rain", "a natural indicator"], a: 1, why: "Aragonite is a source of calcium carbonate in the ocean." },
    { t: "mc", q: "Approximately what fraction of CO₂ from burning fossil fuels is absorbed by the oceans?", o: ["5%", "25%", "50%", "90%"], a: 1, why: "About 25% (NASA data)." }
  ]
},
/* =============================== L8 =============================== */
{
  id: "L8", code: "11E · Part 1", section: "11E", title: "Reactions of acids",
  blurb: "Three reaction patterns to memorise – then write full AND ionic equations with states.",
  goals: ["Recall: acid + metal / metal carbonate / metal hydroxide", "Build the salt from the metal cation and the acid anion", "Write balanced full equations with states", "Write ionic equations by removing spectator ions"],
  html: `
  <div class="card engage">
    <div class="box-label">🧠 Engage · What's that fizzing?</div>
    <p>Wizz Fizz sherbet tastes sweet and sour and fizzes on your tongue. It contains <b>citric acid</b> and <b>sodium hydrogen carbonate</b>. When they react on your tongue, bubbles of <b>carbon dioxide</b> are produced – it's a neutralisation reaction. (Acids typically taste sour!)</p>
  </div>
  <div class="card explain">
    <div class="box-label">💡 Explain · Neutralisation reactions</div>
    <p>A <b>neutralisation reaction</b> is an acid reacting with a base. The products – <b>water and a salt</b> – are neutral.</p>
    <span class="eq"><span class="acid">H<sup>+</sup>(aq)</span> + <span class="base">OH<sup>−</sup>(aq)</span> → H<sub>2</sub>O(l)</span>
    <div data-widget="neutralFlask"></div>
    <p>A <b>salt</b> is an ionic compound made of cations and anions. In neutralisation, the <b>cation comes from the base</b> and the <b>anion comes from the acid</b>:</p>
    <span class="eq"><span class="acid">H</span><span class="acid">A</span> + <span class="base">B</span><span class="base">OH</span> → <span class="base">B</span><span class="acid">A</span> + H<sub>2</sub>O &nbsp;&nbsp; <small>acid + base → salt + water</small></span>

    <h3>Reactions of acids</h3>
    <p>Strictly, only acid + metal hydroxide (alkaline) is a true neutralisation – but we study three types of acid reactions:</p>
    <div data-widget="reactionCards"></div>

    <h3>1. Acid + metal → salt + hydrogen gas</h3>
    <span class="eq">$2HCl(aq) + Mg(s) -> MgCl2(aq) + H2(g)$</span>
    <p>When HCl is added to magnesium ribbon: bubbles form rapidly, it gets warmer, the magnesium seems to disappear, and the gas gives a <b>loud pop</b> with a lit match (the test for hydrogen).</p>
    <div data-wx="11E-1"></div>
    <div data-wx="11E-2"></div>
    <div data-widget="spectator"></div>

    <h3>2. Acid + metal carbonate → salt + water + carbon dioxide</h3>
    <span class="eq">$C4H6O6(aq) + 2NaHCO3(s) -> Na2C4H4O6(aq) + 2H2O(l) + 2CO2(g)$</span>
    <p>Self-raising flour contains tartaric acid ($C4H6O6$) and sodium hydrogen carbonate. In the oven they react to make CO<sub>2</sub> bubbles that make the cake <b>rise</b>.</p>
    <div data-wx="11E-3"></div>
    <div data-wx="11E-4"></div>

    <h3>3. Acid + metal hydroxide → salt + water</h3>
    <p>Metal hydroxides usually act as bases, so this IS a neutralisation reaction. <b>No bubbling</b> – no gas is produced.</p>
    <div data-wx="11E-5"></div>
    <div data-wx="11E-6"></div>
    <div data-widget="equationBuilder"></div>
  </div>
  <div data-checkin="11E-S1"></div>
  `,
  quiz: [
    { t: "mc", q: "Acid + metal → …", o: ["salt + water", "salt + hydrogen gas", "salt + water + carbon dioxide", "base + water"], a: 1, why: "Metals react with acids to give a salt and hydrogen gas (bubbles; 'pop' test)." },
    { t: "mc", q: "Acid + metal carbonate → …", o: ["salt + hydrogen gas", "salt + water", "salt + water + carbon dioxide", "metal + carbonic acid"], a: 2, why: "Carbonates produce a salt, water AND carbon dioxide gas." },
    { t: "mc", q: "What are the products of $2HCl(aq) + Mg(s)$?", o: ["$MgCl2(aq) + H2(g)$", "$MgCl2(aq) + H2O(l)$", "$MgH2(s) + Cl2(g)$", "$MgCl(aq) + H2(g)$"], a: 0, why: "Acid + metal → salt + H₂. Mg²⁺ + 2Cl⁻ → MgCl₂." },
    { t: "mc", q: "What salt forms when nitric acid reacts with barium carbonate?", o: ["$BaNO3$", "$Ba(NO3)2$", "$Ba2NO3$", "$BaCO3$"], a: 1, why: "Ba²⁺ and NO₃⁻: two nitrate ions balance one Ba²⁺ → Ba(NO₃)₂." },
    { t: "mc", q: "In $H2SO4(aq) + Al(s)$, which ion is the spectator ion?", o: ["$H^+$", "$Al^3+$", "$SO4^2-$", "$H2$"], a: 2, why: "Sulfate appears unchanged as (aq) on both sides – it doesn't take part." },
    { t: "num", q: "Balance: _H₂SO₄ + 2Al → Al₂(SO₄)₃ + _H₂. What is the coefficient of H₂?", a: 3, tol: 0, unit: "", why: "3H₂SO₄ + 2Al → Al₂(SO₄)₃ + 3H₂ (6 H atoms on each side)." },
    { t: "mc", q: "A gas collected from acid + metal gives a 'loud pop' with a lit match. The gas is…", o: ["carbon dioxide", "oxygen", "hydrogen", "chlorine"], a: 2, why: "The 'pop' test identifies hydrogen gas." }
  ]
},
/* =============================== L9 =============================== */
{
  id: "L9", code: "11E · Part 2", section: "11E", title: "Antacids & ionic formulas",
  blurb: "Neutralisation in your body – and the skill of writing correct ionic formulas every time.",
  goals: ["Explain how antacids neutralise stomach acid", "Recall common antacid ingredients", "Write correct salt formulas using charges from the periodic table"],
  html: `
  <div class="card explain">
    <div class="box-label">💡 Explain · Neutralisation reactions in the body</div>
    <p>Stomach acid is <b>hydrochloric acid (HCl)</b>, a strong acid. It helps break down proteins, destroys bacteria and gives the right conditions for the enzyme <b>pepsin</b>. But if acid rises into the <b>oesophagus</b>, it irritates the lining, causing a burning chest pain called <b>heartburn</b>.</p>
    <p>The fix? A neutralisation reaction! <b>Antacids</b> contain at least one of these basic ingredients:</p>
    <div class="two-col">
      <div class="tile base-t">• magnesium hydroxide $Mg(OH)2$<br>• aluminium hydroxide $Al(OH)3$</div>
      <div class="tile base-t">• sodium bicarbonate $NaHCO3$<br>• calcium carbonate $CaCO3$</div>
    </div>
    <p style="margin-top:12px">They neutralise stomach acid, taking away the pain. Using the acid reaction rules:</p>
    <span class="eq">acid + metal carbonate: &nbsp;$2HCl(aq) + CaCO3(s) -> CaCl2(aq) + H2O(l) + CO2(g)$</span>
    <span class="eq">acid + metal hydroxide: &nbsp;$2HCl(aq) + Mg(OH)2(s) -> MgCl2(aq) + 2H2O(l)$</span>
    <div data-widget="antacid"></div>
  </div>
  <div data-checkin="11E-S2"></div>
  <div class="card skills">
    <div class="box-label">🛠 11E Skills · Correct formulas for ionic compounds</div>
    <p>Every acid reaction makes an <b>ionic salt</b>. A correct formula has <b>no overall charge</b> – electrons lost by the cations = electrons gained by the anions. Two ways to check:</p>
    <p><b>1. Electron transfer diagram</b> (as in Chapter 4A), e.g. Na gives one electron to Cl → Na<sup>+</sup>Cl<sup>−</sup>.</p>
    <p><b>2. Valency table and the crossover method</b> – swap the charge numbers to become the subscripts.</p>
    <div data-widget="crossover"></div>
    <p>You won't always have a valency table, so use the <b>periodic table</b>: the group tells you the ion's charge.</p>
    <div data-widget="periodicCharges"></div>
  </div>
  <div data-checkin="11E-Q"></div>
  `,
  quiz: [
    { t: "mc", q: "Stomach acid is…", o: ["ethanoic acid", "hydrochloric acid", "sulfuric acid", "carbonic acid"], a: 1, why: "The stomach produces hydrochloric acid, HCl – a strong acid." },
    { t: "mc", q: "Which is NOT an antacid ingredient listed in the chapter?", o: ["$Mg(OH)2$", "$Al(OH)3$", "$NaCl$", "$CaCO3$"], a: 2, why: "NaCl is a neutral salt – it can't neutralise acid." },
    { t: "mc", q: "Heartburn happens when…", o: ["bile enters the stomach", "stomach acid rises into the oesophagus", "the stomach becomes basic", "too much water is drunk"], a: 1, why: "Acid moving up into the oesophagus irritates its lining." },
    { t: "mc", q: "The ionic equation for ANY strong acid reacting with a soluble hydroxide is…", o: ["$H^+(aq) + OH^-(aq) -> H2O(l)$", "$H2(g) + O2(g) -> H2O(l)$", "$Na^+(aq) + Cl^-(aq) -> NaCl(s)$", "$H3O^+(aq) -> H2O(l) + H^+(aq)$"], a: 0, why: "All the other ions are spectators; only H⁺ and OH⁻ react to form water." },
    { t: "mc", q: "Using crossover, the formula of aluminium sulfate (Al³⁺, SO₄²⁻) is…", o: ["$AlSO4$", "$Al3(SO4)2$", "$Al2(SO4)3$", "$Al(SO4)3$"], a: 2, why: "Swap the charges: Al gets 2, SO₄ gets 3 → Al₂(SO₄)₃ (2 × 3+ = 6+, 3 × 2− = 6−)." },
    { t: "mc", q: "Elements in group 2 of the periodic table form ions with charge…", o: ["+1", "+2", "−2", "+3"], a: 1, why: "Group 1 → +1, group 2 → +2, group 13 → +3, group 15 → −3, 16 → −2, 17 → −1." },
    { t: "mc", q: "In $2HCl(aq) + CaCO3(s) -> CaCl2(aq) + H2O(l) + CO2(g)$, the gas that makes antacid tablets fizz is…", o: ["hydrogen", "oxygen", "carbon dioxide", "chlorine"], a: 2, why: "Acid + carbonate releases carbon dioxide gas." }
  ]
}
];

/* Extra auto-marked questions for the FINAL TEST, converted from the
   chapter's own section/check-in questions. tag = lesson id for feedback. */
window.FINAL_EXTRA = [
  { tag: "L1", t: "mc", q: "In $H2O(l) + CN^-(aq) -> OH^-(aq) + HCN(aq)$, which species is the ACID?", o: ["$CN^-$", "$H2O$", "$OH^-$", "$HCN$ only"], a: 1, why: "H₂O loses an H⁺ to become OH⁻, so water is the proton donor (acid)." },
  { tag: "L1", t: "mc", q: "Identify the conjugate pairs in $Ba(OH)2 + 2HCl -> BaCl2 + 2H2O$.", o: ["$HCl/Cl^-$ and $H2O/OH^-$", "$HCl/BaCl2$ and $Ba(OH)2/H2O$", "$H3O^+/H2O$ and $HCl/Cl^-$", "$Ba^2+/Ba(OH)2$ only"], a: 0, why: "HCl loses H⁺ → Cl⁻; OH⁻ gains H⁺ → H₂O." },
  { tag: "L2", t: "mc", q: "The phosphate ion $PO4^3-$ is best described as a…", o: ["monoprotic acid", "triprotic base", "diprotic acid", "monoprotic base"], a: 1, why: "PO₄³⁻ can accept three H⁺ ions: → HPO₄²⁻ → H₂PO₄⁻ → H₃PO₄." },
  { tag: "L2", t: "mc", q: "Which ion is an example of a DIPROTIC base?", o: ["$HSO4^-$", "$CO3^2-$", "$H2PO4^-$", "$PO4^3-$"], a: 1, why: "CO₃²⁻ can accept two H⁺: → HCO₃⁻ → H₂CO₃." },
  { tag: "L2", t: "mc", q: "Hydrogen sulfide, $H2S$, is a…", o: ["monoprotic acid", "diprotic acid", "triprotic acid", "diprotic base"], a: 1, why: "It has two H⁺ ions it can donate." },
  { tag: "L1", t: "mc", q: "Which of the following is NOT a Brønsted–Lowry acid–base reaction?", o: ["$2NH3 + H2SO4 <=> (NH4)2SO4$", "$O^2- + H2O <=> 2OH^-$", "$HSO4^- + H2O <=> H3O^+ + SO4^2-$", "$Zn(s) + H2SO4(aq) <=> ZnSO4(aq) + H2(g)$"], a: 3, why: "Zinc + acid is an acid + metal reaction – no H⁺ is transferred to a base." },
  { tag: "L2", t: "mc", q: "In which equation is $HCO3^-$ acting as an ACID?", o: ["$HCO3^- + H2O <=> H2CO3 + OH^-$", "$HCO3^- + H3O^+ <=> H2CO3 + H2O$", "$HCO3^- + H2O <=> CO3^2- + H3O^+$", "$HCO3^- + OH^- <=> H2CO3 + O^2-$"], a: 2, why: "It loses H⁺ to become CO₃²⁻ – proton donor." },
  { tag: "L3", t: "mc", q: "Which best describes a weak acid?", o: ["contains only one H atom", "has low concentration", "is dilute", "dissociates only partially in water"], a: 3, why: "Weak = partial ionisation." },
  { tag: "L3", t: "mc", q: "A beaker contains MANY neutral acid molecules and only a FEW ions. The solution is…", o: ["strong and concentrated", "weak and concentrated", "strong and dilute", "weak and dilute"], a: 1, why: "Neutral molecules remain (few : many) → weak. Lots of particles → concentrated." },
  { tag: "L3", t: "mc", q: "Which equation correctly represents methanoic acid (a weak acid) in water?", o: ["$HCOOH(aq) + H2O(l) -> HCOO^-(aq) + H3O^+(aq)$", "$HCOOH(aq) + H2O(l) <=> HCOO^-(aq) + H3O^+(aq)$", "$HCOOH(aq) -> HCOO^-(aq) + OH^-(aq)$", "$HCOOH(aq) + H2O(l) <=> HCOOH2^+(aq) + OH^-(aq)$"], a: 1, why: "Weak acid donates H⁺ to water, reversibly (⇌)." },
  { tag: "L3", t: "mc", q: "Methylamine, $CH3NH2$, is a weak base. Its reaction with water is…", o: ["$CH3NH2 + H2O <=> CH3NH3^+ + OH^-$", "$CH3NH2 + H2O -> CH3NH^- + H3O^+$", "$CH3NH2 + H2O <=> CH3NH^- + H3O^+$", "$CH3NH2 -> CH3^+ + NH2^-$"], a: 0, why: "A base accepts H⁺ from water, forming OH⁻ (reversible because weak)." },
  { tag: "L4", t: "mc", q: "For 0.0001 M HNO₃, [OH⁻] is…", o: ["1 × 10⁻⁴ M", "1 × 10⁻⁷ M", "1 × 10⁻¹⁰ M", "1 × 10⁻¹⁴ M"], a: 2, why: "[H₃O⁺] = 10⁻⁴, so [OH⁻] = 10⁻¹⁴ ÷ 10⁻⁴ = 10⁻¹⁰ M." },
  { tag: "L4", t: "mc", q: "For 0.05 M Ca(OH)₂, [H₃O⁺] is…", o: ["2 × 10⁻¹³ M", "1 × 10⁻¹³ M", "5 × 10⁻² M", "1 × 10⁻¹ M"], a: 1, why: "[OH⁻] = 2 × 0.05 = 0.10 M; [H₃O⁺] = 10⁻¹⁴ ÷ 0.10 = 10⁻¹³ M." },
  { tag: "L5", t: "num", q: "Calculate the pH of 0.013 M HCl (2 decimal places).", a: 1.89, tol: 0.02, unit: "", why: "pH = −log(0.013) = 1.89." },
  { tag: "L5", t: "num", q: "Calculate the pH of 0.0109 M NaOH (2 decimal places).", a: 12.04, tol: 0.02, unit: "", why: "pOH = −log(0.0109) = 1.96 → pH = 12.04." },
  { tag: "L5", t: "num", q: "Calculate the pH of 0.12 M Mg(OH)₂ (2 decimal places).", a: 13.38, tol: 0.02, unit: "", why: "[OH⁻] = 0.24 M → pOH = 0.62 → pH = 13.38." },
  { tag: "L5", t: "num", q: "Calculate the pH of 0.060 M H₂SO₄ (2 decimal places).", a: 0.92, tol: 0.02, unit: "", why: "[H₃O⁺] = 2 × 0.060 = 0.12 M → pH = 0.92." },
  { tag: "L5", t: "num", q: "A 9.0 mL solution with pH 2.1 is diluted to 90 mL. What is the new pH?", a: 3.1, tol: 0.05, unit: "", why: "10× dilution of an acid raises pH by 1 → 3.1." },
  { tag: "L5", t: "num", q: "2475 mL of water is added to 25.0 mL of a solution with pH 0.12. What is the new pH?", a: 2.12, tol: 0.03, unit: "", why: "Total 2500 mL = 100× dilution → pH rises by 2 → 2.12." },
  { tag: "L5", t: "num", q: "What volume of water (mL) must be added to 30 mL of HNO₃ at pH 3 to make it pH 5?", a: 2970, tol: 5, unit: "mL", why: "100× dilution: V₂ = 3000 mL, so add 3000 − 30 = 2970 mL." },
  { tag: "L5", t: "num", q: "Determine the pH of 10 g of NaOH dissolved in 40 mL of water (2 decimal places).", a: 14.8, tol: 0.03, unit: "", why: "n = 0.25 mol, c = 6.25 M → pOH = −0.80 → pH = 14.80." },
  { tag: "L5", t: "num", q: "Determine the pH of a 250 mL solution containing 0.160 g of dissolved HNO₃ (2 d.p.).", a: 1.99, tol: 0.03, unit: "", why: "n = 0.160 ÷ 63.0 = 2.54 × 10⁻³ mol; c = 0.0102 M → pH = 1.99." },
  { tag: "L5", t: "num", q: "Determine the pH of a 50 mL solution containing 0.060 g of dissolved NaOH (2 d.p.).", a: 12.48, tol: 0.03, unit: "", why: "n = 1.5 × 10⁻³ mol; c = 0.030 M → pOH = 1.52 → pH = 12.48." },
  { tag: "L6", t: "mc", q: "A 1.00 g sample of Ba(OH)₂ in 100.0 mL has pH 13.07. Bromophenol blue (yellow → blue, pH 3.0–4.6) would be…", o: ["yellow", "green", "blue", "colourless"], a: 2, why: "pH 13 is above the range → the higher-pH colour, blue." },
  { tag: "L6", t: "mc", q: "Beaker C: phenolphthalein pink, cabbage green, methyl red yellow. Beaker C contains…", o: ["acid", "water", "base", "salt solution only"], a: 2, why: "Pink phenolphthalein (pH > 8.3) and green cabbage are base colours." },
  { tag: "L6", t: "mc", q: "Red cabbage indicator in a solution of pH 12 would be…", o: ["pink/red", "purple", "green/yellow", "blue"], a: 2, why: "Red cabbage is green/yellow in base." },
  { tag: "L6", t: "mc", q: "Methyl red (red → yellow, 4.4–6.2) in a solution of pH 1 is…", o: ["red", "yellow", "orange", "pink"], a: 0, why: "Below the range → red." },
  { tag: "L7", t: "mc", q: "Why is a drop in ocean pH from 8.2 to 8.1 a concern?", o: ["pH is logarithmic, so [H⁺] increases by about 30%", "It means the ocean is now acidic (below 7)", "It increases carbonate ions", "It makes the water warmer"], a: 0, why: "10^0.1 ≈ 1.26 – about 30% more H⁺, which removes carbonate needed for shells." },
  { tag: "L7", t: "mc", q: "How does carbonic acid affect oyster shells?", o: ["H⁺ ions react with carbonate, so less is available to build shells", "It adds extra calcium to shells", "It makes shells grow faster", "It has no effect"], a: 0, why: "H⁺ + CaCO₃ ⇌ HCO₃⁻ + Ca²⁺ – carbonate is 'stolen'." },
  { tag: "L7", t: "mc", q: "The equation for photosynthesis is…", o: ["$6CO2 + 6H2O -> C6H12O6 + 6O2$", "$C6H12O6 + 6O2 -> 6CO2 + 6H2O$", "$CO2 + H2O <=> H2CO3$", "$2H2 + O2 -> 2H2O$"], a: 0, why: "Plants use light to convert CO₂ and water into glucose and oxygen." },
  { tag: "L8", t: "mc", q: "Complete: $Zn(s) + 2HNO3(aq) ->$", o: ["$Zn(NO3)2(aq) + H2(g)$", "$ZnNO3(aq) + H2(g)$", "$Zn(NO3)2(aq) + H2O(l)$", "$ZnO(s) + 2NO2(g)$"], a: 0, why: "Acid + metal → salt + hydrogen. Zn²⁺ + 2NO₃⁻ → Zn(NO₃)₂." },
  { tag: "L8", t: "mc", q: "Balanced equation for magnesium hydroxide + phosphoric acid:", o: ["$3Mg(OH)2 + 2H3PO4 -> Mg3(PO4)2 + 6H2O$", "$Mg(OH)2 + H3PO4 -> MgPO4 + 2H2O$", "$2Mg(OH)2 + H3PO4 -> Mg2PO4 + 4H2O$", "$3Mg(OH)2 + 2H3PO4 -> Mg3(PO4)2 + 3H2$"], a: 0, why: "Mg²⁺ + PO₄³⁻ → Mg₃(PO₄)₂; 6 H⁺ + 6 OH⁻ → 6H₂O." },
  { tag: "L8", t: "mc", q: "Acid rain ($H2SO4$) reacts with marble ($CaCO3$). The spectator ion is…", o: ["$Ca^2+$", "$SO4^2-$", "$H^+$", "$CO3^2-$"], a: 1, why: "Sulfate is unchanged on both sides." },
  { tag: "L8", t: "mc", q: "The ionic equation for $MgCO3(s) + 2HCl(aq)$ is…", o: ["$MgCO3(s) + 2H^+(aq) -> Mg^2+(aq) + H2O(l) + CO2(g)$", "$H^+(aq) + OH^-(aq) -> H2O(l)$", "$Mg^2+(aq) + 2Cl^-(aq) -> MgCl2(aq)$", "$MgCO3(s) + 2Cl^-(aq) -> MgCl2(aq) + CO3^2-(aq)$"], a: 0, why: "Cl⁻ is the spectator; the solid carbonate stays together." },
  { tag: "L8", t: "mc", q: "What causes the 'fizz' when eating sherbet?", o: ["Carbon dioxide from citric acid + sodium hydrogen carbonate", "Hydrogen gas from the sugar", "Oxygen released by saliva", "Steam from heat"], a: 0, why: "Acid + carbonate → salt + water + CO₂ bubbles." },
  { tag: "L9", t: "num", q: "Balance: Al(OH)₃ + _HCl → AlCl₃ + 3H₂O. What is the coefficient of HCl?", a: 3, tol: 0, unit: "", why: "Al(OH)₃ + 3HCl → AlCl₃ + 3H₂O." },
  { tag: "L9", t: "mc", q: "The salt formed when copper(II) reacts with phosphoric acid is…", o: ["$CuPO4$", "$Cu3(PO4)2$", "$Cu2(PO4)3$", "$Cu(PO4)2$"], a: 1, why: "Cu²⁺ and PO₄³⁻ crossover → Cu₃(PO₄)₂." },
  { tag: "L9", t: "mc", q: "The salt formed when copper(II) reacts with ethanoic acid is…", o: ["$CuCH3COO$", "$Cu(CH3COO)2$", "$Cu2CH3COO$", "$Cu(CH3COOH)2$"], a: 1, why: "Cu²⁺ needs two CH₃COO⁻ ions → Cu(CH₃COO)₂, copper(II) ethanoate." }
];
