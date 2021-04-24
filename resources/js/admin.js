import axios from 'axios'
import moment from 'moment'
import Noty from 'noty'
export function initAdmin(socket)
{
    const orderTableBody = document.querySelector('#orderTableBody')
    let orders = []
    let users=[]
    let markup

    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders=res.data.order
        users=res.data.user
           var result= list(orders,users);
            orderTableBody.innerHTML=result

    }).catch(err => {
        console.log(err)
    })
    function list(orders,users){
        let markup='';
        for (let index = 0; index < orders.length && users.length; index++) {
            let element = orders[index];
            let element2=users[index]
            markup+= generateMarkup(element,element2)
        }
        return markup
    }

    function renderItems(items) {
        let parsedItems = Object.values(items)
        return parsedItems.map((menuItem) => {
            return `
                <p>${ menuItem.item.name } - ${ menuItem.qty } pcs </p>
            `
        }).join('')
      }

    function generateMarkup(order,user) {
        var de;
          de= `
          <tr>
          <td class="border px-4 py-2 text-green-900">
              <p>${ order._id }</p>
              <div>${ renderItems(order.items) }</div>
          </td>
          <td class="border px-4 py-2">${ user.name }</td>
          <td class="border px-4 py-2">${ user.address }</td>

                  <td class="border px-4 py-2">
              <div class="inline-block relative w-64">
                  <form action="/admin/orders/status" method="POST">
                      <input type="hidden" name="orderId" value="${ order._id }">
                      <select name="status" onchange="this.form.submit()"
                          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                          <option value="order_placed"
                              ${ order.status === 'order_placed' ? 'selected' : '' }>
                              Placed</option>
                          <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>
                              Confirmed</option>
                          <option value="prepared" ${ order.status === 'prepared' ? 'selected' : '' }>
                              Prepared</option>
                          <option value="delivered" ${ order.status === 'delivered' ? 'selected' : '' }>
                              Delivered
                          </option>
                          <option value="completed" ${ order.status === 'completed' ? 'selected' : '' }>
                              Completed
                          </option>
                      </select>
                  </form>
                
              </div>
          </td>
          <td class="border px-4 py-2">
              ${ moment(order.createdAt).format('hh:mm A') }
          </td>
      </tr>
  `

return de

    
        
       
}
socket.on('orderPlaced',(data)=>{//recivig data from server.js as order

    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'New Order is Submited',
        progressBar: false,
    }).show();
    orders.unshift(data.order)//adding new order to the list at admin frontend
    users.unshift(data.user)

list(orders,users)// new order will be exist in the markup aray list
 var result= list(orders,users);
            orderTableBody.innerHTML=result
           
})

}

module.export=initAdmin;