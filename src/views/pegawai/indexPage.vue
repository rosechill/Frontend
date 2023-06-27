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
                :to="{ name: 'pegawai.create' }"
                class="btn btn-md btn-success"
                >TAMBAH PEGAWAI</router-link
              >
              <table class="table table-striped table-bordered mt4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">NOMOR PEGAWAI</th>
                    <th scope="col">NAMA LENGKAP</th>
                    <th scope="col">ROLE</th>
                    <th scope="col">GENDER</th>
                    <th scope="col">TANGGAL LAHIR</th>
                    <th scope="col">NOMOR TELEPON</th>
                    <th scope="col">USERNAME</th>
                    <th scope="col">PASSWORD</th>
                    <th scope="col">AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(pegawai, id) in pegawai" :key="id">
                    <td>{{ pegawai.no_pegawai }}</td>
                    <td>{{ pegawai.nama_pegawai }}</td>
                    <td>{{ pegawai.role }}</td>
                    <td>{{ pegawai.gender }}</td>
                    <td>{{ pegawai.tanggal_lahir }}</td>
                    <td>{{ pegawai.alamat }}</td>
                    <td>{{ pegawai.nomor_telp }}</td>
                    <td>{{ pegawai.username }}</td>
                    <td>{{ pegawai.password }}</td>
                    <td class="text-center">
                      <router-link :to="{ name:'pegawai.edit', params: { id: pegawai.id } }" class="btn btn-sm btn-primary mr-1">
                          EDIT
                      </router-link>
                      <button class="btn btn-sm btn-danger ml-1" style="margin-left:10px;" @click.prevent="pegawaiDelete(pegawai.id)">DELETE</button>
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
      let pegawai = ref([]);
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios.get("http://localhost:8000/api/pegawai/index")
          .then((response) => {
            //assign state posts with response data
            pegawai.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
      function pegawaiDelete(id) {
        //delete data post by ID
        axios.delete(`http://localhost:8000/api/pegawai/destroy/${id}`)
        .then(() => {
            //splice posts 
            const index = this.pegawai.findIndex(pegawai => pegawai.id === id)
            if (~index) {
              // if the post exists in array
              this.pegawai.splice(index, 1)
            }
          }).catch(error => {
              console.log(error.response.data)
          })
           
      }
  

      //return
      return {
        pegawai,
        pegawaiDelete,
      };
    },
  };
  </script>
      <style>
  </style>