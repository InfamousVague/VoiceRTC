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
#invite {
  position: absolute;
  right: 1rem;
  top: 1.8rem;
  color: #fff;
  font-size: 20px;
  -webkit-transition: color 200ms linear;
}
#invite:hover {
  cursor: pointer;
  color: #eee;
}
.users {
  position: absolute;
  top: 2rem;
  right: 1.5rem;
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