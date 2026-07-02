# Copywriting Frameworks — Stencil + Frame reference

This document is reference material for the copy skill (`SKILL.md`). It describes technique and approach — not copy to reproduce. Use it to select a method before writing, not as a template to fill in.

---

## Core four

### Eugene Schwartz — awareness-first writing

Schwartz's central argument: copy does not create desire, it channels desire that already exists. The writer's job is to find where the reader is on an awareness spectrum — from completely unaware of the problem, to problem-aware, to solution-aware, to product-aware, to most-aware — and meet them there. Writing aimed at the wrong level fails because it either oversells to someone already convinced, or makes a product claim to someone who doesn't yet know they have the problem.

**What this means in practice:** The opening move is determined by the reader's awareness level, not by what you want to say about the product. The more aware the reader, the more direct and specific the claim. The less aware, the more the copy starts from a recognizable tension or situation before naming what you're offering.

For Stencil + Frame: most founders arrive at the problem-aware stage — they know their brand doesn't feel right but haven't identified positioning as the issue. Copy should start from the symptom (tweaking the logo again, the pitch not landing), not from the solution.

**When to use:** hero lines, manifesto paragraphs, landing page sequences. Especially useful when the reader's entry point is unknown.

---

### David Ogilvy — research, specificity, respect

Ogilvy's operating principle: the consumer is not a moron, she is your wife. The practical consequence is that vague claims, flattery, and clever-for-its-own-sake writing all fail. What works is specifics: a number, a fact, a detail that proves you actually know the thing you're talking about.

The headline, in his view, carries roughly 80% of the ad's communicative work. Subheadings matter more than body copy. The research before the writing matters more than the writing itself — you cannot write with specificity about something you don't understand.

**What this means in practice:** Every claim should be answerable with a "why" that is specific and provable. "Better" is not specific. "The only tool that will reject your answer and ask again" is specific. Reach for the concrete detail that proves the claim rather than the abstract claim alone.

For Stencil + Frame: the differentiating claims are already specific in brand.md — the interrogative process, the willingness to push back on weak answers, the derivation chain from Chapter 1. These are the details that do work; they need to be foregrounded, not softened into a category description.

**When to use:** boilerplate, headlines, CTAs where one specific detail will do more work than a general category claim.

---

### Gary Halbert — the starving crowd

Halbert's core insight is that the most important factor in any selling situation is not the copy, not the offer, not the product — it is who you are in front of. A great offer to the wrong audience fails; an okay offer to exactly the right audience works. He called this the "starving crowd" principle: finding the people who already want what you have is more valuable than any writing technique.

The corollary for copy: once you've identified the right audience, copy should speak to what they already want — their existing desire, frustration, or fear — rather than try to install a new want. The reason-why technique (giving the reader a concrete reason for the offer or the claim) is one of his primary tools.

**What this means in practice:** Before writing, name the reader's frustration specifically. Not "founders who want better branding" but "founders who have reworked their tagline four times this week and still know it's wrong." Copy that names the specific frustration accurately is more persuasive than copy that promises a better outcome.

For Stencil + Frame: the audience tension is already named in brand.md — founders who sense their visuals aren't earned but lack language for why, so they keep adjusting the surface. Copy should land on that exact frustration by name.

**When to use:** social posts, taglines, any copy meant to create immediate recognition in the target reader.

---

### Joanna Wiebe — voice-of-customer and jobs-to-be-done

Wiebe's contribution is methodological: the most effective copy is found in the reader's own words, not invented by the writer. She calls this voice-of-customer (VOC) research — mining reviews, support threads, Reddit posts, and interview transcripts for the exact language the target reader uses to describe their problem. Copy that uses their words back at them is recognized as accurate in a way that invented copy isn't.

The jobs-to-be-done frame (borrowed from Christensen) asks: what job is the reader hiring this product to do? The functional job is usually the stated one; the emotional and social jobs are often the real ones. Writing to the functional job produces feature copy. Writing to the emotional or social job produces copy that lands.

**What this means in practice:** The question before writing is not "what does this product do?" but "what does the reader need to believe after reading this?" Work backwards from that belief to the claim that would produce it.

For Stencil + Frame: the functional job is "build my brand identity." The emotional job is probably "stop feeling like a fraud with a logo I bought off a template." The social job may be "have something to say when someone asks why we exist." Copy aimed at the emotional or social job will be more resonant than feature description.

**When to use:** any piece where the reader's internal monologue matters — hero lines, manifesto paragraphs, any copy where the goal is recognition rather than information transfer.

