<script>
  import Modal from '@/Modal.svelte'
  import Toast from '@/utils/toast.js'
  import shallowEqual from '@/utils/shallowEqual.js'
  import { status, refresh, insert, update, remove }from '@/store/userStore.js'
  const toast = new Toast()  
  let busy = false
  export let show
  export let selectedRow = {}
  let clonedSelectedRow = { ...selectedRow }
  $: disabled = shallowEqual(clonedSelectedRow, selectedRow)
  $: console.log('status', $status)

  async function save(){
    let [response, error] =  selectedRow.user_uuid ? await update(selectedRow) : await insert(selectedRow)
    if (error) return
    toast.success('Record saved')
    refresh()
    show = false
  }
  
  async function removeUser(){
    let [response, error] = await remove( { user_uuid:selectedRow.user_uuid } )
    if (error) return
    toast.success('Record removed')
    refresh()
    show = false
  }
</script>

<Modal on:close={()=>show=false}>
  <h2 slot='header' style="width:100%">
    User details
    <!--
    <button class="btn btn-small" style="color:red; position:absolute; right:2rem">Tour?</button>
    -->
  </h2>

  <form>
    <div class="form-group">
      <label style="display:block">Email address
        <input type="email" class="form-control" bind:value={selectedRow.email} >
      </label>
    </div>
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
    <div class="form-group">
      <label style="display:block">Password
        <input type="password" class="form-control" bind:value={selectedRow.pass} >
      </label>
    </div>
    <div class="form-group">
      <label style="display:block">Role
        <select bind:value={selectedRow.rola} class="form-control" >
          <option value="ADMIN">Administrator</option>
          <option value="OPERATOR">Operator</option>
        </select>  
      </label>
          
    </div>

    
  </form>

  <h2 slot='footer' class="d-flex justify-content-between px-3">
    <div>
      <button class="btn" on:click={()=>{ show=false }}>Cancel</button>
      <button disabled={!selectedRow.user_uuid || $status.loading} class="btn btn-warning" on:click={removeUser}>Delete</button>
    </div>
    <button disabled={disabled || $status.loading} on:click={save} class="btn btn-primary">Save</button>
  </h2>    
</Modal>