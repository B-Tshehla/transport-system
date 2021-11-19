<template>

<div class="auth-wrapper">    
    <div class="auth-inner">
        <b-form @submit.prevent>
            <h3>Sign up</h3>
           
               
            
                
                <div>
                    <label for="email">Email:</label>
                        <b-form-input  
                            type="email" 
                            id="email" 
                            placeholder="Enter your Email"
                            required
                            v-model="email">
                        </b-form-input>
                            <b-form-text id="password-help-block">
                                please use your tut4life email.
                            </b-form-text>
                </div>
            
        
            <div>
                <label for="text-password">Password</label>
                <b-form-input 
                type="password" 
                id="text-password" 
                placeholder="Enter your Password"
                v-model="password">
                </b-form-input>
                <b-form-text id="password-help-block">
                Your password must be 8-20 characters long, contain letters and numbers, and special characters.
                </b-form-text>
                    <div>
                <label for="text-password">Cornfirm Password</label>
                <b-form-input 
                type="password" 
                id="text-password" 
                placeholder="Cornfirm Password"
                v-model=" password_cornfirm">
                </b-form-input>
            
            </div>
            </div>
                <div>
                     <a class="login" @click="login">already have an account</a>
                </div>
                <br>
            <div>
                    <b-button block variant="primary" @click="studentData(); handleSubmit()">Submit</b-button>
            </div>
            
        </b-form>
    </div>
</div>
</template>

<script>

   import { getAuth, createUserWithEmailAndPassword,sendEmailVerification} from "firebase/auth";
    
   


export default {
    name: 'Signup',
    methods:{

        data() {
            return {
               
                email:null,
                password:null,
                password_cornfirm:null,
               
            }
        },
        
       async handleSubmit(){
           
            const data = {

                email:this.email,
                password:this.password,
                password_cornfirm:this.password_cornfirm,
                
            }
            
            console.log(data)

                if(data.password!==data.password_cornfirm)
            {
                alert("Password and Password cornfirm are not the same, Please resubmit");
            }else
            {
                    const auth = getAuth();
                    var email=data.email;
                    var password=data.password;

                    

                createUserWithEmailAndPassword(auth, email,password)
                .then((userCredential) => {
                    // Signed in 
                    
                    const  user = userCredential.user;
                    console.log(user);
                    // ...
                        const auth = getAuth();
                        sendEmailVerification(auth.currentUser)
                        .then(() => {
                            // Email verification sent!
                            // ...
                            
                             
                            
                        });

                })
                .catch((error) => {
                    const errorCode = error.code;
                    
                    // ..
                    alert(errorCode);
                    
                });
           }


        },
        login(){
            this.$router.push('/')
        }
       
     
    }
}
</script>

<style>
.login{
  text-decoration: none;
  cursor:pointer;
   color: #7f7d7d;
   padding-bottom: 10px;
}
</style>