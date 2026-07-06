# Wireframe Approval Gate
**Pipeline position:** Between 4 (Wireframe) and 5 (Styling)  
**Who runs it:** The human — not an agent  
**Time required:** 15–30 min per feature  
**Gate result:** APPROVED (Styling Agent may run) or HOLD (return to Wireframe Agent with specific notes)

---

## Why this gate exists

The wireframe is the last point at which structural changes are free. Once the Styling
Agent runs, the component tree is committed. Changing the interaction model or adding a
missing state after styling is expensive. This gate ensures the structure is right before
the visual layer goes on.

**Do not run the Styling Agent without a written APPROVED verdict from this checklist.**

---

## Gate checklist

### 1. Hierarchy — does the structure carry the argument?

- [ ] The primary action is visually dominant on every screen. If you're not sure which
  element is primary, the wireframe failed.
- [ ] Secondary and tertiary actions are visually subordinate — not competing for
  the eye.
- [ ] The section heading, if present, states one thing clearly. If it takes more than
  3 seconds to understand what this screen is for, flag it.

### 2. States — all five built, none defaulted

- [ ] **Empty state** — what a first-time user sees. Not "loading..." — a designed,
  intentional starting point. The primary action must be obvious.
- [ ] **Loading state** — system is working. No default spinner. Content
  or skeleton that communicates something about what's coming.
- [ ] **Success state** — the job is done. The result is present. The primary
  next action is clear.
- [ ] **Error state** — something went wrong. The error is named specifically
  (not "An error occurred"). The user knows what they can do next.
- [ ] **Returning-user state** — looks different from empty. Previous work
  is visible or acknowledged.

Reject immediately if any state is missing or shows a default browser/framework element.

### 3. data-component attributes — Testing Agent dependency

- [ ] Every interactive element has a `data-component` attribute
- [ ] Every major structural region has a `<!-- REGION: name -->` comment
- [ ] No `data-component` value is duplicated on the same screen
- [ ] Attribute values use kebab-case and describe the element's role,
  not its appearance (e.g. `data-component="submit-waitlist"` not
  `data-component="blue-button"`)

These attributes are the Testing Agent's contract. Missing them means tests cannot
be written without reopening the wireframe.

### 4. Open items — none may remain

- [ ] Every `[WIREFRAME OPEN]` item has been resolved by the human
- [ ] No `[WIREFRAME OPEN]` annotations remain in `wireframe.html` or `wireframe.md`

An unresolved open item means the Wireframe Agent was blocked on a decision. That
decision must be made here — the Styling Agent cannot resolve design ambiguity.

### 5. Structural correspondence (Visual Direction check)

- [ ] The structural constraint named in `visual-direction.md` §7 ("the one thing
  to remember") is visible in the wireframe layout
- [ ] No element contradicts a structural rule from `visual-direction.md`
- [ ] If the Visual Direction specified "3D: No" — zero 3D in the wireframe
- [ ] Motion-only elements (elements that only exist animated) are noted in
  `wireframe.md` annotations — they must degrade to a visible fallback

---

## Approval record

Paste this block into `wireframe.md` at the top when you approve:

```
## Approval record
Reviewer: [your name]
Date: [YYYY-MM-DD]
Verdict: APPROVED / HOLD

If APPROVED:
- All 5 states present: YES
- All data-component attributes present: YES
- All [WIREFRAME OPEN] items resolved: YES
- Visual direction structural constraint visible: YES
- Notes: [anything the Styling Agent should know]

If HOLD:
- Reason: [specific, not vague — the Wireframe Agent must know what to fix]
- States missing: [list]
- Open items unresolved: [list]
- Structural issues: [list]
```

A HOLD verdict returns the wireframe to the Wireframe Agent with these notes as input.
The gate reruns when the Wireframe Agent submits a revision.
