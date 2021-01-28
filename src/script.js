const getItem = () => {
    const itemName = document.getElementById('itemValue').value;
    const languages = ["EN-US","DE-DE","FR-FR","RU-RU","PL-PL","ES-ES","PT-BR","ZH-CN","KO-KR"];

    let itemTag;
    for (let i = 0; i < 6934; i++) {
        let el = data[i];
        if(el === undefined || el === null){
            continue
        }else{
            if(el.LocalizedNames === null || el.LocalizedNames === undefined ){
                continue;
            }else{
                for(let j = 0; j < languages.length; j++){
                    let item = el.LocalizedNames[languages[j]];
                    if(item === undefined) continue;
                    else if(item.toLowerCase() === itemName.toLowerCase()){
                        itemTag = el.UniqueName;
                        return LoadPrices(itemTag);
                    }
                }
            }
        }
    }
    alert("Item não encontrado");
}
// data[i].UniqueName to get the tagItem;
function LoadPrices(itemTag){
    const locations = "Caerleon,Lymhurst,Bridgewatch,Martlock,Thetford,FortSterling";
    const item = itemTag;

    api = `https://www.albion-online-data.com/api/v2/stats/history/${item}?date=1-27-2021&locations=${locations}&qualities=1&time-scale=1`;
    
    fetch(api)
    .then(async (response)  => {
        const data = await response.json();
        return dados(data);
    })
    .catch((error) => {
        console.log(error);
    })
};

const dados = (data) =>{
    data.forEach((el) => {
        console.log(el);
        const preço = el.data[el.data.length-1].avg_price;
        let price_container = document.getElementById(`${el.location}Price`);
        price_container.textContent = preço;

        const date = new Date(el.data[el.data.length-1].timestamp);
        const minutes = date.getMinutes() === 0 ? '00': date.getMinutes(); 
        const date_content =  `Updated at ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} - ${date.getHours()}:${minutes}`;

        const date_info = document.createElement('p');

        date_info.id = "date_info";
        date_info.textContent = date_content;

        price_container.appendChild(date_info);
    });
}
