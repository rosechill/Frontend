<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <!-- <router-link
                :to="{ name: 'instruktur_izin.create' }"
                class="btn btn-md btn-success"
                >TAMBAH IZIN</router-link
              > -->
              <table class="table table-striped table-bordered mt4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Nama Instruktur</th>
                    <th scope="col">Nama Instruktur Pengganti</th>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Alasan</th>
                    <th scope="col">Is Confirm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(instruktur_izin, id) in instruktur_izin" :key="id">
                    <td>{{ instruktur_izin.instruktur.nama_instruktur }}</td>
                    <td>{{ instruktur_izin.instruktur_pengganti.nama_instruktur }}</td>
                    <td>{{ instruktur_izin.jadwal_harian.tanggal }}</td>
                    <td>{{ instruktur_izin.alasan }}</td>
                    <td>{{ instruktur_izin.is_confirm }}</td>
                    <td class="text-center" v-if="instruktur_izin.is_confirm == 0">
                      <button class="btn btn-sm btn-primary mr-1" style="margin-left:10px;" @click.prevent="instruktur_izinUpdate(instruktur_izin.id)">Konfirmasi izin</button>
                    </td>
                    <td class="text-center" v-if="instruktur_izin.is_confirm == 1">
                      <button class="btn btn-sm  mr-1" style="margin-left:10px;" disabled>Konfirmasi izin</button>
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
  import Swal from "sweetalert2";
  export default {
    setup() {
      //reactive state
      let instruktur_izin = ref([]);
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios.get("http://localhost:8000/api/instruktur_izin")
          .then((response) => {
            //assign state posts with response data
            instruktur_izin.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
      
      function instruktur_izinUpdate(id){
        const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, Konfirmasi Izin!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios.put(`http://localhost:8000/api/instruktur_izin/confirm/${id}`)
            .then(() => {     
                window.location.reload();
            }).catch(error =>{
                console.log(error.response.data)
            })
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Cancelled");
          }
        });
          
        }

      //return
      return {
        instruktur_izin,
        instruktur_izinUpdate
      };
    },
  };
  </script>
      <style>
  </style>