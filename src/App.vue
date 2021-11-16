<template>

  <div id="app">

   <router-view :user="user"/>
  </div>
</template>

<script>

import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  
  name: 'App',

  data(){
    return{
      user:null,
    }
  },
     async  created() {

           const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            
            // ..
            this.user=user;
            console.log(user.email);
        } else {
            // User is signed out
            // ...

            console.log("You have not signed in. please click login");
        }
        });
            
        },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
