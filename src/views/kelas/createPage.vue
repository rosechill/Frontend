<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h4>TAMBAH KELAS</h4>>
              <hr />
              <form @submit.prevent="store">
                <div class="form-group mb-3">
                  <label class="form-label">Nama Kelas</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="kelas.nama_kelas"
                    placeholder="Masukkan nomor  kelas"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.nama_kelas"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.nama_kelas[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="content" class="form-label">harga</label>
                  <input
                    class="form-control"
                    v-model="kelas.harga"
                    placeholder="Masukkan harga"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.harga"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.harga[0] }}
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
        //state kelas
        const kelas = reactive({
          nama_kelas: '',
          harga: '',
        })

        //state validation
        const validation = ref([])
      
        //vue router
        const router = useRouter()
        
        onMounted(() => {
        //get API from Laravel Backend
        axios.get("http://localhost:8000/api/kelas/index")
          .then((response) => {
            //assign state posts with response data
            kelas.value = response.data.data;
            console.log(kelas.value.data)
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
        //method store
        function store() {
          let nama_kelas = kelas.nama_kelas
          let harga = kelas.harga
          axios.post('http://localhost:8000/api/kelas/store', {
            nama_kelas: nama_kelas,
            harga: harga,
          }).then(() => {
        //redirect ke post index
            router.push({
              name: 'kelas.index'
            })
          }).catch(error => {
        //assign state validation with error
            validation.value = error.response.data
          })
        }
      //return
        return {
          kelas,
          validation,
          router,
          store
        }
      }
    }
  </script>
  <style>
  </style>