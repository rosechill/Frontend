<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Laporan Gym</h1>
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
              <h5 class ="text-center">
                <u
                  >Bulan : {{ bulan }}&nbsp;&nbsp;&nbsp;&nbsp;Tahun :
                  {{ tahun }}
                </u>
              </h5>
              <h5 class ="text-center">Tanggal Cetak : {{ tanggal_cetak }}</h5>
            </div>
            <table class="table table-striped table-bordered mt-4" border="2">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Jumlah Member</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(LaporanGym, id) in LaporanGym" :key="id">
                  <td>{{ LaporanGym.tanggal }}</td>
                  <td>{{ LaporanGym.jumlah }}</td>
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
    let LaporanGym = ref([]);
    let tahun = ref([]);
    let tanggal_cetak = ref([]);
    let bulan = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://127.0.0.1:8000/api/Laporan_Gym")
        .then((response) => {
          //assign state posts with response data
          LaporanGym.value = response.data.data;
          tahun.value = response.data.tahun;
          tanggal_cetak.value = response.data.tanggal_cetak;
          bulan.value = response.data.bulan;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    return {
      LaporanGym,
      tahun,
      bulan,
      tanggal_cetak,
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
