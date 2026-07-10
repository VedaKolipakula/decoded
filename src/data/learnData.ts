export type MiniQuestion =
  | { type: 'mc'; q: string; options: string[]; correct: number; explain: string }
  | { type: 'tf'; q: string; answer: boolean; explain: string };

export interface LessonSection {
  head: string;
  body: string;
  miniQ: MiniQuestion;
}

export interface Lesson {
  icon: string;
  title: string;
  /** short roadmap-node subtitle, e.g. "Gross vs. net · deductions · pay periods" */
  sub: string;
  sections: LessonSection[];
}

export interface ChapterQuizQuestion {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

export interface ChapterQuiz {
  title: string;
  questions: ChapterQuizQuestion[];
}

export interface Chapter {
  label: string;
  lessons: Lesson[];
  quiz: ChapterQuiz;
}

export const learnChapters: Chapter[] = [
  {
    label: 'Chapter 1 — Foundations',
    lessons: [
      {
        icon: '📄',
        title: 'Reading your paycheck',
        sub: 'Gross vs. net · deductions · pay periods',
        sections: [
          {
            head: 'Gross pay vs. net pay',
            body: 'Gross pay is your salary before anything is taken out — the number on your offer letter. Net pay (your "take-home") is what hits your bank account after deductions. The gap is usually 25–35%, which shocks most first-timers.',
            miniQ: {
              type: 'tf',
              q: 'True or false: your net pay is always higher than your gross pay.',
              answer: false,
              explain: "False — gross is always higher. Net is what's left after taxes and deductions come out.",
            },
          },
          {
            head: "What's being deducted?",
            body: 'Federal & state income tax are withheld based on your W-4. FICA covers Social Security (6.2%) and Medicare (1.45%) — flat and non-negotiable. Then voluntary deductions: 401k contributions, health insurance, HSA, dental/vision.',
            miniQ: {
              type: 'mc',
              q: 'Which deduction is non-negotiable on every US paycheck?',
              options: ['401k contribution', 'FICA (Social Security + Medicare)', 'Health insurance premium', 'HSA deposit'],
              correct: 1,
              explain:
                'FICA is mandatory by law — every US employee pays 7.65% (6.2% SS + 1.45% Medicare) regardless of other choices.',
            },
          },
          {
            head: 'Pay periods matter',
            body: 'Biweekly (26 checks/yr) vs. semi-monthly (24/yr) changes your per-check amount even at the same annual salary. A $60k salary = $2,308/check biweekly vs. $2,500 semi-monthly.',
            miniQ: {
              type: 'mc',
              q: 'A $78,000/yr salary paid biweekly (26 checks/yr) comes out to about how much per check?',
              options: ['$1,500', '$2,500', '$3,000', '$6,500'],
              correct: 2,
              explain: '$78,000 ÷ 26 = $3,000 per check.',
            },
          },
          {
            head: 'Your stub number & YTD',
            body: "Every paystub has a unique ID and YTD (year-to-date) totals. Keep them — you'll need YTD numbers for tax filing, apartment applications, and loan underwriting.",
            miniQ: {
              type: 'mc',
              q: 'YTD on your paystub stands for:',
              options: ['Your Tax Deduction', 'Year-To-Date', "Yesterday's Total Deposit", 'Your Total Dues'],
              correct: 1,
              explain: 'YTD = Year-To-Date. It shows the cumulative total of earnings and deductions since January 1st.',
            },
          },
        ],
      },
      {
        icon: '🧾',
        title: 'Taxes 101',
        sub: 'W-4 · tax brackets · refunds vs. owing',
        sections: [
          {
            head: 'The W-4: your starting point',
            body: 'When you start a job you fill out a W-4 to tell your employer how much federal tax to withhold. More allowances → less withheld → bigger check but potential April bill. Fewer allowances → more withheld → smaller check but a refund.',
            miniQ: {
              type: 'tf',
              q: "True or false: getting a big tax refund in April means you're great at saving.",
              answer: false,
              explain:
                "False — a refund means you overpaid the IRS all year. They're returning YOUR money with zero interest. It's not a bonus.",
            },
          },
          {
            head: 'Marginal vs. effective tax rate',
            body: "The US uses marginal brackets. If you earn $50k, you're NOT taxed 22% on all of it. The first ~$11k is 10%, the next chunk 12%, and only income above ~$47k hits 22%. Your effective rate — total tax ÷ income — is usually 12–16%.",
            miniQ: {
              type: 'mc',
              q: "You're in the 22% bracket. Which statement is true?",
              options: [
                'All your income is taxed at 22%',
                'Only income above the bracket threshold is taxed at 22%',
                'Your effective rate is 22%',
                'You pay 22% on your first dollar',
              ],
              correct: 1,
              explain:
                'Marginal brackets are progressive — each tier only applies to income within that range, not your total earnings.',
            },
          },
          {
            head: 'Refund or bill?',
            body: 'A refund = you overpaid all year; the IRS returns your money interest-free. A bill = you underpaid. Neither is inherently bad, but a huge refund means you gave the government a free loan. Aim for roughly $0 owed / $0 refund.',
            miniQ: {
              type: 'mc',
              q: 'Which of these four incomes would have the HIGHEST effective tax rate for a single filer?',
              options: ['$200,000 income', '$85,000 income', '$35,000 income', '$15,000 income'],
              correct: 0,
              explain:
                'Higher income means more of it falls into higher brackets, so effective rate rises with income — $200k has the highest of these four.',
            },
          },
          {
            head: 'State taxes',
            body: 'Most states have income tax (0–13.3%). Texas and Florida have none. Working remotely across state lines may mean owing taxes in multiple states.',
            miniQ: {
              type: 'mc',
              q: 'Which US states have NO state income tax? (pick the correct pair)',
              options: ['California & New York', 'Texas & Florida', 'Colorado & Virginia', 'Ohio & Michigan'],
              correct: 1,
              explain:
                'Texas and Florida are two of 9 states with no state income tax. Others include Nevada, Washington, and Wyoming.',
            },
          },
        ],
      },
      {
        icon: '💰',
        title: 'Budgeting systems',
        sub: '50/30/20 · zero-based · envelope method',
        sections: [
          {
            head: 'The 50/30/20 rule',
            body: 'Split after-tax income: 50% to needs (rent, groceries, utilities, min debt payments), 30% to wants (dining, subscriptions, travel), 20% to savings and extra debt payoff. Adjust percentages as your life changes.',
            miniQ: {
              type: 'mc',
              q: 'You earn $3,200/month after tax. Using 50/30/20, how much goes to savings?',
              options: ['$320', '$640', '$960', '$1,600'],
              correct: 1,
              explain: '$3,200 × 20% = $640/month to savings and debt payoff.',
            },
          },
          {
            head: 'Zero-based budgeting',
            body: 'Every dollar gets a job. Income minus all assigned expenses = $0. Some dollars are "assigned" to savings or investments. Apps like YNAB use this. Requires more tracking but eliminates mystery spending.',
            miniQ: {
              type: 'tf',
              q: 'True or false: in zero-based budgeting, having $0 left means you spent everything.',
              answer: false,
              explain:
                'False — $0 left means every dollar was assigned a purpose. Some dollars were assigned to savings accounts, investments, or emergency funds.',
            },
          },
          {
            head: 'The envelope method',
            body: 'Withdraw cash for variable categories (groceries, dining, fun) in labeled envelopes. Empty envelope = done spending that category. Digital version: separate bank accounts per category.',
            miniQ: {
              type: 'mc',
              q: 'The envelope method is BEST suited for someone who:',
              options: [
                'Invests in stocks regularly',
                'Overspends on variable categories like food and fun',
                'Has no bank account',
                'Earns a variable freelance income',
              ],
              correct: 1,
              explain:
                'The envelope method creates a hard physical (or digital) limit on variable spending — perfect for categories where people tend to overspend.',
            },
          },
          {
            head: 'Which should you use?',
            body: 'Start with 50/30/20 to get a baseline. If you overspend consistently, try zero-based. If numbers feel abstract, try envelopes. The best budget is the one you actually stick to. Review it monthly.',
            miniQ: {
              type: 'mc',
              q: "What's the right first step before picking a budgeting method?",
              options: [
                'Review and adjust monthly',
                'Track your actual spending',
                'List all income and expenses',
                'Pick a budget method',
              ],
              correct: 2,
              explain:
                'You need to know what you have before you can plan — list income and expenses first, then pick a method, track spending, and review monthly.',
            },
          },
        ],
      },
    ],
    quiz: {
      title: 'Chapter 1 Quiz — Foundations',
      questions: [
        {
          q: 'You earn $55,000/yr. Your bi-weekly paycheck shows $2,115 gross and $1,540 net. The $575 difference is:',
          options: ['Your savings goal', 'Taxes and deductions', 'A payroll mistake', 'Your bonus withholding'],
          correct: 1,
          explain: 'Gross − net = all deductions: federal tax, state tax, FICA, and any benefit premiums you enrolled in.',
        },
        {
          q: "You're in the 22% federal tax bracket. Your effective rate is probably:",
          options: ['Exactly 22%', 'Higher than 22%', 'Lower, around 13–15%', '0% due to deductions'],
          correct: 2,
          explain: 'Marginal brackets are progressive. Most people in the 22% bracket pay an effective rate of 12–16%.',
        },
        {
          q: 'Using 50/30/20, you earn $4,000/month after tax. How much goes to savings?',
          options: ['$400', '$800', '$1,200', '$2,000'],
          correct: 1,
          explain: '20% of $4,000 = $800 toward savings and debt payoff.',
        },
      ],
    },
  },
  {
    label: 'Chapter 2 — Building wealth',
    lessons: [
      {
        icon: '🏦',
        title: 'Emergency funds',
        sub: '3–6 months · HYSA · where to keep it',
        sections: [
          {
            head: 'Why 3–6 months?',
            body: 'An emergency fund covers job loss, medical bills, or car repairs without debt. 3 months is minimum; 6 months if your income is variable. Calculate on essential monthly expenses, not income.',
            miniQ: {
              type: 'mc',
              q: "Your essential monthly expenses are $2,400. What's your minimum (3-month) emergency fund?",
              options: ['$2,400', '$4,800', '$7,200', '$14,400'],
              correct: 2,
              explain: '$2,400 × 3 months = $7,200 minimum. A 6-month fund would be $14,400.',
            },
          },
          {
            head: 'Where to keep it',
            body: "A high-yield savings account (HYSA). Top HYSAs pay 4–5% APY vs. 0.01% at big banks. Keep it separate from checking so it's not tempting, but accessible within 1–2 business days. Never invest it — markets can drop 30% right when you need cash.",
            miniQ: {
              type: 'tf',
              q: 'True or false: investing your emergency fund in index funds is a smart move because it grows faster.',
              answer: false,
              explain:
                "False — your emergency fund must be liquid and stable. If the market drops 30% and you lose your job simultaneously, you've lost both your income and your safety net.",
            },
          },
          {
            head: 'How to build it',
            body: 'Automate a transfer on payday before you can spend it. Even $50/paycheck adds up. Name the account "Emergency Fund" in your bank app — naming it makes you less likely to raid it.',
            miniQ: {
              type: 'mc',
              q: 'Best way to consistently build your emergency fund:',
              options: [
                'Transfer whatever is left at month-end',
                'Automate a fixed transfer on every payday',
                'Save only when you get a bonus',
                'Wait until you have a higher salary',
              ],
              correct: 1,
              explain:
                'Automating on payday (before you can spend it) is the single most effective habit. "Pay yourself first" — every financial advisor says this.',
            },
          },
        ],
      },
      {
        icon: '📈',
        title: 'Investing basics',
        sub: 'Index funds · compound growth · DCA',
        sections: [
          {
            head: 'Why invest?',
            body: 'Inflation erodes cash. $10,000 in a 0.5% savings account after 10 years ≈ $10,511. At 7% (historical stock market avg) ≈ $19,672. Not investing is a decision to lose purchasing power slowly.',
            miniQ: {
              type: 'tf',
              q: 'True or false: keeping money in a regular savings account at 0.5% APY while inflation runs 3% means your money is growing in real terms.',
              answer: false,
              explain: 'False — at 0.5% you\'re losing purchasing power. Real return = nominal rate − inflation rate = 0.5% − 3% = −2.5%/yr.',
            },
          },
          {
            head: 'Index funds',
            body: 'An index fund tracks a market index (like the S&P 500 — the 500 largest US companies). You buy a tiny slice of all of them. Diversified, low-fee (0.03–0.2% expense ratio), and historically outperform most actively managed funds over 10+ years.',
            miniQ: {
              type: 'mc',
              q: 'An S&P 500 index fund holds stock in approximately how many companies?',
              options: ['10', '50', '500', '5,000'],
              correct: 2,
              explain:
                'The S&P 500 tracks the 500 largest publicly traded US companies — buying one index fund gives you exposure to all 500 at once.',
            },
          },
          {
            head: 'Dollar-cost averaging',
            body: 'Invest the same amount every month regardless of market conditions. When prices drop you buy more shares; when they rise you buy fewer. Automating contributions makes this effortless.',
            miniQ: {
              type: 'mc',
              q: 'What best describes dollar-cost averaging?',
              options: [
                'Investing the same dollar amount on a fixed schedule, regardless of price',
                'Trying to buy only at market bottoms',
                'Investing a lump sum right before a predicted rally',
                'Selling whenever the market dips',
              ],
              correct: 0,
              explain:
                "DCA means investing a fixed amount regularly regardless of price — which naturally means buying more shares when cheap, without trying to time the market.",
            },
          },
          {
            head: 'Compound growth',
            body: '$1,000 at 7%/yr = $1,070 after year 1. That $1,070 earns 7% in year 2 = $1,145. After 30 years: $7,612. Time in the market beats timing the market.',
            miniQ: {
              type: 'mc',
              q: '$1,000 invested at 7%/yr. How much do you have after year 1?',
              options: ['$1,000', '$1,007', '$1,070', '$1,700'],
              correct: 2,
              explain: "$1,000 × 1.07 = $1,070. In year 2 that $1,070 also earns 7% — that's compounding.",
            },
          },
        ],
      },
      {
        icon: '🏛️',
        title: '401k & IRA deep dive',
        sub: 'Contribution limits · Roth vs. traditional',
        sections: [
          {
            head: '401k basics',
            body: 'A 401k is a retirement account through your employer. Contribute pre-tax (traditional) or after-tax (Roth) dollars. 2024 limit: $23,000/yr. Always contribute at least enough to get the full employer match — instant 50–100% return.',
            miniQ: {
              type: 'tf',
              q: "True or false: if your employer matches 401k up to 5% and you contribute 3%, you're getting the full match.",
              answer: false,
              explain:
                "False — you're only capturing 3% of the match. To get the full 5% match you must contribute at least 5% yourself. The uncaptured 2% is free money left behind.",
            },
          },
          {
            head: 'Roth vs. traditional',
            body: "Traditional 401k: pay taxes when you withdraw in retirement (good if lower bracket later). Roth 401k: pay taxes now, withdrawals tax-free (good if you'll earn more later). Most young earners benefit from Roth — you're likely in a lower bracket now.",
            miniQ: {
              type: 'mc',
              q: "You're 23, earning $52k, and expect your income to grow significantly. Which is likely better?",
              options: [
                'Traditional 401k — defer taxes now',
                'Roth 401k — pay taxes now at your low rate',
                'Neither — put it all in savings',
                "Doesn't matter — they're identical",
              ],
              correct: 1,
              explain:
                "Roth is usually better for young, lower-income earners. You pay tax at today's lower rate; future withdrawals (when you may be in a higher bracket) are completely tax-free.",
            },
          },
          {
            head: 'IRA basics',
            body: 'An IRA is opened by you, not through an employer. Roth IRA limit: $7,000/yr (2024). Income limits apply — above $161k single, Roth IRA phases out. A Roth IRA is often the second account to open after maxing your 401k match.',
            miniQ: {
              type: 'mc',
              q: "What's the smartest FIRST step in this contribution order?",
              options: [
                'Max Roth IRA ($7k)',
                'Max 401k above match ($23k)',
                'Contribute to 401k up to full employer match',
                'Build a 3-month emergency fund first',
              ],
              correct: 3,
              explain:
                'Priority: emergency fund → 401k match (free money) → Roth IRA → max 401k. Build your safety net before locking money into retirement accounts.',
            },
          },
          {
            head: 'The match is free money',
            body: "If your employer matches 6% of salary and you only contribute 3%, you're leaving 3% on the table. On a $60k salary that's $1,800/yr you're giving up.",
            miniQ: {
              type: 'mc',
              q: 'Salary: $70,000. Employer matches up to 6%. You only contribute 3%. How much free match money are you missing annually?',
              options: ['$700', '$1,400', '$2,100', '$4,200'],
              correct: 2,
              explain: "3% of $70,000 = $2,100/yr you're leaving on the table by not contributing the full 6%.",
            },
          },
        ],
      },
    ],
    quiz: {
      title: 'Chapter 2 Quiz — Building Wealth',
      questions: [
        {
          q: 'Your employer matches 401k up to 4%. You contribute 2%. What are you doing?',
          options: ['Maximizing your match', 'Leaving free money on the table', 'Over-contributing', 'Following the law'],
          correct: 1,
          explain: 'Contribute at least enough for the full match. Anything less is leaving guaranteed returns untouched.',
        },
        {
          q: 'Which account is best for a 24-year-old in a low tax bracket who expects to earn more later?',
          options: ['Traditional 401k', 'Roth IRA', 'Regular savings', 'Money market'],
          correct: 1,
          explain: 'Roth accounts — pay tax now at your low rate; future withdrawals (higher bracket) are tax-free.',
        },
        {
          q: 'You have $5,000 to invest and are nervous about timing. Best strategy:',
          options: ['Wait for a market drop', 'Put it all in one stock', 'Dollar-cost average over 12 months', 'Keep it in cash'],
          correct: 2,
          explain: 'DCA spreads risk over time — you automatically buy more shares when prices are low.',
        },
      ],
    },
  },
];
