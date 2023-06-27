<template>
  <div class="container mt-5">
      <div class="row">
          <div class="col-md-12">
              <div class="card border-0 rounded shadow">
                  <div class="card-body">
                      <h4>Aktivasi Member</h4>
                      <hr>
                      <form @submit.prevent="store">
                          <div class="form-group mb-3">
                              <label for="content" class="form-label">Nama Pegawai</label>
                              <select name="id_pegawai" id="id_pegawai" class="form-select" v-model="taktivasi.id_pegawai">
                                  <option v-for="(item, id) in pegawai" :key="id" v-bind:value="item.id">
                                      {{ item.nama_pegawai }}
                                  </option>
                              </select>

                              <!-- validation -->
                              <div v-if="validation.id_pegawai" class="mt-2 alert alert-danger">
                                  {{ validation.id_pegawai[0] }}
                              </div>
                          </div>
                          <div class="form-group mb-3">
                              <label for="content" class="form-label">Nama Member</label>
                              <select name="id_member" id="id_member" class="form-select" v-model="taktivasi.id_member">

                                  <option v-for="(item, id) in member" :key="id" v-bind:value="item.id">
                                      {{ item.nama_member }}
                                  </option>
                              </select>

                              <!-- validation -->
                              <div v-if="validation.id_member" class="mt-2 alert alert-danger">
                                  {{ validation.id_member[0] }}
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
          //state departemen
          const taktivasi = reactive({
              id_pegawai: '',
              id_member: '',
          })

          const pegawai = ref([])

          const member = ref([])

          //state validation
          const validation = ref([])
          //vue router
          const router = useRouter()

          onMounted(() => {
              //get API from Laravel Backend
              axios.get('http://localhost:8000/api/member/index')
              .then(response => {
                  //assign state posts with response data
                  member.value = response.data.data
              }).catch(error => {
                  console.log(error.response.data)
              })

              axios.get('http://localhost:8000/api/pegawai/index')
              .then(response => {
                  //assign state posts with response data
                  pegawai.value = response.data.data
              }).catch(error => {
                  console.log(error.response.data)
              })
          });

          //method store
          function store() {
              let id_pegawai = taktivasi.id_pegawai
              let id_member = taktivasi.id_member

              axios.post('http://localhost:8000/api/taktivasi/store', {
                  id_pegawai: id_pegawai,
                  id_member: id_member,
              }).then(() => {
                      //redirect ke post index
                      router.push({
                          name: 'taktivasi.index'
                      })
                  }).catch(error => {
                      //assign state validation with error
                      validation.value = error.response.data
                  })

          }

          //return
          return {
              taktivasi,
              validation,
              router,
              store,
              pegawai,
              member            
          }
      }
  }    
</script>

<style>

</style>