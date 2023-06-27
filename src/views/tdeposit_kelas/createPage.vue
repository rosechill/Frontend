<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Transaksi Deposit Paket</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Pegawai</label>
                                <select name="id_pegawai" id="id_pegawai" class="form-select" v-model="tdeposit_kelas.id_pegawai">
                                    <option v-for="(item, id) in pegawai" :key="id" v-bind:value="item.id">
                                        {{ item.nama_pegawai }}
                                    </option>
                                </select>
  
                                <!-- validation -->
                                <div v-if="validation.id_pegawai" class="mt-2 alert alert-danger">
                                    {{ validation.id_pegawai[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Member</label>
                                <select name="id_member" id="id_member" class="form-select" v-model="tdeposit_kelas.id_member">
  
                                    <option v-for="(item, id) in member" :key="id" v-bind:value="item.id">
                                        {{ item.nama_member }}
                                    </option>
                                </select>
  
                                <!-- validation -->
                                <div v-if="validation.id_member" class="mt-2 alert alert-danger">
                                    {{ validation.id_member[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Kelas</label>
                                <select name="id_kelas" id="id_kelas" class="form-select" v-model="tdeposit_kelas.id_kelas">
  
                                    <option v-for="(item, id) in kelas" :key="id" v-bind:value="item.id">
                                        {{ item.nama_kelas }}
                                    </option>
                                </select>
  
                                <!-- validation -->
                                <div v-if="validation.id_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.id_kelas[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                            <label for="content" class="form-label">Masukan jumlah Deposit Paket</label>
                            <input
                                class="form-control"
                                v-model="tdeposit_kelas.jumlah_deposit_kelas"
                                placeholder="Masukkan jumlah deposit paket"
                            />
                            <!-- validation -->
                            <div
                                v-if="validation.jumlah_deposit_kelas"
                                class="mt-2 alert alert-danger"
                            >
                                {{ validation.jumlah_deposit_kelas[0] }}
                            </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
    import { reactive, ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
  
    export default {
        setup() {
            //state departemen
            const tdeposit_kelas = reactive({
                id_pegawai: '',
                id_member: '',
                id_kelas:'',
                jumlah_deposit_kelas: '',
            })
  
            const pegawai = ref([])
  
            const member = ref([])
            
            const kelas = ref([])
            //state validation
            const validation = ref([])
            //vue router
            const router = useRouter()
  
            onMounted(() => {
                //get API from Laravel Backend
                axios.get('http://localhost:8000/api/member/index')
                .then(response => {
                    //assign state posts with response data
                    member.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
  
                axios.get('http://localhost:8000/api/pegawai/index')
                .then(response => {
                    //assign state posts with response data
                    pegawai.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })

                axios.get('http://localhost:8000/api/kelas/index')
                .then(response => {
                    //assign state posts with response data
                    kelas.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
            });
  
            //method store
            function store() {
                let id_pegawai = tdeposit_kelas.id_pegawai
                let id_member = tdeposit_kelas.id_member
                let id_kelas = tdeposit_kelas.id_kelas
                let jumlah_deposit_kelas = tdeposit_kelas.jumlah_deposit_kelas
  
                axios.post('http://localhost:8000/api/tdeposit_kelas', {
                    id_pegawai: id_pegawai, 
                    id_member: id_member,
                    id_kelas: id_kelas,
                    jumlah_deposit_kelas: jumlah_deposit_kelas,
                }).then(() => {
                        //redirect ke post index
                        router.push({
                            name: 'tdeposit_kelas.index'
                        })
                    }).catch(error => {
                        //assign state validation with error
                        validation.value = error.response.data
                    })
  
            }
  
            //return
            return {
                tdeposit_kelas,
                validation,
                router,
                store,
                pegawai,
                member,
                kelas,            
            }
        }
    }    
  </script>
  
  <style>
  
  </style>