---

## CoppieGPT 232-formula taxonomy — structural reference

CoppieGPT organizes 232 copywriting formulas into a layered taxonomy. The structure is more useful than any individual formula, because it reveals what categories of copy problems exist and how they relate.

**Top-level taxonomy by function:**

1. **Attention formulas** — openings designed to interrupt the reader's existing mental state and create a reason to continue. Subdivided by mechanism: curiosity gap, specificity shock, contradiction, direct question, unexpected claim.

2. **Desire formulas** — mid-copy moves that build want. Subdivided by emotional axis: fear-of-missing-out, aspiration, identification ("you are the kind of person who..."), contrast (before/after), social proof structures.

3. **Credibility formulas** — claim-backing moves. Subdivided by evidence type: specifics, numbers, mechanism explanations, acknowledgment of limitation, third-party validation structure.

4. **Objection-handling formulas** — moves that preempt the reader's resistance. Subdivided by objection type: price, trust, relevance ("this isn't for me"), urgency skepticism.

5. **Action formulas** — closing and CTA structures. Subdivided by psychological lever: scarcity, clarity (exactly what happens next), risk reversal, re-statement of the core desire.

**Cross-cutting dimensions:** Each formula in the taxonomy is also tagged by:
- Awareness level it targets (borrowing Schwartz's spectrum)
- Format fit (headline, body, CTA, subject line)
- Funnel stage (top/mid/bottom)

**How to apply this for v0:** Don't try to use the full taxonomy. Identify which top-level category the copy problem falls into (usually Attention for taglines/heroes, Desire + Credibility for manifesto, Action for CTAs), then apply the one technique from the core four that best addresses that category.

---

## Structural references — prompts.chat and Corey Haines

These two sources are useful for instruction structure, not copy content.

**prompts.chat (CC0):** A public collection of LLM prompt templates across domains. The structural pattern worth borrowing: effective prompts specify role, context, constraint, and output format explicitly, in that order. Prompts that only specify role + task produce generic outputs; adding constraint (what to avoid) and output format (exact shape of the response) dramatically narrows the solution space. The SKILL.md for this project follows this pattern.

**Corey Haines' marketingskills collection:** A structured reference for marketing operators, organized by channel and objective. The pattern worth borrowing: each skill in the collection names the job to be done, the metric it moves, and the failure mode to avoid. This is the "what goes wrong" annotation that makes references actionable — knowing what breaks the technique is as important as knowing the technique.

For v0 copy generation: before picking a framework, name the failure mode. Schwartz fails when the awareness level is misread. Ogilvy fails when the specific detail is wrong or unverifiable. Halbert fails when the audience frustration is named at the wrong level of specificity. Wiebe fails when the emotional job is assumed rather than sourced.

---

## Anti-slop guidance

Anti-slop is the practice of removing writing that performs the thing it should actually do — copy that performs excitement instead of earning it, performs expertise instead of demonstrating it, performs warmth instead of saying something true.

The MIT-licensed skills referenced in this project's research converge on a few concrete diagnostics:

**Buzzword test:** If a word could appear in any competitor's copy without changing the meaning, it is doing no work. Cut it. The replacement is a specific detail, a number, or a concrete image — not a synonym.

**Hedging test:** Does the sentence commit to a claim? Hedged sentences ("we believe positioning might be important for some brands") convert a claim into an opinion and transfer the burden of judgment to the reader. State the claim, let the reader push back.

**Exclamation test:** Remove the exclamation mark. Does the sentence still convey the intended emotion? If not, the sentence itself isn't doing the emotional work — the punctuation is substituting for it. Rewrite the sentence or cut it.

**Opener test:** Does the first sentence of any piece start by naming the brand or the company's feelings about something? ("At Stencil + Frame, we believe..." / "We're excited to share...") Cut to the second sentence. The piece almost always starts there.

**The five-year-old test (paraphrased from the skills research):** Read the copy aloud and ask: could a non-expert understand every word? If a sentence requires industry context to parse, it is either jargon that should be cut, or a claim that needs to be explained in plain terms before it lands.

**The redundancy test:** Does every sentence in a piece add information the prior sentence didn't contain? Read sequentially and mark each sentence as new information or repetition. Cut repeats.

Anti-slop is a diagnostic pass, not a rewrite pass. Name the problem; the writer decides what to do with it. For the v0 skill, the anti-slop output is a list of flagged items, not a revised version.
