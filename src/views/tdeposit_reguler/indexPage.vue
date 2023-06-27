<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <router-link
                :to="{ name: 'tdeposit_reguler.create' }"
                class="btn btn-md btn-success"
                >TRANSAKSI DEPOSIT REGULER</router-link
              >
              <table class="table table-striped table-bordered mt4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Nomor Struk</th>
                    <th scope="col">Nama Pegawai</th>
                    <th scope="col">Nama Member</th>
                    <th scope="col">Tanggal Transaksi</th>
                    <th scope="col">Jumlah Deposit</th>
                    <th scope="col">Bonus Deposit</th>
                    <th scope="col">Sisa Deposit</th>
                    <th scope="col">Total Deposit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tdeposit_reguler, id) in tdeposit_reguler" :key="id">
                    <td>{{ tdeposit_reguler.no_struk_deposit_reguler }}</td>
                    <td>{{ tdeposit_reguler.pegawai.nama_pegawai }}</td>
                    <td>{{ tdeposit_reguler.member.nama_member }}</td>
                    <td>{{ tdeposit_reguler.tanggal_transaksi }}</td>
                    <td>{{ tdeposit_reguler.jumlah_deposit }}</td>
                    <td>{{ tdeposit_reguler.bonus }}</td>
                    <td>{{ tdeposit_reguler.sisa_deposit }}</td>
                    <td>{{ tdeposit_reguler.total_deposit }}</td>
                    <td>
                      <button @click.prevent="downloadPDF(
                                            tdeposit_reguler.no_struk_deposit_reguler,
                                            tdeposit_reguler.id_member,
                                            tdeposit_reguler.tanggal_transaksi,
                                            tdeposit_reguler.jumlah_deposit,
                                            tdeposit_reguler.bonus,
                                            tdeposit_reguler.member.nama_member,
                                            tdeposit_reguler.pegawai.nama_pegawai
                                        )" class="btn btn-sm btn-primary ml-1">
                                            Cetak Struk Deposit Reguler
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
  import { jsPDF } from "jspdf";

  export default {
    setup() {
      //reactive state
      let tdeposit_reguler = ref([]);
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios.get("http://localhost:8000/api/tdeposit_reguler")
          .then((response) => {
            //assign state posts with response data
            tdeposit_reguler.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });

      function downloadPDF(no_struk_deposit_reguler, id_member, tanggal_transaksi, jumlah_deposit, bonus, expire_date, id_pegawai, nama_member, nama_pegawai){
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'cm',
            format: [8, 17]
        });

        pdf.text('Go Fit', 0.5, 1);
        pdf.text("No Struk : "+ no_struk_deposit_reguler, 11, 1);
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
        tdeposit_reguler,
        downloadPDF
      };
    },
  };
  </script>
      <style>
  </style>