<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h4>TAMBAH MEMBER</h4>>
              <hr />
              <form @submit.prevent="store">
                <div class="form-group mb-3">
                  <label class="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="member.nama_member"
                    placeholder="Masukkan nomor member"
                  />
                  <!-- validation -->
                  <div
                    v-if="validation.nama_member"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.nama_member[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="content" class="form-label">gender</label>
                  <input
                    class="form-control"
                    v-model="member.gender"
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
                    v-model="member.tanggal_lahir"
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
                    v-model="member.nomor_telp"
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
                    v-model="member.alamat"
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
        //state member
        const member = reactive({
          nama_member: '',
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
        axios.get("http://localhost:8000/api/member/index")
          .then((response) => {
            //assign state posts with response data
            member.value = response.data.data;
            console.log(member.value.data)
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
        //method store
        function store() {
          let nama_member = member.nama_member
          let gender = member.gender
          let tanggal_lahir = member.tanggal_lahir
          let nomor_telp = member.nomor_telp
          let alamat = member.alamat
          axios.post('http://localhost:8000/api/member/store', {
            nama_member: nama_member,
            gender: gender,
            tanggal_lahir: tanggal_lahir,
            nomor_telp: nomor_telp,
            alamat: alamat,
          }).then(() => {
        //redirect ke post index
            router.push({
              name: 'member.index'
            })
          }).catch(error => {
        //assign state validation with error
            validation.value = error.response.data
          })
        }
      //return
        return {
          member,
          validation,
          router,
          store
        }
      }
    }
  </script>
  <style>
  </style>