<script lang="ts">
  import { calculate, cost, tips } from "$lib/asker";

  const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  let co2Emissions = calculate();
  tips.sort((a, b) => b.save - a.save);
</script>

<svelte:head>
  <title>CO2 Calculator - Results</title>
</svelte:head>

<h1>Your CO2 Emissions</h1>
<div class="card-group">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Carbon Emissions</h5>
      <h1>{(co2Emissions).toLocaleString()} kg</h1>
      <p class="card-text"><small class="text-muted">per year</small></p>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Cost</h5>
      <h1>{(currencyFormat.format(cost(co2Emissions)))}</h1>
      <p class="card-text"><small class="text-muted">per year</small></p>
    </div>
  </div>
</div>

<h1 class="mt-5">CO2 Reduction Tips</h1>
<div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
  {#each tips as tip}
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">{tip.title}</h5>
        <p class="card-text">{tip.description}</p>
      </div>
      <div class="card-footer text-muted">
        <div class="row">
          <div class="col">
            <i class="bi bi-emoji-laughing"></i>
            {tip.save.toLocaleString()} kg/year
          </div>
          <div class="col">
            <i class="bi bi-cash-coin"></i>
            {currencyFormat.format(cost(tip.save))}
          </div>
        </div>
      </div>
    </div>
  </div>
  {/each}
</div>