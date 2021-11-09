<template>
    <div>
         <div class="auth-wrapper-home">
            <div class="auth-inner-home">
                <h3>Bus Terminal</h3>

              <div v-if="!isfilled" class="user-form"> 
                    <form>
                        <div class="form-group">
                                <label for="exampleFormControlSelect1">Location of departure:</label>
                                <select class="form-control" id="exampleFormControlSelect1">
                                <option>select departure</option>
                                <option>Arcadia</option>
                                <option>Ga-Rankua</option>
                                <option>Pretoria(Main)</option>
                                <option>Soshanguve(North)</option>
                                <option>Soshanguve(South)</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Destination:</label>
                                <select class="form-control" id="exampleFormControlSelect1">
                                <option>Select destination</option>
                                <option>Arcadia</option>
                                <option>Ga-Rankua</option>
                                <option>Pretoria(Main)</option>
                                <option>Soshanguve(North)</option>
                                <option>Soshanguve(South)</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">time of derparture:</label>
                                <select class="form-control" id="exampleFormControlSelect1">
                                <option>Select time of departure</option>
                                <option>07:00</option>
                                <option>08:00</option>
                                <option>09:00</option>
                                <option>10:00</option>
                                <option>11:00</option>
                                <option>12:00</option>
                                <option>13:00</option>
                                <option>14:00</option>
                                <option>15:00</option>
                                <option>16:00</option>
                                <option>17:00</option>
                                <option>18:00</option>
                                <option>19:00</option>
                                <option>20:00</option>
                                <option>21:00</option>
                                </select>
                            </div>
                    </form>
                </div>
                <div v-if="isfilled">
                    <qr-code class="qr-space" text="Boitumelo Ganarated the code"></qr-code> 
                </div>
            
                <b-button variant="success" @click="handleSubmit">Book transport</b-button>
          
            </div>
         </div>
    </div>
</template>

<script>


export default {
    name:'home',
     data() {
      return {
       isfilled:false,
      }
    },
    methods: {
       handleSubmit(){
        this.isfilled=true;
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
    padding-left: 100px;
    justify-content: center;
}
.user-form{
    padding-bottom: 20px;
}

</style>

