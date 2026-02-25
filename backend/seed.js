import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Module from './models/Module.js';
import Quiz from './models/Quiz.js';

dotenv.config();

const modules = [
  {
    title: 'Stocks',
    slug: 'stocks',
    description: 'Learn about stock markets, equity shares, and how to invest in stocks',
    content: `# Introduction to Stocks

A stock represents ownership in a company. When you buy a stock, you become a partial owner of that company.

## Key Concepts:

### 1. What is a Stock?
- Represents a share of ownership in a company
- Also called equity or shares
- Traded on stock exchanges (NSE, BSE in India)

### 2. Types of Stocks:
- Common Stock: Voting rights, dividends
- Preferred Stock: Fixed dividends, no voting rights

### 3. How Stocks Work:
- Companies issue stocks to raise capital
- Stock prices fluctuate based on supply and demand
- Investors profit through capital gains and dividends

### 4. Key Metrics:
- P/E Ratio (Price to Earnings)
- Market Cap (Market Capitalization)
- EPS (Earnings Per Share)
- Dividend Yield

### 5. Risks:
- Market volatility
- Company performance
- Economic factors

### 6. Investment Strategies:
- Long-term investing
- Dividend investing
- Growth investing
- Value investing

Remember: Never invest money you can't afford to lose. Always research before investing.`,
    videoUrl: 'https://youtu.be/RFP3ooXIiyI?si=wVzGCSyBZaOcxdJm',
    order: 1,
    duration: '30 mins'
  },
  {
    title: 'Mutual Funds',
    slug: 'mutual-funds',
    description: 'Understand mutual funds, SIP, NAV and different types of funds',
    content: `# Introduction to Mutual Funds

Mutual funds are investment vehicles that pool money from multiple investors to invest in diversified portfolios.

## Key Concepts:

### 1. What is a Mutual Fund?
- Pool of money from multiple investors
- Managed by professional fund managers
- Invests in stocks, bonds, and other securities

### 2. Types of Mutual Funds:
- Equity Funds: Invest in stocks
- Debt Funds: Invest in bonds
- Hybrid Funds: Mix of equity and debt
- Index Funds: Track market indices

### 3. NAV (Net Asset Value):
- Price per unit of mutual fund
- Calculated daily
- Total assets minus liabilities divided by units

### 4. SIP (Systematic Investment Plan):
- Regular monthly investments
- Rupee cost averaging
- Disciplined investing

### 5. Benefits:
- Professional management
- Diversification
- Low minimum investment
- Liquidity

### 6. Fees:
- Expense Ratio
- Exit Load
- Entry Load (mostly removed)

### 7. How to Choose:
- Risk tolerance
- Investment goals
- Time horizon
- Past performance

Start with SIPs for disciplined long-term wealth creation!`,
    videoUrl: 'https://youtu.be/JMV4XuuodPE?si=DCUXoVAmNkywu4Yr',
    order: 2,
    duration: '25 mins'
  },
  {
    title: 'Bonds',
    slug: 'bonds',
    description: 'Explore fixed income securities, government bonds, and corporate bonds',
    content: `# Introduction to Bonds

Bonds are debt securities where you lend money to an entity (government or corporation) for a fixed interest rate.

## Key Concepts:

### 1. What is a Bond?
- Loan given to government or company
- Fixed interest payments (coupon)
- Principal repayment at maturity

### 2. Types of Bonds:
- Government Bonds: Issued by government
- Corporate Bonds: Issued by companies
- Municipal Bonds: Issued by local governments
- Zero-Coupon Bonds: No periodic interest

### 3. Key Terms:
- Face Value: Amount repaid at maturity
- Coupon Rate: Interest rate
- Maturity Date: When principal is repaid
- Yield: Return on investment

### 4. Bond Pricing:
- Inverse relationship with interest rates
- Premium bonds (trade above face value)
- Discount bonds (trade below face value)

### 5. Credit Ratings:
- AAA, AA, A (Investment grade)
- BB, B, C (Speculative grade)
- D (Default)

### 6. Benefits:
- Regular income
- Lower risk than stocks
- Portfolio diversification
- Capital preservation

### 7. Risks:
- Interest rate risk
- Credit risk
- Inflation risk
- Liquidity risk

Bonds are suitable for conservative investors seeking steady income.`,
    videoUrl: 'https://youtu.be/1Ob-hAYCnJE?si=LEx1uwIfBpSzUjh9',
    order: 3,
    duration: '20 mins'
  },
  {
    title: 'Futures & Options (F&O)',
    slug: 'futures-and-options',
    description: 'Learn about derivatives, futures contracts, and options trading',
    content: `# Introduction to Futures & Options

F&O are derivative instruments whose value is derived from underlying assets like stocks, indices, or commodities.

## Key Concepts:

### 1. Futures:
- Agreement to buy/sell asset at future date
- Standardized contracts
- Traded on exchanges
- Require margin money

### 2. Options:
- Right (not obligation) to buy/sell
- Call Option: Right to buy
- Put Option: Right to sell
- Premium paid for this right

### 3. Key Terms:
- Strike Price: Predetermined price
- Expiry Date: Contract expiration
- Premium: Price of option
- Lot Size: Minimum trading quantity

### 4. Uses of F&O:
- Hedging: Protect against price movements
- Speculation: Profit from price changes
- Arbitrage: Exploit price differences

### 5. Call vs Put:
- Buy Call: Bullish view
- Buy Put: Bearish view
- Sell Call: Moderately bearish
- Sell Put: Moderately bullish

### 6. Risks:
- High leverage
- Time decay (options)
- Complexity
- Potential for significant losses

### 7. Who Should Trade:
- Experienced traders
- Risk-takers
- Hedgers
- Institutional investors

⚠️ F&O trading is risky and not suitable for beginners. Learn thoroughly before trading.`,
    videoUrl: 'https://youtu.be/d1_3tGM-Na0?si=yOkVjAaPlENlBMTN',
    order: 4,
    duration: '35 mins'
  },
  {
    title: 'Initial Public Offerings (IPOs)',
    slug: 'ipos',
    description: 'Understand how companies go public and how to invest in IPOs',
    content: `# Introduction to IPOs

An IPO is the process by which a private company offers shares to the public for the first time.

## Key Concepts:

### 1. What is an IPO?
- Initial Public Offering
- Private company becomes public
- Shares offered to general public
- Listed on stock exchange

### 2. Why Companies Go Public:
- Raise capital for expansion
- Provide exit for early investors
- Increase brand visibility
- Create employee wealth

### 3. IPO Process:
- Company files prospectus with SEBI
- Price band announced
- Investors apply during offer period
- Shares allotted via lottery if oversubscribed
- Listing on stock exchange

### 4. Types of IPOs:
- Book Building: Price discovered through bids
- Fixed Price: Company sets the price

### 5. Key Terms:
- Grey Market Premium: Unofficial market price
- Subscription: Demand vs supply
- Lot Size: Minimum application quantity
- Cut-off Price: Highest bid price

### 6. How to Apply:
- Through bank's UPI
- ASBA (Application Supported by Blocked Amount)
- Online or offline

### 7. Risks:
- Listing losses
- Overvaluation
- Lock-in periods
- Market volatility

### 8. What to Check:
- Company fundamentals
- Promoter background
- Industry prospects
- Valuation metrics
- Use of proceeds

Not all IPOs are good investments. Do thorough research before applying!`,
    videoUrl: 'https://youtu.be/eNXZEcn-CEo?si=ypsjuk1tFSqgXKjH',
    order: 5,
    duration: '30 mins'
  }
];

