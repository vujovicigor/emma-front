<script>
  import Clients from '@/Clients.svelte'
  import Users_list from '@/Users_list.svelte'
//  import Validator from 'jsonschema'
  import Tour, { startTour } from '@/utils/Tour.svelte'
  import Login from '@/Login.svelte'
  import { session } from '@/store/loginStore.js'
  import { Match, Matcher } from 'svelte-store-router'
  import { route } from '@/store/routeStore.js'  
  import Landing from '@/Landing.svelte'
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

function setPath(name){
  $route.path = name
}
</script>


{#if !$session.isLogedIn }
<Login></Login>
{/if}

{#if $session.isLogedIn }
<Tour/>
  <header>
    <nav class="navbar navbar-expand">
      <a class="navbar-brand" href="#page=home">EMMA</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">

        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" class:active={$route.fragment.page=='clients'}>
            <a class="nav-link" href="#page=clients">Clients 
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item active" class:active={$route.fragment.page=='users'}>
            <a class="nav-link" href="#page=users">Users 
              <span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>

        <ul class="navbar-nav">
          {#if $route.fragment.page=='clients'}
            <li class="nav-item">
              <a class="nav-link" style="color:red" on:click={onClick} href="javascript:void(0)">Start Tour :)</a>
            </li>
          {/if}
          <li class="nav-item" >
            <a href="#" class="nav-link" on:click={()=>{$session.isLogedIn = false; $session.token= null; document.location = document.location}}>Logout</a>
          </li>        
        </ul>

      </div>
    </nav>
  </header>

  <div class="container-fluid d-flex flex-column" style="flex: 1;overflow: auto;">
    <Matcher>
      <Match path={$route.fragment.page} pattern="clients">
        <Clients></Clients>
      </Match>
      <Match path={$route.fragment.page} pattern="users">
        <Users_list></Users_list>
      </Match>
      <Match path={$route.fragment.page} >
        <Landing></Landing>
      </Match>
    </Matcher>
  </div>
{/if}

<style>
.nav-item {
  border-bottom: solid 1px transparent;
}
.active {
  border-bottom: solid 1px grey;
}
.navbar {
    border-width: 0 !important;
}
</style>


