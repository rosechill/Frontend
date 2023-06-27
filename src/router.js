//import vue router
import { createRouter, createWebHistory } from "vue-router";
//define a routes
const routes = [
  {
    path: "/",
    name: "beranda",
    component: () => import("@/components/DashboardLayout.vue"),
    children: [
      {
        path: "/pegawai",
        name: "pegawai.index",
        component: () => import("@/views/pegawai/indexPage.vue"),
      },
      {
        path: "/pegawai/create",
        name: "pegawai.create",
        component: () => import("@/views/pegawai/createPage.vue"),
      },
      {
        path: "/pegawai/edit/:id",
        name: "pegawai.edit",
        component: () => import("@/views/pegawai/editPage.vue"),
      },
      {
        path: "/member",
        name: "member.index",
        component: () => import("@/views/member/indexPage.vue"),
      },
      {
        path: "/member/create",
        name: "member.create",
        component: () => import("@/views/member/createPage.vue"),
      },
      {
        path: "/member/edit/:id",
        name: "member.edit",
        component: () => import("@/views/member/editPage.vue"),
      },
      {
        path: "/instruktur",
        name: "instruktur.index",
        component: () => import("@/views/instruktur/indexPage.vue"),
      },
      {
        path: "/instruktur/create",
        name: "instruktur.create",
        component: () => import("@/views/instruktur/createPage.vue"),
      },
      {
        path: "/instruktur/edit/:id",
        name: "instruktur.edit",
        component: () => import("@/views/instruktur/editPage.vue"),
      },
      {
        path: "/kelas",
        name: "kelas.index",
        component: () => import("@/views/kelas/indexPage.vue"),
      },
      {
        path: "/kelas/create",
        name: "kelas.create",
        component: () => import("@/views/kelas/createPage.vue"),
      },
      {
        path: "/kelas/edit/:id",
        name: "kelas.edit",
        component: () => import("@/views/kelas/editPage.vue"),
      },
      {
        path: "/jadwal_umum",
        name: "jadwal_umum.index",
        component: () => import("@/views/jadwal_umum/indexPage.vue"),
      },
      {
        path: "/jadwal_umum/create",
        name: "jadwal_umum.create",
        component: () => import("@/views/jadwal_umum/createPage.vue"),
      },
      {
        path: "/jadwal_umum/edit/:id",
        name: "jadwal_umum.edit",
        component: () => import("@/views/jadwal_umum/editPage.vue"),
      },
      {
        path: "/jadwal_harian",
        name: "jadwal_harian.generateWeek",
        component: () => import("@/views/jadwal_harian/indexPage.vue"),
      },
      {
        path: "/jadwal_harian",
        name: "jadwal_harian.index",
        component: () => import("@/views/jadwal_harian/indexPage.vue"),
      },
      {
        path: "/jadwal_harian",
        name: "jadwal_harian.update",
        component: () => import("@/views/jadwal_harian/indexPage.vue"),
      },
      {
        path: "/taktivasi",
        name: "taktivasi.index",
        component: () => import("@/views/taktivasi/indexPage.vue"),
      },
      {
        path: "/taktivasi",
        name: "taktivasi.create",
        component: () => import("@/views/taktivasi/createPage.vue"),
      },
      {
        path: "/tdeposit_reguler",
        name: "tdeposit_reguler.index",
        component: () => import("@/views/tdeposit_reguler/indexPage.vue"),
      },
      {
        path: "/tdeposit_reguler",
        name: "tdeposit_reguler.create",
        component: () => import("@/views/tdeposit_reguler/createPage.vue"),
      },
      {
        path: "/tdeposit_kelas",
        name: "tdeposit_kelas.index",
        component: () => import("@/views/tdeposit_kelas/indexPage.vue"),
      },
      {
        path: "/tdeposit_kelas",
        name: "tdeposit_kelas.create",
        component: () => import("@/views/tdeposit_kelas/createPage.vue"),
      },
      
      {
        path: "/instruktur_izin",
        name: "instruktur_izin.index",
        component: () => import("@/views/instruktur_izin/indexPage.vue"),
      },
      
      {
        path: "/booking_kelas",
        name: "booking_kelas.index",
        component: () => import("@/views/booking_kelas/indexPage.vue"),
      },

      {
        path: "/booking_gym",
        name: "booking_gym.index",
        component: () => import("@/views/booking_gym/indexPage.vue"),
      },

      {
        path: "/laporan",
        name: "Laporan.index",
        component: () => import("@/views/Laporan/indexPage.vue"),
      },

      {
        path: "/laporan_gym",
        name: "Laporan_Gym.index",
        component: () => import("@/views/Laporan/LaporanGym.vue"),
      },

      {
        path: "/laporan_kelas",
        name: "Laporan_Kelas.index",
        component: () => import("@/views/Laporan/LaporanKelas.vue"),
      },

      {
        path: "/laporan_pendapatan",
        name: "Laporan_Pendapatan.index",
        component: () => import("@/views/Laporan/LaporanPendapatan.vue"),
      },

      {
        path: "/laporan_instruktur",
        name: "Laporan_Instruktur.index",
        component: () => import("@/views/Laporan/LaporanInstruktur.vue"),
      },

    ],
  },
];
//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // config routes
});
export default router;
