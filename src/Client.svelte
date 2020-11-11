<script>
import Modal from '@/Modal.svelte'
export let show
export let selectedRow = {}
</script>

<Modal on:close={()=>show=false}>
  <h2 slot='header'>
    modal
    <small><em>adjective</em>  mod·al \ˈmō-dəl\</small>
  </h2>

  <form>
    <div class="d-flex" style="justify-content: space-between;">
      <div class="form-group">
        <label style="display:block">Email address
        <input type="email" class="form-control" bind:value={selectedRow.email} >
        </label>
      </div>
      <div class="form-group">
        <label style="display:block">Phone
        <input type="telephone" class="form-control" bind:value={selectedRow.phone} >
        </label>
      </div>
    </div>
    <div class="d-flex" style="justify-content: space-between;">

      <div class="form-group">
        <label style="display:block">First name
        <input type="text" class="form-control" bind:value={selectedRow.name_first} >
        </label>
      </div>
      <div class="form-group">
        <label style="display:block">Last name
        <input type="text" class="form-control" bind:value={selectedRow.name_last} >
        </label>
      </div>
    </div>

    <div class="form-group">
      <label style="display:block">Street
      <input type="text" class="form-control" bind:value={selectedRow.addr_street} >
      </label>
    </div>
    <div class="form-group">
      <label style="display:block">City
      <input type="text" class="form-control" bind:value={selectedRow.addr_city} >
      </label>
    </div>
    <div class="form-group">
      <label style="display:block">Country
      <input type="text" class="form-control" bind:value={selectedRow.addr_country} >
      </label>
    </div>
    <div class="form-group">
      <label style="display:block">Post code
      <input type="text" class="form-control" bind:value={selectedRow.addr_post_code} >
      </label>
    </div>
    

    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="active" bind:checked={selectedRow.is_active}>
      <label class="form-check-label" for="active">Active</label>
    </div>
    <pre>{JSON.stringify(selectedRow, null, 4)}</pre>
  </form>

  <h2 slot='footer'>
    <button class="btn" on:click={()=>{ show=false }}>Cancel</button>
    <button class="btn btn-primary" 
      >Save</button>
  </h2>    

</Modal>

