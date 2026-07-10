import { useState } from 'react';
import { mentorFields, mentorGoals, mentors, type Mentor } from '../../data/mentorsData';
import { Card, Chip, Eyebrow, SectionSub, SectionTitle } from '../../components/ui';
import { Modal } from '../../components/Modal';
import { useToast } from '../../app/ToastContext';

function firstName(fullName: string): string {
  return fullName.split(' ')[0];
}

/** No cap on result count — surfaces every mentor that matches, sorted by match % descending. */
function findMatches(field: string | null, goal: string | null): Mentor[] {
  let matched = mentors;
  if (field || goal) {
    matched = mentors.filter((m) => (field && m.tags.includes(field)) || (goal && m.tags.includes(goal)));
    if (matched.length === 0) matched = mentors;
  }
  return matched.slice().sort((a, b) => b.matchPct - a.matchPct);
}

export function Mentors() {
  const { showToast } = useToast();
  const [field, setField] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [results, setResults] = useState<Mentor[] | null>(null);
  const [messageTarget, setMessageTarget] = useState<Mentor | null>(null);
  const [messageText, setMessageText] = useState('');

  function handleFindMentors() {
    setResults(findMatches(field, goal));
  }

  function openMessage(mentor: Mentor) {
    const first = firstName(mentor.name);
    setMessageTarget(mentor);
    setMessageText(
      `Hi ${first}, I found you through Decoded's mentor match — I'd love to hear how you approached ${mentor.tags[0].toLowerCase()}. Do you have time for a quick chat sometime this week?`,
    );
  }

  function sendMessage() {
    if (!messageTarget) return;
    showToast(`Message sent to ${firstName(messageTarget.name)}`);
    setMessageTarget(null);
  }

  return (
    <div>
      <Eyebrow>Mentor matching</Eyebrow>
      <SectionTitle>Someone who sat where you're sitting.</SectionTitle>
      <SectionSub>Two quick picks and we'll surface real mentors.</SectionSub>

      <Card>
        <div className="mb-3.5">
          <span className="mb-2 block font-mono text-[10.5px] tracking-wide text-ink-soft uppercase">
            Your field
          </span>
          <div className="flex flex-wrap gap-2">
            {mentorFields.map((f) => (
              <Chip key={f} label={f} active={field === f} onClick={() => setField(field === f ? null : f)} />
            ))}
          </div>
        </div>
        <div className="mb-1">
          <span className="mb-2 block font-mono text-[10.5px] tracking-wide text-ink-soft uppercase">
            Your first goal
          </span>
          <div className="flex flex-wrap gap-2">
            {mentorGoals.map((g) => (
              <Chip
                key={g}
                label={g}
                active={goal === g}
                onClick={() => setGoal(goal === g ? null : g)}
                variant="pink"
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={handleFindMentors}
          className="mt-3.5 w-full rounded-full bg-ink px-4.5 py-3.5 text-center font-mono text-[12.5px] text-white"
        >
          Find my mentor →
        </button>
      </Card>

      {results && (
        <div>
          <Eyebrow>Matched for you</Eyebrow>
          {results.map((m) => (
            <Card key={m.name} className="relative">
              <div className="absolute top-4.5 right-4.5 rounded-full bg-pink-pale px-2.5 py-1 font-mono text-[10px] font-semibold text-pink-dark">
                {m.matchPct}% match
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full font-serif text-[15px] font-semibold text-white"
                  style={{ background: m.avatarColor }}
                >
                  {m.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </div>
                <div className="min-w-0 flex-1 pr-16">
                  <h4 className="mb-0.5 font-serif text-[15.5px] text-ink">{m.name}</h4>
                  <div className="mb-1.5 text-[11px] text-ink-soft">{m.yearsOut}</div>
                  <p className="my-1.5 border-l-2 border-pink-mid pl-2.5 text-[12px] leading-[1.45] text-ink italic">
                    "{m.quote}"
                  </p>
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {m.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-paper-line bg-paper px-2 py-1 font-mono text-[9px] text-ink-soft uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => showToast(`Request sent to ${firstName(m.name)}`)}
                      className="flex-1 rounded-full bg-pink px-3 py-2 text-center font-mono text-[11px] text-white"
                    >
                      Connect
                    </button>
                    <button
                      type="button"
                      onClick={() => openMessage(m)}
                      className="flex-1 rounded-full border-[1.5px] border-ink px-3 py-2 text-center font-mono text-[11px] text-ink"
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={messageTarget !== null} onClose={() => setMessageTarget(null)}>
        {messageTarget && (
          <>
            <h3 className="m-0 mb-1 font-serif text-[17px] text-ink">Message {firstName(messageTarget.name)}</h3>
            <p className="m-0 mb-3 text-[11.5px] text-ink-soft">
              Sent through Decoded — mentors typically reply within a day.
            </p>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="min-h-[90px] w-full resize-none rounded-[10px] border-[1.5px] border-paper-line p-2.5 font-sans text-[13px] text-ink outline-none"
            />
            <div className="mt-3.5 flex gap-2">
              <button
                type="button"
                onClick={sendMessage}
                className="flex-1 rounded-full bg-ink px-3.5 py-2.5 text-center font-mono text-[12.5px] text-white"
              >
                Send message
              </button>
              <button
                type="button"
                onClick={() => setMessageTarget(null)}
                className="flex-1 rounded-full border-[1.5px] border-ink px-3.5 py-2.5 text-center font-mono text-[12.5px] text-ink"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
