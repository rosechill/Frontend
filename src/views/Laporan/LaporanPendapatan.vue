<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Laporan Pendapatan Bulanan</h1>
  </div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <router-link
          :to="{ name: 'Laporan.index' }"
          class="btn btn-md btn-primary"
          >Back</router-link
        >
        <!-- <button  class="btn btn-md-3 btn-success"  @click="downloadPDF()">Cetak</button> -->
        <div class="card border-0 rounded shadow">
          <div class="card-body" ref="content">
            <div>
              <h5 class="text-center">
                <u>Tahun: {{ Laporan_Pendapatan.tahun }}</u>
              </h5>
              <h5 class="text-center">
                Tanggal Cetak: {{ tanggal_cetak }}
              </h5>
            </div>
            <table class="table table-striped table-bordered mt-4" border="2">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Bulan</th>
                  <th scope="col">Aktivasi</th>
                  <th scope="col">Deposit</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(Laporan_Pendapatan, id) in Laporan_Pendapatan"
                  :key="id"
                >
                  <td>{{ Laporan_Pendapatan.bulan }}</td>
                  <td>{{ Laporan_Pendapatan.taktivasi }}</td>
                  <td>{{ Laporan_Pendapatan.total_deposit }}</td>
                  <td>{{ Laporan_Pendapatan.total }}</td>
                </tr>
                <tr>
                  <td colspan="3"><B>Total</B></td>
                  <td>{{ Laporan_Pendapatan.total_semua }}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <div class="card-body" ref="graph">
                <div
                  class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3"
                >
                  <h3>
                    <b><u>Graph Laporan Bulanan</u></b>
                  </h3>
                  <canvas id="myChart"></canvas>
                </div>
              </div>
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
import Chart from "chart.js/auto";

// import jsPDF from 'jspdf'

export default {
  setup() {
    //reactive state
    let Laporan_Pendapatan = ref([]);
    let tanggal_cetak = ref([]);
    let bulan = ref([]);
    let total_semua = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://127.0.0.1:8000/api/Laporan_Pendapatan")
        .then((response) => {
          //assign state posts with response data
          Laporan_Pendapatan.value = response.data.data;
          tanggal_cetak.value = response.data.tgl_cetak;
          bulan.value = response.data.bulan;
          total_semua.value = response.data.total_semua;

          const ctx = document.getElementById("myChart");

          new Chart(ctx, {
            type: "bar",
            data: {
              labels: Laporan_Pendapatan.value.map((item) =>
                item.bulan.substring(0, 3)
              ),
              datasets: [
                {
                  label: "Total Perbulannya",
                  data: Laporan_Pendapatan.value.map((item) => item.total),
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    return {
      Laporan_Pendapatan,
      bulan,
      tanggal_cetak,
      total_semua,
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
