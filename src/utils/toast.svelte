<div class="toast-container {_position}">
  <div class="toast {type}">{msg}</div>
</div>

<script>
  export let msg = ''
  export let type = ''
  export let position = 'bottom-center'
  $: _position = position.split('-').join(' ')
</script>

<style>
  .toast-container {
    position: fixed;
    z-index: 1999;
  }
  .top {
    top: 15px;
  }
  .bottom {
    bottom: 15px;
  }
  .left {
    left: 15px;
  }
  .right {
    right: 15px;
  }
  .center {
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
  }
  .toast {
    /*height: 38px;
    line-height: 38px;*/
    font-weight: bold;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
    color: #FFF;
    -webkit-transition: opacity 0.2s, -webkit-transform 0.2s;
    transition: opacity 0.2s, transform 0.2s, -webkit-transform 0.2s;
    -webkit-transform: translateY(35px);
    transform: translateY(35px);
    opacity: 0;
    white-space: pre-wrap;
    /*max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    */
  }
  .info {
    background-color: #0091EA;
  }
  .success {
    background-color: #4CAF50;
  }
  .error {
    background-color: #F44336;
  }
  .default {
    background-color: #353535;
  }
  .anim {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
</style>