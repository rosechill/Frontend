<template>
    <!-- <div
      class="
        d-flex
        justify-content-between
        flex-wrap flex-mdnowrap
        align-items-center
        pt-3
        pb-2
        mb-3
        border-bottom
      "
    >
      <h1 class="h2">Dashboard</h1>
    </div> -->
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <router-link
                :to="{ name: 'kelas.create' }"
                class="btn btn-md btn-success"
                >TAMBAH KELAS</router-link
              >
              <table class="table table-striped table-bordered mt4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">NAMA KELAS</th>
                    <th scope="col">HARGA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(kelas, id) in kelas" :key="id">
                    <td>{{ kelas.nama_kelas }}</td>
                    <td>{{ kelas.harga }}</td>
                    <td class="text-center">
                      <router-link :to="{ name:'kelas.edit', params: { id: kelas.id } }" class="btn btn-sm btn-primary mr-1">
                          EDIT
                      </router-link>
                      <button class="btn btn-sm btn-danger ml-1" style="margin-left:10px;" @click.prevent="kelasDelete(kelas.id)">DELETE</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
      <script>
  import axios from "axios";
  import { onMounted, ref } from "vue";
  export default {
    setup() {
      //reactive state
      let kelas = ref([]);
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios.get("http://localhost:8000/api/kelas/index")
          .then((response) => {
            //assign state posts with response data
            kelas.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
      function kelasDelete(id) {
        //delete data post by ID
        axios.delete(`http://localhost:8000/api/kelas/destroy/${id}`)
        .then(() => {
            //splice posts 
            const index = this.kelas.findIndex(kelas => kelas.id === id)
            if (~index) {
              // if the post exists in array
              this.kelas.splice(index, 1)
            }
          }).catch(error => {
              console.log(error.response.data)
          })
           
      }
  

      //return
      return {
        kelas,
        kelasDelete,
      };
    },
  };
  </script>
      <style>
  </style>