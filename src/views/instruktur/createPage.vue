<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h4>TAMBAH INSTRUKTUR</h4>>
              <hr />
              <form @submit.prevent="store">
                <div class="form-group mb-3">
                  <label class="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="instruktur.nama_lengkap"
                    placeholder="Masukkan nomor induk instruktur"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.nama_lengkap"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.nama_lengkap[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="content" class="form-label">gender</label>
                  <input
                    class="form-control"
                    v-model="instruktur.gender"
                    placeholder="Masukkan gender"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.gender"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.gender[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="content" class="form-label">tanggal lahir : </label>
                  <input
                    type="date"
                    v-model="instruktur.tanggal_lahir"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.tanggal_lahir"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.tanggal_lahir[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="content" class="form-label">nomor_telp</label>
                  <input
                    class="form-control"
                    v-model="instruktur.nomor_telp"
                    placeholder="Masukkan nomor telpon"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.nomor_telp"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.nomor_telp[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="content" class="form-label">alamat</label>
                  <input
                    class="form-control"
                    v-model="instruktur.alamat"
                    placeholder="Masukkan alamat"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.alamat"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.alamat[0] }}
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">SIMPAN</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
    import { reactive, ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    export default {
      setup() {
        //state instruktur
        const instruktur = reactive({
          nama_lengkap: '',
          gender: '',
          tanggal_lahir: '',
          nomor_telp: '',
          alamat: ''
        })

        //state validation
        const validation = ref([])
      
        //vue router
        const router = useRouter()
        
        onMounted(() => {
        //get API from Laravel Backend
        axios.get("http://localhost:8000/api/instruktur/index")
          .then((response) => {
            //assign state posts with response data
            instruktur.value = response.data.data;
            console.log(instruktur.value.data)
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
        //method store
        function store() {
          let nama_lengkap = instruktur.nama_lengkap
          let gender = instruktur.gender
          let tanggal_lahir = instruktur.tanggal_lahir
          let nomor_telp = instruktur.nomor_telp
          let alamat = instruktur.alamat
          axios.post('http://localhost:8000/api/instruktur/store', {
            nama_lengkap: nama_lengkap,
            gender: gender,
            tanggal_lahir: tanggal_lahir,
            nomor_telp: nomor_telp,
            alamat: alamat,
          }).then(() => {
        //redirect ke post index
            router.push({
              name: 'instruktur.index'
            })
          }).catch(error => {
        //assign state validation with error
            validation.value = error.response.data
          })
        }
      //return
        return {
          instruktur,
          validation,
          router,
          store
        }
      }
    }
  </script>
  <style>
  </style>