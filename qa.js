/* =====================================================================
   Every question from the chapter (check-ins, section questions and the
   chapter review), each with a worked answer.
   Chemistry inside $...$ is auto-formatted: H2SO4 -> H₂SO₄, ^2- -> ²⁻,
   -> becomes →, <=> becomes ⇌.
   ===================================================================== */
window.QA = [
  /* ---------------------------- 11A ---------------------------- */
  {
    id: "11A-S1", section: "11A", title: "11A Check-in questions – Set 1",
    items: [
      { n: "1", q: "Write a definition of a Brønsted–Lowry acid, using HCl as an example.",
        a: "A Brønsted–Lowry acid is a <b>proton (H<sup>+</sup>) donor</b>. HCl is an acid because it donates an H<sup>+</sup> ion, e.g. to water: <span class='eq'>$HCl(aq) + H2O(l) -> Cl^-(aq) + H3O^+(aq)$</span>HCl loses H<sup>+</sup> and becomes Cl<sup>−</sup>." },
      { n: "2", q: "Write a definition of a Brønsted–Lowry base, using NH3 as an example.",
        a: "A Brønsted–Lowry base is a <b>proton (H<sup>+</sup>) acceptor</b>. NH<sub>3</sub> is a base because it accepts an H<sup>+</sup> ion to become NH<sub>4</sub><sup>+</sup>, e.g. <span class='eq'>$HCl(g) + NH3(g) -> NH4Cl(s)$</span>NH<sub>3</sub> gains H<sup>+</sup> → NH<sub>4</sub><sup>+</sup>." },
      { n: "3", q: "Write an acid–base equation according to the Brønsted–Lowry definition to show the reaction when hydrogen fluoride gas is bubbled through water, forming an acidic solution.",
        a: "HF donates H<sup>+</sup> (acid) and water accepts it (base): <span class='eq'>$HF(g) + H2O(l) -> F^-(aq) + H3O^+(aq)$</span>" },
      { n: "4", q: "Identify the conjugate acid–base pairs in the equation in Question 3 above.",
        a: "Pair 1: <b>$HF/F^-$</b> &nbsp;&nbsp; Pair 2: <b>$H3O^+/H2O$</b><br>(Each pair differs by one H<sup>+</sup> ion; write the acid first.)" }
    ]
  },
  {
    id: "11A-S2", section: "11A", title: "11A Check-in questions – Set 2",
    items: [
      { n: "1", q: "Copy and complete the table summarising polyprotic acids: Monoprotic (HCl), Diprotic (H2SO4), Triprotic (H3PO4) – how many protons can each donate, and the equation(s) showing it reacting with water as an acid.",
        a: "<div class='table-wrap'><table class='t'><tr><th>Acid</th><th>Example</th><th>Protons</th><th>Equation(s) with water</th></tr>" +
           "<tr><td>Monoprotic</td><td>$HCl$</td><td>1</td><td>$HCl(aq) + H2O(l) -> Cl^-(aq) + H3O^+(aq)$</td></tr>" +
           "<tr><td>Diprotic</td><td>$H2SO4$</td><td>2</td><td>$H2SO4(aq) + H2O(l) -> HSO4^-(aq) + H3O^+(aq)$<br>$HSO4^-(aq) + H2O(l) <=> SO4^2-(aq) + H3O^+(aq)$</td></tr>" +
           "<tr><td>Triprotic</td><td>$H3PO4$</td><td>3</td><td>$H3PO4(aq) + H2O(l) <=> H2PO4^-(aq) + H3O^+(aq)$<br>$H2PO4^-(aq) + H2O(l) <=> HPO4^2-(aq) + H3O^+(aq)$<br>$HPO4^2-(aq) + H2O(l) <=> PO4^3-(aq) + H3O^+(aq)$</td></tr></table></div>" }
    ]
  },
  {
    id: "11A-Q", section: "11A", title: "Section 11A questions",
    items: [
      { n: "1a", q: "Identify the conjugate acid–base pairs: H2S(g) + H2O(l) → HS⁻(aq) + H3O⁺(aq)",
        a: "H<sub>2</sub>S loses H<sup>+</sup> (acid); H<sub>2</sub>O gains H<sup>+</sup> (base).<br>Pairs: <b>$H2S/HS^-$</b> and <b>$H3O^+/H2O$</b>" },
      { n: "1b", q: "Identify the conjugate acid–base pairs: Ba(OH)2(aq) + 2HCl(aq) → BaCl2(aq) + 2H2O(l)",
        a: "HCl donates H<sup>+</sup> to become Cl<sup>−</sup>; the OH<sup>−</sup> ions from Ba(OH)<sub>2</sub> accept H<sup>+</sup> to become H<sub>2</sub>O.<br>Pairs: <b>$HCl/Cl^-$</b> and <b>$H2O/OH^-$</b>" },
      { n: "1c", q: "Identify the conjugate acid–base pairs: CH3COOH(aq) + H2O(l) → CH3COO⁻(aq) + H3O⁺(aq)",
        a: "Pairs: <b>$CH3COOH/CH3COO^-$</b> and <b>$H3O^+/H2O$</b>" },
      { n: "2", q: "Identify the following substances as monoprotic acids, monoprotic bases, diprotic acids, triprotic acids, diprotic bases or triprotic bases: a H2S  b PO4³⁻  c CH3COOH  d NH3",
        a: "a $H2S$ – <b>diprotic acid</b> (two H<sup>+</sup> to donate)<br>b $PO4^3-$ – <b>triprotic base</b> (can accept three H<sup>+</sup>: → $HPO4^2-$ → $H2PO4^-$ → $H3PO4$)<br>c $CH3COOH$ – <b>monoprotic acid</b> (only the H on the –COOH group is donated)<br>d $NH3$ – <b>monoprotic base</b> (accepts one H<sup>+</sup> → $NH4^+$)" },
      { n: "3", q: "H2PO4⁻ ions are both diprotic and amphiprotic. Explain these terms.",
        a: "<b>Diprotic:</b> it has two H<sup>+</sup> ions it can donate, so it can act as an acid twice: <span class='eq'>$H2PO4^-(aq) + H2O(l) <=> HPO4^2-(aq) + H3O^+(aq)$</span><span class='eq'>$HPO4^2-(aq) + H2O(l) <=> PO4^3-(aq) + H3O^+(aq)$</span><b>Amphiprotic:</b> it can either donate OR accept an H<sup>+</sup> ion. As a base: <span class='eq'>$H2PO4^-(aq) + H2O(l) <=> H3PO4(aq) + OH^-(aq)$</span>" },
      { n: "4a", q: "Oxalic acid (C2H2O4) is a diprotic acid. Write equations to show how it behaves as a diprotic acid when reacting with water.",
        a: "<span class='eq'>$C2H2O4(aq) + H2O(l) <=> HC2O4^-(aq) + H3O^+(aq)$</span><span class='eq'>$HC2O4^-(aq) + H2O(l) <=> C2O4^2-(aq) + H3O^+(aq)$</span>" },
      { n: "4b", q: "Highlight substances in your equations, other than water, that are amphiprotic.",
        a: "<b>$HC2O4^-$</b> is amphiprotic – it can donate its remaining H<sup>+</sup> (acting as an acid in step 2) or accept an H<sup>+</sup> (acting as a base) to re-form $C2H2O4$." },
      { n: "5a", q: "Identify the acids and bases and their conjugate pairs: NH3(aq) + HF(aq) → F⁻(aq) + NH4⁺(aq)",
        a: "Acid: <span class='acid'>HF</span> &nbsp; Base: <span class='base'>NH<sub>3</sub></span><br>Pairs: <b>$HF/F^-$</b> and <b>$NH4^+/NH3$</b>" },
      { n: "5b", q: "Identify the acids and bases and their conjugate pairs: H2O(l) + CN⁻(aq) → OH⁻(aq) + HCN(aq)",
        a: "Acid: <span class='acid'>H<sub>2</sub>O</span> (loses H<sup>+</sup> → OH<sup>−</sup>) &nbsp; Base: <span class='base'>CN<sup>−</sup></span> (gains H<sup>+</sup> → HCN)<br>Pairs: <b>$H2O/OH^-$</b> and <b>$HCN/CN^-$</b>" },
      { n: "5c", q: "Identify the acids and bases and their conjugate pairs: NH4⁺(aq) + CH3COO⁻(aq) → NH3(aq) + CH3COOH(aq)",
        a: "Acid: <span class='acid'>NH<sub>4</sub><sup>+</sup></span> &nbsp; Base: <span class='base'>CH<sub>3</sub>COO<sup>−</sup></span><br>Pairs: <b>$NH4^+/NH3$</b> and <b>$CH3COOH/CH3COO^-$</b>" }
    ]
  },
  /* ---------------------------- 11B ---------------------------- */
  {
    id: "11B-S1", section: "11B", title: "11B Check-in questions – Set 1",
    items: [
      { n: "1", q: "Outline the difference between the terms 'strong' and 'weak' when discussing acids and bases and what is present at the conclusion of a reaction.",
        a: "<b>Strong</b> acids/bases ionise <b>completely (100%)</b> – every molecule donates (acid) or accepts (base) an H<sup>+</sup>. At the end only <b>products (ions)</b> are present (plus excess water). A full arrow → is used.<br><b>Weak</b> acids/bases ionise only <b>partially</b> – not every molecule reacts. At the end <b>both reactants and products</b> are present. Reversible arrows ⇌ are used." },
      { n: "2", q: "Give one example for each of the following: a strong acid  b strong base  c weak acid  d weak base",
        a: "a Strong acid: hydrochloric acid, $HCl$ (also $HBr, HI, HNO3, HClO4, H2SO4$)<br>b Strong base: sodium hydroxide, $NaOH$ (also $KOH, Ca(OH)2, Ba(OH)2$)<br>c Weak acid: ethanoic acid, $CH3COOH$ (also $HCOOH, H2CO3, H3PO4$)<br>d Weak base: ammonia, $NH3$ (also $NaHCO3$)" }
    ]
  },
  {
    id: "11B-Q", section: "11B", title: "Section 11B questions",
    items: [
      { n: "1", q: "Explain the difference between strong and concentrated acids.",
        a: "<b>Strength</b> describes how much an acid <b>ionises</b>: a strong acid donates all of its H<sup>+</sup> ions (completely ionised).<br><b>Concentration</b> describes how much acid (solute) is dissolved in a given volume of water: $c = n/V$. A concentrated acid has many acid particles compared with water.<br>So a strong acid can be dilute, and a weak acid can be concentrated." },
      { n: "2a", q: "Write an equation to represent methanoic acid (weak acid) reacting with water.",
        a: "<span class='eq'>$HCOOH(aq) + H2O(l) <=> HCOO^-(aq) + H3O^+(aq)$</span>Weak → reversible arrows." },
      { n: "2b", q: "Write an equation to represent HClO4 (strong acid) reacting with water.",
        a: "<span class='eq'>$HClO4(aq) + H2O(l) -> ClO4^-(aq) + H3O^+(aq)$</span>Strong → full arrow." },
      { n: "2c", q: "Write an equation to represent methylamine, CH3NH2 (weak base) reacting with water.",
        a: "<span class='eq'>$CH3NH2(aq) + H2O(l) <=> CH3NH3^+(aq) + OH^-(aq)$</span>The base accepts H<sup>+</sup> from water; weak → reversible arrows." },
      { n: "3", q: "Identify the solutions in beakers A, B and C as (i) strong or weak and (ii) concentrated or dilute, and explain your choices. (A: many neutral molecules with a few ions; B: lots of ions only; C: a few neutral molecules and very few ions.)",
        a: "<b>A – weak and concentrated.</b> Many non-ionised molecules with only a few ions (few : many) → partially ionised = weak. Lots of particles in the volume → concentrated.<br><b>B – strong and concentrated.</b> Only ions, no neutral molecules (many : none) → completely ionised = strong. Lots of ions to water → concentrated.<br><b>C – weak and dilute.</b> Neutral molecules are still present with very few ions → weak. Only a small number of particles in the water → dilute." }
    ]
  },
  /* ---------------------------- 11C ---------------------------- */
  {
    id: "11C-S1", section: "11C", title: "11C Check-in questions – Set 1",
    items: [
      { n: "1", q: "What is the ionic product of water at 25°C?",
        a: "<i>K</i><sub>w</sub> = [H<sub>3</sub>O<sup>+</sup>][OH<sup>−</sup>] = <b>1.00 × 10<sup>−14</sup> M<sup>2</sup></b> at 25 °C." },
      { n: "2", q: "For a 0.0001 M aqueous solution of nitric acid (HNO3) at room temperature, calculate a [H3O⁺] b [OH⁻].",
        a: "HNO<sub>3</sub> is a strong, monoprotic acid.<br>a [H<sub>3</sub>O<sup>+</sup>] = [HNO<sub>3</sub>] = <b>1 × 10<sup>−4</sup> M</b><br>b [OH<sup>−</sup>] = 10<sup>−14</sup> ÷ 10<sup>−4</sup> = <b>1 × 10<sup>−10</sup> M</b>" },
      { n: "3", q: "For a 0.05 M aqueous solution of calcium hydroxide (Ca(OH)2) at room temperature, calculate a [OH⁻] b [H3O⁺].",
        a: "Ca(OH)<sub>2</sub> is a strong base with two OH<sup>−</sup> per formula.<br>a [OH<sup>−</sup>] = 2 × 0.05 = <b>0.10 M</b><br>b [H<sub>3</sub>O<sup>+</sup>] = 10<sup>−14</sup> ÷ 0.10 = <b>1 × 10<sup>−13</sup> M</b>" }
    ]
  },
  {
    id: "11C-S2", section: "11C", title: "11C Check-in questions – Set 2",
    items: [
      { n: "1", q: "Calculate the pH at 25°C of: a a solution in which [H3O⁺] = 0.10 M  b a solution in which [H3O⁺] = 1.0 × 10⁻⁶ M  c a 0.030 M solution of HCl",
        a: "pH = −log<sub>10</sub>[H<sub>3</sub>O<sup>+</sup>]<br>a −log(0.10) = <b>1.0</b><br>b −log(1.0 × 10<sup>−6</sup>) = <b>6.0</b><br>c HCl is strong and monoprotic, so [H<sub>3</sub>O<sup>+</sup>] = 0.030 M → pH = −log(0.030) = <b>1.52</b>" },
      { n: "2", q: "Calculate the pOH at 25°C of: a [OH⁻] = 0.01 M  b [OH⁻] = 1 × 10⁻³ M  c a 0.025 M solution of Ca(OH)2",
        a: "pOH = −log<sub>10</sub>[OH<sup>−</sup>]<br>a −log(0.01) = <b>2</b><br>b −log(1 × 10<sup>−3</sup>) = <b>3</b><br>c [OH<sup>−</sup>] = 2 × 0.025 = 0.050 M → pOH = −log(0.050) = <b>1.30</b>" },
      { n: "3", q: "The pH of a water sample is 6 at 25°C. Calculate the [H3O⁺] in the sample.",
        a: "[H<sub>3</sub>O<sup>+</sup>] = 10<sup>−pH</sup> = <b>10<sup>−6</sup> M</b> (1 × 10<sup>−6</sup> M)" },
      { n: "4", q: "The pH of body wash is 8 at 25°C. Calculate the [OH⁻] in the sample.",
        a: "pOH = 14 − 8 = 6, so [OH<sup>−</sup>] = 10<sup>−6</sup> M.<br>(Or: [H<sub>3</sub>O<sup>+</sup>] = 10<sup>−8</sup> M, then [OH<sup>−</sup>] = 10<sup>−14</sup> ÷ 10<sup>−8</sup> = <b>10<sup>−6</sup> M</b>.)" },
      { n: "5", q: "Determine the pH at 25°C of a 250 mL solution that contains 0.160 g of dissolved HNO3.",
        a: "M(HNO<sub>3</sub>) = 1.0 + 14.0 + 3 × 16.0 = 63.0 g mol<sup>−1</sup><br>n = m ÷ M = 0.160 ÷ 63.0 = 2.54 × 10<sup>−3</sup> mol<br>c = n ÷ V = 2.54 × 10<sup>−3</sup> ÷ 0.250 = 0.0102 M = [H<sub>3</sub>O<sup>+</sup>] (strong, monoprotic)<br>pH = −log(0.0102) = <b>1.99</b>" },
      { n: "6", q: "Determine the pH at 25°C of a 50 mL solution that contains 0.060 g of dissolved NaOH.",
        a: "M(NaOH) = 23.0 + 16.0 + 1.0 = 40.0 g mol<sup>−1</sup><br>n = 0.060 ÷ 40.0 = 1.5 × 10<sup>−3</sup> mol<br>c = 1.5 × 10<sup>−3</sup> ÷ 0.050 = 0.030 M = [OH<sup>−</sup>]<br>pOH = −log(0.030) = 1.52 → pH = 14 − 1.52 = <b>12.48</b>" }
    ]
  },
  {
    id: "11C-S3", section: "11C", title: "11C Check-in questions – Set 3",
    items: [
      { n: "1", q: "What is a natural indicator?",
        a: "A substance that <b>occurs in nature</b> and <b>changes colour</b> when in contact with acids or bases – e.g. litmus (from lichens), red cabbage juice, turmeric, beetroot juice, china rose, and hydrangea flowers." },
      { n: "2", q: "What colour would phenolphthalein indicator be when added to a solution with pH 10?",
        a: "<b>Pink.</b> Phenolphthalein changes colourless → pink over pH 8.3–10.0, so at pH 10 it is pink." },
      { n: "3", q: "What colour would methyl red indicator be when added to a solution with pH 1?",
        a: "<b>Red.</b> Methyl red changes red → yellow over pH 4.4–6.2; pH 1 is below the range so it is red." },
      { n: "4", q: "What colour would red cabbage indicator be when added to a solution with pH 12?",
        a: "<b>Green/yellow.</b> pH 12 is basic, and red cabbage juice turns green/yellow in base." }
    ]
  },
  {
    id: "11C-Q", section: "11C", title: "Section 11C questions",
    items: [
      { n: "1a", q: "Define 'pH'.",
        a: "pH is a measure of how acidic or basic a solution is, based on the concentration of hydronium ions: <b>pH = −log<sub>10</sub>[H<sub>3</sub>O<sup>+</sup>]</b>. It has no units." },
      { n: "1b", q: "Calculate the pH of a 0.013 M solution of HCl.",
        a: "[H<sub>3</sub>O<sup>+</sup>] = 0.013 M → pH = −log(0.013) = <b>1.89</b>" },
      { n: "2a", q: "Calculate the pH of 0.0109 M NaOH.",
        a: "[OH<sup>−</sup>] = 0.0109 M → pOH = −log(0.0109) = 1.96 → pH = 14 − 1.96 = <b>12.04</b>" },
      { n: "2b", q: "Calculate the pH of 3.1 M LiOH.",
        a: "[OH<sup>−</sup>] = 3.1 M → pOH = −log(3.1) = −0.49 → pH = 14 − (−0.49) = <b>14.49</b><br>(Very concentrated solutions can go beyond 14.)" },
      { n: "2c", q: "Calculate the pH of 0.12 M Mg(OH)2.",
        a: "Two OH<sup>−</sup> per formula: [OH<sup>−</sup>] = 2 × 0.12 = 0.24 M → pOH = −log(0.24) = 0.62 → pH = 14 − 0.62 = <b>13.38</b>" },
      { n: "3", q: "Determine the [H⁺] and [OH⁻] concentration of a solution of HBr that has a pH of 5.5.",
        a: "[H<sup>+</sup>] = 10<sup>−5.5</sup> = <b>3.2 × 10<sup>−6</sup> M</b><br>[OH<sup>−</sup>] = 10<sup>−14</sup> ÷ 3.2 × 10<sup>−6</sup> = <b>3.2 × 10<sup>−9</sup> M</b>" },
      { n: "4", q: "Calculate the pH of a 0.060 M solution of sulfuric acid, H2SO4.",
        a: "H<sub>2</sub>SO<sub>4</sub> is strong and diprotic: [H<sub>3</sub>O<sup>+</sup>] = 2 × 0.060 = 0.12 M → pH = −log(0.12) = <b>0.92</b>" },
      { n: "5", q: "Use a Venn diagram to compare the similarities and differences between natural and commercial indicators.",
        a: "<div class='venn-slot' data-venn='1'></div><b>Natural only:</b> found in nature (plants/lichens) – litmus, turmeric, beetroot, red cabbage, china rose; usually just show an 'acid colour' and a 'base colour'.<br><b>Both:</b> change colour in acids and bases; give a <i>qualitative</i> result (a range, not an exact pH); most are weak acids or bases whose conjugate is a different colour; can be precise but are less precise than a pH meter.<br><b>Commercial only:</b> made for laboratory use; each has a specific pH range for its colour change (listed in the data booklet), so they can be chosen for particular reactions." },
      { n: "6", q: "A student tested three unlabelled beakers (acid, base, water) with indicators. Beaker A: phenolphthalein clear, cabbage red, methyl red red. Beaker B: clear, purple, yellow. Beaker C: pink, green, yellow. Which beaker is which?",
        a: "<b>A = acid</b> – cabbage red (acid colour) and methyl red is red (pH below 4.4).<br><b>B = water</b> – cabbage stays purple (neutral), methyl red yellow (above 6.2) but phenolphthalein clear (below 8.3).<br><b>C = base</b> – phenolphthalein pink (above 8.3) and cabbage green (base colour)." },
      { n: "7", q: "Determine the pH of a 100.0 mL solution containing 1.00 g of dissolved barium hydroxide, Ba(OH)2. If this solution was tested with bromophenol blue, what colour would this indicator turn?",
        a: "M(Ba(OH)<sub>2</sub>) = 137.3 + 2(16.0 + 1.0) = 171.3 g mol<sup>−1</sup><br>n = 1.00 ÷ 171.3 = 5.84 × 10<sup>−3</sup> mol<br>c = 5.84 × 10<sup>−3</sup> ÷ 0.1000 = 0.0584 M<br>[OH<sup>−</sup>] = 2 × 0.0584 = 0.117 M → pOH = 0.93 → pH = <b>13.07</b><br>Bromophenol blue changes yellow → blue over pH 3.0–4.6, so at pH 13 it is <b>blue</b>." },
      { n: "8a", q: "Calculate the final pH: a 9.0 mL solution with pH of 2.1 is diluted to 90 mL.",
        a: "c<sub>1</sub> = 10<sup>−2.1</sup> = 7.94 × 10<sup>−3</sup> M<br>c<sub>2</sub> = c<sub>1</sub>V<sub>1</sub> ÷ V<sub>2</sub> = 7.94 × 10<sup>−3</sup> × 9.0 ÷ 90 = 7.94 × 10<sup>−4</sup> M<br>pH = <b>3.1</b> (a 10× dilution raises the pH of an acid by 1)" },
      { n: "8b", q: "Calculate the final pH: a 10.0 mL solution with pH of 14.4 is diluted to 100 mL.",
        a: "It is a base, so work with [OH<sup>−</sup>]: pOH = 14 − 14.4 = −0.4 → [OH<sup>−</sup>] = 10<sup>0.4</sup> = 2.51 M<br>c<sub>2</sub> = 2.51 × 10.0 ÷ 100 = 0.251 M → pOH = 0.60 → pH = <b>13.4</b>" },
      { n: "8c", q: "Calculate the final pH: 2475 mL of water is added to 25.0 mL of a solution with pH 0.12.",
        a: "V<sub>2</sub> = 25.0 + 2475 = 2500 mL (a 100× dilution)<br>c<sub>1</sub> = 10<sup>−0.12</sup> = 0.759 M → c<sub>2</sub> = 0.759 × 25.0 ÷ 2500 = 7.59 × 10<sup>−3</sup> M<br>pH = <b>2.12</b>" },
      { n: "8d", q: "Calculate the final pH: 1229.6 mL of water is added to 8.7 mL of a solution with pH of −0.40.",
        a: "c<sub>1</sub> = 10<sup>0.40</sup> = 2.51 M; V<sub>2</sub> = 8.7 + 1229.6 = 1238.3 mL<br>c<sub>2</sub> = 2.51 × 8.7 ÷ 1238.3 = 0.0176 M<br>pH = −log(0.0176) = <b>1.75</b>" },
      { n: "9", q: "What volume of water is required to dilute 30 mL of nitric acid (HNO3) solution of pH 3 to pH 5?",
        a: "c<sub>1</sub> = 10<sup>−3</sup> M, c<sub>2</sub> = 10<sup>−5</sup> M<br>V<sub>2</sub> = c<sub>1</sub>V<sub>1</sub> ÷ c<sub>2</sub> = 10<sup>−3</sup> × 30 ÷ 10<sup>−5</sup> = 3000 mL<br>Water to add = 3000 − 30 = <b>2970 mL</b>" },
      { n: "10", q: "Determine the pH of a solution containing 10 g of sodium hydroxide (NaOH) dissolved in 40 mL of water.",
        a: "n = 10 ÷ 40.0 = 0.25 mol; c = 0.25 ÷ 0.040 = 6.25 M = [OH<sup>−</sup>]<br>pOH = −log(6.25) = −0.80 → pH = 14 − (−0.80) = <b>14.80</b>" }
    ]
  },
  /* ---------------------------- 11D ---------------------------- */
  {
    id: "11D-Q", section: "11D", title: "Section 11D questions",
    items: [
      { n: "1", q: "Write the equation for the removal of carbon dioxide from the atmosphere by plants.",
        a: "Photosynthesis: <span class='eq'>$6CO2(g) + 6H2O(l) -> C6H12O6(aq) + 6O2(g)$ &nbsp;(light)</span>" },
      { n: "2", q: "Write an equation to show how carbon dioxide, when dissolved in ocean water, forms an acid.",
        a: "<span class='eq'>$H2O(l) + CO2(g) <=> H2CO3(aq)$</span>Carbonic acid then ionises to release hydronium ions: <span class='eq'>$H2CO3(aq) + H2O(l) <=> HCO3^-(aq) + H3O^+(aq)$</span>" },
      { n: "3", q: "What does the term 'weak acid' mean in chemistry?",
        a: "An acid that only <b>partially ionises</b> in water – not every molecule donates its H<sup>+</sup> ion, so the solution contains both un-ionised acid molecules and ions (shown with ⇌)." },
      { n: "4", q: "What is the pH of ocean water currently estimated to be? What is predicted to happen to this value if carbon dioxide emissions into the atmosphere continue to increase?",
        a: "Ocean water is naturally slightly basic, about <b>pH 8.2</b>, and has already dropped by about 0.1 (to ≈ 8.1). If CO<sub>2</sub> emissions keep increasing, more CO<sub>2</sub> dissolves, forming more carbonic acid, so the pH will keep <b>decreasing</b> (the ocean becomes more acidic)." },
      { n: "5", q: "Scientists are concerned that the pH of ocean water has decreased from 8.2 to 8.1 over time. Explain why this small change in pH is of concern. Use the [H⁺] ions in your reasoning.",
        a: "pH is a <b>logarithmic</b> scale, so a drop of 0.1 is a big change in [H<sup>+</sup>]: 10<sup>−8.1</sup> ÷ 10<sup>−8.2</sup> = 10<sup>0.1</sup> ≈ 1.26, i.e. roughly <b>30% more H<sup>+</sup> ions</b>. These extra H<sup>+</sup> ions react with carbonate ions ($H^+ + CO3^2- -> HCO3^-$), reducing the carbonate available for shells and skeletons." },
      { n: "6", q: "Oyster farmers have reported a significant decline in oyster beds, which is thought to be due to incomplete formation of their shells. Explain how carbonic acid affects the formation of oyster shells.",
        a: "Dissolved CO<sub>2</sub> forms carbonic acid, which ionises to release H<sub>3</sub>O<sup>+</sup> (H<sup>+</sup>) ions. These H<sup>+</sup> ions react with carbonate ions and with calcium carbonate: <span class='eq'>$H^+(aq) + CaCO3(s) <=> HCO3^-(aq) + Ca^2+(aq)$</span>So fewer carbonate ions are available for oysters to build their calcium carbonate shells – shells form incompletely and existing shells can begin to dissolve." }
    ]
  },
  /* ---------------------------- 11E ---------------------------- */
  {
    id: "11E-S1", section: "11E", title: "11E Check-in questions – Set 1",
    items: [
      { n: "1", q: "What is a neutralisation reaction?",
        a: "A reaction between an <b>acid and a base</b> that produces a <b>salt and water</b>. Ionic equation: <span class='eq'>$H^+(aq) + OH^-(aq) -> H2O(l)$</span>" },
      { n: "2a", q: "Complete and balance: Zn(s) + HNO3(aq) →", a: "<span class='eq'>$Zn(s) + 2HNO3(aq) -> Zn(NO3)2(aq) + H2(g)$</span>" },
      { n: "2b", q: "Complete and balance: MgCO3(s) + HCl(aq) →", a: "<span class='eq'>$MgCO3(s) + 2HCl(aq) -> MgCl2(aq) + H2O(l) + CO2(g)$</span>" },
      { n: "2c", q: "Complete and balance: NaOH(aq) + H2SO4(aq) →", a: "<span class='eq'>$2NaOH(aq) + H2SO4(aq) -> Na2SO4(aq) + 2H2O(l)$</span>" },
      { n: "2d", q: "Complete and balance: K2CO3(s) + HBr(aq) →", a: "<span class='eq'>$K2CO3(s) + 2HBr(aq) -> 2KBr(aq) + H2O(l) + CO2(g)$</span>" },
      { n: "2e", q: "Complete and balance: CaCO3(s) + H2SO4(aq) →", a: "<span class='eq'>$CaCO3(s) + H2SO4(aq) -> CaSO4(aq) + H2O(l) + CO2(g)$</span>" },
      { n: "2f", q: "Complete and balance: Pb(s) + H3PO4(aq) →", a: "<span class='eq'>$3Pb(s) + 2H3PO4(aq) -> Pb3(PO4)2(s) + 3H2(g)$</span>Pb<sup>2+</sup> and PO<sub>4</sub><sup>3−</sup> → crossover gives Pb<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>, which is insoluble (s)." },
      { n: "3", q: "Write ionic equations for each of the reactions in Question 2 (a–f).",
        a: "a <span class='eq'>$Zn(s) + 2H^+(aq) -> Zn^2+(aq) + H2(g)$</span>b <span class='eq'>$MgCO3(s) + 2H^+(aq) -> Mg^2+(aq) + H2O(l) + CO2(g)$</span>c <span class='eq'>$H^+(aq) + OH^-(aq) -> H2O(l)$</span>d <span class='eq'>$K2CO3(s) + 2H^+(aq) -> 2K^+(aq) + H2O(l) + CO2(g)$</span>e <span class='eq'>$CaCO3(s) + 2H^+(aq) -> Ca^2+(aq) + H2O(l) + CO2(g)$</span>f <span class='eq'>$3Pb(s) + 6H^+(aq) + 2PO4^3-(aq) -> Pb3(PO4)2(s) + 3H2(g)$</span>Spectator ions crossed out: a NO<sub>3</sub><sup>−</sup>; b Cl<sup>−</sup>; c Na<sup>+</sup>, SO<sub>4</sub><sup>2−</sup>; d Br<sup>−</sup>; e SO<sub>4</sub><sup>2−</sup>; f none (the salt is a solid)." }
    ]
  },
  {
    id: "11E-S2", section: "11E", title: "11E Check-in questions – Set 2",
    items: [
      { n: "1", q: "Explain how taking an antacid is an example of a neutralisation reaction.",
        a: "Antacids contain a <b>base</b> such as Mg(OH)<sub>2</sub>, Al(OH)<sub>3</sub>, NaHCO<sub>3</sub> or CaCO<sub>3</sub>. It reacts with excess stomach <b>acid</b> (HCl) to form a salt and water (plus CO<sub>2</sub> for carbonates), neutralising the acid and relieving heartburn. e.g. <span class='eq'>$2HCl(aq) + Mg(OH)2(s) -> MgCl2(aq) + 2H2O(l)$</span>" },
      { n: "2", q: "Write a balanced full and ionic equation for the reaction between the active ingredient of an antacid, aluminium hydroxide (Al(OH)3), with stomach acid (HCl).",
        a: "Full: <span class='eq'>$Al(OH)3(s) + 3HCl(aq) -> AlCl3(aq) + 3H2O(l)$</span>Ionic (Cl<sup>−</sup> is a spectator): <span class='eq'>$Al(OH)3(s) + 3H^+(aq) -> Al^3+(aq) + 3H2O(l)$</span>" }
    ]
  },
  {
    id: "11E-Q", section: "11E", title: "Section 11E questions",
    items: [
      { n: "1", q: "Complete the table summarising the different types of reactions with acids: Acid + ___ → ___ + Hydrogen gas; Acid + Metal carbonate → ___ + ___ + ___; Acid + Metal hydroxide → ___ + ___",
        a: "Acid + <b>metal</b> → <b>salt</b> + hydrogen gas<br>Acid + metal carbonate → <b>salt</b> + <b>water</b> + <b>carbon dioxide</b><br>Acid + metal hydroxide → <b>salt</b> + <b>water</b>" },
      { n: "2", q: "Name and give the formula of the salt formed when the following acids come into contact with copper(II) metal: a nitric acid  b phosphoric acid  c ethanoic acid",
        a: "Cu<sup>2+</sup> with each acid's anion (crossover):<br>a copper(II) nitrate, <b>$Cu(NO3)2$</b><br>b copper(II) phosphate, <b>$Cu3(PO4)2$</b><br>c copper(II) ethanoate, <b>$Cu(CH3COO)2$</b>" },
      { n: "3", q: "Sherbet contains citric acid and sodium hydrogen carbonate. Explain what causes the 'fizzing' sensation on your tongue when you consume sherbet.",
        a: "When the sherbet dissolves on your tongue, the citric acid reacts with sodium hydrogen carbonate (acid + metal carbonate → salt + water + carbon dioxide). The <b>bubbles of carbon dioxide gas</b> produced cause the fizzing." },
      { n: "4a", q: "Write a full balanced equation to represent the reaction between acid rain (H2SO4) and marble (CaCO3).",
        a: "<span class='eq'>$H2SO4(aq) + CaCO3(s) -> CaSO4(aq) + H2O(l) + CO2(g)$</span>" },
      { n: "4b", q: "Identify the spectator ions in this reaction.",
        a: "The <b>sulfate ion, $SO4^2-$</b> – it appears unchanged on both sides. Ionic equation: <span class='eq'>$CaCO3(s) + 2H^+(aq) -> Ca^2+(aq) + H2O(l) + CO2(g)$</span>" },
      { n: "4c", q: "Explain the term 'spectator ion'.",
        a: "An ion that is present in the reaction mixture but <b>does not take part</b> in the reaction – it is in the same state on both sides of the equation, so it is crossed out of the ionic equation." },
      { n: "5a", q: "Formic acid (HCOOH) in ant venom is relieved by calamine lotion, which contains zinc carbonate. Write a full balanced equation for this neutralisation reaction.",
        a: "<span class='eq'>$2HCOOH(aq) + ZnCO3(s) -> Zn(HCOO)2(aq) + H2O(l) + CO2(g)$</span>" },
      { n: "5b", q: "Write an ionic equation for this neutralisation reaction.",
        a: "<span class='eq'>$ZnCO3(s) + 2H^+(aq) -> Zn^2+(aq) + H2O(l) + CO2(g)$</span>" },
      { n: "6a", q: "Write balanced full and ionic equations: magnesium and sulfuric acid",
        a: "Full: <span class='eq'>$Mg(s) + H2SO4(aq) -> MgSO4(aq) + H2(g)$</span>Ionic: <span class='eq'>$Mg(s) + 2H^+(aq) -> Mg^2+(aq) + H2(g)$</span>" },
      { n: "6b", q: "Write balanced full and ionic equations: copper(II) carbonate and nitric acid",
        a: "Full: <span class='eq'>$CuCO3(s) + 2HNO3(aq) -> Cu(NO3)2(aq) + H2O(l) + CO2(g)$</span>Ionic: <span class='eq'>$CuCO3(s) + 2H^+(aq) -> Cu^2+(aq) + H2O(l) + CO2(g)$</span>" },
      { n: "6c", q: "Write balanced full and ionic equations: magnesium hydroxide + phosphoric acid",
        a: "Full: <span class='eq'>$3Mg(OH)2(s) + 2H3PO4(aq) -> Mg3(PO4)2(s) + 6H2O(l)$</span>Ionic (the salt is a solid, so no spectator ions): <span class='eq'>$3Mg(OH)2(s) + 6H^+(aq) + 2PO4^3-(aq) -> Mg3(PO4)2(s) + 6H2O(l)$</span>" }
    ]
  },
  /* ---------------------------- Review ---------------------------- */
  {
    id: "REV", section: "Review", title: "Chapter 11 review – multiple-choice questions",
    items: [
      { n: "1", q: "Which of the following is not a Brønsted–Lowry acid–base reaction?  A 2NH3 + H2SO4 ⇌ (NH4)2SO4   B O²⁻ + H2O ⇌ 2OH⁻   C HSO4⁻ + H2O ⇌ H3O⁺ + SO4²⁻   D Zn(s) + H2SO4(aq) ⇌ ZnSO4(aq) + H2(g)",
        a: "<b>D.</b> In A, B and C an H<sup>+</sup> ion is transferred from an acid to a base. In D, zinc metal reacts with the acid to form a salt and hydrogen gas – this is an acid + metal reaction, not a proton transfer to a base." },
      { n: "2", q: "Which of the following substances is both amphiprotic and polyprotic?  A H2SO4  B HCO3⁻  C H2PO4⁻  D H3PO4",
        a: "<b>C – H<sub>2</sub>PO<sub>4</sub><sup>−</sup>.</b> It has two H<sup>+</sup> it can donate (polyprotic) and can also accept an H<sup>+</sup> (amphiprotic). HCO<sub>3</sub><sup>−</sup> is amphiprotic but only has one H<sup>+</sup> to donate; H<sub>2</sub>SO<sub>4</sub> and H<sub>3</sub>PO<sub>4</sub> act only as acids here." },
      { n: "3", q: "Which of the following ions is an example of a diprotic base?  A HSO4⁻  B CO3²⁻  C H2PO4⁻  D PO4³⁻",
        a: "<b>B – CO<sub>3</sub><sup>2−</sup>.</b> It can accept two H<sup>+</sup> ions: CO<sub>3</sub><sup>2−</sup> → HCO<sub>3</sub><sup>−</sup> → H<sub>2</sub>CO<sub>3</sub>. (PO<sub>4</sub><sup>3−</sup> is triprotic.)" },
      { n: "4", q: "Which of the following best describes a weak acid?  A an acid that contains only one hydrogen atom in its molecular formula  B an acid of low concentration  C a dilute acid  D an acid that dissociates only partially in aqueous solution",
        a: "<b>D.</b> 'Weak' is about the extent of ionisation, not the number of H atoms (A) or the concentration (B, C)." },
      { n: "5", q: "The hydrogen carbonate ion, HCO3⁻, may act as an acid or a base in aqueous solution. In which equation is it acting as an acid?  A HCO3⁻ + H2O ⇌ H2CO3 + OH⁻  B HCO3⁻ + H3O⁺ ⇌ H2CO3 + H2O  C HCO3⁻ + H2O ⇌ CO3²⁻ + H3O⁺  D HCO3⁻ + OH⁻ ⇌ H2CO3 + O²⁻",
        a: "<b>C.</b> HCO<sub>3</sub><sup>−</sup> loses an H<sup>+</sup> to become CO<sub>3</sub><sup>2−</sup> – it is donating a proton, so it is the acid. In A and B it gains an H<sup>+</sup> (base)." }
    ]
  }
];

