<script lang="ts">
    import {goto, afterNavigate} from '$app/navigation'
    import {base} from '$app/paths'
    let previousPage : string = base ;

</script>

<style>
.navbar {
  display: flex;
  background-color: #333;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  left: 0;
  width: 100vw; /* Full width */
  justify-content: space-between;
}
.navbar button {
  float: left;
  display: block;
  color: #000000;
  text-align: center;
  text-decoration: none;
  width: 100%;
}

/* Change background on mouse-over */
.navbar button:hover {
  background: #ddd;
  color: green
}
@media print {
  .navbar{
    visibility: hidden;
    height: 0;
    width: 0;
  }
}
</style>

<div class="navbar">
    <button on:click={()=>history.back()}>Back</button>
    <button on:click={()=>history.forward()}>Forward</button>
    <button on:click={()=>goto("/")}>Home</button>
    <button on:click={()=>goto("/compendium")}> Compendium</button>
</div>

