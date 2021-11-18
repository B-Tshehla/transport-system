<template>
    <div>
         <div class="auth-wrapper-home">
            <div class="auth-inner-home">
                <h3>Bus Terminal</h3>
          <div v-if="!isLoaded">
                
                <div class="d-flex justify-content-center mb-3">
                  <b-spinner label=""></b-spinner>
                </div>
          </div>
          <div v-if="isLoaded">
                  <div v-if="!isStudData">
                        <div>
                            <label for="Name">First Name:</label>
                            <b-form-input  
                              type="text" 
                              id="fname" 
                              placeholder="Enter your first name"
                              required
                              v-model="fName">
                            </b-form-input>
                                  
                          </div>
                          <div>
                              <label for="last name">Last Name:</label>
                              <b-form-input  
                                  type="text"
                                  id="lname" 
                                  placeholder="Enter your last name"
                                  required
                                  v-model="lName">
                              </b-form-input>       
                            </div>
                            <div>
                                <label for="studNum">Student Number:</label>
                                <b-form-input  
                                    type="text" 
                                    id="studNum" 
                                    placeholder="Enter your student number"
                                    required
                                    v-model="studNum">
                                </b-form-input>
                              
                            </div>
                    </div>
                <div v-if="!isfilled" class="user-form"> 
                      <form>
                          <div class="form-group">
                                  <label for="exampleFormControlSelect1">Location of Departure:</label>
                                  <select class="form-control" v-model="select.depature" @change="depature(select.depature)">
                                  <option value="" disabled selected>Select your option</option>
                                  <option v-for="Campus in Campuses" :key="Campus">{{Campus}}</option>
                                  </select>
                              </div>
                              <div class="form-group">
                                  <label for="exampleFormControlSelect1">Destination:</label>
                                  <select class="form-control" v-model="select.destination" @change="destination(select.destination)">
                                  <option value="" disabled selected>Select your option</option>
                                  <option v-for="Campus in Campuses" :key="Campus">{{Campus}}</option>
                                  </select>
                              </div>
                              <div class="form-group">
                                  <label for="exampleFormControlSelect1">Time of depature:</label>
                                  <select class="form-control" v-model="select.time" @change="timeDep(select.time)">
                                  <option value="" disabled selected>Select your option</option>
                                  <option v-for="time in times" :key="time">{{time}}</option>
                                  </select>
                              </div>
                      </form>
                  </div>
                  <div v-if="isfilled">
                      <qr-code class="qr-space" :text="qrText"></qr-code> 
                  </div>
                  <div>
                    <div v-if="!isfilled">
                      <b-button variant="success" @click="handleSubmit">Book transport</b-button>
                    </div>
                    <div v-if="isfilled">
                      <b-button class="btn" variant="danger" @click="cancel">Cancel transport</b-button>
                    </div>
                  </div>
              </div>
            </div>
         </div>
    </div>
</template>

<script>

import { doc, getDoc, getFirestore,setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default {
    name:'home',
     data() {
      return {
       isfilled:false,
       isStudData:false,
       isLoaded:false,
       types:null,
       select:{
         depature:null,
         destination:null,
         time:null,
       },
       Campuses:['Arcadia','Ga-Rankua','Pretoria(Main)','Soshanguve(North)','Soshanguve(South)'],
       times:["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00",
       "15:00","16:00","17:00","18:00","19:00","20:00","21:00"],
       studCount:null,
       today:null,
       qrText:null,
       
       fName:null,
       lName:null,
       studNum:null,
       user:null,
      }
    },
    async created(){
       const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            
            this.user=user;
             this. getUserData(user);
        } else {
            // User is signed out
            // ...

            console.log("You have not signed in. please click login");
        }
        });

      
      
    },
    methods: {
     async  handleSubmit(){
      this.isLoaded=false;
      const db=getFirestore();
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();

      this.today=dd+'/'+mm+'/'+yyyy;
      this.isfilled=true;
     
       
          this.isStudData=true;
          // Add a new document in collection "Students"
          await setDoc(doc(db,"students",this.user.uid),{
            fname:this.fName,
            lname:this.lName,
            studNum:this.studNum,
            isStudData:this.isStudData,
            isfilled:this.isfilled,
            depature:this.select.depature,
            destination:this.select.destination,
            time:this.select.time,
            date:this.today,
          });
          
      

      //Transport Bookin
      const docRef = doc(db, "Campus", this.select.depature,this.select.destination,this.select.time);
      const docSnap = await getDoc(docRef);
       if (docSnap.exists()) {
          console.log("Document data:", docSnap.data().studCount);
          this.studCount=docSnap.data().studCount+1;
          this.qrText=this.select.depature+" to "+this.select.destination+" ("+this.select.time+" "+this.today+")";

           // Add a new document in collection "Campus"
          await setDoc(doc(db, "Campus", this.select.depature,this.select.destination,this.select.time), {
            studCount:this.studCount,
          });
          this.isLoaded=true;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        
       },



       //Cancel Bus Bookin
      async cancel(){
        this.isLoaded=false;
        this.isfilled=false; 
         const db=getFirestore();
         // Add a new document in collection "Campus"
          await setDoc(doc(db, "Campus", this.select.depature,this.select.destination,this.select.time), {
            studCount:this.studCount-1,
          });
    
          await setDoc(doc(db,"students",this.user.uid),{
            fname:this.fName,
            lname:this.lName,
            studNum:this.studNum,
            isStudData:this.isStudData,
            isfilled:this.isfilled,
            depature:"",
            destination:"",
            time:"",
            date:"",
          
          });
          this.isLoaded=true;
       },


        depature(value){
        var name = value;
        console.log(name);
        },
        destination(value){
          var name=value;
          console.log(name);
        },
        timeDep(value){
          console.log(value);
        },



       async getUserData(user){
          const db=getFirestore();
          const userId=user.uid;
          console.log(userId);
          const docRef = doc(db, "students", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            this.isStudData=docSnap.data().isStudData;
            this.isfilled=docSnap.data().isfilled;
            this.fName=docSnap.data().fname;
            this.lName=docSnap.data().lname;
            this.studNum=docSnap.data().studNum;
            this.select.depature=docSnap.data().depature;
            this.select.destination=docSnap.data().destination;
            this.select.time=docSnap.data().time;
            this.today=docSnap.data().date;
            this.qrText=this.select.depature+" to "+this.select.destination+" ("+this.select.time+" "+this.today+")";
            console.log(docSnap.data());
            this.isLoaded=true;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        },
    },  
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

  body,html,#app,#root,.auth-wrapper-home{
    width: 100%;
    height: 100%;
  }



.auth-wrapper-home{
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
.auth-inner-home{
  width:1200px;
  max-width: 100%;
  margin: auto;
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba( 34 ,35,58,0.2); 
  padding: 40px 55px 45px 55px;
  border-radius: 0;
  transition: all .3s;
}

.auth-wrapper-home .form-control:focus{
  border-color: #167bff;
  box-shadow: none;
}

.auth-wrapper-home h3{
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}
.qr-space{
    padding-top: 20px;
    padding-bottom: 20px;
    
    justify-content: center;
}
.user-form{
    padding-bottom: 20px;
}


</style>

