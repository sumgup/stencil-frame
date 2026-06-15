export const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3001";

async function postJson(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? `Request to ${path} failed (${res.status})`);
  }
  return res.json();
}

// tier: cheap — is this Act 0 answer weak?
export async function checkAct0Answer(question, answer) {
  const data = await postJson("/act0/check-answer", { question, answer });
  return Boolean(data.weak);
}

// tier: smart — reflect the three Act 0 answers back as one paragraph
export async function reflectAct0(answers) {
  const data = await postJson("/act0/reflect", answers);
  return data.reflection;
}

// tier: cheap — is this Act 1 answer weak?
export async function checkAct1Answer(answer) {
  const data = await postJson("/act1/check-answer", { answer });
  return Boolean(data.weak);
}

// tier: smart — organise the Act 1 answer into facts / obstacles / opportunities
export async function reflectAct1({ answer, oneLiner, values, purpose }) {
  return postJson("/act1/reflect", { answer, oneLiner, values, purpose });
}
