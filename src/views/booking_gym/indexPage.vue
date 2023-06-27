<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <table class="table table-striped table-bordered mt4">
                <thead class="thead-dark">
                    <h4>Presensi Booking Gym</h4>>
                  <tr>
                    <th scope="col">ID Member</th>
                    <th scope="col">Nama Member</th>
                    <th scope="col">Tanggal Booking</th>
                    <th scope="col">Sesi</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(booking_gym, id) in booking_gym" :key="id">
                    <td>{{ booking_gym.no_booking_gym }}</td>
                    <td>{{ booking_gym.member.nama_member }}</td>
                    <td>{{ booking_gym.tanggal }}</td>
                    <td>{{ booking_gym.gym.start_gym }}</td>
                    <td>{{ booking_gym.status }}</td>
                    <td class="text-center" v-if="booking_gym.status == 0">
                      <button class="btn btn-sm btn-primary mr-1" style="margin-left:10px;" @click.prevent="presensi(booking_gym.id)">Konfirmasi presensi</button>
                    </td>
                    <td class="text-center" v-if="booking_gym.status == 1">
                      <button class="btn btn-sm  mr-1" style="margin-left:10px;" disabled>Konfirmasi presensi</button>
                    </td>
                    <td class="text-center" v-if="booking_gym.status == 1">
                      <button @click.prevent="downloadPDF(
                                            booking_gym.no_booking_gym,
                                            booking_gym.tanggal,
                                            booking_gym.member.no_member,
                                            booking_gym.member.nama_member,
                                            booking_gym.gym.start_gym,
                                            booking_gym.gym.end_gym
                                        )" class="btn btn-sm btn-primary ml-1">
                                            Cetak Struk 
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
  import Swal from "sweetalert2";

  export default {
    setup() {
      //reactive state
      let booking_gym = ref([]);
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios.get("http://localhost:8000/api/booking_gym")
          .then((response) => {
            //assign state posts with response data
            booking_gym.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });

      function presensi(id){
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
          confirmButtonText: "Yes, Konfirmasi presensi!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios.put(`http://localhost:8000/api/booking_gym/presensi/${id}`)
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
    function downloadPDF(no_booking_gym, tanggal, no_member, nama_member, start_gym, end_gym){
        const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Apakah anda yakin ingin mencetak struk?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, Cetak Struk!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'cm',
                format: [13, 13]
            });

            pdf.text('Go Fit', 0.5, 1);
            pdf.text('Jl. Centralpark No.10 Yogyakarta', 0.5, 2);
            pdf.text("", 0.5, 3);
            pdf.text('STRUK PRESENSI GYM', 0.5, 4);
            pdf.text("No Struk          : "+ no_booking_gym, 0.5, 5);
            pdf.text("Tanggal           : " + tanggal, 0.5, 6);
            pdf.text("", 0.5, 7);
            pdf.text("Member           : "+ no_member +" / " + nama_member, 0.5, 8);
            pdf.text("Slot Waktu       : " + start_gym +" / "+ end_gym, 0.5, 9);
            pdf.save("Presensi Gym " + nama_member + ".pdf");
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Cancelled");
          }
        });
        
        }
      return {
        booking_gym,
        presensi,
        downloadPDF
      };
    },
  };
  </script>
      <style>
  </style>