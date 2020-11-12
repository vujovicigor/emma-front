<script>
  import Table from '@/Table.svelte'
  import { fetch2 } from '@/utils/fetch2.js'
  import { writable } from 'svelte/store'
  import { fade , fly} from 'svelte/transition';
  import { tick} from 'svelte';
  import Client from '@/Client.svelte'
	import { setContext } from 'svelte';

  setContext('refresh', refresh);
  
  let showModal = false
  let selectedRow = {}
  let loading = false
  let last_page = 0
  let params = writable({
    sort:'name_first_asc',
    page:1,
    addr_city:null,
    show_all:true
  })
  let countries_list = []
  let cities_list = []

  function refresh(){
    if ( !loading ){
      loading = true
      fetch2('get', 'public_list_clients', $params)
      .then((r)=>{
        //console.log('r', r)
        if (!r || !r[0] || !r[0].results) { loading = false; return }
        ( {list, info} = r[0].results )
        tick().then(()=>{ last_page = $params.page })
        loading = false
        if ($params.page !== 1 && $params.page > info.total_pages_count)
          $params.page = info.total_pages_count  
      })
    }     
  }

  setTimeout(()=>{
    fetch2('get', 'public_countries_list', null)
    .then((r)=>{
      if (r && r[0])
        countries_list = r[0].results 
    })
    fetch2('get', 'public_cities_list', null)
    .then((r)=>{
      if (r && r[0])
        cities_list = r[0].results 
    })    
  }, 1500)

  params.subscribe( refresh ) //$p=>{
  
//  })

  let list = []
  let info = {}

  function addNew(){
    selectedRow = { customer_uuid:null, email:null, name_first:null, name_last:null, phone:null, addr_street:null, addr_post_code:null, addr_city:null, addr_country:null, is_active:true }
    showModal=true
  }
</script>

<div style="display:flex; flex-flow:column;overflow: auto;flex: 1;">
  <div class="form-group">
    <label for="sortClients">Sort by</label>
    <select id="sortClients" bind:value={$params.sort} class="form-control form-control-sm" style="width:12rem; display:inline-block;margin-left: 0.5rem;">
      <option value="name_first_asc">First Name (ascending)</option>
      <option value="name_first_desc">First Name (descending)</option>
      <option value="name_last_asc">Last Name (ascending)</option>
      <option value="name_last_desc">Last Name (descending)</option>
    </select>
  </div>
	<div style="display:flex; align-items: center;justify-content: space-between;">
<!--	<div class="py-2">Show 
    <select name="dtBasicExample_length" aria-controls="dtBasicExample" style="width:4rem" class="custom-select custom-select-sm form-control form-control-sm"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries
  </div> -->
    <label id="filters">Filter by
      <input placeholder="Last name" bind:value={$params.name_last} type="search" class="filter form-control form-control-sm ml-1" >
      <input list="countries" id="countryFilter" placeholder="Country" bind:value={$params.addr_country} type="search" class="filter form-control form-control-sm" >
      <datalist id="countries">
        {#each countries_list as country}
          <option value="{country}">
        {/each}
      </datalist>    
      <input list="cities" id="cityFilter" placeholder="City" bind:value={$params.addr_city} type="search" class="filter form-control form-control-sm" >
      <datalist id="cities">
        {#each cities_list as city}
          <option value="{city}">
        {/each}
      </datalist>    
      <input placeholder="Postal" bind:value={$params.addr_post_code} type="search" class="filter form-control form-control-sm" >
      <div class="form-check" style="display: inline-block;">
        <input type="checkbox" bind:checked={$params.show_all} class="form-check-input" id="show_all">
        <label class="form-check-label" for="show_all">Include deactivated</label>    
      </div>  
    </label>
    <button on:click={addNew} id="addCustomer" class="btn">Add</button>
	</div>
	<div class="table-parent" id="customersList">
		<Table>
      <thead slot="thead">
        <tr>
          <th class="th-sm" align="right">#</th>
          <th class="th-sm sorting">Name/email/phone</th>
          <th class="th-sm">Address/post code</th>
          <th class="th-sm">Active</th>
        </tr>        
      </thead>
      {#each list as row, i (row.customer_uuid)}
        <tr in:fly="{{delay: i*30, duration: 100,  x: 50*Math.sign($params.page - last_page), y:Math.sign($params.page - last_page)===0?30:0, opacity: 0}}"
          on:click={()=>{ selectedRow = {...row}; showModal=true}} 
          class:table-active={selectedRow.customer_uuid == row.customer_uuid} >
          <td align="right">{i+1+($params.page-1) * list.length}.
          </td>
          <td ><b>{row.name_last} {row.name_first}</b><br>
            <i>{row.email}</i><br>
            <i>{row.phone}</i>
          </td>

          <td>
            {row.addr_street}<br> 
            {row.addr_city}<br> 
            {#if row.country}{row.country}{/if}
            {#if row.addr_post_code}
              Post code: <i>{row.addr_post_code}</i>
            {/if}
          </td>

          <td>
              <span style="color:{row.is_active?'green':'red'}">{@html row.is_active?'&#10004':'&#10006'}</span>
          </td>
        </tr>
      {/each}
    </Table>
	</div>
	<nav>
		<ul class="pagination justify-content-between pt-2 align-items-center">
			<span style="font-weight:bold">Showing {1+($params.page-1) * list.length} to {$params.page * list.length} of {info.total_item_count} entries</span>
			<div class="d-flex">
				<li class="page-item">
					<button on:click={()=>{ $params.page = Math.max($params.page - 1, 1) }}
            disabled = {$params.page == 1} 
            class="page-link"  aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
					</button>
				</li>
        {#each Array(info.total_pages_count) as page, i}
				  <li on:click={()=>{ $params.page = i+1 }} class="page-item" class:active={(i+1) == $params.page}>
            <button class="page-link" >{i+1}</button>
          </li>
        {/each}
        
				<li class="page-item">
					<button on:click={()=>{ $params.page = Math.min($params.page + 1,info.total_pages_count) }} 
            disabled = {$params.page == info.total_pages_count} 
            class="page-link" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
					</button>
				</li>				
			</div>

		</ul>
	</nav>	
</div>

{#if showModal}
  <Client bind:show={showModal} bind:selectedRow></Client>
{/if}

<style>
.filter {
  width: 7rem; 
  display: inline-block;
}
.table-parent{
  flex:1; 
  overflow:auto; 
  border-top: solid 1px #dee2e6;
}
</style>