<template>
    <div class="users">
        <div class="popover popover-bottom">
            <button class="popover-button" v-if="peerIds">
                {{peerIds.length}} &nbsp;<i class="fa fa-users"></i>
            </button>
            <!--
            <div class="popover-container">
                <div class="card">
                    <div class="card-body">
                    <ul>
                        <li><i class="fa fa-times red"></i> RetroPronghorn</li>
                        <li><i class="fa fa-times red"></i> JeromeASF</li>
                        <li><i class="fa fa-times red"></i> Sitemusic88</li>
                        <li><i class="fa fa-times red"></i> Cappy B</li>
                        <li><i class="fa fa-times red"></i> Dropsy</li>
                    </ul>
                    </div>
                </div>
            </div>
            -->
        </div>
    </div>
</template>
<script>

export default {
  name: 'users',
  props: ['peerIds']
}
</script>
<style src="./Users.css"></style>