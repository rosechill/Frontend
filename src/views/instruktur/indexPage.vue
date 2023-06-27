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
              :to="{ name: 'instruktur.create' }"
              class="btn btn-md btn-success"
              >TAMBAH INSTRUKTUR</router-link
            >
            <button
              class="btn btn-sm btn-dark ml-1"
              style="margin-left: 10px"
              @click.prevent="resetTerlambat(instruktur.id)"
            >
              RESET TERLAMBAT INSTRUKTUR
            </button>

            <table class="table table-striped table-bordered mt4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">NOMOR INSTRUKTUR</th>
                  <th scope="col">NAMA LENGKAP</th>
                  <th scope="col">GENDER</th>
                  <th scope="col">TANGGAL LAHIR</th>
                  <th scope="col">NOMOR TELEPON</th>
                  <th scope="col">ALAMAT</th>
                  <th scope="col">USERNAME</th>
                  <th scope="col">PASSWORD</th>
                  <th scope="col">JUMLAH TERLAMBAT</th>
                  <th scope="col">AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(instruktur, id) in instruktur" :key="id">
                  <td>{{ instruktur.no_instruktur }}</td>
                  <td>{{ instruktur.nama_instruktur }}</td>
                  <td>{{ instruktur.gender }}</td>
                  <td>{{ instruktur.tanggal_lahir }}</td>
                  <td>{{ instruktur.nomor_telp }}</td>
                  <td>{{ instruktur.alamat }}</td>
                  <td>{{ instruktur.username }}</td>
                  <td>{{ instruktur.password }}</td>
                  <td>{{ instruktur.jumlah_terlambat }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{
                        name: 'instruktur.edit',
                        params: { id: instruktur.id },
                      }"
                      class="btn btn-sm btn-primary mr-1"
                    >
                      EDIT
                    </router-link>
                    <button
                      class="btn btn-sm btn-danger ml-1"
                      style="margin-left: 10px"
                      @click.prevent="instrukturDelete(instruktur.id)"
                    >
                      DELETE
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
import Swal from "sweetalert2";
export default {
  setup() {
    //reactive state
    let instruktur = ref([]);
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/instruktur/index")
        .then((response) => {
          //assign state posts with response data
          instruktur.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function instrukturDelete(id) {
      //delete data post by ID
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
          confirmButtonText: "Reset total terlambat !",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`http://localhost:8000/api/instruktur/destroy/${id}`)
              .then(() => {
                //splice posts
                const index = this.instruktur.findIndex(
                  (instruktur) => instruktur.id === id
                );
                if (~index) {
                  // if the post exists in array
                  this.instruktur.splice(index, 1);
                }
              })
              .catch((error) => {
                console.log(error.response.data);
              });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Cancelled");
          }
        });
    }

    function resetTerlambat() {
      //delete data post by ID
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
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .post(`http://localhost:8000/api/instruktur/resetTerlambat`)
              .then(() => {
                window.location.reload();
              })
              .catch((error) => {
                console.log(error.response.data);
              });
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
      instruktur,
      instrukturDelete,
      resetTerlambat,
    };
  },
};
</script>
<style></style>
