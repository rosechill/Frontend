<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Laporan Instruktur</h1>
  </div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <router-link
          :to="{ name: 'Laporan.index' }"
          class="btn btn-md btn-primary"
          >Back</router-link
        >
        <div class="card border-0 rounded shadow">
          <div class="card-body" ref="content">
            <div>
              <h5>
                <u
                  >Bulan : {{ bulan }}&nbsp;&nbsp;&nbsp;&nbsp;Tahun :
                  {{ tahun }}
                </u>
              </h5>
              <h5>Tanggal Cetak : {{ tanggal_cetak }}</h5>
            </div>
            <table class="table table-striped table-bordered mt-4" border="2">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Nama</th>
                  <th scope="col">Jumlah Hadir</th>
                  <th scope="col">Jumlah Libur</th>
                  <th scope="col">Waktu Terlambat(detik)</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(LaporanInstruktur, id) in LaporanInstruktur"
                  :key="id"
                >
                  <td>{{ LaporanInstruktur.Nama_Instruktur }}</td>
                  <td>{{ LaporanInstruktur.Jumlah_Hadir }}</td>
                  <td>{{ LaporanInstruktur.Jumlah_Libur }}</td>
                  <td>{{ LaporanInstruktur.Waktu_Terlambat }}</td>
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
// import jsPDF from 'jspdf'

export default {
  setup() {
    //reactive state
    let LaporanInstruktur = ref([]);
    let tahun = ref([]);
    let tanggal_cetak = ref([]);
    let bulan = ref([]);
    let jumlahPeserta = ref([]);
    let jumlahLibur = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://127.0.0.1:8000/api/Laporan_Instruktur")
        .then((response) => {
          //assign state posts with response data
          LaporanInstruktur.value = response.data.data;
          tahun.value = response.data.tahun;
          tanggal_cetak.value = response.data.tgl_cetak;
          bulan.value = response.data.bulan;
          jumlahPeserta = response.data.jumlah_peserta;
          jumlahLibur = response.data.waktu_terlambat;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    return {
      LaporanInstruktur,
      tahun,
      bulan,
      tanggal_cetak,
      jumlahPeserta,
      jumlahLibur,
    };
  },

  // methods:{
  //         downloadPDF(){
  //             var html = this.$refs.content;
  //             let newWin = '';
  //             newWin = window.open("");
  //             newWin.document.write(html.outerHTML);
  //             newWin.print();
  //             newWin.close();
  //         }
  //     }
};
</script>

<style></style>
