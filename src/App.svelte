<script>
  import Clients from '@/Clients.svelte'
//  import Validator from 'jsonschema'
import Tour, { startTour } from '@/utils/Tour.svelte'
	
	function onClick() {
		startTour([
			{
				message: `Welcome, let's start the tour now.`,
			}, {
				element: '#sortClients',
				message: 'You can sort customers here.',
			}, {
				element: '#filters',
				message: 'You can use filters too.',
			}, {
				element: '#countryFilter',
				message: 'Country filter is already populated with the existing countries from our customers database',
			}, {
				element: '#cityFilter',
				message: 'City filter too.',
			}, {
				element: '#addCustomer',
				message: 'New customer can be added here.',
			}, {
				element: '#customersList',
				message: 'Edit/delete any user from the list by clicking on it.',
      }
      
		]);
	}
</script>

<Tour/>

<header>

  <nav class="navbar navbar-expand">
    <a class="navbar-brand" href="#">EMMA</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Clients <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" style="color:red" on:click={onClick} href="#">Start Tour :)</a>
        </li>
      </ul>
    </div>
  </nav>
</header>

<div class="container-fluid d-flex flex-column" style="overflow: auto;">
  <h1 class="p-2 text-center">Clients List</h1>  
  <Clients></Clients>
</div>


