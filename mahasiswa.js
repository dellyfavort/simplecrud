const API_URL = 'http://localhost:3000/api/mahasiswa'

document.addEventListener('DOMContentLoaded', bacaData)

async function bacaData(){
    try{
        const respon = await fetch(API_URL)
        const data = await respon.json()
        const tbody = document.getElementById('tabelBody')
        tbody.innerHTML = ''

        data.forEach(mhs =>{
            const row = `
            <tr>
                <td>${mhs.Id}</td>
                <td>${mhs.Nama}</td>
                <td>${mhs.Nim}</td>
                <td>${mhs.Fakultas}</td>
                <td>

                    <button class="btn btn-sm btn-warning" type="button" onClick="editData('${mhs.Id}', '${mhs.Nama}', '${mhs.Nim}', '${mhs.Fakultas}')">Edit</button>

                    <button class="btn btn-sm btn-danger" type="button"
                    onClick="deleteData(${mhs.Id})">Hapus</button>
                </td>
            </tr>
            `
            tbody.innerHTML += row
        })

    }catch(error){
        console.error('Error:', error)
        alert('gagal mengambil data, pastikan node js berjalan!')
    }
}

document.getElementById('formMahasiswa').addEventListener('submit', async function(e){
    e.preventDefault()

    const id = document.getElementById('id').value
    const nama = document.getElementById('nama').value
    const nim = document.getElementById('nim').value
    const fakultas = document.getElementById('fakultas').value

    let url = API_URL
    let metode = 'POST'

    if(id){
        url = `${API_URL}/${id}`
        metode = 'PUT'
    }

    try {
        const respon = await fetch(url,{
            method: metode,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({nama, nim, fakultas})
        })
        const result = await respon.json()
        alert((result.message || 'Operasi Berhasil'))
        document.getElementById('formMahasiswa').reset()
        document.getElementById('id').value =''
        bacaData()
    } catch (error) {
        console.error('Error:', error)
        alert('Terjadi kesalahan pada sistem')
    }
})

window.editData = function(id, nama, nim, fakultas){
    document.getElementById('id').value = id
    document.getElementById('nama').value = nama
    document.getElementById('nim').value = nim
    document.getElementById('fakultas').value = fakultas
    window.scrollTo(0,0)
}

window.deleteData = async function(id){
    if(confirm('Yakin ingin menghapus?')){
        try {
            const respon = await fetch(`${API_URL}/${id}`,{
                method: 'DELETE'
            })
            const result = await respon.json()
            alert(result.message)
            bacaData()
        } catch (error) {
            console.error('Error:',error)
            alert('Gagal menghapus Data')
        }
    }
}