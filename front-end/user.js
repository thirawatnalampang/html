const BASE_URL = 'http://localhost:8000';

window.onload = async() => {
    await loadData()
}

const loadData = async () => {
    console.log('on load');

   
       
        const response = await axios.get(`${BASE_URL}/informations`);
        console.log(response.data);

       
        const userDOM = document.getElementById('users');
        let htmlData = '<div>'

        for (let i = 0; i < response.data.length; i++) {
            let user = response.data[i];
            htmlData += `<div>
            ${user.id} ${user.location} ${user.size} ${user.status} ${user.person} ${user.purchasedetails} ${user.rentalterms} ${user.maintenance} ${user.monthlypayment} 
                <a href='index.html?id=${user.id}'><button>Edit</button></a>
                <button class='delete' data-id='${user.id}'>Delete</button>
            </div>`
        }

        htmlData += '</div>'
        userDOM.innerHTML = htmlData

        
        const deleteDOMs = document.getElementsByClassName('delete');
        for (let i = 0; i < deleteDOMs.length; i++) {
            deleteDOMs[i].addEventListener('click', async (event) => {
               const id = event.target.dataset.id;
                try {
                    await axios.delete(`${BASE_URL}/informations/${id}`);
                    loadData();
                } catch(error) {
                    console.error(error);
                }
            });
        }
    }
    
