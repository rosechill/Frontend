<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Laporan Gym</th>
                  <th scope="col">Laporan Kelas</th>
                  <th scope="col">Laporan Pendapatan</th>
                  <th scope="col">Laporan Instruktur</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">
                    <router-link
                      :to="{ name: 'Laporan_Gym.index' }"
                      class="btn btn-md btn-primary"
                    >
                      Laporan Gym
                    </router-link>
                  </td>
                  <td class="text-center">
                    <router-link
                      :to="{ name: 'Laporan_Kelas.index' }"
                      class="btn btn-md btn-primary"
                    >
                      Laporan Kelas
                    </router-link>
                  </td>
                  <td class="text-center">
                    <router-link
                      :to="{ name: 'Laporan_Pendapatan.index' }"
                      class="btn btn-md btn-primary"
                    >
                      Laporan Pendapatan
                    </router-link>
                  </td>
                  <td class="text-center">
                    <router-link
                      :to="{ name: 'Laporan_Instruktur.index' }"
                      class="btn btn-md btn-primary"
                    >
                      Laporan Instruktur
                    </router-link>
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
    // reactive state
    let kelas = ref([]);

    // mounted
    onMounted(() => {
      // get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/kelas/index")
        .then((response) => {
          // assign state kelas with response data
          kelas.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function kelasDelete(id) {
      // delete data kelas by ID
      axios
        .delete(`http://localhost:8000/api/kelas/destroy/${id}`)
        .then(() => {
          // splice kelas
          const index = kelas.value.findIndex((kelas) => kelas.id === id);
          if (~index) {
            // if the kelas exists in array
            kelas.value.splice(index, 1);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    // return
    return {
      kelas,
      kelasDelete,
    };
  },
};
</script>

<style>
</style>