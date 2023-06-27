<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <table class="table table-striped table-bordered mt4">
                <thead class="thead-dark">
                    <h4>Presensi Booking Kelas</h4>>
                  <tr>
                    <th scope="col">Id Member</th>
                    <th scope="col">Nama Member</th>
                    <th scope="col">Nama Kelas</th>
                    <th scope="col">Hari Jadwal</th>
                    <th scope="col">Jam</th>
                    <th scope="col">Tanggal Booking</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(booking_kelas, id) in booking_kelas" :key="id">
                    <td>{{ booking_kelas.no_booking_kelas }}</td>
                    <td>{{ booking_kelas.member.nama_member }}</td>
                    <td>{{ booking_kelas.jadwal_harian.kelas.nama_kelas }}</td>
                    <td>{{ booking_kelas.jadwal_harian.hari_jadwal }}</td>
                    <td>{{ booking_kelas.jadwal_harian.jam_mulai }}</td>
                    <td>{{ booking_kelas.tanggal }}</td>
                    <td>{{ booking_kelas.status }}</td>
                    <td class="text-center" v-if="booking_kelas.status == 0">
                      <button class="btn btn-sm btn-primary mr-1" style="margin-left:10px;" @click.prevent="presensi(booking_kelas.id)">Konfirmasi presensi</button>
                    </td>
                    <td class="text-center" v-if="booking_kelas.status == 1">
                      <button class="btn btn-sm  mr-1" style="margin-left:10px;" disabled>Konfirmasi presensi</button>
                    </td>
                    <td >
                      <button @click.prevent="downloadPDF(
                                            booking_kelas.no_booking_kelas,
                                            booking_kelas.tanggal,
                                            booking_kelas.member.no_member,
                                            booking_kelas.member.nama_member,
                                            booking_kelas.jadwal_harian.kelas.nama_kelas,
                                            booking_kelas.jadwal_harian.instruktur.nama_instruktur,
                                            booking_kelas.jadwal_harian.kelas.harga,
                                            booking_kelas.member.jumlah_deposit_reguler
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
      let booking_kelas = ref([]);
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios.get("http://localhost:8000/api/booking_kelas")
          .then((response) => {
            //assign state posts with response data
            booking_kelas.value = response.data.data;
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
            axios.put(`http://localhost:8000/api/booking_kelas/presensi/${id}`)
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
    function downloadPDF(no_booking_kelas, tanggal, no_member, nama_member, nama_kelas, nama_instruktur, harga, sisa_deposit){
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
            pdf.text('STRUK PRESENSI KELAS', 0.5, 4);
            pdf.text("No Struk          : "+ no_booking_kelas, 0.5, 5);
            pdf.text("Tanggal           : " + tanggal, 0.5, 6);
            pdf.text("", 0.5, 7);
            pdf.text("Member           : "+ no_member +" / " + nama_member, 0.5, 8);
            pdf.text("Kelas               : " + nama_kelas , 0.5, 9);
            pdf.text("Instruktur         : " + nama_instruktur , 0.5,10);
            pdf.text("Tarif                 : Rp " + harga , 0.5, 11);
            pdf.text("Sisa Deposit    : Rp " + sisa_deposit , 0.5, 12);
            pdf.save("Presensi Kelas Member-" + nama_member + ".pdf");
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Cancelled");
          }
        });
        
            
        }
      return {
        booking_kelas,
        presensi,
        downloadPDF
      };
    },
  };
  </script>
      <style>
  </style>