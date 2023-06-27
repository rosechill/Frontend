<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <router-link
              :to="{ name: 'taktivasi.create' }"
              class="btn btn-md btn-success"
              >AKTIVASI MEMBER</router-link
            >
            <table class="table table-striped table-bordered mt4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Nomor Struk</th>
                  <th scope="col">Nama Pegawai</th>
                  <th scope="col">Nama Member</th>
                  <th scope="col">Tanggal Transaksi</th>
                  <th scope="col">Tanggal Expired</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(taktivasi, id) in taktivasi" :key="id">
                  <td>{{ taktivasi.no_taktivasi }}</td>
                  <td>{{ taktivasi.pegawai.nama_pegawai }}</td>
                  <td>{{ taktivasi.member.nama_member }}</td>
                  <td>{{ taktivasi.tanggal_transaksi }}</td>
                  <td>{{ taktivasi.expire_date }}</td>
                  <td>
                    <button
                      @click.prevent="downloadPDF(
                          taktivasi.no_taktivasi,
                          taktivasi.id_member,
                          taktivasi.tanggal_transaksi,
                          taktivasi.expire_date,
                          taktivasi.id_pegawai,
                          taktivasi.member.nama_member,
                          taktivasi.pegawai.nama_pegawai
                        )
                      "
                      class="btn btn-sm btn-primary ml-1"
                    >
                      Cetak Struk Aktivasi
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
    let taktivasi = ref([]);
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/taktivasi/index")
        .then((response) => {
          //assign state posts with response data
          taktivasi.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });
    
    function downloadPDF(no_taktivasi, id_member, tanggal_transaksi, expire_date, id_pegawai, nama_member, nama_pegawai){
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'cm',
            format: [8, 17]
        });

        pdf.text('Go Fit', 0.5, 1);
        pdf.text("No Struk : "+ no_taktivasi, 11, 1);
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
      taktivasi,
      downloadPDF
    };
  },
  
};
</script>
<style></style>
