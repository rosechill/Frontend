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
                :to="{ name: 'jadwal_umum.create' }"
                class="btn btn-md btn-success"
                >TAMBAH JADWAL UMUM</router-link
              >
              <table class="table table-striped table-bordered mt4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Nama Instuktur</th>
                    <th scope="col">Nama kelas</th>
                    <th scope="col">Hari </th>
                    <th scope="col">Kapasitas</th>
                    <th scope="col">Jam Mulai</th>
                    <th scope="col">Jam Selesai</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(jadwal_umum, id) in jadwal_umum" :key="id">
                    <td>{{ jadwal_umum.instruktur.nama_instruktur}}</td>
                    <td>{{ jadwal_umum.kelas.nama_kelas }}</td>
                    <td>{{ jadwal_umum.hari_jadwal }}</td>
                    <td>{{ jadwal_umum.kapasitas }}</td>
                    <td>{{ jadwal_umum.jam_mulai }}</td>
                    <td>{{ jadwal_umum.jam_selesai }}</td>
                    <td class="text-center">
                      <router-link :to="{ name:'jadwal_umum.edit', params: { id: jadwal_umum.id } }" class="btn btn-sm btn-primary mr-1">
                          EDIT
                      </router-link>
                      <button class="btn btn-sm btn-danger ml-1" style="margin-left:10px;" @click.prevent="jadwal_umumDelete(jadwal_umum.id)">DELETE</button>
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
      let jadwal_umum = ref([]);
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios.get("http://localhost:8000/api/jadwal_umum/index")
          .then((response) => {
            //assign state posts with response data
            jadwal_umum.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
      function jadwal_umumDelete(id) {
        //delete data post by ID
        axios.delete(`http://localhost:8000/api/jadwal_umum/destroy/${id}`)
        .then(() => {
            //splice posts 
            const index = this.jadwal_umum.findIndex(jadwal_umum => jadwal_umum.id === id)
            if (~index) {
              // if the post exists in array
              this.jadwal_umum.splice(index, 1)
            }
          }).catch(error => {
              console.log(error.response.data)
          })
           
      }
  

      //return
      return {
        jadwal_umum,
        jadwal_umumDelete,
      };
    },
  };
  </script>
      <style>
  </style>