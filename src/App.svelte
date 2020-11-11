<script>
  import Clients from '@/Clients.svelte'
</script>

<header>
  <!-- Fixed navbar -->
  <nav class="navbar navbar-expand-md">
    <a class="navbar-brand" href="#">EMMA</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Clients</a>
        </li>
      </ul>
    </div>
  </nav>
</header>

<div class="container-fluid d-flex flex-column" style="overflow: auto;">
  <h1 class="p-2 text-center">Clients List</h1>  
  <Clients></Clients>
</div>


