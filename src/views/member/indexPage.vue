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
              :to="{ name: 'member.create' }"
              class="btn btn-md btn-success"
              >TAMBAH MEMBER</router-link
            >
            <table class="table table-striped table-bordered mt4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">NOMOR MEMBER</th>
                  <th scope="col">NAMA LENGKAP</th>
                  <th scope="col">GENDER</th>
                  <th scope="col">TANGGAL LAHIR</th>
                  <th scope="col">NOMOR TELEPON</th>
                  <th scope="col">ALAMAT</th>
                  <th scope="col">USERNAME</th>
                  <th scope="col">PASSWORD</th>
                  <th scope="col">JUMLAH DEPOSIT</th>
                  <th scope="col">STATUS MEMBERSHIP</th>
                  <th scope="col">MASA BERLAKU</th>
                  <th scope="col">AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, id) in member" :key="id">
                  <td>{{ member.no_member }}</td>
                  <td>{{ member.nama_member }}</td>
                  <td>{{ member.gender }}</td>
                  <td>{{ member.tanggal_lahir }}</td>
                  <td>{{ member.nomor_telp }}</td>
                  <td>{{ member.alamat }}</td>
                  <td>{{ member.username }}</td>
                  <td>{{ member.password }}</td>
                  <td>{{ member.jumlah_deposit_reguler }}</td>
                  <td>{{ member.status_membership }}</td>
                  <td>{{ member.masa_berlaku }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{ name: 'member.edit', params: { id: member.id } }"
                      class="btn btn-sm btn-primary mr-1"
                    >
                      EDIT
                    </router-link>
                    <button
                      class="btn btn-sm btn-danger ml-1"
                      style="margin-left: 10px"
                      @click.prevent="memberDelete(member.id)"
                    >
                      DEAKTIVASI MEMBER
                    </button>
                    <button
                      class="btn btn-sm btn-warning"
                      style="margin-left: 10px"
                      @click.prevent="memberDelete(member.id)"
                    >
                      RESET
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

  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <p>EXPIRED HARI INI</p>
            <table class="table table-striped table-bordered mt4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">NOMOR MEMBER</th>
                  <th scope="col">NAMA LENGKAP</th>
                  <th scope="col">GENDER</th>
                  <th scope="col">TANGGAL LAHIR</th>
                  <th scope="col">NOMOR TELEPON</th>
                  <th scope="col">ALAMAT</th>
                  <th scope="col">USERNAME</th>
                  <th scope="col">PASSWORD</th>
                  <th scope="col">JUMLAH DEPOSIT</th>
                  <th scope="col">STATUS MEMBERSHIP</th>
                  <th scope="col">MASA BERLAKU</th>
                  <th scope="col">AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, id) in memberKadaluarsa" :key="id">
                  <td>{{ member.no_member }}</td>
                  <td>{{ member.nama_member }}</td>
                  <td>{{ member.gender }}</td>
                  <td>{{ member.tanggal_lahir }}</td>
                  <td>{{ member.nomor_telp }}</td>
                  <td>{{ member.alamat }}</td>
                  <td>{{ member.username }}</td>
                  <td>{{ member.password }}</td>
                  <td>{{ member.jumlah_deposit_reguler }}</td>
                  <td>{{ member.status_membership }}</td>
                  <td>{{ member.masa_berlaku }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{ name: 'member.edit', params: { id: member.id } }"
                      class="btn btn-sm btn-primary mr-1"
                    >
                      EDIT
                    </router-link>
                    <button
                      class="btn btn-sm btn-danger ml-1"
                      style="margin-left: 10px"
                      @click.prevent="memberDelete(member.id)"
                    >
                      DEAKTIVASI MEMBER
                    </button>
                    <button
                      class="btn btn-sm btn-warning"
                      style="margin-left: 10px"
                      @click.prevent="memberDelete(member.id)"
                    >
                      RESET
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
    let member = ref([]);
    let memberKadaluarsa = ref([]);
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/member/index")
        .then((response) => {
          //assign state posts with response data
          member.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });

      axios
        .get("http://localhost:8000/api/memberKadaluarsa")
        .then((response) => {
          //assign state posts with response data
          memberKadaluarsa.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function memberDelete(id) {
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
          confirmButtonText: "Yes, Deactivate it now",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`http://localhost:8000/api/member/destroy/${id}`)
              .then(() => {
                //splice posts
                const index = this.member.findIndex(
                  (member) => member.id === id
                );
                if (~index) {
                  // if the post exists in array
                  window.location.reload();
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

    function resetPassword(id) {
      //delete data post by ID
      axios
        .get(`http://localhost:8000/api/member/resetPassword/${id}`)
        .then(() => {
          //splice posts
          const index = this.member.findIndex((member) => member.id === id);
          if (~index) {
            // if the post exists in array
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    //return
    return {
      member,
      memberKadaluarsa,
      memberDelete,
      resetPassword,
    };
  },
};
</script>
<style></style>
