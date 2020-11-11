<script>
	let name = 'world';
</script>
<style>
	.th-sm {
		position:sticky;
		top:0;
		background-color:white;
	}
	thead .sorting:after {
			opacity: 1;
			content: "\2193";
	}	
	.sorting_asc:after {
    content: "\2191";
		color:red;
	}
	.sorting:after {
    position: absolute;
    bottom: 0.7rem;
    right: 0.5rem;
    display: block;
    font-family: 'Glyphicons Halflings';
    opacity: 0.5;
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