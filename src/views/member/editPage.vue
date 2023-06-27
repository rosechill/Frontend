<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h4>UPDATE DATA MEMBER</h4>
              <hr />
              <form @submit.prevent="update">
                <div class="form-group mb-3">
                  <label class="form-label">Nama Member</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="member.nama_member"
                    placeholder="Masukkan nama member"
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
                  <label class="form-label">Tanggal Lahir :</label>
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
                  <label class="form-label">Nomor Telepon</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="member.nomor_telp"
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
                    v-model="member.alamat"
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
      //state member
        const member = reactive({
            nama_member: '',
            tanggal_lahir: '',
            nomor_telp: '',
            alamat: ''
        })
        //state validation
        const validation = ref([])
        // let members = ref([]);
  
        //vue router
        const router = useRouter()
        const route = useRoute()
        const id = route.params.id

        onMounted(() => {
        //get API from Laravel Backend
        axios.get(`http://localhost:8000/api/member/show/${id}`)
            .then((response) => {
            member.nama_member = response.data.data.nama_member;
            member.tanggal_lahir = response.data.data.tanggal_lahir;
            member.nomor_telp = response.data.data.nomor_telp;
            member.alamat = response.data.data.alamat;
            })
            .catch((error) => {
            console.log(error.response.data);
            });
        });
  
        //method store
        function update() {
          let nama_member = member.nama_member
          let tanggal_lahir = member.tanggal_lahir
          let nomor_telp = member.nomor_telp
          let alamat = member.alamat

          axios.put(`http://localhost:8000/api/member/update/${route.params.id}`, {
            nama_member: nama_member,
            tanggal_lahir: tanggal_lahir,
            nomor_telp: nomor_telp,
            alamat : alamat
          }).then(() => {
        //redirect ke member index
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
          update
        }
      }
    }   
  </script>
  <style>
  </style>