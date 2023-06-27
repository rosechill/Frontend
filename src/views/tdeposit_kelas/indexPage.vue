<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <router-link
                :to="{ name: 'tdeposit_kelas.create' }"
                class="btn btn-md btn-success"
                >TRANSAKSI DEPOSIT PAKET</router-link
              >
              <table class="table table-striped table-bordered mt4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Nomor Struk</th>
                    <th scope="col">Nama Pegawai</th>
                    <th scope="col">Nama Member</th>
                    <th scope="col">Tanggal Transaksi</th>
                    <th scope="col">Total Harga </th>
                    <th scope="col">Jumlah Deposit Kelas</th>
                    <th scope="col">Expire Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tdeposit_kelas, id) in tdeposit_kelas" :key="id">
                    <td>{{ tdeposit_kelas.no_struk_deposit_kelas }}</td>
                    <td>{{ tdeposit_kelas.pegawai.nama_pegawai }}</td>
                    <td>{{ tdeposit_kelas.member.nama_member }}</td>
                    <td>{{ tdeposit_kelas.tanggal_transaksi }}</td>
                    <td>{{ tdeposit_kelas.total_harga }}</td>
                    <td>{{ tdeposit_kelas.jumlah_deposit_kelas }}</td>
                    <td>{{ tdeposit_kelas.expire_date }}</td>
                    
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
             <p>Expired Hari ini</p>
              <table class="table table-striped table-bordered mt4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Nomor Struk</th>
                    <th scope="col">Nama Pegawai</th>
                    <th scope="col">Nama Member</th>
                    <th scope="col">Tanggal Transaksi</th>
                    <th scope="col">Total Harga </th>
                    <th scope="col">Jumlah Deposit Kelas</th>
                    <th scope="col">Expire Date</th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tdeposit_kelas, id) in tdeposit_kelasKadaluarsa" :key="id">
                    <td>{{ tdeposit_kelas.no_struk_deposit_kelas }}</td>
                    <td>{{ tdeposit_kelas.pegawai.nama_pegawai }}</td>
                    <td>{{ tdeposit_kelas.member.nama_member }}</td>
                    <td>{{ tdeposit_kelas.tanggal_transaksi }}</td>
                    <td>{{ tdeposit_kelas.total_harga }}</td>
                    <td>{{ tdeposit_kelas.jumlah_deposit_kelas }}</td>
                    <td>{{ tdeposit_kelas.expire_date }}</td>
                    <td><button class="btn btn-sm btn-danger" style="margin-left:10px;" @click.prevent="tdeposit_kelasDelete(tdeposit_kelas.id)">RESET</button></td>
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
  import { jsPDF } from "jspdf";
  import Swal from "sweetalert2";
  export default {
    setup() {
      //reactive state
      let tdeposit_kelas = ref([]);
      let tdeposit_kelasKadaluarsa = ref([]);
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios.get("http://localhost:8000/api/tdeposit_kelas")
          .then((response) => {
            //assign state posts with response data
            tdeposit_kelas.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });

          axios.get("http://localhost:8000/api/tdeposit_kelasKadaluarsa")
          .then((response) => {
            //assign state posts with response data
            tdeposit_kelasKadaluarsa.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });

      function tdeposit_kelasDelete(id) {

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
          confirmButtonText: "Yes, Reset it now",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://localhost:8000/api/tdeposit_kelas/destroy/${id}`)
        .then(() => {
            //splice posts 
            const index = this.tdeposit_kelas.findIndex(tdeposit_kelas => tdeposit_kelas.id === id)
            if (~index) {
              // if the post exists in array
              window.location.reload();
            }
          }).catch(error => { 
              console.log(error.response.data)
          })  
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Cancelled");
          }
        });
        //delete data post by ID
            
      }

      function downloadPDF(no_struk_deposit_kelas, id_member, tanggal_transaksi, jumlah_deposit, bonus, expire_date, id_pegawai, nama_member, nama_pegawai){
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'cm',
            format: [8, 17]
        });

        pdf.text('Go Fit', 0.5, 1);
        pdf.text("No Struk : "+ no_struk_deposit_kelas, 11, 1);
        pdf.text('Jl. Centralpark No.10 Yogyakarta', 0.5, 2);
        pdf.text("Tanggal : "+ tanggal_transaksi, 11, 2);
        pdf.text('', 0.5, 3);
        pdf.text("Member                    : "+ id_member +" / " + nama_member, 0.5, 4);
        pdf.text("Aktivasi Tahunan      : Rp.3.000.000 ", 0.5, 5);
        pdf.text("Masa aktif member   : " + expire_date, 0.5, 6);
        pdf.text("Kasir : " + id_pegawai + " /" + nama_pegawai, 11, 7);
        pdf.save("Struk Aktivasi-" + id_member + ".pdf");
    }

      //return
      return {
        tdeposit_kelas,
        tdeposit_kelasKadaluarsa,
        tdeposit_kelasDelete,
        downloadPDF
      };
    },
  };
  </script>
      <style>
  </style>