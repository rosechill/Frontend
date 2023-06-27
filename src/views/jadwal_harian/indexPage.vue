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
              <table class="table table-striped table-bordered mt4">
                <thead class="thead-dark">
                  <button class="btn btn-sm btn-success ml-1" style="margin-block-end:10px;" @click.prevent="jadwal_harianGenerate(jadwal_harian.id)">Generate Week</button>
                  <tr>
                    <th scope="col">Nama Instruktur</th>
                    <th scope="col">Nama Kelas</th>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Hari </th>
                    <th scope="col">Kapasitas</th>
                    <th scope="col">Jam Mulai</th>
                    <th scope="col">Jam Selesai</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(jadwal_harian, id) in jadwal_harian" :key="id">
                    <td>{{ jadwal_harian.instruktur.nama_instruktur }}</td>
                    <td>{{ jadwal_harian.kelas.nama_kelas }}</td>
                    <td>{{ jadwal_harian.tanggal }}</td>
                    <td>{{ jadwal_harian.hari_jadwal }}</td>
                    <td>{{ jadwal_harian.kapasitas }}</td>
                    <td>{{ jadwal_harian.jam_mulai }}</td>
                    <td>{{ jadwal_harian.jam_selesai }}</td>
                    <td>{{ jadwal_harian.status }}</td>
                    <td class="text-center">
                      <button @click.prevent="jadwal_harianUpdate(jadwal_harian.id)" class="btn btn-sm btn-primary mr-1">
                                            Edit Status
                      </button>
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
      let jadwal_harian = ref([]);
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios.get("http://localhost:8000/api/jadwal_harian/index")
          .then((response) => {
            //assign state posts with response data
            jadwal_harian.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
      function jadwal_harianGenerate(id) {
        axios.post(`http://localhost:8000/api/jadwal_harian/generateWeek`)
        .then(() => {
            //splice posts 
            const index = this.jadwal_harian.findIndex(jadwal_harian => jadwal_harian.id === id)
            if (~index) {
              // if the post exists in array
            }
          }).catch(error => {
              console.log(error.response.data)
          })
          window.location.reload();
      }

      function jadwal_harianUpdate(id){
          axios.put(`http://localhost:8000/api/jadwal_harian/update/${id}`)
            .then(() => {     
                window.location.reload();
            }).catch(error =>{
                console.log(error.response.data)
            })
        }

      //return
      return {
        jadwal_harian,
        jadwal_harianGenerate,
        jadwal_harianUpdate 
      };
    },
  };
  </script>
      <style>
  </style>