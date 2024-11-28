const BASE_URL = 'http://localhost:8000'

let mode = 'CREATE'
let selectedId = ''

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    console.log('id', id)
    if (id) {
        mode = 'EDIT'
        selectedId = id

        // Fetch old data
        try {
            const response = await axios.get(`${BASE_URL}/informations/${id}`)
            const informations = response.data
            console.log(response.data)
            let locationDOM = document.querySelector("input[name=location]")
            let sizeDOM = document.querySelector("input[name=size]")
            let purchasedetailsDOM = document.querySelector("input[name=purchasedetails]")
            let rentaltermsDOM = document.querySelector("input[name=rentalterms]")
            let maintenanceDOM = document.querySelector("input[name=maintenance]")
            let monthlypaymentDOM = document.querySelector("input[name=monthlypayment]")
            
            locationDOM.value = informations.location
            sizeDOM.value = informations.size
            purchasedetailsDOM.value = informations.purchasedetails
            rentaltermsDOM.value = informations.rentalterms
            maintenanceDOM.value = informations.maintenance
            monthlypaymentDOM.value = informations.monthlypayment
            
            let statusDOM = document.querySelectorAll("input[name=status]"); 
            let personDOM = document.querySelectorAll("input[name=person]"); 
            for (let i = 0; i < statusDOM.length; i++) {
                if (statusDOM[i].value ==  informations.status) {
                    statusDOM[i].checked = true;
                }
            }
            for (let i = 0; i < personDOM.length; i++) {
                if(personDOM[i].value == informations.person){
                    personDOM[i].checked = true;
                }
            }
        } catch (error) {
            console.log('error', error)
        }
    }
}

const validateData = (informationsData) => {
    let errors = [];
    if (!informationsData.location){
        errors.push("กรุณากรอกที่ตั้ง")
    }
    if (!informationsData.size){
        errors.push("กรุณากรอกขนาด")
    }
    if(!informationsData.status){
        errors.push("กรุณาเลือกสถานะ")
    }
    if(!informationsData.person){
        errors.push("กรุณาเลือกผู้เช่า/ซื้อ")
    }
    if (!informationsData.purchasedetails){
        errors.push("กรุณากรอกรายละเอียดผู้เช่า/ซื้อ")
    }
    if (!informationsData.rentalterms){
        errors.push("กรุณากรอกเงื่อนไขการเช่า/ซื้อ")
    }
    if (!informationsData.maintenance){
        errors.push("กรุณากรอกการซ่อมบำรุง")
    }
    if (!informationsData.monthlypayment){
        errors.push("กรุณากรอกค่าไช้จ่ายประจำเดือน")
    }
    return errors
}

const submitData = async () => {
    let locationDOM = document.querySelector("input[name=location]")
    let sizeDOM = document.querySelector("input[name=size]")
    let statusDOM = document.querySelector("input[name=status]:checked")|| {}
    let personDOM = document.querySelector("input[name=person]:checked") || {}
    let purchasedetailsDOM = document.querySelector("input[name=purchasedetails]")
    let rentaltermsDOM = document.querySelector("input[name=rentalterms]")
    let maintenanceDOM = document.querySelector("input[name=maintenance]")
    let monthlypaymentDOM = document.querySelector("input[name=monthlypayment]")
    

    let messageDOM = document.getElementById('message');
    try {
       let informationsData = {
            location: locationDOM.value,
            size: sizeDOM.value,
            status:statusDOM.value,
            person:personDOM.value,
            purchasedetails: purchasedetailsDOM.value,
            rentalterms: rentaltermsDOM.value,
            maintenance: maintenanceDOM.value,
            monthlypayment: monthlypaymentDOM.value
        };
        console.log("submitData", informationsData);
        const errors = validateData(informationsData);
        if (errors.length > 0) {
            throw {
                message: "กรอกข้อมูลไห้ครบถ้วน!",
                errors: errors
            };
        }
        let message = 'บันทึกข้อมูลเรียบร้อยแล้ว'
        if (mode == 'CREATE') {
            const response = await axios.post(`${BASE_URL}/informations`, informationsData);
            console.log('response', response.data)
        } else {
            const response = await axios.put(`${BASE_URL}/informations/${selectedId}`, informationsData);
            message = 'แก้ไขข้อมูลเรียบร้อยแล้ว'
            console.log('response', response.data)
        }

        messageDOM.innerText = message;
        messageDOM.className = 'message success'
    } catch (error) {
        console.log('error message', error.message)
        console.log('error', error.errors)

        if (error.response) {
            error.message = error.response.data.message
            error.errors = error.response.data.errors
            console.log(error.response.data.message)
        }

        let htmlData = '<div>'
        htmlData += `<div>${error.message}</div>`;
        htmlData += '<ul>'
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`
        }
        htmlData += '</ul>'
        htmlData += '</div>'
        
        messageDOM.innerHTML = htmlData;
        messageDOM.className = 'message danger'
    }
}
