// Variáveis globais para armazenar os dados dos marcadores
var markersData = [];

// Função para inicializar o mapa
function initMap() {
    // Crie um mapa usando Leaflet.js
    var map = L.map('map').setView([-24.0923, -46.6230], 12); // Coordenadas de Mongaguá e nível de zoom

    // Adicione um mapa de fundo (tile layer)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Carregar marcadores previamente salvos no armazenamento local
    var savedMarkers = JSON.parse(localStorage.getItem('markersData'));
    if (savedMarkers) {
        markersData = savedMarkers;
        markersData.forEach(function(marker) {
            L.marker(marker.latlng).addTo(map).bindPopup(marker.popupContent);
        });
    }

    // Função para adicionar marcadores ao clicar no mapa
    function addMarker(e) {
        // Perguntar ao usuário se ele realmente deseja adicionar o marcador
        if (confirm("Tem certeza de que deseja adicionar este marcador?")) {
            // Adicione um marcador na posição onde o usuário clicou
            var marker = L.marker(e.latlng).addTo(map);

            // Adicione um popup ao marcador com os dados personalizados
            var popupContent = "<strong>Descrição:</strong> " + customMarkerDescription + "<br>" +
                               "<strong>Tipo de Problema:</strong> " + customMarkerProblemType + "<br>" +
                               "<strong>Tipo de Adição:</strong> " + customMarkerAddType;
            marker.bindPopup(popupContent).openPopup();

            // Salvar dados do marcador na lista de marcadores
            markersData.push({
                latlng: e.latlng,
                popupContent: popupContent
            });

            // Salvar dados do marcador no armazenamento local
            localStorage.setItem('markersData', JSON.stringify(markersData));
        }
    }

    // Adicione o evento de clique ao mapa para chamar a função addMarker
    map.on('click', addMarker);
}

// Função para adicionar marcador personalizado com os dados fornecidos pelo usuário
function addCustomMarker() {
    // Obtenha os valores dos campos de entrada
    customMarkerDescription = document.getElementById("markerDescription").value;
    customMarkerProblemType = document.getElementById("problemType").value;

    // Verifique qual opção de tipo de adição foi selecionada
    if (document.getElementById("member").checked) {
        customMarkerAddType = "Membro";
    } else if (document.getElementById("admin").checked) {
        customMarkerAddType = "Administrador";
    }

    // Limpe os campos de entrada após adicionar o marcador
    document.getElementById("markerDescription").value = "";
    document.getElementById("problemType").selectedIndex = 0;
    document.getElementById("member").checked = false;
    document.getElementById("admin").checked = false;
}

// Função para perguntar ao usuário antes de adicionar o marcador
function confirmAddCustomMarker() {
    if (confirm("Tem certeza de que deseja adicionar este marcador?")) {
        addCustomMarker();
    }
}

// Chame a função initMap() quando a página for carregada
window.onload = initMap;
