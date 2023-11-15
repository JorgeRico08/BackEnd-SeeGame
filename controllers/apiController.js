var express = require('express');
const Ultis = require("../class/Ultils");

const getScreenshots = async (idsScreenshots) => {
    return data = await fetch(
        "https://api.igdb.com/v4/screenshots",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID_API,
                'Authorization': process.env.AUTHORIZATION_API,
            },
            body: "fields url, image_id;"
                + "where id = (" + idsScreenshots + ");"
        })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            console.error(err);
        });
}


const getVideos = async (videoIds) => {
    return data = await fetch(
        "https://api.igdb.com/v4/game_videos",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID_API,
                'Authorization': process.env.AUTHORIZATION_API,
            },
            body: "fields name,video_id;"
                + "where id = (" + videoIds + ");"
        })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            console.error(err);
        });
}

const getEventLogo = async (idsEventLogo) => {
    return data = await fetch(
        "https://api.igdb.com/v4/event_logos",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID_API,
                'Authorization': process.env.AUTHORIZATION_API,
            },
            body: "fields url, image_id;"
            + "where id = (" + idsEventLogo + ");"
        })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            console.error(err);
        });
}


// *****************************************    VIDEOJUEGOS   ******************************************

// -----------------------    BUSCAR POR ID VIDEOJUEGO

const getDetalleVideojuego = (req, res) => {
    const idJuego = req.params.idGame;
    var idsScreenshots = "";
    var idsVideos = "";
    fetch(
        "https://api.igdb.com/v4/games/",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID_API,
                'Authorization': process.env.AUTHORIZATION_API,
            },
            body: "fields name,storyline,summary,screenshots,videos,url;"
                + "where id = " + idJuego + ";"
        })
        .then(response => response.json())
        .then(async (data) => {
            console.log("DATA:", data);
            if (data[0]["screenshots"]) {
                data[0]["screenshots"].forEach(element => {
                    idsScreenshots += element + ",";
                });

                let dataScreenshots = await getScreenshots(idsScreenshots.slice(0, -1));
                dataScreenshots = await Ultis.convertToSize("original", dataScreenshots);

                data[0]["screenshots"] = dataScreenshots;
            }
            try {
                if (data[0]["videos"]) {
                    data[0]["videos"].forEach(element => {
                        idsVideos += element + ",";
                    });
    
                    let dataVideos = await getVideos(idsVideos.slice(0, -1));
                    dataVideos = await Ultis.formatoVideoYT(dataVideos);
    
                    data[0]["videos"] = dataVideos;
                }
            } catch (error) {
                
            }



            res.send(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error en el servidor');
        });
}

// -----------------------    BUSCAR VIDEOJUEGOS

const getVideojuego = (req, res) => {
    fetch(
        "https://api.igdb.com/v4/games/",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID_API,
                'Authorization': process.env.AUTHORIZATION_API,
            },
            body: "fields name;"
        })
        .then(response => response.json())
        .then(dataAll => {
            let dataResultado = [];
            dataAll.forEach(async (data) => {

                dataResultado.push(data);

            })

            res.send(dataResultado);

        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error en el servidor');
        });
}

// -----------------------    BUSCAR VIDEOJUEGOS POR NOMBRE

const getVideojuegoNombre = (req, res) => {
    const sNombre = req.params.name;
    fetch(
        "https://api.igdb.com/v4/games/",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID_API,
                'Authorization': process.env.AUTHORIZATION_API,
            },
            body: "fields name;"
                + "where name ~ *\"" + sNombre + "\"*;"
                + "limit 5;"
        })
        .then(response => response.json())
        .then(dataAll => {
            let dataResultado = [];
            dataAll.forEach(async (data) => {

                dataResultado.push(data);

            })

            res.send(dataResultado);

        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error en el servidor');
        });
}


// *****************************************    EVENTOS   ******************************************

// -----------------------    BUSCAR POR ID EVENTO

const getDetalleEvento = (req, res) => {
    const idEvento = req.params.idEvento;
    var idsVideos = "";
    fetch(
        "https://api.igdb.com/v4/events",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID_API,
                'Authorization': process.env.AUTHORIZATION_API,
            },
            body: "fields description,end_time,event_logo,name,start_time,videos;"
                + "where id = " + idEvento + ";"
        })
        .then(response => response.json())
        .then(async (data) => {
            console.log("DATA:", data);

            try {
                if (data[0]["videos"]) {
                    data[0]["videos"].forEach(element => {
                        idsVideos += element + ",";
                    });
    
                    let dataVideos = await getVideos(idsVideos.slice(0, -1));
                    dataVideos = await Ultis.formatoVideoYT(dataVideos);
    
                    data[0]["videos"] = dataVideos;
                }
            } catch (error) {
                
            }


            if (data[0]["event_logo"]) {

                let dataEventLogo = await getEventLogo(data[0]["event_logo"]);

                dataEventLogo = await Ultis.formatoEventLogo("original", dataEventLogo);

                data[0]["event_logo"] = dataEventLogo;
            }

            res.send(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error en el servidor');
        });
}

// -----------------------    BUSCAR EVENTOS

const getEventos = (req, res) => {
    fetch(
        "https://api.igdb.com/v4/events",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID_API,
                'Authorization': process.env.AUTHORIZATION_API,
            },
            body: "fields name;"
        })
        .then(response => response.json())
        .then(dataAll => {
            let dataResultado = [];
            dataAll.forEach(async (data) => {

                dataResultado.push(data);

            })

            res.send(dataResultado);

        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error en el servidor');
        });
}

// -----------------------    BUSCAR POR NOMBRE DE EVENTO

const getEventoNombre = (req, res) => {
    const sNombre = req.params.name;
    fetch(
        "https://api.igdb.com/v4/events",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID_API,
                'Authorization': process.env.AUTHORIZATION_API,
            },
            body: "fields name;"
                + "where name ~ *\"" + sNombre + "\"*;"
                + "limit 5;"
        })
        .then(response => response.json())
        .then(dataAll => {
            let dataResultado = [];
            dataAll.forEach(async (data) => {

                dataResultado.push(data);

            })

            res.send(dataResultado);

        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error en el servidor');
        });
}


module.exports = { getDetalleVideojuego, getVideojuego, getVideojuegoNombre, getDetalleEvento, getEventos, getEventoNombre  };