const quizzes = [
  {
    title: 'Stocks Knowledge Test',
    questions: [
      {
        question: 'What does a stock represent?',
        options: ['A loan to a company', 'Ownership in a company', 'A government bond', 'A savings account'],
        correctAnswer: 1
      },
      {
        question: 'What does P/E ratio stand for?',
        options: ['Profit and Equity', 'Price to Earnings', 'Performance Evaluation', 'Portfolio Entry'],
        correctAnswer: 1
      },
      {
        question: 'Which of these is NOT a stock exchange in India?',
        options: ['NSE', 'BSE', 'NASDAQ', 'MCX-SX'],
        correctAnswer: 2
      },
      {
        question: 'What is a dividend?',
        options: ['Stock price increase', 'Portion of profits paid to shareholders', 'Brokerage fee', 'Company debt'],
        correctAnswer: 1
      },
      {
        question: 'What type of risk is associated with stocks?',
        options: ['No risk', 'Zero risk', 'Market volatility', 'Guaranteed returns'],
        correctAnswer: 2
      },
      {
        question: 'Which stocks have voting rights?',
        options: ['Preferred stocks', 'Common stocks', 'Bonus stocks', 'Treasury stocks'],
        correctAnswer: 1
      },
      {
        question: 'What is market capitalization?',
        options: ['Total revenue', 'Total number of shares × price per share', 'Annual profit', 'Dividend amount'],
        correctAnswer: 1
      },
      {
        question: 'EPS stands for:',
        options: ['Equity Per Share', 'Earnings Per Share', 'Entry Price System', 'Exchange Price Standard'],
        correctAnswer: 1
      },
      {
        question: 'What is a bear market?',
        options: ['Rising prices', 'Falling prices', 'Stable prices', 'No trading'],
        correctAnswer: 1
      },
      {
        question: 'Long-term investing typically means holding stocks for:',
        options: ['1 week', '1 month', '1 year or more', '1 day'],
        correctAnswer: 2
      }
    ]
  },
  {
    title: 'Mutual Funds Knowledge Test',
    questions: [
      {
        question: 'What is NAV?',
        options: ['National Average Value', 'Net Asset Value', 'New Account Verification', 'None of the above'],
        correctAnswer: 1
      },
      {
        question: 'What does SIP stand for?',
        options: ['Stock Investment Plan', 'Systematic Investment Plan', 'Secure Investment Portfolio', 'Short Investment Period'],
        correctAnswer: 1
      },
      {
        question: 'Who manages mutual funds?',
        options: ['Individual investors', 'Professional fund managers', 'Government', 'Banks only'],
        correctAnswer: 1
      },
      {
        question: 'Which fund invests primarily in stocks?',
        options: ['Debt Fund', 'Equity Fund', 'Liquid Fund', 'Money Market Fund'],
        correctAnswer: 1
      },
      {
        question: 'What is expense ratio?',
        options: ['Entry fee', 'Annual management fee', 'Exit penalty', 'Dividend amount'],
        correctAnswer: 1
      },
      {
        question: 'Hybrid funds invest in:',
        options: ['Only stocks', 'Only bonds', 'Both stocks and bonds', 'Only gold'],
        correctAnswer: 2
      },
      {
        question: 'When is NAV calculated?',
        options: ['Hourly', 'Daily', 'Weekly', 'Monthly'],
        correctAnswer: 1
      },
      {
        question: 'What is the main benefit of SIP?',
        options: ['Guaranteed returns', 'Rupee cost averaging', 'No fees', 'Unlimited withdrawals'],
        correctAnswer: 1
      },
      {
        question: 'Index funds aim to:',
        options: ['Beat the market', 'Track market indices', 'Invest in one stock', 'Avoid stocks'],
        correctAnswer: 1
      },
      {
        question: 'What is exit load?',
        options: ['Entry fee', 'Annual fee', 'Fee charged on early withdrawal', 'Management fee'],
        correctAnswer: 2
      }
    ]
  },
  {
    title: 'Bonds Knowledge Test',
    questions: [
      {
        question: 'A bond represents:',
        options: ['Ownership', 'Debt', 'Commodity', 'Currency'],
        correctAnswer: 1
      },
      {
        question: 'What is a coupon rate?',
        options: ['Discount rate', 'Interest rate paid by bond', 'Tax rate', 'Inflation rate'],
        correctAnswer: 1
      },
      {
        question: 'When interest rates rise, bond prices:',
        options: ['Rise', 'Fall', 'Stay same', 'Double'],
        correctAnswer: 1
      },
      {
        question: 'AAA rating indicates:',
        options: ['High risk', 'Lowest risk', 'Medium risk', 'Default'],
        correctAnswer: 1
      },
      {
        question: 'Face value of a bond is:',
        options: ['Current market price', 'Amount repaid at maturity', 'Coupon payment', 'Premium'],
        correctAnswer: 1
      },
      {
        question: 'Government bonds are considered:',
        options: ['Very risky', 'Moderately risky', 'Low risk', 'No returns'],
        correctAnswer: 2
      },
      {
        question: 'Zero-coupon bonds:',
        options: ['Pay regular interest', 'Pay no periodic interest', 'Have zero value', 'Never mature'],
        correctAnswer: 1
      },
      {
        question: 'Corporate bonds are issued by:',
        options: ['Government', 'Companies', 'Banks only', 'Foreign entities'],
        correctAnswer: 1
      },
      {
        question: 'What is yield?',
        options: ['Purchase price', 'Return on investment', 'Face value', 'Maturity date'],
        correctAnswer: 1
      },
      {
        question: 'Inflation risk in bonds means:',
        options: ['Higher returns', 'Returns may not beat inflation', 'No risk', 'Guaranteed profit'],
        correctAnswer: 1
      }
    ]
  },
  {
    title: 'F&O Knowledge Test',
    questions: [
      {
        question: 'F&O stands for:',
        options: ['Funds and Operations', 'Futures and Options', 'Fixed and Open', 'Foreign and Offshore'],
        correctAnswer: 1
      },
      {
        question: 'A call option gives the right to:',
        options: ['Sell', 'Buy', 'Hold', 'Transfer'],
        correctAnswer: 1
      },
      {
        question: 'A put option gives the right to:',
        options: ['Buy', 'Sell', 'Hold', 'Exchange'],
        correctAnswer: 1
      },
      {
        question: 'What is strike price?',
        options: ['Current market price', 'Predetermined price in option contract', 'Brokerage fee', 'Premium amount'],
        correctAnswer: 1
      },
      {
        question: 'Options have:',
        options: ['Obligation to buy/sell', 'Right but not obligation', 'No expiry', 'Zero cost'],
        correctAnswer: 1
      },
      {
        question: 'Futures contracts are:',
        options: ['Standardized', 'Customized', 'Flexible', 'Not regulated'],
        correctAnswer: 0
      },
      {
        question: 'What is premium in options?',
        options: ['Profit amount', 'Price paid for option', 'Strike price', 'Expiry value'],
        correctAnswer: 1
      },
      {
        question: 'F&O trading requires:',
        options: ['No knowledge', 'Beginner level', 'Advanced knowledge', 'Just luck'],
        correctAnswer: 2
      },
      {
        question: 'Hedging using derivatives helps to:',
        options: ['Maximize profit', 'Minimize risk', 'Avoid taxes', 'Increase speculation'],
        correctAnswer: 1
      },
      {
        question: 'Time decay affects:',
        options: ['Futures only', 'Options only', 'Stocks', 'Bonds'],
        correctAnswer: 1
      }
    ]
  },
  {
    title: 'IPOs Knowledge Test',
    questions: [
      {
        question: 'IPO stands for:',
        options: ['Internal Public Offering', 'Initial Public Offering', 'Investment Portfolio Option', 'Institutional Private Order'],
        correctAnswer: 1
      },
      {
        question: 'In an IPO, a company becomes:',
        options: ['Private', 'Public', 'Bankrupt', 'Merged'],
        correctAnswer: 1
      },
      {
        question: 'What is grey market premium?',
        options: ['Official price', 'Unofficial market price before listing', 'Government fee', 'Brokerage charge'],
        correctAnswer: 1
      },
      {
        question: 'SEBI regulates:',
        options: ['Only banking', 'Securities market', 'Only insurance', 'Real estate'],
        correctAnswer: 1
      },
      {
        question: 'What is book building?',
        options: ['Fixed price', 'Price discovery through bidding', 'Library creation', 'Account opening'],
        correctAnswer: 1
      },
      {
        question: 'Oversubscription means:',
        options: ['Low demand', 'Demand exceeds supply', 'No applications', 'Cancelled IPO'],
        correctAnswer: 1
      },
      {
        question: 'ASBA stands for:',
        options: ['Application Supported by Blocked Amount', 'Average Stock Buy Allocation', 'Approved Securities Banking Act', 'None of these'],
        correctAnswer: 0
      },
      {
        question: 'Lot size in IPO refers to:',
        options: ['Maximum shares', 'Minimum application quantity', 'Price range', 'Commission'],
        correctAnswer: 1
      },
      {
        question: 'What to check before applying for IPO?',
        options: ['Only grey market premium', 'Company fundamentals and valuation', 'Friends advice only', 'Nothing specific'],
        correctAnswer: 1
      },
      {
        question: 'Listing day is when:',
        options: ['IPO opens', 'Shares start trading on exchange', 'Company files prospectus', 'Refunds are processed'],
        correctAnswer: 1
      }
    ]
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Module.deleteMany({});
    await Quiz.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = new User({
      name: 'Admin',
      email: 'admin@finlearn.com',
      password: 'admin123',
      role: 'admin'
    });
    await admin.save();
    console.log('Admin user created');

    // Create sample user
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user'
    });
    await user.save();
    console.log('Sample user created');

    // Create modules
    const createdModules = [];
    for (const moduleData of modules) {
      const module = new Module(moduleData);
      await module.save();
      createdModules.push(module);
      console.log(`Module created: ${module.title}`);
    }

    // Create quizzes
    for (let i = 0; i < quizzes.length; i++) {
      const quiz = new Quiz({
        ...quizzes[i],
        moduleId: createdModules[i]._id
      });
      await quiz.save();
      console.log(`Quiz created: ${quiz.title}`);
    }

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📧 Login credentials:');
    console.log('Admin: admin@finlearn.com / admin123');
    console.log('User: john@example.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