/* Glossary – every term from the chapter's glossary boxes */
window.GLOSSARY = [
  ["Acid", "11A", "A proton (H<sup>+</sup>) donor. In water at 25 °C it has a pH less than 7."],
  ["Base", "11A", "A proton (H<sup>+</sup>) acceptor. In water at 25 °C it has a pH between 8 and 14 (alkaline)."],
  ["Conjugate acid–base pair", "11A", "A reactant/product pair that differs by one H<sup>+</sup> ion, e.g. HNO<sub>3</sub>/NO<sub>3</sub><sup>−</sup>."],
  ["Amphiprotic", "11A", "A substance that can either donate or accept a proton (H<sup>+</sup>), e.g. H<sub>2</sub>O, HCO<sub>3</sub><sup>−</sup>."],
  ["Polyprotic", "11A", "A substance that can donate (or accept) more than one H<sup>+</sup> ion per molecule."],
  ["Monoprotic acid", "11A", "An acid with one H<sup>+</sup> to donate, e.g. HCl, CH<sub>3</sub>COOH."],
  ["Diprotic acid", "11A", "An acid with two H<sup>+</sup> ions to donate, e.g. H<sub>2</sub>SO<sub>4</sub>."],
  ["Triprotic acid", "11A", "An acid with three H<sup>+</sup> ions to donate, e.g. H<sub>3</sub>PO<sub>4</sub>."],
  ["Strong acid", "11B", "An acid that ionises completely in solution – every molecule donates its H<sup>+</sup>."],
  ["Weak acid", "11B", "An acid that only partially ionises – the solution has both un-ionised acid molecules and conjugate base ions."],
  ["Strong base", "11B", "A base where every base particle accepts an H<sup>+</sup> ion."],
  ["Weak base", "11B", "A base where not every particle accepts an H<sup>+</sup> ion."],
  ["Concentrated", "11B", "A solution with a large amount of solute dissolved in a given volume."],
  ["Dilute", "11B", "A solution with a small amount of solute dissolved in a given volume."],
  ["Alkaline", "11C", "A water-soluble base; gains H<sup>+</sup> and has a pH greater than 7 at 25 °C."],
  ["Ionic product of water (K<sub>w</sub>)", "11C", "K<sub>w</sub> = [H<sub>3</sub>O<sup>+</sup>][OH<sup>−</sup>] = 1.00 × 10<sup>−14</sup> M<sup>2</sup> at 25 °C – from water self-ionising."],
  ["pH", "11C", "A number showing how acidic or basic a solution is: pH = −log<sub>10</sub>[H<sub>3</sub>O<sup>+</sup>]."],
  ["pOH", "11C", "A measure of hydroxide ion concentration: pOH = −log<sub>10</sub>[OH<sup>−</sup>]; pH + pOH = 14 at 25 °C."],
  ["Indicator", "11C", "A substance that changes colour in the presence of an acid or a base."],
  ["Natural indicator", "11C", "An indicator that occurs in nature, e.g. litmus, red cabbage, turmeric."],
  ["Calibrated", "11C", "An instrument that has been checked, verified and corrected (if needed) – e.g. a pH meter checked with solutions of known pH."],
  ["Systematic error", "11C", "When readings differ from the true value consistently in one direction every time."],
  ["Carbon dioxide", "11D", "A gas, CO<sub>2</sub>, that is an important part of the carbon cycle."],
  ["Photosynthesis", "11D", "The reaction plants use to make glucose from carbon dioxide and water using light."],
  ["Greenhouse gas", "11D", "A gas that traps heat close to Earth's surface, e.g. carbon dioxide."],
  ["Aragonite", "11D", "A source of calcium carbonate in the ocean."],
  ["Acid rain", "11D", "Precipitation with a pH less than 5."],
  ["Neutralisation reaction", "11E", "An acid reacting with a base to produce water and a salt."],
  ["Spectator ion", "11E", "An ion that does not take part in the reaction and is the same on both sides of the equation."]
];
