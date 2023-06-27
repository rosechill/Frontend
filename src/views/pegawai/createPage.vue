<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h4>TAMBAH PEGAWAI</h4>>
              <hr />
              <form @submit.prevent="store">
                <div class="form-group mb-3">
                  <label class="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="pegawai.nama_pegawai"
                    placeholder="Masukkan nomor induk pegawai"
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
                  <label for="content" class="form-label">Role</label>
                  <input
                    class="form-control"
                    v-model="pegawai.role"
                    placeholder="Masukkan Role"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.role"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.role[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="content" class="form-label">gender</label>
                  <input
                    class="form-control"
                    v-model="pegawai.gender"
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
                  <label for="content" class="form-label">nomor_telp</label>
                  <input
                    class="form-control"
                    v-model="pegawai.nomor_telp"
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
                    v-model="pegawai.alamat"
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
        //state pegawai
        const pegawai = reactive({
          nama_pegawai: '',
          role: '',
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
        axios.get("http://localhost:8000/api/pegawai/index")
          .then((response) => {
            //assign state posts with response data
            pegawai.value = response.data.data;
            console.log(pegawai.value.data)
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
        //method store
        function store() {
          let nama_pegawai = pegawai.nama_pegawai
          let role = pegawai.role
          let gender = pegawai.gender
          let tanggal_lahir = pegawai.tanggal_lahir
          let nomor_telp = pegawai.nomor_telp
          let alamat = pegawai.alamat
          axios.post('http://localhost:8000/api/pegawai/store', {
            nama_pegawai: nama_pegawai,
            role: role,
            gender: gender,
            tanggal_lahir: tanggal_lahir,
            nomor_telp: nomor_telp,
            alamat: alamat,
          }).then(() => {
        //redirect ke post index
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
          store
        }
      }
    }
  </script>
  <style>
  </style>