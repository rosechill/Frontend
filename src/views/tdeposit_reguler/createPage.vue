<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Transaksi Deposit Uang</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Pegawai</label>
                                <select name="id_pegawai" id="id_pegawai" class="form-select" v-model="tdeposit_reguler.id_pegawai">
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
                                <label for="content" class="form-label">Nama Kelas</label>
                                <select name="id_member" id="id_member" class="form-select" v-model="tdeposit_reguler.id_member">
  
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
                            <label for="content" class="form-label">jumlah_deposit</label>
                            <input
                                class="form-control"
                                v-model="tdeposit_reguler.jumlah_deposit"
                                placeholder="Masukkan jumlah_deposit"
                            />
                            <!-- validation -->
                            <div
                                v-if="validation.jumlah_deposit"
                                class="mt-2 alert alert-danger"
                            >
                                {{ validation.jumlah_deposit[0] }}
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
            const tdeposit_reguler = reactive({
                id_pegawai: '',
                id_member: '',
                jumlah_deposit: '',
            })
  
            const pegawai = ref([])
  
            const member = ref([])
  
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
            });
  
            //method store
            function store() {
                let id_pegawai = tdeposit_reguler.id_pegawai
                let id_member = tdeposit_reguler.id_member
                let jumlah_deposit = tdeposit_reguler.jumlah_deposit
  
                axios.post('http://localhost:8000/api/tdeposit_reguler', {
                    id_pegawai: id_pegawai, 
                    id_member: id_member,
                    jumlah_deposit: jumlah_deposit,
                }).then(() => {
                        //redirect ke post index
                        router.push({
                            name: 'tdeposit_reguler.index'
                        })
                    }).catch(error => {
                        //assign state validation with error
                        validation.value = error.response.data
                    })
  
            }
  
            //return
            return {
                tdeposit_reguler,
                validation,
                router,
                store,
                pegawai,
                member            
            }
        }
    }    
  </script>
  
  <style>
  
  </style>