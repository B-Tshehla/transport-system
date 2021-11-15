<template>
    <div>
         <div class="auth-wrapper-home">
            <div class="auth-inner-home">
                <h3>Bus Terminal</h3>

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
                    <qr-code class="qr-space" text="Boitumelo Ganarated the code"></qr-code> 
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
</template>

<script>

import { doc, getDoc, getFirestore } from "firebase/firestore";


export default {
    name:'home',
     data() {
      return {
       isfilled:false,
       types:null,
       select:{
         depature:"",
         destination:"",
         time:"",
       },
       Campuses:['Arcadia','Ga-Rankua','Pretoria(Main)','Soshanguve(North)','Soshanguve(South)'],
       times:["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"],
       studCount:null,
      }
    },
    methods: {
     async  handleSubmit(){
        this.isfilled=true;
       const db=getFirestore();
        
        const docRef = doc(db, "Campus", this.select.depature,this.select.destination,this.select.time);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data().studCount);
           this.studCount=docSnap.data().studCount+1;
          console.log(this.studCount);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
       },
       cancel(){
         this.isfilled=false;
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
        }

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

