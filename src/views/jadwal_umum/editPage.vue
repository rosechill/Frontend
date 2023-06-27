<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h4>UPDATE DATA JADWAL UMUM</h4>
              <hr />
              <form @submit.prevent="update">
                <div class="form-group mb-3">
                  <label class="form-label">Id Instruktur</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="jadwal_umum.id_instruktur"
                    placeholder="Masukkan nama id Instuktur"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.id_instruktur"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.id_instruktur[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label class="form-label">Id Kelas</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="jadwal_umum.id_kelas"
                    placeholder="Masukkan Id Kelas"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.id_kelas"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.id_kelas[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label class="form-label">Hari Jadwal Umum</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="jadwal_umum.hari_jadwal"
                    placeholder="Masukkan Hari Jadwal Umum"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.hari_jadwal"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.hari_jadwal[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label class="form-label">Kapasitas</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="jadwal_umum.kapasitas"
                    placeholder="Masukkan Kapasitas"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.kapasitas"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.kapasitas[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label class="form-label">Jam Mulai</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="jadwal_umum.jam_mulai"
                    placeholder="Masukkan Hari Jam Mulai"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.jam_mulai"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.jam_mulai[0] }}
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
      //state jadwal_umum
        const jadwal_umum = reactive({
            id_instruktur: '',
            id_kelas: '',
            hari_jadwal: '',
            kapasitas: '',
            jam_mulai: '',
        })
        //state validation
        const validation = ref([])
        // let jadwal_umums = ref([]);  
  
        //vue router
        const router = useRouter()
        const route = useRoute()
        const id = route.params.id

        onMounted(() => {
        //get API from Laravel Backend
        axios.get(`http://localhost:8000/api/jadwal_umum/show/${id}`)
            .then((response) => {
            jadwal_umum.id_instruktur = response.data.data.id_instruktur;
            jadwal_umum.id_kelas = response.data.data.id_kelas;
            jadwal_umum.hari_jadwal = response.data.data.hari_jadwal;
            jadwal_umum.kapasitas = response.data.data.kapasitas;
            jadwal_umum.jam_mulai = response.data.data.jam_mulai;
            })
            .catch((error) => {
            console.log(error.response.data);
            });
        });
  
        //method store
        function update() {
          let id_instruktur = jadwal_umum.id_instruktur
          let id_kelas = jadwal_umum.id_kelas
          let hari_jadwal = jadwal_umum.hari_jadwal
          let kapasitas = jadwal_umum.kapasitas
          let jam_mulai = jadwal_umum.jam_mulai

          axios.put(`http://localhost:8000/api/jadwal_umum/update/${route.params.id}`, {
            id_instruktur: id_instruktur,
            id_kelas : id_kelas,
            hari_jadwal: hari_jadwal,
            kapasitas: kapasitas,
            jam_mulai: jam_mulai,
          }).then(() => {
        //redirect ke jadwal_umum index
            router.push({
              name: 'jadwal_umum.index'
            })
          }).catch(error => {
        //assign state validation with error
            validation.value = error.response.data
          })
        }
      //return
        return {
          jadwal_umum,
          validation,
          router,
          update
        }
      }
    }   
  </script>
  <style>
  </style>