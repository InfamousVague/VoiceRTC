<template>
    <div class="users">
        <div class="popover popover-bottom">
            <button class="popover-button">
                5 &nbsp;<i class="fa fa-users"></i>
            </button>
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
        </div>
    </div>
</template>
<style>
ul {
  margin: 0;
  padding: 0;
  text-align: left;
  cursor: default;
}
li {
  font-size: 14px;
  display: block;
}
.users {
  position: absolute;
  right: 0.5rem;
  top: 1.6rem;
  color: #fff;
}
.users > .popover-container {
  position: relative;
  right: 2.5rem;
  margin-left: 0rem;
  width: 180px;
}
.users .popover-button {
  color: #fff;
  background: transparent;
  border: none;
  font-size: 15px;
  cursor: pointer;
}
.card {
  background-color: #19192d;
  width: 180px;
}
</style>