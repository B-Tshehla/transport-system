<template>
    
       <div class="auth-wrapper">
        
        <div class="auth-inner">
       <b-form @submit.prevent>
      <h3>Sign in</h3>
      <div>
            <label for="email">Email:</label>
                <b-form-input  
                    type="email" 
                    id="email" 
                    placeholder="Email"
                    required
                    v-model="email">
                </b-form-input>
                
      </div>
      
   
    <div>
        <label for="text-password">Password</label>
        <b-form-input 
        type="password" 
        id="text-password" 
        placeholder="Password"
        v-model="password">
        </b-form-input>
     
       
    </div>
      <div class="row align-items-center">
        <div class="col">
          <a class="pass" @click="resetPass">forgort password</a>
        </div>
        <div class="col">
          <a class="signup" @click="signup">create an account</a>
        </div>
    </div>
    <br>
    <div>
            <b-button block variant="primary" @click="handleSubmit">Submit</b-button>
    </div>
            
   </b-form>
        </div>
       </div>
    
</template>
<script>

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default {
    name:'login',
    methods:{
      data() {
            return {
                email:null,
                password:null,
                
            }
        },

      handleSubmit(){

            var email=this.email;
            var password=this.password;
                
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
              
                    console.log(userCredential);
                    this.$router.push('/home');
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                   
                    this.errorCode=errorCode;

                   alert(errorCode);
                });
      },
      signup(){
        this.$router.push('/signup');
      },
    }
}
</script>

<style>

    *{
      box-sizing: border-box;
    }

  body{
    /*background: #0f4374 !important;*/
    background-image: url("..//assets//background.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
    display: flex;
    font-weight: 400;
    font-family: 'Fira Sans',sans-serif;
    text-align: center;
  }

  h1,h2,h3,h4,h5,h6, label,span{
    font-weight: 500;
    font-family: 'Fira Sans',sans-serif;
  }

  body,html,#app,#root,.auth-wrapper{
    width: 100%;
    height: 100%;
  }

.auth-wrapper{
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
.auth-inner{
  width: 500px;
  margin: auto;
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba( 34 ,35,58,0.2); 
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
}

.auth-wrapper .form-control:focus{
  border-color: #167bff;
  box-shadow: none;
}

.auth-wrapper h3{
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

.custom-control-label{
  font-weight: 400;
}

.forgot-password,.forgot-password a{
  text-align: right;
  font-size: 20px;
  padding-top: 10px;
  color: #7f7d7d;
  margin: 0;
}

.forgot-password a {
  color: #167bff; 
}
.pass{
  text-decoration: none;
  cursor:pointer;
   color: #7f7d7d;
}
.signup{
  text-decoration: none;
  cursor:pointer;
   color: #7f7d7d;
}
</style>