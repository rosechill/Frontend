<template>
  <div>
    <header
      class="navbar navbar-dark sticky-top bg-dark flex-mdnowrap p-0 shadow"
    >
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#"
        >P3L kak</a
      >
      <button
        class="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        ariacontrols="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </header>

    <div class="container-fluid">
      <div class="row">
        <nav
          id="sidebarMenu"
          class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        >
          <div class="position-sticky pt-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link :to="{ name: 'pegawai.index' }" class="nav-link">Pegawai</router-link>
                <router-link :to="{ name: 'member.index' }" class="nav-link">Member</router-link>
                <router-link :to="{ name: 'instruktur.index' }" class="nav-link">Instruktur</router-link>
                <router-link :to="{ name: 'kelas.index' }" class="nav-link">Kelas</router-link>
                <router-link :to="{ name: 'jadwal_umum.index' }" class="nav-link">Jadwal Umum</router-link>
                <router-link :to="{ name: 'jadwal_harian.index' }" class="nav-link">Jadwal Harian</router-link>
                <router-link :to="{ name: 'taktivasi.index' }" class="nav-link">Transaksi Aktivasi</router-link>
                <router-link :to="{ name: 'tdeposit_reguler.index' }" class="nav-link">Transaksi Deposit Reguler</router-link>
                <router-link :to="{ name: 'tdeposit_kelas.index' }" class="nav-link">Transaksi Deposit Kelas</router-link>
                <router-link :to="{ name: 'instruktur_izin.index' }" class="nav-link">Izin Instruktur</router-link>
                <router-link :to="{ name: 'booking_kelas.index' }" class="nav-link">Presensi Kelas</router-link>
                <router-link :to="{ name: 'booking_gym.index' }" class="nav-link">Presensi Gym</router-link>
                <router-link :to="{ name: 'Laporan.index' }" class="nav-link">Laporan</router-link>
              </li>
            </ul>
          </div>
        </nav>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md4">
          <!-- View Route -->
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style>
body {
  font-size: 0.875rem;
}
.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}
/*
  * Sidebar
  */
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}
.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
}
.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}
.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #727272;
}
.sidebar .nav-link.active {
  color: #2470dc;
}
.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}
.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}
/*
  * Navbar
  */
.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}
.navbar .navbar-toggler {
  top: 0.25rem;
  right: 1rem;
}
.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}
.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}
.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>
