const btnEl=document.getElementById("btn-el")
const inputEl=document.getElementById("input-el")
const ulEl=document.getElementById("ul-el")
let sites=[]
//getting the sites info from the local storage
let sfls=JSON.parse(localStorage.getItem("sites"))
if(sfls){
    sites=sfls
    render(sites)
}
// const tabs=[
    // {url:"www.flipkart.com"}
// ]
btnEl.addEventListener("click",function(){
    chrome.tabs.query({active :true,currentWindow : true},function(tabs){
    sites.push(tabs[0].url)
    inputEl.value=""
    localStorage.setItem("sites",JSON.stringify(sites))
    render(sites)
    })
})
function render(sites){
    let listitem=""
    console.log(sites)
    for(let i=0;i<sites.length;i++){
        listitem+=`
        <li>
            <a target='_blank' href='${sites[i]}'>
                ${sites[i]}
            </a>    
        </li>`
    }
    ulEl.innerHTML=listitem

}
