<script>
  import Table from '@/Table.svelte'
  import { fetch2 } from '@/utils/fetch2.js'
  import { writable } from 'svelte/store'
  import { fade , fly} from 'svelte/transition';
  import { tick} from 'svelte';

  let loading = false
  let last_page = 0
  let params = writable({
    sort:'name_first_desc',
    page:1,
    addr_city:null,
    show_all:true
  })
$: console.log('last_page:', last_page, 'params.page:',$params.page)

  params.subscribe( $p=>{
    if ( !loading ){
      loading = true
      fetch2('get', 'public_list_clients', $p)
      .then((r)=>{
        //console.log('r', r)
        if (!r || !r[0] || !r[0].results) { loading = false; return }
        ( {list, info} = r[0].results )
        tick().then(()=>{ last_page = $params.page })
        loading = false
        if ($p.page !== 1 && $p.page > info.total_pages_count)
          $params.page = info.total_pages_count  
      })
    }    
  })

  let list = []
  let info = {}
</script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

<div style="height:100vh; display:flex; flex-flow:column">
	<div style="display:flex; align-items: center;
    justify-content: space-between;">
<!--	<div class="py-2">Show 
    <select name="dtBasicExample_length" aria-controls="dtBasicExample" style="width:4rem" class="custom-select custom-select-sm form-control form-control-sm"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries
  </div> -->
	<label>Filter by
    <input placeholder="Last name" bind:value={$params.name_last} type="search" style="width:6rem; display:inline-block" class="form-control form-control-sm ml-1" >
    <input placeholder="Country" bind:value={$params.addr_country} type="search" style="width:6rem; display:inline-block" class="form-control form-control-sm" >
    <input placeholder="City" bind:value={$params.addr_city} type="search" style="width:6rem; display:inline-block" class="form-control form-control-sm" >
    <input placeholder="Postal" bind:value={$params.addr_post_code} type="search" style="width:6rem; display:inline-block" class="form-control form-control-sm" >
    <div class="form-check" style="display: inline-block;">
      <input type="checkbox" bind:checked={$params.show_all} class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Include deactivated</label>    
    </div>
  </label>
	</div>
	<div style="flex:1; overflow:auto">
		<Table bind:list={list}>
      <thead slot="thead">
        <tr>
          <th class="th-sm sorting">Name
          </th>
          <th class="th-sm sorting">Position
          </th>
          <th class="th-sm sorting">Office
          </th>
          <th class="th-sm sorting">Age
          </th>
          <th class="th-sm sorting">Start date
          </th>
          <th class="th-sm sorting">Salary
          </th>
        </tr>        
      </thead>
      {#each list as row, i (row.customer_uuid)}
        <tr in:fly="{{delay: i*20, duration: 100,  x: 50*Math.sign($params.page - last_page), y:Math.sign($params.page - last_page)===0?30:0, opacity: 0}}">
          <td>#{i+1+($params.page-1) * list.length}
          </td>
          <td >{row.name_last} {row.name_first}<br>
            {row.email}
          </td>

          <td>{row.phone}</td>
          <td>{row.addr_street}</td>
          <td>
            {row.addr_city}<br> 
            {row.country}<br>
          </td>
          <td>
            {row.addr_post_code || ''} 
          </td>
          <td>
            {#if row.is_active}
              <span style="color:green">&#10004</span>
            {/if}
          </td>
        </tr>
      {/each}
    </Table>
	</div>
	<nav aria-label="Page navigation example">
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