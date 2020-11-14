<script>
import { session } from '@/store/loginStore.js'
</script>
<div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h2>Emma Landing page</h2>
    <p>We have 2 roles/permissions: <b>Admin</b> and <b>Operator</b></p>
    <p><b>Admin</b> can read/write/insert/delete Customers and Users,<br>
    while <b>Operator</b> have only read privilegies - he can list the Customers, History and Users
    but he can't alter any record.<br>
    </p>
    <p>You are logged in as <b>{$session.rola}</b> <i>({$session.email})</i>
    </p>
  </div>
</div>