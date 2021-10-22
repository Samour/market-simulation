# WF-P Principal Workflow:

1. Pick stocks dataset (WF-SS)
2. Pick investment strategy (WF-IS)
3. Run simulation
4. View or export results

# WF-SS Stock selection workflow

May select from either an imported file or a randomly generated dataset.

**File import**

For a file import, specify start & end dates from file.

**Random data**

For a random dataset, select a randomness strategy & start & end dates to generate values for.

Possible random trendline generation algorithms:

- Day-to-day independently random
- Month-to-month independently random with each day offset from the monthly trendline by a random diff
- Year-to-year independently random with months and/or days offset by a random diff
- Historical stock data with each day offset by a random diff
- Historical stock data smoothed to a trendline, then each day offset by a random diff

Each random value could come from some distribution - eg

- Uniform distribution
- Evenly distributed bell curve
- Slanted bell curve

# WF-IS Investment strategy workflow

Attributes of an investment strategy:

- Initial capital
- Periodic additional capital
  - Amount
  - Frequency
- Investment frequency
- Per-trade cost

# WF-EX Experimentation workflow

1. Pick 1 or more stocks datasets
2. Define 1 or more investment strategies
3. Simulate each strategy on each dataset
4. Compare results of each strategy
