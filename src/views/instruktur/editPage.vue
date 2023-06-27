<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h4>UPDATE DATA INSTRUKTUR</h4>
              <hr />
              <form @submit.prevent="update">
                <div class="form-group mb-3">
                  <label class="form-label">Nama instruktur</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="instruktur.nama_instruktur"
                    placeholder="Masukkan nama instruktur"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.nama_instruktur"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.nama_instruktur[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label class="form-label">Alamat</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="instruktur.alamat"
                    placeholder="Masukkan Alamat"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.alamat"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.alamat[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label class="form-label">Nomor Telepon</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="instruktur.nomor_telp"
                    placeholder="Masukkan nomor telepon"
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
                  <label class="form-label">Tanggal Lahir :</label>
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
    import { useRouter, useRoute } from 'vue-router'
    import axios from 'axios'
    export default {
      setup() {
      //state instruktur
        const instruktur = reactive({
            nama_instruktur: '',
            alamat: '',
            nomor_telp: '',
            tanggal_lahir: '',
        })
        //state validation
        const validation = ref([])
        // let instrukturs = ref([]);
  
        //vue router
        const router = useRouter()
        const route = useRoute()
        const id = route.params.id

        onMounted(() => {
        //get API from Laravel Backend
        axios.get(`http://localhost:8000/api/instruktur/show/${id}`)
            .then((response) => {
            instruktur.nama_instruktur = response.data.data.nama_instruktur;
            instruktur.alamat = response.data.data.alamat;
            instruktur.nomor_telp = response.data.data.nomor_telp;
            instruktur.tanggal_lahir = response.data.data.tanggal_lahir;
            })
            .catch((error) => {
            console.log(error.response.data);
            });
        });
  
        //method store
        function update() {
          let nama_instruktur = instruktur.nama_instruktur
          let alamat = instruktur.alamat
          let nomor_telp = instruktur.nomor_telp
          let tanggal_lahir = instruktur.tanggal_lahir

          axios.put(`http://localhost:8000/api/instruktur/update/${route.params.id}`, {
            nama_instruktur: nama_instruktur,
            alamat : alamat,
            nomor_telp: nomor_telp,
            tanggal_lahir: tanggal_lahir,
          }).then(() => {
        //redirect ke instruktur index
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
          update
        }
      }
    }   
  </script>
  <style>
  </style>