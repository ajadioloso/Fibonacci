import { FormEvent, useState } from "react";

function makeFibonacci(count: number): bigint[] {
  const sequence: bigint[] = [];
  let current = 0n;
  let next = 1n;

  for (let index = 0; index < count; index += 1) {
    sequence.push(current);
    [current, next] = [next, current + next];
  }

  return sequence;
}

export default function App() {
  const [input, setInput] = useState("12");
  const [sequence, setSequence] = useState<bigint[]>(makeFibonacci(12));
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const count = Number(input);

    if (!Number.isInteger(count) || count < 0) {
      setError("Enter a whole number that is zero or greater.");
      return;
    }
    if (count > 500) {
      setError("Please choose 500 terms or fewer so the page stays easy to use.");
      return;
    }

    setError("");
    setSequence(makeFibonacci(count));
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Fibonacci Studio home">
          <span className="brand-mark" aria-hidden="true">φ</span>
          <span>Fibonacci <span className="brand-light">Studio</span></span>
        </a>
        <span className="topbar-note"><span className="live-dot" /> A little math, beautifully simple</span>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow"><span className="eyebrow-line" /> THE CLASSIC SEQUENCE</div>
        <h1>Every number<br />has a <span>next.</span></h1>
        <p className="intro">Explore the Fibonacci sequence — where each number is born from the two before it.</p>

        <form className="generator-card" onSubmit={handleSubmit}>
          <label htmlFor="term-count">How many terms would you like?</label>
          <div className="form-row">
            <div className="input-wrap">
              <input
                id="term-count"
                type="number"
                min="0"
                max="500"
                step="1"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "input-error" : "input-hint"}
              />
              <span className="input-unit">terms</span>
            </div>
            <button type="submit">Generate sequence <span aria-hidden="true">→</span></button>
          </div>
          <p className={error ? "form-message error" : "form-message"} id={error ? "input-error" : "input-hint"} role={error ? "alert" : undefined}>
            {error || "Enter any whole number from 0 to 500."}
          </p>
        </form>
      </section>

      <section className="results" aria-live="polite">
        <div className="results-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> YOUR SEQUENCE</div>
            <h2>{sequence.length} <span>terms</span></h2>
          </div>
          <div className="sequence-key"><span className="key-dot" /> Fibonacci numbers</div>
        </div>
        {sequence.length > 0 ? (
          <ol className="number-grid" aria-label="Fibonacci sequence">
            {sequence.map((number, index) => (
              <li className="number-card" key={index}>
                <span className="number-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="number-value">{number.toString()}</span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="empty-state">Your sequence is empty. Try generating at least one term.</div>
        )}
      </section>

      <footer><span>THE GOLDEN THREAD</span><span>0, 1, 1, 2, 3, 5, 8, 13...</span></footer>
    </main>
  );
}
