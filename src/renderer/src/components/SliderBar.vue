<template>

  <div class="Retract-sidebar">

    <a href="#" class="sidebar-item"><img src="/resources/icon.png" width="50px" height="50px" alt=""><span>list</span></a>
    <a href="#" class="sidebar-item"><i class="fa-solid fa-house"><span>house</span></i></a>
    <a href="#" class="sidebar-item"><i class="fa-solid fa-palette"><span>theme</span></i></a>
    <a href="#" class="sidebar-item"><i class="fa-solid fa-wallet"><span>wallet</span></i></a>
    <a href="#" class="sidebar-item"><i class="fa-solid fa-image"><span>picture</span></i></a>
    <a href="#" class="sidebar-item"><i class="fa-solid fa-qrcode"><span>or-code</span></i></a>
    <a href="#" class="sidebar-item"><i class="fa-solid fa-shield"><span>save</span></i></a>
    <a href="#" class="sidebar-item"><i class="fa-solid fa-right-from-bracket"><span>leave</span></i></a>
  </div>
</template>

<script setup>

</script>

<style scoped>
.Retract-sidebar {
  width: 100px;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(17, 24, 39);
  border-radius: 10px;
  transition: .3s;
  overflow: hidden;
  margin-right: 40px;

}
.sidebar-item {
  display: block;
  height: 15%;
  width: 85%;
  margin: 9px;
  border-radius: 5px;
  position: relative;
  transition: .3s;
  color: rgb(160, 160, 175);
}
.sidebar-item i {
  margin-left: 27px;
  font-size: 30px;
  position: absolute;
  margin-top: 10px;
}
.sidebar-item:nth-child(1)::before {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-color: rgb(55, 65, 81);
  position: absolute;
  bottom: -10px;
}
.sidebar-item:nth-child(5)::before {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-color: rgb(55, 65, 81);
  position: absolute;
  bottom: -10px;
}
.sidebar-item span {
  position: relative;
  left: 80px;
  font-weight: 500;
  font-size: 15px;
  opacity: 0;
  transition: 0.1s;
}
.Retract-sidebar:hover {
  width: 270px;
}
.sidebar-item:hover {
  background-color: rgb(55, 65, 81);
  color: #fff;
}
.Retract-sidebar:hover span {
  opacity: 1;
}

.Retract-sidebar:nth-child(1) {
  background-color: rgb(49, 46, 129);
}
.Retract-sidebar:nth-child(1) .sidebar-item:hover {
  background-color: rgb(209, 213, 219);
  color: rgb(67, 56, 202);
}
.Retract-sidebar:nth-child(1) .sidebar-item {
  color: rgb(140, 120, 240);
}
</style>
