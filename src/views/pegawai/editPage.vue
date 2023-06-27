<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h4>UPDATE DATA PEGAWAI</h4>
              <hr />
              <form @submit.prevent="update">
                <div class="form-group mb-3">
                  <label class="form-label">Nama pegawai</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="pegawai.nama_pegawai"
                    placeholder="Masukkan nama pegawai"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.nama_pegawai"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.nama_pegawai[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label class="form-label">Tanggal Lahir :</label>
                  <input
                    type="date"
                    v-model="pegawai.tanggal_lahir"
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
                  <label class="form-label">Nomor Telepon</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="pegawai.nomor_telp"
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
                  <label class="form-label">Alamat</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="pegawai.alamat"
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
      //state pegawai
        const pegawai = reactive({
            nama_pegawai: '',
            tanggal_lahir: '',
            nomor_telp: '',
            alamat: ''
        })
        //state validation
        const validation = ref([])
        // let pegawais = ref([]);
  
        //vue router
        const router = useRouter()
        const route = useRoute()
        const id = route.params.id

        onMounted(() => {
        //get API from Laravel Backend
        axios.get(`http://localhost:8000/api/pegawai/${id}`)
            .then((response) => {
            pegawai.nama_pegawai = response.data.data.nama_pegawai;
            pegawai.tanggal_lahir = response.data.data.tanggal_lahir;
            pegawai.nomor_telp = response.data.data.nomor_telp;
            pegawai.alamat = response.data.data.alamat;
            })
            .catch((error) => {
            console.log(error.response.data);
            });
        });
  
        //method store
        function update() {
          let nama_pegawai = pegawai.nama_pegawai
          let tanggal_lahir = pegawai.tanggal_lahir
          let nomor_telp = pegawai.nomor_telp
          let alamat = pegawai.alamat

          axios.put(`http://localhost:8000/api/pegawai/${route.params.id}`, {
            nama_pegawai: nama_pegawai,
            tanggal_lahir: tanggal_lahir,
            nomor_telp: nomor_telp,
            alamat : alamat
          }).then(() => {
        //redirect ke pegawai index
            router.push({
              name: 'pegawai.index'
            })
          }).catch(error => {
        //assign state validation with error
            validation.value = error.response.data
          })
        }
      //return
        return {
          pegawai,
          validation,
          router,
          update
        }
      }
    }   
  </script>
  <style>
  </style>