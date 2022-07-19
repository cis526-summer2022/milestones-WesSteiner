
function displayCards(data){ 
  for(let i=0; i<data.length; i++){
    var json_data = data[i];
    var display = document.getElementById("view");
    var lat = json_data.lat;
    var lng = json_data.lng;
    var map = document.createElement("img");
    var id = json_data.id;
    map.src = "http://www.mapquestapi.com/staticmap/v4/getmap?key=YiIbGrPqh1Gq6pmFKTopo6uTTTus3bON&size=600,400&zoom=16&center="+lat+","+lng+"&pois=poi-blue,"+lat+","+lng+",0,0";
    var name = document.createElement("p"); 
    name.textContent = json_data.name;
    var iDiv = document.createElement('div');
    display.appendChild(iDiv);
    iDiv.appendChild(map);
    iDiv.appendChild(name);
    var a = document.createElement("a");
    a.innerHTML = "Requests";
    a.href = "/box-locations/"+id;     
    iDiv.appendChild(a);
  } 
}

function useXHR(){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', ()=>{
      displayCards(JSON.parse(xhr.responseText));
  });

  const url = "/box-locations";
  xhr.open("GET", url);
  xhr.send();
}
useXHR();