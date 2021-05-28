const Bicon=document.querySelector('.Bicon');
const blogicn=document.querySelector('.blogicn');
Bicon.addEventListener('click',e=>{
    e.preventDefault()
    blogicn.classList.toggle('row')
})

const cards=document.querySelector('.cards')
const getData=(body,id,method,query,cb)=>{
    const baseUrl=`http://2.57.186.103:5000/api/posts/${id}?${query}`
    const xhr = new XMLHttpRequest();
    xhr.open(method,baseUrl);
    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.response);
        cb(response)
    });
    if(method === 'POST'){
        xhr.setRequestHeader('Content-type','application/json')
    } 

    xhr.send(JSON.stringify(body));
}
getData(null,'','GET','',res=>{
    return res.reverse().forEach(item => {
        cards.innerHTML+=`
        <div class="card" style="background: url('${item.img}') center /cover">
            <div class="cardHed">
                <h3>${item.title}</h3>
                <h4>${item.author}</h4>
            </div>
            <p class="time">${item.date}</p>
            <button onclick="deleteblog('${item._id}')" class="btnD">Delete</button>
            <div class="cardBody">
                <p>${item.body}</p>
            </div>
        </div>`
    });
})

const notebtn=document.querySelector('.notebtn')
const inp1=document.querySelector('.inp1')
const inp2=document.querySelector('.inp2')
const inp3=document.querySelector('.inp3')
const inp4=document.querySelector('.inp4')

notebtn.addEventListener('click',e=>{
    e.preventDefault();
    if(inp1.value && inp2.value && inp3.value && inp4.value ){
        getData({
            author:inp1.value,
            title:inp2.value,
            body:inp4.value,
            img:inp3.value,
            date:new Date()
        },'','POST','',res=>{
            window.location.reload()
        })
    }else{
        alert('поля не заполнены')
    }
})
const deleteblog=(id)=>{
    getData(null,id,'DELETE','',res =>{
        window.location.reload()
    })
}