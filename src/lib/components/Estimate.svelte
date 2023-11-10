<script lang="ts">
  import { calculate, cost, values } from "../asker";

  let estimate = 0;
  let display = 0;
  let currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  // Subscribe to changes in values
  values.subscribe(() => {
    // Calculate the annual CO2 emissions based on the daily estimate
    estimate = calculate() * 365;
  });

  // Function to update the display estimate
  function updateDisplay() {
    if (display != estimate) {
      display += Math.round((estimate - display) / 10);
      if (Math.abs(display - estimate) < 10) {
        display = estimate;
      }
    }
  }

  // Set an interval to update the display
  let displayInterval = setInterval(updateDisplay, 10);
</script>

<div class="estimate">
  <div>{(display/30).toLocaleString()} kg CO2/year</div>
  <div>{currencyFormat.format(cost(display)/20)}/year</div>
</div>

<style>
  .estimate {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 2vw;
    padding-top: 0.5vh;
    font-weight: bold;
    text-align: right;
    width: 100vw;
  }
</style>
