<script>
	let name = 'world';
</script>
<style>
	:global(.th-sm) {
		position:sticky;
		top:0;
		background-color:white;
	}
	:global(.sorting_desc:after) {
    opacity: 1;
    content: "\2193";
	}	
	:global(.sorting_asc:after) {
    opacity: 1;
    content: "\2191";
	}
	:global(.sorting:after) {
    position: absolute;
    bottom: 0.7rem;
    right: 0.5rem;
    display: block;
    font-family: 'Glyphicons Halflings';
    opacity: 0.2;
    content: "\2195";
}
</style>
<table id="dtBasicExample" style="height:200px" class="table table-striped table-hover table-lg" cellspacing="0" width="100%">
  <slot name="thead">
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
  </slot>
  <tbody>
    <slot></slot>
  </tbody>

</table>